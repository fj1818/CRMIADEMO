const ACCIONES_DATA = [
    {
        id: 'ACT-001',
        idProspecto: 'P-001',
        idCliente: 'IDE-2023-010',
        tarea: 'Llamar',
        descripcion: 'Confirmar interés y validar documentación pendiente.',
        fechaTarea: '2024-11-12T10:00:00',
        fechaCompletado: '2024-11-12T12:30:00'
    },
    {
        id: 'ACT-002',
        idProspecto: 'P-002',
        idCliente: 'IDE-2023-002',
        tarea: 'Solicitar identificaciones',
        descripcion: 'Recabar identificación oficial y comprobante fiscal.',
        fechaTarea: '2024-11-13T09:30:00',
        fechaCompletado: null
    },
    {
        id: 'ACT-003',
        idProspecto: 'P-007',
        idCliente: 'IDE-2024-006',
        tarea: 'Agendar visita',
        descripcion: 'Visita para presentar condiciones del crédito PyME.',
        fechaTarea: '2024-11-14T16:00:00',
        fechaCompletado: null
    },
    {
        id: 'ACT-004',
        idProspecto: 'P-010',
        idCliente: 'IDE-2024-021',
        tarea: 'Completar información de folios',
        descripcion: 'Actualizar números de folio del expediente digital.',
        fechaTarea: '2024-11-11T11:00:00',
        fechaCompletado: '2024-11-11T13:15:00'
    },
    {
        id: 'ACT-005',
        idProspecto: 'P-012',
        idCliente: 'IDE-2024-007',
        tarea: 'Solicitar comprobantes de domicilio',
        descripcion: 'Enviar checklist actualizado y solicitar documentación.',
        fechaTarea: '2024-11-15T09:00:00',
        fechaCompletado: null
    },
    {
        id: 'ACT-006',
        idProspecto: 'P-015',
        idCliente: 'IDE-2024-019',
        tarea: 'Llamar',
        descripcion: 'Dar seguimiento a condiciones de timbrado.',
        fechaTarea: '2024-11-16T15:30:00',
        fechaCompletado: null
    }
];

const AGENDA_EVENTOS = [
    {
        id: 'EVT-101',
        titulo: 'Visita con Grupo Hotelero del Centro',
        descripcion: 'Presentar propuesta final del crédito hipotecario.',
        tipo: 'Visita',
        fechaInicio: '2024-11-13T11:00:00',
        fechaFin: '2024-11-13T12:30:00',
        relacionado: 'IDE-2023-001'
    },
    {
        id: 'EVT-102',
        titulo: 'Llamada de verificación con Constructora Azteca',
        descripcion: 'Confirmar recepción de checklist y agendar firma.',
        tipo: 'Llamada',
        fechaInicio: '2024-11-14T10:00:00',
        fechaFin: '2024-11-14T10:30:00',
        relacionado: 'P-002'
    },
    {
        id: 'EVT-103',
        titulo: 'Junta de revisión de resultados Q4',
        descripcion: 'Revisión de pipeline y objetivos trimestrales.',
        tipo: 'Junta',
        fechaInicio: '2024-11-15T09:30:00',
        fechaFin: '2024-11-15T11:00:00',
        relacionado: null
    },
    {
        id: 'EVT-104',
        titulo: 'Capacitación de CRM para equipo comercial',
        descripcion: 'Sesión práctica sobre nuevos tableros de seguimiento.',
        tipo: 'Capacitación',
        fechaInicio: '2024-11-16T15:00:00',
        fechaFin: '2024-11-16T17:00:00',
        relacionado: null
    },
    {
        id: 'EVT-105',
        titulo: 'Junta trimestral con Logística y Almacenamiento Total',
        descripcion: 'Evaluar avance de implementación TPV y upsell.',
        tipo: 'Junta',
        fechaInicio: '2024-11-18T13:00:00',
        fechaFin: '2024-11-18T14:30:00',
        relacionado: 'IDE-2024-020'
    }
];

const AccionesUtils = {
    getTodas() {
        return ACCIONES_DATA;
    },
    getPendientes() {
        return ACCIONES_DATA.filter(a => !a.fechaCompletado);
    },
    getCompletadas() {
        return ACCIONES_DATA.filter(a => !!a.fechaCompletado);
    }
};

const AgendaUtils = {
    getEventos() {
        return AGENDA_EVENTOS;
    },
    getEventosOrdenados() {
        return [...AGENDA_EVENTOS].sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
    }
};

window.ACCIONES_DATA = ACCIONES_DATA;
window.AGENDA_EVENTOS = AGENDA_EVENTOS;
window.AccionesUtils = AccionesUtils;
window.AgendaUtils = AgendaUtils;
