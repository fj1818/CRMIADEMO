/**
 * ============================================
 * SERVICIO DE MONITOREO DE TAREAS
 * ============================================
 * Monitorea tareas vencidas y se comunica con N8N
 */

class TareasMonitorService {
    constructor() {
        this.webhookUrl = 'https://n8n.segurointeligente.mx/webhook/tareas-monitor';
        this.sessionId = this.generateSessionId();
        this.checkInterval = 60000; // 1 minuto
        this.intervalId = null;
        this.tareaAlertaActual = null;
        this.alertaMostrada = false;
    }

    generateSessionId() {
        return `tareas-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    init() {
        // Crear campana inmediatamente
        this.crearCampanaAlerta();
        
        this.iniciarMonitoreo();
        Helpers.log('Servicio de Monitoreo de Tareas iniciado', 'success');
    }

    iniciarMonitoreo() {
        // Revisar inmediatamente
        this.revisarTareas();
        
        // Revisar cada minuto
        this.intervalId = setInterval(() => {
            this.revisarTareas();
        }, this.checkInterval);
    }

    detenerMonitoreo() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    revisarTareas() {
        const ahora = new Date();
        const moduloAcciones = window.MisAccionesModuleInstance;
        
        if (!moduloAcciones) {
            console.log('[TareasMonitor] Módulo de acciones no disponible aún');
            return;
        }
        
        if (!moduloAcciones.tareas) {
            console.log('[TareasMonitor] Tareas no inicializadas en el módulo');
            return;
        }

        // Obtener todas las tareas del día de hoy
        const tareasDia = moduloAcciones.tareas.dia?.tareas || [];
        if (!tareasDia.length) {
            console.log('[TareasMonitor] No hay tareas del día para revisar');
            return;
        }
        
        console.log(`[TareasMonitor] Revisando ${tareasDia.length} tareas del día a las ${ahora.toLocaleTimeString()}`);

        // Autocompletar tareas vencidas (excepto la más reciente)
        const tareasVencidas = tareasDia
            .filter(tarea => !tarea.completada && new Date(tarea.fecha) < ahora)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Más reciente primero

        if (tareasVencidas.length === 0) {
            console.log('[TareasMonitor] No hay tareas vencidas');
            return;
        }
        
        console.log(`[TareasMonitor] Encontradas ${tareasVencidas.length} tareas vencidas`);

        // Auto-completar todas excepto la más reciente
        if (tareasVencidas.length > 1) {
            for (let i = 1; i < tareasVencidas.length; i++) {
                tareasVencidas[i].completada = true;
                console.log(`[TareasMonitor] Auto-completada: ${tareasVencidas[i].titulo}`);
            }
        }

        // La tarea más reciente vencida es la que necesita alerta
        const tareaRecienteVencida = tareasVencidas[0];
        console.log(`[TareasMonitor] Tarea más reciente vencida: ${tareaRecienteVencida.titulo} (${tareaRecienteVencida.hora})`);

        // Si ya hay una alerta mostrada para esta tarea, no hacer nada
        if (this.tareaAlertaActual && this.tareaAlertaActual.id === tareaRecienteVencida.id) {
            console.log('[TareasMonitor] Alerta ya mostrada para esta tarea');
            return;
        }

        // Mostrar alerta para la tarea más reciente vencida
        this.tareaAlertaActual = tareaRecienteVencida;
        this.alertaMostrada = false;
        console.log('[TareasMonitor] Mostrando alerta...');
        this.mostrarAlerta(tareaRecienteVencida);
    }

    mostrarAlerta(tarea) {
        if (this.alertaMostrada) return;
        this.alertaMostrada = true;

        // Actualizar badge de campana
        this.actualizarBadgeCampana(1);

        // Mostrar notificación emergente
        this.mostrarNotificacionEmergente(tarea);
    }

    actualizarBadgeCampana(cantidad) {
        const campana = document.getElementById('tareas-campana-alerta');
        if (!campana) return;

        const badge = campana.querySelector('.campana-badge');
        if (!badge) return;

        if (cantidad > 0) {
            badge.textContent = cantidad;
            badge.style.display = 'flex';
            campana.classList.add('tiene-alertas');
        } else {
            badge.style.display = 'none';
            campana.classList.remove('tiene-alertas');
        }
    }

    crearCampanaAlerta() {
        // Verificar si ya existe
        let campana = document.getElementById('tareas-campana-alerta');
        if (campana) return campana;

        // Buscar el contenedor en el header
        const container = document.getElementById('tareas-campana-container');
        if (!container) {
            console.error('No se encontró el contenedor de la campana en el header');
            return null;
        }

        campana = document.createElement('div');
        campana.id = 'tareas-campana-alerta';
        campana.className = 'tareas-campana';
        campana.innerHTML = `
            <button class="campana-btn" id="campana-btn-toggle" title="Alertas de tareas">
                <span class="campana-icono">🔔</span>
                <span class="campana-badge" style="display:none;">0</span>
            </button>
        `;

        container.appendChild(campana);

        // Event listener para abrir chat
        const btn = campana.querySelector('#campana-btn-toggle');
        btn.addEventListener('click', () => this.abrirChatTarea());

        return campana;
    }

    mostrarNotificacionEmergente(tarea) {
        const notif = document.createElement('div');
        notif.className = 'tarea-notificacion-emergente';
        notif.innerHTML = `
            <div class="notif-header">
                <span class="notif-icono">⏰</span>
                <span class="notif-titulo">Tarea pendiente</span>
                <button class="notif-close" id="notif-close-btn">✕</button>
            </div>
            <div class="notif-body">
                <p class="notif-tarea-titulo">${this.escapeHtml(tarea.titulo)}</p>
                <p class="notif-tarea-hora">Programada para las ${tarea.hora}</p>
            </div>
            <div class="notif-footer">
                <button class="notif-btn notif-btn-primary" id="notif-abrir-chat">Responder</button>
            </div>
        `;

        document.body.appendChild(notif);

        // Animar entrada
        setTimeout(() => notif.classList.add('show'), 100);

        // Event listeners
        const closeBtn = notif.querySelector('#notif-close-btn');
        closeBtn.addEventListener('click', () => this.cerrarNotificacion(notif));

        const abrirChatBtn = notif.querySelector('#notif-abrir-chat');
        abrirChatBtn.addEventListener('click', () => {
            this.cerrarNotificacion(notif);
            this.abrirChatTarea();
        });

        // Auto-cerrar después de 10 segundos
        setTimeout(() => {
            if (notif.parentElement) {
                this.cerrarNotificacion(notif);
            }
        }, 10000);
    }

    cerrarNotificacion(notif) {
        notif.classList.remove('show');
        setTimeout(() => {
            if (notif.parentElement) {
                notif.parentElement.removeChild(notif);
            }
        }, 300);
    }

    abrirChatTarea() {
        if (!this.tareaAlertaActual) return;

        const chatContainer = document.getElementById('tarea-chat-container');
        if (chatContainer) {
            chatContainer.remove();
        }

        const chat = document.createElement('div');
        chat.id = 'tarea-chat-container';
        chat.className = 'tarea-chat-modal';
        chat.innerHTML = `
            <div class="tarea-chat-overlay"></div>
            <div class="tarea-chat-box">
                <div class="tarea-chat-header">
                    <div>
                        <h3>Seguimiento de tarea</h3>
                        <p class="tarea-chat-subtitle">${this.escapeHtml(this.tareaAlertaActual.titulo)}</p>
                    </div>
                    <button class="tarea-chat-close" id="tarea-chat-close-btn">✕</button>
                </div>
                <div class="tarea-chat-messages" id="tarea-chat-messages">
                    <div class="tarea-chat-message bot">
                        <div class="chat-message-avatar">🤖</div>
                        <div class="chat-message-content">
                            <p>Hola, tenías esta tarea programada para las <strong>${this.tareaAlertaActual.hora}</strong>:</p>
                            <div class="chat-tarea-card">
                                <strong>${this.escapeHtml(this.tareaAlertaActual.titulo)}</strong>
                                <p>${this.escapeHtml(this.tareaAlertaActual.descripcion || '')}</p>
                            </div>
                            <p>¿Ya la completaste?</p>
                        </div>
                    </div>
                </div>
                <div class="tarea-chat-input-container">
                    <textarea id="tarea-chat-input" class="tarea-chat-input" placeholder="Escribe tu respuesta..." rows="2"></textarea>
                    <button class="tarea-chat-send-btn" id="tarea-chat-send-btn">
                        <span>📤</span>
                    </button>
                </div>
                <div class="tarea-chat-quick-actions">
                    <button class="quick-action-btn btn-completada" data-action="completada">✅ Sí, la completé</button>
                    <button class="quick-action-btn btn-no-contacto" data-action="no-contacto">❌ No contestó el cliente</button>
                </div>
            </div>
        `;

        document.body.appendChild(chat);

        // Animar entrada
        setTimeout(() => chat.classList.add('show'), 100);

        // Event listeners
        const closeBtn = chat.querySelector('#tarea-chat-close-btn');
        closeBtn.addEventListener('click', () => this.cerrarChat(chat));

        const overlay = chat.querySelector('.tarea-chat-overlay');
        overlay.addEventListener('click', () => this.cerrarChat(chat));

        const sendBtn = chat.querySelector('#tarea-chat-send-btn');
        sendBtn.addEventListener('click', () => this.enviarMensajeChat());

        const input = chat.querySelector('#tarea-chat-input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.enviarMensajeChat();
            }
        });

        // Quick actions
        const quickBtns = chat.querySelectorAll('.quick-action-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.ejecutarAccionRapida(action);
            });
        });
    }

    cerrarChat(chat) {
        chat.classList.remove('show');
        setTimeout(() => {
            if (chat.parentElement) {
                chat.parentElement.removeChild(chat);
            }
        }, 300);
    }

    async enviarMensajeChat() {
        const input = document.getElementById('tarea-chat-input');
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!input || !messagesContainer) return;

        const mensaje = input.value.trim();
        if (!mensaje) return;

        // Agregar mensaje del usuario
        this.agregarMensajeChat('user', mensaje);
        input.value = '';

        // Mostrar typing indicator
        this.mostrarTypingIndicator();

        // Enviar a N8N
        await this.enviarAN8N(mensaje, 'mensaje');
    }

    async ejecutarAccionRapida(action) {
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!messagesContainer) return;

        let mensajeUsuario = '';
        if (action === 'completada') {
            mensajeUsuario = 'Sí, la completé';
        } else if (action === 'no-contacto') {
            mensajeUsuario = 'No contestó el cliente';
        }

        // Agregar mensaje del usuario
        this.agregarMensajeChat('user', mensajeUsuario);

        // Mostrar typing indicator
        this.mostrarTypingIndicator();

        // Enviar a N8N
        await this.enviarAN8N(mensajeUsuario, action);
    }

    agregarMensajeChat(tipo, contenido) {
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!messagesContainer) return;

        const mensaje = document.createElement('div');
        mensaje.className = `tarea-chat-message ${tipo}`;
        
        if (tipo === 'user') {
            mensaje.innerHTML = `
                <div class="chat-message-content">
                    <p>${this.escapeHtml(contenido)}</p>
                </div>
                <div class="chat-message-avatar">👤</div>
            `;
        } else {
            mensaje.innerHTML = `
                <div class="chat-message-avatar">🤖</div>
                <div class="chat-message-content">
                    <p>${contenido}</p>
                </div>
            `;
        }

        messagesContainer.appendChild(mensaje);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    mostrarTypingIndicator() {
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!messagesContainer) return;

        const typing = document.createElement('div');
        typing.className = 'tarea-chat-message bot typing-indicator';
        typing.id = 'typing-indicator';
        typing.innerHTML = `
            <div class="chat-message-avatar">🤖</div>
            <div class="chat-message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removerTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing && typing.parentElement) {
            typing.parentElement.removeChild(typing);
        }
    }

    async enviarAN8N(mensaje, accion) {
        const payload = {
            header: {
                sessionId: this.sessionId,
                timestamp: new Date().toISOString(),
                currentUser: (window.CONFIG && CONFIG.user ? CONFIG.user.defaultName : 'Usuario')
            },
            body: {
                tarea: {
                    id: this.tareaAlertaActual.id,
                    titulo: this.tareaAlertaActual.titulo,
                    descripcion: this.tareaAlertaActual.descripcion,
                    hora: this.tareaAlertaActual.hora,
                    fecha: this.tareaAlertaActual.fecha,
                    tipo: this.tareaAlertaActual.tipo
                },
                mensaje,
                accion,
                timestamp: new Date().toISOString()
            }
        };

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }

            let data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                data = data[0];
            }

            this.procesarRespuestaN8N(data);
        } catch (error) {
            console.error('Error al comunicarse con N8N:', error);
            this.removerTypingIndicator();
            this.agregarMensajeChat('bot', 'Lo siento, ocurrió un error al procesar tu solicitud. Intenta nuevamente.');
        }
    }

    procesarRespuestaN8N(data) {
        this.removerTypingIndicator();

        const respuesta = data.respuesta || data.message || 'Entendido, he registrado tu respuesta.';
        this.agregarMensajeChat('bot', respuesta);

        // Procesar acciones
        if (data.accion === 'marcar_completada') {
            this.marcarTareaCompletada();
        } else if (data.accion === 'reagendar') {
            if (data.nuevaFecha && data.nuevaHora) {
                this.reagendarTarea(data.nuevaFecha, data.nuevaHora);
            }
        } else if (data.accion === 'cerrar_alerta') {
            this.cerrarAlerta();
        }
    }

    marcarTareaCompletada() {
        if (!this.tareaAlertaActual) return;

        this.tareaAlertaActual.completada = true;
        
        // Actualizar UI si el módulo está activo
        const moduloAcciones = window.MisAccionesModuleInstance;
        if (moduloAcciones && moduloAcciones.container) {
            moduloAcciones.updateGrupoUI('dia');
        }

        // Cerrar chat después de 2 segundos
        setTimeout(() => {
            const chat = document.getElementById('tarea-chat-container');
            if (chat) {
                this.cerrarChat(chat);
            }
            this.cerrarAlerta();
        }, 2000);
    }

    reagendarTarea(nuevaFecha, nuevaHora) {
        if (!this.tareaAlertaActual) return;

        this.tareaAlertaActual.fecha = `${nuevaFecha}T${nuevaHora}:00`;
        this.tareaAlertaActual.hora = nuevaHora;
        this.tareaAlertaActual.completada = false;

        // Cerrar chat después de 2 segundos
        setTimeout(() => {
            const chat = document.getElementById('tarea-chat-container');
            if (chat) {
                this.cerrarChat(chat);
            }
            this.cerrarAlerta();
        }, 2000);
    }

    cerrarAlerta() {
        this.tareaAlertaActual = null;
        this.alertaMostrada = false;
        this.actualizarBadgeCampana(0);
    }

    escapeHtml(texto) {
        if (!texto) return '';
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    // ============================================
    // MÉTODOS DE DEBUG Y PRUEBA
    // ============================================

    /**
     * Método para probar el servicio forzando una tarea vencida
     */
    simularTareaVencida() {
        const moduloAcciones = window.MisAccionesModuleInstance;
        if (!moduloAcciones || !moduloAcciones.tareas.dia) {
            console.error('[TareasMonitor] No se puede simular - módulo no disponible');
            return;
        }

        const ahora = new Date();
        const hace30Min = new Date(ahora.getTime() - 30 * 60 * 1000);
        const horaStr = `${hace30Min.getHours().toString().padStart(2, '0')}:${hace30Min.getMinutes().toString().padStart(2, '0')}`;
        
        // Modificar la primera tarea para que esté vencida
        if (moduloAcciones.tareas.dia.tareas.length > 0) {
            const tareaTest = moduloAcciones.tareas.dia.tareas[0];
            tareaTest.fecha = hace30Min.toISOString();
            tareaTest.hora = horaStr;
            tareaTest.completada = false;
            
            console.log(`[TareasMonitor] Tarea simulada vencida hace 30 minutos:`, tareaTest);
            console.log('[TareasMonitor] Ejecutando revisión manual...');
            
            // Forzar revisión inmediata
            this.revisarTareas();
        }
    }

    /**
     * Muestra el estado actual del servicio
     */
    mostrarEstado() {
        console.log('=== ESTADO DEL SERVICIO DE MONITOREO ===');
        console.log('Intervalo activo:', !!this.intervalId);
        console.log('Frecuencia de revisión:', this.checkInterval / 1000, 'segundos');
        console.log('Tarea con alerta actual:', this.tareaAlertaActual?.titulo || 'Ninguna');
        console.log('Alerta mostrada:', this.alertaMostrada);
        
        const moduloAcciones = window.MisAccionesModuleInstance;
        console.log('Módulo de acciones disponible:', !!moduloAcciones);
        
        if (moduloAcciones && moduloAcciones.tareas.dia) {
            const tareas = moduloAcciones.tareas.dia.tareas;
            console.log('Total tareas del día:', tareas.length);
            console.log('Tareas completadas:', tareas.filter(t => t.completada).length);
            
            const ahora = new Date();
            const vencidas = tareas.filter(t => !t.completada && new Date(t.fecha) < ahora);
            console.log('Tareas vencidas:', vencidas.length);
            
            if (vencidas.length > 0) {
                console.log('Tareas vencidas:', vencidas.map(t => `${t.titulo} (${t.hora})`));
            }
        }
        console.log('=====================================');
    }
}

// Instancia global
window.TareasMonitorService = new TareasMonitorService();

