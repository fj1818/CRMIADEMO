/**
 * ============================================
 * COMPONENTE DE TABLA REUTILIZABLE
 * ============================================
 */

class TableComponent {
    constructor(config) {
        this.containerId = config.containerId;
        this.data = config.data || [];
        this.columns = config.columns || [];
        this.title = config.title || 'Tabla';
        this.searchable = config.searchable !== false;
        this.filterable = config.filterable || false;
        this.filters = config.filters || [];
        this.paginated = config.paginated !== false;
        this.pageSize = config.pageSize || 10;
        this.actions = config.actions || [];
        
        this.currentPage = 1;
        this.filteredData = [...this.data];
        this.searchTerm = '';
        this.activeFilters = {};
        
        // Establecer valores por defecto de filtros
        this.filters.forEach(filter => {
            if (filter.defaultValue) {
                this.activeFilters[filter.field] = filter.defaultValue;
            }
        });
        
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
        
        // Renderizar primero
        this.render();
        
        // Aplicar filtros por defecto después de renderizar
        if (Object.keys(this.activeFilters).length > 0) {
            // Usar setTimeout para asegurar que se aplique después del render
            setTimeout(() => {
                this.filterData();
            }, 0);
        }
    }

    /**
     * Actualiza los datos de la tabla
     */
    setData(data) {
        this.data = data;
        this.filteredData = [...data];
        this.currentPage = 1;
        this.render();
    }

    /**
     * Aplica búsqueda
     */
    applySearch(term) {
        this.searchTerm = String(term).toLowerCase();
        this.filterData();
    }

    /**
     * Aplica filtros
     */
    applyFilters(filters) {
        this.activeFilters = filters;
        this.filterData();
    }

    /**
     * Filtra los datos según búsqueda y filtros
     */
    filterData() {
        this.filteredData = this.data.filter(row => {
            // Búsqueda
            if (this.searchTerm) {
                const matches = this.columns.some(col => {
                    const value = this.getCellValue(row, col.field);
                    return String(value).toLowerCase().includes(this.searchTerm);
                });
                if (!matches) return false;
            }

            // Filtros
            for (let filterKey in this.activeFilters) {
                const filterValue = this.activeFilters[filterKey];
                // Ignorar filtros vacíos o arrays vacíos
                if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) continue;

                // Filtro especial para estado (activo/baja)
                if (filterKey === 'estado') {
                    if (filterValue === 'activo' && row.fechaBaja !== null) return false;
                    if (filterValue === 'baja' && row.fechaBaja === null) return false;
                }
                // Filtro especial: Con familias de producto (array)
                else if (filterKey === 'conFamilias' && Array.isArray(filterValue) && filterValue.length > 0) {
                    if (window.ProductosUtils) {
                        const productosCliente = ProductosUtils.getPorIDE(row.ide);
                        // El cliente debe tener TODAS las familias seleccionadas
                        const tieneTodas = filterValue.every(familia => 
                            productosCliente.some(p => p.familiaProducto === familia)
                        );
                        if (!tieneTodas) return false;
                    }
                }
                // Filtro especial: Sin familias de producto (array)
                else if (filterKey === 'sinFamilias' && Array.isArray(filterValue) && filterValue.length > 0) {
                    if (window.ProductosUtils) {
                        const productosCliente = ProductosUtils.getPorIDE(row.ide);
                        // El cliente NO debe tener NINGUNA de las familias seleccionadas
                        const tieneAlguna = filterValue.some(familia => 
                            productosCliente.some(p => p.familiaProducto === familia)
                        );
                        if (tieneAlguna) return false;
                    }
                }
                // Filtros normales
                else if (!Array.isArray(filterValue) && row[filterKey] !== filterValue) {
                    return false;
                }
            }

            return true;
        });

