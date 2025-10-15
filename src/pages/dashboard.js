import '../css/dashboard.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'
import { Table } from '../components/ui/table.js'
import { Modal } from '../components/ui/modal.js'
import { ProductService } from '../api/services/productService.js'

export const Dashboard = {
    render(){
        return `
    <div class="flex flex-col lg:flex-row h-screen bg-white">
    <header class="flex flex-col w-full lg:w-1/6 xl:w-1/6 border-r border-gray-200 shadow-sm bg-white h-fit  lg:h-screen">
        <div class="flex justify-center items-center p-4 border-b border-gray-200">
            <div class="bg-[var(--color-primary)] text-white rounded-xl p-4 flex flex-col items-center justify-center gap-1 w-4/5 min-h-[50px] ">
                <div class="font-bold text-sm lg:text-base leading-tight tracking-wide text-white whitespace-nowrap">StayAwayCo</div>
                <div class="font-semibold text-xs tracking-wider text-white">PICM</div>
            </div>
        </div>
        <nav class="flex flex-col pl-2 h-[65vh]">
            <ul class="pt-8 list-none flex flex-col gap-2">
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="inicio">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                            <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                            <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                            <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Inicio</span>
                    </button>
                </li>

                 <!-- Navegación de items relacionados al módulo de productos -->
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="productos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-building-store">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" />
                            <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                            <path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" />
                            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Productos</span>
                    </button>
                </li>
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="categorias">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-category">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 4h6v6h-6z" /><path d="M14 4h6v6h-6z" />
                            <path d="M4 14h6v6h-6z" />
                            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Categorías</span>
                    </button>
                </li>

                <!-- Navegación de items relacionados al módulo de materias primas / insumos -->
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="insumos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-building-factory-2">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21h18" />
                            <path d="M5 21v-12l5 4v-4l5 4h4" />
                            <path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" />
                            <path d="M9 17h1" /><path d="M14 17h1" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Insumos</span>
                    </button>
                </li>
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="proveedores">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-check">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                            <path d="M15 19l2 2l4 -4" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Proveedores</span>
                    </button>
                </li>
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="movimientos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M3 10h18" />
                            <path d="M16 19h6" />
                            <path d="M19 16l3 3l-3 3" />
                            <path d="M7.005 15h.005" />
                            <path d="M11 15h2" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Movimientos</span>
                    </button>
                </li>
                <li class="flex flex-row items-center cursor-pointer w-[90%]">
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="documentos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-analytics">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <path d="M9 17l0 -5" />
                            <path d="M12 17l0 -1" />
                            <path d="M15 17l0 -3" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Documentos</span>
                    </button>
                </li>
            </ul>
        </nav>


        <!-- Footer del Sidebar -->
        <footer class="mt-auto p-4 pt-4 pb-4 pl-4 border-t border-gray-200">
            <ul class="w-full list-none">
                <li class="flex flex-row items-center cursor-pointer w-[90%] mb-2">
                    <button id="help" class="flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-help">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M12 17l0 .01" />
                            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Ayuda</span>
                    </button>
                </li>


                <li class="flex flex-row items-center cursor-pointer w-[90%] mb-2">
                    <button id="settings" class="flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-settings">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Configuraciones</span>
                    </button>
                </li>
                <li class="flex flex-row items-center cursor-pointer w-[90%] mb-2">
                    <button id="logout" class="flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-error)] hover:border-[var(--color-error)] hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Cerrar sesión</span>
                    </button>
                </li>
            </ul>
        </footer>
    </header>

    <main class="flex-1 lg:w-5/6 xl:w-4/5 bg-gray-50">
        <header class="w-full px-4 lg:px-20 py-6 border-r-0 pb-4 shadow-none">
            <h1 class="text-2xl lg:text-4xl font-bold" id="main-title">Dashboard</h1>
        </header>
        
        <!-- Contenido dinámico -->
        <div id="dashboard-content" class="p-4 lg:p-6 flex flex-col gap-4 justify-center items-center ">
            <!-- El contenido se cargará aquí dinámicamente -->
        </div>
    </main>
    </div>
        `;
    },
    
    init(){
        // Logout functionality
        const logout = document.getElementById('logout');
        logout.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                await AuthService.logout();
                Notification.show('Sesión cerrada correctamente', 'success', {
                    duration: 1100
                });

                setTimeout(() => {
                    window.location.hash = '#/login';
                }, 1500);
            } catch (error) {
                Notification.show('Error al cerrar sesión: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        });

        // Navigation functionality
        const navButtons = document.querySelectorAll('.dashboard-nav-button');
        const mainTitle = document.getElementById('main-title');
        const dashboardContent = document.getElementById('dashboard-content');

        // Función para mostrar contenido según la sección
        const showSection = async (section) => {
            mainTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
            
            switch(section) {
                case 'inicio':
                    dashboardContent.innerHTML = `
                    <!-- Contenido de inicio Proximamente -->
                    `;
                    break;
                    
                case 'productos':

                    let currentSearchTerm = '';
                    let currentFilter = ''; 
                    let currentCategory = ''; 
                    // Función para cargar productos con paginación
                    const loadProducts = async (page, pageSize, search = '', filter = '', category = '') => {
                        try {
                            const response = await ProductService.getProducts(page, pageSize, search, filter, category);
                          
                            
                            // Extraer datos de la respuesta paginada
                            const productosData = response.results || response.data || response;
                            const totalItems = response.count || productosData.length;
                            const currentPage = page;
                            const hasNext = response.next !== null;
                            const hasPrevious = response.previous !== null;
                            console.log(productosData);
                            // Procesar los datos para agregar botones de acción
                            const productosDataWithActions = productosData.map(producto => ({
                                ...producto,
                                acciones: `
                                    <div class="flex space-x-2">
                                        <button onclick="editProduct(${producto.id})" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded ">Editar</button>
                                        <button onclick="deleteProduct(${producto.id})" class="bg-red-500 hover:bg-red-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded ">Eliminar</button>
                                    </div>
                                `
                            }));
                            
                            // Crear dataFields basándose en las propiedades disponibles
                            let dataFields = [];
                            if (productosDataWithActions.length > 0) {
                                dataFields = Object.keys(productosDataWithActions[0]);
                            }                      
                            const productosTable = Table.render({
                                headers: ['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Categoría', 'Acciones'],
                                body: productosDataWithActions,
                                dataFields: dataFields,
                                striped: true,
                                hover: true,
                                responsive: false,
                                showSearch: true,
                                showFilters: true,
                                filters: ['Stock bajo', 'Stock Alto', 'Precio bajo', 'Precio alto'],
                                filterValues: ['low-stock', 'high-stock', 'low-price', 'high-price'],
                                showCheckboxes: false,
                                size: 'lg',
                                variant: 'primary',
                                // Parámetros de paginación
                                showPagination: true,
                                itemsPerPage: pageSize,
                                currentPage: currentPage,
                                totalItems: totalItems,
                                onPageChange: (newPage) => {
                                    console.log('Cambiando a página:', newPage);
                                    loadProducts(newPage, 5);
                                }
                            });           
                            return productosTable;
                        } catch (error) {
                            console.error('Error al cargar productos:', error);
                            return '<p class="text-red-500">Error al cargar los productos</p>';
                        }
                    };
                    
                    // Cargar productos iniciales
                    const productosTable = await loadProducts(1, 5);
                    const totalProducts = await ProductService.getTotalProducts();
                    const totalValue = await ProductService.getTotalValue();
                    const colombianFormat = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });
                    const safeValue = Number(totalValue) || 0;

                    // Función para actualizar el contenido del dashboard
                    const updateDashboardContent = (tableHTML, totalProducts, totalValue) => {
                        console.log(totalProducts)
                        console.log(totalValue)
                        dashboardContent.innerHTML = 
                        `
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-6xl mt-[2rem] mb-[1rem]">
                            <div class="flex flex-col justify-center items-center bg-white p-2! rounded-lg shadow-md h-25">
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Productos</h3>
                                <p class="text-3xl font-bold text-primary">${totalProducts}</p>
                            </div>
                            <div class="flex flex-col justify-center items-center bg-white p-2! rounded-lg shadow-md h-25">
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Valor Total del Inventario</h3>
                                <p class="text-3xl font-bold text-success">${colombianFormat.format(safeValue)}</p>
                            </div>
                        </div>
                    
                        <div class="w-6xl mt-[1rem] mb-[1rem] flex justify-end w-full items-center">                  
                            <button id="agregar-producto" onclick="openAddProductModal()" class="h-10 w-[20rem] bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] border border-[var(--color-success)] text-white px-3 py-1 rounded text-sm">Agregar Producto</button>
                        </div>
                        ${tableHTML}
                        `;
                    };
                    
                    // Actualizar contenido inicial
                    updateDashboardContent(productosTable, totalProducts, colombianFormat.format(safeValue));

                    // Después de la función updateDashboardContent (línea 316), agrega esta nueva función:

                    const attachEventListeners = () => {
                        const filterSelect = document.getElementById('filter-select');
                        const categoryInput = document.getElementById('category-input');
                        const applyFiltersBtn = document.getElementById('apply-filters');
                        const clearFiltersBtn = document.getElementById('clear-filters');
                        const searchInput = document.getElementById('table-search-input');

                        
                        // Aplicar filtros
                        if (applyFiltersBtn) {
                            applyFiltersBtn.addEventListener('click', async () => {
                                currentFilter = filterSelect.value;
                                currentCategory = categoryInput.value;
                              
                                const newTable = await loadProducts(1, 5, currentSearchTerm, currentFilter, currentCategory);
                                console.log(newTable);
                                updateDashboardContent(newTable, totalProducts, colombianFormat.format(safeValue));
                                
                                // Restaurar valores y reattach listeners
                                setTimeout(() => {
                                    document.getElementById('filter-select').value = currentFilter;
                                    document.getElementById('category-input').value = currentCategory;
                                    const searchInput = document.getElementById('table-search-input');
                                    if (searchInput && currentSearchTerm) {
                                        searchInput.value = currentSearchTerm;
                                    }
                                    attachEventListeners(); // ← RE-ATTACH aquí
                                }, 50);
                            });
                        }
                        
                        // Limpiar filtros
                        if (clearFiltersBtn) {
                            clearFiltersBtn.addEventListener('click', async () => {
                                currentFilter = '';
                                currentCategory = '';
                                currentSearchTerm = '';
                                
                                const newTable = await loadProducts(1, 5, '', '', '');
                                updateDashboardContent(newTable, totalProducts, colombianFormat.format(safeValue));
                                
                                setTimeout(() => {
                                    attachEventListeners(); // ← RE-ATTACH aquí
                                }, 50);
                            });
                        }
                        
                        // Event listener para búsqueda
                        if (searchInput) {
                            searchInput.addEventListener('input', (e) => {
                                window.handleTableSearch(e.target.value);
                            });
                        }
                    };

                    // Actualizar contenido inicial
                    updateDashboardContent(productosTable, totalProducts, colombianFormat.format(safeValue));

                    // Llamar a attachEventListeners por primera vez
                    setTimeout(() => {
                        attachEventListeners();
                    }, 100);
                    // Función mejorada para cambiar página que actualiza el contenido
                    window.changePage = async (newPage) => {
                        const newTable = await loadProducts(newPage, 5, currentSearchTerm, currentFilter, currentCategory);
                        updateDashboardContent(newTable, totalProducts, colombianFormat.format(safeValue));
                        
                        // Restaurar valores y reattach
                        setTimeout(() => {
                            document.getElementById('filter-select').value = currentFilter;
                            document.getElementById('category-input').value = currentCategory;
                            const searchInput = document.getElementById('table-search-input');
                            if (searchInput && currentSearchTerm) {
                                searchInput.value = currentSearchTerm;
                            }
                            attachEventListeners(); // ← RE-ATTACH aquí
                        }, 50);
                    };
                    
                    window.handleTableSearch = async (searchTerm) => {
                        currentSearchTerm = searchTerm;
                        
                        if (searchTimeout) {
                            clearTimeout(searchTimeout);
                        }
                        
                        searchTimeout = setTimeout(async () => {
                            console.log('Buscando:', searchTerm);
                            const newTable = await loadProducts(1, 5, searchTerm, currentFilter, currentCategory);
                            updateDashboardContent(newTable, totalProducts, colombianFormat.format(safeValue));
                            
                            // Restaurar valores y reattach
                            setTimeout(() => {
                                document.getElementById('filter-select').value = currentFilter;
                                document.getElementById('category-input').value = currentCategory;
                                const searchInput = document.getElementById('table-search-input');
                                if (searchInput) {
                                    searchInput.value = currentSearchTerm;
                                    searchInput.focus();
                                }
                                attachEventListeners(); // ← RE-ATTACH aquí
                            }, 50);
                        }, 500);
                    };

                    let searchTimeout = null;

                    window.handleTableSearch = async (searchTerm) => {
                        currentSearchTerm = searchTerm;
                        
                        if (searchTimeout) {
                            clearTimeout(searchTimeout);
                        }
                        
                        searchTimeout = setTimeout(async () => {
                            console.log('Buscando:', searchTerm);
                            const newTable = await loadProducts(1, 5, searchTerm, currentFilter, currentCategory);
                            updateDashboardContent(newTable, totalProducts, colombianFormat.format(safeValue));
                            
                            // Restaurar valores
                            setTimeout(() => {
                                document.getElementById('filter-select').value = currentFilter;
                                document.getElementById('category-input').value = currentCategory;
                                const searchInput = document.getElementById('table-search-input');
                                if (searchInput) {
                                    searchInput.value = currentSearchTerm;
                                    searchInput.focus();
                                }
                            }, 50);
                        }, 500);
                    };
                    break;
                    
                case 'categorias':
                    dashboardContent.innerHTML = `
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
                            <p class="text-gray-600">Contenido de categorías próximamente...</p>
                        </div>
                    `;
                    break;
                    
                case 'insumos':
                    dashboardContent.innerHTML = `
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Insumos</h3>
                            <p class="text-gray-600">Contenido de insumos próximamente...</p>
                        </div>
                    `;
                    break;
                    
                case 'proveedores':
                    dashboardContent.innerHTML = `
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Proveedores</h3>
                            <p class="text-gray-600">Contenido de proveedores próximamente...</p>
                        </div>
                    `;
                    break;
                    
                case 'movimientos':
                    dashboardContent.innerHTML = `
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Movimientos</h3>
                            <p class="text-gray-600">Contenido de movimientos próximamente...</p>
                        </div>
                    `;
                    break;
                    
                case 'documentos':
                    dashboardContent.innerHTML = `
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Documentos</h3>
                            <p class="text-gray-600">Contenido de documentos próximamente...</p>
                        </div>
                    `;
                    break;
                    
                default:
                    dashboardContent.innerHTML = '<p class="text-gray-600">Sección no encontrada</p>';
            }
        };

        // Agregar event listeners a los botones de navegación
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Remover clase activa de todos los botones
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase activa al botón clickeado
                button.classList.add('active');
                
                // Obtener la sección del atributo data-section
                const section = button.getAttribute('data-section');
                if (section) {
                    showSection(section);
                }
            });
        });

        // Funciones globales para acciones de productos
        window.editProduct = async (id) => {
            const {name,description,price} = await ProductService.getProductById(id)
            const selectOptions = await ProductService.getCategories()
            Modal.show({
                title: 'Editar Producto',
                inputs: [{
                    title: 'Nombre',
                    type: 'text',
                    placeholder: 'Ingrese el nombre del producto',
                    name: 'nombre',
                    id: 'nombre',
                    value: name || ''
                },
                {
                    title: 'Descripción',
                    type: 'text',
                    placeholder: 'Ingrese la descripción del producto',
                    name: 'descripcion',
                    id: 'descripcion',
                    value: description || ''
                },
                {
                    title: 'Precio',
                    type: 'number',
                    placeholder: 'Ingrese el precio del producto',
                    name: 'precio',
                    id: 'precio',
                    value: price || ''
                },
                {
                    title: 'Categoría',
                    type: 'select',
                    placeholder: 'Seleccione la categoría del producto',
                    name: 'categoria',
                    id: 'categoria',

                }
                ],
                selectOptions: selectOptions,
                showSubmitButton: true,
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                onSubmit: async () => {
                    try {
                        const data = {
                            nombre: document.getElementById('nombre').value,
                            descripcion: document.getElementById('descripcion').value,
                            precio: document.getElementById('precio').value,
                            categoria: document.getElementById('categoria').value,
                        }                    
                        await ProductService.updateProduct(id,data);
                        Notification.show('Producto actualizado correctamente', 'success', {
                            duration: 1100
                        });
                        window.closeModal();
                        // Recargar la tabla de productos
                        showSection('productos');
                    } catch (error) {
                        Notification.show('Error al actualizar el producto: ' + error.message, 'error', {
                            duration: 4000
                        });
                    }
                }

            });
        };

        window.deleteProduct = async (id) => {
            console.log('Eliminando producto con ID:', id);
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                try {
                await ProductService.deleteProduct(id);
                Notification.show('Producto eliminado correctamente', 'success', {
                    duration: 2000
                });
                // Recargar la tabla de productos
                showSection('productos');
            } catch (error) {
                Notification.show('Error al eliminar el producto: ' + error.message, 'error', {
                    duration: 4000
                });
                }
            }
        };

        // Función global para abrir modal de agregar producto
        window.openAddProductModal = async () => {
            const selectOptions = await ProductService.getCategories()
            Modal.show({
                title: 'Agregar Producto',
                inputs: [{
                    title: 'Nombre',
                    type: 'text',
                    placeholder: 'Ingrese el nombre del producto',
                    name: 'nombre',
                    id: 'nombre'
                },
                {
                    title: 'Descripción',
                    type: 'text',
                    placeholder: 'Ingrese la descripción del producto',
                    name: 'descripcion',
                    id: 'descripcion'
                },
                {
                    title: 'Precio',
                    type: 'number',
                    placeholder: 'Ingrese el precio del producto',
                    name: 'precio',
                    id: 'precio'
                },
                {
                    title: 'Categoría',
                    type: 'select',
                    placeholder: 'Seleccione la categoría del producto',
                    name: 'categoria',
                    id: 'categoria'
                }
                ],
                selectOptions: selectOptions,
                showSubmitButton: true,
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                onSubmit: async () => {
                    try {
                        const data = {
                            nombre: document.getElementById('nombre').value,
                            descripcion: document.getElementById('descripcion').value,
                            precio: document.getElementById('precio').value,
                            categoria: document.getElementById('categoria').value,
                        }                    
                        await ProductService.createProduct(data);
                        Notification.show('Producto guardado correctamente', 'success', {
                            duration: 1100
                        });
                        window.closeModal();
                        // Recargar la tabla de productos
                        showSection('productos');
                    } catch (error) {
                        Notification.show('Error al guardar el producto: ' + error.message, 'error', {
                            duration: 4000
                        });
                    }
                }

            });
        };


        // Mostrar sección inicial
        showSection('inicio');
    }   
};