/**
 * ============================================
 * MÓDULO DE MIS ACTIVIDADES
 * ============================================
 * Rediseño de tablero para tareas diarias, semanales y mensuales
 */

class MisAccionesModule {
    constructor() {
        this.sectionId = 'mis-acciones';
        this.container = null;
        this.tareas = {
            dia: { titulo: 'Tareas de hoy', subtitulo: '', tareas: [] },
            semana: { titulo: 'Semana en curso', subtitulo: '', tareas: [] },
            mes: { titulo: 'Mes en curso', subtitulo: '', tareas: [] }
        };
        this.fechaHoyLaborable = null;
        this.nombresReferencia = [];
        this.nombreCursor = 0;
        this.actividadCursor = 0;
        this.actividadesBase = [
            {
                tipo: 'reunion',
                generar: (nombre) => ({
                    titulo: `Reunirme con ${nombre} para presentar la oferta`,
                    descripcion: 'Agenda el encuentro, lleva simulaciones actualizadas y confirma asistentes.'
                })
            },
            {
                tipo: 'seguimiento',
                generar: (nombre) => ({
                    titulo: `Reunión de seguimiento postventa con ${nombre}`,
                    descripcion: 'Valida la experiencia posterior a la dispersión y detecta nuevas oportunidades.'
                })
            },
            {
                tipo: 'llamada',
                generar: (nombre) => ({
                    titulo: `Llamada postventa con ${nombre}`,
                    descripcion: 'Confirma recepción de documentos, resuelve dudas y agenda próximo toque.'
                })
            },
            {
                tipo: 'documentacion',
                generar: (nombre) => ({
                    titulo: `Solicitar identificaciones oficiales a ${nombre}`,
                    descripcion: 'Reúne INE/Pasaporte vigente y súbelos al expediente digital.'
                })
            },
            {
                tipo: 'documentacion',
                generar: (nombre) => ({
                    titulo: `Solicitar comprobantes de ingresos de ${nombre}`,
                    descripcion: 'Asegúrate de recibir estados de cuenta o recibos menores a 90 días.'
                })
            },
            {
                tipo: 'firma',
                generar: (nombre) => ({
                    titulo: `Coordinar firma de contrato con ${nombre}`,
                    descripcion: 'Prepara condiciones finales, revisa anexos y confirma lugar de firma.'
                })
            },
            {
                tipo: 'estrategia',
                generar: () => ({
                    titulo: 'Junta con mi gerente para revisar metas',
                    descripcion: 'Presenta avance semanal, identifica brechas y acuerda acciones de recuperación.'
                })
            },
            {
                tipo: 'oferta',
                generar: (nombre) => ({
                    titulo: `Llamada para compartir oferta actualizada a ${nombre}`,
                    descripcion: 'Resalta beneficios clave, compara contra la competencia y cierra compromisos.'
                })
            },
            {
                tipo: 'expediente',
                generar: (nombre) => ({
                    titulo: `Actualizar expediente KYC de ${nombre}`,
                    descripcion: 'Clasifica documentación, registra comentarios AML y marca checklist como completo.'
                })
            },
            {
                tipo: 'seguimiento',
                generar: (nombre) => ({
                    titulo: `Confirmar dispersión y activación con ${nombre}`,
                    descripcion: 'Corrobora depósitos, verifica uso del producto y programa visita de cortesía.'
                })
            },
            {
                tipo: 'crm',
                generar: (nombre) => ({
                    titulo: `Registrar avance de ${nombre} en el CRM`,
                    descripcion: 'Actualiza etapa, monto comprometido y deja notas accionables.'
                })
            },
            {
                tipo: 'oferta',
                generar: (nombre) => ({
                    titulo: `Preparar kit comercial para ${nombre}`,
                    descripcion: 'Incluye fichas técnicas, casos de uso y propuesta de valor personalizada.'
                })
            }
        ];
    }

    init() {
        this.container = document.getElementById(this.sectionId);
        if (!this.container) {
            Helpers.log('Contenedor de Mis actividades no encontrado', 'error');
            return;
        }

        this.cargarDatos();
        this.render();

        Helpers.log('Módulo de Mis actividades rediseñado e inicializado', 'success');
    }

