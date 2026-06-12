import '../css/login.css'
import { AuthService } from '../api/services/authService.js'
import { Notification } from '../components/ui/Notification.js'

export const Login = {
    render(){
        return `
<div class="login-wrapper">

  <!-- Left panel: brand -->
  <aside class="login-brand-panel" aria-hidden="true">
    <div class="login-brand-inner">

      <div class="login-brand-logo">
        <span class="login-brand-logo-icon">P</span>
        <span class="login-brand-logo-text">PICM</span>
      </div>

      <div class="login-brand-copy">
        <h2 class="login-brand-headline">Gestión de inventario,<br>sin complicaciones.</h2>
        <p class="login-brand-sub">Lleva el control total de tus cuadros de madera desde un solo lugar.</p>
      </div>

      <ul class="login-brand-features" role="list">
        <li class="login-brand-feature">
          <span class="login-feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </span>
          <span>Control de stock en tiempo real</span>
        </li>
        <li class="login-brand-feature">
          <span class="login-feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </span>
          <span>Registro de entradas y salidas</span>
        </li>
        <li class="login-brand-feature">
          <span class="login-feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
          </span>
          <span>Reportes y movimientos detallados</span>
        </li>
      </ul>

    </div>
  </aside>

  <!-- Right panel: form -->
  <main class="login-form-panel">
    <!-- Mobile-only logo -->
    <div class="login-mobile-logo" aria-label="PICM">
      <span class="login-brand-logo-icon">P</span>
      <span class="login-brand-logo-text">PICM</span>
    </div>

    <div class="login-card">
      <header class="login-card-header">
        <h1 class="login-card-title">Bienvenido</h1>
        <p class="login-card-subtitle">Ingresa tus credenciales para continuar</p>
      </header>

      <form id="loginForm" class="login-form" role="form" novalidate>

        <div class="login-field">
          <label for="username" class="login-label">Usuario</label>
          <div class="login-input-wrap">
            <span class="login-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ingresa tu usuario"
              required
              autocomplete="username"
              class="login-input"
            >
          </div>
        </div>

        <div class="login-field">
          <label for="password" class="login-label">Contraseña</label>
          <div class="login-input-wrap">
            <span class="login-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              required
              autocomplete="current-password"
              class="login-input login-input--password"
            >
            <button type="button" id="togglePassword" class="login-toggle-pw" aria-label="Mostrar contraseña">
              <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="login-row">
          <label class="login-remember">
            <input type="checkbox" id="remember" name="remember" class="login-checkbox">
            <span>Recordarme</span>
          </label>
          <a href="#/recovery" class="login-forgot">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" id="submitBtn" class="login-submit" disabled>
          Iniciar sesión
        </button>

      </form>
    </div>
  </main>

</div>
`;
    },

    init(){
        const form         = document.getElementById('loginForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const button       = document.getElementById('submitBtn');
        const togglePw     = document.getElementById('togglePassword');
        const eyeIcon      = document.getElementById('eyeIcon');

        // SVG paths for eye / eye-off
        const eyeOpenPath  = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        const eyeClosedPath = '<line x1="17.94" y1="11.12" x2="17.94" y2="11.12"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M6.62 6.62A10 10 0 0 0 1 12s4 8 11 8a9.24 9.24 0 0 0 5.38-1.62"/><line x1="2" y1="2" x2="22" y2="22"/>';

        // Toggle show/hide password
        togglePw.addEventListener('click', () => {
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            eyeIcon.innerHTML  = isHidden ? eyeClosedPath : eyeOpenPath;
            togglePw.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
        });

        // Enable / disable submit button based on field values
        const validateFields = () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            button.disabled = username === '' || password === '';
        };

        usernameInput.addEventListener('input', validateFields);
        passwordInput.addEventListener('input', validateFields);
        validateFields();

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if(username === '' || password === ''){
                Notification.show('Por favor, completa todos los campos', 'warning', { duration: 3000 });
                return;
            }

            button.disabled = true;
            button.innerHTML = '<span class="loader"></span>Iniciando sesión...';

            try {
                await AuthService.login({ username, password });

                Notification.show('¡Ha iniciado sesión correctamente!', 'success', { duration: 1100 });

                setTimeout(() => {
                    window.location.hash = '#/dashboard';
                }, 1500);

            } catch (error) {
                Notification.show('Error al iniciar sesión: ' + error.message, 'error', { duration: 4000 });
                button.disabled = false;
                button.innerHTML = 'Iniciar sesión';
            }
        });
    }
};
