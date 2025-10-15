import '../css/login.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'
export const Login = {
    render(){
        return `
    <header class="header-login">
        <p>P</p>
        <h3>PICM</h3>
    </header>
    <main class="main-login">
        <section class="section-login">
            <h1>Iniciar sesión</h1>
            <form id="loginForm" role="form">
                <div class="input-group">
                    <label for="username" class="label-login">Usuario</label>
                    <input type="text" id="username" name="username" placeholder="Ingresa tu usuario" required autocomplete="username" class="input-login">
                </div>
                <div class="input-group">
                    <label for="password" class="label-login">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required autocomplete="current-password" class="input-login">
                </div>

                <div id="remember-me"> <!-- Extender sesión aún no implementado -->
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember" class="label-remember-me">Recordarme</label>
                </div>

                <div class="input-group">
                    <button type="submit">Iniciar sesión</button>
                </div>
                <div id="register-link"> <!-- Recuperar contraseña aún no implementado -->
                    <a id="return-login" href="#/recovery">¿Olvidaste tu contraseña?</a>
                </div>
            </form>
        </section>
    </main>
`;
    },
    
    init(){
        const form = document.getElementById('loginForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const button = document.querySelector('button');
        
        // Función para validar campos en tiempo real
        const validateFields = () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if(username === '' || password === ''){
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        };
        
        // Validar campos cuando el usuario escribe
        usernameInput.addEventListener('input', validateFields);
        passwordInput.addEventListener('input', validateFields);
        
        // Validar campos al cargar la página
        validateFields();
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Verificar que los campos no estén vacíos
            if(username === '' || password === ''){
                Notification.show('Por favor, completa todos los campos', 'warning', {
                    duration: 3000
                });
                return;
            }
            
            // Deshabilitar el botón durante la petición
            button.disabled = true;
            button.innerHTML = '<span class="loader"></span>Iniciando sesión...';
            
            
            try {
                      
                // Llamada a la API 
                const response = await AuthService.login({ username, password });           
                
                // Mostrar notificación de éxito
                Notification.show('¡Ha iniciado sesión correctamente!', 'success', {
                    duration: 1100
                });
                
                // Redirigir al dashboard después de un breve delay
                setTimeout(() => {
                    window.location.hash = '#/dashboard';
                }, 1500);
                
            } catch (error) {
           
                // Mostrar notificación de error
                Notification.show('Error al iniciar sesión: ' + error.message, 'error', {
                    duration: 4000
                });
                button.disabled = false;
                button.innerHTML = 'Iniciar sesión';
            }
        });
    }
};