    onEnter() {
        Helpers.log('Entrando a sección Mis actividades', 'info');
        this.cargarDatos();
        this.render();
    }

    onLeave() {
        Helpers.log('Saliendo de sección Mis actividades', 'info');
    }

    cargarDatos() {
        this.generarTareas();
    }

    generarTareas() {
        this.fechaHoyLaborable = this.obtenerDiaLaborable(new Date());
        this.nombresReferencia = this.obtenerNombresReferencia();
        this.nombreCursor = 0;
        this.actividadCursor = 0;

        const hoy = this.fechaHoyLaborable;
        const etiquetaHoy = this.formatearEtiquetaDia(hoy);
        this.tareas.dia = {
            titulo: 'Tareas de hoy',
            subtitulo: `Prioriza tus 6 pendientes del ${etiquetaHoy}`,
            tareas: this.crearTareasParaFecha(hoy, 'dia')
        };

        const diasSemana = this.obtenerDiasLaborablesSemana(hoy);
        const tareasSemana = diasSemana.flatMap(fecha => this.crearTareasParaFecha(fecha, 'semana'));
        this.tareas.semana = {
            titulo: 'Semana en curso',
            subtitulo: '6 tareas por día hábil para cumplir la meta semanal.',
            tareas: tareasSemana
        };

        const diasMes = this.obtenerDiasLaborablesMes(hoy);
        const maxDiasMes = Math.min(20, diasMes.length);
        const diasSeleccionados = diasMes.slice(-maxDiasMes);
        const tareasMes = diasSeleccionados.flatMap(fecha => this.crearTareasParaFecha(fecha, 'mes'));
        this.tareas.mes = {
            titulo: 'Mes en curso',
            subtitulo: 'Suma 6 tareas por cada día hábil para alcanzar los objetivos del mes.',
            tareas: tareasMes
        };
    }

    render() {
        const resumenDia = this.obtenerResumenCategoria('dia');
        const resumenSemana = this.obtenerResumenCategoria('semana');
        const resumenMes = this.obtenerResumenCategoria('mes');

        this.container.innerHTML = `
            <div class="tareas-wrapper">
                <div class="tareas-header">
                    <div>
                        <h2>Mis tareas comerciales</h2>
                        <p class="tareas-subtitle">Organiza tu día, visualiza la semana y mantén el rumbo del mes.</p>
                    </div>
                    <div class="tareas-header-metrics">
                        ${this.renderMetric('dia', 'Hoy', resumenDia)}
                        ${this.renderMetric('semana', 'Esta semana', resumenSemana)}
                        ${this.renderMetric('mes', 'Este mes', resumenMes)}
                    </div>
                </div>

                <div class="tareas-tabs">
                    <div class="tareas-tab-buttons">
                        <button class="tareas-tab-btn active" data-tab="dia">
                            <span style="font-size:18px;margin-right:6px;">📅</span>
                            Hoy
                        </button>
                        <button class="tareas-tab-btn" data-tab="semana">
                            <span style="font-size:18px;margin-right:6px;">📊</span>
                            Semana
                        </button>
                        <button class="tareas-tab-btn" data-tab="mes">
                            <span style="font-size:18px;margin-right:6px;">📈</span>
                            Mes
                        </button>
                    </div>
                    <div class="tareas-tab-content active" id="tareas-dia" style="display:block;">
                        ${this.renderGrupoHTML('dia')}
                    </div>
                    <div class="tareas-tab-content" id="tareas-semana" style="display:none;">
                        ${this.renderGrupoHTML('semana')}
                    </div>
                    <div class="tareas-tab-content" id="tareas-mes" style="display:none;">
                        ${this.renderGrupoHTML('mes')}
                    </div>
                </div>
            </div>
        `;

        this.bindTabEvents();
        this.bindCheckboxEvents();
    }

