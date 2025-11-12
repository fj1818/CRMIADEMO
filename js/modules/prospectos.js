/**
 * ============================================
 * MÓDULO DE PROSPECTOS
 * ============================================
 * Gestiona la sección de prospectos / clientes potenciales
 */

class ProspectosModule {
    constructor() {
        this.sectionId = 'prospectos';
        this.container = null;
        this.pipelineContainer = null;
        this.tableContainer = null;
        this.recomendacionesContainer = null;
        this.prospectos = [];
        this.tablaProspectos = null;
        this.stages = window.ProspectosUtils ? ProspectosUtils.getStages() : [];
    }

    init() {
        this.container = document.getElementById(this.sectionId);
        if (!this.container || !window.ProspectosUtils) {
            console.warn('ProspectosModule: contenedor o datos no disponibles');
            return;
        }

        this.pipelineContainer = document.getElementById('prospectos-pipeline');
        this.tableContainer = document.getElementById('tabla-prospectos');
        this.recomendacionesContainer = document.getElementById('prospectos-recomendaciones');

        this.cargarDatos();
        this.renderPipeline();
        this.inicializarTabla();

        Helpers.log('Módulo de Prospectos inicializado', 'success');
    }

    onEnter() {
        Helpers.log('Entrando a sección Prospectos', 'info');
        this.actualizarDatos();
    }

    onLeave() {
        Helpers.log('Saliendo de sección Prospectos', 'info');
    }

    cargarDatos() {
        this.prospectos = ProspectosUtils.getTodos();
    }

    actualizarDatos() {
        this.cargarDatos();
        this.renderPipeline();
        if (this.tablaProspectos) {
            this.tablaProspectos.data = this.prospectos;
            this.tablaProspectos.filterData();
        }
    }

    renderPipeline() {
        if (!this.pipelineContainer) return;

        const stats = ProspectosUtils.getStats();
        const stageColors = {
            'No contactado': '#E0E7FF',
            'No localizado aún': '#D6ECFF',
            'En consideración': '#FFE7C7',
            'Interesado': '#FFD6A5',
            'Descartado': '#F9CAD0',
            'Convertido': '#C7F2D0'
        };

        const estados = this.stages.map(stage => ({
            nombre: stage,
            count: (stats.porEstado[stage] && stats.porEstado[stage].count) || 0,
            monto: (stats.porEstado[stage] && stats.porEstado[stage].monto) || 0,
            color: stageColors[stage] || '#E8ECF0'
        }));

        const totalProspectos = estados.reduce((sum, estado) => sum + estado.count, 0);
        const totalMonto = estados.reduce((sum, estado) => sum + estado.monto, 0);
        this.pipelineContainer.innerHTML = `
            <div class="pipeline-funnels">
                <div class="pipeline-funnel-card">
                    <div class="pipeline-funnel-card-header">
                        <h3>Embudo por número de prospectos</h3>
                        <span>Total: ${totalProspectos} ${totalProspectos === 1 ? 'prospecto' : 'prospectos'}</span>
                    </div>
                    <div id="prospectos-funnel-count" class="funnel-chart"></div>
                </div>
                <div class="pipeline-funnel-card">
                    <div class="pipeline-funnel-card-header">
                        <h3>Embudo por monto estimado</h3>
                        <span>Total: ${Helpers.formatCurrency(totalMonto)}</span>
                    </div>
                    <div id="prospectos-funnel-amount" class="funnel-chart"></div>
                </div>
            </div>
        `;

        if (typeof anychart === 'undefined') {
            this.pipelineContainer.innerHTML += `
                <div style="margin-top:16px; padding:12px 16px; border-radius:12px; background:#FFF4E5; color:#8A4B0F; font-weight:600;">
                    No se pudo cargar la librería de visualización. Verifica tu conexión a internet.
                </div>
            `;
            return;
        }

        const countData = estados.map(estado => {
            const porcentaje = totalProspectos > 0 ? (estado.count / totalProspectos) * 100 : 0;
            return {
                name: estado.nombre,
                value: estado.count,
                customLabel: `${estado.nombre} - ${estado.count} (${porcentaje.toFixed(0)}%)`,
                fill: estado.color,
                stroke: estado.color
            };
        });

        const montoData = estados.map(estado => {
            const porcentaje = totalMonto > 0 ? (estado.monto / totalMonto) * 100 : 0;
            return {
                name: estado.nombre,
                value: Number((estado.monto || 0).toFixed(2)),
                customLabel: `${estado.nombre} - ${Helpers.formatCurrency(estado.monto)} (${porcentaje.toFixed(0)}%)`,
                fill: estado.color,
                stroke: estado.color
            };
        });

        const renderFunnel = (containerId, data, titleText) => {
            const chart = anychart.funnel(data);
            chart.title(titleText);
            chart.background().fill('#FFFFFF');
            chart.labels()
                .position('outside-left')
                .fontSize(12)
                .fontWeight(600)
                .format('{%customLabel}');
            chart.legend(false);
            chart.neckHeight('0%');
            chart.baseWidth('70%');
            chart.hovered().fill('#2272FF 0.9');
            chart.tooltip()
                .titleFormat('{%Name}')
                .format('{%customLabel}');
            chart.container(containerId);
            chart.draw();
        };

        renderFunnel('prospectos-funnel-count', countData, 'Distribución por etapas');
        renderFunnel('prospectos-funnel-amount', montoData, 'Distribución por monto');
        this.renderRecomendaciones();
    }

