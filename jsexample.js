// ============================================
// DATOS Y CONFIGURACIÓN
// ============================================

// Datos de ejemplo para los prospectos
const prospects = [{
    id: 1,
    name: 'Juan Pérez',
    company: 'Tech Solutions S.A.',
    product: 'TDC',
    status: 'interesado',
    amount: 450000,
    contactDate: '2025-01-15',
    lastContact: '2025-01-20',
    phone: '33-1234-5678',
    email: 'juan.perez@techsolutions.com',
    comments: 'Interesado en Tarjeta de Crédito. Busca beneficios de cashback y puntos.'
}, {
    id: 2,
    name: 'María González',
    company: 'Innovate Corp',
    product: 'TDCE',
    status: 'no_contactado',
    amount: 280000,
    contactDate: '2025-01-18',
    lastContact: 'Nunca',
    phone: '33-2345-6789',
    email: 'maria.gonzalez@innovate.com',
    comments: 'Necesita contacto inicial para productos bancarios'
}, {
    id: 3,
    name: 'Carlos Rodríguez',
    company: 'StartUp Labs',
    product: 'TPV',
    status: 'en_consideracion',
    amount: 150000,
    contactDate: '2025-01-10',
    lastContact: '2025-01-22',
    phone: '33-3456-7890',
    email: 'carlos.rodriguez@startuplabs.com',
    comments: 'Evaluando Terminal Punto de Venta. Comparando con otras opciones del mercado.'
}, {
    id: 4,
    name: 'Ana Martínez',
    company: 'Global Industries',
    product: 'Nómina',
    status: 'documentacion',
    amount: 620000,
    contactDate: '2025-01-05',
    lastContact: '2025-01-25',
    phone: '33-4567-8901',
    email: 'ana.martinez@global.com',
    comments: 'Revisando documentación para servicio de nómina. Validando requisitos legales.'
}, {
    id: 5,
    name: 'Roberto Silva',
    company: 'SecureBank',
    product: 'Seguros',
    status: 'cerrado',
    amount: 95000,
    contactDate: '2024-12-20',
    lastContact: '2025-01-15',
    phone: '33-5678-9012',
    email: 'roberto.silva@securebank.com',
    comments: 'Póliza de seguro contratada exitosamente. Cliente satisfecho con cobertura.'
}, {
    id: 6,
    name: 'Laura Fernández',
    company: 'Retail Plus',
    product: 'Crédito de auto',
    status: 'descartado',
    amount: 380000,
    contactDate: '2025-01-12',
    lastContact: '2025-01-18',
    phone: '33-6789-0123',
    email: 'laura.fernandez@retailplus.com',
    comments: 'No cumple requisitos de crédito automotriz. Score crediticio insuficiente.'
}, {
    id: 7,
    name: 'Miguel Torres',
    company: 'Logistics Pro',
    product: 'Crédito hipotecario',
    status: 'interesado',
    amount: 225000,
    contactDate: '2025-01-20',
    lastContact: '2025-01-23',
    phone: '33-7890-1234',
    email: 'miguel.torres@logisticspro.com',
    comments: 'Interesado en crédito hipotecario. Busca casa en zona residencial.'
}, {
    id: 8,
    name: 'Patricia López',
    company: 'DataCorp',
    product: 'TDC',
    status: 'no_contactado',
    amount: 180000,
    contactDate: '2025-01-22',
    lastContact: 'Nunca',
    phone: '33-8901-2345',
    email: 'patricia.lopez@datacorp.com',
    comments: 'Contactar pronto para Tarjeta de Crédito empresarial.'
}];

// Datos de ejemplo para la cartera de clientes
const portfolioClients = [{
    id: 1,
    name: 'Tech Solutions S.A.',
    currentProducts: ['TDC', 'TPV'],
    missingProducts: ['Nómina', 'Seguros'],
    lastContact: '2025-01-20',
    priority: 'alta',
    portfolioValue: 1250000,
    phone: '33-1234-5678',
    email: 'contacto@techsolutions.com'
}, {
    id: 2,
    name: 'Innovate Corp',
    currentProducts: ['TDC'],
    missingProducts: ['TPV', 'Nómina', 'Seguros'],
    lastContact: '2025-01-18',
    priority: 'alta',
    portfolioValue: 850000,
    phone: '33-2345-6789',
    email: 'info@innovate.com'
}, {
    id: 3,
    name: 'StartUp Labs',
    currentProducts: ['TPV', 'Nómina'],
    missingProducts: ['TDC', 'Seguros'],
    lastContact: '2025-01-22',
    priority: 'media',
    portfolioValue: 650000,
    phone: '33-3456-7890',
    email: 'contact@startuplabs.com'
}, {
    id: 4,
    name: 'Global Industries',
    currentProducts: ['TDC', 'TPV', 'Nómina', 'Seguros'],
    missingProducts: [],
    lastContact: '2025-01-25',
    priority: 'baja',
    portfolioValue: 2100000,
    phone: '33-4567-8901',
    email: 'ventas@global.com'
}, {
    id: 5,
    name: 'SecureBank',
    currentProducts: ['TDC', 'Seguros'],
    missingProducts: ['TPV', 'Nómina'],
    lastContact: '2025-01-15',
    priority: 'alta',
    portfolioValue: 950000,
    phone: '33-5678-9012',
    email: 'contacto@securebank.com'
}, {
    id: 6,
    name: 'Retail Plus',
    currentProducts: ['TPV', 'Nómina', 'Seguros'],
    missingProducts: ['TDC'],
    lastContact: '2025-01-18',
    priority: 'media',
    portfolioValue: 780000,
    phone: '33-6789-0123',
    email: 'info@retailplus.com'
}, {
    id: 7,
    name: 'Logistics Pro',
    currentProducts: ['TDC', 'TPV'],
    missingProducts: ['Nómina', 'Seguros'],
    lastContact: '2025-01-23',
    priority: 'alta',
    portfolioValue: 1100000,
    phone: '33-7890-1234',
    email: 'ventas@logisticspro.com'
}, {
    id: 8,
    name: 'DataCorp',
    currentProducts: ['TDC', 'TPV', 'Nómina'],
    missingProducts: ['Seguros'],
    lastContact: '2025-01-22',
    priority: 'media',
    portfolioValue: 920000,
    phone: '33-8901-2345',
    email: 'contacto@datacorp.com'
}, {
    id: 9,
    name: 'Marketing Agency',
    currentProducts: ['TDC', 'Seguros'],
    missingProducts: ['TPV', 'Nómina'],
    lastContact: '2025-01-19',
    priority: 'alta',
    portfolioValue: 680000,
    phone: '33-9012-3456',
    email: 'info@marketingagency.com'
}, {
    id: 10,
    name: 'Enterprise Co',
    currentProducts: ['TDC', 'TPV', 'Nómina', 'Seguros'],
    missingProducts: [],
    lastContact: '2025-01-24',
    priority: 'baja',
    portfolioValue: 1850000,
    phone: '33-0123-4567',
    email: 'ventas@enterprise.com'
}, {
    id: 11,
    name: 'Manufacturing Inc',
    currentProducts: ['TPV'],
    missingProducts: ['TDC', 'Nómina', 'Seguros'],
    lastContact: '2025-01-16',
    priority: 'alta',
    portfolioValue: 750000,
    phone: '33-1234-5679',
    email: 'contacto@manufacturing.com'
}, {
    id: 12,
    name: 'Services Group',
    currentProducts: ['TDC', 'Nómina'],
    missingProducts: ['TPV', 'Seguros'],
    lastContact: '2025-01-21',
    priority: 'media',
    portfolioValue: 890000,
    phone: '33-2345-6780',
    email: 'info@servicesgroup.com'
}, {
    id: 13,
    name: 'Education Plus',
    currentProducts: ['TDC', 'TPV', 'Nómina', 'Seguros'],
    missingProducts: [],
    lastContact: '2025-01-26',
    priority: 'baja',
    portfolioValue: 1650000,
    phone: '33-3456-7891',
    email: 'ventas@educationplus.com'
}, {
    id: 14,
    name: 'Digital Media',
    currentProducts: ['TDC'],
    missingProducts: ['TPV', 'Nómina', 'Seguros'],
    lastContact: '2025-01-17',
    priority: 'alta',
    portfolioValue: 720000,
    phone: '33-4567-8902',
    email: 'contacto@digitalmedia.com'
}, {
    id: 15,
    name: 'Finance Corp',
    currentProducts: ['TDC', 'TPV', 'Seguros'],
    missingProducts: ['Nómina'],
    lastContact: '2025-01-20',
    priority: 'media',
    portfolioValue: 1380000,
    phone: '33-5678-9013',
    email: 'info@financecorp.com'
}];

