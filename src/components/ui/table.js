export const Table = {
    render({
        headers = [],
        body = [],
        dataFields = [],
        striped = false,
        bordered = false,
        hover = false,
        responsive = false,
        size = '',
        variant = '',
        className = '',
        caption = '',
        showSearch = false,
        showFilters = false,
        showInputFilter = false,
        inputFilter = '',
        filters = [],
        filterValues = [],
        showCheckboxes = false,
        showPagination = false,
        itemsPerPage = 10,
        currentPage = 1,
        totalItems = 0,
        onPageChange = null,
    }) {

        // Pagination logic
        let paginatedBody = body;
        let totalPages = 1;

        if (showPagination && totalItems > 0) {
            totalItems = totalItems || body.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
        }

        // ── Table header ─────────────────────────────────────────────────────────
        const tableHeader = headers.length > 0 ? `
            <thead>
                <tr>
                    ${showCheckboxes ? `
                        <th style="width:40px;padding:11px 14px;">
                            <input id="checkbox-all-search" type="checkbox" style="width:15px;height:15px;accent-color:var(--color-primary);">
                        </th>` : ''}
                    ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
            </thead>
        ` : '';

        // ── Table body ────────────────────────────────────────────────────────────
        const renderCells = (row, index) => {
            if (Array.isArray(row)) {
                return row.map((cell, i) =>
                    i === 0
                        ? `<th scope="row" style="font-weight:600;color:#1a2035;">${cell}</th>`
                        : `<td>${cell}</td>`
                ).join('');
            }

            if (typeof row === 'object' && row !== null) {
                const fields = dataFields.length > 0 ? dataFields : Object.keys(row);

                return fields.map((field, i) => {
                    let value = row[field] !== null && row[field] !== undefined ? row[field] : '';

                    // PDF button
                    if (field === 'pdf') {
                        value = `
                            <button onclick="openPDF('${row.id}','${headers[1]}')" class="tbl-btn tbl-btn-edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                Ver PDF
                            </button>`.trim();
                    }

                    // Stock controls
                    if (field === 'stock') {
                        const isSupply = headers[3] === 'Precio Unitario';
                        const onIncrease = isSupply ? `increaseStockSupply(${row.id})` : `increaseStockProduct(${row.id})`;
                        const onDecrease = isSupply ? `decreaseStockSupply(${row.id})` : `decreaseStockProduct(${row.id})`;
                        value = `
                            <div style="display:flex;align-items:center;gap:6px;">
                                <button onclick="${onDecrease}" style="width:26px;height:26px;border-radius:50%;border:1px solid #e2e5ee;background:#f5f6fa;color:#4a5568;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;" onmouseover="this.style.background='#fce8e8';this.style.color='var(--color-error)'" onmouseout="this.style.background='#f5f6fa';this.style.color='#4a5568'">−</button>
                                <span id="stockInput" style="min-width:28px;text-align:center;font-weight:600;">${value}</span>
                                <button onclick="${onIncrease}" style="width:26px;height:26px;border-radius:50%;border:1px solid #e2e5ee;background:#f5f6fa;color:#4a5568;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;" onmouseover="this.style.background='#eef3ff';this.style.color='var(--color-primary)'" onmouseout="this.style.background='#f5f6fa';this.style.color='#4a5568'">+</button>
                            </div>`.trim();
                    }

                    return i === 0
                        ? `<th scope="row" style="font-weight:600;color:#1a2035;">${value}</th>`
                        : `<td>${value}</td>`;
                }).join('');
            }

            return `<td>${row}</td>`;
        };

        const tableBody = paginatedBody.length > 0 ? `
            <tbody>
                ${paginatedBody.map((row, index) => `
                    <tr>
                        ${showCheckboxes ? `
                            <td style="padding:11px 14px;">
                                <input id="checkbox-table-${index}" type="checkbox" style="width:15px;height:15px;accent-color:var(--color-primary);">
                            </td>` : ''}
                        ${renderCells(row, index)}
                    </tr>
                `).join('')}
            </tbody>
        ` : `
            <tbody>
                <tr>
                    <td colspan="${headers.length}" style="padding:0;">
                        <div class="empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18"/>
                            </svg>
                            <p>No hay registros para mostrar</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        `;

        // ── Controls (search + filters) ────────────────────────────────────────────
        const controls = (showSearch || showFilters) ? `
            <div class="action-bar">
                <div class="action-bar-left">
                    ${showFilters ? `
                        <select id="filter-select" class="filter-select">
                            <option value="" disabled selected>Ordenar por...</option>
                            ${filters.map((f, i) => `<option value="${filterValues[i]}">${f}</option>`).join('')}
                        </select>
                        ${showInputFilter ? `
                            <input
                                type="text"
                                id="${inputFilter}-input"
                                placeholder="Filtrar por ${inputFilter === 'supplier' ? 'proveedor' : inputFilter}..."
                                class="filter-input"
                            />
                        ` : ''}
                        <button id="apply-filters" class="btn-primary" style="padding:7px 14px;font-size:13px;">
                            Aplicar
                        </button>
                        <button id="clear-filters" class="btn-secondary" style="padding:7px 14px;font-size:13px;">
                            Limpiar
                        </button>
                    ` : ''}
                </div>
                ${showSearch ? `
                    <div style="position:relative;">
                        <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#8a94a6;" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        <input
                            type="text"
                            id="table-search-input"
                            oninput="handleTableSearch(this.value)"
                            placeholder="Buscar..."
                            class="filter-input"
                            style="padding-left:32px;min-width:220px;"
                        >
                    </div>
                ` : ''}
            </div>
        ` : '';

        // ── Pagination ─────────────────────────────────────────────────────────────
        const pagination = showPagination && totalPages > 1 ? `
            <div class="pagination-bar">
                <span class="pagination-info">
                    Mostrando ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, totalItems)} de ${totalItems} registros
                </span>
                <div class="pagination-controls">
                    <button
                        class="page-btn"
                        ${currentPage === 1 ? 'disabled' : ''}
                        onclick="changePage(${currentPage - 1})"
                        aria-label="Página anterior"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>

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
                                class="page-btn ${currentPage === pageNum ? 'active' : ''}"
                                onclick="changePage(${pageNum})"
                            >${pageNum}</button>
                        `;
                    }).join('')}

                    <button
                        class="page-btn"
                        ${currentPage === totalPages ? 'disabled' : ''}
                        onclick="changePage(${currentPage + 1})"
                        aria-label="Página siguiente"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        ` : '';

        // ── Assemble ───────────────────────────────────────────────────────────────
        return `
            <div class="section-card">
                ${controls}
                <div class="table-wrapper">
                    <table class="data-table">
                        ${caption ? `<caption style="text-align:left;padding:10px 14px;font-weight:600;color:#1a2035;">${caption}</caption>` : ''}
                        ${tableHeader}
                        ${tableBody}
                    </table>
                </div>
                ${pagination}
            </div>
        `;
    }
};