/**
 * ============================================
 * DATOS DE OPORTUNIDADES
 * ============================================
 * Este archivo contiene los datos de oportunidades de venta
 * Relacionadas con clientes mediante idProspecto
 */

const OPORTUNIDADES_DATA = [
    // Oportunidades Cerradas - Ganadas (Timbradas)
    {
        id: 1,
        ide: "IDE-2023-001",
        familiaProducto: "Crédito hipotecario",
        nombreProducto: "Crédito Hipotecario Premium",
        montoOportunidad: 2500000,
        timbrado: true,
        fechaCreacion: "2025-02-12",
        fechaCierre: "2025-04-05",
        probabilidad: 100,
        plazo: 240,
        tasa: 9.5,
        idProspecto: "184123456789012301",
        estado: "Cerrada-Ganada",
        estadoVenta: "Timbrado",
        campania: {
            nombre: "Campaña Hipotecaria Primavera",
            descripcion: `🔔 Descripción de la Oferta

Ofrece al cliente nuestro Crédito Hipotecario Premium con condiciones preferenciales de temporada.

🌟 Beneficios Principales:
• Tasa fija preferencial durante los primeros 24 meses.
• Avalúo sin costo y apoyo con gastos notariales.
• Acceso a asesor hipotecario dedicado.
• Cobertura de seguro de hogar incluida el primer año.

💡 Valor agregado: Ideal para clientes con ingresos consolidados que buscan invertir en un patrimonio a largo plazo.`
        }
    },
    {
        id: 2,
        ide: "IDE-2023-005",
        familiaProducto: "Tarjeta de credito",
        nombreProducto: "Tarjeta Platinum",
        montoOportunidad: 80000,
        timbrado: true,
        fechaCreacion: "2025-05-14",
        fechaCierre: "2025-05-30",
        probabilidad: 100,
        plazo: null,
        tasa: 42.0,
        idProspecto: "184123456789012305",
        estado: "Cerrada-Ganada",
        estadoVenta: "Timbrado"
    },
    {
        id: 3,
        ide: "IDE-2023-010",
        familiaProducto: "Credito negocios",
        nombreProducto: "Crédito Capital de Trabajo",
        montoOportunidad: 1500000,
        timbrado: true,
        fechaCreacion: "2025-03-18",
        fechaCierre: "2025-04-28",
        probabilidad: 100,
        plazo: 36,
        tasa: 12.5,
        idProspecto: "184123456789012310",
        estado: "Cerrada-Ganada",
        estadoVenta: "Timbrado"
    },
    {
        id: 4,
        ide: "IDE-2024-016",
        familiaProducto: "Seguro auto",
        nombreProducto: "Seguro Todo Riesgo Auto",
        montoOportunidad: 15000,
        timbrado: true,
        fechaCreacion: "2025-06-05",
        fechaCierre: "2025-06-25",
        probabilidad: 100,
        plazo: 12,
        tasa: null,
        idProspecto: "184123456789012315",
        estado: "Cerrada-Ganada",
        estadoVenta: "Timbrado"
    },
    {
        id: 5,
        ide: "IDE-2024-019",
        familiaProducto: "TPV",
        nombreProducto: "Terminal Punto de Venta Premium",
        montoOportunidad: 25000,
        timbrado: true,
        fechaCreacion: "2025-06-30",
        fechaCierre: "2025-07-15",
        probabilidad: 100,
        plazo: null,
        tasa: 2.8,
        idProspecto: "184123456789012320",
        estado: "Cerrada-Ganada",
        estadoVenta: "Timbrado"
    },

    // Oportunidades Cerradas - Perdidas
    {
        id: 6,
        ide: "IDE-2024-017",
        familiaProducto: "Credito personal",
        nombreProducto: "Crédito Personal Express",
        montoOportunidad: 150000,
        timbrado: false,
        fechaCreacion: "2025-07-20",
        fechaCierre: "2025-08-05",
        probabilidad: 0,
        plazo: 24,
        tasa: 35.0,
        idProspecto: "184123456789012325",
        estado: "Descartada",
        estadoVenta: "No contactado",
        motivoDescarte: "No cumple requisitos de buró de crédito",
        descripcionDescarte: "Se detectaron atrasos recientes en el buró, lo que impide aprobar la línea de crédito personal."
    },
    {
        id: 7,
        ide: "IDE-2023-030",
        familiaProducto: "Tarjeta de credito empresarial",
        nombreProducto: "Tarjeta Business Gold",
        montoOportunidad: 200000,
        timbrado: false,
        fechaCreacion: "2025-08-12",
        fechaCierre: "2025-08-29",
        probabilidad: 0,
        plazo: null,
        tasa: 38.0,
        idProspecto: "184123456789012330",
        estado: "Descartada",
        estadoVenta: "Interesado",
        motivoDescarte: "Prefiere producto de la competencia",
        descripcionDescarte: "El corporativo eligió una tarjeta empresarial con comisión anual cero ofrecida por un banco rival."
    },

    // Oportunidades Abiertas - En Fábrica y Formalización
    {
        id: 8,
        ide: "IDE-2023-002",
        familiaProducto: "Crédito auto",
        nombreProducto: "Crédito Automotriz Plus",
        montoOportunidad: 450000,
        timbrado: false,
        fechaCreacion: "2025-10-02",
        fechaCierre: null,
        probabilidad: 85,
        plazo: 48,
        tasa: 11.5,
        idProspecto: "184123456789012302",
        estado: "Abierta",
        estadoVenta: "Formalización",
        campania: {
            nombre: "Campaña Autos Ejecutivos",
            descripcion: `🚗 Descripción de la Oferta

Promueve nuestro crédito automotriz con condiciones especiales para flotillas ejecutivas.

🌟 Beneficios Principales:
• Enganche desde el 10% y tasa fija durante todo el plazo.
• Seguro gratis el primer año y asistencia vial 24/7.
• Entrega prioritaria con convenios de agencias premium.
• Posibilidad de incluir accesorios y equipamiento en el financiamiento.

💡 Valor agregado: Perfecto para empresas y directivos que buscan renovar o ampliar su parque vehicular sin descapitalizarse.`
        }
    },
    {
        id: 9,
        ide: "IDE-2023-003",
        familiaProducto: "Nómina",
        nombreProducto: "Dispersión de Nómina Empresarial",
        montoOportunidad: 500000,
        timbrado: false,
        fechaCreacion: "2025-10-05",
        fechaCierre: null,
        probabilidad: 90,
        plazo: null,
        tasa: null,
        idProspecto: "184123456789012303",
        estado: "Abierta",
        estadoVenta: "Entregado al cliente"
    },
    {
        id: 10,
        ide: "IDE-2023-006",
        familiaProducto: "Credito negocios",
        nombreProducto: "Línea de Crédito Revolvente",
        montoOportunidad: 3000000,
        timbrado: false,
        fechaCreacion: "2025-10-07",
        fechaCierre: null,
        probabilidad: 75,
        plazo: 24,
        tasa: 13.0,
        idProspecto: "184123456789012306",
        estado: "Abierta",
        estadoVenta: "Fabrica",
        campania: {
            nombre: "Campaña Impulso PyME",
            descripcion: `💼 Descripción de la Oferta

Promueve la Línea de Crédito Revolvente para capital de trabajo ágil.

🌟 Beneficios Principales:
• Disposición inmediata y sin penalización por pagos anticipados.
• Tasa preferencial para montos aprobados durante noviembre.
• Sin comisión de apertura y renovación automática anual.
• Acceso a plataforma digital de control de operaciones.

💡 Valor agregado: Ideal para PyMEs en expansión que requieren liquidez para compras de inventario y proyectos rápidos.`
        }
    },

    // Oportunidades Abiertas - En Negociación
    {
        id: 11,
        ide: "IDE-2023-007",
        familiaProducto: "Tarjeta de credito",
        nombreProducto: "Tarjeta Gold",
        montoOportunidad: 50000,
        timbrado: false,
        fechaCreacion: "2025-09-28",
        fechaCierre: null,
        probabilidad: 60,
        plazo: null,
        tasa: 45.0,
        idProspecto: "184123456789012307",
        estado: "Abierta",
        estadoVenta: "Negociación",
        campania: {
            nombre: "Campaña Tarjeta Gold",
            descripcion: `💳 Descripción de la Oferta

Introduce la Tarjeta Gold con privilegios premium para consumo empresarial.

🌟 Beneficios Principales:
• Programa de puntos con doble acumulación en categorías de viaje.
• Meses sin intereses exclusivos en alianzas tecnológicas.
• Seguro de compras y protección de precio sin costo adicional.
• Concierge 24/7 y accesos VIP en aeropuertos seleccionados.

💡 Script sugerido: enfatiza cómo la tarjeta Gold optimiza el control de gastos corporativos y recompensa los desembolsos frecuentes.`
        }
    },
    {
        id: 12,
        ide: "IDE-2023-008",
        familiaProducto: "Seguro vida",
        nombreProducto: "Seguro de Vida Protección Total",
        montoOportunidad: 25000,
        timbrado: false,
        fechaCreacion: "2025-10-06",
        fechaCierre: null,
        probabilidad: 55,
        plazo: 12,
        tasa: null,
        idProspecto: "184123456789012308",
        estado: "Abierta",
        estadoVenta: "Negociación"
    },
    {
        id: 13,
        ide: "IDE-2023-011",
        familiaProducto: "Cuenta de cheques",
        nombreProducto: "Cuenta Empresarial Plus",
        montoOportunidad: 0,
        timbrado: false,
        fechaCreacion: "2025-10-04",
        fechaCierre: null,
        probabilidad: 65,
        plazo: null,
        tasa: null,
        idProspecto: "184123456789012311",
        estado: "Abierta",
        estadoVenta: "Formalización",
        campania: {
            nombre: "Campaña Tesorería Integral",
            descripcion: `🏦 Descripción de la Oferta

Impulsa la Cuenta Empresarial Plus con servicios de tesorería automatizados.

🌟 Beneficios Principales:
• Cero comisiones por transferencias SPEI y pagos de nómina ilimitados.
• Integración con ERP y conciliación bancaria automática.
• Línea de sobregiro preferencial y alertas de flujo en tiempo real.
• Tarjeta empresarial sin costo para socios firmantes.

💡 Valor agregado: ideal para empresas que quieren centralizar la liquidez y simplificar la dispersión de pagos.`
        }
    },
    {
        id: 14,
        ide: "IDE-2023-012",
        familiaProducto: "Credito personal",
        nombreProducto: "Préstamo Personal Flexible",
        montoOportunidad: 200000,
        timbrado: false,
        fechaCreacion: "2025-10-03",
        fechaCierre: null,
        probabilidad: 50,
        plazo: 36,
        tasa: 32.0,
        idProspecto: "184123456789012312",
        estado: "Abierta",
        estadoVenta: "Interesado",
        campania: {
            nombre: "Campaña Liquidez Exprés",
            descripcion: `💰 Descripción de la Oferta

Ofrece el Préstamo Personal Flexible con desembolso en 24 horas.

🌟 Beneficios Principales:
• Pago inicial diferido 60 días.
• Tasas escalonadas según historial de pago.
• Seguro de desempleo incluido el primer año.
• Posibilidad de complementar con tarjeta de crédito Prefer.

💡 Valor agregado: ideal para empleados con gastos extraordinarios que requieren una solución rápida.`
        }
    },

    // Oportunidades Abiertas - Interesado y No contactado
    {
        id: 15,
        ide: "IDE-2024-014",
        familiaProducto: "Seguro hogar",
        nombreProducto: "Seguro Casa Habitación",
        montoOportunidad: 18000,
        timbrado: false,
        fechaCreacion: "2025-10-08",
        fechaCierre: null,
        probabilidad: 35,
        plazo: 12,
        tasa: null,
        idProspecto: "184123456789012313",
        estado: "Abierta",
        estadoVenta: "Interesado"
    },
    {
        id: 16,
        ide: "IDE-2024-015",
        familiaProducto: "Banca electronica",
        nombreProducto: "Banca en Línea Premium",
        montoOportunidad: 0,
        timbrado: false,
        fechaCreacion: "2025-10-10",
        fechaCierre: null,
        probabilidad: 40,
        plazo: null,
        tasa: null,
        idProspecto: "184123456789012316",
        estado: "Abierta",
        estadoVenta: "Interesado",
        campania: {
            nombre: "Campaña Gestión Digital",
            descripcion: `🖥️ Descripción de la Oferta

Promueve la Banca en Línea Premium resaltando eficiencia operativa.

🌟 Beneficios Principales:
• Usuarios ilimitados con perfiles y autorizaciones personalizadas.
• Integración con facturación electrónica y CFDI.
• Monitor de flujo de caja en tiempo real y alertas inteligentes.
• Soporte dedicado para migración de operaciones.

💡 Valor agregado: posicionarla como herramienta clave para empresas con alto volumen transaccional.`
        }
    },
    {
        id: 17,
        ide: "IDE-2024-020",
        familiaProducto: "TPV",
        nombreProducto: "Terminal Punto de Venta Básica",
        montoOportunidad: 15000,
        timbrado: false,
        fechaCreacion: "2025-10-12",
        fechaCierre: null,
        probabilidad: 30,
        plazo: null,
        tasa: 3.2,
        idProspecto: "184123456789012317",
        estado: "Abierta",
        estadoVenta: "No contactado"
    },
    {
        id: 18,
        ide: "IDE-2024-005",
        familiaProducto: "Tarjeta de credito empresarial",
        nombreProducto: "Tarjeta Corporate Platinum",
        montoOportunidad: 300000,
        timbrado: false,
        fechaCreacion: "2025-10-14",
        fechaCierre: null,
        probabilidad: 45,
        plazo: null,
        tasa: 36.0,
        idProspecto: "184123456789012318",
        estado: "Abierta",
        estadoVenta: "Negociación",
        campania: {
            nombre: "Campaña Gastos Corporativos",
            descripcion: `💼 Descripción de la Oferta

Impulsa la Tarjeta Corporate Platinum orientada a control de gastos.

🌟 Beneficios Principales:
• Dashboard de gastos en tiempo real por departamento.
• Políticas dinámicas de consumo y alertas configurables.
• Programa de recompensas en viajes y hospedaje corporativo.
• Concierge financiero para optimizar cierres contables.

💡 Valor agregado: destaca cómo ayuda a homologar políticas de gasto en corporativos con múltiples niveles de aprobación.`
        }
    },

    // Más oportunidades variadas
    {
        id: 19,
        ide: "IDE-2024-006",
        familiaProducto: "Crédito hipotecario",
        nombreProducto: "Crédito Hipotecario Joven",
        montoOportunidad: 1800000,
        timbrado: false,
        fechaCreacion: "2025-10-16",
        fechaCierre: null,
        probabilidad: 70,
        plazo: 180,
        tasa: 10.5,
        idProspecto: "184123456789012321",
        estado: "Abierta",
        estadoVenta: "Fabrica"
    },
    {
        id: 20,
        ide: "IDE-2024-007",
        familiaProducto: "Credito negocios",
        nombreProducto: "Crédito Pyme Crecimiento",
        montoOportunidad: 800000,
        timbrado: false,
        fechaCreacion: "2025-10-18",
        fechaCierre: null,
        probabilidad: 80,
        plazo: 24,
        tasa: 14.0,
        idProspecto: "184123456789012322",
        estado: "Abierta",
        estadoVenta: "Entregado al cliente"
    },
    {
        id: 21,
        ide: "IDE-2023-026",
        familiaProducto: "Seguro auto",
        nombreProducto: "Seguro Auto Básico",
        montoOportunidad: 8000,
        timbrado: false,
        fechaCreacion: "2025-10-20",
        fechaCierre: null,
        probabilidad: 50,
        plazo: 12,
        tasa: null,
        idProspecto: "184123456789012326",
        estado: "Abierta",
        estadoVenta: "Interesado"
    },
    {
        id: 22,
        ide: "IDE-2023-027",
        familiaProducto: "Nómina",
        nombreProducto: "Servicio de Nómina Digital",
        montoOportunidad: 250000,
        timbrado: false,
        fechaCreacion: "2025-10-09",
        fechaCierre: null,
        probabilidad: 60,
        plazo: null,
        tasa: null,
        idProspecto: "184123456789012327",
        estado: "Abierta",
        estadoVenta: "Negociación"
    },
    {
        id: 23,
        ide: "IDE-2023-031",
        familiaProducto: "Crédito auto",
        nombreProducto: "Financiamiento Vehículo Seminuevo",
        montoOportunidad: 280000,
        timbrado: false,
        fechaCreacion: "2025-10-11",
        fechaCierre: null,
        probabilidad: 55,
        plazo: 36,
        tasa: 13.5,
        idProspecto: "184123456789012331",
        estado: "Abierta",
        estadoVenta: "Negociación"
    },
    {
        id: 24,
        ide: "IDE-2024-021",
        familiaProducto: "Tarjeta de credito",
        nombreProducto: "Tarjeta Clásica",
        montoOportunidad: 30000,
        timbrado: false,
        fechaCreacion: "2025-10-19",
        fechaCierre: null,
        probabilidad: 65,
        plazo: null,
        tasa: 48.0,
        idProspecto: "184123456789012335",
        estado: "Abierta",
        estadoVenta: "Formalización"
    },
    {
        id: 25,
        ide: "IDE-2024-022",
        familiaProducto: "Seguro vida",
        nombreProducto: "Seguro Vida Familiar",
        montoOportunidad: 35000,
        timbrado: false,
        fechaCreacion: "2025-10-21",
        fechaCierre: null,
        probabilidad: 40,
        plazo: 12,
        tasa: null,
        idProspecto: "184123456789012336",
        estado: "Abierta",
        estadoVenta: "No contactado"
    },
    {
        id: 26,
        ide: "IDE-2024-030",
        familiaProducto: "Tarjeta de credito",
        nombreProducto: "Tarjeta Platinum Empresas",
        montoOportunidad: 120000,
        timbrado: false,
        fechaCreacion: "2025-10-22",
        fechaCierre: null,
        probabilidad: 55,
        plazo: null,
        tasa: 40.0,
        idProspecto: "184123456789012340",
        estado: "Abierta",
        estadoVenta: "Interesado",
        campania: {
            nombre: "Campaña Tarjeta Business",
            descripcion: `📈 Descripción de la Oferta

Promueve la Tarjeta Platinum Empresas para optimizar gastos corporativos.

🌟 Beneficios Principales:
• Línea de crédito hasta $2,000,000 MXN.
• Tarjetas adicionales sin costo para empleados autorizados.
• Control de gastos por departamento y reporteo detallado.
• Hasta 45 días de crédito sin intereses y programa de puntos para viajes.
• Ejecutivo de cuenta dedicado para seguimiento personalizado.

💡 Valor agregado: resaltar como herramienta estratégica para empresas medianas y grandes que buscan controlar gastos y obtener recompensas.`
        }
    }
];