// Datos de ejemplo para las oportunidades
const opportunities = [{
    id: 1,
    name: 'Implementación Sistema ERP',
    client: 'Tech Solutions S.A.',
    productFamily: 'TDC',
    status: 'negociacion',
    amount: 450000,
    closeDate: '2025-11-15',
    probability: 75,
    timbrado: false,
    comments: ''
}, {
    id: 2,
    name: 'Consultoría Digital',
    client: 'Innovate Corp',
    productFamily: 'TDCE',
    status: 'propuesta',
    amount: 280000,
    closeDate: '2025-11-20',
    probability: 60,
    timbrado: false,
    comments: ''
}, {
    id: 3,
    name: 'Desarrollo App Móvil',
    client: 'StartUp Labs',
    productFamily: 'TPV',
    status: 'calificacion',
    amount: 150000,
    closeDate: '2025-12-01',
    probability: 40,
    timbrado: false,
    comments: ''
}, {
    id: 4,
    name: 'Migración a la Nube',
    client: 'Global Industries',
    productFamily: 'Nómina',
    status: 'cerrada',
    amount: 620000,
    closeDate: '2025-10-30',
    probability: 100,
    timbrado: true,
    comments: 'Cliente muy satisfecho con el resultado'
}, {
    id: 5,
    name: 'Auditoría de Seguridad',
    client: 'SecureBank',
    productFamily: 'Seguros',
    status: 'no_contactado',
    amount: 95000,
    closeDate: '2025-12-15',
    probability: 25,
    timbrado: false,
    comments: ''
}, {
    id: 6,
    name: 'Plataforma E-commerce',
    client: 'Retail Plus',
    productFamily: 'Crédito de auto',
    status: 'negociacion',
    amount: 380000,
    closeDate: '2025-11-25',
    probability: 70,
    timbrado: false,
    comments: ''
}, {
    id: 7,
    name: 'Sistema de Gestión',
    client: 'Logistics Pro',
    productFamily: 'Crédito hipotecario',
    status: 'propuesta',
    amount: 225000,
    closeDate: '2025-11-30',
    probability: 55,
    timbrado: false,
    comments: ''
}, {
    id: 8,
    name: 'Integración APIs',
    client: 'DataCorp',
    productFamily: 'TDC',
    status: 'cerrada',
    amount: 180000,
    closeDate: '2025-10-25',
    probability: 100,
    timbrado: true,
    comments: 'Proyecto completado exitosamente'
}, {
    id: 9,
    name: 'Dashboard Analytics',
    client: 'Marketing Agency',
    productFamily: 'TDCE',
    status: 'calificacion',
    amount: 125000,
    closeDate: '2025-12-10',
    probability: 45,
    timbrado: false,
    comments: ''
}, {
    id: 10,
    name: 'Renovación Licencias',
    client: 'Enterprise Co',
    productFamily: 'TPV',
    status: 'descartada',
    amount: 75000,
    closeDate: '2025-11-05',
    probability: 0,
    timbrado: false,
    comments: 'Cliente optó por otra solución'
}, {
    id: 11,
    name: 'Automatización Procesos',
    client: 'Manufacturing Inc',
    productFamily: 'Nómina',
    status: 'negociacion',
    amount: 520000,
    closeDate: '2025-11-28',
    probability: 80,
    timbrado: false,
    comments: ''
}, {
    id: 12,
    name: 'Portal Cliente',
    client: 'Services Group',
    productFamily: 'Seguros',
    status: 'propuesta',
    amount: 195000,
    closeDate: '2025-12-05',
    probability: 50,
    timbrado: false,
    comments: ''
}, {
    id: 13,
    name: 'Capacitación Digital',
    client: 'Education Plus',
    productFamily: 'Crédito de auto',
    status: 'no_contactado',
    amount: 85000,
    closeDate: '2025-12-20',
    probability: 30,
    timbrado: false,
    comments: ''
}, {
    id: 14,
    name: 'Sistema CRM Custom',
    client: 'Sales Experts',
    productFamily: 'Crédito hipotecario',
    status: 'cerrada',
    amount: 410000,
    closeDate: '2025-10-28',
    probability: 100,
    timbrado: true,
    comments: 'Proyecto finalizado con éxito'
}, {
    id: 15,
    name: 'Optimización Web',
    client: 'Digital Media',
    productFamily: 'TDC',
    status: 'calificacion',
    amount: 110000,
    closeDate: '2025-12-08',
    probability: 35,
    timbrado: false,
    comments: ''
}, {
    id: 16,
    name: 'Infraestructura IT',
    client: 'Finance Corp',
    productFamily: 'TDCE',
    status: 'negociacion',
    amount: 680000,
    closeDate: '2025-11-22',
    probability: 85,
    timbrado: false,
    comments: ''
}, {
    id: 17,
    name: 'Business Intelligence',
    client: 'Analytics Pro',
    productFamily: 'TPV',
    status: 'propuesta',
    amount: 340000,
    closeDate: '2025-11-18',
    probability: 65,
    timbrado: false,
    comments: ''
}, {
    id: 18,
    name: 'Soporte Técnico Anual',
    client: 'Tech Partners',
    productFamily: 'Nómina',
    status: 'descartada',
    amount: 120000,
    closeDate: '2025-11-10',
    probability: 0,
    timbrado: false,
    comments: 'Cliente no interesado'
}, {
    id: 19,
    name: 'Desarrollo Intranet',
    client: 'Corporate Group',
    productFamily: 'Seguros',
    status: 'calificacion',
    amount: 265000,
    closeDate: '2025-12-12',
    probability: 40,
    timbrado: false,
    comments: ''
}, {
    id: 20,
    name: 'Transformación Digital',
    client: 'Traditional Co',
    productFamily: 'Crédito de auto',
    status: 'no_contactado',
    amount: 890000,
    closeDate: '2025-12-18',
    probability: 20,
    timbrado: false,
    comments: ''
}, {
    id: 21,
    name: 'Sistema de Inventario',
    client: 'Warehouse Solutions',
    productFamily: 'Crédito hipotecario',
    status: 'negociacion',
    amount: 310000,
    closeDate: '2025-11-27',
    probability: 75,
    timbrado: false,
    comments: ''
}, {
    id: 22,
    name: 'App de Servicios',
    client: 'Customer First',
    productFamily: 'TDC',
    status: 'propuesta',
    amount: 175000,
    closeDate: '2025-12-03',
    probability: 60,
    timbrado: false,
    comments: ''
}, {
    id: 23,
    name: 'Rediseño UX/UI',
    client: 'Design Studio',
    productFamily: 'TDCE',
    status: 'cerrada',
    amount: 145000,
    closeDate: '2025-10-26',
    probability: 100,
    timbrado: true,
    comments: 'Rediseño completado satisfactoriamente'
}, {
    id: 24,
    name: 'Proyecto IoT',
    client: 'Smart Industries',
    productFamily: 'TPV',
    status: 'calificacion',
    amount: 725000,
    closeDate: '2025-12-15',
    probability: 45,
    timbrado: false,
    comments: ''
}, {
    id: 25,
    name: 'Sistema de Reportes',
    client: 'Data Insights',
    productFamily: 'Nómina',
    status: 'descartada',
    amount: 95000,
    closeDate: '2025-11-08',
    probability: 0,
    timbrado: false,
    comments: 'Presupuesto no aprobado'
}, {
    id: 26,
    name: 'Nueva Implementación',
    client: 'Tech Solutions S.A.',
    productFamily: 'TDCE',
    status: 'propuesta',
    amount: 320000,
    closeDate: '2025-12-10',
    probability: 55,
    timbrado: false,
    comments: ''
}, {
    id: 27,
    name: 'Plataforma Web',
    client: 'Innovate Corp',
    productFamily: 'TPV',
    status: 'calificacion',
    amount: 180000,
    closeDate: '2025-12-18',
    probability: 40,
    timbrado: false,
    comments: ''
}];

// Estado de la aplicación
let currentPage = 1;
const itemsPerPage = 10;
let filteredOpportunities = [...opportunities];
let currentOpportunityId = null; // ID de la oportunidad actualmente visualizada

// Variables para el ordenamiento
let currentSortColumn = null;
let currentSortDirection = 'none'; // 'none', 'asc', 'desc'

// Mapeo de estados
const statusLabels = {
    no_contactado: 'No contactado',
    calificacion: 'Calificación',
    propuesta: 'Propuesta',
    negociacion: 'Negociación',
    cerrada: 'Cerrada',
    descartada: 'Descartada'
};

// Lista de todos los productos disponibles
const allProducts = ['TDC', 'TDCE', 'TPV', 'Nómina', 'Seguros', 'Crédito de auto', 'Crédito hipotecario'];

// Productos preautorizados por cliente
const clientProductsData = {
    'Tech Solutions S.A.': {
        actuales: ['TDC'],
        preautorizados: ['TDCE', 'TPV', 'Nómina']
    },
    'Innovate Corp': {
        actuales: ['TDCE'],
        preautorizados: ['TDC', 'Seguros', 'TPV']
    },
    'StartUp Labs': {
        actuales: ['TPV'],
        preautorizados: ['TDC', 'Nómina']
    },
    'Global Industries': {
        actuales: ['Nómina'],
        preautorizados: ['TDCE', 'Seguros', 'TPV']
    },
    'SecureBank': {
        actuales: ['Seguros'],
        preautorizados: ['TDC', 'TDCE', 'Crédito hipotecario']
    },
    'Retail Plus': {
        actuales: ['Crédito de auto'],
        preautorizados: ['TPV', 'TDC', 'Seguros']
    },
    'Logistics Pro': {
        actuales: ['Crédito hipotecario'],
        preautorizados: ['TPV', 'Nómina']
    },
    'DataCorp': {
        actuales: ['TDC'],
        preautorizados: ['TDCE', 'Seguros']
    },
    'Marketing Agency': {
        actuales: ['TDCE'],
        preautorizados: ['TDC', 'TPV']
    },
    'Enterprise Co': {
        actuales: ['TPV'],
        preautorizados: ['Nómina', 'Seguros']
    },
    'Manufacturing Inc': {
        actuales: ['Nómina'],
        preautorizados: ['TDCE', 'TPV', 'Seguros']
    },
    'Services Group': {
        actuales: ['Seguros'],
        preautorizados: ['TDC', 'TPV', 'Nómina']
    },
    'Education Plus': {
        actuales: ['Crédito de auto'],
        preautorizados: ['TDC', 'Seguros']
    },
    'Sales Experts': {
        actuales: ['Crédito hipotecario'],
        preautorizados: ['TDCE', 'Nómina']
    },
    'Digital Media': {
        actuales: ['TDC'],
        preautorizados: ['TDCE', 'TPV']
    },
    'Finance Corp': {
        actuales: ['TDCE'],
        preautorizados: ['TDC', 'Seguros', 'Crédito hipotecario']
    },
    'Analytics Pro': {
        actuales: ['TPV'],
        preautorizados: ['TDCE', 'Nómina']
    },
    'Tech Partners': {
        actuales: ['Nómina'],
        preautorizados: ['TDCE', 'Seguros']
    },
    'Corporate Group': {
        actuales: ['Seguros'],
        preautorizados: ['TDC', 'TDCE', 'Nómina']
    },
    'Traditional Co': {
        actuales: ['Crédito de auto'],
        preautorizados: ['TDC', 'Seguros', 'Crédito hipotecario']
    },
    'Warehouse Solutions': {
        actuales: ['Crédito hipotecario'],
        preautorizados: ['TPV', 'Nómina', 'TDCE']
    },
    'Customer First': {
        actuales: ['TDC'],
        preautorizados: ['TPV', 'Seguros']
    },
    'Design Studio': {
        actuales: ['TDCE'],
        preautorizados: ['TDC', 'TPV', 'Nómina']
    },
    'Smart Industries': {
        actuales: ['TPV'],
        preautorizados: ['TDCE', 'Nómina', 'Seguros']
    },
    'Data Insights': {
        actuales: ['Nómina'],
        preautorizados: ['TDCE', 'TPV']
    }
};

