/**
 * ============================================
 * MÓDULO DE MIS ACCIONES
 * ============================================
 * Gestiona la sección de tareas y actividades
 */

class MisAccionesModule {
    constructor() {
        this.sectionId = 'mis-acciones';
        this.container = null;
        this.acciones = [];
        this.eventos = [];
        this.tablaAcciones = null;
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.container = document.getElementById(this.sectionId);
        if (!this.container) {
            Helpers.log('Contenedor de Mis Acciones no encontrado', 'error');
            return;
        }

        this.cargarDatos();
        this.render();

        Helpers.log('Módulo de Mis Acciones inicializado', 'success');
    }

    /**
     * Se ejecuta al entrar a la sección
     */
    onEnter() {
        Helpers.log('Entrando a sección Mis Acciones', 'info');
        this.cargarDatos();
        this.actualizarTabla();
        this.renderAgenda();
    }

    /**
     * Se ejecuta al salir de la sección
     */
    onLeave() {
        Helpers.log('Saliendo de sección Mis Acciones', 'info');
    }

    /**
     * Carga las acciones y eventos
     */
    cargarDatos() {
        const accionesCrudas = window.AccionesUtils ? AccionesUtils.getTodas() : [];
        const accionesExtras = this.generarAccionesDiarias();

        this.acciones = [...accionesCrudas, ...accionesExtras]
            .map(accion => this.transformarAccion(accion))
            .sort((a, b) => {
                const fechaA = a.fechaTarea ? new Date(a.fechaTarea).getTime() : Number.MAX_SAFE_INTEGER;
                const fechaB = b.fechaTarea ? new Date(b.fechaTarea).getTime() : Number.MAX_SAFE_INTEGER;
                return fechaA - fechaB;
            });
        const eventosBase = window.AgendaUtils ? AgendaUtils.getEventosOrdenados() : [];
        const eventosConExtras = [...eventosBase, ...this.generarJuntasDiarias()];
        this.eventos = eventosConExtras.sort((a, b) => {
            const fechaA = a.fechaInicio ? new Date(a.fechaInicio).getTime() : Number.MAX_SAFE_INTEGER;
            const fechaB = b.fechaInicio ? new Date(b.fechaInicio).getTime() : Number.MAX_SAFE_INTEGER;
            return fechaA - fechaB;
        });
    }

    /**
     * Renderiza el contenido principal
     */
    render() {
        this.container.innerHTML = `
            <div class="acciones-wrapper">
                <div class="acciones-header">
                    <div>
                        <h2>Tablero de acciones</h2>
                        <p class="acciones-subtitle">Monitorea tareas clave vinculadas a prospectos y oportunidades.</p>
                    </div>
                    <div class="acciones-kpis">
                        ${this.renderKPIs()}
                    </div>
                </div>

                <div class="acciones-panel">
                    <div class="acciones-panel-header">
                        <div>
                            <h3>Acciones operativas</h3>
                            <p>Listado de tareas asociadas a prospectos y oportunidades.</p>
                        </div>
                        <button id="btn-nueva-accion" class="acciones-add-btn">+ Agregar tarea</button>
                    </div>
                    <div id="tabla-acciones"></div>
                </div>

                <div class="agenda-panel">
                    <div class="agenda-panel-header">
                        <div>
                            <h3>Agenda y próximos compromisos</h3>
                            <p>Eventos agendados: visitas, llamadas, juntas y capacitaciones.</p>
                        </div>
                    </div>
                    <div id="agenda-acciones" class="agenda-list"></div>
                </div>
            </div>
        `;

        this.renderTabla();
        this.renderAgenda();
    }

