import '../css/dashboard.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'
import { ProductService } from '../api/services/productService.js'
import { SupplyService } from '../api/services/supplyService.js'
import { MovementService } from '../api/services/movementService.js'
import { StatisticsService } from '../api/services/statisticService.js'
import { ReportService } from '../api/services/reportService.js'
import { Charts } from '../components/ui/charts.js'
import { SectionManager, SectionFactory } from '../api/utils/sectionManager.js'
import { openModalAndHandle, confirmAndDelete } from '../api/utils/dashboardUtils.js'
import { chat, userChat, botChat} from '../components/ui/chat.js'
import { chatbotService } from '../api/services/chatbotService.js'

const CHAT_HISTORY_KEY = 'picm_chat_history'

const loadChatHistory = () => {
    try {
        const stored = localStorage.getItem(CHAT_HISTORY_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error('No se pudo leer el historial del chat:', error)
        return []
    }
}

const saveChatHistory = (history) => {
    try {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history))
    } catch (error) {
        console.error('No se pudo guardar el historial del chat:', error)
    }
}

const renderHistoryMessages = (history = [], chatBody) => {
    history.forEach(({ from, text }) => {
        chatBody.innerHTML += from === 'user'
            ? userChat.render({ message: text })
            : botChat.render({ newBotMessage: text })
    })
    chatBody.scrollTop = chatBody.scrollHeight
}

const resetChatHistory = () => {
    localStorage.removeItem(CHAT_HISTORY_KEY)
}