// Descripciones de ventas por producto
const productDescriptions = {
    'TDC': {
        intro: 'Ofrécele al cliente nuestra Tarjeta de Crédito que cuenta con los siguientes beneficios exclusivos:',
        beneficios: [
            'Línea de crédito flexible desde $10,000 hasta $500,000 MXN',
            'Tasa de interés preferencial competitiva en el mercado',
            'Sin anualidad el primer año para nuevos clientes',
            'Programa de recompensas con cashback del 2% en todas las compras',
            'Acceso a meses sin intereses en comercios afiliados',
            'Seguros incluidos: fraude, robo y protección de compras',
            'App móvil para control total de gastos y pagos en tiempo real'
        ],
        destacado: 'Ideal para empresas que buscan administrar gastos corporativos con control total y beneficios adicionales.'
    },
    'TDCE': {
        intro: 'Ofrécele al cliente nuestra Tarjeta de Crédito Empresarial que tiene los siguientes beneficios diseñados para su negocio:',
        beneficios: [
            'Línea de crédito corporativa desde $50,000 hasta $2,000,000 MXN',
            'Tarjetas adicionales sin costo para empleados autorizados',
            'Control de gastos por departamento o proyecto',
            'Reportes detallados y conciliación automática con sistemas contables',
            'Hasta 45 días de crédito sin intereses',
            'Programa de puntos canjeables por viajes de negocios',
            'Ejecutivo de cuenta dedicado para atención personalizada'
        ],
        destacado: 'Perfecto para empresas medianas y grandes que necesitan optimizar el flujo de efectivo y controlar gastos operativos.'
    },
    'TPV': {
        intro: 'Ofrécele al cliente nuestra Terminal Punto de Venta que cuenta con los siguientes beneficios tecnológicos:',
        beneficios: [
            'Acepta todos los métodos de pago: tarjetas, contactless, códigos QR y wallets digitales',
            'Comisiones competitivas desde 1.9% por transacción',
            'Depósitos inmediatos o en 24 horas según preferencia',
            'Terminal portátil con conectividad WiFi, 3G/4G y Bluetooth',
            'Dashboard web con reportes de ventas en tiempo real',
            'Facturación electrónica integrada (CFDI 4.0)',
            'Soporte técnico 24/7 y reposición inmediata en caso de falla'
        ],
        destacado: 'Solución completa para comercios que desean modernizar sus operaciones y ofrecer múltiples formas de pago a sus clientes.'
    },
    'Nómina': {
        intro: 'Ofrécele al cliente nuestro servicio de Dispersión de Nómina que tiene los siguientes beneficios para su empresa:',
        beneficios: [
            'Dispersión automática sin costo por transferencia',
            'Tarjetas de débito sin comisiones para todos los empleados',
            'Plataforma web para carga de nómina de manera simple y segura',
            'Integración con principales sistemas de RH (SAP, Oracle, Nominax)',
            'Adelanto de nómina disponible para empleados',
            'Portal de empleado para consultar recibos de nómina digitales',
            'Servicio de domiciliación gratuito para pagos recurrentes'
        ],
        destacado: 'Ideal para empresas que buscan simplificar el proceso de pago de nómina, reducir costos administrativos y ofrecer beneficios a sus colaboradores.'
    },
    'Seguros': {
        intro: 'Ofrécele al cliente nuestras soluciones de Seguros que cuentan con los siguientes beneficios de protección:',
        beneficios: [
            'Cobertura integral: vida, gastos médicos mayores, auto, hogar y negocios',
            'Primas competitivas con descuentos por contratación de múltiples pólizas',
            'Asesor de seguros personalizado sin costo adicional',
            'Proceso de reclamación digital rápido y sencillo',
            'Red de médicos y talleres afiliados en toda la república',
            'Asistencia 24/7 en todo el país',
            'Renovación automática con ajustes anuales justos'
        ],
        destacado: 'Protección completa para personas y empresas que valoran la seguridad de su patrimonio y bienestar familiar.'
    },
    'Crédito de auto': {
        intro: 'Ofrécele al cliente nuestro Crédito Automotriz que cuenta con los siguientes beneficios para adquirir su vehículo:',
        beneficios: [
            'Financiamiento hasta el 90% del valor del vehículo nuevo o seminuevo',
            'Plazo flexible de 12 a 60 meses según capacidad de pago',
            'Tasa de interés preferencial fija durante toda la vigencia del crédito',
            'Pre-aprobación en menos de 24 horas con mínimos requisitos',
            'Seguro de auto incluido con cobertura amplia',
            'Sin penalización por pago anticipado total o parcial',
            'Convenios con agencias para descuentos exclusivos'
        ],
        destacado: 'Excelente opción para clientes que desean estrenar auto con pagos cómodos y tasas competitivas del mercado.'
    },
    'Crédito hipotecario': {
        intro: 'Ofrécele al cliente nuestro Crédito Hipotecario que tiene los siguientes beneficios para hacer realidad el sueño de su casa:',
        beneficios: [
            'Financiamiento hasta el 90% del valor de la propiedad',
            'Plazo de hasta 20 años con pagos fijos mensuales',
            'Tasa de interés competitiva fija o variable según preferencia',
            'Aplica para compra de casa nueva, usada, terreno o construcción',
            'Gastos notariales y de avalúo incluidos en el crédito',
            'Asesoría legal y notarial sin costo durante el proceso',
            'Posibilidad de usar Infonavit o subsidios gubernamentales como enganche'
        ],
        destacado: 'La mejor alternativa para familias que buscan adquirir patrimonio con un financiamiento seguro y condiciones favorables a largo plazo.'
    }
};

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

// Formatear moneda
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('es-MX');
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// ============================================
// INDICADORES Y ESTADÍSTICAS
// ============================================

// Actualizar indicadores
function updateIndicators() {
    const openOpp = opportunities.filter(o => ['no_contactado', 'calificacion', 'propuesta', 'negociacion'].includes(o.status)).length;

    const closedOpp = opportunities.filter(o => o.status === 'cerrada').length;
    const rejectedOpp = opportunities.filter(o => o.status === 'descartada').length;

    const managedAmount = opportunities
        .filter(o => o.status === 'cerrada')
        .reduce((sum, o) => sum + o.amount, 0);

    const pendingAmount = opportunities
        .filter(o => ['no_contactado', 'calificacion', 'propuesta', 'negociacion'].includes(o.status))
        .reduce((sum, o) => sum + o.amount, 0);

    const rejectedAmount = opportunities
        .filter(o => o.status === 'descartada')
        .reduce((sum, o) => sum + o.amount, 0);

    document.getElementById('openOpportunities').textContent = openOpp;
    document.getElementById('closedOpportunities').textContent = closedOpp;
    document.getElementById('rejectedOpportunities').textContent = rejectedOpp;
    document.getElementById('totalOpportunities').textContent = opportunities.length;

    document.getElementById('managedAmount').textContent = formatCurrency(managedAmount);
    document.getElementById('pendingAmount').textContent = formatCurrency(pendingAmount);
    document.getElementById('rejectedAmount').textContent = formatCurrency(rejectedAmount);

    // Actualizar indicadores de timbrados
    updateTimbradosIndicators();
}

// Actualizar indicadores de timbrados por producto
function updateTimbradosIndicators() {
    const productos = {
        'TDC': {
            timbrado: 0,
            porTimbrar: 0
        },
        'TDCE': {
            timbrado: 0,
            porTimbrar: 0
        },
        'TPV': {
            timbrado: 0,
            porTimbrar: 0
        },
        'Nómina': {
            timbrado: 0,
            porTimbrar: 0
        },
        'Seguros': {
            timbrado: 0,
            porTimbrar: 0
        },
        'Crédito de auto': {
            timbrado: 0,
            porTimbrar: 0
        },
        'Crédito hipotecario': {
            timbrado: 0,
            porTimbrar: 0
        }
    };

    opportunities.forEach(opp => {
        if (productos[opp.productFamily]) {
            if (opp.timbrado) {
                productos[opp.productFamily].timbrado++;
            } else {
                productos[opp.productFamily].porTimbrar++;
            }
        }
    });

    document.getElementById('timbradoTDC').textContent = productos['TDC'].timbrado;
    document.getElementById('porTimbrarTDC').textContent = productos['TDC'].porTimbrar;

    document.getElementById('timbradoTDCE').textContent = productos['TDCE'].timbrado;
    document.getElementById('porTimbrarTDCE').textContent = productos['TDCE'].porTimbrar;

    document.getElementById('timbradoTPV').textContent = productos['TPV'].timbrado;
    document.getElementById('porTimbrarTPV').textContent = productos['TPV'].porTimbrar;

    document.getElementById('timbradoNomina').textContent = productos['Nómina'].timbrado;
    document.getElementById('porTimbrarNomina').textContent = productos['Nómina'].porTimbrar;

    document.getElementById('timbradoSeguros').textContent = productos['Seguros'].timbrado;
    document.getElementById('porTimbrarSeguros').textContent = productos['Seguros'].porTimbrar;

    document.getElementById('timbradoAuto').textContent = productos['Crédito de auto'].timbrado;
    document.getElementById('porTimbrarAuto').textContent = productos['Crédito de auto'].porTimbrar;

    document.getElementById('timbradoHipotecario').textContent = productos['Crédito hipotecario'].timbrado;
    document.getElementById('porTimbrarHipotecario').textContent = productos['Crédito hipotecario'].porTimbrar;
}

// Toggle acordeón
function toggleAccordion() {
    const content = document.getElementById('timbradosContent');
    const icon = document.getElementById('accordionIcon');

    content.classList.toggle('active');
    icon.classList.toggle('rotated');
}

// ============================================
// TABLA Y PAGINACIÓN
// ============================================

// Renderizar tabla
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredOpportunities.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--color-text-light);">' +
            'No se encontraron oportunidades</td></tr>';
        return;
    }

    pageData.forEach(function(opp) {
        const row = document.createElement('tr');
        const timbradoText = opp.timbrado ? 'Timbrado' : 'No timbrado';
        row.innerHTML = '<td>' + opp.client + '</td>' +
            '<td><span class="product-family-badge">' + opp.productFamily + '</span></td>' +
            '<td><span class="status-badge ' + opp.status + '">' + statusLabels[opp.status] + '</span></td>' +
            '<td>' + timbradoText + '</td>' +
            '<td>' + formatCurrency(opp.amount) + '</td>' +
            '<td>' + formatDate(opp.closeDate) + '</td>' +
            '<td><button class="btn-action" onclick="viewOpportunity(' + opp.id + ')">Ver</button></td>';
        tableBody.appendChild(row);
    });

    updatePagination();
}

// Actualizar paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);

    // Actualizar información
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('totalRecords').textContent = filteredOpportunities.length;

    // Actualizar selector de páginas
    const pageSelect = document.getElementById('pageSelect');
    pageSelect.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentPage) {
            option.selected = true;
        }
        pageSelect.appendChild(option);
    }

    // Actualizar botones
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
}

// Ir a página específica
function goToPage(page) {
    const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
    }
}

// Función para ordenar la tabla
function sortTable(column) {
    // Si es la misma columna, cambiar dirección
    if (currentSortColumn === column) {
        if (currentSortDirection === 'none') {
            currentSortDirection = 'desc';
        } else if (currentSortDirection === 'desc') {
            currentSortDirection = 'asc';
        } else {
            currentSortDirection = 'none';
        }
    } else {
        // Si es una columna nueva, empezar con descendente
        currentSortColumn = column;
        currentSortDirection = 'desc';
    }

    // Actualizar íconos
    updateSortIcons();

    // Ordenar las oportunidades filtradas
    if (currentSortDirection === 'none') {
        // Restaurar orden original
        applyFilters();
    } else {
        filteredOpportunities.sort((a, b) => {
            let valueA, valueB;

            if (column === 'amount') {
                valueA = a.amount;
                valueB = b.amount;
            } else if (column === 'closeDate') {
                valueA = new Date(a.closeDate);
                valueB = new Date(b.closeDate);
            }

            if (currentSortDirection === 'asc') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });

        // Reiniciar a la primera página después de ordenar
        currentPage = 1;
        renderTable();
    }
}

// Actualizar íconos de ordenamiento
function updateSortIcons() {
    // Resetear todos los íconos
    document.getElementById('sortIconAmount').textContent = '⇅';
    document.getElementById('sortIconCloseDate').textContent = '⇅';

    // Actualizar el ícono de la columna actual
    if (currentSortColumn && currentSortDirection !== 'none') {
        const iconId = currentSortColumn === 'amount' ? 'sortIconAmount' : 'sortIconCloseDate';
        const icon = document.getElementById(iconId);

        if (currentSortDirection === 'desc') {
            icon.textContent = '↓';
        } else if (currentSortDirection === 'asc') {
            icon.textContent = '↑';
        }
    }
}

// ============================================
// FILTROS
// ============================================

