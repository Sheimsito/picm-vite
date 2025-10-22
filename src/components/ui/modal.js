
import { Notification } from "./Notification.js";

export const Modal = {
    render({
        title = '',
        content = '',
        amountOfInput = 0,
        inputs = [],
        show = false,
        onClose = null,
        onSubmit = null,
        submitText = 'Guardar',
        closeText = 'Cerrar',
        size = 'md', // 'sm', 'md', 'lg', 'xl'
        variant = 'default', // 'default', 'success', 'warning', 'danger'
        showCloseButton = true,
        showSubmitButton = false,
        className = ''
    }){
        // Size classes
        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl'
        };

        // Variant classes
        const variantClasses = {
            default: 'border-gray-200',
            success: 'border-green-500',
            warning: 'border-yellow-500',
            danger: 'border-red-500'
        };

        // Build inputs dynamically
        const inputsHTML = inputs.map((input, index) => `
            <div class="mb-4">
                <label for="${input.id || `input-${index}`}" class="block text-sm font-medium text-black mb-2">
                    ${input.title}
                </label>

                ${input.type === 'select' ? `
                    <select 
                        id="${input.id || `input-${index}`}"
                        name="${input.name || `input-${index}`}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        ${input.required ? 'required' : ''}
                        ${input.disabled ? 'disabled' : ''}
                    >
                        ${(input.options || []).map(option => `
                            <option 
                                class="text-gray-600 text-sm font-normal bg-white" 
                                value="${option}" 
                                ${input.value === option ? 'selected' : ''}
                            >
                                ${option}
                            </option>
                        `).join('')}
                    </select>
                ` : `
                    <input 
                        type="${input.type || 'text'}" 
                        id="${input.id || `input-${index}`}"
                        name="${input.name || `input-${index}`}"
                        placeholder="${input.placeholder || ''}"
                        value="${input.value || (input.type === 'number' ? '0' : '')}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent transition-colors duration-200"
                        ${input.required ? 'required' : ''}
                        ${input.disabled ? 'disabled' : ''}
                    />
                `}

                ${input.error ? `<p class="text-red-500 text-xs mt-1">${input.error}</p>` : ''}
            </div>
        `).join('');

        return `
        <div class="fixed inset-0 z-50 ${show ? 'flex' : 'hidden'} items-center justify-center backdrop-blur bg-black/40  transition-opacity duration-300">
            <div class="bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4 transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b ${variantClasses[variant]}">
                    <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
                    ${showCloseButton ? `
                        <button 
                            onclick="${onClose ? 'window.closeModal()' : ''}"
                            id="close-modal"
                            class=" text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    ` : ''}
                </div>

                <!-- Body -->
                <div class="p-6">
                    ${content ? `<p class="text-gray-600 mb-4">${content}</p>` : ''}
                    
                    <!-- Formulario con inputs -->
                    ${inputs.length > 0 ? `
                        <form id="modal-form" class="space-y-4">
                            ${inputsHTML}
                        </form>
                    ` : ''}
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-center space-x-3 p-6 border-t border-gray-200 bg-[var(--color-bg-secondary)] rounded-b-lg">
        
                    ${showSubmitButton ? `
                        <button 
                            onclick="${onSubmit ? 'window.submitModal()' : ''}"
                            class="px-4 py-2 text-sm font-medium text-white bg-[var(--color-success)] border border-transparent rounded-lg hover:bg-[var(--color-success-hover)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
                        >
                            ${submitText}
                        </button>
                    ` : ''}
                    ${showCloseButton ? `
                        <button 
                            onclick="window.closeModal()"
                            class="px-4 py-2 text-sm font-medium text-white bg-[var(--color-error)] border border-gray-300 rounded-lg hover:bg-[var(--color-error-hover)] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            ${closeText}
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
        `;
    },
    init(){
        // Global function to close modal
        window.closeModal = () => {
            const modal = document.querySelector('.fixed.inset-0.z-50');
            if (modal) {
                // Clean onSubmit function if exists
                if (modal.dataset.onSubmit) {
                    delete window[modal.dataset.onSubmit];
                }
                
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                // Remove the modal from the DOM after the animation
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };

        // Validator
        const validateForm = (form) => {
            const inputs = form.querySelectorAll('input');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('error');
                }
            });
            return isValid;
        };

        // Global function to submit modal
        window.submitModal = async () => {
            const form = document.getElementById('modal-form');
            if (form) {
                if (!validateForm(form)) {
                    Notification.show('Por favor, complete todos los campos', 'error', {
                        duration: 4000
                    });
                    return;
                }
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                console.log('Form data:', data);
                
                // Get the onSubmit function from the current modal
                const modal = document.querySelector('.fixed.inset-0.z-50');
                if (modal && modal.dataset.onSubmit) {
                    try {
                        // Execute the onSubmit function from the dashboard
                        await window[modal.dataset.onSubmit](data);
                    } catch (error) {
                        console.error('Error en onSubmit:', error);
                    }
                } else {
                    // Fallback: close modal if there is no onSubmit function
                    window.closeModal();
                }
            }
        };
        // Close modal when clicking the close button
        const buttonCancel = document.getElementById('close-modal');
        if (buttonCancel) {
            buttonCancel.addEventListener('click', () => {
                window.closeModal();
            });
        }
        // Get the current modal
        const modal = document.querySelector('.fixed.inset-0.z-50');
        if (!modal) return;

        // Close modal when clicking the backdrop / background
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                window.closeModal();
            }
        });

        // Close modal with the Escape key
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                window.closeModal();
                console.log('Escape');
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },

 

    // Method to show modal
    show(options = {}){
        // Remove existing modal if exists
        const existingModal = document.querySelector('.fixed.inset-0.z-50');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Generate a unique ID for the onSubmit function
        const onSubmitId = 'onSubmit_' + Date.now();
        
        // If there is an onSubmit function, register it globally
        if (options.onSubmit && typeof options.onSubmit === 'function') {
            window[onSubmitId] = options.onSubmit;
        }
        
        const modalHTML = this.render({ ...options, show: true });
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add the ID of the onSubmit function to the modal
        const modal = document.querySelector('.fixed.inset-0.z-50');
        if (modal && options.onSubmit) {
            modal.dataset.onSubmit = onSubmitId;
        }
        
        // Initialize after a small delay to ensure the DOM is ready
        setTimeout(() => {
            this.init();
        }, 10);
    },

    // Method to hide modal
    hide(){
        window.closeModal();
    }
}