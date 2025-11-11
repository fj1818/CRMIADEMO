/**
 * ============================================
 * MÓDULO DE MI CARTERA
 * ============================================
 * Gestiona la sección de cartera de clientes
 */

class MiCarteraModule {
    constructor() {
        this.sectionId = 'mi-cartera';
        this.container = null;
        this.clientes = [];
        this.estadisticas = {};
        this.tablaClientes = null;
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.container = document.getElementById(this.sectionId);
        this.cargarClientes();
        this.calcularEstadisticas();
        this.renderEstadisticas();
        this.inicializarTabla();
        Helpers.log('Módulo de Mi Cartera inicializado', 'success');
    }

    /**
     * Se ejecuta al entrar a la sección
     */
    onEnter() {
        Helpers.log('Entrando a sección Mi Cartera', 'info');
        // Recargar datos si es necesario
        this.actualizarDatos();
    }

    /**
     * Se ejecuta al salir de la sección
     */
    onLeave() {
        Helpers.log('Saliendo de sección Mi Cartera', 'info');
    }

    /**
     * Carga los clientes de la cartera
     */
    cargarClientes() {
        this.clientes = ClientesUtils.getTodos();
        Helpers.log(`${this.clientes.length} clientes cargados`, 'success');
    }

    /**
     * Calcula estadísticas de la cartera
     */
    calcularEstadisticas() {
        this.estadisticas = ClientesUtils.getEstadisticas();
    }

    /**
     * Actualiza los datos
     */
    actualizarDatos() {
        this.cargarClientes();
        this.calcularEstadisticas();
        this.renderEstadisticas();
        if (this.tablaClientes) {
            this.tablaClientes.data = this.clientes;
            this.tablaClientes.filterData();
        }
    }