    obtenerProspectosPrioritarios(limit = 3) {
        const stagePriority = {
            'Interesado': 5,
            'En consideración': 4,
            'No localizado aún': 3,
            'No contactado': 2,
            'Convertido': 1,
            'Descartado': 0
        };

        const hoy = Date.now();

        const calcularDiasSinMovimiento = (prospecto) => {
            const referencia = prospecto.fechaConversion || prospecto.fechaDescarte || prospecto.fechaAlta;
            if (!referencia) return 0;
            const diff = Math.max(0, hoy - new Date(referencia).getTime());
            return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        };

        return [...this.prospectos]
            .filter(prospecto => prospecto.estado !== 'Descartado' && !prospecto.convertido)
            .sort((a, b) => {
                const prioridadA = stagePriority[a.estado] || 0;
                const prioridadB = stagePriority[b.estado] || 0;
                if (prioridadA !== prioridadB) return prioridadB - prioridadA;
                const montoA = a.monto || 0;
                const montoB = b.monto || 0;
                if (montoA !== montoB) return montoB - montoA;
                const diasA = calcularDiasSinMovimiento(a);
                const diasB = calcularDiasSinMovimiento(b);
                return diasB - diasA;
            })
            .slice(0, limit)
            .map(prospecto => ({
                ...prospecto,
                diasSinMovimiento: calcularDiasSinMovimiento(prospecto)
            }));
    }