    renderMetric(categoria, etiqueta, resumen) {
        const porcentaje = resumen.total > 0 ? Math.round((resumen.completadas / resumen.total) * 100) : 0;
        return `
            <div class="tareas-metric" data-metric="${categoria}">
                <span class="tareas-metric-label">${etiqueta}</span>
                <span class="tareas-metric-value">${resumen.total} tareas</span>
                <span class="tareas-metric-progress">${resumen.completadas} completadas (${porcentaje}%)</span>
            </div>
        `;
    }

    renderGrupoHTML(categoria) {
        const grupo = this.tareas[categoria];
        if (!grupo || !grupo.tareas.length) {
            return `
                <div class="tareas-empty">
                    <div class="tareas-empty-icon">🎯</div>
                    <p style="color:#64708A;">Aún no tienes tareas registradas en esta vista.</p>
                </div>
            `;
        }

        const resumen = this.obtenerResumenCategoria(categoria);
        const porcentaje = resumen.porcentaje;

        const agrupaciones = grupo.tareas.reduce((mapa, tarea) => {
            const clave = tarea.fechaEtiqueta || grupo.titulo;
            if (!mapa.has(clave)) {
                mapa.set(clave, []);
            }
            mapa.get(clave).push(tarea);
            return mapa;
        }, new Map());

        const listasHTML = Array.from(agrupaciones.entries()).map(([etiqueta, tareas]) => `
            <div class="tareas-lista-dia">
                <div class="tareas-dia-header">
                    <h5>${this.escapeHtml(etiqueta)}</h5>
                    <span class="tareas-grupo-badge">${tareas.length} tareas</span>
                </div>
                <ul class="tareas-lista">
                    ${tareas.map(tarea => this.renderTareaItem(categoria, tarea)).join('')}
                </ul>
            </div>
        `).join('');

        return `
            <div class="tareas-panel">
                <header class="tareas-grupo-header">
                    <h4>${this.escapeHtml(grupo.titulo)}</h4>
                    <span class="tareas-grupo-badge">${resumen.total} tareas</span>
                </header>
                <div class="tareas-progress-container">
                    <div class="tareas-progress-track">
                        <div class="tareas-progress-bar" data-progress="${categoria}" style="width:${porcentaje}%;"></div>
                    </div>
                    <span class="tareas-progress-text">${resumen.completadas}/${resumen.total} completadas</span>
                </div>
                ${listasHTML}
            </div>
        `;
    }

    renderTareaItem(categoria, tarea) {
        const checkedAttr = tarea.completada ? 'checked' : '';
        const tipoInfo = this.getInfoTipo(tarea.tipo);
        const completadaClass = tarea.completada ? 'completada' : '';
        const horaDisplay = tarea.hora ? `⏰ ${tarea.hora}` : '';

        return `
            <li class="tarea-item ${completadaClass}" data-task="${tarea.id}">
                <input type="checkbox" class="tarea-checkbox" data-categoria="${categoria}" data-id="${tarea.id}" ${checkedAttr}>
                <div class="tarea-item-body">
                    <div class="tarea-item-header">
                        <span class="tarea-item-title">${this.escapeHtml(tarea.titulo)}</span>
                        <span class="tarea-tipo-chip" style="background:${tipoInfo.fondo};color:${tipoInfo.color};">
                            <span>${tipoInfo.icono}</span> ${tipoInfo.etiqueta}
                        </span>
                    </div>
                    ${tarea.descripcion ? `<span class="tarea-item-desc">${this.escapeHtml(tarea.descripcion)}</span>` : ''}
                    ${horaDisplay ? `<span class="tarea-item-hora" style="font-size:12px;color:#FF8800;font-weight:600;margin-top:4px;display:block;">${horaDisplay}</span>` : ''}
                </div>
            </li>
        `;
    }

    bindTabEvents() {
        const botones = this.container.querySelectorAll('.tareas-tab-btn');
        const contenidos = this.container.querySelectorAll('.tareas-tab-content');

        botones.forEach(boton => {
            boton.addEventListener('click', () => {
                const tab = boton.dataset.tab;
                botones.forEach(btn => btn.classList.toggle('active', btn === boton));
                contenidos.forEach(panel => {
                    const esActivo = panel.id === `tareas-${tab}`;
                    panel.classList.toggle('active', esActivo);
                    panel.style.display = esActivo ? 'block' : 'none';
                });
            });
        });
    }

