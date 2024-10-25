const appList = document.getElementById('app-list');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search');
let apps = [];
let currentPage = 1;
const itemsPerPage = 20;
const maxVisiblePages = 3;
let displayMode = 'full';

fetch('Repo.json')
    .then(response => response.json())
    .then(data => {
        apps = data;
        displayApps();
        setupPagination();
    });

document.getElementById('full-list-btn').addEventListener('click', () => {
    displayMode = 'full';
    currentPage = 1;
    displayApps();
    
    document.querySelector('.full-button').classList.add('active');
    document.querySelector('.time-button').classList.remove('active');
});

document.getElementById('time-list-btn').addEventListener('click', () => {
    displayMode = 'time';
    currentPage = 1;
    displayApps();

    document.querySelector('.time-button').classList.add('active');
    document.querySelector('.full-button').classList.remove('active');
});

function displayApps() {
    appList.innerHTML = '';
    let filteredApps = apps.filter(app => app.appName.toLowerCase().includes(searchInput.value.toLowerCase()));

    if (displayMode === 'time') {
        filteredApps.sort((a, b) => new Date(b.appUpdateTime) - new Date(a.appUpdateTime));
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredApps.slice(start, end).forEach((app, index) => {
        const formattedDescription = app.appDescription.replace(/\n/g, '<br>');
        const delay = index * 0.15;
        const appItem = document.createElement('div');
        appItem.className = 'app-item';
        appItem.style.animationDelay = `${delay}s`;
        appItem.innerHTML = `
            <div class="app-header">
                <img src="${app.appImage}" alt="${app.appName}" style="width: 50px;">
                <div>
                    <h3>${app.appName}</h3>
                    <p>${app.appVersion}</p>
                </div>
            </div>
            <hr>
            <p class="app-description">${formattedDescription}</p>
        `;
        appList.appendChild(appItem);
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        pagination.appendChild(firstPageBtn);
    }

    if (currentPage > 1) {
        const prevPageBtn = document.createElement('button');
        prevPageBtn.innerText = '<';
        prevPageBtn.addEventListener('click', () => {
            currentPage--;
            displayApps();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        pagination.appendChild(nextPageBtn);
    }

    if (currentPage < totalPages) {
        const lastPageBtn = document.createElement('button');
        lastPageBtn.innerText = '>>';
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            displayApps();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        pagination.appendChild(lastPageBtn);
    }
}

searchInput.addEventListener('input', () => {
    currentPage = 1;
    displayApps();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
