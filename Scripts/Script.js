const button = document.getElementById('avatar-navbar');
const closeButton = document.querySelector('.close-button');
const navigationMenu = document.querySelector('.navigation__menu');

button.addEventListener('click', () => {
    navigationMenu.classList.remove('none');
    navigationMenu.classList.remove('hide');
});

closeButton.addEventListener('click', () => {
    navigationMenu.classList.add('hide');
});

document.addEventListener("DOMContentLoaded", function() {
    const repositoryBanner = document.querySelector(".repository-banner");
    const overlay = document.getElementById("overlay");
    const closeRepoBtn = document.getElementById("closeRepoBtn");
    const activateBannerBtn = document.getElementById("activate_banner");

    activateBannerBtn.addEventListener("click", () => {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.classList.add("active");
            repositoryBanner.style.display = 'flex';
            setTimeout(() => {
                repositoryBanner.classList.add('show');
                repositoryBanner.classList.remove('hide');
            }, 10);
        }, 10);
    });

    closeRepoBtn.addEventListener("click", () => {
        repositoryBanner.classList.add('hide');
        repositoryBanner.classList.remove('show');
        setTimeout(() => {
            repositoryBanner.style.display = 'none';
            overlay.classList.remove("active");
            overlay.style.display = 'none';
        }, 10);
    });
});
