import '../css/recovery.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'

export const Recovery = {
    render(){
        return `
      
    <header class="header-recovery">
        <p>P</p>
        <h3>PICM</h3>
    </header>
    
    <main class="main-recovery">
        <section>
            <h2>¿Olvidaste tu contrseña?</h2>
            <p>Introduce tu dirección de correo y te enviaremos las instrucciones para reestablecer tu contraseña</p>

            <form id="recover-password" role="recover-password" action="">
                <div class="input-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Ingresa tu correo electrónico" required>
                </div>

                <div class="input-group">
                    <button id="recover-password-button" type="submit">Recuperar contraseña</button>
                </div>

                <div id="login-link">
                        <a href="#/login">¿Recordaste tu contrseña? Inicia sesión</a>
                </div>
            </form>
        </section>
    </main>
        `;
    },
    init(){
        const form = document.getElementById('recover-password');
        const emailInput = document.getElementById('email');
        const button = document.getElementById('recover-password-button');
        
        
        // Function to validate fields in real time
        const validateFields = () => {
            const email = emailInput.value.trim();
            
            if(email === ''){
                button.disabled = true;
            }else{
                button.disabled = false;
            }
        };

        // Validate fields when the user writes
        emailInput.addEventListener('input', validateFields);

        // Validate fields when the page is loaded
        validateFields();
  
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = emailInput.value.trim();
                   
            // Disable the button during the request
            button.disabled = true;
            button.innerHTML = '<span class= "loader"></span> Enviando correo de recuperación...';
            
            try {
                
                // Call to the API
                const response = await AuthService.resetPassword({ email });
                console.log(response);
                // Show success notification
                Notification.show('¡Se ha enviado un correo para reestablecer tu contraseña!', 'success', {
                    duration: 3000
                });

                button.disabled = true;
                button.innerHTML = 'Recuperar contraseña';
                
            } catch (error) {
                Notification.show( error.message, 'error', {
                    duration: 4000
                });
                button.disabled = false;
                button.innerHTML = 'Recuperar contraseña';
                
            } finally {
                button.disabled = false;
                button.innerHTML = 'Recuperar contraseña';
            }
        });
    }   
};