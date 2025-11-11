/**
 * ============================================
 * MÓDULO DE NAVEGACIÓN
 * ============================================
 * Gestiona toda la navegación entre secciones
 */

class NavigationModule {
    constructor() {
        this.currentSection = CONFIG.navigation.defaultSection;
        this.navLinks = null;
        this.sections = null;
        this.moduleInstances = {};
    }

    /**
     * Inicializa el módulo de navegación
     */
    init() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.content-section');
        this.attachEventListeners();
        this.loadInitialSection();
        Helpers.log('Módulo de Navegación iniciado', 'success');
    }

    /**
     * Adjunta event listeners a los enlaces
     */
    attachEventListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionName = link.getAttribute('data-section');
                this.navigateToSection(sectionName);
            });
        });
    }

    /**
     * Navega a una sección específica
     * @param {string} sectionName - Nombre de la sección
     */
    navigateToSection(sectionName) {
        if (this.currentSection === sectionName) {
            return;
        }

        // Callback antes de cambiar (para limpieza si es necesario)
        this.beforeNavigate(this.currentSection);

        // Cambiar sección
        this.currentSection = sectionName;
        this.hideAllSections();
        this.showSection(sectionName);
        this.updateNavState(sectionName);

        // Callback después de cambiar
        this.afterNavigate(sectionName);

        Helpers.log(`Navegando a: ${sectionName}`, 'info');
    }

    /**
     * Oculta todas las secciones
     */
    hideAllSections() {
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
    }

    /**
     * Muestra una sección
     * @param {string} sectionName - Nombre de la sección
     */
    showSection(sectionName) {
        const section = document.getElementById(sectionName);
        if (section) {
            section.classList.add('active');
            
            // Inicializar módulo de la sección si existe
            this.initializeSectionModule(sectionName);
        } else {
            Helpers.log(`Sección no encontrada: ${sectionName}`, 'error');
        }
    }

    /**
     * Actualiza el estado visual de la navegación
     * @param {string} sectionName - Nombre de la sección activa
     */
    updateNavState(sectionName) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionName) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Carga la sección inicial
     */
    loadInitialSection() {
        this.showSection(this.currentSection);
        Helpers.log(`Sección inicial cargada: ${this.currentSection}`, 'info');
    }

    /**
     * Callback antes de navegar
     * @param {string} sectionName - Sección actual
     */
    beforeNavigate(sectionName) {
        // Aquí se pueden hacer limpiezas necesarias
        const module = this.moduleInstances[sectionName];
        if (module && typeof module.onLeave === 'function') {
            module.onLeave();
        }
    }

    /**
     * Callback después de navegar
     * @param {string} sectionName - Nueva sección
     */
    afterNavigate(sectionName) {
        // Aquí se pueden hacer inicializaciones necesarias
        const module = this.moduleInstances[sectionName];
        if (module && typeof module.onEnter === 'function') {
            module.onEnter();
        }
    }

    /**
     * Inicializa el módulo específico de una sección
     * @param {string} sectionName - Nombre de la sección
     */
    initializeSectionModule(sectionName) {
        // Si ya existe la instancia, no crear otra
        if (this.moduleInstances[sectionName]) {
            return;
        }

        // Buscar el módulo en ROUTES
        const route = ROUTES[sectionName];
        if (route && window[route.module]) {
            const ModuleClass = window[route.module];
            this.moduleInstances[sectionName] = new ModuleClass();
            
            if (typeof this.moduleInstances[sectionName].init === 'function') {
                this.moduleInstances[sectionName].init();
            }
        }
    }

    /**
     * Obtiene la sección actual
     * @returns {string} Nombre de la sección actual
     */
    getCurrentSection() {
        return this.currentSection;
    }

    /**
     * Obtiene instancia de módulo de una sección
     * @param {string} sectionName - Nombre de la sección
     * @returns {Object|null} Instancia del módulo
     */
    getModuleInstance(sectionName) {
        return this.moduleInstances[sectionName] || null;
    }
}

// Hacer disponible globalmente
window.NavigationModule = NavigationModule;

