/**
 * ============================================
 * MÓDULO DE INICIO
 * ============================================
 * Gestiona la sección de inicio / dashboard
 */

class InicioModule {
    constructor() {
        this.sectionId = 'inicio';
        this.container = null;
    }

    init() {
        this.container = document.getElementById(this.sectionId);
        this.renderDashboard();
        Helpers.log('Módulo de Inicio inicializado', 'success');
    }

    onEnter() {
        Helpers.log('Entrando a sección Inicio', 'info');
        this.renderDashboard();
    }

    onLeave() {
        Helpers.log('Saliendo de sección Inicio', 'info');
    }

    renderDashboard() {
        if (!this.container) return;

        try {
            const oportunidadesRaw = window.OportunidadesUtils && typeof OportunidadesUtils.getTodos === 'function'
                ? OportunidadesUtils.getTodos()
                : [];
            const prospectosRaw = window.ProspectosUtils && typeof ProspectosUtils.getTodos === 'function'
                ? ProspectosUtils.getTodos()
                : [];
            const productosRaw = window.ProductosUtils && typeof ProductosUtils.getTodos === 'function'
                ? ProductosUtils.getTodos()
                : [];
            const accionesRaw = window.AccionesUtils && typeof AccionesUtils.getTodos === 'function'
                ? AccionesUtils.getTodos()
                : [];

            const oportunidades = Array.isArray(oportunidadesRaw) ? oportunidadesRaw : [];
            const prospectos = Array.isArray(prospectosRaw) ? prospectosRaw : [];
            const productos = Array.isArray(productosRaw) ? productosRaw : [];
            const accionesTotales = Array.isArray(accionesRaw) ? accionesRaw : [];
            const accionesPendientes = accionesTotales.filter(a => !a.fechaCompletado);

            const metas = this.getMetasComerciales(productos, oportunidades);
            const metasMap = this.getMetasMapa(metas);
            const kpis = this.getKpis(prospectos, oportunidades, metasMap);
            const resumenProspectos = this.getResumenProspectos(prospectos);
            const resumenOportunidades = this.getResumenOportunidades(oportunidades);
            const tareasPriorizadas = this.getTareasPriorizadas(accionesPendientes);
            const alertas = this.getAlertas(oportunidades);
            const indicadores = this.getIndicadoresActividad(accionesTotales);
            const proyeccion = this.getProyeccionMensual(metas);

            this.container.innerHTML = `
                <div class="inicio-dashboard">
                    ${this.renderFilters()}
                    ${this.renderKpis(kpis)}
                    <div class="inicio-dashboard__grid inicio-dashboard__grid--two">
                        ${this.renderProspectosResumen(resumenProspectos)}
                        ${this.renderOportunidadesResumen(resumenOportunidades)}
                    </div>
                    ${this.renderMetasComerciales(metas)}
                    ${this.renderTareasYAlertas(tareasPriorizadas, alertas)}
                    ${this.renderIndicadores(indicadores, proyeccion)}
                </div>
            `;
        } catch (error) {
            console.error('Error al renderizar el dashboard de inicio:', error);
            const mensaje = error && error.message ? error.message : 'Error desconocido';
            this.container.innerHTML = `
                <div class="inicio-dashboard__error">
                    <div class="inicio-dashboard__error-icon">🚧</div>
                    <h2>Sin datos disponibles</h2>
                    <p>Ocurrió un problema al cargar el tablero.</p>
                    <p style="margin-top:8px;"><strong>Detalle técnico:</strong> ${mensaje}</p>
                </div>
            `;
        }
    }

    renderFilters() {
        return `
            <div class="inicio-dashboard__filters">
                <span class="inicio-dashboard__filters-label">Filtrar por:</span>
                <select>
                    <option>Mi cartera completa</option>
                    <option>Clientes empresariales</option>
                    <option>Clientes PyME</option>
                    <option>Clientes gobierno</option>
                </select>
                <select>
                    <option>Enero 2025</option>
                    <option>Diciembre 2024</option>
                    <option>Noviembre 2024</option>
                </select>
                <select>
                    <option>Todos los productos</option>
                    <option>Solo créditos</option>
                    <option>Solo captación</option>
                </select>
            </div>
        `;
    }

