/**
 * ============================================
 * DATOS DE PROSPECTOS
 * ============================================
 * Base de datos de prospectos y utilidades asociadas
 */

const PROSPECTO_STAGES = [
    'No contactado',
    'No localizado aún',
    'En consideración',
    'Interesado',
    'Descartado',
    'Convertido'
];

const PROSPECTOS_DATA = [
    {
        id: 'P-001',
        nombre: 'Grupo Hotelero del Centro S.A.',
        rfc: 'GHC860318DF5',
        celular: '473-456-7890',
        correo: 'reservaciones@grupohotelero.com',
        familiaProducto: 'Crédito Negocios',
        fechaAlta: '2024-01-08',
        fechaConversion: '2024-03-04',
        estado: 'Convertido',
        convertido: true,
        monto: 1500000,
        fechaDescarte: null,
        idOportunidad: 'IDE-2023-010'
    },
    {
        id: 'P-002',
        nombre: 'Constructora Azteca S.A. de C.V.',
        rfc: 'CAZ890123BN5',
        celular: '55-1234-5678',
        correo: 'contacto@constructoraazteca.com.mx',
        familiaProducto: 'Crédito hipotecario',
        fechaAlta: '2024-02-12',
        fechaConversion: null,
        estado: 'En consideración',
        convertido: false,
        monto: 2300000,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-003',
        nombre: 'Servicios Médicos Integrales S.C.',
        rfc: 'SMI900420OP2',
        celular: '222-987-6543',
        correo: 'atencion@serviciosmedicos.com.mx',
        familiaProducto: 'Seguro vida',
        fechaAlta: '2024-02-28',
        fechaConversion: null,
        estado: 'Interesado',
        convertido: false,
        monto: 32000,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-004',
        nombre: 'Tecnología Digital del Norte S.A.',
        rfc: 'TDN920315XY8',
        celular: '81-9876-5432',
        correo: 'ventas@tecnorte.com',
        familiaProducto: 'Tarjeta de crédito empresarial',
        fechaAlta: '2024-01-18',
        fechaConversion: '2024-03-12',
        estado: 'Convertido',
        convertido: true,
        monto: 280000,
        fechaDescarte: null,
        idOportunidad: 'IDE-2023-030'
    },
    {
        id: 'P-005',
        nombre: 'Grupo Financiero Delta',
        rfc: 'GFD930221MN4',
        celular: '55-6123-4432',
        correo: 'hola@grupodelta.com.mx',
        familiaProducto: 'Cuenta de cheques',
        fechaAlta: '2024-03-05',
        fechaConversion: null,
        estado: 'No localizado aún',
        convertido: false,
        monto: 0,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-006',
        nombre: 'Inversiones Horizonte',
        rfc: 'INH950721JK2',
        celular: '55-9087-1234',
        correo: 'contacto@inversioneshorizonte.mx',
        familiaProducto: 'Crédito personal',
        fechaAlta: '2024-01-28',
        fechaConversion: null,
        estado: 'Descartado',
        convertido: false,
        monto: 120000,
        fechaDescarte: '2024-03-22',
        idOportunidad: null
    },
    {
        id: 'P-007',
        nombre: 'Logística y Almacenamiento Total S.A. de C.V.',
        rfc: 'LAT890515CD9',
        celular: '81-6789-0123',
        correo: 'operaciones@logisticatotal.mx',
        familiaProducto: 'TPV',
        fechaAlta: '2024-03-18',
        fechaConversion: null,
        estado: 'Interesado',
        convertido: false,
        monto: 48000,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-008',
        nombre: 'Agroindustrias del Valle S.A. de C.V.',
        rfc: 'AVI930305UV8',
        celular: '646-123-4567',
        correo: 'compras@agroindustriasvalle.mx',
        familiaProducto: 'Seguro agropecuario',
        fechaAlta: '2024-04-04',
        fechaConversion: null,
        estado: 'No contactado',
        convertido: false,
        monto: 0,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-009',
        nombre: 'Publicidad y Medios Digitales S.A. de C.V.',
        rfc: 'PMD910707GH5',
        celular: '55-8901-2345',
        correo: 'contacto@publicidaddigital.mx',
        familiaProducto: 'Banca electrónica',
        fechaAlta: '2024-02-02',
        fechaConversion: null,
        estado: 'En consideración',
        convertido: false,
        monto: 0,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-010',
        nombre: 'Maquinaria Industrial del Norte S.A. de C.V.',
        rfc: 'MIN920525GH4',
        celular: '871-234-5678',
        correo: 'contacto@maquinarianorte.mx',
        familiaProducto: 'Crédito Negocios',
        fechaAlta: '2024-01-05',
        fechaConversion: '2024-02-18',
        estado: 'Convertido',
        convertido: true,
        monto: 950000,
        fechaDescarte: null,
        idOportunidad: 'IDE-2023-020'
    },
    {
        id: 'P-011',
        nombre: 'Consultoría Empresarial Moderna S.C.',
        rfc: 'CEM950615LM3',
        celular: '55-6789-0123',
        correo: 'info@consultoriamoderna.mx',
        familiaProducto: 'Crédito personal',
        fechaAlta: '2024-04-10',
        fechaConversion: null,
        estado: 'No localizado aún',
        convertido: false,
        monto: 90000,
        fechaDescarte: null,
        idOportunidad: null
    },
    {
        id: 'P-012',
        nombre: 'María Fernanda García Rodríguez',
        rfc: 'GARM920318MN7',
        celular: '33-3456-7890',
        correo: 'mf.garcia@consultorigarcia.mx',
        familiaProducto: 'Tarjeta de crédito',
        fechaAlta: '2024-03-02',
        fechaConversion: null,
        estado: 'Descartado',
        convertido: false,
        monto: 45000,
        fechaDescarte: '2024-04-08',
        idOportunidad: null
    }
];

const ProspectosUtils = {
    getTodos() {
        return PROSPECTOS_DATA;
    },

    getPorEstado(estado) {
        return PROSPECTOS_DATA.filter(p => p.estado === estado);
    },

    getPorId(id) {
        return PROSPECTOS_DATA.find(p => p.id === id);
    },

    getStages() {
        return [...PROSPECTO_STAGES];
    },

    getStats() {
        const total = PROSPECTOS_DATA.length;
        const porEstado = PROSPECTO_STAGES.reduce((acc, stage) => {
            const prospectosStage = this.getPorEstado(stage);
            acc[stage] = {
                count: prospectosStage.length,
                monto: prospectosStage.reduce((sum, prospecto) => sum + (prospecto.monto || 0), 0)
            };
            return acc;
        }, {});

        const convertidos = this.getPorEstado('Convertido');
        const descartados = this.getPorEstado('Descartado');

        return {
            total,
            porEstado,
            convertidos: convertidos.length,
            descartados: descartados.length,
            montoTotal: PROSPECTOS_DATA.reduce((sum, prospecto) => sum + (prospecto.monto || 0), 0),
            montoConvertido: convertidos.reduce((sum, prospecto) => sum + (prospecto.monto || 0), 0)
        };
    },

    getRelacionOportunidad(idOportunidad) {
        if (!idOportunidad || !window.OportunidadesUtils) return null;
        return OportunidadesUtils.getTodos().find(o => o.ide === idOportunidad) || null;
    }
};

// Hacer disponible globalmente
window.ProspectosUtils = ProspectosUtils;

