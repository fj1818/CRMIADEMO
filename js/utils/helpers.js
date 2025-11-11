/**
 * ============================================
 * FUNCIONES DE UTILIDAD GENERALES
 * ============================================
 */

const Helpers = {
    /**
     * Formatea una fecha al formato español
     * @param {Date} date - Fecha a formatear
     * @returns {string} Fecha formateada
     */
    formatDate(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    /**
     * Formatea una fecha y hora
     * @param {Date} date - Fecha a formatear
     * @returns {string} Fecha y hora formateada
     */
    formatDateTime(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },

    /**
     * Formatea un número como moneda
     * @param {number} amount - Cantidad a formatear
     * @param {string} currency - Moneda (default: MXN)
     * @returns {string} Cantidad formateada
     */
    formatCurrency(amount, currency = 'MXN') {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    /**
     * Genera un ID único
     * @returns {string} ID único
     */
    generateUniqueId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Debounce para limitar ejecuciones de funciones
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} Función con debounce
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Capitaliza la primera letra de un string
     * @param {string} str - String a capitalizar
     * @returns {string} String capitalizado
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Obtiene parámetros de URL
     * @param {string} param - Nombre del parámetro
     * @returns {string|null} Valor del parámetro
     */
    getUrlParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Muestra un log con formato
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de log (info, success, warning, error)
     */
    log(message, type = 'info') {
        const emoji = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        console.log(`${emoji[type]} [${type.toUpperCase()}]: ${message}`);
    }
};

// Hacer disponible globalmente
window.Helpers = Helpers;

