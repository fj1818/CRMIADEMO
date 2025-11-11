/**
 * ============================================
 * ARCHIVO DE CONFIGURACIÓN GLOBAL
 * ============================================
 * Configuración centralizada del sistema CRM
 */

const CONFIG = {
    // Información de la aplicación
    app: {
        name: 'CRM IA',
        version: '1.0.0',
        description: 'Sistema de gestión de relaciones con clientes potenciado por IA',
        environment: 'development' // development, production
    },

    // Configuración de colores (sincronizado con CSS)
    colors: {
        primaryOrange: '#FF8000',
        primaryOrangeLight: '#FFa64d',
        primaryOrangeDark: '#cc6600',
        white: '#FFFFFF',
        black: '#1a1a1a',
        gray100: '#f5f5f5',
        gray200: '#e8e8e8',
        gray300: '#d0d0d0',
        gray400: '#a8a8a8',
        gray500: '#707070',
        gray600: '#505050',
        gray700: '#383838'
    },

    // Configuración de navegación
    navigation: {
        defaultSection: 'inicio',
        animationDuration: 300 // milisegundos
    },

    // Configuración de usuario
    user: {
        defaultName: 'Usuario',
        defaultAvatar: '👤'
    },

    // Configuración para futura integración con API/Apps Script
    api: {
        baseUrl: '',
        timeout: 30000,
        retryAttempts: 3
    },

    // Configuración de características
    features: {
        enableNotifications: true,
        enableAutoSave: true,
        enableAI: true
    }
};

// Hacer disponible globalmente
window.CONFIG = CONFIG;

