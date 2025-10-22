import { Modal } from '../../components/ui/modal.js';
import { Notification } from '../../components/ui/Notification.js';

// This is a fabric for search handler's
export function createSearchHandler(loaderFn, updaterFn, label) {
    let timeout = null;
    return async (searchTerm) => {
        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(async () => {
            console.log(`Buscando ${label}:`, searchTerm);
            const newTable = await loaderFn(1, 5, searchTerm);
            updaterFn(newTable);
            
            setTimeout(() => {
                const searchInput = document.getElementById('table-search-input');
                if (searchInput) {
                    searchInput.value = searchTerm;
                    searchInput.focus();
                }
            }, 50);
        }, 500);
    };
}

export function openModalAndHandle({
    title,
    inputs,
    submitText = 'Guardar',
    closeText = 'Cancelar',
    size = 'md',
    buildPayload,
    apiCall,
    successMessage = 'Operación realizada correctamente',
    onSuccess = () => {}
}) {
    Modal.show({
        title,
        inputs,
        showSubmitButton: true,
        submitText,
        closeText,
        size,
        onSubmit: async () => {
            try {
                const payload = buildPayload ? buildPayload() : {};
                await apiCall(payload);
                Notification.show(successMessage, 'success', { duration: 1100 });
                window.closeModal && window.closeModal();
                onSuccess();
            } catch (error) {
                Notification.show('Error: ' + error.message, 'error', { duration: 4000 });
            }
        }
    });
}

export async function confirmAndDelete({
    confirmText = '¿Está seguro?',
    deleteFn,
    successMessage = 'Eliminado correctamente',
    onSuccess = () => {}
}) {
    if (confirm(confirmText)) {
        try {
            await deleteFn();
            Notification.show(successMessage, 'success', { duration: 2000 });
            onSuccess();
        } catch (error) {
            Notification.show('Error: ' + error.message, 'error', { duration: 4000 });
        }
    }
}
