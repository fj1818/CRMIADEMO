/**
 * ============================================
 * MÓDULO DEL ASISTENTE IA
 * ============================================
 * Gestiona la barra lateral con el asistente REGIO
 * y la comunicación con el webhook de n8n.
 */

class AssistantIAModule {
    constructor() {
        this.sidebar = null;
        this.floatBtn = null;
        this.closeBtn = null;
        this.navButtons = [];
        this.views = {};
        this.aiInput = null;
        this.aiSendBtn = null;
        this.cotizadorInput = null;
        this.cotizadorSendBtn = null;
        this.chatContainer = null;
        this.cotizadorChat = null;
        this.accionesContainer = null;
        this.juntasContainer = null;

        this.sessionId = this.generateSessionId();
        this.conversationHistory = [];
        this.webhookUrl = 'https://abrahamnavarrete.app.n8n.cloud/webhook/REGIOIA2';
        this.isProcessing = false;
    }

    init() {
        this.sidebar = document.getElementById('aiSidebar');
        this.floatBtn = document.getElementById('aiFloatBtn');
        this.closeBtn = document.getElementById('aiSidebarCloseBtn');
        this.aiInput = document.getElementById('aiInput');
        this.aiSendBtn = document.getElementById('aiSendBtn');
        this.cotizadorInput = document.getElementById('cotizadorInput');
        this.cotizadorSendBtn = document.getElementById('cotizadorSendBtn');
        this.chatContainer = document.getElementById('aiChatContainer');
        this.cotizadorChat = document.getElementById('cotizadorChat');
        this.accionesContainer = document.getElementById('accionesContainer');
        this.juntasContainer = document.getElementById('juntasContainer');

        if (!this.sidebar || !this.floatBtn || !this.aiInput || !this.aiSendBtn) {
            console.warn('Assistant IA: elementos base no encontrados, el módulo no se inicializará.');
            return;
        }

        this.navButtons = Array.from(document.querySelectorAll('.sidebar-nav-btn'));
        this.views = {
            agente: document.getElementById('viewAgente'),
            acciones: document.getElementById('viewAcciones'),
            juntas: document.getElementById('viewJuntas'),
            cotizador: document.getElementById('viewCotizador')
        };

        this.bindEvents();
        // Esperar un momento para que el módulo de actividades se inicialice
        setTimeout(() => {
            this.renderAcciones();
        }, 500);
        this.renderJuntas();

        Helpers && Helpers.log ? Helpers.log('Módulo del asistente IA inicializado', 'info') : console.log('Assistant IA listo');
    }