/**
 * Estadísticas de oportunidades
 */
const OPORTUNIDADES_STATS = {
    total: OPORTUNIDADES_DATA.length,
    abiertas: OPORTUNIDADES_DATA.filter(o => o.estado === "Abierta").length,
    cerradasGanadas: OPORTUNIDADES_DATA.filter(o => o.estado === "Cerrada-Ganada").length,
    descartadas: OPORTUNIDADES_DATA.filter(o => o.estado === "Descartada").length,
    montoTotal: OPORTUNIDADES_DATA.reduce((sum, o) => sum + o.montoOportunidad, 0),
    montoPonderado: OPORTUNIDADES_DATA
        .filter(o => o.estado === "Abierta")
        .reduce((sum, o) => sum + (o.montoOportunidad * o.probabilidad / 100), 0),
    porEstadoVenta: {
        noContactado: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "No contactado").length,
        interesado: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "Interesado").length,
        negociacion: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "Negociación").length,
        fabrica: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "Fabrica").length,
        formalizacion: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "Formalización").length,
        entregadoAlCliente: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "Entregado al cliente").length,
        timbrado: OPORTUNIDADES_DATA.filter(o => o.estadoVenta === "Timbrado").length
    }
};

/**
 * Utilidades para trabajar con oportunidades
 */