// Aplicar filtros
function applyFilters() {
    const statusFilter = document.getElementById('filterStatus').value.toLowerCase();
    const productFamilyFilter = document.getElementById('filterProductFamily').value;
    const timbradoFilter = document.getElementById('filterTimbrado').value;
    const searchFilter = document.getElementById('filterSearch').value.toLowerCase();

    filteredOpportunities = opportunities.filter(opp => {
        const matchesStatus = !statusFilter || opp.status === statusFilter;
        const matchesProductFamily = !productFamilyFilter || opp.productFamily === productFamilyFilter;
        const matchesTimbrado = !timbradoFilter || opp.timbrado === (timbradoFilter === 'true');
        const matchesSearch = !searchFilter ||
            opp.client.toLowerCase().includes(searchFilter);

        return matchesStatus && matchesProductFamily && matchesTimbrado && matchesSearch;
    });

    currentPage = 1;
    renderTable();
}

// Limpiar filtros
function clearFilters() {
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterProductFamily').value = '';
    document.getElementById('filterTimbrado').value = '';
    document.getElementById('filterSearch').value = '';
    filteredOpportunities = [...opportunities];
    currentPage = 1;

    // Resetear ordenamiento
    currentSortColumn = null;
    currentSortDirection = 'none';
    updateSortIcons();

    renderTable();
}

// ============================================
// MODALES
// ============================================

// Cambiar entre pestañas del modal
function switchTab(tabName) {
    // Remover clase active de todos los tabs y contenidos
    document.querySelectorAll('.modal-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activar el tab y contenido seleccionado
    event.target.classList.add('active');

    if (tabName === 'detalle') {
        document.getElementById('tabDetalle').classList.add('active');
    } else if (tabName === 'otras') {
        document.getElementById('tabOtras').classList.add('active');
        loadOtrasOportunidades();
    } else if (tabName === 'ventacruzada') {
        document.getElementById('tabVentaCruzada').classList.add('active');
        loadVentaCruzada();
    }
}

// Cargar otras oportunidades del mismo cliente
function loadOtrasOportunidades() {
    if (!currentOpportunityId) return;

    const currentOpp = opportunities.find(o => o.id === currentOpportunityId);
    if (!currentOpp) return;

    const otrasOpp = opportunities.filter(o => o.client === currentOpp.client && o.id !== currentOpportunityId);
    const container = document.getElementById('otrasOportunidadesContainer');

    if (otrasOpp.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-light); text-align: center; padding: 2rem;">No hay otras oportunidades para este cliente</p>';
        return;
    }

    container.innerHTML = '<div class="otras-opp-list">' +
        otrasOpp.map(function(opp) {
            return '<div class="otra-opp-item">' +
                '<div class="otra-opp-header">' +
                '<span class="otra-opp-product">' + opp.productFamily + '</span>' +
                '<span class="status-badge ' + opp.status + '">' + statusLabels[opp.status] + '</span>' +
                '</div>' +
                '<div class="otra-opp-details">' +
                '<div><strong>Monto:</strong> ' + formatCurrency(opp.amount) + '</div>' +
                '<div><strong>Cierre:</strong> ' + formatDate(opp.closeDate) + '</div>' +
                '<div><strong>Timbrado:</strong> ' + (opp.timbrado ? 'Sí' : 'No') + '</div>' +
                '</div></div>';
        }).join('') +
        '</div>';
}

