import { createSearchHandler } from './dashboardUtils.js';
import { Table } from '../../components/ui/table.js';
import { AuthService } from '../services/authService.js';
import { apiClient } from '../utils/apiClient.js';

/**
 * Reusable simplified section management system
 * This is a simplified section management system that can be reused for different sections
 * It is used to manage the data and the UI of the sections dynamically
 */
export class SectionManager {
    constructor(config) {
        this.config = config;
        this.currentSearchTerm = '';
        this.currentFilter = '';
        this.currentInputFilter = '';
        this.currentMovementType = '';
        this.currentFechaDesde = '';
        this.currentFechaHasta = '';
        this.currentPage = 1;
        this.pageSize = config.pageSize || 5;
    }

    /**
     * Initialize the section
     */
    async init() {
        try {
            const initialData = await this.loadData(1, this.pageSize);
            const stats = await this.loadStats();
            this.renderContent(initialData, stats);
            this.setupEventListeners();
            this.setupSearchHandler(stats);
            
            console.log(`✅ Sección ${this.config.name} inicializada`);
        } catch (error) {
            console.error(`❌ Error inicializando sección ${this.config.name}:`, error);
            this.renderError(error);
        }
    }

    /**
     * Load data from the section
     */
    async loadData(page, pageSize, search = '', filter = '', inputFilterValue = '', movementType = '', fechaDesde = '', fechaHasta = '') {
        let response;
        

        // Here we are implementing the solution for movements pagination and search filters btw 

        if (this.config.sectionKey === 'movimientos' && (movementType != '' || fechaDesde != '' || fechaHasta != '')) {
            response = await this.config.loader(page, pageSize, search, filter, movementType, fechaDesde, fechaHasta);
        } else {
            response = await this.config.loader(page, pageSize, search, filter, inputFilterValue, movementType, fechaDesde, fechaHasta);
        }
       
        let data = response.results || response.data || response;
        if (search && search.trim() && this.config.localFilter) {
            data = data.filter(item => {
                return this.config.searchFields.some(field => {
                    const value = item[field];
                    return value && value.toString().toLowerCase().includes(search.toLowerCase());
                });
            });
        }

        if (this.config.sectionKey === 'movimientos') {
            return {
                data: this.addActionButtons(data, ''),
                totalItems: response.count || data.length,
                currentPage: page
            };
        }
        
        return {
            data: this.addActionButtons(data, ''),
            totalItems: response.count || data.length,
            currentPage: page
        };
    }

    /**
     * Add action buttons to the data
     */
    addActionButtons(data, pdfField = '') {
        if (pdfField === 'PDF') {
            return data.map(item => ({
                ...item,
                pdf: item.pdf,
                acciones: this.config.actionButtons(item)
            }));
        }
        else{
            return data.map(item => ({
                ...item,
                acciones: this.config.actionButtons(item)
            }));
        }
    }

    /**
     * Load statistics
     */
    async loadStats() {
        if (this.config.statsLoader) {
            return await this.config.statsLoader();
        }
        return {};
    }

    /**
     * Render the content
     */
    renderContent(tableData, stats) {
        const tableHTML = this.config.tableRenderer(tableData);
        const statsHTML = this.config.statsRenderer ? this.config.statsRenderer(stats) : '';
        const actionsHTML = this.config.actionsRenderer ? this.config.actionsRenderer() : '';
        
        document.getElementById('dashboard-content').innerHTML = 
            statsHTML + actionsHTML + tableHTML;
    }

    /**
     * Render error
     */
    renderError(error) {
        document.getElementById('dashboard-content').innerHTML = `
            <div class="section-card" style="text-align:center;padding:40px 24px;max-width:480px;margin:0 auto;">
                <div class="stat-card-icon red" style="width:48px;height:48px;border-radius:12px;margin:0 auto 16px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                </div>
                <h3 style="font-size:15px;font-weight:700;color:#1a2035;margin-bottom:6px;">Error al cargar ${this.config.name}</h3>
                <p style="font-size:13px;color:#8a94a6;margin-bottom:18px;">${error.message}</p>
                <button onclick="showSection('${this.config.sectionKey}')" class="btn-primary" style="margin:0 auto;">
                    Reintentar
                </button>
            </div>
        `;
        if(error.message.includes('401')){
            try {
                AuthService.refreshToken(apiClient.getRefreshToken());               
            } catch (error) {
                console.log(error);
            }
        }

    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        setTimeout(() => {
            this.attachSearchListener();
            this.attachFilterListeners();
            this.attachMovementFormListener();
        }, 100);
    }

