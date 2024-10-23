const appList = document.getElementById('app-list');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search');
let apps = [];
let currentPage = 1;
const itemsPerPage = 20;

fetch('Repo.json')
    .then(response => response.json())
    .then(data => {
        apps = data;
        displayApps();
        setupPagination();
    });

function displayApps() {
    appList.innerHTML = '';  // Clear previous apps
    const filteredApps = apps.filter(app => app.AppName.toLowerCase().includes(searchInput.value.toLowerCase()));
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredApps.slice(start, end).forEach(app => {
        appList.innerHTML += `
            <div class="app-item">
                <img src="${app.ImageApp}" alt="${app.AppName}" style="width: 50px;">
                <div>
                    <h3>${app.AppName}</h3>
                    <p>${app.VersionApp}</p>
                    <p>${app.Description}</p>
                </div>
            </div>
        `;
    });
}

function setupPagination() {
    pagination.innerHTML = '';  // Clear previous pagination
    const totalPages = Math.ceil(apps.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayApps();
        });
        pagination.appendChild(pageBtn);
    }
}

searchInput.addEventListener('input', displayApps);