    renderKpis(kpis) {
        const listaKpis = Array.isArray(kpis) ? kpis : [];
        return `
            <div class="inicio-dashboard__kpi-grid">
                ${listaKpis.length ? listaKpis.map(kpi => `
                    <div class="inicio-dashboard__kpi-card">
                        <div class="inicio-dashboard__kpi-label">${kpi.label}</div>
                        <div class="inicio-dashboard__kpi-value">${kpi.valor}</div>
                        <div class="inicio-dashboard__kpi-meta"><strong>Meta:</strong> ${kpi.meta} | <strong>Faltante:</strong> ${kpi.gap}</div>
                        <div class="inicio-dashboard__kpi-progress">
                            <div class="inicio-dashboard__kpi-progress-bar ${kpi.estado ? `inicio-dashboard__kpi-progress-bar--${kpi.estado}` : ''}" style="width:${kpi.progreso}%"></div>
                        </div>
                    </div>
                `).join('') : `
                    <div class="inicio-dashboard__kpi-card">
                        <div class="inicio-dashboard__kpi-label">Sin KPIs</div>
                        <div class="inicio-dashboard__kpi-value">-</div>
                        <div class="inicio-dashboard__kpi-meta">No se encontraron indicadores para mostrar</div>
                        <div class="inicio-dashboard__kpi-progress">
                            <div class="inicio-dashboard__kpi-progress-bar" style="width:0%"></div>
                        </div>
                    </div>
                `}
            </div>
        `;
    }

    renderProspectosResumen(resumen) {
        if (!resumen) {
            return `
                <div class="inicio-dashboard__card">
                    <div class="inicio-dashboard__card-header">
                        <div class="inicio-dashboard__card-icon">👥</div>
                        <span>Seguimiento de prospectos</span>
                    </div>
                    <p style="margin:16px 0 0; color:#7f8c9a;">No hay prospectos disponibles.</p>
                </div>
            `;
        }

        return `
            <div class="inicio-dashboard__card">
                <div class="inicio-dashboard__card-header">
                    <div class="inicio-dashboard__card-icon">👥</div>
                    <span>Seguimiento de prospectos</span>
                </div>
                <div class="inicio-dashboard__summary">
                    <div>
                        <span class="inicio-dashboard__summary-label">Prospectos activos</span>
                        <span class="inicio-dashboard__summary-value">${resumen.activos} / ${resumen.total}</span>
                    </div>
                    <div>
                        <span class="inicio-dashboard__summary-label">Conversión a oportunidad</span>
                        <span class="inicio-dashboard__summary-value">${resumen.conversion}%</span>
                    </div>
                </div>
                <table class="inicio-dashboard__table">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Prospectos</th>
                            <th>Participación</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Array.isArray(resumen.porEstado) ? resumen.porEstado.map(item => `
                            <tr>
                                <td>${item.estado}</td>
                                <td><strong>${item.cantidad}</strong></td>
                                <td>${item.participacion}%</td>
                            </tr>
                        `).join('') : ''}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderOportunidadesResumen(resumen) {
        if (!resumen) {
            return `
                <div class="inicio-dashboard__card">
                    <div class="inicio-dashboard__card-header">
                        <div class="inicio-dashboard__card-icon">💼</div>
                        <span>Pipeline de oportunidades</span>
                    </div>
                    <p style="margin:16px 0 0; color:#7f8c9a;">No hay oportunidades para mostrar.</p>
                </div>
            `;
        }

        return `
            <div class="inicio-dashboard__card">
                <div class="inicio-dashboard__card-header">
                    <div class="inicio-dashboard__card-icon">💼</div>
                    <span>Pipeline de oportunidades</span>
                </div>
                <div class="inicio-dashboard__summary">
                    <div>
                        <span class="inicio-dashboard__summary-label">Abiertas</span>
                        <span class="inicio-dashboard__summary-value">${resumen.abiertas}</span>
                    </div>
                    <div>
                        <span class="inicio-dashboard__summary-label">Monto ponderado</span>
                        <span class="inicio-dashboard__summary-value">${Helpers.formatCurrency(resumen.montoPonderado)}</span>
                    </div>
                </div>
                <table class="inicio-dashboard__table">
                    <thead>
                        <tr>
                            <th>Etapa</th>
                            <th>Oportunidades</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Array.isArray(resumen.porEstadoVenta) ? resumen.porEstadoVenta.map(item => `
                            <tr>
                                <td>${item.estado}</td>
                                <td><strong>${item.cantidad}</strong></td>
                                <td>${Helpers.formatCurrency(item.monto)}</td>
                            </tr>
                        `).join('') : ''}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderMetasComerciales(metas) {
        const metasLista = Array.isArray(metas) ? metas : [];
        const metasColocacion = metasLista.filter(meta => meta.categoria === 'colocacion');
        const metasCaptacion = metasLista.filter(meta => meta.categoria === 'captacion');

        const renderTabla = (titulo, datos) => {
            if (!datos.length) {
                return `
                    <div class="inicio-dashboard__meta-group">
                        <h3 class="inicio-dashboard__meta-group-title">${titulo}</h3>
                        <div class="inicio-dashboard__meta-empty">Sin metas configuradas.</div>
                    </div>
                `;
            }

            return `
                <div class="inicio-dashboard__meta-group">
                    <h3 class="inicio-dashboard__meta-group-title">${titulo}</h3>
                    <table class="inicio-dashboard__table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Objetivo</th>
                                <th>Avance</th>
                                <th>Progreso</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${datos.map(meta => `
                                <tr>
                                    <td>${meta.label}</td>
                                    <td>${meta.metaTexto}</td>
                                    <td>${meta.avanceTexto}</td>
                                    <td>
                                        <div class="inicio-dashboard__meta-progress">
                                            <div class="inicio-dashboard__meta-progress-bar inicio-dashboard__meta-progress-bar--${meta.estado}" style="width:${meta.progreso}%"></div>
                                        </div>
                                        <span class="inicio-dashboard__meta-progress-text">${meta.progreso.toFixed(0)}%</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        };

        return `
            <div class="inicio-dashboard__card inicio-dashboard__card--full">
                <div class="inicio-dashboard__card-header">
                    <div class="inicio-dashboard__card-icon">📌</div>
                    <span>Metas comerciales</span>
                </div>
                <div class="inicio-dashboard__meta-grid">
                    ${renderTabla('Colocación', metasColocacion)}
                    ${renderTabla('Captación', metasCaptacion)}
                </div>
            </div>
        `;
    }

