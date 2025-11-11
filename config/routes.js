/**
 * ============================================
 * CONFIGURACIÓN DE RUTAS/SECCIONES
 * ============================================
 * Define todas las secciones disponibles en el CRM
 */

const ROUTES = {
    inicio: {
        id: 'inicio',
        name: 'Inicio',
        icon: '🏠',
        description: 'Panel de control principal',
        module: 'InicioModule'
    },
    prospectos: {
        id: 'prospectos',
        name: 'Prospectos',
        icon: '👥',
        description: 'Gestión de clientes potenciales',
        module: 'ProspectosModule'
    },
    oportunidades: {
        id: 'oportunidades',
        name: 'Oportunidades',
        icon: '💼',
        description: 'Seguimiento de oportunidades de negocio',
        module: 'OportunidadesModule'
    },
    'mi-cartera': {
        id: 'mi-cartera',
        name: 'Mi Cartera',
        icon: '📊',
        description: 'Análisis de tu cartera de clientes',
        module: 'MiCarteraModule'
    },
    'mis-acciones': {
        id: 'mis-acciones',
        name: 'Mis Acciones',
        icon: '✅',
        description: 'Tareas y actividades pendientes',
        module: 'MisAccionesModule'
    }
};

// Hacer disponible globalmente
window.ROUTES = ROUTES;