    /**
     * Renderiza las estadísticas
     */
    renderEstadisticas() {
        const statsContainer = document.getElementById('mi-cartera-stats');
        if (!statsContainer) return;

        const stats = [
            {
                icon: '👥',
                value: this.estadisticas.total,
                label: 'Total Clientes',
                trend: null
            },
            {
                icon: '✅',
                value: this.estadisticas.clientesActivos,
                label: 'Clientes Activos',
                trend: { type: 'positive', text: `${Math.round(this.estadisticas.clientesActivos / this.estadisticas.total * 100)}%` }
            },
            {
                icon: '🏢',
                value: this.estadisticas.personasMorales,
                label: 'Persona Moral',
                trend: null
            },
            {
                icon: '💼',
                value: this.estadisticas.personasFisicasConActividad,
                label: 'Persona Física con Actividad Empresarial',
                trend: null
            },
            {
                icon: '👤',
                value: this.estadisticas.personasFisicas,
                label: 'Persona Física sin Actividad Empresarial',
                trend: null
            },
            {
                icon: '❌',
                value: this.estadisticas.clientesBaja,
                label: 'Dados de Baja',
                trend: this.estadisticas.clientesBaja > 0 ? { type: 'negative', text: 'Revisar' } : null
            }
        ];

        statsContainer.innerHTML = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-icon">${stat.icon}</span>
                </div>
                <div class="stat-card-body">
                    <div class="stat-card-value">${stat.value}</div>
                    <div class="stat-card-label">${stat.label}</div>
                </div>
                ${stat.trend ? `
                    <div class="stat-card-footer">
                        <span class="stat-trend ${stat.trend.type}">
                            ${stat.trend.type === 'positive' ? '↗' : stat.trend.type === 'negative' ? '↘' : '→'}
                            ${stat.trend.text}
                        </span>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    /**
     * Inicializa la tabla de clientes
     */
    inicializarTabla() {
        // Obtener familias de productos únicas para el filtro
        const familiasProductos = [...new Set(ProductosUtils.getTodos().map(p => p.familiaProducto))].sort();
        
        this.tablaClientes = new TableComponent({
            containerId: 'tabla-clientes',
            title: 'Lista de Clientes',
            data: ClientesUtils.getTodos(), // Todos los clientes
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    className: 'text-center'
                },
                {
                    label: 'Nombre / Razón Social',
                    field: 'nombre',
                    className: 'table-cell-truncate'
                },
                {
                    label: 'Tipo de Persona',
                    field: 'tipoPersona',
                    render: (value) => {
                        const badges = {
                            'Persona Moral': 'badge-primary',
                            'Persona Física con Actividad Empresarial': 'badge-info',
                            'Persona Física sin Actividad Empresarial': 'badge-secondary'
                        };
                        const shortLabels = {
                            'Persona Moral': 'PM',
                            'Persona Física con Actividad Empresarial': 'PFAE',
                            'Persona Física sin Actividad Empresarial': 'PF'
                        };
                        return `<span class="badge ${badges[value]}" title="${value}">${shortLabels[value]}</span>`;
                    }
                },
                {
                    label: 'Fecha Alta',
                    field: 'fechaAlta',
                    render: (value) => Helpers.formatDate(new Date(value))
                },
                {
                    label: 'Fecha Baja',
                    field: 'fechaBaja',
                    render: (value) => {
                        if (value === null) {
                            return '-';
                        }
                        return Helpers.formatDate(new Date(value));
                    }
                },
                {
                    label: 'Estado',
                    field: 'fechaBaja',
                    render: (value) => {
                        if (value === null) {
                            return '<span class="badge badge-success">Activo</span>';
                        }
                        return `<span class="badge badge-danger">Baja</span>`;
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
                        { value: 'activo', label: 'Activos' },
                        { value: 'baja', label: 'Dados de Baja' }
                    ],
                    defaultValue: 'activo'
                },
                {
                    field: 'tipoPersona',
                    label: 'Tipo de Persona',
                    options: [
                        { value: 'Persona Moral', label: 'Persona Moral' },
                        { value: 'Persona Física con Actividad Empresarial', label: 'Persona Física con Actividad Empresarial' },
                        { value: 'Persona Física sin Actividad Empresarial', label: 'Persona Física sin Actividad Empresarial' }
                    ]
                }
            ],
            paginated: true,
            pageSize: 10,
            actions: [
                {
                    name: 'ver',
                    label: 'Ver detalles',
                    icon: '👁️',
                    handler: (cliente) => this.verDetalleCliente(cliente)
                }
            ]
        });

        this.tablaClientes.init();
        
        // Inicializar filtros múltiples de productos
        this.inicializarFiltrosProductos(familiasProductos);
    }
    
    /**
     * Inicializa los filtros múltiples de productos
     */
    inicializarFiltrosProductos(familiasProductos) {
        // Guardar referencia a las familias para re-inicializar si es necesario
        this.familiasProductos = familiasProductos;
        
        // Usar setTimeout para asegurar que la tabla esté renderizada
        setTimeout(() => {
            this.crearFiltrosProductos();
        }, 100);
    }
    
    /**
     * Crea los filtros de productos (puede llamarse múltiples veces)
     */
    crearFiltrosProductos() {
        // Crear contenedor para filtros múltiples
        const toolbar = document.querySelector('#tabla-clientes .table-toolbar-right');
        if (!toolbar) {
            console.error('Toolbar no encontrado para filtros múltiples');
            return;
        }
        
        // Verificar si ya existen los contenedores
        if (document.getElementById('filtro-con-productos')) {
            return; // Ya están inicializados
        }
        
        // Crear contenedores para los multiselect
        const filtersHTML = `
            <div id="filtro-con-productos"></div>
            <div id="filtro-sin-productos"></div>
        `;
        toolbar.insertAdjacentHTML('beforeend', filtersHTML);
        
        // Filtro CON productos
        this.filtroConProductos = new MultiSelect({
            id: 'con-productos',
            containerId: 'filtro-con-productos',
            label: 'CON Productos',
            placeholder: 'CON Productos',
            options: this.familiasProductos.map(f => ({ value: f, label: f })),
            onChange: (values) => {
                this.tablaClientes.activeFilters.conFamilias = values;
                this.tablaClientes.filterData();
            }
        });
        this.filtroConProductos.init();
        
        // Filtro SIN productos
        this.filtroSinProductos = new MultiSelect({
            id: 'sin-productos',
            containerId: 'filtro-sin-productos',
            label: 'SIN Productos',
            placeholder: 'SIN Productos',
            options: this.familiasProductos.map(f => ({ value: f, label: f })),
            onChange: (values) => {
                this.tablaClientes.activeFilters.sinFamilias = values;
                this.tablaClientes.filterData();
            }
        });
        this.filtroSinProductos.init();
        
        Helpers.log('Filtros múltiples de productos inicializados', 'success');
    }

    /**
     * Ver detalle de un cliente - Vista 360°
     */
    verDetalleCliente(cliente) {
        Helpers.log(`Ver detalles de: ${cliente.nombre}`, 'info');
        
        // Obtener productos del cliente
        const productos = ProductosUtils.getPorIDE(cliente.ide);
        const deudaTotal = ProductosUtils.getDeudaTotalPorIDE(cliente.ide);
        
        // Crear vista 360
        this.mostrarVista360(cliente, productos, deudaTotal);
    }
    
    /**
     * Muestra la vista 360° del cliente
     */
    mostrarVista360(cliente, productos, deudaTotal) {
        // Calcular métricas
        const carteraTotal = productos.reduce((sum, p) => sum + (p.montoLinea || 0), 0);
        const utilidadAnual = Math.round(carteraTotal * 0.025); // 2.5% estimado
        const scoreReciprocidad = Math.min(100, Math.round((productos.length / 5) * 100));
        const saldoPromedio = productos.length > 0 ? Math.round(carteraTotal / productos.length) : 0;
        const diasMorosidad = cliente.fechaBaja ? Math.round((new Date() - new Date(cliente.fechaBaja)) / (1000 * 60 * 60 * 24)) : 0;
        const productosActivos = productos.filter(p => !p.fechaBaja).length;
        
        // Obtener iniciales para avatar
        const iniciales = this.obtenerIniciales(cliente.nombre);
        
        // Guardar cliente actual para poder volver
        this.clienteActual = cliente;
        
        // Obtener contenedor principal de la sección
        const seccionContainer = document.getElementById('mi-cartera');
        
        // Reemplazar contenido con vista 360
        seccionContainer.innerHTML = `
            <div class="cliente360-container">
                <!-- Botón Regresar -->
                <div style="padding: 30px 40px 20px 40px;">
                    <button class="cliente360-back-btn" id="btn-volver-clientes-top">
                        ← Volver a Clientes
                    </button>
                </div>
                
                <!-- Breadcrumb -->
                <div class="cliente360-breadcrumb">
                    <a href="#" id="breadcrumb-volver-cartera">Mi Cartera</a>
                    <span class="cliente360-breadcrumb-separator">/</span>
                    <a href="#" id="breadcrumb-volver-clientes">Clientes</a>
                    <span class="cliente360-breadcrumb-separator">/</span>
                    <span>${cliente.nombre}</span>
                </div>
                
                <!-- Contenido -->
                <div class="cliente360-content">
                    <!-- Cliente Header -->
                    <div class="cliente360-header">
                        <div class="cliente360-info-wrapper">
                            <div class="cliente360-avatar">${iniciales}</div>
                            <div class="cliente360-info">
                                <h1>${cliente.nombre}</h1>
                                <div class="cliente360-meta">
                                    <div class="cliente360-meta-item">
                                        <strong>RFC:</strong> ${cliente.rfc}
                                    </div>
                                    <div class="cliente360-meta-item">
                                        <strong>Tipo:</strong> ${this.getTipoCorto(cliente.tipoPersona)}
                                    </div>
                                    <div class="cliente360-meta-item">
                                        <strong>IDE:</strong> ${cliente.ide}
                                    </div>
                                    <div class="cliente360-meta-item">
                                        <strong>Cliente desde:</strong> ${Helpers.formatDate(new Date(cliente.fechaAlta))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cliente360-actions">
                            <button class="btn btn-primary">+ Nueva Oportunidad</button>
                            <button class="btn btn-secondary">📞 Registrar Contacto</button>
                            <button class="btn btn-secondary">📝 Historial</button>
                        </div>
                    </div>
                    
                    <!-- Métricas Rápidas -->
                    <div class="cliente360-metrics-grid">
                        <div class="cliente360-metric-card">
                            <div class="cliente360-metric-value">${Helpers.formatCurrency(carteraTotal)}</div>
                            <div class="cliente360-metric-label">Cartera Total</div>
                        </div>
                        <div class="cliente360-metric-card">
                            <div class="cliente360-metric-value">${Helpers.formatCurrency(utilidadAnual)}</div>
                            <div class="cliente360-metric-label">Utilidad Anual Est.</div>
                        </div>
                        <div class="cliente360-metric-card">
                            <div class="cliente360-metric-value">${scoreReciprocidad}%</div>
                            <div class="cliente360-metric-label">Score Reciprocidad</div>
                        </div>
                        <div class="cliente360-metric-card">
                            <div class="cliente360-metric-value">${Helpers.formatCurrency(saldoPromedio)}</div>
                            <div class="cliente360-metric-label">Saldo Promedio</div>
                        </div>
                        <div class="cliente360-metric-card">
                            <div class="cliente360-metric-value">${diasMorosidad}</div>
                            <div class="cliente360-metric-label">Días Morosidad</div>
                        </div>
                        <div class="cliente360-metric-card">
                            <div class="cliente360-metric-value">${productosActivos}</div>
                            <div class="cliente360-metric-label">Productos Activos</div>
                        </div>
                    </div>
                    
                    <!-- Row 1: Cartera y Oportunidades -->
                    <div class="cliente360-grid-2col">
                        <!-- Cartera de Productos -->
                        <div class="cliente360-card">
                            <div class="cliente360-card-header">
                                <div class="cliente360-card-icon icon-orange-360">📊</div>
                                Cartera de Productos
                            </div>
                            <div class="cliente360-card-content">
                                ${this.renderTablaProductos(productos)}
                            </div>
                        </div>
                        
                        <!-- Pipeline de Oportunidades -->
                        <div class="cliente360-card">
                            <div class="cliente360-card-header">
                                <div class="cliente360-card-icon icon-blue-360">🎯</div>
                                Pipeline de Oportunidades
                            </div>
                            <div class="cliente360-card-content">
                                ${this.renderOportunidades(cliente)}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Row 2: Historial y Campañas -->
                    <div class="cliente360-grid-2col">
                        <!-- Historial de Interacciones -->
                        <div class="cliente360-card">
                            <div class="cliente360-card-header">
                                <div class="cliente360-card-icon icon-orange-360">💬</div>
                                Historial de Interacciones
                            </div>
                            <div class="cliente360-card-content">
                                ${this.renderHistorialInteracciones(cliente)}
                            </div>
                        </div>
                        
                        <!-- Historial de Campañas -->
                        <div class="cliente360-card">
                            <div class="cliente360-card-header">
                                <div class="cliente360-card-icon icon-purple-360">📢</div>
                                Historial de Campañas
                            </div>
                            <div class="cliente360-card-content">
                                ${this.renderHistorialCampanas(cliente)}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Row 3: Alertas y Rentabilidad -->
                    <div class="cliente360-grid-2col">
                        <!-- Alertas y Notificaciones -->
                        <div class="cliente360-card">
                            <div class="cliente360-card-header">
                                <div class="cliente360-card-icon icon-teal-360">🔔</div>
                                Alertas y Notificaciones
                            </div>
                            <div class="cliente360-card-content">
                                ${this.renderAlertas(productos, cliente)}
                            </div>
                        </div>
                        
                        <!-- Análisis de Rentabilidad -->
                        <div class="cliente360-card">
                            <div class="cliente360-card-header">
                                <div class="cliente360-card-icon icon-teal-360">💰</div>
                                Análisis de Rentabilidad
                            </div>
                            <div class="cliente360-card-content">
                                ${this.renderAnalisisRentabilidad(carteraTotal, utilidadAnual, saldoPromedio, scoreReciprocidad, diasMorosidad, cliente)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar event listeners a los breadcrumbs y botón
        setTimeout(() => {
            const btnVolverTop = document.getElementById('btn-volver-clientes-top');
            const breadcrumbClientes = document.getElementById('breadcrumb-volver-clientes');
            const breadcrumbCartera = document.getElementById('breadcrumb-volver-cartera');
            
            if (btnVolverTop) {
                btnVolverTop.addEventListener('click', () => {
                    this.volverAListaClientes();
                });
            }
            
            if (breadcrumbClientes) {
                breadcrumbClientes.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.volverAListaClientes();
                });
            }
            
            if (breadcrumbCartera) {
                breadcrumbCartera.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.volverAListaClientes();
                });
            }
        }, 0);
    }
    
    /**
     * Vuelve a la lista de clientes
     */
    volverAListaClientes() {
        // Recargar la sección completa
        const seccionContainer = document.getElementById('mi-cartera');
        seccionContainer.innerHTML = `
            <div class="section-header">
                <h1>Mi Cartera</h1>
                <p class="section-subtitle">Análisis de tu cartera de clientes</p>
            </div>
            
            <!-- Tarjetas de estadísticas -->
            <div id="mi-cartera-stats" class="stats-grid"></div>
            
            <!-- Tabla de clientes -->
            <div id="tabla-clientes"></div>
        `;
        
        // Re-inicializar todo
        this.init();
    }
    
    /**
     * Obtiene las iniciales del nombre
     */
    obtenerIniciales(nombre) {
        const palabras = nombre.split(' ').filter(p => p.length > 0);
        if (palabras.length >= 2) {
            // Tomar primera letra de las primeras 2-3 palabras significativas
            return palabras.slice(0, 3).map(p => p[0]).join('').toUpperCase();
        }
        return palabras[0] ? palabras[0].substring(0, 3).toUpperCase() : 'CLI';
    }
    
    /**
     * Obtiene el tipo de persona corto
     */
    getTipoCorto(tipo) {
        const tipos = {
            'Persona Moral': 'Empresarial',
            'Persona Física con Actividad Empresarial': 'Empresarial',
            'Persona Física sin Actividad Empresarial': 'Personal'
        };
        return tipos[tipo] || tipo;
    }
    
    /**
     * Renderiza la tabla de productos
     */
    renderTablaProductos(productos) {
        if (productos.length === 0) {
            return `
                <div class="cliente360-empty">
                    <div class="cliente360-empty-icon">📦</div>
                    <div class="cliente360-empty-text">No hay productos contratados</div>
                </div>
            `;
        }
        
        const rows = productos.slice(0, 10).map(p => {
            const estado = !p.fechaBaja ? 
                '<span class="badge badge-success">Activo</span>' : 
                '<span class="badge badge-danger">Baja</span>';
            
            const vencimiento = p.fechaBaja ? 
                Helpers.formatDate(new Date(p.fechaBaja)) : 
                (p.plazoTotal ? `${p.plazoRestante}/${p.plazoTotal} meses` : '-');
            
            return `
                <tr>
                    <td><strong>${p.nombreProducto}</strong></td>
                    <td>${p.montoLinea ? Helpers.formatCurrency(p.montoLinea) : '-'}</td>
                    <td>${vencimiento}</td>
                    <td>${estado}</td>
                </tr>
            `;
        }).join('');
        
        return `
            <table class="cliente360-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Saldo/Monto</th>
                        <th>Vencimiento</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
    
    /**
     * Renderiza oportunidades (simuladas)
     */
    renderOportunidades(cliente) {
        // Generar oportunidades simuladas basadas en productos
        const oportunidades = [
            {
                nombre: 'Renovación de Crédito',
                valor: 1500000,
                etapa: 'Negociación',
                probabilidad: 75
            },
            {
                nombre: 'Nueva Tarjeta de Crédito',
                valor: 50000,
                etapa: 'Propuesta',
                probabilidad: 50
            },
            {
                nombre: 'Seguro Adicional',
                valor: 80000,
                etapa: 'Prospección',
                probabilidad: 30
            }
        ];
        
        const rows = oportunidades.map(o => {
            const badgeClass = o.probabilidad >= 70 ? 'badge-success' : 
                              o.probabilidad >= 40 ? 'badge-warning' : 'badge-info';
            return `
                <tr>
                    <td><strong>${o.nombre}</strong></td>
                    <td>${Helpers.formatCurrency(o.valor)}</td>
                    <td>${o.etapa}</td>
                    <td><span class="badge ${badgeClass}">${o.probabilidad}%</span></td>
                </tr>
            `;
        }).join('');
        
        return `
            <table class="cliente360-table">
                <thead>
                    <tr>
                        <th>Oportunidad</th>
                        <th>Valor</th>
                        <th>Etapa</th>
                        <th>Prob.</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
    
    /**
     * Renderiza historial de interacciones (simulado)
     */
    renderHistorialInteracciones(cliente) {
        const interacciones = [
            { fecha: '2024-11-05', canal: 'Llamada', descripcion: 'Seguimiento renovación', ejecutivo: 'Juan Pérez' },
            { fecha: '2024-10-28', canal: 'Visita', descripcion: 'Propuesta comercial', ejecutivo: 'Juan Pérez' },
            { fecha: '2024-10-15', canal: 'Email', descripcion: 'Campaña renovación', ejecutivo: 'Marketing' },
            { fecha: '2024-09-20', canal: 'Llamada', descripcion: 'Consulta saldos', ejecutivo: 'Juan Pérez' },
            { fecha: '2024-09-10', canal: 'Visita', descripcion: 'Revisión trimestral', ejecutivo: 'Juan Pérez' }
        ];
        
        const rows = interacciones.map(i => {
            const badgeClasses = {
                'Llamada': 'badge-primary',
                'Visita': 'badge-success',
                'Email': 'badge-info'
            };
            return `
                <tr>
                    <td>${Helpers.formatDate(new Date(i.fecha))}</td>
                    <td><span class="badge ${badgeClasses[i.canal]}">${i.canal}</span></td>
                    <td>${i.descripcion}</td>
                    <td>${i.ejecutivo}</td>
                </tr>
            `;
        }).join('');
        
        return `
            <table class="cliente360-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Canal</th>
                        <th>Descripción</th>
                        <th>Ejecutivo</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
    
    /**
     * Renderiza historial de campañas (simulado)
     */
    renderHistorialCampanas(cliente) {
        const campanas = [
            { nombre: 'Renovación 2024', fecha: '2024-10-25', canal: 'Email', resultado: 'Interesado', badgeClass: 'badge-success' },
            { nombre: 'Incremento Línea', fecha: '2024-09-15', canal: 'Llamada', resultado: 'Seguimiento', badgeClass: 'badge-warning' },
            { nombre: 'Captación Nómina', fecha: '2024-08-20', canal: 'Visita', resultado: 'No interés', badgeClass: 'badge-danger' },
            { nombre: 'Prod. Inversión', fecha: '2024-07-10', canal: 'Email', resultado: 'Convertido', badgeClass: 'badge-success' }
        ];
        
        const rows = campanas.map(c => {
            const canalBadges = {
                'Email': 'badge-info',
                'Llamada': 'badge-primary',
                'Visita': 'badge-success'
            };
            return `
                <tr>
                    <td><strong>${c.nombre}</strong></td>
                    <td>${Helpers.formatDate(new Date(c.fecha))}</td>
                    <td><span class="badge ${canalBadges[c.canal]}">${c.canal}</span></td>
                    <td><span class="badge ${c.badgeClass}">${c.resultado}</span></td>
                </tr>
            `;
        }).join('');
        
        return `
            <table class="cliente360-table">
                <thead>
                    <tr>
                        <th>Campaña</th>
                        <th>Fecha</th>
                        <th>Canal</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
    
    /**
     * Renderiza alertas
     */
    renderAlertas(productos, cliente) {
        const alertas = [];
        
        // Verificar productos próximos a vencer
        productos.forEach(p => {
            if (p.fechaBaja) {
                const diasParaVencer = Math.ceil((new Date(p.fechaBaja) - new Date()) / (1000 * 60 * 60 * 24));
                if (diasParaVencer > 0 && diasParaVencer <= 90) {
                    alertas.push({
                        prioridad: diasParaVencer <= 30 ? 'Alta' : 'Media',
                        tipo: 'Vencimiento',
                        descripcion: `${p.nombreProducto} vence en ${diasParaVencer} días`,
                        badgeClass: diasParaVencer <= 30 ? 'badge-danger' : 'badge-warning'
                    });
                }
            }
        });
        
        // Alertas adicionales
        if (productos.length >= 3) {
            alertas.push({
                prioridad: 'Oportun.',
                tipo: 'Cross-selling',
                descripcion: 'Cliente potencial para productos adicionales',
                badgeClass: 'badge-success'
            });
        }
        
        if (alertas.length === 0) {
            alertas.push({
                prioridad: 'Baja',
                tipo: 'Info',
                descripcion: 'No hay alertas pendientes',
                badgeClass: 'badge-info'
            });
        }
        
        const rows = alertas.map(a => {
            const prioBadges = {
                'Alta': 'badge-danger',
                'Media': 'badge-warning',
                'Oportun.': 'badge-success',
                'Baja': 'badge-info'
            };
            return `
                <tr>
                    <td><span class="badge ${prioBadges[a.prioridad]}">${a.prioridad}</span></td>
                    <td><span class="badge ${a.badgeClass}">${a.tipo}</span></td>
                    <td>${a.descripcion}</td>
                </tr>
            `;
        }).join('');
        
        return `
            <table class="cliente360-table">
                <thead>
                    <tr>
                        <th>Prioridad</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
    
    /**
     * Renderiza análisis de rentabilidad
     */
    renderAnalisisRentabilidad(carteraTotal, utilidadAnual, saldoPromedio, scoreReciprocidad, diasMorosidad, cliente) {
        const clasificacion = carteraTotal > 1000000 ? 'Alto Valor' : 
                             carteraTotal > 500000 ? 'Valor Medio' : 'Valor Estándar';
        const clasificacionBadge = carteraTotal > 1000000 ? 'badge-success' : 
                                  carteraTotal > 500000 ? 'badge-info' : 'badge-secondary';
        
        return `
            <div class="cliente360-stat-box">
                <div class="cliente360-stat-label">Utilidad Generada (12 meses)</div>
                <div class="cliente360-stat-value">${Helpers.formatCurrency(utilidadAnual)}</div>
            </div>
            <div class="cliente360-stat-box">
                <div class="cliente360-stat-label">Saldo Promedio Mensual</div>
                <div class="cliente360-stat-value">${Helpers.formatCurrency(saldoPromedio)}</div>
            </div>
            <div class="cliente360-stat-box">
                <div class="cliente360-stat-label">Cumplimiento Reciprocidad</div>
                <div class="cliente360-stat-value">
                    <span class="badge ${scoreReciprocidad >= 70 ? 'badge-success' : 'badge-warning'}">${scoreReciprocidad}%</span>
                </div>
            </div>
            <div class="cliente360-stat-box">
                <div class="cliente360-stat-label">Clasificación del Cliente</div>
                <div class="cliente360-stat-value">
                    <span class="badge ${clasificacionBadge}">${clasificacion}</span>
                </div>
            </div>
            <div class="cliente360-stat-box">
                <div class="cliente360-stat-label">Índice de Morosidad</div>
                <div class="cliente360-stat-value">
                    <span class="badge ${diasMorosidad === 0 ? 'badge-success' : 'badge-danger'}">${diasMorosidad} días</span>
                </div>
            </div>
        `;
    }
}

// Hacer disponible globalmente
window.MiCarteraModule = MiCarteraModule;

