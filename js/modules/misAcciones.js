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
        this.acciones = accionesCrudas.map(accion => {
            const prospecto = window.ProspectosUtils ? ProspectosUtils.getPorId(accion.idProspecto) : null;
            const cliente = window.ClientesUtils ? ClientesUtils.getTodos().find(c => c.ide === accion.idCliente) : null;

            return {
                ...accion,
                estadoAccion: accion.fechaCompletado ? 'completada' : 'pendiente',
                prospectoNombre: prospecto ? prospecto.nombre : (accion.idProspecto || 'N/A'),
                clienteNombre: cliente ? cliente.nombre : (accion.idCliente || 'N/A')
            };
        });
        this.eventos = window.AgendaUtils ? AgendaUtils.getEventosOrdenados() : [];
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
                        <div class="acciones-kpi-card">
                            <span class="acciones-kpi-value">${this.acciones.length}</span>
                            <span class="acciones-kpi-label">Total de tareas</span>
                        </div>
                        <div class="acciones-kpi-card">
                            <span class="acciones-kpi-value acciones-kpi-success">${AccionesUtils.getPendientes().length}</span>
                            <span class="acciones-kpi-label">Pendientes</span>
                        </div>
                        <div class="acciones-kpi-card">
                            <span class="acciones-kpi-value acciones-kpi-info">${AccionesUtils.getCompletadas().length}</span>
                            <span class="acciones-kpi-label">Completadas</span>
                        </div>
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
        this.tablaAcciones = new TableComponent({
            containerId: 'tabla-acciones',
            title: 'Acciones programadas',
            data: this.acciones,
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    className: 'text-center'
                },
                {
                    label: 'Prospecto',
                    field: 'prospectoNombre',
                    render: (value, row) => `<span class="acciones-link" data-type="prospecto" data-id="${row.idProspecto || ''}">${value}</span>`
                },
                {
                    label: 'Cliente / IDE',
                    field: 'clienteNombre',
                    render: (value, row) => `<span class="acciones-link" data-type="cliente" data-id="${row.idCliente || ''}">${value}</span>`
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
        this.tablaAcciones.data = this.acciones;
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

        const eventosAgrupados = this.eventos.reduce((acc, evento) => {
            const fechaClave = new Date(evento.fechaInicio).toISOString().split('T')[0];
            if (!acc[fechaClave]) {
                acc[fechaClave] = [];
            }
            acc[fechaClave].push(evento);
            return acc;
        }, {});

        const html = Object.entries(eventosAgrupados)
            .sort(([fechaA], [fechaB]) => new Date(fechaA) - new Date(fechaB))
            .map(([fecha, eventos]) => `
                <div class="agenda-day">
                    <div class="agenda-day-header">
                        <div class="agenda-day-date">${Helpers.formatDate(new Date(fecha))}</div>
                        <span class="agenda-day-count">${eventos.length} ${eventos.length === 1 ? 'actividad' : 'actividades'}</span>
                    </div>
                    <div class="agenda-event-list">
                        ${eventos.map(evento => `
                            <div class="agenda-event">
                                <div class="agenda-event-icon">${this.getIconoEvento(evento.tipo)}</div>
                                <div class="agenda-event-info">
                                    <div class="agenda-event-title">${evento.titulo}</div>
                                    <div class="agenda-event-time">${Helpers.formatDateTime(new Date(evento.fechaInicio))} &mdash; ${Helpers.formatDateTime(new Date(evento.fechaFin))}</div>
                                    ${evento.descripcion ? `<div class="agenda-event-desc">${evento.descripcion}</div>` : ''}
                                    ${evento.relacionado ? `<span class="agenda-event-tag">Relacionado: ${evento.relacionado}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

        agendaContainer.innerHTML = html;
    }

    getIconoTarea(tarea) {
        const mapa = {
            'Llamar': '📞',
            'Solicitar identificaciones': '🪪',
            'Solicitar comprobantes de domicilio': '🏠',
            'Agendar visita': '📅',
            'Completar información de folios': '🗂️'
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
}

// Hacer disponible globalmente
window.MisAccionesModule = MisAccionesModule;