// Ver oportunidad en modal
function viewOpportunity(id) {
    const opp = opportunities.find(o => o.id === id);
    if (!opp) return;

    currentOpportunityId = id;

    // Generar datos de contacto simulados
    const clientId = '14' + String(id).padStart(6, '0');
    const phone = '33-' + Math.floor(1000 + Math.random() * 8999) + '-' + Math.floor(1000 + Math.random() * 8999);
    const email = opp.client.toLowerCase().replace(/\s+/g, '') + '@empresa.com';

    // Rellenar datos del modal
    document.getElementById('modalClient').textContent = opp.client;
    document.getElementById('modalClientId').textContent = clientId;
    document.getElementById('modalProductFamily').textContent = opp.productFamily;

    // Estado como select editable
    const statusSelect = document.getElementById('modalStatus');
    statusSelect.value = opp.status;

    document.getElementById('modalAmount').textContent = formatCurrency(opp.amount);
    document.getElementById('modalCloseDate').textContent = formatDate(opp.closeDate);
    document.getElementById('modalPhone').textContent = phone;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalComments').value = opp.comments || '';

    // Cargar descripción de la oferta
    loadProductDescription(opp.productFamily);

    // Resetear a la primera pestaña
    document.querySelectorAll('.modal-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelector('.modal-tab').classList.add('active');
    document.getElementById('tabDetalle').classList.add('active');

    // Mostrar modal
    const modal = document.getElementById('opportunityModal');
    modal.classList.add('active');
}

// Guardar cambios de la oportunidad
function saveOpportunity() {
    if (!currentOpportunityId) return;

    const opp = opportunities.find(o => o.id === currentOpportunityId);
    if (!opp) return;

    const newStatus = document.getElementById('modalStatus').value;
    const newComments = document.getElementById('modalComments').value;

    // Actualizar la oportunidad
    opp.status = newStatus;
    opp.comments = newComments;

    // Solo las oportunidades cerradas pueden estar timbradas
    if (newStatus !== 'cerrada') {
        opp.timbrado = false;
    }

    // Actualizar filtros y tabla
    filteredOpportunities = [...opportunities];
    updateIndicators();
    renderTable();

    // Cerrar modal
    closeModal();

    // Mostrar notificación
    showToast('success', '¡Cambios guardados!', 'La oportunidad ha sido actualizada exitosamente.');
}

// Iniciar WhatsApp
function iniciarWhatsApp() {
    if (!currentOpportunityId) return;

    const opp = opportunities.find(o => o.id === currentOpportunityId);
    if (!opp) return;

    const phone = '523312345678'; // Número simulado
    const message = 'Hola, me comunico respecto a la oportunidad de ' + opp.productFamily + ' por ' + formatCurrency(opp.amount) + '.';
    const whatsappUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

    window.open(whatsappUrl, '_blank');
    showToast('success', 'WhatsApp iniciado', 'Se abrió WhatsApp en una nueva ventana');
}

// Iniciar llamada
function iniciarLlamada() {
    if (!currentOpportunityId) return;

    const phone = '+523312345678'; // Número simulado
    window.location.href = 'tel:' + phone;
    showToast('success', 'Llamada iniciada', 'Se inició la llamada telefónica');
}

// Cargar descripción del producto
function loadProductDescription(productFamily) {
    const description = productDescriptions[productFamily];

    if (!description) {
        document.getElementById('ofertaSection').style.display = 'none';
        return;
    }

    document.getElementById('ofertaSection').style.display = 'block';

    // Intro
    document.getElementById('ofertaIntro').textContent = description.intro;

    // Beneficios
    const beneficiosHTML = '<h5>Beneficios Principales:</h5><ul>' +
        description.beneficios.map(function(beneficio) {
            return '<li>' + beneficio + '</li>';
        }).join('') +
        '</ul><div class="oferta-destacado"><p><strong>💼 Valor agregado:</strong> ' + description.destacado + '</p></div>';

    document.getElementById('ofertaBeneficios').innerHTML = beneficiosHTML;
}

// Cargar análisis de venta cruzada
function loadVentaCruzada() {
    if (!currentOpportunityId) return;

    const currentOpp = opportunities.find(o => o.id === currentOpportunityId);
    if (!currentOpp) return;

    const clientName = currentOpp.client;
    const clientData = clientProductsData[clientName] || {
        actuales: [],
        preautorizados: []
    };

    // Obtener productos que el cliente ya tiene (basado en oportunidades cerradas)
    const productosActuales = [...new Set(
        opportunities
        .filter(o => o.client === clientName && o.status === 'cerrada')
        .map(o => o.productFamily)
    )];

    // Obtener productos en proceso (oportunidades abiertas)
    const productosEnProceso = [...new Set(
        opportunities
        .filter(o => o.client === clientName && o.status !== 'cerrada' && o.status !== 'descartada')
        .map(o => o.productFamily)
    )];

    // Productos preautorizados que no tiene y no están en proceso
    const productosPreautorizados = clientData.preautorizados.filter(
        p => !productosActuales.includes(p) && !productosEnProceso.includes(p)
    );

    // Renderizar productos actuales
    const containerActuales = document.getElementById('productosActuales');
    if (productosActuales.length === 0) {
        containerActuales.innerHTML = '<p style="color: var(--color-text-light); text-align: center;">El cliente aún no tiene productos contratados</p>';
    } else {
        containerActuales.innerHTML = productosActuales.map(function(producto) {
            return '<div class="producto-badge tiene">' + producto + '</div>';
        }).join('');
    }

    // Renderizar productos preautorizados
    const containerPreautorizados = document.getElementById('productosPreautorizados');
    if (productosPreautorizados.length === 0) {
        containerPreautorizados.innerHTML = '<p style="color: var(--color-text-light); text-align: center;">No hay productos preautorizados disponibles en este momento</p>';
    } else {
        containerPreautorizados.innerHTML = productosPreautorizados.map(function(producto) {
            return '<div class="producto-preautorizado">' +
                '<div class="producto-preautorizado-nombre">' + producto + '</div>' +
                '<div class="producto-preautorizado-info">Cliente calificado y apto para este producto</div>' +
                '<button class="btn-generar-oportunidad" onclick="generarOportunidadVentaCruzada(\'' + producto + '\', \'' + clientName + '\')">' +
                '<span>➕</span><span>Generar Oportunidad</span>' +
                '</button></div>';
        }).join('');
    }
}

// Generar oportunidad desde venta cruzada
function generarOportunidadVentaCruzada(productFamily, clientName) {
    // Confirmar acción
    if (!confirm('¿Deseas generar una nueva oportunidad de ' + productFamily + ' para ' + clientName + '?')) {
        return;
    }

    // Crear nueva oportunidad
    const newOpp = {
        id: opportunities.length + 1,
        name: 'Oportunidad ' + clientName,
        client: clientName,
        productFamily: productFamily,
        status: 'no_contactado',
        amount: Math.floor(Math.random() * 400000) + 100000, // Monto aleatorio entre 100k y 500k
        closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días desde hoy
        probability: 50,
        timbrado: false,
        comments: 'Oportunidad generada desde venta cruzada. Cliente preautorizado para ' + productFamily + '.'
    };

    // Agregar a la lista
    opportunities.push(newOpp);

    // Actualizar filtros y tabla
    filteredOpportunities = [...opportunities];
    updateIndicators();
    renderTable();

    // Recargar venta cruzada para actualizar la vista
    loadVentaCruzada();

    // Mostrar notificación
    showToast('success', '¡Oportunidad creada!', 'Se ha creado una nueva oportunidad de ' + productFamily + ' para ' + clientName + '.');
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('opportunityModal');
    modal.classList.remove('active');
}

// ============================================
// ASISTENTE IA - IVAN
// ============================================

// URL del webhook de n8n
const N8N_WEBHOOK_URL = 'https://abrahamnavarrete.app.n8n.cloud/webhook/regio-ia-assistant';

// Historial de conversación
let conversationHistory = [];

// Generar Session ID único
function generateSessionId() {
    // Intentar obtener de localStorage primero
    let sessionId = localStorage.getItem('ivan_session_id');

    if (!sessionId) {
        // Generar nuevo ID: timestamp + random
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('ivan_session_id', sessionId);
    }

    return sessionId;
}

// Session ID para la memoria de n8n (único por sesión de usuario)
const SESSION_ID = generateSessionId();

// Toggle del asistente IA
function toggleAISidebar() {
    const sidebar = document.getElementById('aiSidebar');
    const floatBtn = document.getElementById('aiFloatBtn');

    sidebar.classList.toggle('active');
    floatBtn.classList.toggle('hidden');
}

// Cambiar vista de la barra lateral
function switchSidebarView(view) {
    // Ocultar todas las vistas
    const views = document.querySelectorAll('.sidebar-view');
    views.forEach(v => v.classList.remove('active'));

    // Mostrar la vista seleccionada
    const selectedView = document.getElementById(`view${view.charAt(0).toUpperCase() + view.slice(1)}`);
    if (selectedView) {
        selectedView.classList.add('active');
    }

    // Actualizar botones de navegación
    const navButtons = document.querySelectorAll('.sidebar-nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    const selectedButton = document.getElementById(`nav${view.charAt(0).toUpperCase() + view.slice(1)}`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Si es la vista del cotizador, no hacer nada especial
    // El cotizador ahora es un chat que se inicializa automáticamente
}

// ============================================
// MOTOR DE BÚSQUEDA DE OPORTUNIDADES POR IA
// ============================================

/**
 * Busca oportunidades por múltiples criterios
 * @param {string} query - Texto de búsqueda
 * @returns {Array} - Array de oportunidades que coinciden
 */
function findOpportunitiesByQuery(query) {
    const searchTerm = query.toLowerCase().trim();

    // Si es un número, buscar por ID
    if (!isNaN(searchTerm)) {
        const byId = opportunities.filter(opp => opp.id.toString() === searchTerm);
        if (byId.length > 0) return byId;
    }

    // Buscar por cliente, producto o combinación
    return opportunities.filter(opp => {
        const matchClient = opp.client.toLowerCase().includes(searchTerm);
        const matchProduct = opp.productFamily.toLowerCase().includes(searchTerm);
        const matchStatus = statusLabels[opp.status].toLowerCase().includes(searchTerm);

        return matchClient || matchProduct || matchStatus;
    });
}

// ============================================
// EJECUTOR DE ACCIONES DE LA IA
// ============================================

/**
 * Ejecuta acciones recibidas del asistente IA
 * @param {Array} actions - Array de acciones a ejecutar
 */
async function executeAIActions(actions) {
    if (!actions || actions.length === 0) return;

    let executedActions = 0;
    let actionMessages = [];

    for (const action of actions) {
        try {
            if (action.type === 'update_opportunity') {
                const opp = opportunities.find(o => o.id === action.opportunityId);

                if (opp) {
                    // Aplicar cambios
                    if (action.changes.status) {
                        opp.status = action.changes.status;
                    }
                    if (action.changes.comments !== undefined) {
                        // Si ya tiene comentarios, agregar el nuevo con separador
                        if (opp.comments && opp.comments.trim() !== '') {
                            opp.comments = opp.comments + '\n\n[IA] ' + action.changes.comments;
                        } else {
                            opp.comments = '[IA] ' + action.changes.comments;
                        }
                    }
                    if (action.changes.amount !== undefined) {
                        opp.amount = action.changes.amount;
                    }
                    if (action.changes.closeDate !== undefined) {
                        opp.closeDate = action.changes.closeDate;
                    }
                    if (action.changes.probability !== undefined) {
                        opp.probability = action.changes.probability;
                    }

                    // Solo las oportunidades cerradas pueden estar timbradas
                    if (opp.status !== 'cerrada') {
                        opp.timbrado = false;
                    }

                    executedActions++;
                    actionMessages.push(`Actualizada oportunidad de ${opp.client} (ID: ${opp.id})`);
                }
            } else if (action.type === 'create_opportunity') {
                // Crear nueva oportunidad
                const newOpp = {
                    id: opportunities.length + 1,
                    name: action.data.name || 'Oportunidad ' + action.data.client,
                    client: action.data.client,
                    productFamily: action.data.productFamily,
                    status: action.data.status || 'no_contactado',
                    amount: action.data.amount || 0,
                    closeDate: action.data.closeDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    probability: action.data.probability || 50,
                    timbrado: false,
                    comments: action.data.comments ? '[IA] ' + action.data.comments : ''
                };

                opportunities.push(newOpp);
                executedActions++;
                actionMessages.push(`Creada oportunidad para ${newOpp.client} (ID: ${newOpp.id})`);
            }
        } catch (error) {
            console.error('Error ejecutando acción:', action, error);
        }
    }

    // Actualizar la vista
    if (executedActions > 0) {
        filteredOpportunities = [...opportunities];
        updateIndicators();
        renderTable();

        // Mostrar notificación de éxito
        showToast('success',
            `✓ ${executedActions} acción${executedActions > 1 ? 'es' : ''} ejecutada${executedActions > 1 ? 's' : ''}`,
            actionMessages.join('\n')
        );
    }
}

/**
 * Solicita confirmación al usuario antes de ejecutar acciones
 * @param {Array} actions - Array de acciones a confirmar
 * @returns {Promise<boolean>} - True si el usuario confirma
 */
async function confirmAIActions(actions) {
    if (!actions || actions.length === 0) return false;

    // Construir mensaje de confirmación
    let message = '¿Deseas ejecutar las siguientes acciones?\n\n';

    actions.forEach((action, index) => {
        if (action.type === 'update_opportunity') {
            const opp = opportunities.find(o => o.id === action.opportunityId);
            if (opp) {
                message += `${index + 1}. Actualizar "${opp.client}" (ID: ${opp.id}):\n`;
                if (action.changes.status) {
                    message += `   - Cambiar estado a: ${statusLabels[action.changes.status]}\n`;
                }
                if (action.changes.comments) {
                    message += `   - Agregar comentario: "${action.changes.comments}"\n`;
                }
                if (action.changes.amount) {
                    message += `   - Cambiar monto a: ${formatCurrency(action.changes.amount)}\n`;
                }
            }
        } else if (action.type === 'create_opportunity') {
            message += `${index + 1}. Crear nueva oportunidad:\n`;
            message += `   - Cliente: ${action.data.client}\n`;
            message += `   - Producto: ${action.data.productFamily}\n`;
            message += `   - Monto: ${formatCurrency(action.data.amount || 0)}\n`;
        }
        message += '\n';
    });

    return confirm(message);
}

// Enviar mensaje al asistente
async function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();

    if (!message) return;

    // Añadir mensaje del usuario
    addMessageToChat('user', message);

    // Limpiar input
    input.value = '';
    input.style.height = 'auto';

    // Mostrar indicador de escritura
    showTypingIndicator();

    // Preparar datos para enviar a n8n
    // Eliminar el campo 'name' de las oportunidades
    const opportunitiesWithoutNames = opportunities.map(opp => {
        const {
            name,
            ...oppWithoutName
        } = opp;
        return oppWithoutName;
    });

    const requestData = {
        header: {
            sessionId: SESSION_ID,
            timestamp: new Date().toISOString(),
            currentUser: 'Usuario'
        },
        body: {
            chatInput: message,
            context: {
                opportunities: opportunitiesWithoutNames,
                prospects: prospects,
                portfolioClients: portfolioClients,
                clientProductsData: clientProductsData,
                productDescriptions: productDescriptions,
                conversationHistory: conversationHistory,
                summary: {
                    totalOportunidades: opportunities.length,
                    oportunidadesActivas: opportunities.filter(o => o.status !== 'cerrada').length,
                    valorTotalPipeline: opportunities.reduce((sum, o) => sum + o.amount, 0),
                    totalProspectos: prospects.length,
                    prospectosActivos: prospects.filter(p => !['cerrado', 'descartado'].includes(p.status)).length,
                    totalClientes: portfolioClients.length,
                    clientesCompletos: portfolioClients.filter(c => c.missingProducts.length === 0).length
                }
            }
        }
    };

    try {
        // Enviar petición a n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Error: ' + response.status);
        }

        let data = await response.json();

        // Si n8n devuelve un array, tomar el primer elemento
        if (Array.isArray(data) && data.length > 0) {
            data = data[0];
        }

        // Remover indicador de escritura
        removeTypingIndicator();

        // Añadir respuesta del asistente
        const assistantMessage = data.output || data.response || data.message || 'Lo siento, no pude procesar tu solicitud.';
        addMessageToChat('assistant', assistantMessage);

        // Procesar acciones si existen
        if (data.actions && Array.isArray(data.actions) && data.actions.length > 0) {
            // Solicitar confirmación antes de ejecutar
            const userConfirmed = await confirmAIActions(data.actions);

            if (userConfirmed) {
                // Ejecutar las acciones
                await executeAIActions(data.actions);
            } else {
                // Usuario canceló las acciones
                addMessageToChat('assistant', 'Entendido, he cancelado las acciones solicitadas.');
            }
        }

        // Guardar en historial
        conversationHistory.push({
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
        });
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error al comunicarse con el asistente:', error);

        // Remover indicador de escritura
        removeTypingIndicator();

        // Mostrar mensaje de error
        addErrorMessage('No pude conectarme con el asistente. Por favor, verifica que n8n esté configurado y ejecutándose.');
    }
}