    renderTabla() {
        const dataOrdenada = [...this.acciones].sort((a, b) => {
            const fechaA = a.fechaTarea ? new Date(a.fechaTarea).getTime() : Number.MAX_SAFE_INTEGER;
            const fechaB = b.fechaTarea ? new Date(b.fechaTarea).getTime() : Number.MAX_SAFE_INTEGER;
            return fechaA - fechaB;
        });

        this.tablaAcciones = new TableComponent({
            containerId: 'tabla-acciones',
            title: 'Acciones programadas',
            data: dataOrdenada,
            columns: [
                {
                    label: 'Prospecto / Cliente',
                    field: 'prospectoCliente',
                    render: (value, row) => `
                        <div class="acciones-ref">
                            <span class="acciones-ref-main">${this.escapeHtml(row.prospectoCliente)}</span>
                            ${row.prospectoClienteDetalle ? `<span class="acciones-ref-detail">${this.escapeHtml(row.prospectoClienteDetalle)}</span>` : ''}
                        </div>
                    `
                },
                {
                    label: 'Tarea',
                    field: 'tarea',
                    render: (value, row) => `
                        <div class="acciones-task">
                            <span class="acciones-task-icon">${this.getIconoTarea(value)}</span>
                            <div>
                                <span class="acciones-task-name">${value}</span>
                                ${row.descripcion ? `<span class="acciones-task-desc">${row.descripcion}</span>` : ''}
                            </div>
                        </div>
                    `
                },
                {
                    label: 'Fecha de la tarea',
                    field: 'fechaTarea',
                    render: (value) => value ? Helpers.formatDateTime(new Date(value)) : '-'
                },
                {
                    label: 'Fecha de completado',
                    field: 'fechaCompletado',
                    render: (value) => value
                        ? `<span class="badge badge-success">${Helpers.formatDateTime(new Date(value))}</span>`
                        : '<span class="badge badge-warning">Pendiente</span>'
                }
            ],
            searchable: true,
            filterable: true,
            filters: [
                {
                    field: 'estadoAccion',
                    label: 'Estado',
                    options: [
                        { value: 'pendiente', label: 'Pendientes' },
                        { value: 'completada', label: 'Completadas' }
                    ]
                },
                {
                    field: 'tarea',
                    label: 'Tipo de tarea',
                    options: [...new Set(this.acciones.map(a => a.tarea))].map(tarea => ({ value: tarea, label: tarea }))
                }
            ]
        });

        this.tablaAcciones.init();

        const addButton = document.getElementById('btn-nueva-accion');
        if (addButton) {
            addButton.addEventListener('click', () => {
                alert('Funcionalidad para agregar tareas en desarrollo.');
            });
        }
    }

    actualizarTabla() {
        if (!this.tablaAcciones) return;
        const dataOrdenada = [...this.acciones].sort((a, b) => {
            const fechaA = a.fechaTarea ? new Date(a.fechaTarea).getTime() : Number.MAX_SAFE_INTEGER;
            const fechaB = b.fechaTarea ? new Date(b.fechaTarea).getTime() : Number.MAX_SAFE_INTEGER;
            return fechaA - fechaB;
        });
        this.tablaAcciones.data = dataOrdenada;
        this.tablaAcciones.filterData();
    }

