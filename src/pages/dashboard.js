import '../css/dashboard.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'
import { ProductService } from '../api/services/productService.js'
import { SupplyService } from '../api/services/supplyService.js'
import { MovementService } from '../api/services/movementService.js'
import { StatisticsService } from '../api/services/statisticService.js'
import { Charts } from '../components/ui/charts.js'
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
                    <button class="dashboard-nav-button flex items-center bg-white text-left pl-4 w-full h-12 border border-white rounded-lg text-black font-medium text-sm lg:text-base hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:text-white transition-all duration-300" data-section="dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                            <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                            <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                            <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                        </svg>
                        <span class="pl-3 text-xs lg:text-sm">Dashboard</span>
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
                
               <!-- <li class="flex flex-row items-center cursor-pointer w-[90%]">
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
                </li> -->
                
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
                       <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20 " fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>

                        <span id="nav-button-username" class="pl-3 text-xs lg:text-sm">Usuario</span>
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


        
        const User = async() => {
            try{
                const usernameSpan = document.getElementById('nav-button-username');
                const {username} = await AuthService.getUserInfo();
                if(username){
                    usernameSpan.textContent = username;
                }
            }
            catch(error){
                Notification.show('Error al logear el usuario: ' + error.message, 'error', {
                    duration: 4000
                });
            }
           
        }

        User()

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
                case 'dashboard':
                    window.renderDashboardHome();
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
                    const showMovimientos = async (movement) => {
                        const movementsConfig = SectionFactory.createMovementSection(MovementService, movement);
                        const movementsManager = new SectionManager(movementsConfig);
                        
                        window.changePage = (newPage) => movementsManager.changePage(newPage);
                        
                        await movementsManager.init();
                        
                    }
                    dashboardContent.innerHTML = `
                            <div class="bg-white p-10 rounded-lg shadow-md text-center mt-[10rem]">
                            <div class="mb-6">
                                <svg class="mx-auto text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
                                </svg>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">Elige qué movimientos deseas consultar</h2>
                            <select class="w-full p-2 border border-gray-300 rounded" id="movimiento" name="movimiento" >
                                <option value="" selected disabled>Selecciona el tipo de movimiento</option>
                                <option value="productos">Productos</option>
                                <option value="insumos">Insumos</option>
                            </select>
                            <button id="movimientos-button" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">Consultar</button>
                            
                    `;

                    document.getElementById('movimientos-button').addEventListener('click', () => {
                        const value = document.getElementById('movimiento').value;
                        if(value === ''){
                            alert('Por favor, selecciona un tipo de movimiento');
                            return;
                        }
                        showMovimientos(value);
                    });
               
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
                    { title: 'Categoría', type: 'select', placeholder: 'Seleccione la categoría del producto', name: 'categoria', id: 'categoria', options: selectOptions }
                ],
                
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
                    { title: 'Categoría', type: 'select', placeholder: 'Seleccione la categoría del producto', name: 'categoria', id: 'categoria', value: category || '', options: selectOptions }
                ],
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

        window.increaseStockProduct = async (id) => {
            try{
                openModalAndHandle({
                    title: 'Aumentar Stock',
                    inputs: [
                        { title: 'Cantidad', type: 'number', placeholder: 'Ingrese la cantidad', name: 'cantidad', id: 'cantidad' }
                    ],
                    submitText: 'Guardar',
                    closeText: 'Cancelar',
                    size: 'md',
                    buildPayload: () => ({
                        stock: document.getElementById('cantidad').value,
                    }),
                    apiCall: (payload) => ProductService.updateStock(id, payload, 'increase'),
                    successMessage: 'Stock aumentado correctamente',
                    onSuccess: () => showSection('productos')
                })
            }catch(error){
                Notification.show('Error al aumentar stock: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        }

        window.decreaseStockProduct = async (id) => {
            try{
                openModalAndHandle({
                    title: 'Disminuir Stock',
                    inputs: [
                        { title: 'Cantidad', type: 'number', placeholder: 'Ingrese la cantidad', name: 'cantidad', id: 'cantidad' }
                    ],
                    submitText: 'Guardar',
                    closeText: 'Cancelar',
                    size: 'md',
                    buildPayload: () => ({
                        stock: document.getElementById('cantidad').value,
                    }),
                    apiCall: (payload) => ProductService.updateStock(id, payload, 'decrease'),
                    successMessage: 'Stock disminuido correctamente',
                    onSuccess: () => showSection('productos')
                })
            }catch(error){
                Notification.show('Error al disminuir stock: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        }


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
                    { title: 'Proveedor Asociado', type: 'select', placeholder: 'Seleccione el proveedor asociado', name: 'proveedor', id: 'proveedor', options: selectOptions }
                ],
                
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
                    { title: 'Proveedor Asociado', type: 'select', placeholder: 'Seleccione el proveedor asociado', name: 'proveedor', id: 'proveedor', value: supplier || '', options: selectOptions }
                ],
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

        window.increaseStockSupply = async (id) => {
            try{
                openModalAndHandle({
                    title: 'Aumentar Stock',
                    inputs: [
                        { title: 'Cantidad', type: 'number', placeholder: 'Ingrese la cantidad', name: 'cantidad', id: 'cantidad' }
                    ],
                    submitText: 'Guardar',
                    closeText: 'Cancelar',
                    size: 'md',
                    buildPayload: () => ({
                        stock: document.getElementById('cantidad').value,
                    }),
                    apiCall: (payload) => SupplyService.updateStock(id, payload, 'increase'),
                    successMessage: 'Stock aumentado correctamente',
                    onSuccess: () => showSection('insumos')
                })
            }catch(error){
                Notification.show('Error al aumentar stock: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        }
        
        window.decreaseStockSupply = async (id) => {
            try{
                openModalAndHandle({
                    title: 'Disminuir Stock',
                    inputs: [
                        { title: 'Cantidad', type: 'number', placeholder: 'Ingrese la cantidad', name: 'cantidad', id: 'cantidad' }
                    ],
                    submitText: 'Guardar',
                    closeText: 'Cancelar',
                    size: 'md',
                    buildPayload: () => ({
                        stock: document.getElementById('cantidad').value,
                    }),
                    apiCall: (payload) => SupplyService.updateStock(id, payload, 'decrease'),
                    successMessage: 'Stock disminuido correctamente',
                    onSuccess: () => showSection('insumos')
                })
            }catch(error){
                Notification.show('Error al disminuir stock: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        }
        
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
        };

        window.deleteSupplier = async (id) => {
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar este proveedor?',
                deleteFn: async () => {
                    await SupplyService.deleteSupplier(id);
                    showSection('proveedores');
                }
            });
        };

        // Global functions for movements actions
        
        window.openAddMovementModal = async (tipoMovimiento) => {

            // Options for Item
            let items = [];
            if (tipoMovimiento === 'productos') {
                items = await ProductService.getProductsName();
            } else {
                items = await SupplyService.getSuppliesName();
            }
            // Options for User
            const users = await AuthService.getUsersName();
            const names = users.map(u => u.username);

            let tipo = '';
            let placeholder = '';
            let name = '';
            if (tipoMovimiento === 'productos') {
               tipo = 'Producto';
               name = 'product_name';
               placeholder = 'Ingrese el producto';
            } else {
                tipo = 'Insumo';
                name = 'supply_name';
                placeholder = 'Ingrese el insumo';
            }
            openModalAndHandle({
            title: 'Agregar Movimiento',
            inputs: [
                { title: tipo, type: 'select', placeholder: placeholder, name: name, id: name, options: items || [] },
                { title: 'Usuario', type: 'select', placeholder: 'Ingrese el usuario', name: 'usuario', id: 'usuario', options: names || [] },
                { title: 'Tipo de modificación', type: 'select', placeholder: 'Ingrese el tipo de modificación', name: 'tipoModificacion', id: 'tipoModificacion', options: ['Entrada', 'Salida'] },
                { title: 'Stock modificado', type: 'number', placeholder: 'Ingrese el stock modificado', name: 'stockModificado', id: 'stockModificado' },
                { title: 'Comentario', type: 'text', placeholder: 'Ingrese el comentario', name: 'comentario', id: 'comentario' },
            ],
            submitText: 'Guardar',
            closeText: 'Cancelar',
            size: 'lg',
            buildPayload: () => ({
                [`${name}`]: document.getElementById(name).value,
                user: document.getElementById('usuario').value,
                modificationType: document.getElementById('tipoModificacion').value,
                modifiedStock: document.getElementById('stockModificado').value,
                comentary: document.getElementById('comentario').value,
            }),
            apiCall: (payload) => MovementService.createMovement(tipoMovimiento,payload),
            successMessage: 'Movimiento guardado correctamente',
            onSuccess: () => showSection('movimientos')
        })
    };


        window.editMovement = async (id,tipoMovimiento) => {
            const data = await MovementService.getMovementById(id, tipoMovimiento);

            const { user, modificationType, modifiedStock, comentary, dateHourCreation } = data;
            const itemName = tipoMovimiento === 'productos' ? data.product : data.supply;

            const iso = new Date(dateHourCreation).toISOString();

            // Options for Movement Type
            const selectOptions = [
                'Entrada',
                'Salida'
            ];

            // Options for User
            const users = await AuthService.getUsersName();
            const names = users.map(u => u.username);

            // Options for Item
            let items = [];
            if (tipoMovimiento === 'productos') {
                items = await ProductService.getProductsName();
            } else {
                items = await SupplyService.getSuppliesName();
            }

            let tipo = '';
            let placeholder = '';
            let name = '';
            if (tipoMovimiento === 'productos') {
               tipo = 'Producto';
               name = 'product_name';
               placeholder = 'Ingrese el producto';
            } else {
                tipo = 'Insumo';
                name = 'supply_name';
                placeholder = 'Ingrese el insumo';
            }
            openModalAndHandle({
                title: 'Editar Movimiento',
                inputs: [
                    { title: `${tipo}`, type: 'select', placeholder: placeholder, name: 'supply', id: `${tipo.toLowerCase()}`, value: itemName || '', options: items },
                    { title: 'Usuario Relacionado', type: 'select', placeholder: 'Ingrese el usuario', name: 'user', id: 'user', value: user || '', options: names },
                    { title: 'Tipo de modificación', type: 'select', placeholder: 'Ingrese el tipo de modificación', name: 'modificationType', id: 'modificationType', options: selectOptions, value: modificationType || '' },
                    { title: 'Stock modificado', type: 'number', placeholder: 'Ingrese el stock modificado', name: 'modifiedStock', id: 'modifiedStock', value: modifiedStock || '' },
                    { title: 'Comentario', type: 'text', placeholder: 'Ingrese el comentario', name: 'comentary', id: 'comentary', value: comentary || '' },
                    { title: 'Fecha de creación', type: 'date', placeholder: 'Ingrese la fecha de creación', name: 'dateHourCreation', id: 'dateHourCreation', value: iso.split('T')[0] || '' },
                    
                ],
                submitText: 'Guardar',
                closeText: 'Cancelar',
                selectOptions,
                size: 'lg',
                buildPayload: () => ({
                    [`${name}`]: document.getElementById(`${tipo.toLowerCase()}`).value,
                    user: document.getElementById('user').value,
                    modificationType: document.getElementById('modificationType').value,
                    modifiedStock: document.getElementById('modifiedStock').value,
                    comentary: document.getElementById('comentary').value,
                    dateHourCreation: document.getElementById('dateHourCreation').value,
                }),
                apiCall: (payload) => MovementService.updateMovement(id,tipoMovimiento, payload),
                successMessage: 'Movimiento actualizado correctamente',
                onSuccess: () => showSection('movimientos')
            })
        };

        window.deleteMovement = async (id,tipoMovimiento) => {
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar este movimiento?',
                deleteFn: async () => {
                    await MovementService.deleteMovement(id,tipoMovimiento);
                    showSection('movimientos');
                }
            });
        };

        // Global functions for statistics actions
        window.renderDashboardHome= async() => {                         
            try {
                
                const [
                    topProductsSales,
                    topProductsEntries,
                    monthlyMovements,
                    productVolume
                ] = await Promise.all([
                    StatisticsService.getTopProductsSales(5, '30d'),
                    StatisticsService.getTopProductsEntries(5, '30d'),
                    StatisticsService.getMonthlyMovements(),
                    StatisticsService.getProductMovementsVolume('30d')
                ]);

                const dashboardContent = document.getElementById('dashboard-content');
                dashboardContent.innerHTML = `
                    <div class="w-full max-w-7xl mx-auto">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                         <!-- Top Productos con más Entradas -->
                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <div class="h-80">
                                    <canvas id="topEntriesChart"></canvas>
                                </div>
                            </div>

                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <div class="h-80">
                                    <canvas id="topSalesChart"></canvas>
                                </div>
                            </div>

                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <!-- Volumen de Movimientos Mensuales -->
                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <div class="h-80">
                                    <canvas id="monthlyMovementsChart"></canvas>
                                </div>
                            </div>

                            <!-- Volumen de Entradas vs Salidas -->
                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <div class="h-80">
                                    <canvas id="volumeChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Normalizing 
                const normTopSales = Array.isArray(topProductsSales)
                    ? topProductsSales
                    : (topProductsSales?.results || topProductsSales?.data || []);
                const normTopEntries = Array.isArray(topProductsEntries)
                    ? topProductsEntries
                    : (topProductsEntries?.results || topProductsEntries?.data || []);
                const normMonthly = Array.isArray(monthlyMovements)
                    ? monthlyMovements
                    : (monthlyMovements?.results || monthlyMovements?.data || []);
                const normVolume = (productVolume && (productVolume.data || productVolume)) || { entries: 0, sales: 0 };

                // Render the graphics before DOM's ready
                setTimeout(() => {
                    window.renderCharts(normTopSales, normTopEntries, normMonthly, normVolume);
                }, 100);

            } catch (error) {
                console.error('Error cargando dashboard:', error);
                document.getElementById('dashboard-content').innerHTML = `
                    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h3 class="text-red-800 font-semibold mb-2">Error al cargar estadísticas</h3>
                        <p class="text-red-600">${error.message}</p>
                    </div>
                `;
            }
        };

        window.renderCharts = async (topSales, topEntries, monthlyMovements, volume) => {
            

            // Top lefty products graphic
            Charts.renderBarChart('topSalesChart', {
                labels: topSales.map(item => item.product_name),
                datasets: [{
                    label: 'Cantidad Vendida',
                    data: topSales.map(item => item.total_quantity),
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderColor: 'rgba(34, 197, 94, 0.8)',
                    borderWidth: 1
                }]
            }, {
                title: 'Top 5 Productos con más Salidas'
            });

            // Top entry products graphic
            Charts.renderBarChart('topEntriesChart', {
                labels: topEntries.map(item => item.product_name),
                datasets: [{
                    label: 'Cantidad Entrada',
                    data: topEntries.map(item => item.total_quantity),
                    backgroundColor: 'rgb(80, 158, 222)',
                    borderColor: 'rgb(80, 158, 222)',
                    borderWidth: 1
                }]
            }, {
                title: 'Top 5 Productos con más Entradas'
            });

            // Monthly Graphic
            Charts.renderLineChart('monthlyMovementsChart', {
                labels: monthlyMovements.map(item => item.month),
                datasets: [{
                    label: 'Entradas',
                    data: monthlyMovements.map(item => item.entries),
                    borderColor: 'rgb(80, 158, 222)',
                    backgroundColor: 'rgb(80, 158, 222)',
                    tension: 0.1
                }, {
                    label: 'Salidas',
                    data: monthlyMovements.map(item => item.sales),
                    borderColor: 'rgba(34, 197, 94, 0.8)',
                    backgroundColor: 'rgb(34, 197, 94)',
                    tension: 0.1
                }]
            }, {
                title: 'Tendencia de Movimientos por Mes'
            });

            // Circle Graphic
            Charts.renderDoughnutChart('volumeChart', {
                labels: ['Entradas', 'Salidas'],
                datasets: [{
                    data: [volume.entries, volume.sales],
                    backgroundColor: [
                        'rgba(80, 158, 222)',
                        'rgba(34, 197, 94, 0.8)'
                    ],
                    borderColor: [
                        'rgba(80, 158, 222)',
                        'rgba(34, 197, 94, 0.8)'
                    ],
                    borderWidth: 2
                }]
            }, {
                title: 'Distribución de Volumen'
            });
        };
        
        // Show initial section
        showSection('dashboard');
    }   
};