    renderTareasYAlertas(tareas, alertas) {
        const listaTareas = Array.isArray(tareas) ? tareas : [];
        const listaAlertas = Array.isArray(alertas) ? alertas : [];
        return `
            <div class="inicio-dashboard__grid inicio-dashboard__grid--two">
                <div class="inicio-dashboard__card">
                    <div class="inicio-dashboard__card-header">
                        <div class="inicio-dashboard__card-icon">✓</div>
                        <span>Tareas priorizadas del día</span>
                    </div>
                    <table class="inicio-dashboard__table">
                        <thead>
                            <tr>
                                <th>Prioridad</th>
                                <th>Cliente</th>
                                <th>Acción</th>
                                <th>Fecha límite</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaTareas.length ? listaTareas.map(tarea => `
                                <tr>
                                    <td><span class="inicio-dashboard__badge ${tarea.badgeClass}">${tarea.prioridad}</span></td>
                                    <td>${tarea.cliente}</td>
                                    <td>${tarea.accion}</td>
                                    <td>${tarea.fecha}</td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="4" style="text-align:center; color:#7f8c9a; padding:16px;">No hay tareas programadas.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
                <div class="inicio-dashboard__card">
                    <div class="inicio-dashboard__card-header">
                        <div class="inicio-dashboard__card-icon">🔔</div>
                        <span>Alertas y vencimientos próximos</span>
                    </div>
                    <table class="inicio-dashboard__table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Cliente</th>
                                <th>Descripción</th>
                                <th>Días</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaAlertas.length ? listaAlertas.map(alerta => `
                                <tr>
                                    <td><span class="inicio-dashboard__badge ${alerta.badgeClass}">${alerta.tipo}</span></td>
                                    <td>${alerta.cliente}</td>
                                    <td>${alerta.descripcion}</td>
                                    <td><strong>${alerta.dias}</strong></td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="4" style="text-align:center; color:#7f8c9a; padding:16px;">Sin alertas pendientes.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderIndicadores(indicadores, proyeccion) {
        const listaIndicadores = Array.isArray(indicadores) ? indicadores : [];
        const listaProyeccion = Array.isArray(proyeccion) ? proyeccion : [];
        return `
            <div class="inicio-dashboard__grid inicio-dashboard__grid--two">
                <div class="inicio-dashboard__card">
                    <div class="inicio-dashboard__card-header">
                        <div class="inicio-dashboard__card-icon">📊</div>
                        <span>Indicadores de actividad diaria</span>
                    </div>
                    <table class="inicio-dashboard__table">
                        <thead>
                            <tr>
                                <th>Indicador</th>
                                <th>Hoy</th>
                                <th>Meta diaria</th>
                                <th>Prom. equipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaIndicadores.length ? listaIndicadores.map(item => `
                                <tr>
                                    <td>${item.indicador}</td>
                                    <td><strong>${item.hoy}</strong></td>
                                    <td>${item.meta}</td>
                                    <td>${item.promedio}</td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="4" style="text-align:center; color:#7f8c9a; padding:16px;">Sin actividad registrada.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
                <div class="inicio-dashboard__card">
                    <div class="inicio-dashboard__card-header">
                        <div class="inicio-dashboard__card-icon">🎯</div>
                        <span>Proyección de cierre de mes</span>
                    </div>
                    <table class="inicio-dashboard__table">
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Actual</th>
                                <th>Proyectado</th>
                                <th>Meta</th>
                                <th>Gap</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaProyeccion.length ? listaProyeccion.map(item => `
                                <tr>
                                    <td>${item.concepto}</td>
                                    <td><strong>${item.actual}</strong></td>
                                    <td>${item.proyectado}</td>
                                    <td>${item.meta}</td>
                                    <td><span class="inicio-dashboard__badge ${item.badgeClass}">${item.gap}</span></td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="5" style="text-align:center; color:#7f8c9a; padding:16px;">No se pudo calcular la proyección.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                    <div class="inicio-dashboard__alert">
                        <div class="inicio-dashboard__alert-icon">💡</div>
                        <div><strong>Sugerencia:</strong> Enfócate en cerrar 2 oportunidades de captación en pipeline para alcanzar la meta mensual.</div>
                    </div>
                </div>
            </div>
        `;
    }

    getKpis(prospectos, oportunidades, metas) {
        const prospectosActivos = prospectos.filter(p => p.estado !== 'Descartado').length;
        const metaProspectos = 80;
        const avanceProspectos = metaProspectos > 0 ? Math.min((prospectosActivos / metaProspectos) * 100, 100) : 0;

        const oportunidadesAbiertas = oportunidades.filter(o => o.estado === 'Abierta').length;
        const metaOportunidades = 25;
        const avanceOportunidades = metaOportunidades > 0 ? Math.min((oportunidadesAbiertas / metaOportunidades) * 100, 100) : 0;

        const montoColocadoConfig = metas.montoColocado || { actual: 0, meta: 0, estado: 'danger' };
        const captacionConfig = metas.captacion || { actual: 0, meta: 0, estado: 'danger' };

        const montoColocado = montoColocadoConfig.actual || 0;
        const metaMontoColocado = montoColocadoConfig.meta || 0;
        const avanceMonto = metaMontoColocado > 0 ? Math.min((montoColocado / metaMontoColocado) * 100, 100) : 0;

        const captacionCheques = captacionConfig.actual || 0;
        const metaCaptacion = captacionConfig.meta || 0;
        const avanceCaptacion = metaCaptacion > 0 ? Math.min((captacionCheques / metaCaptacion) * 100, 100) : 0;

        return [
            {
                label: 'Prospectos en seguimiento',
                valor: this.formatNumber(prospectosActivos),
                meta: this.formatNumber(metaProspectos),
                gap: this.formatNumber(Math.max(metaProspectos - prospectosActivos, 0)),
                progreso: avanceProspectos,
                estado: this.evaluarEstadoProgreso(avanceProspectos)
            },
            {
                label: 'Oportunidades abiertas',
                valor: this.formatNumber(oportunidadesAbiertas),
                meta: this.formatNumber(metaOportunidades),
                gap: this.formatNumber(Math.max(metaOportunidades - oportunidadesAbiertas, 0)),
                progreso: avanceOportunidades,
                estado: this.evaluarEstadoProgreso(avanceOportunidades)
            },
            {
                label: 'Monto colocado (MXN)',
                valor: Helpers.formatCurrency(montoColocado),
                meta: Helpers.formatCurrency(metaMontoColocado),
                gap: Helpers.formatCurrency(Math.max(metaMontoColocado - montoColocado, 0)),
                progreso: avanceMonto,
                estado: this.evaluarEstadoProgreso(avanceMonto)
            },
            {
                label: 'Captación cuentas de cheques (MXN)',
                valor: Helpers.formatCurrency(captacionCheques),
                meta: Helpers.formatCurrency(metaCaptacion),
                gap: Helpers.formatCurrency(Math.max(metaCaptacion - captacionCheques, 0)),
                progreso: avanceCaptacion,
                estado: this.evaluarEstadoProgreso(avanceCaptacion)
            }
        ];
    }

    getTareasPriorizadas(acciones) {
        const pendientesOrdenados = [...acciones].sort((a, b) => new Date(a.fechaTarea) - new Date(b.fechaTarea));
        return pendientesOrdenados.slice(0, 5).map(accion => {
            const fecha = accion.fechaTarea ? Helpers.formatDate(new Date(accion.fechaTarea)) : 'Sin fecha';
            const prospecto = window.ProspectosUtils ? ProspectosUtils.getPorId(accion.idProspecto) : null;
            const cliente = window.ClientesUtils ? ClientesUtils.getTodos().find(c => c.ide === accion.idCliente) : null;
            const nombreReferencia = prospecto ? prospecto.nombre : cliente ? cliente.nombre : (accion.idCliente || accion.idProspecto || 'N/A');
            const prioridad = this.calcularPrioridad(accion.fechaTarea);
            const badgeClass = this.obtenerBadgePrioridad(prioridad);
            return {
                prioridad,
                badgeClass,
                cliente: nombreReferencia,
                accion: accion.tarea,
                fecha
            };
        });
    }

    getResumenProspectos(prospectos) {
        const total = prospectos.length;
        const activos = prospectos.filter(p => p.estado !== 'Descartado').length;
        const convertidos = prospectos.filter(p => p.convertido).length;
        const conversion = total > 0 ? ((convertidos / total) * 100).toFixed(1) : '0.0';

        const ordenEstados = [
            'No contactado',
            'No localizado aún',
            'En consideración',
            'Interesado',
            'Convertido',
            'Descartado'
        ];

        const conteoEstados = prospectos.reduce((acc, prospecto) => {
            const estado = prospecto.estado || 'Sin estado';
            acc[estado] = (acc[estado] || 0) + 1;
            return acc;
        }, {});

        const porEstado = ordenEstados
            .filter(estado => conteoEstados[estado])
            .map(estado => {
                const cantidad = conteoEstados[estado];
                const participacion = total > 0 ? ((cantidad / total) * 100).toFixed(1) : '0.0';
                return {
                    estado,
                    cantidad,
                    participacion
                };
            });

        Object.keys(conteoEstados)
            .filter(estado => !ordenEstados.includes(estado))
            .forEach(estado => {
                const cantidad = conteoEstados[estado];
                const participacion = total > 0 ? ((cantidad / total) * 100).toFixed(1) : '0.0';
                porEstado.push({
                    estado,
                    cantidad,
                    participacion
                });
            });

        return {
            total,
            activos,
            convertidos,
            conversion,
            porEstado
        };
    }

    getResumenOportunidades(oportunidades) {
        const abiertas = oportunidades.filter(o => o.estado === 'Abierta');
        const montoPonderado = abiertas.reduce((sum, oportunidad) => {
            const probabilidad = oportunidad.probabilidad || 0;
            return sum + ((oportunidad.montoOportunidad || 0) * (probabilidad / 100));
        }, 0);

        const ordenEstadoVenta = [
            'No contactado',
            'Interesado',
            'Negociación',
            'Fabrica',
            'Formalización',
            'Entregado al cliente',
            'Timbrado'
        ];

        const resumenEstados = ordenEstadoVenta
            .map(estado => {
                const oportunidadesEstado = abiertas.filter(o => o.estadoVenta === estado);
                return {
                    estado,
                    cantidad: oportunidadesEstado.length,
                    monto: oportunidadesEstado.reduce((sum, o) => sum + (o.montoOportunidad || 0), 0)
                };
            })
            .filter(item => item.cantidad > 0);

        return {
            abiertas: abiertas.length,
            montoPonderado,
            porEstadoVenta: resumenEstados
        };
    }

    getMetasComerciales(productos, oportunidades) {
        const tpvActual = productos.filter(p => p.familiaProducto && p.familiaProducto.toLowerCase().includes('tpv')).length;
        const nominaActual = productos.filter(p => {
            const familia = (p.familiaProducto || '').toLowerCase();
            return familia.includes('nómina') || familia.includes('nomina');
        }).length;
        const tarjetasActual = productos.filter(p => (p.familiaProducto || '').toLowerCase().includes('tarjeta')).length;
        const captacionActual = productos
            .filter(p => (p.familiaProducto || '').toLowerCase().includes('cuenta de cheques'))
            .reduce((sum, p) => sum + (p.montoLinea || 0), 0);
        const montoColocadoActual = oportunidades
            .filter(o => o.estado === 'Cerrada-Ganada')
            .reduce((sum, o) => sum + (o.montoOportunidad || 0), 0);

        const configuracion = [
            { clave: 'tdc', label: 'Tarjeta de crédito empresarial', tipo: 'unidades', meta: 26, actual: tarjetasActual, categoria: 'colocacion' },
            { clave: 'montoColocado', label: 'Crédito empresarial', tipo: 'moneda', meta: 8_000_000, actual: montoColocadoActual, categoria: 'colocacion' },
            { clave: 'tpv', label: 'Terminal punto de venta', tipo: 'unidades', meta: 18, actual: tpvActual, categoria: 'captacion' },
            { clave: 'nomina', label: 'Servicios de nómina', tipo: 'unidades', meta: 14, actual: nominaActual, categoria: 'captacion' },
            { clave: 'captacion', label: 'Cuenta de cheques empresarial', tipo: 'moneda', meta: 6_000_000, actual: captacionActual, categoria: 'captacion' }
        ];

        return configuracion.map(item => {
            const progreso = item.meta > 0 ? Math.min((item.actual / item.meta) * 100, 100) : 0;
            const estado = this.evaluarEstadoProgreso(progreso);
            const gap = item.meta - item.actual;
            const proyeccion = gap > 0 ? item.actual + gap * 0.6 : item.actual;

            const metaTexto = item.tipo === 'moneda'
                ? Helpers.formatCurrency(item.meta)
                : this.formatNumber(item.meta);
            const avanceTexto = item.tipo === 'moneda'
                ? Helpers.formatCurrency(item.actual)
                : this.formatNumber(item.actual);
            const proyeccionTexto = item.tipo === 'moneda'
                ? Helpers.formatCurrency(proyeccion)
                : this.formatNumber(Math.round(proyeccion));

            return {
                ...item,
                metaTexto,
                avanceTexto,
                progreso,
                estado,
                gap,
                proyeccion,
                proyeccionTexto
            };
        });
    }

    getMetasMapa(metas) {
        return metas.reduce((acc, meta) => {
            acc[meta.clave] = meta;
            return acc;
        }, {});
    }

    getAlertas(oportunidades) {
        const clientes = window.ClientesUtils ? ClientesUtils.getTodos() : [];
        const vigentes = oportunidades.filter(o => o.estado !== 'Cerrada-Ganada' && o.estado !== 'Descartada');

        const alertas = vigentes
            .sort((a, b) => (b.probabilidad || 0) - (a.probabilidad || 0))
            .slice(0, 5)
            .map(oportunidad => {
                const cliente = clientes.find(c => c.ide === oportunidad.ide);
                const clienteNombre = cliente ? cliente.nombre : oportunidad.ide;
                const diferenciaDias = oportunidad.fechaCierre ? this.calcularDiferenciaDias(oportunidad.fechaCierre) : null;
                let dias;
                if (diferenciaDias === null) {
                    dias = 'Pendiente';
                } else if (diferenciaDias > 0) {
                    dias = diferenciaDias;
                } else if (diferenciaDias === 0) {
                    dias = 'Hoy';
                } else {
                    dias = `-${Math.abs(diferenciaDias)}`;
                }
                return {
                    tipo: oportunidad.estadoVenta,
                    cliente: clienteNombre,
                    descripcion: `${oportunidad.nombreProducto} · ${Helpers.formatCurrency(oportunidad.montoOportunidad)}`,
                    dias,
                    badgeClass: this.obtenerBadgePorEstadoVenta(oportunidad.estadoVenta, oportunidad.probabilidad || 0)
                };
            });

        return alertas.length ? alertas : [
            {
                tipo: 'Seguimiento',
                cliente: 'Sin actividades programadas',
                descripcion: 'Agrega nuevas acciones para mantener el pipeline activo.',
                dias: '-',
                badgeClass: 'inicio-dashboard__badge--info'
            }
        ];
    }

    getIndicadoresActividad(acciones) {
        const llamadas = acciones.filter(a => a.tarea === 'Llamar').length;
        const solicitudesDocumentos = acciones.filter(a => (a.tarea || '').toLowerCase().includes('solicitar')).length;
        const visitas = acciones.filter(a => a.tarea === 'Agendar visita').length;
        const actualizacionesFolios = acciones.filter(a => a.tarea === 'Completar información de folios').length;
        const tareasCompletadas = acciones.filter(a => a.fechaCompletado).length;

        return [
            { indicador: 'Llamadas programadas', hoy: llamadas, meta: 6, promedio: 5 },
            { indicador: 'Solicitudes de documentación', hoy: solicitudesDocumentos, meta: 5, promedio: 4 },
            { indicador: 'Visitas agendadas', hoy: visitas, meta: 4, promedio: 3 },
            { indicador: 'Expedientes actualizados', hoy: actualizacionesFolios, meta: 3, promedio: 2 },
            { indicador: 'Tareas completadas', hoy: tareasCompletadas, meta: 5, promedio: 4 }
        ];
    }

    getProyeccionMensual(metas) {
        return metas.map(meta => {
            const gap = meta.meta - meta.actual;
            const gapTexto = meta.tipo === 'moneda'
                ? Helpers.formatCurrency(Math.abs(gap))
                : this.formatNumber(Math.abs(gap));
            const gapSigno = gap <= 0 ? `+${gapTexto}` : `-${gapTexto}`;
            const badgeClass = gap <= 0
                ? 'inicio-dashboard__badge--success'
                : meta.estado === 'warning'
                    ? 'inicio-dashboard__badge--warning'
                    : 'inicio-dashboard__badge--danger';

            return {
                concepto: meta.label,
                actual: meta.avanceTexto,
                proyectado: meta.proyeccionTexto,
                meta: meta.metaTexto,
                gap: gapSigno,
                badgeClass
            };
        });
    }

    calcularPrioridad(fechaISO) {
        if (!fechaISO) return 'Baja';
        const hoy = new Date();
        const fecha = new Date(fechaISO);
        const diferencia = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
        if (diferencia <= 1) return 'Alta';
        if (diferencia <= 4) return 'Media';
        return 'Baja';
    }

    obtenerBadgePrioridad(prioridad) {
        if (prioridad === 'Alta') return 'inicio-dashboard__badge--danger';
        if (prioridad === 'Media') return 'inicio-dashboard__badge--warning';
        return 'inicio-dashboard__badge--info';
    }

    evaluarEstadoProgreso(progreso) {
        if (progreso >= 90) return 'success';
        if (progreso >= 60) return 'warning';
        return 'danger';
    }

    calcularDiferenciaDias(fechaISO) {
        const hoy = new Date();
        const fecha = new Date(fechaISO);
        return Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
    }

    obtenerBadgePorEstadoVenta(estadoVenta, probabilidad) {
        const mapa = {
            'No contactado': 'inicio-dashboard__badge--info',
            'Interesado': 'inicio-dashboard__badge--info',
            'Negociación': 'inicio-dashboard__badge--warning',
            'Fabrica': 'inicio-dashboard__badge--warning',
            'Formalización': 'inicio-dashboard__badge--warning',
            'Entregado al cliente': 'inicio-dashboard__badge--success',
            'Timbrado': 'inicio-dashboard__badge--success'
        };

        if (mapa[estadoVenta]) {
            return mapa[estadoVenta];
        }

        if (probabilidad >= 70) return 'inicio-dashboard__badge--success';
        if (probabilidad >= 40) return 'inicio-dashboard__badge--warning';
        return 'inicio-dashboard__badge--info';
    }

    formatNumber(value) {
        return new Intl.NumberFormat('es-MX').format(value);
    }
}

window.InicioModule = InicioModule;