    renderRecomendaciones() {
            if (!this.recomendacionesContainer) return;

            const escapeHtml = (str = '') => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const prospectosPrioritarios = this.obtenerProspectosPrioritarios(3);

            const contenido = prospectosPrioritarios.length ? `
            <div class="recomendaciones-mini-card" style="background:#ffffff;border-radius:16px;padding:18px 22px;box-shadow:0 14px 28px rgba(34,114,255,0.12);min-width:260px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                    <h3 style="margin:0;font-size:15px;color:#1f2a44;">Prospectos recomendados a gestionar hoy</h3>
                    <span style="font-size:20px;">📋</span>
                </div>
                <p style="margin:0 0 12px 0;font-size:12px;color:#5f6b83;">Priorizados por etapa comercial, monto estimado y tiempo sin gestión.</p>
                <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;">
                    ${prospectosPrioritarios.map(item => `
                        <li style="display:flex;flex-direction:column;gap:4px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;font-weight:600;color:#1f2a44;">
                                <span>${escapeHtml(item.nombre)}</span>
                                <span class="badge ${this.getEstadoBadge(item.estado)}">${escapeHtml(item.estado)}</span>
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:#5f6b83;">
                                <span>💰 ${Helpers.formatCurrency(item.monto || 0)}</span>
                                <span>⏳ ${item.diasSinMovimiento} ${item.diasSinMovimiento === 1 ? 'día' : 'días'} sin gestión</span>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : `
            <div class="recomendaciones-mini-card" style="background:#ffffff;border-radius:16px;padding:18px 22px;box-shadow:0 14px 28px rgba(34,114,255,0.12);min-width:260px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                    <h3 style="margin:0;font-size:15px;color:#1f2a44;">Prospectos recomendados a gestionar hoy</h3>
                    <span style="font-size:20px;">✅</span>
                </div>
                <p style="margin:0;font-size:12px;color:#5f6b83;">No hay prospectos pendientes con prioridad alta para hoy.</p>
            </div>
        `;

        this.recomendacionesContainer.innerHTML = contenido;
    }

    inicializarTabla() {
        if (!this.tableContainer || !this.prospectos.length) {
            Helpers.log('No hay prospectos para mostrar', 'warning');
        }

        const familias = [...new Set(this.prospectos.map(p => p.familiaProducto).filter(Boolean))].sort();

        this.tablaProspectos = new TableComponent({
            containerId: 'tabla-prospectos',
            title: 'Lista de Prospectos',
            data: this.prospectos,
            columns: [
                { label: 'Nombre', field: 'nombre' },
                { label: 'Familia de Producto', field: 'familiaProducto' },
                {
                    label: 'Fecha Alta',
                    field: 'fechaAlta',
                    render: (value) => value ? Helpers.formatDate(new Date(value)) : '-'
                },
                {
                    label: 'Fecha Conversión',
                    field: 'fechaConversion',
                    render: (value) => value ? Helpers.formatDate(new Date(value)) : '<span class="badge badge-secondary">Pendiente</span>'
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    render: (value) => `<span class="badge ${this.getEstadoBadge(value)}">${value}</span>`
                },
                {
                    label: 'Monto',
                    field: 'monto',
                    render: (value) => Helpers.formatCurrency(value || 0)
                },
                {
                    label: 'Fecha Descarte',
                    field: 'fechaDescarte',
                    render: (value) => value ? Helpers.formatDate(new Date(value)) : '-'
                }
            ],
            searchable: true,
            filterable: true,
            filters: [{
                    field: 'estado',
                    label: 'Estado del Prospecto',
                    options: this.stages.map(stage => ({ value: stage, label: stage }))
                },
                {
                    field: 'familiaProducto',
                    label: 'Familia de Producto',
                    options: familias.map(familia => ({ value: familia, label: familia }))
                },
            ],
            actions: [{
                name: 'ver',
                label: 'Editar prospecto',
                icon: '✏️',
                handler: (prospecto) => this.abrirModalProspecto(prospecto)
            }]
        });

        this.tablaProspectos.init();
    }

    getEstadoBadge(estado) {
        const map = {
            'No contactado': 'badge-secondary',
            'No localizado aún': 'badge-secondary',
            'En consideración': 'badge-info',
            'Interesado': 'badge-warning',
            'Descartado': 'badge-danger',
            'Convertido': 'badge-success'
        };
        return map[estado] || 'badge-secondary';
    }