    /**
     * Attach search listener
     */
    attachSearchListener() {
        const searchInput = document.getElementById('table-search-input');
        if (searchInput && window[`handle${this.config.name}TableSearch`]) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearchTerm = e.target.value;
                window[`handle${this.config.name}TableSearch`](e.target.value);
            });
        }
    }

    /**
     * Attach filter listeners
     */
    attachFilterListeners() {
        const applyFiltersBtn = document.getElementById('apply-filters');
        const clearFiltersBtn = document.getElementById('clear-filters');
        const clearFiltersMovementBtn = document.getElementById('clear-movements-filters');

        const filterSelect = document.getElementById('filter-select');
        let inputFilterInput = null;
        if (filterSelect && filterSelect.parentElement) {
            inputFilterInput = filterSelect.parentElement.querySelector('input[type="text"]');
        }
        
        // Movement-specific filter elements
        const movementForm = document.getElementById('filtrosForm');
        const busquedaInput = document.getElementById('busqueda');
        const tipoMovimientoSelect = document.getElementById('tipo_movimiento');
        const fechaDesdeInput = document.getElementById('fecha_desde');
        const fechaHastaInput = document.getElementById('fecha_hasta');

        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', async () => {
                this.currentFilter = filterSelect?.value || '';
                this.currentInputFilter = inputFilterInput?.value || '';
                
                // Handle movement-specific filters
                if (movementForm) {
                    this.currentSearchTerm = busquedaInput?.value || '';
                    this.currentMovementType = tipoMovimientoSelect?.value || '';
                    this.currentFechaDesde = fechaDesdeInput?.value || '';
                    this.currentFechaHasta = fechaHastaInput?.value || '';
                }      
                
                const newData = await this.loadData(1, this.pageSize, this.currentSearchTerm, this.currentFilter, this.currentInputFilter, this.currentMovementType, this.currentFechaDesde, this.currentFechaHasta);
                const stats = await this.loadStats();
                this.renderContent(newData, stats);
                
                setTimeout(() => {
                    this.restoreFilterValues();
                    this.setupEventListeners();
                }, 50);
            });
        }
        
        const handleClear = async () => {
            this.clearFilters();
            const newData = await this.loadData(1, this.pageSize, '', '', '', '', '', '');
            const stats = await this.loadStats();
            this.renderContent(newData, stats);
            setTimeout(() => this.setupEventListeners(), 50);
        };
        
        clearFiltersBtn && clearFiltersBtn.addEventListener('click', handleClear);
        clearFiltersMovementBtn && clearFiltersMovementBtn.addEventListener('click', handleClear);
        
    }

    /**
     * Attach movement form listener
     */
    attachMovementFormListener() {
        const movementForm = document.getElementById('filtrosForm');
        
        if (movementForm) {
            movementForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const busquedaInput = document.getElementById('busqueda');
                const tipoMovimientoSelect = document.getElementById('tipo_movimiento');
                const fechaDesdeInput = document.getElementById('fecha_desde');
                const fechaHastaInput = document.getElementById('fecha_hasta');

                
                this.currentSearchTerm = busquedaInput?.value || '';
                this.currentMovementType = tipoMovimientoSelect?.value || '';
                this.currentFechaDesde = fechaDesdeInput?.value || '';
                this.currentFechaHasta = fechaHastaInput?.value || '';

         
                const newData = await this.loadData(1, this.pageSize, this.currentSearchTerm, this.currentFilter, this.currentInputFilter, this.currentMovementType, this.currentFechaDesde, this.currentFechaHasta);
                const stats = await this.loadStats();
                this.renderContent(newData, stats);
                
                setTimeout(() => {
                    this.restoreFilterValues();
                    this.setupEventListeners();
                }, 50);
            });
        }
    }

    /**
     * Restore filter values
     */
    restoreFilterValues() {
        const filterSelect = document.getElementById('filter-select');
        let inputFilterInput = null;
        if (filterSelect && filterSelect.parentElement) {
            inputFilterInput = filterSelect.parentElement.querySelector('input[type="text"]');
        }
        
        if (filterSelect) filterSelect.value = this.currentFilter;
        if (inputFilterInput) inputFilterInput.value = this.currentInputFilter;
        
        const searchInput = document.getElementById('table-search-input');
        if (searchInput && this.currentSearchTerm) {
            searchInput.value = this.currentSearchTerm;
        }
        
        // Restore movement-specific filter values
        const busquedaInput = document.getElementById('busqueda');
        const tipoMovimientoSelect = document.getElementById('tipo_movimiento');
        const fechaDesdeInput = document.getElementById('fecha_desde');
        const fechaHastaInput = document.getElementById('fecha_hasta');
        
        if (busquedaInput) busquedaInput.value = this.currentSearchTerm;
        if (tipoMovimientoSelect) tipoMovimientoSelect.value = this.currentMovementType;
        if (fechaDesdeInput) fechaDesdeInput.value = this.currentFechaDesde;
        if (fechaHastaInput) fechaHastaInput.value = this.currentFechaHasta;
    }

    /**
     * Clear filters
     */
    clearFilters() {
        this.currentFilter = '';
        this.currentInputFilter = '';
        this.currentSearchTerm = '';
        this.currentMovementType = '';
        this.currentFechaDesde = '';
        this.currentFechaHasta = '';
        
        // Clear movement-specific filter inputs
        const busquedaInput = document.getElementById('busqueda');
        const tipoMovimientoSelect = document.getElementById('tipo_movimiento');
        const fechaDesdeInput = document.getElementById('fecha_desde');
        const fechaHastaInput = document.getElementById('fecha_hasta');
        
        if (busquedaInput) busquedaInput.value = '';
        if (tipoMovimientoSelect) tipoMovimientoSelect.value = '';
        if (fechaDesdeInput) fechaDesdeInput.value = '';
        if (fechaHastaInput) fechaHastaInput.value = '';
    }

    /**
     * Setup search handler
     */
    setupSearchHandler(stats) {
        const searchWrapper = (page, pageSize, search) => {
            return this.loadData(page, pageSize, search, this.currentFilter, this.currentInputFilter, this.currentMovementType, this.currentFechaDesde, this.currentFechaHasta);
        };

        const updateContent = (newData) => {
            this.renderContent(newData, stats);
            setTimeout(() => {
                this.setupEventListeners();
            }, 50);
        };

        window[`handle${this.config.name}TableSearch`] = createSearchHandler(
            searchWrapper,
            updateContent,
            this.config.name.toLowerCase()
        );
    }

    /**
     * Change page
     */
    async changePage(newPage) {
        const newData = await this.loadData(newPage, this.pageSize, this.currentSearchTerm, this.currentFilter, this.currentInputFilter, this.currentMovementType, this.currentFechaDesde, this.currentFechaHasta);
        const stats = await this.loadStats();
        this.renderContent(newData, stats);
        
        setTimeout(() => {
            this.restoreFilterValues();
            this.setupEventListeners();
        }, 50);
    }
}