// Añadir mensaje al chat
function addMessageToChat(type, message) {
    const chatContainer = document.getElementById('aiChatContainer');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ' + type;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = '<div class="ai-message-bubble">' + escapeHtml(message) + '</div>' +
        '<div class="ai-message-time">' + timeStr + '</div>';

    chatContainer.appendChild(messageDiv);

    // Scroll al final
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Mostrar indicador de escritura
function showTypingIndicator() {
    const chatContainer = document.getElementById('aiChatContainer');

    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message assistant';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<div class="ai-typing-indicator">' +
        '<div class="ai-typing-dot"></div>' +
        '<div class="ai-typing-dot"></div>' +
        '<div class="ai-typing-dot"></div>' +
        '</div>';

    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Remover indicador de escritura
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Añadir mensaje de error
function addErrorMessage(message) {
    const chatContainer = document.getElementById('aiChatContainer');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'ai-error-message';
    errorDiv.innerHTML = '<p>⚠️ ' + escapeHtml(message) + '</p>';

    chatContainer.appendChild(errorDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Escape HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}

// ============================================
// NOTIFICACIONES Y MODALES ADICIONALES
// ============================================

// Mostrar notificación toast
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠'
    };

    toast.innerHTML = '<span class="toast-icon">' + icons[type] + '</span>' +
        '<div class="toast-content">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-message">' + message + '</div>' +
        '</div>' +
        '<button class="toast-close" onclick="this.parentElement.remove()">×</button>';

    container.appendChild(toast);

    // Auto-remover después de 3 segundos
    setTimeout(function() {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

// Abrir modal de nueva oportunidad
function openNewOpportunityModal() {
    const modal = document.getElementById('newOpportunityModal');
    document.getElementById('newOpportunityForm').reset();
    modal.classList.add('active');
}

// Cerrar modal de nueva oportunidad
function closeNewOpportunityModal() {
    const modal = document.getElementById('newOpportunityModal');
    modal.classList.remove('active');
    document.getElementById('newOpportunityForm').reset();
}

// Guardar nueva oportunidad
function saveNewOpportunity() {
    const form = document.getElementById('newOpportunityForm');

    // Validar formulario
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Obtener valores del formulario
    const clientName = document.getElementById('newOppClient').value;
    const newOpp = {
        id: opportunities.length + 1,
        name: 'Oportunidad ' + clientName,
        client: clientName,
        productFamily: document.getElementById('newOppProductFamily').value,
        status: document.getElementById('newOppStatus').value,
        amount: parseInt(document.getElementById('newOppAmount').value),
        closeDate: document.getElementById('newOppCloseDate').value,
        probability: 50, // Valor por defecto
        timbrado: false // Por defecto no timbrado
    };

    // Agregar a la lista
    opportunities.push(newOpp);

    // Actualizar filtros y tabla
    filteredOpportunities = [...opportunities];
    updateIndicators();
    renderTable();

    // Cerrar modal
    closeNewOpportunityModal();

    // Mostrar notificación
    showToast('success', '¡Oportunidad creada!', 'La oportunidad para "' + clientName + '" ha sido creada exitosamente.');
}

// ============================================
// FUNCIONES DE PROSPECTOS
// ============================================

// Variables para prospectos
let filteredProspects = [...prospects];
let currentProspectPage = 1;
const itemsPerProspectPage = 10;

// Función para mostrar/ocultar secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    if (sectionName === 'reports') {
        document.getElementById('reportsSection').style.display = 'block';
        initializeCharts();
    } else if (sectionName === 'prospects') {
        document.getElementById('prospectsSection').style.display = 'block';
    } else if (sectionName === 'opportunities') {
        document.querySelector('.dashboard').style.display = 'block';
        document.querySelector('.pipeline-section').style.display = 'block';
    } else if (sectionName === 'portfolio') {
        document.getElementById('portfolioSection').style.display = 'block';
        renderPortfolioTable();
    }

    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Marcar como activo el enlace correspondiente
    if (sectionName === 'reports') {
        document.querySelectorAll('.nav-link')[0].classList.add('active');
    } else if (sectionName === 'prospects') {
        document.querySelectorAll('.nav-link')[1].classList.add('active');
    } else if (sectionName === 'opportunities') {
        document.querySelectorAll('.nav-link')[2].classList.add('active');
    } else if (sectionName === 'portfolio') {
        document.querySelectorAll('.nav-link')[3].classList.add('active');
    }
}

// Función para actualizar indicadores de prospectos
function updateProspectIndicators() {
    const noContactados = prospects.filter(p => p.status === 'no_contactado').length;
    const interesados = prospects.filter(p => p.status === 'interesado').length;
    const enConsideracion = prospects.filter(p => p.status === 'en_consideracion').length;
    const documentacion = prospects.filter(p => p.status === 'documentacion').length;
    const cerrados = prospects.filter(p => p.status === 'cerrado').length;
    const descartados = prospects.filter(p => p.status === 'descartado').length;
    const total = prospects.length;

    // Actualizar valores
    document.getElementById('noContactadosProspects').textContent = noContactados;
    document.getElementById('interesadosProspects').textContent = interesados;
    document.getElementById('enConsideracionProspects').textContent = enConsideracion;
    document.getElementById('documentacionProspects').textContent = documentacion;
    document.getElementById('cerradosProspects').textContent = cerrados;
    document.getElementById('descartadosProspects').textContent = descartados;
    document.getElementById('totalProspects').textContent = total;

    // Calcular métricas de conversión
    const prospectosActivos = total - descartados;
    const tasaConversion = total > 0 ? ((cerrados / total) * 100).toFixed(1) : 0;
    const valorPotencial = prospects.reduce((sum, p) => sum + p.amount, 0);
    const valorCerrado = prospects.filter(p => p.status === 'cerrado').reduce((sum, p) => sum + p.amount, 0);

    document.getElementById('prospectosActivos').textContent = prospectosActivos;
    document.getElementById('tasaConversion').textContent = tasaConversion + '%';
    document.getElementById('valorPotencial').textContent = '$' + valorPotencial.toLocaleString();
    document.getElementById('valorCerrado').textContent = '$' + valorCerrado.toLocaleString();
}

// Función para renderizar tabla de prospectos
function renderProspectsTable() {
    const tbody = document.getElementById('prospectsTableBody');
    tbody.innerHTML = '';

    const startIndex = (currentProspectPage - 1) * itemsPerProspectPage;
    const endIndex = startIndex + itemsPerProspectPage;
    const pageProspects = filteredProspects.slice(startIndex, endIndex);

    pageProspects.forEach(prospect => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${prospect.name}</td>
            <td>${prospect.product}</td>
            <td><span class="status-badge status-${prospect.status}">${getStatusLabel(prospect.status)}</span></td>
            <td class="amount-cell">$${prospect.amount.toLocaleString()}</td>
            <td>${formatDate(prospect.contactDate)}</td>
            <td>${prospect.lastContact}</td>
            <td>
                <button class="btn-primary" onclick="viewProspect(${prospect.id})" title="Ver detalles">
                    Ver
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para obtener etiqueta de estado
function getStatusLabel(status) {
    const labels = {
        'no_contactado': 'No Contactado',
        'interesado': 'Interesado',
        'en_consideracion': 'En Consideración',
        'documentacion': 'Documentación',
        'cerrado': 'Cerrado',
        'descartado': 'Descartado'
    };
    return labels[status] || status;
}

// Función para aplicar filtros de prospectos
function applyProspectFilters() {
    const statusFilter = document.getElementById('filterProspectStatus').value;
    const productFilter = document.getElementById('filterProspectProduct').value;
    const searchFilter = document.getElementById('filterProspectSearch').value.toLowerCase();

    filteredProspects = prospects.filter(prospect => {
        const matchesStatus = !statusFilter || prospect.status === statusFilter;
        const matchesProduct = !productFilter || prospect.product === productFilter;
        const matchesSearch = !searchFilter ||
            prospect.name.toLowerCase().includes(searchFilter) ||
            prospect.company.toLowerCase().includes(searchFilter);

        return matchesStatus && matchesProduct && matchesSearch;
    });

    currentProspectPage = 1;
    renderProspectsTable();
}

// Función para limpiar filtros de prospectos
function clearProspectFilters() {
    document.getElementById('filterProspectStatus').value = '';
    document.getElementById('filterProspectProduct').value = '';
    document.getElementById('filterProspectSearch').value = '';
    applyProspectFilters();
}

// Función para ordenar tabla de prospectos
function sortProspectsTable(column) {
    // Implementar lógica de ordenamiento similar a la tabla de oportunidades
    console.log('Ordenando tabla de prospectos por:', column);
}

// Funciones para el modal de prospectos
function viewProspect(id) {
    const prospect = prospects.find(p => p.id === id);
    if (!prospect) return;

    // Almacenar ID del prospecto actual
    currentProspectId = id;

    // Llenar información del modal
    document.getElementById('prospectModalTitle').textContent = `Detalle de Prospecto - ${prospect.name}`;
    document.getElementById('prospectName').textContent = prospect.name;
    document.getElementById('prospectPhoneDisplay').textContent = prospect.phone;
    document.getElementById('prospectProduct').textContent = prospect.product;
    document.getElementById('prospectStatus').value = prospect.status;
    document.getElementById('prospectAmount').textContent = '$' + prospect.amount.toLocaleString();
    document.getElementById('prospectPhone').textContent = prospect.phone;
    document.getElementById('prospectEmail').textContent = prospect.email;
    document.getElementById('prospectContactDate').textContent = formatDate(prospect.contactDate);
    document.getElementById('prospectLastContact').textContent = prospect.lastContact;
    document.getElementById('prospectComments').value = prospect.comments || '';

    // Mostrar modal
    const modal = document.getElementById('prospectModal');
    modal.classList.add('active');
}

function closeProspectModal() {
    const modal = document.getElementById('prospectModal');
    modal.classList.remove('active');
}

function switchProspectTab(tabName) {
    // Remover clase active de todos los tabs y contenidos
    document.querySelectorAll('#prospectModal .modal-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#prospectModal .tab-content').forEach(content => content.classList.remove('active'));

    // Activar el tab seleccionado
    document.querySelector(`#prospectModal .modal-tab[onclick="switchProspectTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`prospectTab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
}

function saveProspect() {
    // Obtener el ID del prospecto actual (necesitarías almacenarlo en una variable global)
    const prospectId = currentProspectId;
    const prospect = prospects.find(p => p.id === prospectId);

    if (prospect) {
        // Actualizar datos del prospecto
        prospect.status = document.getElementById('prospectStatus').value;
        prospect.comments = document.getElementById('prospectComments').value;

        // Actualizar indicadores y tabla
        updateProspectIndicators();
        renderProspectsTable();

        // Cerrar modal
        closeProspectModal();

        // Mostrar notificación
        showToast('success', '¡Prospecto actualizado!', 'La información del prospecto ha sido guardada exitosamente.');
    }
}

function iniciarWhatsAppProspect() {
    const phone = document.getElementById('prospectPhone').textContent;
    const message = encodeURIComponent('Hola, te contacto desde el CRM para seguir con la conversación sobre nuestros servicios.');
    window.open(`https://wa.me/52${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
}

function iniciarLlamadaProspect() {
    const phone = document.getElementById('prospectPhone').textContent;
    window.open(`tel:${phone}`, '_self');
}

// Variable para almacenar el ID del prospecto actual
let currentProspectId = null;

function editProspect(id) {
    // Esta función ya no se usa, pero la mantengo por compatibilidad
    viewProspect(id);
}

// ============================================
// FUNCIONES DE GRÁFICOS Y REPORTES
// ============================================

// ============================================
// FUNCIONES DE MI CARTERA
// ============================================

// ============================================
// COTIZADOR DE CRÉDITOS
// ============================================

// Tasas de interés por tipo de crédito y plazo
const tasasCredito = {
    personal: {
        12: 18.5, // 18.5% anual
        24: 19.0, // 19.0% anual
        36: 19.5 // 19.5% anual
    },
    auto: {
        12: 12.5, // 12.5% anual
        24: 13.0, // 13.0% anual
        36: 13.5, // 13.5% anual
        48: 14.0 // 14.0% anual
    },
    hipotecario: {
        5: 8.5, // 8.5% anual (5 años)
        10: 9.0, // 9.0% anual (10 años)
        20: 9.5, // 9.5% anual (20 años)
        30: 10.0 // 10.0% anual (30 años)
    }
};

// Función para actualizar opciones de plazo según tipo de crédito
function actualizarOpcionesPlazo() {
    const tipoCredito = document.getElementById('tipoCredito').value;
    const plazoSelect = document.getElementById('plazoCredito');

    // Limpiar opciones existentes
    plazoSelect.innerHTML = '';

    if (!tipoCredito) {
        plazoSelect.disabled = true;
        plazoSelect.innerHTML = '<option value="">Selecciona primero el tipo de crédito</option>';
        return;
    }

    plazoSelect.disabled = false;

    // Agregar opciones según el tipo de crédito
    if (tipoCredito === 'personal') {
        plazoSelect.innerHTML = `
            <option value="">Seleccionar plazo</option>
            <option value="12">12 meses</option>
            <option value="24">24 meses</option>
            <option value="36">36 meses</option>
        `;
    } else if (tipoCredito === 'auto') {
        plazoSelect.innerHTML = `
            <option value="">Seleccionar plazo</option>
            <option value="12">12 meses</option>
            <option value="24">24 meses</option>
            <option value="36">36 meses</option>
            <option value="48">48 meses</option>
        `;
    } else if (tipoCredito === 'hipotecario') {
        plazoSelect.innerHTML = `
            <option value="">Seleccionar plazo</option>
            <option value="5">5 años</option>
            <option value="10">10 años</option>
            <option value="20">20 años</option>
            <option value="30">30 años</option>
        `;
    }
}

// Función para calcular la cotización
function calcularCotizacion() {
    const tipoCredito = document.getElementById('tipoCredito').value;
    const monto = parseFloat(document.getElementById('montoCredito').value);
    const plazo = parseInt(document.getElementById('plazoCredito').value);

    // Validaciones
    if (!tipoCredito) {
        alert('Por favor selecciona un tipo de crédito');
        return;
    }

    if (!monto || monto < 1000) {
        alert('Por favor ingresa un monto válido (mínimo $1,000)');
        return;
    }

    if (!plazo) {
        alert('Por favor selecciona un plazo');
        return;
    }

    // Obtener tasa de interés
    const tasaAnual = tasasCredito[tipoCredito][plazo];
    if (!tasaAnual) {
        alert('No se encontró tasa para esta combinación');
        return;
    }

    // Calcular pagos
    const tasaMensual = tasaAnual / 100 / 12;
    let numeroPagos;

    if (tipoCredito === 'hipotecario') {
        numeroPagos = plazo * 12; // Convertir años a meses
    } else {
        numeroPagos = plazo;
    }

    // Calcular pago mensual usando fórmula de anualidad
    const pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) /
        (Math.pow(1 + tasaMensual, numeroPagos) - 1);

    const totalPagar = pagoMensual * numeroPagos;

    // Mostrar resultados
    mostrarResultadoCotizacion(tasaAnual, pagoMensual, totalPagar, tipoCredito, plazo);
}

// Función para mostrar el resultado de la cotización
function mostrarResultadoCotizacion(tasaAnual, pagoMensual, totalPagar, tipoCredito, plazo) {
    const resultadoDiv = document.getElementById('cotizacionResultado');

    // Actualizar valores
    document.getElementById('tasaInteres').textContent = `${tasaAnual.toFixed(1)}% anual`;
    document.getElementById('pagoMensual').textContent = `$${pagoMensual.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('totalPagar').textContent = `$${totalPagar.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Agregar clase currency al pago mensual y total
    document.getElementById('pagoMensual').classList.add('currency');
    document.getElementById('totalPagar').classList.add('currency');

    // Mostrar resultado
    resultadoDiv.style.display = 'block';

    // Scroll hacia el resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}

// Función para enviar cotización al agente de IA
async function enviarCotizacionAI(tipoCredito, monto, plazo, tasaAnual, pagoMensual, totalPagar) {
    const mensaje = `Cotización de ${tipoCredito}: Monto $${monto.toLocaleString()}, Plazo ${plazo} ${tipoCredito === 'hipotecario' ? 'años' : 'meses'}, Tasa ${tasaAnual}% anual, Pago mensual $${pagoMensual.toLocaleString('es-MX', {minimumFractionDigits: 2})}, Total $${totalPagar.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;

    // Preparar contexto con la cotización
    const contextoCotizacion = {
        cotizacion: {
            tipoCredito,
            monto,
            plazo,
            tasaAnual,
            pagoMensual,
            totalPagar,
            fechaCotizacion: new Date().toISOString()
        },
        oportunidades: opportunities,
        prospectos: prospects,
        portfolioClients: portfolioClients
    };

    // Enviar al agente de IA
    const requestData = {
        header: {
            sessionId: SESSION_ID,
            timestamp: new Date().toISOString(),
            currentUser: 'Usuario'
        },
        body: {
            chatInput: mensaje,
            context: contextoCotizacion
        }
    };

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        // Mostrar respuesta del agente
        addMessageToChat('assistant', data.response || 'Cotización procesada correctamente');

    } catch (error) {
        console.error('Error al enviar cotización:', error);
        addMessageToChat('assistant', 'Error al procesar la cotización. Por favor, intenta nuevamente.');
    }
}

// ============================================
// COTIZADOR DE CRÉDITOS (CHAT)
// ============================================

// Función para enviar mensaje al cotizador
async function sendCotizadorMessage() {
    const input = document.getElementById('cotizadorInput');
    const message = input.value.trim();

    if (!message) return;

    // Añadir mensaje del usuario
    addMessageToCotizadorChat('usuario', message);

    // Limpiar input
    input.value = '';
    input.style.height = 'auto';

    // Mostrar indicador de procesamiento
    showCotizadorTypingIndicator();

    try {
        // Preparar contexto específico para cotizaciones
        const contextoCotizacion = {
            opportunities: opportunities,
            prospects: prospects,
            portfolioClients: portfolioClients,
            tasasCredito: tasasCredito,
            clientProductsData: clientProductsData,
            productDescriptions: productDescriptions,
            conversationHistory: conversationHistory,
            tipoSolicitud: 'cotizacion',
            resumen: {
                totalOportunidades: opportunities.length,
                oportunidadesActivas: opportunities.filter(o => o.status !== 'cerrada').length,
                valorTotalPipeline: opportunities.reduce((sum, o) => sum + o.amount, 0),
                totalProspectos: prospects.length,
                prospectosActivos: prospects.filter(p => !['cerrado', 'descartado'].includes(p.status)).length,
                totalClientes: portfolioClients.length,
                clientesCompletos: portfolioClients.filter(c => c.missingProducts.length === 0).length
            }
        };

        // Enviar al agente de IA
        const requestData = {
            header: {
                sessionId: SESSION_ID,
                timestamp: new Date().toISOString(),
                currentUser: 'Usuario'
            },
            body: {
                chatInput: message,
                context: contextoCotizacion
            }
        };

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        // Remover indicador de carga
        removeCotizadorTypingIndicator();

        // Manejar diferentes formatos de respuesta de n8n
        let respuesta = '';
        if (data.output) {
            respuesta = data.output;
        } else if (data.response) {
            respuesta = data.response;
        } else if (data.message) {
            respuesta = data.message;
        } else if (data.text) {
            respuesta = data.text;
        } else if (typeof data === 'string') {
            respuesta = data;
        } else if (Array.isArray(data) && data.length > 0) {
            respuesta = data[0].output || data[0].response || data[0].message || data[0].text || JSON.stringify(data[0]);
        } else {
            respuesta = 'Cotización procesada correctamente';
        }

        // Mostrar respuesta del agente
        addMessageToCotizadorChat('asistente', respuesta);

    } catch (error) {
        console.error('Error al procesar cotización:', error);

        // Remover indicador de carga
        removeCotizadorTypingIndicator();

        // Mostrar mensaje de error
        addMessageToCotizadorChat('asistente', 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta nuevamente con un formato como: "Cotizar crédito personal de $50,000 a 24 meses"');
    }
}

// Función para añadir mensaje al chat del cotizador
function addMessageToCotizadorChat(sender, message) {
    const chatContainer = document.getElementById('cotizadorChat');
    const messageDiv = document.createElement('div');
    messageDiv.className = `cotizador-message ${sender}`;

    const avatar = sender === 'usuario' ? '👤' : '💰';

    messageDiv.innerHTML = `
        <div class="cotizador-message-avatar">${avatar}</div>
        <div class="cotizador-message-content">
            <strong>${sender === 'usuario' ? 'Usuario' : 'Cotizador'}:</strong> ${message}
        </div>
    `;

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para mostrar indicador de escritura
function showCotizadorTypingIndicator() {
    const chatContainer = document.getElementById('cotizadorChat');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'cotizador-message asistente';
    typingDiv.id = 'cotizadorTypingIndicator';

    typingDiv.innerHTML = `
        <div class="cotizador-message-avatar">💰</div>
        <div class="cotizador-message-content">
            <strong>Cotizador:</strong> <span class="cotizador-cargando">Procesando tu solicitud...</span>
        </div>
    `;

    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para remover indicador de escritura
function removeCotizadorTypingIndicator() {
    const typingIndicator = document.getElementById('cotizadorTypingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Función para procesar solicitud de cotización
async function procesarSolicitudCotizacion(message) {
    // Extraer información del mensaje usando regex
    const tipoMatch = message.match(/(personal|auto|hipotecario)/i);
    const montoMatch = message.match(/\$?([0-9,]+)/);
    const plazoMatch = message.match(/(\d+)\s*(meses?|años?|año)/i);

    if (!tipoMatch || !montoMatch || !plazoMatch) {
        throw new Error('Formato no válido');
    }

    const tipoCredito = tipoMatch[1].toLowerCase();
    const monto = parseFloat(montoMatch[1].replace(/,/g, ''));
    const plazoNumero = parseInt(plazoMatch[1]);
    const plazoUnidad = plazoMatch[2].toLowerCase();

    // Convertir años a meses para hipotecario
    let plazoEnMeses = plazoNumero;
    if (tipoCredito === 'hipotecario' && plazoUnidad.includes('año')) {
        plazoEnMeses = plazoNumero * 12;
    }

    // Validar tipo de crédito y plazo
    if (!tasasCredito[tipoCredito] || !tasasCredito[tipoCredito][plazoNumero]) {
        throw new Error('Combinación de tipo y plazo no válida');
    }

    // Obtener tasa de interés
    const tasaAnual = tasasCredito[tipoCredito][plazoNumero];

    // Calcular pagos
    const tasaMensual = tasaAnual / 100 / 12;
    const numeroPagos = plazoEnMeses;

    // Calcular pago mensual usando fórmula de anualidad
    const pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) /
        (Math.pow(1 + tasaMensual, numeroPagos) - 1);

    const totalPagar = pagoMensual * numeroPagos;

    return {
        tipoCredito,
        monto,
        plazo: plazoNumero,
        plazoUnidad,
        tasaAnual,
        pagoMensual,
        totalPagar
    };
}

// Función para mostrar resultado en el chat
function mostrarResultadoCotizadorChat(resultado) {
    const mensaje = `¡Perfecto! He calculado tu cotización de <strong>${resultado.tipoCredito}</strong> por <strong>$${resultado.monto.toLocaleString()}</strong> a <strong>${resultado.plazo} ${resultado.plazoUnidad}</strong>.`;

    addMessageToCotizadorChat('asistente', mensaje);

    // Crear mensaje con resultado detallado
    const chatContainer = document.getElementById('cotizadorChat');
    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'cotizador-message asistente';

    resultadoDiv.innerHTML = `
        <div class="cotizador-message-avatar">💰</div>
        <div class="cotizador-message-content">
            <strong>Cotizador:</strong> Aquí están los detalles de tu cotización:
            <div class="cotizador-resultado">
                <h6>📊 Resultado de la Cotización</h6>
                <div class="cotizador-resultado-item">
                    <span class="label">Tasa de Interés:</span>
                    <span class="value">${resultado.tasaAnual.toFixed(1)}% anual</span>
                </div>
                <div class="cotizador-resultado-item">
                    <span class="label">Pago Mensual:</span>
                    <span class="value currency">$${resultado.pagoMensual.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div class="cotizador-resultado-item">
                    <span class="label">Total a Pagar:</span>
                    <span class="value currency">$${resultado.totalPagar.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
        </div>
    `;

    chatContainer.appendChild(resultadoDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Variables para cartera
let filteredPortfolioClients = [...portfolioClients];
let currentPortfolioPage = 1;
const itemsPerPortfolioPage = 10;

// Función para renderizar tabla de cartera
function renderPortfolioTable() {
    const tbody = document.getElementById('portfolioTableBody');
    tbody.innerHTML = '';

    const startIndex = (currentPortfolioPage - 1) * itemsPerPortfolioPage;
    const endIndex = startIndex + itemsPerPortfolioPage;
    const pageClients = filteredPortfolioClients.slice(startIndex, endIndex);

    pageClients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${formatDate(client.lastContact)}</td>
            <td><span class="priority-badge priority-${client.priority}">${getPriorityLabel(client.priority)}</span></td>
            <td class="amount-cell">$${client.portfolioValue.toLocaleString()}</td>
            <td>
                <button class="btn-primary" onclick="viewClient(${client.id})" title="Ver detalles">
                    Ver
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para obtener etiqueta de prioridad
function getPriorityLabel(priority) {
    const labels = {
        'alta': 'Alta',
        'media': 'Media',
        'baja': 'Baja'
    };
    return labels[priority] || priority;
}

// Función para aplicar filtros de cartera
function applyPortfolioFilters() {
    const statusFilter = document.getElementById('filterClientStatus').value;
    const productFilter = document.getElementById('filterClientProduct').value;
    const searchFilter = document.getElementById('filterClientSearch').value.toLowerCase();

    filteredPortfolioClients = portfolioClients.filter(client => {
        const matchesStatus = !statusFilter ||
            (statusFilter === 'complete' && client.missingProducts.length === 0) ||
            (statusFilter === 'incomplete' && client.missingProducts.length > 0) ||
            (statusFilter === 'priority' && client.priority === 'alta');

        const matchesProduct = !productFilter || client.currentProducts.includes(productFilter);
        const matchesSearch = !searchFilter || client.name.toLowerCase().includes(searchFilter);

        return matchesStatus && matchesProduct && matchesSearch;
    });

    currentPortfolioPage = 1;
    renderPortfolioTable();
}

// Función para limpiar filtros de cartera
function clearPortfolioFilters() {
    document.getElementById('filterClientStatus').value = '';
    document.getElementById('filterClientProduct').value = '';
    document.getElementById('filterClientSearch').value = '';
    applyPortfolioFilters();
}

// Función para ver cliente
function viewClient(id) {
    const client = portfolioClients.find(c => c.id === id);
    if (!client) return;

    // Llenar información del modal
    document.getElementById('clientModalTitle').textContent = `Detalle de Cliente - ${client.name}`;
    document.getElementById('clientName').textContent = client.name;
    document.getElementById('clientPhone').textContent = client.phone;
    document.getElementById('clientEmail').textContent = client.email;
    document.getElementById('clientPortfolioValue').textContent = '$' + client.portfolioValue.toLocaleString();
    document.getElementById('clientLastContact').textContent = formatDate(client.lastContact);
    document.getElementById('clientPriority').textContent = getPriorityLabel(client.priority);

    // Llenar productos actuales
    const currentProductsGrid = document.getElementById('currentProductsGrid');
    currentProductsGrid.innerHTML = '';
    if (client.currentProducts.length > 0) {
        client.currentProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card current';
            productCard.innerHTML = `
                <div class="product-icon">✅</div>
                <div class="product-name">${product}</div>
            `;
            currentProductsGrid.appendChild(productCard);
        });
    } else {
        currentProductsGrid.innerHTML = '<p class="no-products">No tiene productos actuales</p>';
    }

    // Llenar productos que le falta ofrecer
    const missingProductsGrid = document.getElementById('missingProductsGrid');
    missingProductsGrid.innerHTML = '';
    if (client.missingProducts.length > 0) {
        client.missingProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card missing';
            productCard.innerHTML = `
                <div class="product-icon">⚠️</div>
                <div class="product-name">${product}</div>
            `;
            missingProductsGrid.appendChild(productCard);
        });
    } else {
        missingProductsGrid.innerHTML = '<p class="no-products">Tiene todos los productos</p>';
    }

    // Mostrar modal
    const modal = document.getElementById('clientModal');
    modal.classList.add('active');
}

// Función para cerrar modal de cliente
function closeClientModal() {
    const modal = document.getElementById('clientModal');
    modal.classList.remove('active');
}

// Funciones de contacto para cliente
function iniciarWhatsAppClient() {
    const phone = document.getElementById('clientPhone').textContent;
    const message = encodeURIComponent('Hola, te contacto desde el CRM para revisar tu cartera de productos bancarios.');
    window.open(`https://wa.me/52${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
}

function iniciarLlamadaClient() {
    const phone = document.getElementById('clientPhone').textContent;
    window.open(`tel:${phone}`, '_self');
}

function enviarEmailClient() {
    const email = document.getElementById('clientEmail').textContent;
    const subject = encodeURIComponent('Revisión de Cartera de Productos');
    const body = encodeURIComponent('Hola,\n\nTe contacto para revisar tu cartera de productos bancarios y ofrecerte nuevas opciones.\n\nSaludos cordiales.');
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
}

// Función para generar reportes según el tipo seleccionado
function generateReport(reportType, period) {
    console.log(`Generando reporte: ${reportType} para el período: ${period}`);

    switch (reportType) {
        case 'sales':
            showToast('success', 'Reporte de Ventas', 'Generando reporte de ventas...');
            // Aquí se cargarían los datos específicos del reporte de ventas
            break;
        case 'prospects':
            showToast('success', 'Reporte de Prospectos', 'Generando reporte de prospectos...');
            // Aquí se cargarían los datos específicos del reporte de prospectos
            break;
        case 'placement':
            showToast('success', 'Reporte de Colocación', 'Generando reporte de colocación...');
            // Aquí se cargarían los datos específicos del reporte de colocación
            break;
        case 'capture':
            showToast('success', 'Reporte de Captación', 'Generando reporte de captación...');
            // Aquí se cargarían los datos específicos del reporte de captación
            break;
        case 'performance':
            showToast('success', 'Reporte de Rendimiento', 'Generando reporte de rendimiento...');
            // Aquí se cargarían los datos específicos del reporte de rendimiento
            break;
        default:
            showToast('error', 'Error', 'Tipo de reporte no válido');
    }
}

// ============================================
// FUNCIONES DE GRÁFICOS Y REPORTES
// ============================================

// Función para inicializar todos los gráficos
function initializeCharts() {
    initializePlacementChart();
    initializeCaptureChart();
    initializeConversionChart();
    initializePipelineChart();
}

// Gráfico de Colocación por Producto
function initializePlacementChart() {
    const ctx = document.getElementById('placementChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['TDC', 'Crédito Auto', 'Crédito Hipotecario'],
            datasets: [{
                label: 'Colocación (Miles)',
                data: [1200, 850, 400],
                backgroundColor: [
                    '#d67550',
                    '#c9925e',
                    '#b8a193'
                ],
                borderColor: '#d67550',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Gráfico de Captación Mensual
function initializeCaptureChart() {
    const ctx = document.getElementById('captureChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Captación (Miles)',
                data: [2800, 3200, 2900, 3500, 3100, 3300, 3000, 3200, 3400, 3600, 3200, 3200],
                borderColor: '#d67550',
                backgroundColor: 'rgba(214, 117, 80, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Gráfico de Conversión de Prospectos
function initializeConversionChart() {
    const ctx = document.getElementById('conversionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cerrados', 'En Proceso', 'Descartados'],
            datasets: [{
                data: [4, 18, 1],
                backgroundColor: [
                    '#d67550',
                    '#c9925e',
                    '#b8a193'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Gráfico de Pipeline de Ventas
function initializePipelineChart() {
    const ctx = document.getElementById('pipelineChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['No Contactado', 'Calificación', 'Propuesta', 'Negociación', 'Cerrado'],
            datasets: [{
                label: 'Valor (Miles)',
                data: [950, 1250, 1750, 2100, 800],
                backgroundColor: [
                    '#b8a193',
                    '#c9925e',
                    '#d67550',
                    '#d67550',
                    '#d67550'
                ],
                borderColor: '#d67550',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// ============================================
// EVENT LISTENERS E INICIALIZACIÓN
// ============================================

// Auto-resize del textarea
document.addEventListener('DOMContentLoaded', () => {
    const aiInput = document.getElementById('aiInput');

    if (aiInput) {
        aiInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // Enviar con Enter (Shift+Enter para nueva línea)
        aiInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAIMessage();
            }
        });
    }
});

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    const modal = document.getElementById('opportunityModal');
    const newModal = document.getElementById('newOpportunityModal');
    const prospectModal = document.getElementById('prospectModal');
    const clientModal = document.getElementById('clientModal');

    if (event.target === modal) {
        closeModal();
    }
    if (event.target === newModal) {
        closeNewOpportunityModal();
    }
    if (event.target === prospectModal) {
        closeProspectModal();
    }
    if (event.target === clientModal) {
        closeClientModal();
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar
    updateIndicators();
    renderTable();
    updateProspectIndicators();
    renderProspectsTable();

    // Cargar la sección de reportes por defecto
    showSection('reports');

    // Navegación
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (index === 0) {
                showSection('reports');
            } else if (index === 1) {
                showSection('prospects');
            } else if (index === 2) {
                showSection('opportunities');
            } else if (index === 3) {
                showSection('portfolio');
            }
        });
    });

    // Filtros de oportunidades
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
    document.getElementById('filterProductFamily').addEventListener('change', applyFilters);
    document.getElementById('filterTimbrado').addEventListener('change', applyFilters);
    document.getElementById('filterSearch').addEventListener('input', applyFilters);
    document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);

    // Filtros de prospectos
    document.getElementById('filterProspectStatus').addEventListener('change', applyProspectFilters);
    document.getElementById('filterProspectProduct').addEventListener('change', applyProspectFilters);
    document.getElementById('filterProspectSearch').addEventListener('input', applyProspectFilters);
    document.getElementById('clearProspectFiltersBtn').addEventListener('click', clearProspectFilters);

    // Filtros de cartera
    document.getElementById('filterClientStatus').addEventListener('change', applyPortfolioFilters);
    document.getElementById('filterClientProduct').addEventListener('change', applyPortfolioFilters);
    document.getElementById('filterClientSearch').addEventListener('input', applyPortfolioFilters);
    document.getElementById('clearClientFiltersBtn').addEventListener('click', clearPortfolioFilters);

    // Cotizador de créditos (chat)
    const cotizadorInput = document.getElementById('cotizadorInput');
    if (cotizadorInput) {
        cotizadorInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });

        // Enviar con Enter (Shift+Enter para nueva línea)
        cotizadorInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCotizadorMessage();
            }
        });
    }

    // Paginación de oportunidades
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    // Selector de página de oportunidades
    document.getElementById('pageSelect').addEventListener('change', (e) => {
        goToPage(parseInt(e.target.value));
    });

    // Botones
    document.getElementById('addOpportunityBtn').addEventListener('click', () => {
        openNewOpportunityModal();
    });

    document.getElementById('addProspectBtn').addEventListener('click', () => {
        console.log('Agregar nuevo prospecto');
        // Implementar modal de nuevo prospecto
    });

    // Botón consultar reporte
    document.getElementById('consultReportBtn').addEventListener('click', () => {
        const reportType = document.getElementById('reportType').value;
        const reportPeriod = document.getElementById('reportPeriod').value;

        if (!reportType) {
            showToast('warning', 'Selecciona un tipo de reporte', 'Por favor selecciona el tipo de reporte que deseas consultar.');
            return;
        }

        generateReport(reportType, reportPeriod);
    });
});