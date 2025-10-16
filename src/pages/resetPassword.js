import '../css/resetPassword.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'

export const ResetPassword = {
    render(){
        return `
      
    <header class="header-resetPassword">
        <p>P</p>
        <h3>PICM</h3>
    </header>
    
    <main class="main-resetPassword">
        <section>
            <h2>Reestablecer contraseña</h2>
            <p>Ingresa tu nueva contraseña</p>

            <form id="resetPasswordForm" role="reset-password" action="">
                <div class="input-group">
                    <label for="new-password">Nueva contraseña</label>
                    <input type="password" id="new-password" name="new-password" placeholder="Ingresa tu nueva contraseña" required>
                </div>

                <div class="input-group">
                    <label for="confirm-password">Confirmar contraseña</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirma tu nueva contraseña" required>
                </div>

                <div class="input-group">
                    <button id="resetPassword-button" type="submit">Reestablecer contraseña</button>
                </div>

                <div id="resetPassword-link">
                    <a href="#/login">Volver al inicio de sesión</a>
                </div>
            </form>
        </section>
    </main>
        `;
    },
    
    init(){
        const form = document.getElementById('resetPasswordForm');
        const newPasswordInput = document.getElementById('new-password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const button = document.getElementById('resetPassword-button');
           
        // Función para validar campos en tiempo real
        const validateFields = () => {
            const newPassword = newPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();
            
            if(newPassword === '' || confirmPassword === ''){
                button.disabled = true;
            } 
            else {
                button.disabled = false;
            }
        };

        // Validar campos cuando el usuario escribe
        newPasswordInput.addEventListener('input', validateFields);
        confirmPasswordInput.addEventListener('input', validateFields);

        // Validar campos al cargar la página
        validateFields();
  
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const newPassword = newPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();
                   
            if (newPassword !== confirmPassword) {
                Notification.show('Las contraseñas no coinciden', 'error', {
                    duration: 4000
                });
                return;
            }
                   
            // Deshabilitar el botón durante la petición
            button.disabled = true;
            button.innerHTML = '<span class="loader"></span> Reestableciendo contraseña...';
            
            try {
                console.log(window.location.hash.split('/')[2]);
                console.log(window.location.hash.split('/')[3]);
                console.log(newPassword);
                
                // Call to the API to reset the password
                const response = await AuthService.resetPasswordConfirm({ 
                    userId: window.location.hash.split('/')[2], 
                    newPassword: newPassword,
                    token: window.location.hash.split('/')[3]
                });
                console.log(response);
                
                // Show success notification
                Notification.show('¡Contraseña reestablecida exitosamente!', 'success', {
                    duration: 3000
                });

                // Redirect to the login after a brief delay
                setTimeout(() => {
                    window.location.hash = '#/login';
                }, 2000);
                
            } catch (error) {
                Notification.show(error.message, 'error', {
                    duration: 4000
                });
                button.disabled = false;
                button.innerHTML = 'Reestablecer contraseña';
                
            } finally {
                button.disabled = false;
                button.innerHTML = 'Reestablecer contraseña';
            }
        });
    }   
};