/**
    * Factory to create section configurations
    * This is a factory that can be used to create different section configurations
 */
export const SectionFactory = {
    /**
     * Create configuration for products
     */
    createProductsSection(ProductService) {
        return {
            name: 'Productos',
            sectionKey: 'productos',
            pageSize: 5,
            searchFields: ['name', 'description'],
            localFilter: false,
            
            loader: (page, pageSize, search, filter, category) => 
                ProductService.getProducts(page, pageSize, search, filter, category),
            
            statsLoader: async () => {
                const [totalProducts, totalValue] = await Promise.all([
                    ProductService.getTotalProducts(),
                    ProductService.getTotalValue()
                ]);
                return { totalProducts, totalValue };
            },
            
            actionButtons: (producto) => `
                <div style="display:flex;gap:6px;">
                    <button onclick="editProduct(${producto.id})" class="tbl-btn tbl-btn-edit">Editar</button>
                    <button onclick="deleteProduct(${producto.id})" class="tbl-btn tbl-btn-delete">Eliminar</button>
                </div>
            `,
            
            tableRenderer: (data) => {
                return Table.render({
                    headers: ['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Categoría', 'Acciones'],
                    body: data.data,
                    dataFields: data.data.length > 0 ? Object.keys(data.data[0]) : [],
                    striped: true,
                    hover: true,
                    responsive: false,
                    showSearch: true,
                    showFilters: true,
                    filters: ['Stock bajo', 'Stock Alto', 'Precio bajo', 'Precio alto'],
                    filterValues: ['stock', '-stock', 'price', '-price'],
                    showInputFilter: true,
                    inputFilter: 'category',
                    showCheckboxes: false,
                    size: 'lg',
                    variant: 'primary',
                    showPagination: true,
                    itemsPerPage: 5,
                    currentPage: data.currentPage,
                    totalItems: data.totalItems,
                    onPageChange: (newPage) => {
                        console.log('Cambiando a página:', newPage);
                    }
                });
            },
            
            statsRenderer: (stats) => {
                const colombianFormat = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });
                const safeValue = Number(stats.totalValue) || 0;
                
                return `
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-card-icon blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4.5v9l-8 4.5l-8-4.5v-9z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 12l8-4.5M12 12v9M12 12l-8-4.5"/>
                                </svg>
                            </div>
                            <div class="stat-card-body">
                                <span class="stat-card-value">${stats.totalProducts ?? '—'}</span>
                                <span class="stat-card-label">Total Productos</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-icon green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div class="stat-card-body">
                                <span class="stat-card-value" style="font-size:16px;">${colombianFormat.format(safeValue)}</span>
                                <span class="stat-card-label">Valor del Inventario</span>
                            </div>
                        </div>
                    </div>
                `;
            },
            
            actionsRenderer: () => `
                <div class="section-card">
                    <div class="action-bar">
                        <div class="action-bar-left"></div>
                        <button id="agregar-producto" onclick="openAddProductModal()" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Agregar Producto
                        </button>
                    </div>
                </div>
            `
        };
    },

    /**
     * Create configuration for categories
     */
    createCategoriesSection(ProductService) {
        return {
            name: 'Categorías',
            sectionKey: 'categorias',
            pageSize: 5,
            searchFields: ['name', 'description'],
            localFilter: true,
            
            loader: (page, pageSize, search) => 
                ProductService.getCategoriesAll(page, pageSize, search),
            statsLoader: async () => {
                const categories = await ProductService.getCategories();
                return { totalCategories: categories.length };
            },
            
            actionButtons: (category) => `
                <div style="display:flex;gap:6px;">
                    <button onclick="editCategory(${category.id})" class="tbl-btn tbl-btn-edit">Editar</button>
                    <button onclick="deleteCategory(${category.id})" class="tbl-btn tbl-btn-delete">Eliminar</button>
                </div>
            `,
            
            tableRenderer: (data) => {
                return Table.render({
                    headers: ['ID', 'Nombre', 'Descripción', 'Acciones'],
                    body: data.data,
                    dataFields: data.data.length > 0 ? Object.keys(data.data[0]) : [],
                    striped: true,
                    hover: true,
                    responsive: false,
                    showSearch: true,
                    showFilters: false,
                    filters: [],
                    filterValues: [],
                    showCheckboxes: false,
                    size: 'lg',
                    variant: 'primary',
                    showPagination: true,
                    itemsPerPage: 5,
                    currentPage: data.currentPage,
                    totalItems: data.totalItems,
                    onPageChange: (newPage) => {
                        console.log('Cambiando a página:', newPage);
                    }
                });
            },
            
            actionsRenderer: () => `
                <div class="section-card">
                    <div class="action-bar">
                        <div class="action-bar-left"></div>
                        <button id="agregar-categoria" onclick="openAddCategoryModal()" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Agregar Categoría
                        </button>
                    </div>
                </div>
            `
        };
    },

    createSuppliesSection(SupplyService) {
        return {
            name: 'Insumos',
            sectionKey: 'insumos',
            pageSize: 5,
            searchFields: ['name', 'description'],
            localFilter: false,
            loader: (page, pageSize, search, filter, supplier) => 
                SupplyService.getSupplies(page, pageSize, search, filter, supplier),
            statsLoader: async () => {
                  const [totalSupplies, totalValue] = await Promise.all([
                    SupplyService.getTotalSupplies(),
                    SupplyService.getTotalValue()
                ]);
                return { totalSupplies, totalValue };
            },
            actionButtons: (supply) => `
                <div style="display:flex;gap:6px;">
                    <button onclick="editSupply(${supply.id})" class="tbl-btn tbl-btn-edit">Editar</button>
                    <button onclick="deleteSupply(${supply.id})" class="tbl-btn tbl-btn-delete">Eliminar</button>
                </div>
            `,
            tableRenderer: (data) => {
                return Table.render({
                    headers: ['ID', 'Nombre', 'Descripción', 'Precio Unitario', 'Stock', 'Proveedor Asociado', 'Acciones'],
                    body: data.data,
                    dataFields: data.data.length > 0 ? Object.keys(data.data[0]) : [],
                    striped: true,
                    hover: true,
                    responsive: false,
                    showSearch: true,
                    showFilters: true,
                    filters: ['Stock bajo', 'Stock Alto', 'Precio unitario bajo', 'Precio unitario alto'],
                    filterValues: ['stock', '-stock', 'unitaryPrice', '-unitaryPrice'],
                    showInputFilter: true,
                    inputFilter: 'supplier',
                    showCheckboxes: false,
                    size: 'lg',
                    variant: 'primary',
                    showPagination: true,
                    itemsPerPage: 5,
                    currentPage: data.currentPage,
                    totalItems: data.totalItems,
                    onPageChange: (newPage) => {
                        console.log('Cambiando a página:', newPage);
                    }
                });
            },
            statsRenderer: (stats) => {
                const colombianFormat = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });
                const safeValue = Number(stats.totalValue) || 0;
                
                return `
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-card-icon blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 21v-16a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M3 21h18"/>
                                </svg>
                            </div>
                            <div class="stat-card-body">
                                <span class="stat-card-value">${stats.totalSupplies ?? '—'}</span>
                                <span class="stat-card-label">Total Insumos</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-icon green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div class="stat-card-body">
                                <span class="stat-card-value" style="font-size:16px;">${colombianFormat.format(safeValue)}</span>
                                <span class="stat-card-label">Valor del Inventario</span>
                            </div>
                        </div>
                    </div>
                `;
            },
            actionsRenderer: () => `
                <div class="section-card">
                    <div class="action-bar">
                        <div class="action-bar-left"></div>
                        <button id="agregar-insumo" onclick="openAddSupplyModal()" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Agregar Insumo
                        </button>
                    </div>
                </div>
            `
        };
    },

    createSuppliersSection(SupplyService){
        return{
            name: 'Proveedores',
            sectionKey: 'proveedores',
            pageSize: 5,
            searchFields: ['name', 'description'],
            localFilter: false,
            loader: (page, pageSize, search, filter, supplier) => 
                SupplyService.getSuppliersPaginated(page, pageSize, search, filter, supplier),
            statsLoader: async () => {
                      const suppliers = await SupplyService.getSuppliers();
                return { totalSuppliers: suppliers.length };
            },
            actionButtons: (supplier) => `
                <div style="display:flex;gap:6px;">
                    <button onclick="editSupplier(${supplier.id})" class="tbl-btn tbl-btn-edit">Editar</button>
                    <button onclick="deleteSupplier(${supplier.id})" class="tbl-btn tbl-btn-delete">Eliminar</button>
                </div>
            `,
            tableRenderer: (data) => {
                return Table.render({
                    headers: ['ID', 'Nombre', 'NIT', 'Teléfono', 'Correo Electrónico', 'Dirección', 'Acciones'],
                    body: data.data,
                    dataFields: data.data.length > 0 ? Object.keys(data.data[0]) : [],
                    striped: true,
                    hover: true,
                    responsive: false,
                    showSearch: true,
                    showFilters: false,
                    filters: [],
                    filterValues: [],
                    showInputFilter: false,
                    inputFilter: '',
                    showCheckboxes: false,
                    size: 'lg',
                    variant: 'primary',
                    showPagination: true,
                    itemsPerPage: 5,
                    currentPage: data.currentPage,
                    totalItems: data.totalItems,
                    onPageChange: (newPage) => {
                        console.log('Cambiando a página:', newPage);
                    }
                });
            },
            actionsRenderer: () => `
                <div class="section-card">
                    <div class="action-bar">
                        <div class="action-bar-left"></div>
                        <button id="agregar-proveedor" onclick="openAddSupplierModal()" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Agregar Proveedor
                        </button>
                    </div>
                </div>
            `
        }
    },

    createMovementSection(MovementService,tipoMovimiento){
        return{
            name: 'Movimientos',
            sectionKey: 'movimientos',
            pageSize: 4,
            searchFields: ['name', 'description'],
            localFilter: false,
            loader: (page, pageSize, search, filter, movementType, fechaDesde, fechaHasta) => {
                return MovementService.getMovements(page, pageSize, search, filter, movementType, fechaDesde, fechaHasta,tipoMovimiento)
            },
            actionButtons: (movement) => `
                <div style="display:flex;gap:6px;">
                    <button onclick="editMovement(${movement.id},'${tipoMovimiento}')" class="tbl-btn tbl-btn-edit">Editar</button>
                    <button onclick="deleteMovement(${movement.id},'${tipoMovimiento}')" class="tbl-btn tbl-btn-delete">Eliminar</button>
                </div>
            `,
            tableRenderer: (data) => {
                return Table.render({
                    headers: ['ID', tipoMovimiento , 'Usuario relacionado', 'Tipo de modificación', 'Stock modificado','Comentario' ,'Fecha de creación', 'Fecha de modificación','Acciones'],
                    body: data.data,
                    dataFields: data.data.length > 0 ? Object.keys(data.data[0]) : [],
                    striped: true,
                    hover: true,
                    responsive: false,
                    showSearch: false,
                    showFilters: false,
                    filters: [],
                    filterValues: [],
                    showInputFilter: false,
                    inputFilter: '',
                    showCheckboxes: false,
                    size: 'lg',
                    variant: 'primary',
                    showPagination: true,
                    itemsPerPage: 4,
                    currentPage: data.currentPage,
                    totalItems: data.totalItems,
                    onPageChange: (newPage) => {
                        console.log('Cambiando a página:', newPage);
                    }
                });
            },
            actionsRenderer: () => `
                <!-- Filter card -->
                <div class="section-card">
                    <div class="section-card-header">
                        <h2 class="section-card-title" style="display:flex;align-items:center;gap:8px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414V20l-4-2v-5.879L3.293 6.707A1 1 0 013 6V4z"/>
                            </svg>
                            Filtros de búsqueda
                        </h2>
                    </div>
                    <div class="section-card-body">
                        <form method="GET" id="filtrosForm" style="display:flex;flex-direction:column;gap:16px;">
                            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;">
                                <div style="display:flex;flex-direction:column;gap:5px;">
                                    <label for="busqueda" style="font-size:12px;font-weight:600;color:#4a5568;">Búsqueda general</label>
                                    <input type="text" id="busqueda" name="busqueda" placeholder="Buscar por producto..." class="filter-input" style="width:100%;min-width:unset;">
                                </div>
                                <div style="display:flex;flex-direction:column;gap:5px;">
                                    <label for="tipo_movimiento" style="font-size:12px;font-weight:600;color:#4a5568;">Tipo de movimiento</label>
                                    <select id="tipo_movimiento" name="tipo_movimiento" class="filter-select" style="width:100%;min-width:unset;">
                                        <option value="">Todos los tipos</option>
                                        <option>Entrada</option>
                                        <option>Salida</option>
                                    </select>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:5px;">
                                    <label for="fecha_desde" style="font-size:12px;font-weight:600;color:#4a5568;">Fecha desde</label>
                                    <input type="date" id="fecha_desde" name="fecha_desde" class="filter-input" style="width:100%;min-width:unset;">
                                </div>
                                <div style="display:flex;flex-direction:column;gap:5px;">
                                    <label for="fecha_hasta" style="font-size:12px;font-weight:600;color:#4a5568;">Fecha hasta</label>
                                    <input type="date" id="fecha_hasta" name="fecha_hasta" class="filter-input" style="width:100%;min-width:unset;">
                                </div>
                            </div>
                            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                                <button type="submit" class="btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                    Aplicar filtros
                                </button>
                                <button type="button" id="clear-movements-filters" class="btn-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                    Limpiar filtros
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Action buttons -->
                <div class="section-card">
                    <div class="action-bar">
                        <div class="action-bar-left"></div>
                          <button onclick="openGenerateReportModal('${tipoMovimiento}')" class="btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M5 19a9 9 0 0114-7.5M19 5a9 9 0 00-14 7.5"/>
                                </svg>
                                Generar reporte
                            </button>
                        <button onclick="openAddMovementModal('${tipoMovimiento}')" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Nuevo movimiento
                        </button>
                    </div>
                </div>
            `
        }
    }
}

  