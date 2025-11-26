/**
 * ============================================
 * SERVICIO DE MONITOREO DE TAREAS
 * ============================================
 * Monitorea tareas vencidas y se comunica con N8N
 */

class TareasMonitorService {
    constructor() {
        this.webhookUrl = 'https://abrahamnavarrete.app.n8n.cloud/webhook/SchedulerIA';
        this.sessionId = this.generateSessionId();
        this.checkInterval = 60000; // 1 minuto
        this.intervalId = null;
        this.tareaAlertaActual = null;
        this.alertaMostrada = false;
        this.esperandoConfirmacionReagendar = false;
        this.respuestaCompletada = null; // 'si', 'no', o null
    }

    generateSessionId() {
        return `tareas-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    init() {
        // Crear campana inmediatamente
        this.crearCampanaAlerta();
        
        // Esperar a que el módulo de acciones esté disponible antes de revisar
        this.esperarModuloYRevisar();
        
        this.iniciarMonitoreo();
        Helpers.log('Servicio de Monitoreo de Tareas iniciado', 'success');
    }

    esperarModuloYRevisar() {
        // Intentar revisar inmediatamente, si no está disponible, reintentar
        let intentos = 0;
        const maxIntentos = 20; // Máximo 10 segundos (20 * 500ms)
        
        const intentarRevisar = () => {
            const moduloAcciones = window.MisAccionesModuleInstance;
            
            if (moduloAcciones && moduloAcciones.tareas && moduloAcciones.tareas.dia?.tareas?.length > 0) {
                // Módulo disponible, revisar inmediatamente
                console.log('[TareasMonitor] Módulo de acciones disponible, revisando tareas al iniciar...');
                this.revisarTareas();
            } else if (intentos < maxIntentos) {
                // Esperar un poco más y reintentar
                intentos++;
                console.log(`[TareasMonitor] Esperando a que el módulo de acciones esté disponible... (intento ${intentos}/${maxIntentos})`);
                setTimeout(intentarRevisar, 500);
            } else {
                console.warn('[TareasMonitor] No se pudo cargar el módulo de acciones después de varios intentos');
            }
        };

        // Primer intento inmediato
        intentarRevisar();
    }

    iniciarMonitoreo() {
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

        // Filtrar tareas vencidas (que ya pasó su hora programada)
        const tareasVencidas = tareasDia
            .filter(tarea => {
                if (tarea.completada) return false;
                const fechaTarea = new Date(tarea.fecha);
                return fechaTarea < ahora;
            })
            .sort((a, b) => {
                // Ordenar por fecha descendente: la más reciente vencida primero
                // Esto significa la tarea cuya hora pasó más recientemente
                return new Date(b.fecha) - new Date(a.fecha);
            });

        if (tareasVencidas.length === 0) {
            console.log('[TareasMonitor] No hay tareas vencidas');
            return;
        }
        
        console.log(`[TareasMonitor] Encontradas ${tareasVencidas.length} tareas vencidas`);
        
        // Mostrar todas las tareas vencidas para debugging
        tareasVencidas.forEach((tarea, index) => {
            console.log(`[TareasMonitor] Tarea vencida ${index + 1}: ${tarea.titulo} (${tarea.hora}) - Fecha: ${new Date(tarea.fecha).toLocaleString()}`);
        });

        // La primera tarea en el array es la más reciente vencida (última que pasó)
        // Esta es la tarea cuya hora es la más cercana al momento actual pero que ya pasó
        const tareaRecienteVencida = tareasVencidas[0];
        console.log(`[TareasMonitor] Última tarea vencida (más cercana al momento actual): ${tareaRecienteVencida.titulo} (${tareaRecienteVencida.hora})`);

        // Auto-completar todas las demás tareas vencidas (excepto la más reciente)
        if (tareasVencidas.length > 1) {
            for (let i = 1; i < tareasVencidas.length; i++) {
                tareasVencidas[i].completada = true;
                console.log(`[TareasMonitor] Auto-completada: ${tareasVencidas[i].titulo} (${tareasVencidas[i].hora})`);
            }
        }

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
        // Si no hay tarea actual, mostrar mensaje informativo
        if (!this.tareaAlertaActual) {
            this.mostrarMensajeSinTareas();
            return;
        }

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
                    <button class="quick-action-btn btn-completada" data-action="si">✅ Sí</button>
                    <button class="quick-action-btn btn-no-contacto" data-action="no">❌ No</button>
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

        // Procesar siempre a través de IA
        this.mostrarTypingIndicator();
        await this.interpretarRespuesta(mensaje);
    }

    async interpretarRespuesta(mensaje) {
        // Enviar a N8N para interpretación completa
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
                contexto: {
                    esperandoConfirmacionReagendar: this.esperandoConfirmacionReagendar,
                    respuestaCompletada: this.respuestaCompletada
                },
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
            console.log('[TareasMonitor] Respuesta recibida de IA:', data);
            
            // Manejar diferentes formatos de respuesta de N8N
            if (Array.isArray(data) && data.length > 0) {
                data = data[0];
            }

            // Si la respuesta viene en formato de texto plano o en diferentes campos
            if (typeof data === 'string') {
                // Intentar parsear como JSON
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    // Si no es JSON, crear objeto con el texto como respuesta
                    data = { respuesta: data, accion: 'solicitar_mas_info' };
                }
            }

            // Si viene en formato de respuesta de OpenAI/LLM
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const content = data.choices[0].message.content;
                try {
                    data = JSON.parse(content);
                } catch (e) {
                    data = { respuesta: content, accion: 'solicitar_mas_info' };
                }
            }

            // Si viene en formato de output directo
            if (data.output && !data.respuesta) {
                try {
                    const parsed = JSON.parse(data.output);
                    data = { ...data, ...parsed };
                } catch (e) {
                    data.respuesta = data.output;
                }
            }

            this.removerTypingIndicator();

            // Procesar respuesta de la IA
            this.procesarRespuestaIA(data);
        } catch (error) {
            console.error('Error al interpretar respuesta:', error);
            this.removerTypingIndicator();
            this.agregarMensajeChat('bot', 'Lo siento, ocurrió un error al procesar tu respuesta. Por favor, intenta nuevamente.');
        }
    }

    procesarRespuestaIA(data) {
        console.log('[TareasMonitor] Procesando respuesta IA:', data);

        // VALIDACIÓN CRÍTICA: Si el usuario dijo "Sí" pero la IA devolvió acción incorrecta, corregirla
        const ultimoMensaje = this.obtenerUltimoMensajeUsuario();
        const accion = data.accion || data.action;
        
        if (ultimoMensaje && this.esRespuestaPositiva(ultimoMensaje)) {
            // El usuario dijo "Sí", debe marcar como completada, no reagendar
            if (accion === 'reagendar' || accion === 'solicitar_reagendar') {
                console.warn('[TareasMonitor] IA devolvió acción incorrecta para "Sí", corrigiendo a marcar_completada');
                // Corregir la acción
                data.accion = 'marcar_completada';
                data.respuesta = '¡Excelente! He marcado la tarea como completada.';
                // Limpiar campos de reagendar si existen
                delete data.nuevaFecha;
                delete data.nuevaHora;
            }
        }

        // Asegurar que siempre haya una respuesta visible
        let mensajeMostrado = false;

        // Procesar acciones según lo que la IA determine primero (o corregido)
        const accionFinal = data.accion || data.action;
        
        // Si la acción es reagendar con fecha y hora, no mostrar mensaje de respuesta vacío
        if (accionFinal === 'reagendar' && data.nuevaFecha && data.nuevaHora) {
            // No mostrar mensaje si la respuesta está vacía
            const respuestaTexto = data.respuesta || data.mensaje || data.response || data.output || data.text || data.content;
            if (respuestaTexto && respuestaTexto.trim() !== '') {
                // Solo mostrar si hay contenido
                let textoLimpio = respuestaTexto;
                if (typeof textoLimpio === 'string') {
                    textoLimpio = textoLimpio.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                    if (textoLimpio.startsWith('{')) {
                        try {
                            const parsed = JSON.parse(textoLimpio);
                            if (parsed.respuesta) {
                                textoLimpio = parsed.respuesta;
                            } else if (parsed.mensaje) {
                                textoLimpio = parsed.mensaje;
                            }
                        } catch (e) {
                            // No es JSON válido
                        }
                    }
                }
                if (textoLimpio && textoLimpio.trim() !== '') {
                    this.agregarMensajeChat('bot', textoLimpio);
                    mensajeMostrado = true;
                }
            }
            // Reagendar directamente sin mostrar mensajes adicionales
            this.reagendarTarea(data.nuevaFecha, data.nuevaHora);
            // Mostrar mensaje de confirmación simple
            if (!mensajeMostrado) {
                this.agregarMensajeChat('bot', `Perfecto. He reagendado la tarea para el ${data.nuevaFecha} a las ${data.nuevaHora}.`);
            }
            return; // Salir para no procesar más
        }
        
        // Mostrar respuesta del bot (probar diferentes campos posibles) - solo si no es marcar_completada (se mostrará después)
        if (accionFinal !== 'marcar_completada') {
            const respuestaTexto = data.respuesta || data.mensaje || data.response || data.output || data.text || data.content;
            
            if (respuestaTexto && respuestaTexto.trim() !== '') {
                // Limpiar el texto si viene con formato JSON o markdown
                let textoLimpio = respuestaTexto;
                if (typeof textoLimpio === 'string') {
                    // Remover markdown code blocks si existen
                    textoLimpio = textoLimpio.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                    // NO mostrar si es JSON puro sin respuesta válida
                    if (textoLimpio.startsWith('{')) {
                        try {
                            const parsed = JSON.parse(textoLimpio);
                            // Solo mostrar si tiene respuesta o mensaje con contenido
                            if (parsed.respuesta && parsed.respuesta.trim() !== '') {
                                textoLimpio = parsed.respuesta;
                            } else if (parsed.mensaje && parsed.mensaje.trim() !== '') {
                                textoLimpio = parsed.mensaje;
                            } else {
                                // JSON sin respuesta válida, no mostrar
                                textoLimpio = '';
                            }
                        } catch (e) {
                            // No es JSON válido, no mostrar
                            textoLimpio = '';
                        }
                    }
                }
                
                if (textoLimpio && textoLimpio.trim() !== '') {
                    this.agregarMensajeChat('bot', textoLimpio);
                    mensajeMostrado = true;
                }
            }
        }

        // Si no hay mensaje, mostrar uno por defecto (solo si no es una acción que ya maneja su propio mensaje)
        if (!mensajeMostrado && accionFinal !== 'reagendar' && accionFinal !== 'marcar_completada') {
            this.agregarMensajeChat('bot', 'Entendido.');
        }
        
        if (accionFinal === 'marcar_completada') {
            // Marcar como completada y NO mostrar botones de reagendar
            // Asegurar que el mensaje no mencione reagendar
            const respuestaTexto = data.respuesta || data.mensaje || data.response || data.output || data.text || data.content;
            if (respuestaTexto && typeof respuestaTexto === 'string') {
                // Si el mensaje menciona reagendar, reemplazarlo
                let mensajeLimpio = respuestaTexto;
                if (mensajeLimpio.toLowerCase().includes('reagendar')) {
                    mensajeLimpio = '¡Excelente! He marcado la tarea como completada.';
                }
                // Reemplazar el último mensaje del bot si existe
                const messagesContainer = document.getElementById('tarea-chat-messages');
                if (messagesContainer) {
                    const botMessages = messagesContainer.querySelectorAll('.tarea-chat-message.bot');
                    if (botMessages.length > 0) {
                        const ultimoBotMsg = botMessages[botMessages.length - 1];
                        const contenido = ultimoBotMsg.querySelector('.chat-message-content p');
                        if (contenido && contenido.textContent.includes('reagendar')) {
                            contenido.textContent = mensajeLimpio;
                        }
                    }
                }
            }
            // Si no hay mensaje mostrado, mostrar uno de confirmación
            if (!mensajeMostrado) {
                this.agregarMensajeChat('bot', '¡Excelente! He marcado la tarea como completada.');
            }
            this.marcarTareaCompletada();
            return; // Salir inmediatamente para no ejecutar el fallback
        } else if (accionFinal === 'reagendar') {
            // Esta sección solo se ejecuta si no tiene fecha y hora (ya se procesó arriba si las tiene)
            if (!data.nuevaFecha || !data.nuevaHora) {
                // La IA debe pedir fecha y hora
                this.esperandoConfirmacionReagendar = true;
                this.mostrarSelectorReagendar();
            }
            // Si tiene fecha y hora, ya se procesó arriba y se hizo return
        } else if (accionFinal === 'solicitar_reagendar') {
            // La IA quiere que preguntemos si quiere reagendar
            // Pero si el usuario ya dijo "No", directamente mostrar el selector
            const ultimoMensaje = this.obtenerUltimoMensajeUsuario();
            if (ultimoMensaje && this.esRespuestaNegativa(ultimoMensaje) && !ultimoMensaje.toLowerCase().includes('reagendar')) {
                // El usuario dijo "No" sin mencionar reagendar, mostrar selector directamente
                this.esperandoConfirmacionReagendar = false;
                this.mostrarSelectorReagendar();
            } else {
                // Mostrar botones para preguntar si quiere reagendar
                this.esperandoConfirmacionReagendar = true;
                this.mostrarBotonesReagendar();
            }
        } else if (accionFinal === 'cerrar_alerta') {
            this.cerrarAlerta();
            setTimeout(() => {
                const chat = document.getElementById('tarea-chat-container');
                if (chat) {
                    this.cerrarChat(chat);
                }
            }, 2000);
        } else if (accionFinal === 'solicitar_mas_info') {
            // Continuar la conversación, no hacer nada adicional
        } else {
            // Si no hay acción específica, verificar el último mensaje del usuario
            const ultimoMensaje = this.obtenerUltimoMensajeUsuario();
            
            if (ultimoMensaje) {
                // Verificar si es respuesta positiva (Sí) - NO preguntar sobre reagendar
                if (this.esRespuestaPositiva(ultimoMensaje)) {
                    console.log('[TareasMonitor] Detectado "Sí" sin acción, marcando como completada');
                    this.marcarTareaCompletada();
                    return; // Salir para no mostrar botones de reagendar
                }
                
                // Verificar si es respuesta negativa (No) - mostrar selector directamente
                if (this.esRespuestaNegativa(ultimoMensaje) && !ultimoMensaje.toLowerCase().includes('reagendar')) {
                    console.log('[TareasMonitor] Detectado "No" sin acción, mostrando selector de reagendar');
                    this.esperandoConfirmacionReagendar = false;
                    if (!mensajeMostrado) {
                        this.agregarMensajeChat('bot', 'Entiendo que no la completaste. Selecciona la nueva fecha y hora para reagendarla:');
                    }
                    this.mostrarSelectorReagendar();
                    return; // Salir después de mostrar selector
                }
            }
            
            // Si no hay acción específica y no se pudo determinar, solo continuar la conversación
            console.log('[TareasMonitor] No se especificó acción y no se pudo determinar intención, continuando conversación');
        }
    }

    obtenerUltimoMensajeUsuario() {
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!messagesContainer) return null;
        
        const mensajes = messagesContainer.querySelectorAll('.tarea-chat-message.user');
        if (mensajes.length === 0) return null;
        
        const ultimoMensaje = mensajes[mensajes.length - 1];
        const contenido = ultimoMensaje.querySelector('.chat-message-content p');
        return contenido ? contenido.textContent.trim() : null;
    }

    esRespuestaPositiva(mensaje) {
        if (!mensaje) return false;
        const texto = mensaje.toLowerCase().trim();
        const palabrasSi = ['si', 'sí', 'yes', 'completé', 'completada', 'hecho', 'listo', 'terminé', 'terminada', 'realicé', 'realizada', 'ya', 'correcto', 'ok', 'okay', 'claro', 'por supuesto', 'ya la hice', 'ya está'];
        // Verificar que sea una respuesta positiva clara (no solo contiene la palabra, sino que es la intención)
        return palabrasSi.some(palabra => {
            // Buscar la palabra como palabra completa o al inicio/fin del mensaje
            const regex = new RegExp(`(^|\\s)${palabra}(\\s|$)`, 'i');
            return regex.test(texto);
        });
    }

    esRespuestaNegativa(mensaje) {
        if (!mensaje) return false;
        const texto = mensaje.toLowerCase().trim();
        const palabrasNo = ['no', 'not', 'aún no', 'todavía no', 'pendiente', 'falta', 'no he', 'no pude', 'no contestó', 'no respondió', 'nunca', 'aun no', 'no la completé', 'no completé', 'no la hice'];
        // Verificar que sea una respuesta negativa clara
        return palabrasNo.some(palabra => {
            // Buscar la palabra como palabra completa o al inicio/fin del mensaje
            const regex = new RegExp(`(^|\\s)${palabra}(\\s|$)`, 'i');
            return regex.test(texto);
        });
    }

    interpretarLocalmente(mensaje) {
        // Interpretación local básica como fallback
        const texto = mensaje.toLowerCase().trim();
        
        // Palabras que indican "Sí"
        const palabrasSi = ['si', 'sí', 'yes', 'completé', 'completada', 'hecho', 'listo', 'terminé', 'terminada', 'realicé', 'realizada', 'ya', 'correcto', 'ok', 'okay', 'claro', 'por supuesto'];
        
        // Palabras que indican "No"
        const palabrasNo = ['no', 'not', 'aún no', 'todavía no', 'pendiente', 'falta', 'no he', 'no pude', 'no pude', 'no contestó', 'no respondió', 'nunca', 'aun no'];
        
        // Verificar si contiene palabras de "Sí"
        if (palabrasSi.some(palabra => texto.includes(palabra))) {
            return 'si';
        }
        
        // Verificar si contiene palabras de "No"
        if (palabrasNo.some(palabra => texto.includes(palabra))) {
            return 'no';
        }
        
        // Por defecto, si no se puede interpretar, preguntar al usuario
        return null;
    }


    mostrarBotonesReagendar() {
        const quickActions = document.querySelector('.tarea-chat-quick-actions');
        if (!quickActions) return;

        quickActions.innerHTML = `
            <button class="quick-action-btn btn-completada" data-action="reagendar-si">✅ Sí, reagendar</button>
            <button class="quick-action-btn btn-no-contacto" data-action="reagendar-no">❌ No, no es necesario</button>
        `;

        // Event listeners
        const btns = quickActions.querySelectorAll('.quick-action-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const action = btn.dataset.action;
                if (action === 'reagendar-si') {
                    // Enviar mensaje a través de IA para que determine si tiene fecha/hora o necesita pedirlas
                    this.agregarMensajeChat('user', 'Sí, reagendar');
                    this.mostrarTypingIndicator();
                    await this.interpretarRespuesta('Sí, reagendar');
                } else if (action === 'reagendar-no') {
                    // Enviar a través de IA
                    this.agregarMensajeChat('user', 'No, no es necesario');
                    this.mostrarTypingIndicator();
                    await this.interpretarRespuesta('No, no es necesario');
                }
            });
        });
    }

    procesarConfirmacionReagendar(mensaje) {
        const texto = mensaje.toLowerCase().trim();
        const palabrasSi = ['si', 'sí', 'yes', 'reagendar', 'sí reagendar'];
        const palabrasNo = ['no', 'not', 'no es necesario', 'no necesario'];

        if (palabrasSi.some(palabra => texto.includes(palabra))) {
            this.mostrarSelectorReagendar();
        } else if (palabrasNo.some(palabra => texto.includes(palabra))) {
            this.agregarMensajeChat('bot', 'Entendido. La tarea quedará pendiente.');
            this.cerrarAlerta();
            setTimeout(() => {
                const chat = document.getElementById('tarea-chat-container');
                if (chat) {
                    this.cerrarChat(chat);
                }
            }, 2000);
        } else {
            this.agregarMensajeChat('bot', 'Por favor, responde "Sí" si quieres reagendar o "No" si no es necesario.');
        }
    }

    mostrarSelectorReagendar() {
        this.esperandoConfirmacionReagendar = false;
        
        // Obtener fecha y hora mínimas (hoy)
        const hoy = new Date();
        const fechaMin = hoy.toISOString().split('T')[0];
        const horaMin = `${hoy.getHours().toString().padStart(2, '0')}:${hoy.getMinutes().toString().padStart(2, '0')}`;

        // Crear selector de fecha y hora
        const selectorHTML = `
            <div class="reagendar-selector" id="reagendar-selector">
                <div class="reagendar-fecha">
                    <label>Fecha:</label>
                    <input type="date" id="reagendar-fecha" min="${fechaMin}" value="${fechaMin}" class="reagendar-input">
                </div>
                <div class="reagendar-hora">
                    <label>Hora:</label>
                    <input type="time" id="reagendar-hora" class="reagendar-input" value="${this.tareaAlertaActual.hora || '10:00'}">
                </div>
                <div class="reagendar-actions">
                    <button class="quick-action-btn btn-completada" id="confirmar-reagendar">Confirmar reagendar</button>
                    <button class="quick-action-btn btn-no-contacto" id="cancelar-reagendar">Cancelar</button>
                </div>
            </div>
        `;

        // Agregar mensaje del bot con el selector
        this.agregarMensajeChat('bot', 'Perfecto. Selecciona la nueva fecha y hora para reagendar la tarea:');
        
        // Agregar selector al contenedor de mensajes
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!messagesContainer) {
            console.error('[TareasMonitor] No se encontró el contenedor de mensajes');
            return;
        }

        const selectorDiv = document.createElement('div');
        selectorDiv.className = 'tarea-chat-message bot';
        selectorDiv.innerHTML = `
            <div class="chat-message-avatar">🤖</div>
            <div class="chat-message-content">
                ${selectorHTML}
            </div>
        `;
        messagesContainer.appendChild(selectorDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Esperar a que el DOM se actualice antes de agregar event listeners
        setTimeout(() => {
            // Usar selectores dentro del selectorDiv para evitar conflictos de IDs
            const selectorContainer = selectorDiv.querySelector('#reagendar-selector');
            if (!selectorContainer) {
                console.error('[TareasMonitor] No se encontró el contenedor del selector');
                return;
            }

            const confirmarBtn = selectorContainer.querySelector('#confirmar-reagendar');
            const cancelarBtn = selectorContainer.querySelector('#cancelar-reagendar');
            const fechaInput = selectorContainer.querySelector('#reagendar-fecha');
            const horaInput = selectorContainer.querySelector('#reagendar-hora');

            if (!confirmarBtn || !cancelarBtn || !fechaInput || !horaInput) {
                console.error('[TareasMonitor] No se encontraron los elementos del selector', {
                    confirmarBtn: !!confirmarBtn,
                    cancelarBtn: !!cancelarBtn,
                    fechaInput: !!fechaInput,
                    horaInput: !!horaInput
                });
                return;
            }

            // Event listener para confirmar
            confirmarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const fecha = fechaInput.value;
                const hora = horaInput.value;
                
                console.log('[TareasMonitor] Confirmar reagendar clickeado', { fecha, hora });
                
                if (fecha && hora) {
                    // Agregar mensaje del usuario
                    this.agregarMensajeChat('user', `Reagendar para ${fecha} a las ${hora}`);
                    // Reagendar directamente
                    this.reagendarTarea(fecha, hora);
                    // Mensaje de confirmación
                    this.agregarMensajeChat('bot', `Perfecto. He reagendado la tarea para el ${fecha} a las ${hora}.`);
                } else {
                    console.warn('[TareasMonitor] Faltan fecha o hora', { fecha, hora });
                    this.agregarMensajeChat('bot', 'Por favor, selecciona tanto la fecha como la hora.');
                }
            });

            // Event listener para cancelar
            cancelarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                this.agregarMensajeChat('user', 'Cancelar');
                this.agregarMensajeChat('bot', 'Reagendamiento cancelado.');
                this.cerrarAlerta();
                setTimeout(() => {
                    const chat = document.getElementById('tarea-chat-container');
                    if (chat) {
                        this.cerrarChat(chat);
                    }
                }, 2000);
            });
        }, 100);
    }


    async ejecutarAccionRapida(action) {
        const messagesContainer = document.getElementById('tarea-chat-messages');
        if (!messagesContainer) return;

        let mensajeUsuario = '';
        if (action === 'si') {
            mensajeUsuario = 'Sí';
        } else if (action === 'no') {
            mensajeUsuario = 'No';
        }

        // Agregar mensaje del usuario
        this.agregarMensajeChat('user', mensajeUsuario);

        // Procesar respuesta a través de IA
        this.mostrarTypingIndicator();
        await this.interpretarRespuesta(mensajeUsuario);
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

        // Formatear fecha correctamente
        const fechaCompleta = `${nuevaFecha}T${nuevaHora}:00`;
        this.tareaAlertaActual.fecha = fechaCompleta;
        this.tareaAlertaActual.hora = nuevaHora;
        this.tareaAlertaActual.completada = false; // Asegurar que NO esté completada

        console.log('[TareasMonitor] Reagendando tarea:', {
            id: this.tareaAlertaActual.id,
            nuevaFecha: fechaCompleta,
            nuevaHora: nuevaHora,
            completada: this.tareaAlertaActual.completada
        });

        // Actualizar UI si el módulo está activo
        const moduloAcciones = window.MisAccionesModuleInstance;
        if (moduloAcciones && moduloAcciones.container) {
            moduloAcciones.updateGrupoUI('dia');
        }

        // Cerrar alerta y chat
        this.cerrarAlerta();
        
        // Cerrar chat después de un breve delay para que el usuario vea la confirmación
        setTimeout(() => {
            const chat = document.getElementById('tarea-chat-container');
            if (chat) {
                this.cerrarChat(chat);
            }
        }, 2000);
    }

    cerrarAlerta() {
        this.tareaAlertaActual = null;
        this.alertaMostrada = false;
        this.esperandoConfirmacionReagendar = false;
        this.respuestaCompletada = null;
        this.actualizarBadgeCampana(0);
    }

    mostrarMensajeSinTareas() {
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
                        <h3>Alertas de tareas</h3>
                        <p class="tarea-chat-subtitle">Sistema de monitoreo</p>
                    </div>
                    <button class="tarea-chat-close" id="tarea-chat-close-btn">✕</button>
                </div>
                <div class="tarea-chat-messages" id="tarea-chat-messages">
                    <div class="tarea-chat-message bot">
                        <div class="chat-message-avatar">🤖</div>
                        <div class="chat-message-content">
                            <p>¡Hola! 👋</p>
                            <p>No tienes tareas pendientes en este momento. Te notificaré cuando haya alguna tarea que requiera tu atención.</p>
                            <p>El sistema monitorea automáticamente tus tareas y te alertará cuando sea necesario.</p>
                        </div>
                    </div>
                </div>
                <div class="tarea-chat-input-container" style="display: none;"></div>
                <div class="tarea-chat-quick-actions" style="display: none;"></div>
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