export const Dashboard = {
    render(){
        return `
    <div class="dashboard-shell">

        <!-- ===== MOBILE OVERLAY ===== -->
        <div id="sidebar-overlay" class="sidebar-overlay" aria-hidden="true"></div>

        <!-- ===== SIDEBAR ===== -->
        <aside id="sidebar" class="sidebar" aria-label="Navegación principal">

            <!-- Brand -->
            <div class="sidebar-brand">
                <div class="sidebar-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="3" y="3" width="7" height="7" rx="1"/>
                        <rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                        <rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                </div>
                <div class="sidebar-brand-text">
                    <span class="sidebar-brand-name">StayAwayCo</span>
                    <span class="sidebar-brand-sub">PICM · Inventarios</span>
                </div>
            </div>

            <!-- Main navigation -->
            <nav class="sidebar-nav" aria-label="Menú principal">
                <span class="sidebar-group-label">General</span>
                <ul class="sidebar-nav-list">
                    <li>
                        <button class="dashboard-nav-button sidebar-nav-btn" data-section="dashboard" aria-current="page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"/>
                                <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"/>
                                <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"/>
                                <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"/>
                            </svg>
                            <span>Dashboard</span>
                        </button>
                    </li>
                </ul>

                <span class="sidebar-group-label">Inventario</span>
                <ul class="sidebar-nav-list">
                    <li>
                        <button class="dashboard-nav-button sidebar-nav-btn" data-section="productos">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z"/>
                                <path d="M12 12l8 -4.5"/>
                                <path d="M12 12v9"/>
                                <path d="M12 12l-8 -4.5"/>
                            </svg>
                            <span>Productos</span>
                        </button>
                    </li>
                    <li>
                        <button class="dashboard-nav-button sidebar-nav-btn" data-section="categorias">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 4h6v6h-6z"/><path d="M14 4h6v6h-6z"/>
                                <path d="M4 14h6v6h-6z"/>
                                <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
                            </svg>
                            <span>Categorías</span>
                        </button>
                    </li>
                    <li>
                        <button class="dashboard-nav-button sidebar-nav-btn" data-section="insumos">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 21h18"/>
                                <path d="M9 8h1"/>
                                <path d="M9 12h1"/>
                                <path d="M9 16h1"/>
                                <path d="M14 8h1"/>
                                <path d="M14 12h1"/>
                                <path d="M14 16h1"/>
                                <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/>
                            </svg>
                            <span>Insumos</span>
                        </button>
                    </li>
                    <li>
                        <button class="dashboard-nav-button sidebar-nav-btn" data-section="proveedores">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4"/>
                                <path d="M15 19l2 2l4 -4"/>
                            </svg>
                            <span>Proveedores</span>
                        </button>
                    </li>
                    <li>
                        <button class="dashboard-nav-button sidebar-nav-btn" data-section="movimientos">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 12h18"/>
                                <path d="M3 6h18"/>
                                <path d="M3 18h18"/>
                                <path d="M17 16l4 -4l-4 -4"/>
                            </svg>
                            <span>Movimientos</span>
                        </button>
                    </li>
                </ul>
            </nav>

            <!-- Sidebar footer -->
            <div class="sidebar-footer">
                <button id="help" class="sidebar-footer-btn" title="Asistente IA">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
                        <path d="M12 17l0 .01"/>
                        <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"/>
                    </svg>
                    <span>Asistente</span>
                </button>

                <div class="sidebar-user">
                    <div class="sidebar-user-avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                        </svg>
                    </div>
                    <button id="settings" class="sidebar-user-info" title="Perfil de usuario">
                        <span id="nav-button-username" class="sidebar-username">Usuario</span>
                        <span class="sidebar-user-role">Administrador</span>
                    </button>
                    <button id="logout" class="sidebar-logout-btn" title="Cerrar sesión" aria-label="Cerrar sesión">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                            <path d="M9 12h12l-3 -3"/><path d="M18 15l3 -3"/>
                        </svg>
                    </button>
                </div>
            </div>
        </aside>

        <!-- ===== MAIN AREA ===== -->
        <div class="main-area">

            <!-- Top bar (mobile hamburger + page title) -->
            <header class="topbar">
                <button id="sidebar-toggle" class="topbar-hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <h1 class="topbar-title" id="main-title">Dashboard</h1>
            </header>

            <!-- Dynamic content -->
            <main id="dashboard-content" class="dashboard-content">
                <!-- Contenido dinámico -->
            </main>

            <!-- Chat modal -->
            <div id="chat-modal"></div>
        </div>
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

        // Mobile sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');

        const closeSidebar = () => {
            sidebar.classList.remove('sidebar-open');
            sidebarOverlay.classList.remove('active');
            sidebarToggle.setAttribute('aria-expanded', 'false');
        };

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                const isOpen = sidebar.classList.toggle('sidebar-open');
                sidebarOverlay.classList.toggle('active', isOpen);
                sidebarToggle.setAttribute('aria-expanded', String(isOpen));
            });
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }

        // Logout functionality
        const logout = document.getElementById('logout');
        logout.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                await AuthService.logout();
                resetChatHistory();
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

        const help = document.getElementById('help');
        const chatContainer = document.getElementById("chat-modal");
        help.addEventListener("click", () => {

            // Si ya está abierto → cerrarlo
            if (chatContainer.innerHTML.trim() !== "") {
                chatContainer.innerHTML = "";
                return;
            }

            const welcomeMessage = "¡Qué tal!<br>¿Cómo te puedo ayudar hoy?";
            let history = loadChatHistory();
            if (history.length === 0) {
                history = [{ from: 'bot', text: welcomeMessage }];
                saveChatHistory(history);
            }

            // Crear overlay + chat
            chatContainer.innerHTML = `
                ${chat.render({newBotMessage: null})}
            `;

            // Cerrar al click en overlay
            document.getElementById("chat-overlay").addEventListener("click", () => {
                chatContainer.innerHTML = "";
            });
              

            const sendBtn = document.getElementById('send-btn');
            const chatInput = document.getElementById('chat-input');
            const chatBody = document.getElementById('chat-body');

            renderHistoryMessages(history, chatBody);

            const handleSend = async () => {

                const texto = chatInput.value.trim();
                if (!texto) return;

                chatBody.innerHTML += userChat.render({ message: texto });
                history.push({ from: 'user', text: texto });
                saveChatHistory(history);

                chatInput.value = "";

    
                chatBody.scrollTop = chatBody.scrollHeight;

                try{
                    const response = await chatbotService.talk(texto);
                    const botMessage = response.message;
                    chatBody.innerHTML += botChat.render({ newBotMessage: botMessage});
                    history.push({ from: 'bot', text: botMessage });
                    saveChatHistory(history);
                } 
                catch(error){
                    Notification.show('Error al enviar el mensaje: ' + error.message, 'error', {
                        duration: 4000
                    });
                }
                
            };

            sendBtn.addEventListener("click", handleSend);

                chatInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    // Prevenir el salto de línea por defecto del textarea
                    event.preventDefault(); 
                    // Llamar a la misma función compartida
                    handleSend();
                }
            });
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
                    dashboardContent.innerHTML = `
                                      <div style="display:flex;align-items:center;justify-content:center;flex:1;padding:40px 16px;">
                            <div class="section-card" style="width:100%;max-width:420px;text-align:center;">
                                <div class="section-card-body" style="display:flex;flex-direction:column;align-items:center;gap:20px;">
                                    <div class="stat-card-icon blue" style="width:56px;height:56px;border-radius:14px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 6h18M3 18h18M17 16l4-4-4-4"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 style="font-size:17px;font-weight:700;color:#1a2035;margin:0 0 6px;">Consultar Movimientos</h2>
                                        <p style="font-size:13px;color:#8a94a6;margin:0;">Elige el módulo que deseas revisar</p>
                                    </div>
                                    <select class="filter-select" id="movimiento" name="movimiento" style="width:100%;min-width:unset;">
                                        <option value="" selected disabled>Selecciona el tipo de movimiento</option>
                                        <option value="productos">Productos</option>
                                        <option value="insumos">Insumos</option>
                                    </select>
                                    <button id="movimientos-button" class="btn-primary" style="width:100%;justify-content:center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                        Consultar
                                    </button>
                                </div>
                            </div>
                        </div>
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
                    { title: 'NIT', type: 'text', placeholder: 'Ingrese el NIT del proveedor', name: 'nit', id: 'nit', value: nit || '', disabled: true },
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
            onSuccess: () => showMovimientos(tipoMovimiento)
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
                onSuccess: () => showMovimientos(tipoMovimiento)
            })
        };

        window.deleteMovement = async (id,tipoMovimiento) => {
            await confirmAndDelete({
                confirmText: '¿Estás seguro de que quieres eliminar este movimiento?',
                deleteFn: async () => {
                    await MovementService.deleteMovement(id,tipoMovimiento);
                    showMovimientos(tipoMovimiento);
                }
            });
        };


        window.showMovimientos = async (movement) => {
            const movementsConfig = SectionFactory.createMovementSection(MovementService, movement);
            const movementsManager = new SectionManager(movementsConfig);
            window.changePage = (newPage) => movementsManager.changePage(newPage);
            await movementsManager.init();
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
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,460px),1fr));gap:20px;width:100%;">
                        <div class="chart-card">
                            <div class="chart-card-header text-center">Top 5 Productos con más Entradas</div>
                            <div class="chart-card-body" style="height:280px;position:relative;">
                                <canvas id="topEntriesChart"></canvas>
                            </div>
                        </div>
                        <div class="chart-card">
                            <div class="chart-card-header text-center">Top 5 Productos con más Salidas</div>
                            <div class="chart-card-body" style="height:280px;position:relative;">
                                <canvas id="topSalesChart"></canvas>
                            </div>
                        </div>
                        <div class="chart-card">
                            <div class="chart-card-header text-center">Tendencia de Movimientos por Mes</div>
                            <div class="chart-card-body" style="height:280px;position:relative;">
                                <canvas id="monthlyMovementsChart"></canvas>
                            </div>
                        </div>
                        <div class="chart-card">
                            <div class="chart-card-header text-center">Volumen Entradas vs Salidas Mensuales</div>
                            <div class="chart-card-body" style="height:280px;position:relative;">
                                <canvas id="volumeChart"></canvas>
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
        
        window.openPDF = (id, tipo) => {
            if(tipo === 'productos'){
                ReportService.downloadProductReportById(id).then(response => {
                    ReportService.openPDF(response);
                });
            }
            if(tipo === 'insumos'){
                ReportService.downloadSupplyReportById(id).then(response => {
                    ReportService.openPDF(response);
                });
            }
        };

        window.openGenerateReportModal = async (tipoMovimiento) => {
            try {
                // Obtener todos los productos o insumos según la sección
                let items = [];
                let tipoLabel = '';
                
                if (tipoMovimiento === 'productos') {
                    // Obtener todos los productos con un tamaño de página grande
                    const response = await ProductService.getProducts(1, 1000, '', '', '');
                    items = response.results || response.data || response;
                    tipoLabel = 'Producto';
                } else {
                    // Obtener todos los insumos con un tamaño de página grande
                    const response = await SupplyService.getSupplies(1, 1000, '', '', '');
                    items = response.results || response.data || response;
                    tipoLabel = 'Insumo';
                }

                // Formatear las opciones como objetos {id, name}
                const options = items.map(item => ({
                    id: item.id,
                    name: item.name || item.product_name || item.supply_name || `ID: ${item.id}`
                }));

                if (options.length === 0) {
                    Notification.show(`No hay ${tipoLabel.toLowerCase()}s disponibles para generar reporte`, 'warning', {
                        duration: 3000
                    });
                    return;
                }

                openModalAndHandle({
                    title: 'Generar Reporte',
                    inputs: [
                        { 
                            title: tipoLabel, 
                            type: 'select', 
                            placeholder: `Seleccione un ${tipoLabel.toLowerCase()}`, 
                            name: 'itemSelect', 
                            id: 'itemSelect', 
                            options: options,
                            required: true
                        }
                    ],
                    submitText: 'Generar',
                    closeText: 'Cancelar',
                    size: 'lg',
                    buildPayload: () => ({
                        id: document.getElementById('itemSelect').value,
                        tipo: tipoMovimiento
                    }),
                    apiCall: async (payload) => {
                        // Generar el reporte usando ReportService directamente
                        if (payload.tipo === 'productos') {
                            const response = await ReportService.downloadProductReportById(payload.id);
                            ReportService.openPDF(response);
                        } else if (payload.tipo === 'insumos') {
                            const response = await ReportService.downloadSupplyReportById(payload.id);
                            ReportService.openPDF(response);
                        }
                        return { success: true };
                    },
                    successMessage: 'Reporte generado correctamente',
                    onSuccess: () => {
                        // No necesitamos hacer nada adicional, el PDF ya se descargó
                    }
                });
            } catch (error) {
                Notification.show('Error al cargar los elementos: ' + error.message, 'error', {
                    duration: 4000
                });
            }
        };

        // Show initial section
        showSection('dashboard');
    }   
};