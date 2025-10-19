import '../css/dashboard.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'
import { Modal } from '../components/ui/modal.js'
import { ProductService } from '../api/services/productService.js'
import { SupplyService } from '../api/services/supplyService.js'
import { SectionManager, SectionFactory } from '../api/utils/sectionManager.js'
import { openModalAndHandle, confirmAndDelete } from '../api/utils/dashboardUtils.js'

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
                            <path d="M5 21v-12l5 4v-4l5 4h4" />
                            <path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" />
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
                            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
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
                            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
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
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
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

        // Function to show content according to the section
        const showSection = async (section) => {
            mainTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
            
            // Clean global variables to avoid conflicts between sections
            if (window.handleTableSearch) {
                window.handleTableSearch = null;
            }
            if (window.handleCategoryTableSearch) {
                window.handleCategoryTableSearch = null;
            }
            
            // Clean event listeners of the search input
            const searchInput = document.getElementById('table-search-input');
            if (searchInput) {
                // Clone the element to remove all event listeners
                const newSearchInput = searchInput.cloneNode(true);
                searchInput.parentNode.replaceChild(newSearchInput, searchInput);
            }
            
            switch(section) {
                case 'inicio':
                    dashboardContent.innerHTML = `
                        <div class="bg-white p-8 rounded-lg shadow-md text-center mt-[8rem]">
                            <div class="mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-blue-500">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9,22 9,12 15,12 15,22"/>
                                </svg>
                            </div>
                            <h2 class="text-3xl font-bold text-gray-900 mb-4">Bienvenido al Sistema PICM</h2>
                            <p class="text-lg text-gray-600 mb-6">Sistema de gestión de inventario para cuadros de madera</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h3 class="font-semibold text-blue-900">Productos</h3>
                                    <p class="text-blue-700 text-sm">Gestiona tu inventario de productos</p>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h3 class="font-semibold text-green-900">Categorías</h3>
                                    <p class="text-green-700 text-sm">Organiza tus productos por categorías</p>
                                </div>
                                <div class="bg-yellow-50 p-4 rounded-lg">
                                    <h3 class="font-semibold text-yellow-900">Insumos</h3>
                                    <p class="text-yellow-700 text-sm">Gestiona tus insumos</p>
                                </div>
                                <div class="bg-red-50 p-4 rounded-lg">
                                    <h3 class="font-semibold text-red-900">Proveedores</h3>
                                    <p class="text-red-700 text-sm">Gestiona tus proveedores</p>
                                </div>
                                <div class="bg-orange-50 p-4 rounded-lg">
                                    <h3 class="font-semibold text-orange-900">Movimientos</h3>
                                    <p class="text-orange-700 text-sm">Consulta tus movimientos de productos e insumos</p>
                                </div>
                                <div class="bg-purple-50 p-4 rounded-lg">
                                    <h3 class="font-semibold text-purple-900">Reportes</h3>
                                    <p class="text-purple-700 text-sm">Consulta estadísticas y reportes</p>
                                </div>

                            </div>
                        </div>
                    `;
                    break;
                    
                case 'productos':
               
                    const productsConfig = SectionFactory.createProductsSection(ProductService);
                    const productsManager = new SectionManager(productsConfig);
                    

                    window.changePage = (newPage) => productsManager.changePage(newPage);
                    
                    await productsManager.init();
                    break;
                    
                case 'categorias':
               
                    const categoriesConfig = SectionFactory.createCategoriesSection(ProductService);
                    const categoriesManager = new SectionManager(categoriesConfig);
                    
            
                    window.changePage = (newPage) => categoriesManager.changePage(newPage);
                    
                    await categoriesManager.init();
                    break;
                    
                case 'insumos':
                    const suppliesConfig = SectionFactory.createSuppliesSection(SupplyService);
                    const suppliesManager = new SectionManager(suppliesConfig);
                    
                    window.changePage = (newPage) => suppliesManager.changePage(newPage);
                    
                    await suppliesManager.init();
                    break;
                    
                case 'proveedores':
                    const suppliersConfig = SectionFactory.createSuppliersSection(SupplyService);
                    const suppliersManager = new SectionManager(suppliersConfig);
                    
                    window.changePage = (newPage) => suppliersManager.changePage(newPage);
                    
                    await suppliersManager.init();
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

        // Add event listeners to the navigation buttons
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to the clicked button
                button.classList.add('active');
                
                // Get the section from the data-section attribute
                const section = button.getAttribute('data-section');
                if (section) {
                    showSection(section);
                }
            });
        });

        // Global functions for product actions
        window.openAddProductModal = async () => {
            const selectOptions = await ProductService.getCategories()
            openModalAndHandle({
                title: 'Agregar Producto',
                inputs: [
                    { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del producto', name: 'nombre', id: 'nombre' },
                    { title: 'Descripción', type: 'text', placeholder: 'Ingrese la descripción del producto', name: 'descripcion', id: 'descripcion' },
                    { title: 'Precio', type: 'number', placeholder: 'Ingrese el precio del producto', name: 'precio', id: 'precio' },
                    { title: 'Categoría', type: 'select', placeholder: 'Seleccione la categoría del producto', name: 'categoria', id: 'categoria' }
                ],
                selectOptions,
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                buildPayload: () => ({
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio: document.getElementById('precio').value,
                    categoria: document.getElementById('categoria').value,
                }),
                apiCall: (payload) => ProductService.createProduct(payload),
                successMessage: 'Producto guardado correctamente',
                onSuccess: () => showSection('productos')
            })
        };
        
        window.editProduct = async (id) => {
            const {name,description,price,category} = await ProductService.getProductById(id)
            const selectOptions = await ProductService.getCategories()
            openModalAndHandle({
                title: 'Editar Producto',
                inputs: [
                    { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del producto', name: 'nombre', id: 'nombre', value: name || '' },
                    { title: 'Descripción', type: 'text', placeholder: 'Ingrese la descripción del producto', name: 'descripcion', id: 'descripcion', value: description || '' },
                    { title: 'Precio', type: 'number', placeholder: 'Ingrese el precio del producto', name: 'precio', id: 'precio', value: price || '' },
                    { title: 'Categoría', type: 'select', placeholder: 'Seleccione la categoría del producto', name: 'categoria', id: 'categoria', value: category || '' }
                ],
                selectOptions,
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                buildPayload: () => ({
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio: document.getElementById('precio').value,
                    categoria: document.getElementById('categoria').value,
                }),
                apiCall: (payload) => ProductService.updateProduct(id, payload),
                successMessage: 'Producto actualizado correctamente',
                onSuccess: () => showSection('productos')
            })
        };

        window.deleteProduct = async (id) => {
            console.log('Eliminando producto con ID:', id);
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar este producto?',
                apiCall: () => ProductService.deleteProduct(id),
                successMessage: 'Producto eliminado correctamente',
                onSuccess: () => showSection('productos')
            })
        };


        // Global functions for category actions
        window.editCategory = async (id) => {
            try {
                const {name,description} = await ProductService.getCategoriesById(id);
                openModalAndHandle({
                    title: 'Editar Categoría',
                    inputs: [
                        { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre de la categoría', name: 'nombre', id: 'nombre', value: name || '' },
                        { title: 'Descripción', type: 'text', placeholder: 'Ingrese la descripción de la categoría', name: 'descripcion', id: 'descripcion', value: description || '' }
                    ],
                    submitText: 'Guardar',
                    closeText: 'Cancelar',
                    size: 'md',
                    buildPayload: () => ({
                        nombre: document.getElementById('nombre').value,
                        descripcion: document.getElementById('descripcion').value,
                    }),
                    apiCall: (payload) => ProductService.updateCategory(id, payload),
                    successMessage: 'Categoría actualizada correctamente',
                    onSuccess: () => showSection('categorias')
                })
            } catch (error) {
                Notification.show('Error al cargar la categoría: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        };

        window.deleteCategory = async (id) => {
            console.log('Eliminando categoría con ID:', id);
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar esta categoría?',
                apiCall: () => ProductService.deleteCategory(id),
                successMessage: 'Categoría eliminada correctamente',
                onSuccess: () => showSection('categorias')
            })
        };

        window.openAddCategoryModal = async () => {
            openModalAndHandle({
                title: 'Agregar Categoría',
                inputs: [
                    { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre de la categoría', name: 'nombre', id: 'nombre' },
                    { title: 'Descripción', type: 'text', placeholder: 'Ingrese la descripción de la categoría', name: 'descripcion', id: 'descripcion' }
                ],
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'md',
                buildPayload: () => ({
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                }),
                apiCall: (payload) => ProductService.createCategory(payload),
                successMessage: 'Categoría guardada correctamente',
                onSuccess: () => showSection('categorias')
            })
        };


        // Global functions for supply actions
        window.openAddSupplyModal = async () => {
            const selectOptions = await SupplyService.getSuppliers()
            openModalAndHandle({
                title: 'Agregar Insumo',
                inputs: [
                    { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del insumo', name: 'nombre', id: 'nombre' },
                    { title: 'Descripción', type: 'text', placeholder: 'Ingrese la descripción del insumo', name: 'descripcion', id: 'descripcion' },
                    { title: 'Precio Unitario', type: 'number', placeholder: 'Ingrese el precio unitario del insumo', name: 'precio', id: 'precio' },
                    { title: 'Proveedor Asociado', type: 'select', placeholder: 'Seleccione el proveedor asociado', name: 'proveedor', id: 'proveedor' }
                ],
                selectOptions,
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                buildPayload: () => ({
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio_unitario: document.getElementById('precio').value,
                    proveedor: document.getElementById('proveedor').value,
                }),
                apiCall: (payload) => SupplyService.createSupply(payload),
                successMessage: 'Insumo guardado correctamente',
                onSuccess: () => showSection('insumos')
            })
        };

        window.editSupply = async (id) => {
            const {name,description,unitaryPrice,supplier} = await SupplyService.getSuppliesById(id)
            const selectOptions = await SupplyService.getSuppliers()
            openModalAndHandle({
                title: 'Editar Insumo',
                inputs: [
                    { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del insumo', name: 'nombre', id: 'nombre', value: name || '' },
                    { title: 'Descripción', type: 'text', placeholder: 'Ingrese la descripción del insumo', name: 'descripcion', id: 'descripcion', value: description || '' },
                    { title: 'Precio Unitario', type: 'number', placeholder: 'Ingrese el precio unitario del insumo', name: 'precio', id: 'precio', value: unitaryPrice || '' },
                    { title: 'Proveedor Asociado', type: 'select', placeholder: 'Seleccione el proveedor asociado', name: 'proveedor', id: 'proveedor', value: supplier || '' }
                ],
                selectOptions,
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                buildPayload: () => ({
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio_unitario: document.getElementById('precio').value,
                    proveedor: document.getElementById('proveedor').value,
                }),
                apiCall: (payload) => SupplyService.updateSupply(id, payload),
                successMessage: 'Insumo actualizado correctamente',
                onSuccess: () => showSection('insumos')
            })
        };

        window.deleteSupply = async (id) => {
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar este insumo?',
                deleteFn: async () => {
                    await SupplyService.deleteSupply(id);
                    showSection('insumos');
                }
            });
        };


        // Global functions for supplier actions
        window.openAddSupplierModal = () => openModalAndHandle({
            title: 'Agregar Proveedor',
            inputs: [
                { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del proveedor', name: 'nombre', id: 'nombre' },
                { title: 'NIT', type: 'text', placeholder: 'Ingrese el NIT del proveedor', name: 'nit', id: 'nit' },
                { title: 'Telefono', type: 'text', placeholder: 'Ingrese el telefono del proveedor', name: 'telefono', id: 'telefono' },
                { title: 'Correo', type: 'text', placeholder: 'Ingrese el correo del proveedor', name: 'correo', id: 'correo' },
                { title: 'Dirección', type: 'text', placeholder: 'Ingrese la dirección del proveedor', name: 'direccion', id: 'direccion' },
            ],
            submitText: 'Guardar',
            closeText: 'Cancelar',
            size: 'lg',
            buildPayload: () => ({
                name: document.getElementById('nombre').value,
                nit: document.getElementById('nit').value,
                phone: document.getElementById('telefono').value,
                email: document.getElementById('correo').value,
                address: document.getElementById('direccion').value,
            }),
            apiCall: (payload) => SupplyService.createSupplier(payload),
            successMessage: 'Proveedor guardado correctamente',
            onSuccess: () => showSection('proveedores')
        })

        window.editSupplier = async (id) => {
            const {name,nit,phone,email,address} = await SupplyService.getSuppliersById(id)
            openModalAndHandle({
                title: 'Editar Proveedor',
                inputs: [
                    { title: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del proveedor', name: 'nombre', id: 'nombre', value: name || '' },
                    { title: 'NIT', type: 'text', placeholder: 'Ingrese el NIT del proveedor', name: 'nit', id: 'nit', value: nit || '' },
                    { title: 'Telefono', type: 'text', placeholder: 'Ingrese el telefono del proveedor', name: 'telefono', id: 'telefono', value: phone || '' },
                    { title: 'Correo', type: 'text', placeholder: 'Ingrese el correo del proveedor', name: 'correo', id: 'correo', value: email || '' },
                    { title: 'Dirección', type: 'text', placeholder: 'Ingrese la dirección del proveedor', name: 'direccion', id: 'direccion', value: address || '' },
                ],
                submitText: 'Guardar',
                closeText: 'Cancelar',
                size: 'lg',
                buildPayload: () => ({
                    name: document.getElementById('nombre').value,
                    nit: document.getElementById('nit').value,
                    phone: document.getElementById('telefono').value,
                    email: document.getElementById('correo').value,
                    address: document.getElementById('direccion').value,
                }),
                apiCall: (payload) => SupplyService.updateSupplier(id, payload),
                successMessage: 'Proveedor actualizado correctamente',
                onSuccess: () => showSection('proveedores')
            })
        }

        window.deleteSupplier = async (id) => {
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar este proveedor?',
                deleteFn: async () => {
                    await SupplyService.deleteSupplier(id);
                    showSection('proveedores');
                }
            });
        };
        // Show initial section
        showSection('inicio');
    }   
};