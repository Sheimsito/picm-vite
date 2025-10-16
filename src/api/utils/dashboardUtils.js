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
