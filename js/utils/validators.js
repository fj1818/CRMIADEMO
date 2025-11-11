/**
 * ============================================
 * FUNCIONES DE VALIDACIÓN
 * ============================================
 */

const Validators = {
    /**
     * Valida un email
     * @param {string} email - Email a validar
     * @returns {boolean} True si es válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Valida un teléfono (formato México)
     * @param {string} phone - Teléfono a validar
     * @returns {boolean} True si es válido
     */
    isValidPhone(phone) {
        const phoneRegex = /^(\+52|52)?[\s.-]?(\d{2})[\s.-]?(\d{4})[\s.-]?(\d{4})$/;
        return phoneRegex.test(phone);
    },

    /**
     * Valida que un campo no esté vacío
     * @param {string} value - Valor a validar
     * @returns {boolean} True si no está vacío
     */
    isNotEmpty(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    /**
     * Valida longitud mínima
     * @param {string} value - Valor a validar
     * @param {number} minLength - Longitud mínima
     * @returns {boolean} True si cumple
     */
    hasMinLength(value, minLength) {
        return value && value.length >= minLength;
    },

    /**
     * Valida longitud máxima
     * @param {string} value - Valor a validar
     * @param {number} maxLength - Longitud máxima
     * @returns {boolean} True si cumple
     */
    hasMaxLength(value, maxLength) {
        return value && value.length <= maxLength;
    },

    /**
     * Valida que sea un número
     * @param {any} value - Valor a validar
     * @returns {boolean} True si es número
     */
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    /**
     * Valida que sea un número positivo
     * @param {any} value - Valor a validar
     * @returns {boolean} True si es positivo
     */
    isPositiveNumber(value) {
        return this.isNumber(value) && parseFloat(value) > 0;
    },

    /**
     * Valida una fecha
     * @param {string} dateString - Fecha en formato string
     * @returns {boolean} True si es válida
     */
    isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    },

    /**
     * Valida un RFC (México)
     * @param {string} rfc - RFC a validar
     * @returns {boolean} True si es válido
     */
    isValidRFC(rfc) {
        const rfcRegex = /^([A-ZÑ&]{3,4})?(\d{6})?([A-Z\d]{3})?$/;
        return rfcRegex.test(rfc);
    }
};

// Hacer disponible globalmente
window.Validators = Validators;