const OportunidadesUtils = {
    /**
     * Obtiene todas las oportunidades
     */
    getTodos() {
        return OPORTUNIDADES_DATA;
    },

    /**
     * Obtiene oportunidades por IDE
     */
    getPorIDE(ide) {
        return OPORTUNIDADES_DATA.filter(o => o.ide === ide);
    },

    /**
     * Obtiene oportunidades por ID de prospecto
     */
    getPorIdProspecto(idProspecto) {
        return OPORTUNIDADES_DATA.filter(o => o.idProspecto === idProspecto);
    },

    /**
     * Obtiene oportunidades por estado
     */
    getPorEstado(estado) {
        return OPORTUNIDADES_DATA.filter(o => o.estado === estado);
    },

    /**
     * Obtiene oportunidades por estado de venta
     */
    getPorEstadoVenta(estadoVenta) {
        return OPORTUNIDADES_DATA.filter(o => o.estadoVenta === estadoVenta);
    },

    /**
     * Obtiene oportunidades abiertas
     */
    getAbiertas() {
        return OPORTUNIDADES_DATA.filter(o => o.estado === "Abierta");
    },

    /**
     * Obtiene oportunidades cerradas ganadas
     */
    getCerradasGanadas() {
        return OPORTUNIDADES_DATA.filter(o => o.estado === "Cerrada-Ganada");
    },

    /**
     * Obtiene oportunidades por familia de producto
     */
    getPorFamilia(familia) {
        return OPORTUNIDADES_DATA.filter(o => o.familiaProducto === familia);
    },

    /**
     * Obtiene oportunidades por rango de probabilidad
     */
    getPorProbabilidad(min, max) {
        return OPORTUNIDADES_DATA.filter(o =>
            o.probabilidad >= min && o.probabilidad <= max
        );
    },

    /**
     * Obtiene monto total por estado de venta
     */
    getMontosPorEstadoVenta() {
        const estados = ["No contactado", "Interesado", "Negociación", "Fabrica", "Formalización", "Entregado al cliente", "Timbrado"];
        return estados.reduce((acc, estado) => {
            acc[estado] = this.getPorEstadoVenta(estado).reduce((sum, o) => sum + o.montoOportunidad, 0);
            return acc;
        }, {});
    },

    /**
     * Obtiene monto ponderado de oportunidades abiertas
     */
    getMontoPonderado() {
        return this.getAbiertas().reduce((sum, o) =>
            sum + (o.montoOportunidad * o.probabilidad / 100), 0
        );
    },

    /**
     * Obtiene estadísticas
     */
    getStats() {
        return OPORTUNIDADES_STATS;
    },

    /**
     * Busca oportunidad por ID
     */
    getPorId(id) {
        return OPORTUNIDADES_DATA.find(o => o.id === id);
    }
};

// Hacer disponible globalmente
window.OPORTUNIDADES_DATA = OPORTUNIDADES_DATA;
window.OPORTUNIDADES_STATS = OPORTUNIDADES_STATS;
window.OportunidadesUtils = OportunidadesUtils;