    bindCheckboxEvents() {
        const checkboxes = this.container.querySelectorAll('.tarea-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => this.toggleTarea(event));
        });
    }

    toggleTarea(event) {
        const checkbox = event.target;
        const categoria = checkbox.dataset.categoria;
        const id = checkbox.dataset.id;
        const grupo = this.tareas[categoria];
        if (!grupo) return;

        const tarea = grupo.tareas.find(t => t.id === id);
        if (!tarea) return;

        tarea.completada = checkbox.checked;
        this.updateGrupoUI(categoria);
    }

    updateGrupoUI(categoria) {
        const grupo = this.tareas[categoria];
        if (!grupo) return;

        const resumen = this.obtenerResumenCategoria(categoria);
        const contenedor = this.container.querySelector(`#tareas-${categoria}`);
        if (!contenedor) return;

        const barra = contenedor.querySelector(`.tareas-progress-bar[data-progress="${categoria}"]`);
        if (barra) {
            barra.style.width = `${resumen.porcentaje}%`;
        }

        const texto = contenedor.querySelector('.tareas-progress-text');
        if (texto) {
            texto.textContent = `${resumen.completadas}/${resumen.total} completadas`;
        }

        grupo.tareas.forEach(tarea => {
            const elemento = contenedor.querySelector(`[data-task="${tarea.id}"]`);
            if (!elemento) return;
            
            if (tarea.completada) {
                elemento.classList.add('completada');
            } else {
                elemento.classList.remove('completada');
            }
        });

        this.updateMetricDisplay(categoria);
    }

    updateMetricDisplay(categoria) {
        const resumen = this.obtenerResumenCategoria(categoria);
        const tarjeta = this.container.querySelector(`.tareas-metric[data-metric="${categoria}"]`);
        if (!tarjeta) return;

        const valor = tarjeta.querySelector('.tareas-metric-value');
        const progreso = tarjeta.querySelector('.tareas-metric-progress');
        if (valor) valor.textContent = `${resumen.total} tareas`;
        if (progreso) progreso.textContent = `${resumen.completadas} completadas (${resumen.porcentaje}%)`;
    }

    obtenerResumenCategoria(categoria) {
        const grupo = this.tareas[categoria];
        if (!grupo) {
            return { total: 0, completadas: 0, porcentaje: 0 };
        }
        const total = grupo.tareas.length;
        const completadas = grupo.tareas.filter(t => t.completada).length;
        const porcentaje = total ? Math.round((completadas / total) * 100) : 0;
        return { total, completadas, porcentaje };
    }

    obtenerNombresReferencia() {
        const nombres = [];
        if (window.ProspectosUtils && typeof ProspectosUtils.getTodos === 'function') {
            nombres.push(
                ...ProspectosUtils.getTodos()
                    .map(prospecto => prospecto.nombre)
                    .filter(Boolean)
            );
        }
        if (window.OportunidadesUtils && typeof OportunidadesUtils.getTodos === 'function') {
            nombres.push(
                ...OportunidadesUtils.getTodos()
                    .map(oportunidad => oportunidad.client || oportunidad.ide || null)
                    .filter(Boolean)
            );
        }
        const unicos = Array.from(new Set(nombres));
        return unicos.length ? unicos : ['cliente clave'];
    }

    obtenerNombreReferencia() {
        const nombre = this.nombresReferencia[this.nombreCursor % this.nombresReferencia.length];
        this.nombreCursor += 1;
        return nombre;
    }

    crearTareasParaFecha(fecha, scope) {
        const tareas = [];
        const fechaISO = fecha.toISOString().split('T')[0];
        const etiqueta = this.formatearEtiquetaDia(fecha);
        const horasBase = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

        for (let i = 0; i < 6; i += 1) {
            const nombre = this.obtenerNombreReferencia();
            const plantilla = this.actividadesBase[(this.actividadCursor + i) % this.actividadesBase.length];
            const { titulo, descripcion } = plantilla.generar(nombre);
            const hora = horasBase[i];
            const fechaHoraISO = `${fechaISO}T${hora}:00`;

            tareas.push({
                id: `${scope}-${fechaISO}-${i}`,
                titulo,
                descripcion,
                tipo: plantilla.tipo,
                fecha: fechaHoraISO,
                fechaEtiqueta: etiqueta,
                hora,
                completada: false
            });
        }

        this.actividadCursor = (this.actividadCursor + 6) % this.actividadesBase.length;
        return tareas;
    }

    obtenerDiaLaborable(fecha) {
        const date = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        while (!this.esDiaLaborable(date)) {
            date.setDate(date.getDate() - 1);
        }
        return date;
    }

    esDiaLaborable(fecha) {
        const diaSemana = fecha.getDay();
        return diaSemana >= 1 && diaSemana <= 5;
    }

    obtenerDiasLaborablesSemana(fechaReferencia) {
        const inicioSemana = this.getInicioSemana(fechaReferencia);
        const dias = [];
        const cursor = new Date(inicioSemana);

        while (cursor <= fechaReferencia) {
            if (this.esDiaLaborable(cursor)) {
                dias.push(new Date(cursor));
            }
            cursor.setDate(cursor.getDate() + 1);
        }

        return dias;
    }

    getInicioSemana(fecha) {
        const base = new Date(fecha);
        const diaSemana = base.getDay(); // 0 domingo, 1 lunes
        const diferencia = diaSemana === 0 ? -6 : 1 - diaSemana;
        base.setDate(base.getDate() + diferencia);
        return this.obtenerDiaLaborable(base);
    }

    obtenerDiasLaborablesMes(fechaReferencia) {
        const inicioMes = new Date(fechaReferencia.getFullYear(), fechaReferencia.getMonth(), 1);
        const dias = [];
        const cursor = new Date(inicioMes);

        while (cursor <= fechaReferencia) {
            if (this.esDiaLaborable(cursor)) {
                dias.push(new Date(cursor));
            }
            cursor.setDate(cursor.getDate() + 1);
        }

        return dias;
    }

    formatearEtiquetaDia(fecha) {
        const opciones = { weekday: 'long', day: '2-digit', month: 'short' };
        let etiqueta = new Intl.DateTimeFormat('es-MX', opciones).format(fecha);
        etiqueta = etiqueta.replace('.', '').replace(',', ' · ');
        return etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1);
    }

    escapeHtml(texto = '') {
        return String(texto)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    getInfoTipo(tipo = '') {
        const mapa = {
            reunion: { icono: '🤝', etiqueta: 'Reunión', fondo: 'rgba(255,136,0,0.15)', color: '#9A4B00' },
            seguimiento: { icono: '🔁', etiqueta: 'Seguimiento', fondo: 'rgba(34,114,255,0.12)', color: '#1F4D99' },
            llamada: { icono: '📞', etiqueta: 'Llamada', fondo: 'rgba(76,201,240,0.15)', color: '#0B7899' },
            documentacion: { icono: '🗂️', etiqueta: 'Documentación', fondo: 'rgba(46,204,113,0.12)', color: '#187748' },
            firma: { icono: '✍️', etiqueta: 'Firma', fondo: 'rgba(155,89,182,0.15)', color: '#5F2CA1' },
            estrategia: { icono: '📊', etiqueta: 'Estrategia', fondo: 'rgba(255,199,0,0.18)', color: '#9C6B00' },
            oferta: { icono: '💡', etiqueta: 'Oferta', fondo: 'rgba(255,107,129,0.18)', color: '#A8324D' },
            expediente: { icono: '🗃️', etiqueta: 'Expediente', fondo: 'rgba(52,152,219,0.15)', color: '#1D5F96' },
            crm: { icono: '📝', etiqueta: 'CRM', fondo: 'rgba(39,174,96,0.15)', color: '#1F7B4D' }
        };
        return mapa[tipo] || { icono: '📝', etiqueta: 'Tarea', fondo: 'rgba(31,42,68,0.12)', color: '#1F2A44' };
    }
}

window.MisAccionesModule = MisAccionesModule;

