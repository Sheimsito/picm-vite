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
        
        return {
            data: this.addActionButtons(data),
            totalItems: response.count || data.length,
            currentPage: page
        };
    }

    /**
     * Add action buttons to the data
     */
    addActionButtons(data) {
        return data.map(item => ({
            ...item,
            acciones: this.config.actionButtons(item)
        }));
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
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 class="text-red-800 font-semibold mb-2">Error al cargar ${this.config.name}</h3>
                <p class="text-red-600">${error.message}</p>
                <button onclick="showSection('${this.config.sectionKey}')" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
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
                <div class="flex space-x-2">
                    <button onclick="editProduct(${producto.id})" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Editar</button>
                    <button onclick="deleteProduct(${producto.id})" class="bg-red-500 hover:bg-red-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Eliminar</button>
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
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-6xl mt-[2rem] mb-[1rem]">
                        <div class="flex flex-col justify-center items-center bg-white p-2! rounded-lg shadow-md h-25">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Productos</h3>
                            <p class="text-3xl font-bold text-primary">${stats.totalProducts}</p>
                        </div>
                        <div class="flex flex-col justify-center items-center bg-white p-2! rounded-lg shadow-md h-25">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Valor Total del Inventario</h3>
                            <p class="text-3xl font-bold text-success">${colombianFormat.format(safeValue)}</p>
                        </div>
                    </div>
                `;
            },
            
            actionsRenderer: () => `
                <div class="w-6xl mt-[1rem] mb-[1rem] flex justify-end w-full items-center">                  
                    <button id="agregar-producto" onclick="openAddProductModal()" class="h-10 w-[20rem] bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] border border-[var(--color-success)] text-white px-3 py-1 rounded text-sm">Agregar Producto</button>
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
                <div class="flex space-x-2">
                    <button onclick="editCategory(${category.id})" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Editar</button>
                    <button onclick="deleteCategory(${category.id})" class="bg-red-500 hover:bg-red-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Eliminar</button>
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
                <div class="w-6xl mt-[1rem] mb-[1rem] flex justify-end w-full items-center">                  
                    <button id="agregar-categoria" onclick="openAddCategoryModal()" class="h-10 w-[20rem] bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] border border-[var(--color-success)] text-white px-3 py-1 rounded text-sm">Agregar Categoría</button>
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
                <div class="flex space-x-2">
                    <button onclick="editSupply(${supply.id})" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Editar</button>
                    <button onclick="deleteSupply(${supply.id})" class="bg-red-500 hover:bg-red-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Eliminar</button>
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
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-6xl mt-[2rem] mb-[1rem]">
                        <div class="flex flex-col justify-center items-center bg-white p-2! rounded-lg shadow-md h-25">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Insumos</h3>
                            <p class="text-3xl font-bold text-primary">${stats.totalSupplies}</p>
                        </div>
                        <div class="flex flex-col justify-center items-center bg-white p-2! rounded-lg shadow-md h-25">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Valor Total del Inventario</h3>
                            <p class="text-3xl font-bold text-success">${colombianFormat.format(safeValue)}</p>
                        </div>
                    </div>
                `;
            },
            actionsRenderer: () => `
                <div class="w-6xl mt-[1rem] mb-[1rem] flex justify-end w-full items-center">                  
                    <button id="agregar-insumo" onclick="openAddSupplyModal()" class="h-10 w-[20rem] bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] border border-[var(--color-success)] text-white px-3 py-1 rounded text-sm">Agregar Insumo</button>
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
                <div class="flex space-x-2">
                    <button onclick="editSupplier(${supplier.id})" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Editar</button>
                    <button onclick="deleteSupplier(${supplier.id})" class="bg-red-500 hover:bg-red-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Eliminar</button>
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
                <div class="w-6xl mt-[1rem] mb-[1rem] flex justify-end w-full items-center">                  
                    <button id="agregar-proveedor" onclick="openAddSupplierModal()" class="h-10 w-[20rem] bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] border border-[var(--color-success)] text-white px-3 py-1 rounded text-sm">Agregar Proveedor</button>
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
                <div class="flex space-x-2">
                    <button onclick="editMovement(${movement.id},'${tipoMovimiento}')" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Editar</button>
                    <button onclick="deleteMovement(${movement.id},'${tipoMovimiento}')" class="bg-red-500 hover:bg-red-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Eliminar</button>
                </div>
            `,
            tableRenderer: (data) => {
                return Table.render({
                    headers: ['ID', tipoMovimiento , 'Usuario relacionado', 'Tipo de modificación', 'Stock modificado','Comentario' ,'Fecha de creación', 'Fecha de modificación', 'Acciones'],
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
                        <!-- ============ COLLAPSE DE FILTROS DE BÚSQUEDA ============ -->
                        
                            <div class="w-[81%] bg-white border border-gray-200 rounded-none shadow-sm ">
                                <div class="border-b border-gray-200 px-5 py-3">
                                    <h2 class="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                        <!-- Heroicon outline funnel -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414V20l-4-2v-5.879L3.293 6.707A1 1 0 013 6V4z"/>
                                        </svg>
                                        Filtros de búsqueda
                                        <!-- Badge -->
                                        <span class="ml-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                                            Filtros activos
                                        </span>
                                    </h2>
                                </div>

                                <!-- collapse con details -->
                                <details class="p-5" open>
                                    <summary class="cursor-pointer text-gray-700 font-medium hover:text-blue-600 mb-4">
                                        Mostrar / Ocultar filtros
                                    </summary>

                                    <form method="GET" id="filtrosForm" class="space-y-5">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <!-- Búsqueda general -->
                                            <div>
                                                <label for="busqueda" class="block text-sm font-medium text-gray-700 mb-1">Búsqueda general</label>
                                                <input type="text" id="busqueda" name="busqueda"
                                                    placeholder="Busca aquí por producto."
                                                    class="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800 text-sm">
                                            </div>
                       

                                            <!-- Tipo de movimiento -->
                                            <div>
                                                <label for="tipo_movimiento" class="block text-sm font-medium text-gray-700 mb-1">Tipo de movimiento</label>
                                                <select id="tipo_movimiento" name="tipo_movimiento"
                                                        class="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800 text-sm">
                                                    <option value="">Todos los tipos</option>
                                                    <option>Entrada</option>
                                                    <option>Salida</option>
                                                </select>
                                            </div>

                                            <!-- Fecha desde -->
                                            <div>
                                                <label for="fecha_desde" class="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
                                                <input type="date" id="fecha_desde" name="fecha_desde"
                                                    class="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800 text-sm">
                                            </div>

                                            <!-- Fecha hasta -->
                                            <div>
                                                <label for="fecha_hasta" class="block text-sm font-medium text-gray-700 mb-1">Fecha hasta</label>
                                                <input type="date" id="fecha_hasta" name="fecha_hasta"
                                                    class="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800 text-sm">
                                            </div>
                                        </div>

                                        <!-- Botones -->
                                        <div class=" flex flex-wrap items-center gap-3">
                                            <button type="submit"
                                                    class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
                                                <!-- Heroicon outline magnifying-glass -->
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                                </svg>
                                                Aplicar filtros
                                            </button>

                                            <button type= "button" id="clear-movements-filters"
                                            class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm transition">
                                                <!-- Heroicon outline x-mark -->
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                                Limpiar filtros
                                            </button>

                                            <span class="text-gray-500 text-sm flex items-center gap-1">
                                                <!-- Heroicon outline information-circle -->
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M11.25 9.75h1.5m-1.5 3h1.5m-1.5 3h1.5M12 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75 2.25 17.385 2.25 12 6.615 2.25 12 2.25z"/>
                                                </svg>
                                                Mostrando resultados filtrados
                                            </span>
                                        </div>
                                    </form>
                                </details>
                            </div>
                        </div>
                    
                    <div class="max-w-7xl mx-auto px-4 py-6">

                        <!-- ============ BOTONES ACCIÓN SUPERIOR ============ -->
                        <div class="flex flex-col sm:flex-row justify-end gap-3 mb-8">

                           <!-- Movimientos inactivos -->
                            <button
                                onclick="openInactiveMovementsModal()"
                                class="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-md shadow-sm transition">
                                <!-- Heroicon Outline ArrowPath (casi recycle) -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 4v5h5M20 20v-5h-5M5 19a9 9 0 0114-7.5M19 5a9 9 0 00-14 7.5"/>
                                </svg>
                                Movimientos inactivos
                            </button>
                            
                            <!-- Nuevo movimiento -->
                            <button
                                onclick="openAddMovementModal('${tipoMovimiento}')"
                                class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md shadow-sm transition">
                                <!-- Heroicon Outline Plus -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                                </svg>
                                Nuevo movimiento
                            </button>                
                        </div>
            `
        }
    }
}