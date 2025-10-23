export const Table = {
    render({
        headers = [],
        body = [],
        dataFields = [], // Array of object properties to display in each column
        striped = false,
        bordered = false,
        hover = false,
        responsive = false,
        size = '', // 'sm', 'lg', 'xl'
        variant = '', // 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
        className = '',
        caption = '',
        showSearch = false,
        showFilters = false,
        showInputFilter = false,
        inputFilter = '',
        filters = [],
        filterValues = [],
        showCheckboxes = false,
        // Pagination parameters
        showPagination = false,
        itemsPerPage = 10,
        currentPage = 1,
        totalItems = 0,
        onPageChange = null,

    }){
        
        // Build base table classes
        let tableClasses = [
            'w-full',
            'text-sm',
            'text-left',
            'text-gray-500',
            'dark:text-gray-400'
        ];
        
        // Add classes according to the options
        if (striped) tableClasses.push('table-auto');
        if (bordered) tableClasses.push('border-collapse', 'border', 'border-gray-300');
        if (hover) tableClasses.push('hover:bg-gray-50');
        if (size === 'sm') tableClasses.push('text-xs');
        if (size === 'lg') tableClasses.push('text-base');
        if (size === 'xl') tableClasses.push('text-xl');
        if (variant) tableClasses.push(`bg-${variant}-50`, `text-${variant}-800`);
        if (className) tableClasses.push(className);
        
        const tableClassString = tableClasses.join(' ');
        
        // Pagination logic
        let paginatedBody = body;
        let totalPages = 1;
        
        if (showPagination && totalItems > 0) {
            totalItems = totalItems || body.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
        }
        
        // Build table header
        const tableHeader = headers.length > 0 ? `
            <thead class="text-xs text-white uppercase bg-[var(--color-primary)]">
                <tr>
                    ${showCheckboxes ? '<th scope="col" class="p-4"><div class="flex items-center"><input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"><label for="checkbox-all-search" class="sr-only">checkbox</label></div></th>' : ''}
                    ${headers.map(header => `<th scope="col" class="px-6 py-3">${header}</th>`).join('')}
                </tr>
            </thead>
        ` : '';
        
        // Build table body
        const tableBody = paginatedBody.length > 0 ? `
            <tbody class="bg-white divide-y">
                ${paginatedBody.map((row, index) => {
                    const rowClasses = [
                        'bg-white',
                        'border-b',
                        'text-black',
                        'border-gray-200',
                        hover ? 'hover:bg-gray-50' : '',
                        'hover:bg-gray-50'
                    ].filter(Boolean).join(' ');
                    
                    // Function to extract the value of a cell
                    const getCellValue = (rowData, cellIndex) => {
                        if (Array.isArray(rowData)) {
                            return rowData[cellIndex] || '';
                        } else if (typeof rowData === 'object' && rowData !== null) {
                            // If it is an object, try to map to the properties based on the index
                            const objectKeys = Object.keys(rowData);
                            return rowData[objectKeys[cellIndex]] || '';
                        } else {
                            return rowData || '';
                        }
                    };
                    
                    // Function to render cells
                    const renderCells = () => {
                        if (Array.isArray(row)) {
                            return row.map((cell, cellIndex) => 
                                cellIndex === 0 
                                    ? `<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black">${cell}</th>` 
                                    : `<td class="px-6 py-4">${cell}</td>`
                            ).join('');
                        } else if (typeof row === 'object' && row !== null) {
                                // If it is an object and dataFields are specified, use those fields
                            if (dataFields.length > 0) {
                                return dataFields.map((field, cellIndex) => {
                                    let value = row[field] !== null && row[field] !== undefined ? row[field] : '';
                                
                                
                                if(field === "pdf"){
                                    value = `<button onclick="openPDF('${row.id}','${headers[1]}')" class="bg-blue-500 hover:bg-blue-700 text-white h-7 w-[5rem] text-xs py-1 px-2 rounded">Ver PDF</button>`.trim();
                                }    
                                if (field === "stock") {

                                        const isSupply = headers[3] === "Precio Unitario";

                                        const onClickIncrease = isSupply
                                            ? `increaseStockSupply(${row.id})`
                                            : `increaseStockProduct(${row.id})`;

                                        const onClickDecrease = isSupply
                                            ? `decreaseStockSupply(${row.id})`
                                            : `decreaseStockProduct(${row.id})`;

                                        value = `
                                            <button onclick="${onClickIncrease}" class="w-[2rem] h-[2rem] mx-2 bg-[var(--color-primary-hover)] text-[var(--color-bg)] border-[#D4D4D4] border-[0.1rem] hover:bg-[var(--color-primary)] rounded-2xl">+</button>
                                            <span id="stockInput">${value}</span>
                                            <button onclick="${onClickDecrease}" class="w-[2rem] h-[2rem] mx-2 bg-[var(--color-bg-secondary)] rounded-2xl hover:bg-[#D4D4D4]">-</button>
                                        `.trim();
                                }   
                                    const isHTML = typeof value === 'string' && (value.includes('<button') || value.includes('<a') || value.includes('<div'));
                                    return cellIndex === 0 
                                        ? `<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black">${value}</th>` 
                                        : `<td class="px-6 py-4">${value}</td>`;
                                }).join('');
                            } else {
                                // If dataFields are not specified, use all the properties of the object
                                const objectKeys = Object.keys(row);
                                return objectKeys.map((key, cellIndex) => {
                                    const value = row[key];
                                    const displayValue = value !== null && value !== undefined ? value : '';
                                    // If the value contains HTML (like buttons), render it as is
                                    const isHTML = typeof displayValue === 'string' && (displayValue.includes('<button') || displayValue.includes('<a') || displayValue.includes('<div'));
                                    return cellIndex === 0 
                                        ? `<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black">${displayValue}</th>` 
                                        : `<td class="px-6 py-4">${displayValue}</td>`;
                                }).join('');
                            }
                        } else {
                            return `<td class="px-6 py-4">${row}</td>`;
                        }
                    };
                    
                    return `
                        <tr class="${rowClasses}">
                            ${showCheckboxes ? `
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-${index}" type="checkbox" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-table-${index}" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                            ` : ''}
                            ${renderCells()}
                        </tr>
                    `;
                }).join('')}
            </tbody>
        ` : '';
        
        // Build top controls (search and filters)
        const controls = (showSearch || showFilters ) ? `
            <div class="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div class="flex items-center space-x-4">
                    ${showFilters ? `
                    <select id="filter-select" class="inline-flex items-center  text-black border bg-white border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5  dark:border-gray-400  hover:border-gray-400 ">
                            <option value="" disabled selected >Ordenar por...</option>
                             ${filters.map((filter, i) => ({ text: filter, value: filterValues[i] })).map(({ text, value }) => `<option value="${value}">${text}</option>`) .join('')}
                        </select>
                        
                        ${showInputFilter ? `
                        <input 
                            type="text" 
                            id="${inputFilter}-input" 
                            placeholder="Filtrar por ${inputFilter == 'supplier' ? 'proveedor' : inputFilter}..." 
                            class="inline-flex items-center  text-black border bg-white border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5  dark:border-gray-400  hover:border-gray-400 "
                        />
                        ` : ''}
                        
                        <button id="apply-filters" class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded text-sm">
                            Aplicar Filtros
                        </button>
                        
                        <button id="clear-filters" class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-sm">
                            Limpiar
                        </button>
                    ` : ''}
                </div>
                ${showSearch ? `
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-5 h-5 text-black " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search-input" oninput="handleTableSearch(this.value)" class="block p-2 ps-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-white focus:ring-primary focus:border-primary  dark:border-gray-200 dark:placeholder-black  dark:focus:ring-primary dark:focus:border-gray-200" placeholder="Buscar...">
                    </div>
                ` : ''}
            </div>
        ` : '';



        
        // Build pagination
        const pagination = showPagination && totalPages > 1 ? `
            <div class="flex items-center justify-between pt-4">
                <div class="flex items-center text-sm text-gray-700 dark:text-gray-400">
                    <span class="mr-2">Mostrando</span>
                    <span class="font-medium">${(currentPage - 1) * itemsPerPage + 1}</span>
                    <span class="mx-1">a</span>
                    <span class="font-medium">${Math.min(currentPage * itemsPerPage, totalItems)}</span>
                    <span class="ml-1">de</span>
                    <span class="font-medium ml-1">${totalItems}</span>
                    <span class="ml-1">resultados</span>
                </div>
                
                <div class="flex items-center space-x-2">
                    <!-- Previous button -->
                    <button 
                        class="flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100  dark:border-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${currentPage === 1 ? 'disabled' : ''}
                        onclick="changePage(${currentPage - 1})"
                    >
                        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Anterior
                    </button>
                    
                    <!-- Page numbers -->
                    <div class="flex items-center space-x-1">
                        ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            return `
                                <button 
                                    class="px-3 py-2 text-sm font-medium rounded-lg ${currentPage === pageNum 
                                        ? 'text-white bg-[var(--color-primary)] border border-[var(--color-primary-hover)]' 
                                        : 'text-black bg-white border border-gray-200 hover:bg-gray-100  dark:border-gray-200 hover:border-gray-200 '
                                    }"
                                    onclick="changePage(${pageNum})"
                                >
                                    ${pageNum}
                                </button>
                            `;
                        }).join('')}
                    </div>
                    
                    <!-- Next button -->
                    <button 
                        class="flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-100  dark:border-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${currentPage === totalPages ? 'disabled' : ''}
                        onclick="changePage(${currentPage + 1})"
                    >
                        Siguiente
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>
        ` : '';
        
        // Build complete table content
        const tableContent = `
            ${caption ? `<caption class="text-left text-gray-900 font-medium mb-2">${caption}</caption>` : ''}
            ${tableHeader}
            ${tableBody}
        `;
        
        // If responsive, wrap in a div
        if (responsive) {
            return `
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
                ${controls}
                <table class="${tableClassString}">
                    ${tableContent}
                </table>
                ${pagination}
            </div>
            `;
        }
        
        return `
        <div class="flex flex-col justify-center sm:rounded-lg w-full">
            ${controls}
            <table class="${tableClassString} w-full">
                ${tableContent}
            </table>
            ${pagination}
        </div>
        `;
    }
}