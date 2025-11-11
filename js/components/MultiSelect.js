/**
 * ============================================
 * COMPONENTE DE SELECTOR MÚLTIPLE
 * ============================================
 */

class MultiSelect {
    constructor(config) {
        this.id = config.id;
        this.containerId = config.containerId;
        this.label = config.label;
        this.options = config.options || [];
        this.placeholder = config.placeholder || `Seleccionar ${this.label}`;
        this.onChange = config.onChange || (() => {});
        
        this.selectedValues = [];
        this.isOpen = false;
        this.container = null;
    }

    /**
     * Inicializa el componente
     */
    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Contenedor ${this.containerId} no encontrado`);
            return;
        }
        this.render();
        this.attachEventListeners();
    }

    /**
     * Renderiza el componente
     */
    render() {
        if (!this.container) return;
        
        const selectedCount = this.selectedValues.length;
        const displayText = selectedCount > 0 
            ? `${selectedCount} seleccionado${selectedCount > 1 ? 's' : ''}`
            : this.placeholder;

        const html = `
            <div class="multiselect-container" id="multiselect-${this.id}">
                <div class="multiselect-selected ${this.isOpen ? 'active' : ''}" id="multiselect-${this.id}-selected">
                    <span class="multiselect-label ${selectedCount > 0 ? 'has-selection' : ''}">
                        ${displayText}
                    </span>
                    ${selectedCount > 0 ? `<span class="multiselect-count">${selectedCount}</span>` : ''}
                    <span class="multiselect-arrow ${this.isOpen ? 'open' : ''}">▼</span>
                </div>
                <div class="multiselect-dropdown ${this.isOpen ? 'show' : ''}" id="multiselect-${this.id}-dropdown">
                    ${this.options.map(option => `
                        <div class="multiselect-option ${this.selectedValues.includes(option.value) ? 'selected' : ''}"
                             data-value="${option.value}">
                            <input type="checkbox" 
                                   class="multiselect-checkbox"
                                   id="multiselect-${this.id}-${option.value.replace(/\s+/g, '-')}"
                                   ${this.selectedValues.includes(option.value) ? 'checked' : ''}
                                   data-value="${option.value}">
                            <label class="multiselect-option-label" for="multiselect-${this.id}-${option.value.replace(/\s+/g, '-')}">
                                ${option.label}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    /**
     * Adjunta event listeners
     */
    attachEventListeners() {
        const selected = document.getElementById(`multiselect-${this.id}-selected`);
        const dropdown = document.getElementById(`multiselect-${this.id}-dropdown`);

        // Toggle dropdown
        if (selected) {
            selected.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }

        // Manejar selección de opciones
        if (dropdown) {
            const checkboxes = dropdown.querySelectorAll('.multiselect-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    e.stopPropagation();
                    const value = e.target.getAttribute('data-value');
                    this.toggleValue(value);
                });
            });

            // Evitar que el dropdown se cierre al hacer clic dentro
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest(`#multiselect-${this.id}`)) {
                this.close();
            }
        });
    }

    /**
     * Abre el dropdown
     */
    open() {
        this.isOpen = true;
        this.render();
        this.attachEventListeners();
    }

    /**
     * Cierra el dropdown
     */
    close() {
        this.isOpen = false;
        this.render();
        this.attachEventListeners();
    }

    /**
     * Toggle del dropdown
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Toggle de un valor
     */
    toggleValue(value) {
        const index = this.selectedValues.indexOf(value);
        if (index > -1) {
            this.selectedValues.splice(index, 1);
        } else {
            this.selectedValues.push(value);
        }
        
        // Actualizar solo el contenido sin cerrar
        this.render();
        this.attachEventListeners();
        
        // Llamar callback
        this.onChange(this.selectedValues);
    }

    /**
     * Obtiene los valores seleccionados
     */
    getSelectedValues() {
        return this.selectedValues;
    }

    /**
     * Establece los valores seleccionados
     */
    setSelectedValues(values) {
        this.selectedValues = values || [];
        this.render();
        this.attachEventListeners();
    }

    /**
     * Limpia la selección
     */
    clear() {
        this.selectedValues = [];
        this.render();
        this.attachEventListeners();
        this.onChange(this.selectedValues);
    }
}

// Hacer disponible globalmente
window.MultiSelect = MultiSelect;

