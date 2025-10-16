export const Notification = {
    render({ 
        message, 
        type = 'success', 
        position = 'top-right', 
        show = false, 
        autoHide = true,
        duration = 1100
    }) {
        if (!show) return '';
        
        return `
        <div class="notification notification-${type} notification-${position}" 
             data-auto-hide="${autoHide}" 
             data-duration="${duration}">
            <div class="notification-content">
                <div class="notification-icon">
                    ${this.getIcon(type)}
                </div>
                <div class="notification-message">
                    <p>${message}</p>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    ×
                </button>
            </div>
        </div>
        `;
    },
    
    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    },
    
    show(message, type = 'success', options = {}) {
        const notification = this.render({
            message,
            type,
            show: true,
            ...options
        });
        
        // Add to the DOM
        const container = this.getContainer();
        container.insertAdjacentHTML('beforeend', notification);
        
        // Auto-hide if enabled
        const notificationElement = container.lastElementChild;
        if (options.autoHide !== false) {
            setTimeout(() => {
                if (notificationElement) {
                    notificationElement.remove();
                }
            }, options.duration || 3000);
        }
        
        return notificationElement;
    },
    
    getContainer() {
        let container = document.querySelector('.notifications-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        return container;
    },
    
    hide(notificationElement) {
        if (notificationElement) {
            notificationElement.remove();
        }
    },
    
    hideAll() {
        const container = document.querySelector('.notifications-container');
        if (container) {
            container.innerHTML = '';
        }
    }
};