        this.currentPage = 1;
        this.render();
    }

    /**
     * Obtiene el valor de una celda
     */
    getCellValue(row, field) {
        if (typeof field === 'function') {
            return field(row);
        }
        return row[field];
    }

    /**
     * Renderiza la tabla completa
     */
    render() {
        if (!this.container) return;

        // Guardar el valor de búsqueda actual antes de re-renderizar
        const currentSearchValue = this.searchTerm;
        const searchInput = document.getElementById(`${this.containerId}-search`);
        const hadFocus = searchInput && document.activeElement === searchInput;
        const cursorPosition = searchInput ? searchInput.selectionStart : 0;

        // Verificar si ya existe el toolbar para no destruir los filtros múltiples
        const existingToolbar = this.container.querySelector('.table-toolbar');
        
        if (!existingToolbar) {
            // Primera renderización: crear todo
            const html = `
                ${this.searchable || this.filterable ? this.renderToolbar() : ''}
                <div class="table-container">
                    <table class="table">
                        ${this.renderHeader()}
                        ${this.renderBody()}
                    </table>
                </div>
                ${this.paginated ? this.renderPagination() : ''}
            `;
            this.container.innerHTML = html;
        } else {
            // Re-renderización: solo actualizar tabla y paginación
            // Mantener el toolbar intacto para no destruir filtros múltiples
            const tableContainer = this.container.querySelector('.table-container');
            const paginationContainer = this.container.querySelector('.table-pagination');
            
            if (tableContainer) {
                tableContainer.innerHTML = `
                    <table class="table">
                        ${this.renderHeader()}
                        ${this.renderBody()}
                    </table>
                `;
            }
            
            if (this.paginated) {
                if (paginationContainer) {
                    paginationContainer.outerHTML = this.renderPagination();
                } else {
                    this.container.insertAdjacentHTML('beforeend', this.renderPagination());
                }
            }
        }
        
        this.attachEventListeners();

        // Restaurar el valor de búsqueda y el foco
        if (this.searchable && currentSearchValue) {
            const newSearchInput = document.getElementById(`${this.containerId}-search`);
            if (newSearchInput) {
                newSearchInput.value = currentSearchValue;
                if (hadFocus) {
                    newSearchInput.focus();
                    newSearchInput.setSelectionRange(cursorPosition, cursorPosition);
                }
            }
        }
    }

    /**
     * Renderiza la barra de herramientas
     */
    renderToolbar() {
        return `
            <div class="table-toolbar">
                <div class="table-toolbar-left">
                    <h3>${this.title}</h3>
                    ${this.searchable ? this.renderSearchBox() : ''}
                </div>
                <div class="table-toolbar-right">
                    ${this.filterable ? this.renderFilters() : ''}
                </div>
            </div>
        `;
    }

    /**
     * Renderiza caja de búsqueda
     */
    renderSearchBox() {
        return `
            <div class="table-search">
                <span class="table-search-icon">🔍</span>
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    id="${this.containerId}-search"
                    value=""
                    autocomplete="off"
                >
            </div>
        `;
    }

    /**
     * Renderiza filtros
     */
    renderFilters() {
        return `
            <div class="table-filters">
                ${this.filters.map(filter => {
                    const defaultValue = filter.defaultValue || '';
                    const currentValue = this.activeFilters[filter.field] !== undefined 
                        ? this.activeFilters[filter.field] 
                        : defaultValue;
                    
                    return `
                        <select 
                            class="table-filter-select" 
                            id="${this.containerId}-filter-${filter.field}"
                        >
                            <option value="">Todos (${filter.label})</option>
                            ${filter.options.map(opt => `
                                <option value="${opt.value}" ${currentValue === opt.value ? 'selected' : ''}>
                                    ${opt.label}
                                </option>
                            `).join('')}
                        </select>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Renderiza encabezado
     */
    renderHeader() {
        // Si solo hay una acción, cambiar "Acciones" por "Detalle"
        const actionsHeader = this.actions.length === 1 ? 'Detalle' : 'Acciones';
        
        return `
            <thead>
                <tr>
                    ${this.columns.map(col => `
                        <th class="${col.className || ''}">${col.label}</th>
                    `).join('')}
                    ${this.actions.length > 0 ? `<th class="text-center">${actionsHeader}</th>` : ''}
                </tr>
            </thead>
        `;
    }

    /**
     * Renderiza cuerpo de la tabla
     */
    renderBody() {
        if (this.filteredData.length === 0) {
            return this.renderNoData();
        }

        const paginatedData = this.getPaginatedData();

        return `
            <tbody>
                ${paginatedData.map(row => `
                    <tr>
                        ${this.columns.map(col => `
                            <td class="${col.className || ''}">
                                ${this.renderCell(row, col)}
                            </td>
                        `).join('')}
                        ${this.actions.length > 0 ? `
                            <td class="text-center">
                                ${this.renderActions(row)}
                            </td>
                        ` : ''}
                    </tr>
                `).join('')}
            </tbody>
        `;
    }

    /**
     * Renderiza una celda
     */
    renderCell(row, column) {
        const value = this.getCellValue(row, column.field);
        
        if (column.render) {
            return column.render(value, row);
        }
        
        return value || '-';
    }

    /**
     * Renderiza acciones
     */
    renderActions(row) {
        return `
            <div class="table-actions">
                ${this.actions.map(action => `
                    <button 
                        class="table-action-btn" 
                        data-action="${action.name}"
                        data-id="${row.id}"
                        title="${action.label}"
                    >
                        ${action.icon}
                    </button>
                `).join('')}
            </div>
        `;
    }

    /**
     * Renderiza mensaje sin datos
     */
    renderNoData() {
        return `
            <tbody>
                <tr>
                    <td colspan="${this.columns.length + (this.actions.length > 0 ? 1 : 0)}">
                        <div class="table-no-data">
                            <div class="table-no-data-icon">📋</div>
                            <h3>No se encontraron registros</h3>
                            <p>Intenta ajustar los filtros de búsqueda</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        `;
    }

    /**
     * Obtiene datos paginados
     */
    getPaginatedData() {
        if (!this.paginated) {
            return this.filteredData;
        }

        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredData.slice(start, end);
    }

    /**
     * Renderiza paginación
     */
    renderPagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.filteredData.length);

        return `
            <div class="table-pagination">
                <div class="pagination-info">
                    Mostrando ${start} - ${end} de ${this.filteredData.length} registros
                </div>
                <div class="pagination-controls">
                    <button 
                        class="pagination-btn" 
                        id="${this.containerId}-prev"
                        ${this.currentPage === 1 ? 'disabled' : ''}
                    >
                        ← Anterior
                    </button>
                    <span class="pagination-info">
                        Página ${this.currentPage} de ${totalPages || 1}
                    </span>
                    <button 
                        class="pagination-btn" 
                        id="${this.containerId}-next"
                        ${this.currentPage >= totalPages ? 'disabled' : ''}
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Adjunta event listeners
     */
    attachEventListeners() {
        // Búsqueda
        if (this.searchable) {
            const searchInput = document.getElementById(`${this.containerId}-search`);
            if (searchInput && !searchInput.dataset.listenersAttached) {
                searchInput.dataset.listenersAttached = 'true';
                
                // Usar timeout para no re-renderizar en cada tecla
                let searchTimeout;
                const handleSearch = (e) => {
                    clearTimeout(searchTimeout);
                    const value = e.target.value;
                    
                    searchTimeout = setTimeout(() => {
                        this.searchTerm = value.toLowerCase();
                        this.filterData();
                    }, 300); // Esperar 300ms después de dejar de escribir
                };
                
                searchInput.addEventListener('input', handleSearch);
                searchInput.addEventListener('paste', handleSearch);
            }
        }

        // Filtros
        if (this.filterable) {
            this.filters.forEach(filter => {
                const select = document.getElementById(`${this.containerId}-filter-${filter.field}`);
                if (select) {
                    select.addEventListener('change', (e) => {
                        this.activeFilters[filter.field] = e.target.value;
                        this.filterData();
                    });
                }
            });
        }

        // Paginación
        if (this.paginated) {
            const prevBtn = document.getElementById(`${this.containerId}-prev`);
            const nextBtn = document.getElementById(`${this.containerId}-next`);

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        this.render();
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
                    if (this.currentPage < totalPages) {
                        this.currentPage++;
                        this.render();
                    }
                });
            }
        }

        // Acciones
        if (this.actions.length > 0) {
            const actionButtons = this.container.querySelectorAll('.table-action-btn');
            actionButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const actionName = e.currentTarget.getAttribute('data-action');
                    const rowId = e.currentTarget.getAttribute('data-id');
                    const action = this.actions.find(a => a.name === actionName);
                    
                    if (action && action.handler) {
                        const row = this.data.find(r => String(r.id) === String(rowId));
                        action.handler(row);
                    }
                });
            });
        }
    }
}

// Hacer disponible globalmente
window.TableComponent = TableComponent;