    renderAgenda() {
        const agendaContainer = document.getElementById('agenda-acciones');
        if (!agendaContainer) return;

        if (!this.eventos.length) {
            agendaContainer.innerHTML = `
                <div class="agenda-empty">
                    <div class="agenda-empty-icon">📭</div>
                    <p>No hay eventos agendados.</p>
                </div>
            `;
            return;
        }

        const listaOrdenada = [...this.eventos].sort((a, b) => {
            const fechaA = a.fechaInicio ? new Date(a.fechaInicio).getTime() : Number.MAX_SAFE_INTEGER;
            const fechaB = b.fechaInicio ? new Date(b.fechaInicio).getTime() : Number.MAX_SAFE_INTEGER;
            return fechaA - fechaB;
        });

        const html = listaOrdenada.map(evento => {
            const fechaInicio = evento.fechaInicio
                ? Helpers.formatDateTime(new Date(evento.fechaInicio))
                : 'Sin fecha programada';
            const fechaFin = evento.fechaFin
                ? Helpers.formatDateTime(new Date(evento.fechaFin))
                : null;

            return `
                <div class="agenda-event agenda-event-card">
                    <div class="agenda-event-icon">${this.getIconoEvento(evento.tipo)}</div>
                    <div class="agenda-event-info">
                        <div class="agenda-event-title">${this.escapeHtml(evento.titulo)}</div>
                        <div class="agenda-event-time">
                            ${this.escapeHtml(fechaInicio)}${fechaFin ? ` &mdash; ${this.escapeHtml(fechaFin)}` : ''}
                        </div>
                        ${evento.descripcion ? `<div class="agenda-event-desc">${this.escapeHtml(evento.descripcion)}</div>` : ''}
                        ${evento.relacionado ? `<span class="agenda-event-tag">Relacionado: ${this.escapeHtml(evento.relacionado)}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        agendaContainer.innerHTML = `<div class="agenda-event-list agenda-event-list--flat">${html}</div>`;
    }

    getIconoTarea(tarea) {
        const mapa = {
            'Llamar': '📞',
            'Solicitar identificaciones': '🪪',
            'Solicitar comprobantes de domicilio': '🏠',
            'Agendar visita': '📅',
            'Completar información de folios': '🗂️',
            'Revisión diaria de pipeline': '📊',
            'Contactar clientes prioritarios': '📌'
        };
        return mapa[tarea] || '📝';
    }

    getIconoEvento(tipo) {
        const mapa = {
            'Visita': '🚗',
            'Llamada': '📞',
            'Junta': '🤝',
            'Capacitación': '🎓'
        };
        return mapa[tipo] || '🗓️';
    }

    renderKPIs() {
        const total = this.acciones.length;
        const pendientes = this.acciones.filter(a => a.estadoAccion === 'pendiente').length;
        const completadas = total - pendientes;

        return `
            <div class="acciones-kpi-card">
                <span class="acciones-kpi-value">${total}</span>
                <span class="acciones-kpi-label">Total de tareas</span>
            </div>
            <div class="acciones-kpi-card">
                <span class="acciones-kpi-value acciones-kpi-success">${pendientes}</span>
                <span class="acciones-kpi-label">Pendientes</span>
            </div>
            <div class="acciones-kpi-card">
                <span class="acciones-kpi-value acciones-kpi-info">${completadas}</span>
                <span class="acciones-kpi-label">Completadas</span>
            </div>
        `;
    }

    transformarAccion(accion) {
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
            estadoAccion: accion.fechaCompletado ? 'completada' : 'pendiente',
            prospectoNombre: prospecto ? prospecto.nombre : 'Sin prospecto asignado',
            clienteNombre: cliente ? cliente.nombre : 'Sin cliente asignado',
            prospectoCliente: this.combinarProspectoCliente(prospecto, cliente),
            prospectoClienteDetalle: this.generarDetalleProspectoCliente(prospecto, cliente)
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
                descripcion: 'Asegúrate de actualizar el estado de las oportunidades abiertas del día.',
                fechaTarea: `${isoBase}T09:00:00`,
                fechaCompletado: null
            },
            {
                id: 'ACT-HOY-002',
                idProspecto: null,
                idCliente: null,
                tarea: 'Contactar clientes prioritarios',
                descripcion: 'Realiza al menos tres llamadas de seguimiento a clientes con juntas próximas.',
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

    obtenerAnioReferencia() {
        const eventosBase = window.AgendaUtils
            ? AgendaUtils.getEventosOrdenados()
            : (window.AGENDA_EVENTOS || []);

        if (eventosBase.length > 0 && eventosBase[0].fechaInicio) {
            const primerEventoOrdenado = [...eventosBase].sort(
                (a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio)
            )[0];
            const anio = new Date(primerEventoOrdenado.fechaInicio).getFullYear();
            if (!isNaN(anio)) {
                return anio;
            }
        }

        return new Date().getFullYear();
    }

    combinarProspectoCliente(prospecto, cliente) {
        const nombreProspecto = prospecto ? prospecto.nombre : null;
        const nombreCliente = cliente ? cliente.nombre : null;

        if (nombreProspecto && nombreCliente) {
            return `${nombreProspecto} / ${nombreCliente}`;
        }
        if (nombreProspecto) {
            return nombreProspecto;
        }
        if (nombreCliente) {
            return nombreCliente;
        }
        return 'Sin asignar';
    }

    generarDetalleProspectoCliente(prospecto, cliente) {
        const info = [];
        if (prospecto && prospecto.familiaProducto) {
            info.push(`Interés: ${prospecto.familiaProducto}`);
        }
        if (cliente && cliente.prioridad) {
            info.push(`Prioridad: ${cliente.prioridad}`);
        }
        return info.length ? info.join(' · ') : null;
    }

    escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
}

// Hacer disponible globalmente
window.MisAccionesModule = MisAccionesModule;

