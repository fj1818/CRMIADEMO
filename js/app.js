/**
 * ============================================
 * APLICACIÓN PRINCIPAL - CRM IA
 * ============================================
 * Punto de entrada y coordinador de módulos
 */

class CRMApp {
    constructor() {
        this.navigation = null;
        this.isInitialized = false;
    }

    /**
     * Inicializa toda la aplicación
     */
    init() {
        if (this.isInitialized) {
            Helpers.log('La aplicación ya está inicializada', 'warning');
            return;
        }

        Helpers.log('🚀 Inicializando CRM IA...', 'info');

        // Verificar dependencias
        this.checkDependencies();

        // Inicializar módulo de navegación
        this.navigation = new NavigationModule();
        this.navigation.init();

        // Configurar usuario (temporal)
        this.setupUser();

        // Marcar como inicializada
        this.isInitialized = true;

        Helpers.log('✨ CRM IA iniciado correctamente', 'success');
        this.printWelcomeMessage();
    }

    /**
     * Verifica que todas las dependencias estén cargadas
     */
    checkDependencies() {
        const required = [
            'CONFIG',
            'ROUTES',
            'Helpers',
            'Validators',
            'NavigationModule'
        ];

        const missing = required.filter(dep => !window[dep]);

        if (missing.length > 0) {
            Helpers.log(`Faltan dependencias: ${missing.join(', ')}`, 'error');
            throw new Error('Dependencias faltantes');
        }

        Helpers.log('✅ Todas las dependencias cargadas', 'success');
    }

    /**
     * Configura información del usuario
     */
    setupUser() {
        // Aquí se cargará información del usuario desde Apps Script
        const userName = CONFIG.user.defaultName;
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    /**
     * Imprime mensaje de bienvenida en consola
     */
    printWelcomeMessage() {
        console.log('%c🤖 CRM IA', 'font-size: 24px; font-weight: bold; color: #FF8000;');
        console.log('%cSistema de Gestión potenciado por IA', 'font-size: 14px; color: #666;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #FF8000;');
        console.log(`%cVersión: ${CONFIG.app.version}`, 'color: #666;');
        console.log(`%cEntorno: ${CONFIG.app.environment}`, 'color: #666;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #FF8000;');
        console.log('📋 Secciones disponibles:');
        Object.values(ROUTES).forEach(route => {
            console.log(`  ${route.icon} ${route.name} - ${route.description}`);
        });
    }

    /**
     * Obtiene la instancia de navegación
     * @returns {NavigationModule} Instancia de navegación
     */
    getNavigation() {
        return this.navigation;
    }
}

/**
 * Inicialización automática cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global de la aplicación
    window.app = new CRMApp();
    window.app.init();
    
    // Inicializar servicio de monitoreo de tareas
    if (window.TareasMonitorService) {
        window.TareasMonitorService.init();
    }
});

/**
 * Prevenir comportamiento por defecto en enlaces vacíos
 */
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});

/**
 * Exportar para uso en Apps Script
 */
window.CRM = {
    App: CRMApp,
    Navigation: NavigationModule,
    Modules: {
        Inicio: InicioModule,
        Prospectos: ProspectosModule,
        Oportunidades: OportunidadesModule,
        MiCartera: MiCarteraModule,
        MisAcciones: MisAccionesModule
    },
    Utils: {
        Helpers: Helpers,
        Validators: Validators
    },
    Config: CONFIG,
    Routes: ROUTES
};