    abrirModalProspecto(prospecto) {
            if (!Array.isArray(prospecto.notas)) {
                prospecto.notas = [];
            }

            prospecto.notas = prospecto.notas.map(nota => {
                const normalizada = {...nota };
                normalizada.id = normalizada.id || `nota-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
                normalizada.texto = normalizada.texto || '';
                normalizada.fechaCreacion = normalizada.fechaCreacion || normalizada.fecha || new Date().toISOString();
                normalizada.ultimaActualizacion = normalizada.ultimaActualizacion || normalizada.actualizadoEl || null;
                return normalizada;
            });

            const notas = prospecto.notas;

            const overlay = document.createElement('div');
            overlay.className = 'oportunidad-modal-overlay prospecto-modal-overlay';

            const currentStageIndex = this.stages.indexOf(prospecto.estado);
            const funnelTrackInlineStyle = 'display:flex;align-items:stretch;width:100%;border-radius:14px;overflow:hidden;border:1px solid rgba(34,114,255,0.12);background:#eef2fb;';

            const getSegmentConfig = (status) => {
                switch (status) {
                    case 'completed':
                        return {
                            background: '#e9f7ef',
                            textColor: '#1f5133',
                            borderColor: 'rgba(46, 204, 113, 0.35)',
                            indexBg: 'rgba(46, 204, 113, 0.18)',
                            arrowBg: 'linear-gradient(90deg, rgba(46, 204, 113, 0.25) 0%, rgba(46, 204, 113, 0) 100%)'
                        };
                    case 'current':
                        return {
                            background: '#2272ff',
                            textColor: '#FFFFFF',
                            borderColor: 'rgba(34, 114, 255, 0.7)',
                            indexBg: 'rgba(255, 255, 255, 0.25)',
                            arrowBg: 'linear-gradient(90deg, rgba(34, 114, 255, 0.8) 0%, rgba(34, 114, 255, 0) 100%)'
                        };
                    case 'descartado':
                        return {
                            background: '#fdecea',
                            textColor: '#7f1d1d',
                            borderColor: 'rgba(231, 76, 60, 0.45)',
                            indexBg: 'rgba(231, 76, 60, 0.18)',
                            arrowBg: 'linear-gradient(90deg, rgba(231, 76, 60, 0.3) 0%, rgba(231, 76, 60, 0) 100%)'
                        };
                    case 'upcoming':
                        return {
                            background: '#f4f6fc',
                            textColor: 'rgba(31, 42, 68, 0.65)',
                            borderColor: 'rgba(31, 42, 68, 0.08)',
                            indexBg: 'rgba(255, 255, 255, 0.55)',
                            arrowBg: 'linear-gradient(90deg, rgba(31, 42, 68, 0.12) 0%, rgba(31, 42, 68, 0) 100%)'
                        };
                    default:
                        return {
                            background: '#f9fbff',
                            textColor: '#1f2a44',
                            borderColor: 'rgba(34, 114, 255, 0.12)',
                            indexBg: 'rgba(255, 255, 255, 0.6)',
                            arrowBg: 'linear-gradient(90deg, rgba(34, 114, 255, 0.12) 0%, rgba(34, 114, 255, 0) 100%)'
                        };
                }
            };

            const funnelSteps = this.stages.map((stage, index) => {
                        const statusClass = index < currentStageIndex ?
                            'completed' :
                            index === currentStageIndex ?
                            (stage === 'Descartado' ? 'descartado' : 'current') :
                            'upcoming';
                        const isLast = index === this.stages.length - 1;
                        const config = getSegmentConfig(statusClass);
                        const segmentStyle = [
                            'flex:1',
                            'display:flex',
                            'align-items:center',
                            'gap:12px',
                            'padding:12px 22px',
                            'position:relative',
                            'font-size:13px',
                            'font-weight:600',
                            'letter-spacing:0.3px',
                            `background:${config.background}`,
                            `color:${config.textColor}`, !isLast ? `border-right:1px solid ${config.borderColor}` : ''
                        ].filter(Boolean).join(';');

                        const indexStyle = [
                            'width:26px',
                            'height:26px',
                            'border-radius:50%',
                            `background:${config.indexBg}`,
                            `color:${config.textColor}`,
                            'font-size:13px',
                            'font-weight:700',
                            'display:flex',
                            'align-items:center',
                            'justify-content:center',
                            'box-shadow:inset 0 0 0 2px rgba(255, 255, 255, 0.4)'
                        ].join(';');

                        const nameStyle = `white-space:nowrap;color:${config.textColor}`;

                        const arrowStyle = `position:absolute;right:-18px;top:0;width:18px;height:100%;background:${config.arrowBg};clip-path:polygon(0 0, 100% 50%, 0 100%);`;

                        return `
                <div class="prospecto-funnel-segment ${statusClass} ${isLast ? 'last' : ''}" style="${segmentStyle}">
                    <span class="funnel-segment-index" style="${indexStyle}">${index + 1}</span>
                    <span class="funnel-segment-name" style="${nameStyle}">${stage}</span>
                    ${!isLast ? `<span class="funnel-segment-arrow" style="${arrowStyle}"></span>` : ''}
                </div>
            `;
        }).join('');

        const oportunidadRelacionada = ProspectosUtils.getRelacionOportunidad(prospecto.idOportunidad);

        const fechaAlta = prospecto.fechaAlta ? new Date(prospecto.fechaAlta) : null;
        const fechaConversion = prospecto.fechaConversion ? new Date(prospecto.fechaConversion) : null;
        const fechaDescarte = prospecto.fechaDescarte ? new Date(prospecto.fechaDescarte) : null;

        const diasDesdeAlta = fechaAlta ? Math.max(0, Math.ceil((Date.now() - fechaAlta.getTime()) / (1000 * 60 * 60 * 24))) : 0;
        const diasHastaConversion = (fechaAlta && fechaConversion)
            ? Math.max(0, Math.ceil((fechaConversion.getTime() - fechaAlta.getTime()) / (1000 * 60 * 60 * 24)))
            : null;
        const referenciaSeguimiento = fechaConversion || fechaDescarte || fechaAlta;
        const diasDesdeUltimoMovimiento = referenciaSeguimiento
            ? Math.max(0, Math.ceil((Date.now() - referenciaSeguimiento.getTime()) / (1000 * 60 * 60 * 24)))
            : 0;

        const whatsappLink = prospecto.celular ? `https://wa.me/${prospecto.celular.replace(/\D/g, '')}` : null;
        const telefonoLink = prospecto.celular ? `tel:${prospecto.celular}` : null;
        const correoLink = prospecto.correo ? `mailto:${prospecto.correo}` : null;

        const contactButtons = [
            whatsappLink ? `
                <a href="${whatsappLink}" target="_blank" rel="noopener" class="contact-btn contact-btn-whatsapp">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                </a>
            ` : '',
            telefonoLink ? `
                <a href="${telefonoLink}" class="contact-btn contact-btn-call">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Llamar
                </a>
            ` : '',
            correoLink ? `
                <a href="${correoLink}" class="contact-btn contact-btn-email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email
                </a>
            ` : ''
        ].filter(Boolean).join('');

        const vinculacionTabButton = oportunidadRelacionada
            ? `<button class="modal-main-tab" data-main-tab="vinculacion">🔗 Vinculación</button>`
            : '';

        const vinculacionTabContent = oportunidadRelacionada ? `
            <div class="modal-main-tab-content" id="main-tab-vinculacion">
                <div class="oportunidad-card">
                    <div class="oportunidad-card-header">
                        <div class="card-header-icon">🔗</div>
                        <h3>Oportunidad vinculada</h3>
                    </div>
                    <div class="oportunidad-card-body">
                        <div class="info-row">
                            <span class="info-label">Producto:</span>
                            <span class="info-value">${oportunidadRelacionada.nombreProducto}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">ID Oportunidad:</span>
                            <span class="info-value info-highlight">${oportunidadRelacionada.ide}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Estado de venta:</span>
                            <span class="info-value"><span class="badge badge-primary">${oportunidadRelacionada.estadoVenta}</span></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Estado:</span>
                            <span class="info-value"><span class="badge ${oportunidadRelacionada.estado === 'Cerrada-Ganada' ? 'badge-success' : oportunidadRelacionada.estado === 'Descartada' ? 'badge-danger' : 'badge-info'}">${oportunidadRelacionada.estado}</span></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Monto:</span>
                            <span class="info-value info-large">${Helpers.formatCurrency(oportunidadRelacionada.montoOportunidad)}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Probabilidad:</span>
                            <span class="info-value">${oportunidadRelacionada.probabilidad}%</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Fecha creación:</span>
                            <span class="info-value">${Helpers.formatDate(new Date(oportunidadRelacionada.fechaCreacion))}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Fecha cierre:</span>
                            <span class="info-value">${oportunidadRelacionada.fechaCierre ? Helpers.formatDate(new Date(oportunidadRelacionada.fechaCierre)) : '<span class="badge badge-warning">Pendiente</span>'}</span>
                        </div>
                    </div>
                </div>
            </div>
        ` : '';

        overlay.innerHTML = `
            <div class="oportunidad-modal prospecto-modal">
                <button class="oportunidad-modal-close prospecto-modal-close" aria-label="Cerrar detalle">✕</button>
                <div class="oportunidad-modal-header prospecto-modal-header">
                    <div class="oportunidad-modal-title">
                        <div class="oportunidad-icon">👤</div>
                        <div>
                            <h2>${prospecto.nombre}</h2>
                            <p class="oportunidad-subtitle prospecto-modal-subtitle">${prospecto.familiaProducto || 'Familia de producto no definida'}</p>
                        </div>
                    </div>
                    <div class="contact-section">
                        <div class="contact-section-title">📞 Contactar prospecto</div>
                        <div class="contact-buttons">
                            ${contactButtons || '<span class="info-value info-small">Sin datos de contacto registrados</span>'}
                        </div>
                    </div>
                </div>

                <div class="oportunidad-modal-body prospecto-modal-body">
                    <div class="prospecto-stage-wrapper">
                        <div class="prospecto-stage-header">
                            <h3>Seguimiento por etapas</h3>
                            <span class="prospecto-stage-tag">${prospecto.estado}</span>
                        </div>
                        <div class="prospecto-funnel-track" style="${funnelTrackInlineStyle}">
                            ${funnelSteps}
                        </div>
                    </div>

                    <div class="oportunidad-metrics prospecto-metrics">
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #FFE4CC 0%, #FF8800 100%);">💰</div>
                            <div class="metric-info">
                                <div class="metric-value">${Helpers.formatCurrency(prospecto.monto || 0)}</div>
                                <div class="metric-label">Monto estimado</div>
                            </div>
                        </div>
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #CCE5FF 0%, #0088FF 100%);">🎯</div>
                            <div class="metric-info">
                                <div class="metric-value">${prospecto.estado}</div>
                                <div class="metric-label">Estado actual</div>
                            </div>
                        </div>
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #D5F5E3 0%, #00CCA3 100%);">⏱️</div>
                            <div class="metric-info">
                                <div class="metric-value">${diasDesdeAlta}</div>
                                <div class="metric-label">Días desde alta</div>
                            </div>
                        </div>
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #E8DAEF 0%, #A366FF 100%);">✅</div>
                            <div class="metric-info">
                                <div class="metric-value">${prospecto.convertido ? 'Convertido' : 'Pendiente'}</div>
                                <div class="metric-label">Estatus de conversión</div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-main-tabs">
                        <button class="modal-main-tab active" data-main-tab="gestion">📋 Gestión</button>
                        ${vinculacionTabButton}
                    </div>

                    <div class="modal-main-tab-content active" id="main-tab-gestion">
                        <div class="oportunidad-grid-3col">
                            <div class="oportunidad-card">
                                <div class="oportunidad-card-header">
                                    <div class="card-header-icon">👤</div>
                                    <h3>Información del prospecto</h3>
                                </div>
                                <div class="oportunidad-card-body">
                                    <div class="info-row">
                                        <span class="info-label">ID Prospecto:</span>
                                        <span class="info-value info-highlight">${prospecto.id}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">RFC:</span>
                                        <span class="info-value">${prospecto.rfc || '-'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Familia de producto:</span>
                                        <span class="info-value">${prospecto.familiaProducto || '-'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Correo:</span>
                                        <span class="info-value info-small">${prospecto.correo || '-'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Teléfono:</span>
                                        <span class="info-value">${prospecto.celular || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="oportunidad-card">
                                <div class="oportunidad-card-header">
                                    <div class="card-header-icon">💼</div>
                                    <h3>Estado comercial</h3>
                                </div>
                                <div class="oportunidad-card-body">
                                    <div class="info-row">
                                        <span class="info-label">Estado actual:</span>
                                        <span class="info-value"><span class="badge ${this.getEstadoBadge(prospecto.estado)}">${prospecto.estado}</span></span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Convertido:</span>
                                        <span class="info-value">${prospecto.convertido ? 'Sí' : 'No'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Monto estimado:</span>
                                        <span class="info-value info-large">${Helpers.formatCurrency(prospecto.monto || 0)}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Tiempo a conversión:</span>
                                        <span class="info-value">${diasHastaConversion !== null ? `${diasHastaConversion} días` : 'Pendiente'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Oportunidad vinculada:</span>
                                        <span class="info-value">${oportunidadRelacionada ? oportunidadRelacionada.nombreProducto : 'Sin vinculación'}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="oportunidad-card">
                                <div class="oportunidad-card-header">
                                    <div class="card-header-icon">📅</div>
                                    <h3>Fechas clave</h3>
                                </div>
                                <div class="oportunidad-card-body">
                                    <div class="info-row">
                                        <span class="info-label">Fecha alta:</span>
                                        <span class="info-value">${fechaAlta ? Helpers.formatDate(fechaAlta) : '-'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Fecha conversión:</span>
                                        <span class="info-value">${fechaConversion ? Helpers.formatDate(fechaConversion) : '<span class="badge badge-warning">Pendiente</span>'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Fecha descarte:</span>
                                        <span class="info-value">${fechaDescarte ? Helpers.formatDate(fechaDescarte) : '-'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Días desde alta:</span>
                                        <span class="info-value info-highlight">${diasDesdeAlta}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Último movimiento:</span>
                                        <span class="info-value">${referenciaSeguimiento ? Helpers.formatDate(referenciaSeguimiento) : 'Sin registros'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Días sin movimiento:</span>
                                        <span class="info-value">${diasDesdeUltimoMovimiento}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="oportunidad-card notas-card">
                            <div class="oportunidad-card-header">
                                <div class="card-header-icon">🗒️</div>
                                <h3>Notas y comentarios</h3>
                            </div>
                            <div class="oportunidad-card-body">
                                <form id="prospecto-notas-form" class="notas-form">
                                    <textarea id="prospecto-nota-texto" class="notas-textarea" rows="3" placeholder="Escribe una nota o comentario"></textarea>
                                    <div class="notas-actions">
                                        <button type="submit" class="btn btn-primary">Agregar nota</button>
                                    </div>
                                </form>
                                <div id="prospecto-notas-list" class="notas-list"></div>
                            </div>
                        </div>
                    </div>

                    ${vinculacionTabContent}
                </div>

                <div class="oportunidad-modal-footer prospecto-modal-footer">
                    <div style="flex: 1;"></div>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" id="btn-cerrar-prospecto-modal">Cerrar</button>
                        <button class="btn btn-primary" id="btn-editar-prospecto">Editar Prospecto</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const cerrarModal = () => {
            overlay.remove();
            document.removeEventListener('keydown', handleEsc);
        };

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                cerrarModal();
            }
        };

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                cerrarModal();
            }
        });

        const closeButton = overlay.querySelector('.oportunidad-modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', cerrarModal);
        }

        const footerCloseButton = overlay.querySelector('#btn-cerrar-prospecto-modal');
        if (footerCloseButton) {
            footerCloseButton.addEventListener('click', cerrarModal);
        }

        document.addEventListener('keydown', handleEsc);

        const mainTabs = overlay.querySelectorAll('.modal-main-tab');
        const mainTabContents = overlay.querySelectorAll('.modal-main-tab-content');

        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                mainTabs.forEach(t => t.classList.remove('active'));
                mainTabContents.forEach(tc => tc.classList.remove('active'));

                tab.classList.add('active');
                const targetTab = tab.getAttribute('data-main-tab');
                const targetContent = overlay.querySelector(`#main-tab-${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        const notasList = overlay.querySelector('#prospecto-notas-list');
        const notasForm = overlay.querySelector('#prospecto-notas-form');
        const notasTextarea = overlay.querySelector('#prospecto-nota-texto');

        const escapeHtml = (str = '') => str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const formatDateTime = (iso) => {
            if (!iso) return '-';
            const date = new Date(iso);
            if (Number.isNaN(date.getTime())) return '-';
            const fecha = Helpers.formatDate ? Helpers.formatDate(date) : date.toLocaleDateString('es-MX');
            const hora = date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
            return `${fecha} ${hora}`;
        };

        const renderNotas = () => {
            if (!notasList) return;
            if (!notas.length) {
                notasList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🗒️</div>
                        <div class="empty-state-text">Aún no registras notas.</div>
                    </div>
                `;
                return;
            }
            const orderedNotas = [...notas].sort((a, b) => {
                const fechaA = new Date(a.ultimaActualizacion || a.fechaCreacion).getTime();
                const fechaB = new Date(b.ultimaActualizacion || b.fechaCreacion).getTime();
                return fechaB - fechaA;
            });
            notasList.innerHTML = orderedNotas.map(nota => `
                <div class="nota-item" data-id="${nota.id}">
                    <div class="nota-meta">
                        <span>${formatDateTime(nota.fechaCreacion)}</span>
                        ${nota.ultimaActualizacion ? `<span class="nota-meta-update">Editada ${formatDateTime(nota.ultimaActualizacion)}</span>` : ''}
                    </div>
                    <div class="nota-texto">${escapeHtml(nota.texto)}</div>
                    <div class="nota-actions">
                        <button type="button" class="nota-action-edit" data-id="${nota.id}">Editar</button>
                    </div>
                </div>
            `).join('');
        };

        renderNotas();

        if (notasForm && notasTextarea) {
            notasForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const texto = notasTextarea.value.trim();
                if (!texto) {
                    return;
                }
                const nuevaNota = {
                    id: `nota-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    texto,
                    fechaCreacion: new Date().toISOString(),
                    ultimaActualizacion: null
                };
                notas.unshift(nuevaNota);
                notasTextarea.value = '';
                renderNotas();
            });
        }

        if (notasList) {
            notasList.addEventListener('click', (event) => {
                const editBtn = event.target.closest('.nota-action-edit');
                if (!editBtn) return;
                const notaId = editBtn.dataset.id;
                const nota = notas.find(n => n.id === notaId);
                if (!nota) return;
                const nuevoTexto = prompt('Editar nota', nota.texto);
                if (nuevoTexto === null) return;
                const textoLimpio = nuevoTexto.trim();
                if (!textoLimpio) return;
                nota.texto = textoLimpio;
                nota.ultimaActualizacion = new Date().toISOString();
                renderNotas();
            });
        }

        const editarBtn = overlay.querySelector('#btn-editar-prospecto');
        if (editarBtn) {
            editarBtn.addEventListener('click', () => {
                alert('Funcionalidad en desarrollo');
            });
        }
    }
}

window.ProspectosModule = ProspectosModule;