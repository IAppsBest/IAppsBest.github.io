const appList = document.getElementById('app-list');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search');
let apps = [];
let currentPage = 1;
const itemsPerPage = 20;
const maxVisiblePages = 5; // Количество видимых кнопок пагинации

fetch('Repo.json')
    .then(response => response.json())
    .then(data => {
        apps = data;
        displayApps();
        setupPagination();
    });

function displayApps() {
    appList.innerHTML = '';  // Очистить предыдущие приложения
    const filteredApps = apps.filter(app => app.appName.toLowerCase().includes(searchInput.value.toLowerCase()));
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredApps.slice(start, end).forEach(app => {
        appList.innerHTML += `
            <div class="app-item">
                <img src="${app.appImage}" alt="${app.appName}" style="width: 50px;">
                <div>
                    <h3>${app.appName}</h3>
                    <p>${app.appVersion}</p>
                    <p>${app.appDescription}</p>
                </div>
            </div>
        `;
    });
    setupPagination(filteredApps);  // Обновить пагинацию для отфильтрованных приложений
}

function setupPagination(filteredApps = apps) {
    pagination.innerHTML = '';  // Очистить предыдущую пагинацию
    const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
    
    // Функция для создания кнопок страниц
    function createPageButton(page) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = page;
        pageBtn.addEventListener('click', () => {
            currentPage = page;
            displayApps();  // Перерисовать текущую страницу
        });
        if (currentPage === page) {
            pageBtn.disabled = true;  // Отключить кнопку текущей страницы
        }
        pagination.appendChild(pageBtn);
    }

    // Добавить кнопку "Первая страница"
    if (currentPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.innerText = '<<';
        firstPageBtn.addEventListener('click', () => {
            currentPage = 1;
            displayApps();
        });
        pagination.appendChild(firstPageBtn);
    }

    // Добавить кнопку "Предыдущая страница"
    if (currentPage > 1) {
        const prevPageBtn = document.createElement('button');
        prevPageBtn.innerText = '<';
        prevPageBtn.addEventListener('click', () => {
            currentPage--;
            displayApps();
        });
        pagination.appendChild(prevPageBtn);
    }

    // Определить диапазон видимых кнопок страниц
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    // Добавить кнопку "Следующая страница"
    if (currentPage < totalPages) {
        const nextPageBtn = document.createElement('button');
        nextPageBtn.innerText = '>';
        nextPageBtn.addEventListener('click', () => {
            currentPage++;
            displayApps();
        });
        pagination.appendChild(nextPageBtn);
    }

    // Добавить кнопку "Последняя страница"
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
    currentPage = 1;  // Сбросить текущую страницу на 1 при новом поиске
    displayApps();
});
