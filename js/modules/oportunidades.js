/**
 * ============================================
 * MÓDULO DE OPORTUNIDADES
 * ============================================
 * Gestiona la sección de oportunidades de negocio y tubería de ventas
 */

class OportunidadesModule {
    constructor() {
        this.sectionId = 'oportunidades';
        this.container = null;
        this.oportunidades = [];
        this.tablaOportunidades = null;
        this.recomendacionesContainer = null;
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.container = document.getElementById(this.sectionId);
        if (!this.container) {
            console.error(`Contenedor ${this.sectionId} no encontrado`);
            return;
        }
        
        this.oportunidades = OportunidadesUtils.getTodos();
        this.recomendacionesContainer = document.getElementById('oportunidades-recomendaciones');
        this.renderPipeline();
        this.inicializarTabla();
        
        Helpers.log('Módulo de Oportunidades inicializado', 'success');
    }

    /**
     * Se ejecuta al entrar a la sección
     */
    onEnter() {
        this.actualizarDatos();
        Helpers.log('Entrando a sección Oportunidades', 'info');
    }

    /**
     * Se ejecuta al salir de la sección
     */
    onLeave() {
        Helpers.log('Saliendo de sección Oportunidades', 'info');
    }

    /**
     * Actualiza los datos
     */
    actualizarDatos() {
        this.oportunidades = OportunidadesUtils.getTodos();
        if (this.tablaOportunidades) {
            const datosConCampania = this.oportunidades.map(oportunidad => ({
                ...oportunidad,
                campaniaNombre: oportunidad.campania && oportunidad.campania.nombre
                    ? oportunidad.campania.nombre
                    : 'Referencia propia',
                campaniaDescripcionTooltip: oportunidad.campania && oportunidad.campania.descripcion
                    ? oportunidad.campania.descripcion.replace(/"/g, '&quot;')
                    : 'Referencia propia generada por el ejecutivo'
            }));
            this.tablaOportunidades.data = datosConCampania;
            this.tablaOportunidades.filterData();
        }
        this.actualizarPipeline();
    }

    /**
     * Renderiza el pipeline de ventas
     */
    renderPipeline() {
        const pipelineContainer = document.getElementById('pipeline-ventas');
        if (!pipelineContainer) return;

        const stats = OportunidadesUtils.getStats();
        const montosPorEstado = OportunidadesUtils.getMontosPorEstadoVenta();

        const estados = [
            { nombre: 'No contactado', color: '#E8ECF0', count: stats.porEstadoVenta.noContactado, monto: montosPorEstado['No contactado'] },
            { nombre: 'Interesado', color: '#CCE5FF', count: stats.porEstadoVenta.interesado, monto: montosPorEstado['Interesado'] },
            { nombre: 'Negociación', color: '#FFE4CC', count: stats.porEstadoVenta.negociacion, monto: montosPorEstado['Negociación'] },
            { nombre: 'Fabrica', color: '#FFEAA7', count: stats.porEstadoVenta.fabrica, monto: montosPorEstado['Fabrica'] },
            { nombre: 'Formalización', color: '#DFE6E9', count: stats.porEstadoVenta.formalizacion, monto: montosPorEstado['Formalización'] },
            { nombre: 'Entregado al cliente', color: '#74B9FF', count: stats.porEstadoVenta.entregadoAlCliente, monto: montosPorEstado['Entregado al cliente'] },
            { nombre: 'Timbrado', color: '#55EFC4', count: stats.porEstadoVenta.timbrado, monto: montosPorEstado['Timbrado'] }
        ];

        const totalOportunidades = estados.reduce((sum, estado) => sum + estado.count, 0);
        const totalMonto = estados.reduce((sum, estado) => sum + estado.monto, 0);
        const oportunidadesPrioritarias = this.obtenerOportunidadesPrioritarias(3);

        pipelineContainer.innerHTML = `
            <div class="pipeline-funnels">
                <div class="pipeline-funnel-card">
                    <div class="pipeline-funnel-card-header">
                        <h3>Embudo por número de oportunidades</h3>
                        <span>Total: ${totalOportunidades} ${totalOportunidades === 1 ? 'oportunidad' : 'oportunidades'}</span>
                    </div>
                    <div id="funnel-oportunidades" class="funnel-chart"></div>
                </div>
                <div class="pipeline-funnel-card">
                    <div class="pipeline-funnel-card-header">
                        <h3>Embudo por monto</h3>
                        <span>Total: ${Helpers.formatCurrency(totalMonto)}</span>
                    </div>
                    <div id="funnel-montos" class="funnel-chart"></div>
                </div>
            </div>
        `;

        if (typeof anychart === 'undefined') {
            pipelineContainer.innerHTML += `
                <div style="margin-top:16px; padding:12px 16px; border-radius:12px; background:#FFF4E5; color:#8A4B0F; font-weight:600;">
                    No se pudo cargar la librería de visualización. Verifica tu conexión a internet.
                </div>
            `;
            return;
        }

        const countData = estados.map(estado => {
            const porcentaje = totalOportunidades > 0 ? (estado.count / totalOportunidades) * 100 : 0;
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
                value: Number(estado.monto.toFixed(2)),
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
            chart.hovered().fill('#FF8800 0.9');
            chart.tooltip()
                .titleFormat('{%Name}')
                .format('{%customLabel}');
            chart.container(containerId);
            chart.draw();
        };

        renderFunnel('funnel-oportunidades', countData, 'Distribución por etapas');
        renderFunnel('funnel-montos', montoData, 'Distribución por monto');
        this.renderRecomendaciones();
    }

    obtenerOportunidadesPrioritarias(limit = 3) {
        const abiertas = this.oportunidades.filter(o => o.estado === 'Abierta');
        return [...abiertas]
            .sort((a, b) => {
                const probA = a.probabilidad || 0;
                const probB = b.probabilidad || 0;
                if (probA !== probB) return probB - probA;
                const montoA = a.montoOportunidad || 0;
                const montoB = b.montoOportunidad || 0;
                if (montoA !== montoB) return montoB - montoA;
                const fechaA = a.fechaCreacion ? new Date(a.fechaCreacion).getTime() : Number.MAX_SAFE_INTEGER;
                const fechaB = b.fechaCreacion ? new Date(b.fechaCreacion).getTime() : Number.MAX_SAFE_INTEGER;
                return fechaA - fechaB;
            })
            .slice(0, limit);
    }

    renderRecomendaciones() {
        if (!this.recomendacionesContainer) return;

        const escapeHtml = (str = '') => String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const oportunidadesPrioritarias = this.obtenerOportunidadesPrioritarias(3);

        const contenido = oportunidadesPrioritarias.length ? `
            <div class="recomendaciones-mini-card" style="background:#ffffff;border-radius:16px;padding:18px 22px;box-shadow:0 16px 32px rgba(255,136,0,0.18);min-width:280px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                    <h3 style="margin:0;font-size:15px;color:#3b2a14;">Oportunidades recomendadas a gestionar hoy</h3>
                    <span style="font-size:20px;">🚀</span>
                </div>
                <p style="margin:0 0 12px 0;font-size:12px;color:#6f5b3e;">Priorizadas por probabilidad de cierre, monto y etapa comercial.</p>
                <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;">
                    ${oportunidadesPrioritarias.map(item => `
                        <li style="display:flex;flex-direction:column;gap:4px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;font-weight:600;color:#3b2a14;">
                                <span>${escapeHtml(item.nombreProducto)}</span>
                                <span style="font-size:12px;color:#ff7a00;">🎯 ${item.probabilidad}%</span>
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:#6f5b3e;">
                                <span>💰 ${Helpers.formatCurrency(item.montoOportunidad || 0)}</span>
                                <span>📊 ${escapeHtml(item.estadoVenta)}</span>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : `
            <div class="recomendaciones-mini-card" style="background:#ffffff;border-radius:16px;padding:18px 22px;box-shadow:0 16px 32px rgba(255,136,0,0.18);min-width:280px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                    <h3 style="margin:0;font-size:15px;color:#3b2a14;">Oportunidades recomendadas a gestionar hoy</h3>
                    <span style="font-size:20px;">✅</span>
                </div>
                <p style="margin:0;font-size:12px;color:#6f5b3e;">No hay oportunidades con seguimiento urgente para hoy.</p>
            </div>
        `;

        this.recomendacionesContainer.innerHTML = contenido;
    }

    /**
     * Actualiza el pipeline
     */
    actualizarPipeline() {
        this.renderPipeline();
    }

    /**
     * Inicializa la tabla de oportunidades
     */
    inicializarTabla() {
        const familiasProductos = [...new Set(this.oportunidades.map(o => o.familiaProducto))].sort();
        const datosConCampania = this.oportunidades.map(oportunidad => {
            const campaniaNombre = oportunidad.campania && oportunidad.campania.nombre
                ? oportunidad.campania.nombre
                : 'Referencia propia';
            const campaniaDescripcionTooltip = oportunidad.campania && oportunidad.campania.descripcion
                ? oportunidad.campania.descripcion.replace(/"/g, '&quot;')
                : 'Referencia propia generada por el ejecutivo';
            return {
                ...oportunidad,
                campaniaNombre,
                campaniaDescripcionTooltip
            };
        });

        const campaniasDisponibles = [...new Set(datosConCampania.map(o => o.campaniaNombre))].sort();
        
        this.tablaOportunidades = new TableComponent({
            containerId: 'tabla-oportunidades',
            title: 'Lista de Oportunidades',
            data: datosConCampania,
            columns: [
                { label: 'ID', field: 'id', className: 'text-center' },
                { 
                    label: 'Cliente', 
                    field: 'ide',
                    render: (value, row) => {
                        const cliente = ClientesUtils.getTodos().find(c => c.ide === row.ide);
                        return cliente ? cliente.nombre : 'Cliente no encontrado';
                    }
                },
                { 
                    label: 'Familia de Producto', 
                    field: 'familiaProducto',
                    render: (value) => `<span class="badge badge-primary" title="${value}">${value}</span>`
                },
                {
                    label: 'Campaña',
                    field: 'campaniaNombre',
                    render: (value, row) => {
                        if (row.campania && row.campania.nombre) {
                            return `<span class="badge badge-info" title="${row.campaniaDescripcionTooltip}">${row.campania.nombre}</span>`;
                        }
                        return '<span class="badge badge-secondary">Referencia propia</span>';
                    }
                },
                { 
                    label: 'Monto', 
                    field: 'montoOportunidad',
                    render: (value) => Helpers.formatCurrency(value)
                },
                {
                    label: 'Estado Venta',
                    field: 'estadoVenta',
                    render: (value) => {
                        const badges = {
                            'No contactado': 'badge-secondary',
                            'Interesado': 'badge-info',
                            'Negociación': 'badge-warning',
                            'Fabrica': 'badge-primary',
                            'Formalización': 'badge-info',
                            'Entregado al cliente': 'badge-success',
                            'Timbrado': 'badge-success'
                        };
                        return `<span class="badge ${badges[value]}">${value}</span>`;
                    }
                },
                {
                    label: 'Probabilidad',
                    field: 'probabilidad',
                    render: (value) => {
                        const color = value >= 70 ? 'badge-success' : value >= 40 ? 'badge-warning' : 'badge-danger';
                        return `<span class="badge ${color}">${value}%</span>`;
                    }
                },
                {
                    label: 'Fecha Creación',
                    field: 'fechaCreacion',
                    render: (value) => Helpers.formatDate(new Date(value))
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    render: (value) => {
                        if (value === 'Cerrada-Ganada') {
                            return '<span class="badge badge-success">Ganada</span>';
                        } else if (value === 'Descartada') {
                            return '<span class="badge badge-danger">Descartada</span>';
                        }
                        return '<span class="badge badge-info">Abierta</span>';
                    }
                }
            ],
            searchable: true,
            filterable: true,
            filters: [
                {
                    field: 'estado',
                    label: 'Estado',
                    options: [
                        { value: 'Abierta', label: 'Abiertas' },
                        { value: 'Cerrada-Ganada', label: 'Ganadas' },
                        { value: 'Descartada', label: 'Descartadas' }
                    ],
                    defaultValue: 'Abierta'
                },
                {
                    field: 'estadoVenta',
                    label: 'Estado de Venta',
                    options: [
                        { value: 'No contactado', label: 'No contactado' },
                        { value: 'Interesado', label: 'Interesado' },
                        { value: 'Negociación', label: 'Negociación' },
                        { value: 'Fabrica', label: 'Fábrica' },
                        { value: 'Formalización', label: 'Formalización' },
                        { value: 'Entregado al cliente', label: 'Entregado' },
                        { value: 'Timbrado', label: 'Timbrado' }
                    ]
                },
                {
                    field: 'familiaProducto',
                    label: 'Familia de Producto',
                    options: familiasProductos.map(f => ({ value: f, label: f }))
                },
                {
                    field: 'campaniaNombre',
                    label: 'Campaña',
                    options: campaniasDisponibles.map(nombre => ({ value: nombre, label: nombre }))
                }
            ],
            paginated: true,
            pageSize: 15,
            actions: [
                {
                    name: 'editar',
                    label: 'Editar',
                    icon: '✏️',
                    handler: (oportunidad) => this.abrirModalOportunidad(oportunidad)
                }
            ]
        });

        this.tablaOportunidades.init();
    }

    /**
     * Abre el modal con la información completa de la oportunidad
     */
    abrirModalOportunidad(oportunidad) {
        Helpers.log(`Ver detalles de oportunidad: ${oportunidad.nombreProducto}`, 'info');
        
        const cliente = ClientesUtils.getTodos().find(c => c.ide === oportunidad.ide);
        const nombreCliente = cliente ? cliente.nombre : 'Cliente no encontrado';
        const rfcCliente = cliente ? cliente.rfc : '-';
        const tipoCliente = cliente ? cliente.tipoPersona : '-';
        const celularCliente = cliente ? cliente.celular : '-';
        const correoCliente = cliente ? cliente.correo : '-';
        
        // Calcular días en la tubería
        const diasEnTuberia = oportunidad.fechaCierre 
            ? Math.ceil((new Date(oportunidad.fechaCierre) - new Date(oportunidad.fechaCreacion)) / (1000 * 60 * 60 * 24))
            : Math.ceil((new Date() - new Date(oportunidad.fechaCreacion)) / (1000 * 60 * 60 * 24));
        
        // Obtener productos del cliente
        const productosCliente = window.ProductosUtils ? ProductosUtils.getPorIDE(oportunidad.ide) : [];
        const productosActivos = productosCliente.filter(p => !p.fechaBaja);
        
        // Todas las familias de productos posibles
        const todasLasFamilias = [
            'Nómina', 'Tarjeta de crédito', 'Tarjeta de crédito empresarial',
            'Crédito Negocios', 'Crédito hipotecario', 'Crédito auto',
            'Seguro auto', 'Seguro hogar', 'Seguro vida', 'Crédito personal',
            'TPV', 'Cuenta de Cheques', 'Banca electrónica'
        ];
        
        // Familias que el cliente ya tiene
        const familiasContratadas = [...new Set(productosActivos.map(p => p.familiaProducto))];
        
        // Familias que el cliente NO tiene
        const familiasNoContratadas = todasLasFamilias.filter(f => !familiasContratadas.includes(f));

        // Productos disponibles agrupados por familia (solo familias con oferta vigente)
        const productosDisponiblesPorFamilia = familiasNoContratadas
            .map(familia => {
                const productosFamilia = this.getProductosPorFamilia(familia, tipoCliente);
                return {
                    familia,
                    productos: productosFamilia
                };
            })
            .filter(item => item.productos && item.productos.length > 0);

        const familiasDisponibles = productosDisponiblesPorFamilia.map(item => item.familia);
        const totalProductosDisponibles = productosDisponiblesPorFamilia.reduce(
            (sum, item) => sum + item.productos.length,
            0
        );

        const productosDisponiblesHTML = productosDisponiblesPorFamilia.length > 0
            ? `<div class="productos-grid">
                    ${productosDisponiblesPorFamilia.map(({ familia, productos }) => productos.map(p => `
                        <div class="producto-item producto-no-contratado">
                            <div class="producto-item-header">
                                <div>
                                    <h4 class="producto-item-title">${p.nombre}</h4>
                                    <div class="producto-item-family">${familia}</div>
                                </div>
                                <span class="badge badge-info">Disponible</span>
                            </div>
                            <div class="producto-item-monto">${p.montoReferencia ? Helpers.formatCurrency(p.montoReferencia) : 'Monto variable'}</div>
                            <div class="producto-item-details">
                                ${p.tasa ? `<div class="producto-item-detail"><span>Tasa desde:</span><strong>${p.tasa}%</strong></div>` : ''}
                                ${p.plazo ? `<div class="producto-item-detail"><span>Plazo hasta:</span><strong>${p.plazo} meses</strong></div>` : ''}
                                <div class="producto-item-detail"><span>Beneficio:</span><strong>${p.beneficio}</strong></div>
                            </div>
                        </div>
                    `).join('')).join('')}
               </div>`
            : `
                <div class="empty-state">
                    <div class="empty-state-icon">✅</div>
                    <div class="empty-state-text">El cliente tiene contratadas todas las familias de productos disponibles</div>
                </div>
            `;
        
        // Generar recomendación inteligente
        const recomendacion = this.generarRecomendacion(cliente, productosActivos, familiasDisponibles);

        if (!Array.isArray(oportunidad.notas)) {
            oportunidad.notas = [];
        }

        oportunidad.notas = oportunidad.notas.map(nota => {
            const normalizada = { ...nota };
            normalizada.id = normalizada.id || `nota-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            normalizada.texto = normalizada.texto || '';
            normalizada.fechaCreacion = normalizada.fechaCreacion || normalizada.fecha || new Date().toISOString();
            normalizada.ultimaActualizacion = normalizada.ultimaActualizacion || normalizada.actualizadoEl || null;
            return normalizada;
        });

        const notas = oportunidad.notas;
        const notasFormId = `oportunidad-notas-form-${oportunidad.id}`;
        const notasTextareaId = `oportunidad-nota-texto-${oportunidad.id}`;
        const notasListId = `oportunidad-notas-list-${oportunidad.id}`;
        const campania = oportunidad.campania || null;

        const escapeHtml = (str = '') => str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const formatCampaniaTexto = (texto) => {
            if (!texto) return '';
            const lines = texto.split('\n');
            let html = '';
            let openList = false;

            const closeList = () => {
                if (openList) {
                    html += '</ul>';
                    openList = false;
                }
            };

            lines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) {
                    closeList();
                    html += '<br />';
                    return;
                }

                if (trimmed.startsWith('•')) {
                    if (!openList) {
                        html += '<ul class="campania-list">';
                        openList = true;
                    }
                    html += `<li>${escapeHtml(trimmed.slice(1).trim())}</li>`;
                    return;
                }

                closeList();

                if (trimmed.startsWith('🌟')) {
                    html += `<div class="campania-subheading">${escapeHtml(trimmed.slice(1).trim())}</div>`;
                } else if (trimmed.startsWith('💡')) {
                    html += `<div class="campania-highlight">${escapeHtml(trimmed.slice(1).trim())}</div>`;
                } else if (/^[^A-Za-z0-9]/.test(trimmed)) {
                    const icon = trimmed[0];
                    const content = trimmed.slice(1).trim();
                    html += `<div class="campania-heading"><span class="campania-heading-icon">${escapeHtml(icon)}</span>${escapeHtml(content)}</div>`;
                } else {
                    html += `<p class="campania-text">${escapeHtml(trimmed)}</p>`;
                }
            });

            closeList();
            return html;
        };

        const campaniaDescripcionHTML = campania
            ? formatCampaniaTexto(campania.descripcion)
            : '<p class="campania-text">Referencia creada por el ejecutivo responsable. Utiliza esta sección para documentar el guion de venta.</p>';

        const campaniaDetalles = [];
        if (oportunidad.montoOportunidad) {
            campaniaDetalles.push({ icon: '💵', label: 'Monto objetivo', value: Helpers.formatCurrency(oportunidad.montoOportunidad) });
        }
        if (oportunidad.tasa) {
            campaniaDetalles.push({ icon: '📈', label: 'Tasa referencial', value: `${oportunidad.tasa}%` });
        }
        if (oportunidad.plazo) {
            campaniaDetalles.push({ icon: '📆', label: 'Plazo propuesto', value: `${oportunidad.plazo} meses` });
        }
        campaniaDetalles.push({ icon: '🎯', label: 'Probabilidad actual', value: `${oportunidad.probabilidad}%` });

        const ventaStages = [
            'No contactado',
            'Interesado',
            'Negociación',
            'Fabrica',
            'Formalización',
            'Entregado al cliente',
            'Timbrado'
        ];

        let currentStageIndex = ventaStages.indexOf(oportunidad.estadoVenta);
        if (currentStageIndex === -1) {
            currentStageIndex = 0;
        }

        const ventaTrackInlineStyle = 'display:flex;align-items:stretch;width:100%;border-radius:14px;border:1px solid rgba(255,136,0,0.18);background:#fff7ef;';

        const getVentaSegmentConfig = (status) => {
            switch (status) {
                case 'completed':
                    return {
                        background: '#ffe9d6',
                        textColor: '#8c4b00',
                        borderColor: 'rgba(255,136,0,0.28)',
                        indexBg: 'rgba(255,193,112,0.25)',
                        arrowBg: 'linear-gradient(90deg, rgba(255,136,0,0.25) 0%, rgba(255,136,0,0) 100%)'
                    };
                case 'current':
                    return {
                        background: '#ff8800',
                        textColor: '#ffffff',
                        borderColor: 'rgba(255,136,0,0.65)',
                        indexBg: 'rgba(255,255,255,0.25)',
                        arrowBg: 'linear-gradient(90deg, rgba(255,136,0,0.65) 0%, rgba(255,136,0,0) 100%)'
                    };
                case 'upcoming':
                default:
                    return {
                        background: '#fff1e0',
                        textColor: '#a86421',
                        borderColor: 'rgba(255,136,0,0.12)',
                        indexBg: 'rgba(255,218,170,0.4)',
                        arrowBg: 'linear-gradient(90deg, rgba(255,173,86,0.18) 0%, rgba(255,173,86,0) 100%)'
                    };
            }
        };

        const ventaFunnelSteps = ventaStages.map((stage, index) => {
            let statusClass = 'upcoming';
            if (index < currentStageIndex) {
                statusClass = 'completed';
            } else if (index === currentStageIndex) {
                statusClass = 'current';
            }

            const isLast = index === ventaStages.length - 1;
            const config = getVentaSegmentConfig(statusClass);
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
                `color:${config.textColor}`,
                !isLast ? `border-right:1px solid ${config.borderColor}` : ''
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
                'box-shadow:inset 0 0 0 2px rgba(255,255,255,0.35)'
            ].join(';');

            const nameStyle = `white-space:nowrap;color:${config.textColor}`;
            const arrowStyle = `position:absolute;right:0;top:0;width:18px;height:100%;background:${config.arrowBg};clip-path:polygon(0 0, 100% 50%, 0 100%);`;

            return `
                <div class="oportunidad-funnel-segment ${statusClass} ${isLast ? 'last' : ''}" style="${segmentStyle}">
                    <span class="funnel-segment-index" style="${indexStyle}">${index + 1}</span>
                    <span class="funnel-segment-name" style="${nameStyle}">${stage}</span>
                    ${!isLast ? `<span class="funnel-segment-arrow" style="${arrowStyle}"></span>` : ''}
                </div>
            `;
        }).join('');
 
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'oportunidad-modal-overlay';
        modal.innerHTML = `
            <div class="oportunidad-modal">
                <!-- Botón Cerrar (X en esquina) -->
                <button class="oportunidad-modal-close" onclick="this.closest('.oportunidad-modal-overlay').remove()">
                    ✕
                </button>
                
                <!-- Header -->
                <div class="oportunidad-modal-header">
                    <div class="oportunidad-modal-title">
                        <div class="oportunidad-icon">💼</div>
                        <div>
                            <h2>${oportunidad.nombreProducto}</h2>
                            <p class="oportunidad-subtitle">${oportunidad.familiaProducto}</p>
                        </div>
                    </div>
                    <div class="contact-section">
                        <div class="contact-section-title">📞 Contacto Cliente</div>
                        <div class="contact-buttons">
                            <a href="https://wa.me/${celularCliente.replace(/\D/g, '')}" target="_blank" class="contact-btn contact-btn-whatsapp">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                WhatsApp
                            </a>
                            <a href="tel:${celularCliente}" class="contact-btn contact-btn-call">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                Llamar
                            </a>
                            <a href="mailto:${correoCliente}" class="contact-btn contact-btn-email">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                Email
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Body -->
                <div class="oportunidad-modal-body">
                    <div class="oportunidad-funnel-wrapper" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
                            <h3 style="margin:0;font-size:15px;font-weight:700;color:#2C3E50;">Pipeline de venta</h3>
                            <span style="display:inline-flex;align-items:center;padding:6px 14px;border-radius:999px;background:rgba(255,136,0,0.15);color:#9A4B00;font-size:12px;font-weight:700;">${oportunidad.estadoVenta}</span>
                        </div>
                        <div class="oportunidad-funnel-track" style="${ventaTrackInlineStyle}">
                            ${ventaFunnelSteps}
                        </div>
                    </div>
                    <!-- Métricas Principales -->
                    <div class="oportunidad-metrics">
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #FFE4CC 0%, #FF8800 100%);">💰</div>
                            <div class="metric-info">
                                <div class="metric-value">${Helpers.formatCurrency(oportunidad.montoOportunidad)}</div>
                                <div class="metric-label">Monto Oportunidad</div>
                            </div>
                        </div>
                        
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #CCE5FF 0%, #0088FF 100%);">📊</div>
                            <div class="metric-info">
                                <div class="metric-value">${oportunidad.probabilidad}%</div>
                                <div class="metric-label">Probabilidad</div>
                            </div>
                        </div>
                        
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #D5F5E3 0%, #00CCA3 100%);">💵</div>
                            <div class="metric-info">
                                <div class="metric-value">${Helpers.formatCurrency(oportunidad.montoOportunidad * oportunidad.probabilidad / 100)}</div>
                                <div class="metric-label">Monto Ponderado</div>
                            </div>
                        </div>
                        
                        <div class="metric-card-modal">
                            <div class="metric-icon" style="background: linear-gradient(135deg, #E8DAEF 0%, #A366FF 100%);">⏱️</div>
                            <div class="metric-info">
                                <div class="metric-value">${diasEnTuberia}</div>
                                <div class="metric-label">Días en la Tubería</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pestañas Principales -->
                    <div class="modal-main-tabs">
                        ${(() => {
                            const buttons = [`<button class="modal-main-tab active" data-main-tab="gestion">📋 Gestión</button>`];
                            if (campania) {
                                buttons.push(`<button class="modal-main-tab" data-main-tab="campania">📣 Información Campaña</button>`);
                            }
                            buttons.push(`<button class="modal-main-tab" data-main-tab="vinculacion">🔗 Vinculación</button>`);
                            return buttons.join('');
                        })()}
                    </div>
                    
                    <!-- Tab Content: Gestión -->
                    <div class="modal-main-tab-content active" id="main-tab-gestion">
                        <!-- Grid de 3 columnas -->
                        <div class="oportunidad-grid-3col">
                        <!-- Columna 1: Cliente -->
                        <div class="oportunidad-card">
                            <div class="oportunidad-card-header">
                                <div class="card-header-icon">👤</div>
                                <h3>Información del Cliente</h3>
                            </div>
                            <div class="oportunidad-card-body">
                                <div class="info-row">
                                    <span class="info-label">Cliente:</span>
                                    <span class="info-value">${nombreCliente}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">RFC:</span>
                                    <span class="info-value">${rfcCliente}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Tipo:</span>
                                    <span class="info-value">${this.getTipoCorto(tipoCliente)}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">IDE:</span>
                                    <span class="info-value info-highlight">${oportunidad.ide}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Teléfono:</span>
                                    <span class="info-value">${celularCliente}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Correo:</span>
                                    <span class="info-value info-small">${correoCliente}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Columna 2: Detalles Financieros -->
                        <div class="oportunidad-card">
                            <div class="oportunidad-card-header">
                                <div class="card-header-icon">💼</div>
                                <h3>Detalles Financieros</h3>
                            </div>
                            <div class="oportunidad-card-body">
                                <div class="info-row">
                                    <span class="info-label">Producto:</span>
                                    <span class="info-value">${oportunidad.nombreProducto}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Familia:</span>
                                    <span class="badge badge-secondary">${oportunidad.familiaProducto}</span>
                                </div>
                                ${oportunidad.tasa ? `
                                <div class="info-row">
                                    <span class="info-label">${oportunidad.familiaProducto && oportunidad.familiaProducto.toLowerCase().includes('tarjeta de crédito') ? 'CAT:' : 'Tasa:'}</span>
                                    <span class="info-value info-highlight">${oportunidad.tasa}%</span>
                                </div>` : ''}
                                ${oportunidad.plazo ? `
                                <div class="info-row">
                                    <span class="info-label">Plazo:</span>
                                    <span class="info-value">${oportunidad.plazo} meses</span>
                                </div>` : ''}
                                <div class="info-row">
                                    <span class="info-label">Timbrado:</span>
                                    ${oportunidad.timbrado 
                                        ? '<span class="badge badge-success">✓ Sí</span>' 
                                        : '<span class="badge badge-secondary">No</span>'}
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Monto Total:</span>
                                    <span class="info-value info-large">${Helpers.formatCurrency(oportunidad.montoOportunidad)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Columna 3: Estado y Fechas -->
                        <div class="oportunidad-card">
                            <div class="oportunidad-card-header">
                                <div class="card-header-icon">📊</div>
                                <h3>Estado y Seguimiento</h3>
                            </div>
                            <div class="oportunidad-card-body">
                                <div class="info-row">
                                    <span class="info-label">Estado General:</span>
                                    <span class="badge ${oportunidad.estado === 'Cerrada-Ganada' ? 'badge-success' : oportunidad.estado === 'Descartada' ? 'badge-danger' : 'badge-info'}">
                                        ${oportunidad.estado === 'Cerrada-Ganada' ? 'Ganada' : oportunidad.estado === 'Descartada' ? 'Descartada' : 'Abierta'}
                                    </span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Estado de Venta:</span>
                                    <span class="badge badge-primary">${oportunidad.estadoVenta}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Probabilidad:</span>
                                    <span class="badge ${oportunidad.probabilidad >= 70 ? 'badge-success' : oportunidad.probabilidad >= 40 ? 'badge-warning' : 'badge-danger'}">
                                        ${oportunidad.probabilidad}%
                                    </span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Fecha Creación:</span>
                                    <span class="info-value">${Helpers.formatDate(new Date(oportunidad.fechaCreacion))}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Fecha Cierre:</span>
                                    <span class="info-value">
                                        ${oportunidad.fechaCierre 
                                            ? Helpers.formatDate(new Date(oportunidad.fechaCierre)) 
                                            : '<span class="badge badge-warning">Pendiente</span>'}
                                    </span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Días en Tubería:</span>
                                    <span class="info-value info-highlight">${diasEnTuberia} días</span>
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
                                <form id="${notasFormId}" class="notas-form">
                                    <textarea id="${notasTextareaId}" class="notas-textarea" rows="3" placeholder="Registra un comentario o seguimiento"></textarea>
                                    <div class="notas-actions">
                                        <button type="submit" class="btn btn-primary">Agregar nota</button>
                                    </div>
                                </form>
                                <div id="${notasListId}" class="notas-list"></div>
                            </div>
                        </div>
                    </div>
                    
                    ${campania ? `
                    <div class="modal-main-tab-content" id="main-tab-campania">
                        <div class="campania-card">
                            <div class="campania-card-header">
                                <div class="campania-card-icon">📣</div>
                                <div>
                                    <h3>${escapeHtml(campania.nombre)}</h3>
                                    <span class="campania-card-subtitle">Guion sugerido para la campaña</span>
                                </div>
                            </div>
                            <div class="campania-card-body">
                                <div class="campania-description">${campaniaDescripcionHTML}</div>
                                ${campaniaDetalles.length ? `
                                <div class="campania-details-grid">
                                    ${campaniaDetalles.map(detalle => `
                                        <div class="campania-detail-card">
                                            <div class="campania-detail-icon">${detalle.icon}</div>
                                            <div>
                                                <div class="campania-detail-label">${escapeHtml(detalle.label)}</div>
                                                <div class="campania-detail-value">${escapeHtml(detalle.value)}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Tab Content: Vinculación -->
                    <div class="modal-main-tab-content" id="main-tab-vinculacion">
                        <!-- Sección de Productos del Cliente -->
                        <div class="productos-section">
                        <div class="productos-section-header">
                            <div class="card-header-icon">🏦</div>
                            <h3>Portafolio de Productos</h3>
                        </div>
                        
                        <!-- Tabs -->
                        <div class="productos-tabs">
                            <button class="productos-tab active" data-tab="contratados">
                                📦 Productos Contratados (${productosActivos.length})
                            </button>
                            <button class="productos-tab" data-tab="disponibles">
                                🛒 Productos Disponibles (${totalProductosDisponibles})
                            </button>
                            <button class="productos-tab" data-tab="recomendado">
                                ⭐ Producto Recomendado
                            </button>
                        </div>
                        
                        <!-- Tab Content: Productos Contratados -->
                        <div class="productos-tab-content active" id="tab-contratados">
                            ${productosActivos.length > 0 ? `
                                <div class="productos-grid">
                                    ${productosActivos.map(p => `
                                        <div class="producto-item">
                                            <div class="producto-item-header">
                                                <div>
                                                    <h4 class="producto-item-title">${p.nombreProducto}</h4>
                                                    <div class="producto-item-family">${p.familiaProducto}</div>
                                                </div>
                                                <span class="badge badge-success">Activo</span>
                                            </div>
                                            <div class="producto-item-monto">${Helpers.formatCurrency(p.montoLinea)}</div>
                                            <div class="producto-item-details">
                                                ${p.tasa ? `<div class="producto-item-detail"><span>Tasa:</span><strong>${p.tasa}%</strong></div>` : ''}
                                                ${p.plazoTotal ? `<div class="producto-item-detail"><span>Plazo:</span><strong>${p.plazoTotal} meses</strong></div>` : ''}
                                                ${p.montoDeuda ? `<div class="producto-item-detail"><span>Deuda:</span><strong>${Helpers.formatCurrency(p.montoDeuda)}</strong></div>` : ''}
                                                <div class="producto-item-detail"><span>Desde:</span><strong>${Helpers.formatDate(new Date(p.fechaAlta))}</strong></div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="empty-state">
                                    <div class="empty-state-icon">📦</div>
                                    <div class="empty-state-text">No hay productos contratados actualmente</div>
                                </div>
                            `}
                        </div>
                        
                        <!-- Tab Content: Productos Disponibles -->
                        <div class="productos-tab-content" id="tab-disponibles">
                            ${productosDisponiblesHTML}
                        </div>
                        
                        <!-- Tab Content: Producto Recomendado -->
                        <div class="productos-tab-content" id="tab-recomendado">
                            ${recomendacion ? `
                                <div class="producto-recomenado-card">
                                    <span class="producto-recomendado-badge">⭐ RECOMENDACIÓN INTELIGENTE</span>
                                    <h3 class="producto-recomendado-title">${recomendacion.nombre}</h3>
                                    <p class="producto-recomendado-subtitle">${recomendacion.familia}</p>
                                    <div class="producto-recomendado-monto">${recomendacion.montoReferencia ? Helpers.formatCurrency(recomendacion.montoReferencia) : 'Monto a definir'}</div>
                                    <div class="producto-recomendado-reason">
                                        <strong>💡 ¿Por qué recomendamos este producto?</strong><br>
                                        ${recomendacion.razon}
                                    </div>
                                    ${recomendacion.beneficios ? `
                                        <div class="producto-recomendado-reason">
                                            <strong>✨ Beneficios principales:</strong><br>
                                            ${recomendacion.beneficios}
                                        </div>
                                    ` : ''}
                                    <div class="producto-recomendado-action">
                                        <button class="btn-crear-oportunidad" onclick="alert('Creando oportunidad para ${recomendacion.nombre}...')">
                                            🎯 Crear Oportunidad
                                        </button>
                                    </div>
                                </div>
                            ` : `
                                <div class="empty-state">
                                    <div class="empty-state-icon">🎯</div>
                                    <div class="empty-state-text">No hay recomendaciones disponibles en este momento</div>
                                </div>
                            `}
                        </div>
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="oportunidad-modal-footer">
                    <div style="flex: 1;"></div>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-primary" onclick="alert('Función de edición en desarrollo')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 6px;" stroke="currentColor" stroke-width="2">
                                <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Editar Oportunidad
                        </button>
                        <button class="btn btn-success" onclick="alert('Guardando cambios...')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 6px;" stroke="currentColor" stroke-width="2">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Cerrar con tecla Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Event listeners para las pestañas principales (Gestión y Vinculación)
        setTimeout(() => {
            const mainTabs = modal.querySelectorAll('.modal-main-tab');
            const mainTabContents = modal.querySelectorAll('.modal-main-tab-content');
            
            mainTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remover active de todos
                    mainTabs.forEach(t => t.classList.remove('active'));
                    mainTabContents.forEach(tc => tc.classList.remove('active'));
                    
                    // Agregar active al seleccionado
                    tab.classList.add('active');
                    const targetTab = tab.getAttribute('data-main-tab');
                    const targetContent = modal.querySelector(`#main-tab-${targetTab}`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
            
            // Event listeners para los tabs de productos (dentro de Vinculación)
            const tabs = modal.querySelectorAll('.productos-tab');
            const tabContents = modal.querySelectorAll('.productos-tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remover active de todos
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(tc => tc.classList.remove('active'));
                    
                    // Agregar active al seleccionado
                    tab.classList.add('active');
                    const targetTab = tab.getAttribute('data-tab');
                    const targetContent = modal.querySelector(`#tab-${targetTab}`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }, 0);
        
        // Agregar al DOM
        document.body.appendChild(modal);

        const notasForm = modal.querySelector(`#${notasFormId}`);
        const notasTextarea = modal.querySelector(`#${notasTextareaId}`);
        const notasList = modal.querySelector(`#${notasListId}`);

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
                        <div class="empty-state-text">Aún no registras notas para esta oportunidad.</div>
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
    }
    
    /**
     * Obtiene el tipo corto del cliente
     */
    getTipoCorto(tipo) {
        const tipos = {
            'Persona Moral': 'PM',
            'Persona Física con Actividad Empresarial': 'PFAE',
            'Persona Física sin Actividad Empresarial': 'PF'
        };
        return tipos[tipo] || tipo;
    }
    
    /**
     * Obtiene productos disponibles por familia según el tipo de cliente
     */
    getProductosPorFamilia(familia, tipoCliente) {
        const catalogoProductos = {
            'Nómina': [
                { nombre: 'Nómina Empresarial', montoReferencia: 500000, beneficio: 'Gestión integral de nómina', tasa: null, plazo: null }
            ],
            'Tarjeta de crédito': [
                { nombre: 'Tarjeta Platinum', montoReferencia: 80000, beneficio: 'Cashback y puntos', tasa: 42, plazo: null },
                { nombre: 'Tarjeta Gold', montoReferencia: 50000, beneficio: 'Meses sin intereses', tasa: 48, plazo: null },
                { nombre: 'Tarjeta Clásica', montoReferencia: 25000, beneficio: 'Sin anualidad', tasa: 52, plazo: null }
            ],
            'Tarjeta de crédito empresarial': [
                { nombre: 'Tarjeta Business Premium', montoReferencia: 250000, beneficio: 'Control de gastos empresariales', tasa: 38, plazo: null },
                { nombre: 'Tarjeta Corporate', montoReferencia: 500000, beneficio: 'Beneficios exclusivos', tasa: 35, plazo: null }
            ],
            'Crédito Negocios': [
                { nombre: 'Crédito Capital de Trabajo', montoReferencia: 1500000, beneficio: 'Liquidez inmediata', tasa: 12.5, plazo: 36 },
                { nombre: 'Crédito Empresarial Constructor', montoReferencia: 5000000, beneficio: 'Tasas preferenciales', tasa: 11, plazo: 60 }
            ],
            'Crédito hipotecario': [
                { nombre: 'Hipoteca Premium', montoReferencia: 2500000, beneficio: 'Tasa competitiva', tasa: 9.5, plazo: 240 },
                { nombre: 'Hipoteca Tradicional', montoReferencia: 1500000, beneficio: 'Pago fijo', tasa: 10.5, plazo: 180 }
            ],
            'Crédito auto': [
                { nombre: 'Crédito Auto Nuevo', montoReferencia: 500000, beneficio: 'Financiamiento hasta 80%', tasa: 14, plazo: 60 },
                { nombre: 'Crédito Auto Seminuevo', montoReferencia: 300000, beneficio: 'Proceso rápido', tasa: 16, plazo: 48 }
            ],
            'Seguro auto': [
                { nombre: 'Seguro Todo Riesgo', montoReferencia: 15000, beneficio: 'Cobertura amplia', tasa: null, plazo: 12 },
                { nombre: 'Seguro Básico', montoReferencia: 8000, beneficio: 'Cobertura esencial', tasa: null, plazo: 12 }
            ],
            'Seguro hogar': [
                { nombre: 'Seguro Hogar Integral', montoReferencia: 12000, beneficio: 'Protección total', tasa: null, plazo: 12 },
                { nombre: 'Seguro Hogar Básico', montoReferencia: 6000, beneficio: 'Cobertura básica', tasa: null, plazo: 12 }
            ],
            'Seguro vida': [
                { nombre: 'Seguro de Vida Plus', montoReferencia: 8000, beneficio: 'Cobertura hasta $1M', tasa: null, plazo: 12 },
                { nombre: 'Seguro de Vida Básico', montoReferencia: 4000, beneficio: 'Protección familiar', tasa: null, plazo: 12 }
            ],
            'Crédito personal': [
                { nombre: 'Crédito Personal Express', montoReferencia: 150000, beneficio: 'Aprobación inmediata', tasa: 24, plazo: 36 },
                { nombre: 'Crédito Personal Plus', montoReferencia: 300000, beneficio: 'Tasa preferencial', tasa: 20, plazo: 48 }
            ],
            'TPV': [
                { nombre: 'Terminal Premium', montoReferencia: 50000, beneficio: 'Comisión baja', tasa: 2.5, plazo: null },
                { nombre: 'Terminal Básica', montoReferencia: 25000, beneficio: 'Sin renta', tasa: 3.5, plazo: null }
            ],
            'Cuenta de Cheques': [
                { nombre: 'Cuenta Empresarial Premium', montoReferencia: 500000, beneficio: 'Sin comisiones', tasa: null, plazo: null },
                { nombre: 'Cuenta Personal Plus', montoReferencia: 100000, beneficio: 'Banca en línea', tasa: null, plazo: null }
            ],
            'Banca electrónica': [
                { nombre: 'Banca Móvil Empresarial', montoReferencia: null, beneficio: 'Gestión total desde app', tasa: null, plazo: null },
                { nombre: 'Banca Digital Personal', montoReferencia: null, beneficio: 'Operaciones 24/7', tasa: null, plazo: null }
            ]
        };
        
        // Filtrar según tipo de cliente
        const productos = catalogoProductos[familia] || [];
        if (tipoCliente === 'Persona Moral') {
            const filtrados = productos.filter(p =>
                p.nombre.includes('Empresarial') ||
                p.nombre.includes('Business') ||
                p.nombre.includes('Corporate') ||
                p.nombre.includes('Constructor') ||
                familia === 'Crédito Negocios' ||
                familia === 'TPV'
            );
            return filtrados.length > 0 ? filtrados : productos;
        }
        return productos;
    }
    
    /**
     * Genera recomendación inteligente de producto
     */
    generarRecomendacion(cliente, productosActivos, familiasNoContratadas) {
        if (!familiasNoContratadas || familiasNoContratadas.length === 0) {
            return null;
        }
        
        const tipoCliente = cliente.tipoPersona;
        const carteraTotal = productosActivos.reduce((sum, p) => sum + (p.montoLinea || 0), 0);
        
        // Lógica de recomendación basada en perfil
        let familiaRecomendada = null;
        let razon = '';
        let beneficios = '';
        
        if (tipoCliente === 'Persona Moral') {
            // Recomendaciones para empresas
            if (familiasNoContratadas.includes('TPV')) {
                familiaRecomendada = 'TPV';
                razon = 'Su empresa puede beneficiarse de una terminal punto de venta para incrementar sus canales de cobro y mejorar el flujo de efectivo.';
                beneficios = 'Comisiones competitivas, liquidación inmediata, reportes en línea y soporte 24/7.';
            } else if (familiasNoContratadas.includes('Crédito Negocios')) {
                familiaRecomendada = 'Crédito Negocios';
                razon = 'Con base en su perfil crediticio, un crédito para capital de trabajo puede impulsar el crecimiento de su empresa.';
                beneficios = 'Tasas preferenciales, plazos flexibles hasta 60 meses, y disposición inmediata de recursos.';
            } else if (familiasNoContratadas.includes('Nómina')) {
                familiaRecomendada = 'Nómina';
                razon = 'La domiciliación de nómina empresarial simplifica la gestión de pagos y ofrece beneficios adicionales para sus colaboradores.';
                beneficios = 'Gestión automatizada, tarjetas para empleados, y descuentos en productos del banco.';
            } else if (familiasNoContratadas.includes('Tarjeta de crédito empresarial')) {
                familiaRecomendada = 'Tarjeta de crédito empresarial';
                razon = 'Una tarjeta empresarial le ayudará a controlar y optimizar los gastos de su negocio con mayor eficiencia.';
                beneficios = 'Control total de gastos, estados de cuenta detallados, línea de crédito empresarial.';
            }
        } else {
            // Recomendaciones para personas físicas
            if (carteraTotal > 1000000 && familiasNoContratadas.includes('Seguro vida')) {
                familiaRecomendada = 'Seguro vida';
                razon = 'Considerando su perfil financiero, un seguro de vida protegerá a su familia y asegurará su patrimonio.';
                beneficios = 'Coberturas hasta $1M, sin examen médico, y beneficios adicionales por invalidez.';
            } else if (familiasNoContratadas.includes('Tarjeta de crédito')) {
                familiaRecomendada = 'Tarjeta de crédito';
                razon = 'Una tarjeta de crédito le brinda flexibilidad financiera y múltiples beneficios de consumo.';
                beneficios = 'Cashback, meses sin intereses, programa de puntos, y protección de compras.';
            } else if (familiasNoContratadas.includes('Crédito personal')) {
                familiaRecomendada = 'Crédito personal';
                razon = 'Un crédito personal puede ayudarle a cumplir sus metas financieras con tasas competitivas.';
                beneficios = 'Aprobación rápida, sin garantías, y pagos fijos mensuales.';
            } else if (familiasNoContratadas.includes('Seguro auto')) {
                familiaRecomendada = 'Seguro auto';
                razon = 'Proteja su vehículo con un seguro que ofrece cobertura amplia y asistencia 24/7.';
                beneficios = 'Cobertura contra daños, robo, asistencia vial, y auto sustituto.';
            }
        }
        
        // Si no se encontró recomendación específica, tomar la primera disponible
        if (!familiaRecomendada) {
            familiaRecomendada = familiasNoContratadas[0];
            razon = `Basado en el análisis de su perfil, ${familiaRecomendada} es una excelente opción para complementar su portafolio financiero.`;
            beneficios = 'Múltiples beneficios diseñados para sus necesidades específicas.';
        }
        
        const productosDisponibles = this.getProductosPorFamilia(familiaRecomendada, tipoCliente);
        if (!productosDisponibles || productosDisponibles.length === 0) {
            return null;
        }
        const productoRecomendado = productosDisponibles[0];
        
        return {
            familia: familiaRecomendada,
            nombre: productoRecomendado.nombre,
            montoReferencia: productoRecomendado.montoReferencia,
            razon: razon,
            beneficios: beneficios
        };
    }
}

// Hacer disponible globalmente
window.OportunidadesModule = OportunidadesModule;
