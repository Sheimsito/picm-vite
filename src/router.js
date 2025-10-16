
import { Login } from './pages/login.js'
import { Recovery } from './pages/recovery.js'
import { Dashboard } from './pages/dashboard.js'
import { ResetPassword } from './pages/resetPassword.js'
/* 
import { home } from './views/home.js'
import { products } from './views/products.js'
import { supplies } from './views/supplies.js'
import { users } from './views/users.js'
import { notFound } from './views/notFound.js'
*/

const notFound = {
    render: () => '<h1>404 - Página no encontrada</h1>'
}

const routes = {
    '#/login': Login,
    '#/recovery': Recovery,
    '#/dashboard': Dashboard,
    '#/reset-password': ResetPassword,
    '': Login, // default route
};

function getPath() {
    return window.location.hash || '#/login';
}

function setPage(pageName) {
    document.body.className = ''; // clean classes
    document.body.classList.add(`${pageName}-page`);
}

// Mapping of routes to page names
const routeToPageName = {
    '#/login': 'login',
    '#/recovery': 'recovery', 
    '#/reset-password': 'resetPassword',
    '#/dashboard': 'dashboard',
    '': 'login'
};



export function router() {
    
    const app = document.getElementById('app');
    const path = getPath();
    
    // Search exact route first
    let Page = routes[path];
    let pageName = routeToPageName[path];
    
    // If exact route is not found, search routes with parameters
    if (!Page) {
        if (path.startsWith('#/reset-password/')) {
            Page = ResetPassword;
            pageName = 'resetPassword';
        } else {
            Page = notFound;
            pageName = 'not-found';
        }
    }
    
    // Change the class of the body dynamically
    setPage(pageName);

    app.innerHTML = Page.render();

    if(Page.init) Page.init();

}

export function setupRouter() {
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
}