    bindEvents() {
        this.floatBtn.addEventListener('click', () => this.toggleSidebar(true));

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.toggleSidebar(false));
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.sidebar.classList.contains('active')) {
                this.toggleSidebar(false);
            }
        });

        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });

        this.aiSendBtn.addEventListener('click', () => this.handleAIMessage());
        this.aiInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.handleAIMessage();
            }
        });
        this.aiInput.addEventListener('input', () => this.autoResizeTextarea(this.aiInput, 140));

        if (this.cotizadorSendBtn && this.cotizadorInput) {
            this.cotizadorSendBtn.addEventListener('click', () => this.handleCotizadorMessage());
            this.cotizadorInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    this.handleCotizadorMessage();
                }
            });
            this.cotizadorInput.addEventListener('input', () => this.autoResizeTextarea(this.cotizadorInput, 120));
        }

        this.sidebar.addEventListener('transitionend', () => {
            const isOpen = this.sidebar.classList.contains('active');
            this.sidebar.setAttribute('aria-hidden', String(!isOpen));
        });
    }

    toggleSidebar(forceOpen = null) {
        const shouldOpen = forceOpen !== null ? forceOpen : !this.sidebar.classList.contains('active');

        if (shouldOpen) {
            this.sidebar.classList.add('active');
            this.sidebar.setAttribute('aria-hidden', 'false');
            this.floatBtn.classList.add('hidden');
            this.aiInput.focus();
        } else {
            this.sidebar.classList.remove('active');
            this.sidebar.setAttribute('aria-hidden', 'true');
            this.floatBtn.classList.remove('hidden');
        }
    }

    switchView(view) {
        if (!this.views[view]) return;

        this.navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
            btn.setAttribute('aria-selected', String(btn.dataset.view === view));
        });

        Object.entries(this.views).forEach(([name, element]) => {
            element.classList.toggle('active', name === view);
        });

        if (view === 'acciones') {
            // Asegurar que las actividades estén actualizadas
            setTimeout(() => {
                this.renderAcciones();
            }, 100);
        } else if (view === 'juntas') {
            this.renderJuntas();
        }
    }

    autoResizeTextarea(textarea, maxHeight = 140) {
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }

    async handleAIMessage() {
        const message = this.aiInput.value.trim();
        if (!message || this.isProcessing) return;

        this.addMessageToChat('user', message);
        this.aiInput.value = '';
        this.autoResizeTextarea(this.aiInput);

        await this.sendMessageToWebhook({
            message,
            origin: 'agente',
            targetChat: 'ai'
        });
    }

    async handleCotizadorMessage() {
        if (!this.cotizadorInput) return;
        const message = this.cotizadorInput.value.trim();
        if (!message || this.isProcessing) return;

        this.addMessageToCotizador('usuario', message);
        this.cotizadorInput.value = '';
        this.autoResizeTextarea(this.cotizadorInput);

        await this.sendMessageToWebhook({
            message,
            origin: 'cotizador',
            targetChat: 'cotizador'
        });
    }

    async sendMessageToWebhook({ message, origin, targetChat }) {
        this.isProcessing = true;

        if (targetChat === 'ai') {
            this.showTypingIndicator();
        } else {
            this.showCotizadorTyping();
        }

        const requestData = {
            header: {
                sessionId: this.sessionId,
                timestamp: new Date().toISOString(),
                currentUser: (window.CONFIG && CONFIG.user ? CONFIG.user.defaultName : 'Usuario')
            },
            body: {
                chatInput: message,
                origin,
                context: this.buildContext(origin),
                conversationHistory: this.conversationHistory
            }
        };

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }

            let data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                data = data[0];
            }

            const assistantMessage = this.extractResponseText(data);

            if (targetChat === 'ai') {
                this.removeTypingIndicator();
                this.addMessageToChat('assistant', assistantMessage);
            } else {
                this.removeCotizadorTyping();
                this.addMessageToCotizador('asistente', assistantMessage);
            }

            this.handleSuggestedActions(data);

            this.pushToHistory({ role: 'user', content: message });
            this.pushToHistory({ role: 'assistant', content: assistantMessage });
        } catch (error) {
            console.error('Assistant IA - Error al comunicarse con n8n:', error);
            if (targetChat === 'ai') {
                this.removeTypingIndicator();
                this.addErrorMessage('No pude conectarme con el asistente. Verifica que el webhook esté disponible.');
            } else {
                this.removeCotizadorTyping();
                this.addMessageToCotizador('asistente', 'Lo siento, ocurrió un error al generar la cotización. Intenta nuevamente más tarde.');
            }
        } finally {
            this.isProcessing = false;
        }
    }

    buildContext(origin) {
        const oportunidades = window.OportunidadesUtils && typeof OportunidadesUtils.getTodos === 'function'
            ? OportunidadesUtils.getTodos()
            : (window.OPORTUNIDADES_DATA || []);

        const prospectos = window.ProspectosUtils && typeof ProspectosUtils.getTodos === 'function'
            ? ProspectosUtils.getTodos()
            : [];

        const accionesTotales = this.obtenerAccionesConExtras();
        const tareasPendientes = accionesTotales.filter(accion => !accion.fechaCompletado);

        const agendaEventos = this.obtenerAgendaConExtras();
        const juntas = agendaEventos.filter(evento =>
            evento.tipo && evento.tipo.toLowerCase().includes('junta')
        );

        const productos = window.ProductosUtils && typeof ProductosUtils.getTodos === 'function'
            ? ProductosUtils.getTodos()
            : (window.PRODUCTOS_DATA || []);

        return {
            oportunidades,
            prospectos,
            tareas: tareasPendientes,
            acciones: accionesTotales,
            juntas,
            agenda: agendaEventos,
            productos,
            origin,
            resumen: {
                totalOportunidades: oportunidades.length,
                oportunidadesAbiertas: oportunidades.filter(o => o.estado && o.estado.toLowerCase().includes('abierta')).length,
                totalProspectos: prospectos.length,
                tareasPendientes: tareasPendientes.length,
                totalAcciones: accionesTotales.length,
                totalJuntas: juntas.length,
                agendaProgramada: agendaEventos.length,
                productosActivos: productos.filter(p => !p.fechaBaja).length
            }
        };
    }

    extractResponseText(data) {
        if (!data) return 'No recibí una respuesta del asistente.';
        return data.output || data.response || data.message || data.text || 'La solicitud fue procesada correctamente.';
    }

    handleSuggestedActions(data) {
        if (!data || !Array.isArray(data.actions) || data.actions.length === 0) return;

        const resumen = data.actions.map((action, index) => {
            if (action.type === 'update_opportunity') {
                return `${index + 1}. Actualizar oportunidad ${action.opportunityId || ''} (${action.changes ? Object.keys(action.changes).join(', ') : 'sin cambios detallados'})`;
            }
            if (action.type === 'create_opportunity') {
                return `${index + 1}. Crear oportunidad para ${action.data?.client || 'cliente sin nombre'}`;
            }
            return `${index + 1}. Acción sugerida: ${action.type}`;
        }).join('\n');

        this.addMessageToChat('assistant', `He identificado ${data.actions.length} acción(es) potencial(es):\n${resumen}\nConfírmame si deseas que las ejecutemos manualmente.`);
    }

    addMessageToChat(type, message) {
        if (!this.chatContainer) return;

        const wrapper = document.createElement('div');
        wrapper.className = `ai-message ${type}`;

        const bubble = document.createElement('div');
        bubble.className = 'ai-message-bubble';
        bubble.innerHTML = this.escapeHtml(message).replace(/\n/g, '<br>');

        const time = document.createElement('div');
        time.className = 'ai-message-time';
        time.textContent = new Date().toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit'
        });

        wrapper.appendChild(bubble);
        wrapper.appendChild(time);
        this.chatContainer.appendChild(wrapper);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    addErrorMessage(message) {
        if (!this.chatContainer) return;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'ai-error-message';
        errorDiv.textContent = message;
        this.chatContainer.appendChild(errorDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    showTypingIndicator() {
        if (!this.chatContainer) return;
        const typing = document.createElement('div');
        typing.className = 'ai-message assistant';
        typing.id = 'aiTypingIndicator';
        typing.innerHTML = `
            <div class="ai-typing-indicator">
                <div class="ai-typing-dot"></div>
                <div class="ai-typing-dot"></div>
                <div class="ai-typing-dot"></div>
            </div>`;
        this.chatContainer.appendChild(typing);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typing = document.getElementById('aiTypingIndicator');
        if (typing) typing.remove();
    }

    addMessageToCotizador(tipo, mensaje) {
        if (!this.cotizadorChat) return;
        const wrapper = document.createElement('div');
        wrapper.className = `cotizador-message ${tipo}`;

        const avatar = document.createElement('div');
        avatar.className = 'cotizador-message-avatar';
        avatar.textContent = tipo === 'usuario' ? '👤' : '💰';

        const content = document.createElement('div');
        content.className = 'cotizador-message-content';
        content.innerHTML = `<strong>${tipo === 'usuario' ? 'Usuario' : 'Cotizador'}:</strong> ${this.escapeHtml(mensaje)}`;

        wrapper.appendChild(avatar);
        wrapper.appendChild(content);
        this.cotizadorChat.appendChild(wrapper);
        this.cotizadorChat.scrollTop = this.cotizadorChat.scrollHeight;
    }

    showCotizadorTyping() {
        if (!this.cotizadorChat) return;
        const typing = document.createElement('div');
        typing.className = 'cotizador-message asistente';
        typing.id = 'cotizadorTypingIndicator';
        typing.innerHTML = `
            <div class="cotizador-message-avatar">💰</div>
            <div class="cotizador-message-content">
                <strong>Cotizador:</strong> Procesando tu solicitud...
            </div>`;
        this.cotizadorChat.appendChild(typing);
        this.cotizadorChat.scrollTop = this.cotizadorChat.scrollHeight;
    }

    removeCotizadorTyping() {
        const typing = document.getElementById('cotizadorTypingIndicator');
        if (typing) typing.remove();
    }

    renderAcciones() {
        if (!this.accionesContainer) return;

        // Obtener las actividades de hoy desde Mis actividades (pestaña "Hoy")
        const actividadesHoy = this.obtenerActividadesHoy();
        
        if (actividadesHoy.length === 0) {
            // Intentar una vez más después de un breve delay
            setTimeout(() => {
                const actividadesRetry = this.obtenerActividadesHoy();
                if (actividadesRetry.length > 0) {
                    this.renderActividadesList(actividadesRetry);
                } else {
                    this.accionesContainer.innerHTML = '<p>No tienes actividades programadas para hoy.</p>';
                }
            }, 1000);
            return;
        }

        this.renderActividadesList(actividadesHoy);
    }

    renderActividadesList(actividadesMiercoles) {
        if (!this.accionesContainer) return;

        // Ordenar por hora
        const sorted = actividadesMiercoles.sort((a, b) => {
            const fechaA = a.fecha ? new Date(a.fecha).getTime() : Number.MAX_SAFE_INTEGER;
            const fechaB = b.fecha ? new Date(b.fecha).getTime() : Number.MAX_SAFE_INTEGER;
            return fechaA - fechaB;
        });

        this.accionesContainer.innerHTML = sorted.map(actividad => {
            const fecha = actividad.fecha ? this.formatDateTimeSafe(actividad.fecha) : 'Sin fecha programada';
            const tipoInfo = this.getTipoInfoActividad(actividad.tipo);
            const metaTags = [
                `<span class="recordatorio-tag">${tipoInfo.icono} ${tipoInfo.etiqueta}</span>`,
                actividad.completada ? '<span class="recordatorio-tag">✅ Completada</span>' : '<span class="recordatorio-tag">⏳ Pendiente</span>',
                `<span class="recordatorio-tag">📅 ${this.escapeHtml(fecha)}</span>`
            ].filter(Boolean).join('');

            return `
                <article class="recordatorio-card ${actividad.completada ? 'completada' : ''}">
                    <div class="recordatorio-title">
                        <span>${tipoInfo.icono}</span>
                        <span>${this.escapeHtml(actividad.titulo)}</span>
                    </div>
                    <div class="recordatorio-meta">
                        ${metaTags}
                    </div>
                    ${actividad.descripcion ? `<p class="recordatorio-descripcion">${this.escapeHtml(actividad.descripcion)}</p>` : ''}
                </article>
            `;
        }).join('');
    }

    obtenerActividadesHoy() {
        let moduloAcciones = window.MisAccionesModuleInstance;
        
        // Si el módulo no está inicializado, inicializarlo
        if (!moduloAcciones) {
            console.log('[AssistantIA] Módulo de actividades no disponible, intentando inicializar...');
            
            // Intentar inicializar el módulo manualmente
            if (window.MisAccionesModule) {
                moduloAcciones = new window.MisAccionesModule();
                moduloAcciones.init();
                window.MisAccionesModuleInstance = moduloAcciones;
                console.log('[AssistantIA] Módulo de actividades inicializado');
            } else {
                console.log('[AssistantIA] Clase MisAccionesModule no disponible');
                return [];
            }
        }

        // Asegurar que las tareas estén generadas
        if (!moduloAcciones.tareas || 
            (!moduloAcciones.tareas.dia?.tareas?.length && 
             !moduloAcciones.tareas.semana?.tareas?.length && 
             !moduloAcciones.tareas.mes?.tareas?.length)) {
            // Forzar la generación de tareas
            if (typeof moduloAcciones.cargarDatos === 'function') {
                moduloAcciones.cargarDatos();
            } else if (typeof moduloAcciones.generarTareas === 'function') {
                moduloAcciones.generarTareas();
            }
        }

        if (!moduloAcciones.tareas) {
            console.log('[AssistantIA] No se pudieron generar las tareas');
            return [];
        }

        // Obtener las actividades de la pestaña "Hoy" (categoría "dia")
        const actividadesHoy = moduloAcciones.tareas.dia?.tareas || [];
        
        console.log('[AssistantIA] Actividades de hoy encontradas:', actividadesHoy.length);
        if (actividadesHoy.length > 0) {
            console.log('[AssistantIA] Ejemplo de actividad:', {
                titulo: actividadesHoy[0].titulo,
                fecha: actividadesHoy[0].fecha,
                fechaEtiqueta: actividadesHoy[0].fechaEtiqueta,
                tipo: actividadesHoy[0].tipo
            });
        } else {
            console.log('[AssistantIA] No hay actividades en tareas.dia');
            console.log('[AssistantIA] Estado del módulo:', {
                tieneTareas: !!moduloAcciones.tareas,
                tieneDia: !!moduloAcciones.tareas?.dia,
                tareasDia: moduloAcciones.tareas?.dia?.tareas?.length || 0
            });
        }
        
        return actividadesHoy;
    }

    formatearEtiquetaEsperada(fecha) {
        // Formatear similar a como lo hace MisAccionesModule
        const opciones = { weekday: 'long', day: '2-digit', month: 'short' };
        let etiqueta = new Intl.DateTimeFormat('es-MX', opciones).format(fecha);
        etiqueta = etiqueta.replace('.', '').replace(',', ' · ');
        return etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1);
    }

    getTipoInfoActividad(tipo = '') {
        const mapa = {
            reunion: { icono: '🤝', etiqueta: 'Reunión' },
            seguimiento: { icono: '🔁', etiqueta: 'Seguimiento' },
            llamada: { icono: '📞', etiqueta: 'Llamada' },
            documentacion: { icono: '🗂️', etiqueta: 'Documentación' },
            firma: { icono: '✍️', etiqueta: 'Firma' },
            estrategia: { icono: '📊', etiqueta: 'Estrategia' },
            oferta: { icono: '💡', etiqueta: 'Oferta' },
            expediente: { icono: '🗃️', etiqueta: 'Expediente' },
            crm: { icono: '📝', etiqueta: 'CRM' }
        };
        return mapa[tipo] || { icono: '📝', etiqueta: 'Tarea' };
    }

    renderJuntas() {
        if (!this.juntasContainer) return;

        const juntas = this.obtenerAgendaConExtras()
            .filter(evento => evento.tipo && evento.tipo.toLowerCase().includes('junta'));

        if (juntas.length === 0) {
            this.juntasContainer.innerHTML = '<p>No hay eventos en la agenda.</p>';
            return;
        }

        this.juntasContainer.innerHTML = juntas.map(evento => {
            const inicio = evento.fechaInicio ? this.formatDateTimeSafe(evento.fechaInicio) : 'Sin fecha';
            return `
                <article class="agenda-card">
                    <div class="agenda-title">
                        <span>🤝</span>
                        <span>${this.escapeHtml(evento.titulo)}</span>
                    </div>
                    <div class="agenda-meta">
                        <span>🕒 ${this.escapeHtml(inicio)}</span>
                        ${evento.descripcion ? `<span>${this.escapeHtml(evento.descripcion)}</span>` : ''}
                    </div>
                </article>
            `;
        }).join('');
    }

    getAgendaIcon(tipo) {
        const mapa = {
            'Visita': '🏢',
            'Llamada': '📞',
            'Junta': '🤝',
            'Capacitación': '🎓'
        };
        return mapa[tipo] || '📅';
    }

    formatDateTimeSafe(dateString) {
        try {
            if (window.Helpers && typeof Helpers.formatDateTime === 'function') {
                return Helpers.formatDateTime(new Date(dateString));
            }
            const date = new Date(dateString);
            return date.toLocaleString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    }

    obtenerAccionesConExtras() {
        const base = window.AccionesUtils && typeof AccionesUtils.getTodas === 'function'
            ? AccionesUtils.getTodas()
            : (window.ACCIONES_DATA || []);
        return [...base, ...this.generarAccionesDiarias()];
    }

    mapearAccionParaMostrar(accion) {
        const prospecto = window.ProspectosUtils && accion.idProspecto
            ? ProspectosUtils.getPorId(accion.idProspecto)
            : null;
        const clientes = window.ClientesUtils && typeof ClientesUtils.getTodos === 'function'
            ? ClientesUtils.getTodos()
            : [];
        const cliente = accion.idCliente
            ? clientes.find(c => c.ide === accion.idCliente || c.id === accion.idCliente)
            : null;

        return {
            ...accion,
            prospectoNombre: prospecto ? prospecto.nombre : '',
            clienteNombre: cliente ? cliente.nombre : ''
        };
    }

    generarAccionesDiarias() {
        const hoy = new Date();
        const anioReferencia = this.obtenerAnioReferencia();
        const fechaLocal = new Date(anioReferencia, hoy.getMonth(), hoy.getDate());
        const isoBase = fechaLocal.toISOString().split('T')[0];

        return [
            {
                id: 'ACT-HOY-001',
                idProspecto: null,
                idCliente: null,
                tarea: 'Revisión diaria de pipeline',
                descripcion: 'Actualiza los avances de las oportunidades activas antes de las 11:00.',
                fechaTarea: `${isoBase}T09:00:00`,
                fechaCompletado: null
            },
            {
                id: 'ACT-HOY-002',
                idProspecto: null,
                idCliente: null,
                tarea: 'Contactar clientes prioritarios',
                descripcion: 'Realiza llamadas de cortesía a clientes con juntas programadas el día de hoy.',
                fechaTarea: `${isoBase}T12:00:00`,
                fechaCompletado: null
            }
        ];
    }

    generarJuntasDiarias() {
        const hoy = new Date();
        const anioReferencia = this.obtenerAnioReferencia();
        const fechaLocal = new Date(anioReferencia, hoy.getMonth(), hoy.getDate());
        const isoFecha = fechaLocal.toISOString().split('T')[0];

        return [
            {
                id: 'JUNTA-HOY-001',
                titulo: 'Reunión de alineación comercial',
                descripcion: 'Repaso breve con el equipo sobre los objetivos y pendientes del día.',
                tipo: 'Junta',
                fechaInicio: `${isoFecha}T10:00:00`,
                fechaFin: `${isoFecha}T11:00:00`,
                relacionado: null
            },
            {
                id: 'JUNTA-HOY-002',
                titulo: 'Junta rápida con dirección',
                descripcion: 'Compartir estatus de oportunidades clave antes del cierre diario.',
                tipo: 'Junta',
                fechaInicio: `${isoFecha}T16:30:00`,
                fechaFin: `${isoFecha}T17:00:00`,
                relacionado: null
            }
        ];
    }

    obtenerAgendaConExtras() {
        const base = window.AgendaUtils && typeof AgendaUtils.getEventosOrdenados === 'function'
            ? AgendaUtils.getEventosOrdenados()
            : (window.AGENDA_EVENTOS || []);

        const eventos = [...base, ...this.generarJuntasDiarias()];
        eventos.sort((a, b) => {
            const fechaA = a.fechaInicio ? new Date(a.fechaInicio).getTime() : Number.MAX_SAFE_INTEGER;
            const fechaB = b.fechaInicio ? new Date(b.fechaInicio).getTime() : Number.MAX_SAFE_INTEGER;
            return fechaA - fechaB;
        });
        return eventos;
    }

    obtenerAnioReferencia() {
        const base = window.AgendaUtils && typeof AgendaUtils.getEventosOrdenados === 'function'
            ? AgendaUtils.getEventosOrdenados()
            : (window.AGENDA_EVENTOS || []);

        if (base.length > 0 && base[0].fechaInicio) {
            const primerEvento = [...base].sort(
                (a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio)
            )[0];
            const anio = new Date(primerEvento.fechaInicio).getFullYear();
            if (!isNaN(anio)) {
                return anio;
            }
        }

        return new Date().getFullYear();
    }

    pushToHistory(entry) {
        this.conversationHistory.push({
            ...entry,
            timestamp: new Date().toISOString()
        });

        if (this.conversationHistory.length > 50) {
            this.conversationHistory.shift();
        }
    }

    generateSessionId() {
        const key = 'assistant_session_id';
        const existing = localStorage.getItem(key);
        if (existing) return existing;
        const newId = 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2);
        localStorage.setItem(key, newId);
        return newId;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.AssistantIA = new AssistantIAModule();
    window.AssistantIA.init();
});

