const appList = document.getElementById('app-list');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search');
let apps = [];
let currentPage = 1;
const itemsPerPage = 20;
const maxVisiblePages = 5;

fetch('Repo.json')
    .then(response => response.json())
    .then(data => {
        apps = data;
        displayApps();
        setupPagination();
    });

function displayApps() {
    appList.innerHTML = '';
    const filteredApps = apps.filter(app => app.appName.toLowerCase().includes(searchInput.value.toLowerCase()));
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredApps.slice(start, end).forEach(app => {
        const formattedDescription = app.appDescription.replace(/\n/g, '<br>');
        appList.innerHTML += `
            <div class="app-item">
                <div class="app-header">
                    <img src="${app.appImage}" alt="${app.appName}" style="width: 50px;">
                    <div>
                        <h3>${app.appName}</h3>
                        <p>${app.appVersion}</p>
                    </div>
                </div>
                <p class="app-description">${formattedDescription}</p>
            </div>
        `;
    });
    setupPagination(filteredApps);
}

function setupPagination(filteredApps = apps) {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
    
    function createPageButton(page) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = page;
        pageBtn.addEventListener('click', () => {
            currentPage = page;
            displayApps();
        });
        if (currentPage === page) {
            pageBtn.disabled = true;
        }
        pagination.appendChild(pageBtn);
    }

    if (currentPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.innerText = '<<';
        firstPageBtn.addEventListener('click', () => {
            currentPage = 1;
            displayApps();
        });
        pagination.appendChild(firstPageBtn);
    }

    if (currentPage > 1) {
        const prevPageBtn = document.createElement('button');
        prevPageBtn.innerText = '<';
        prevPageBtn.addEventListener('click', () => {
            currentPage--;
            displayApps();
        });
        pagination.appendChild(prevPageBtn);
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    if (currentPage < totalPages) {
        const nextPageBtn = document.createElement('button');
        nextPageBtn.innerText = '>';
        nextPageBtn.addEventListener('click', () => {
            currentPage++;
            displayApps();
        });
        pagination.appendChild(nextPageBtn);
    }

    if (currentPage < totalPages) {
        const lastPageBtn = document.createElement('button');
        lastPageBtn.innerText = '>>';
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            displayApps();
        });
        pagination.appendChild(lastPageBtn);
    }
}

searchInput.addEventListener('input', () => {
    currentPage = 1;
    displayApps();
});
