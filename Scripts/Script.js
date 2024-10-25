const button = document.getElementById('avatar-navbar');
const closeButton = document.querySelector('.close-button');
const navigationMenu = document.querySelector('.navigation__menu');
const banner = document.getElementById('banner');
const activateBanner = document.getElementById('activate_banner');
const closeBanner = document.querySelector('.close-banner');

button.addEventListener('click', () => {
    navigationMenu.classList.remove('none');
    navigationMenu.classList.remove('hide');
});

closeButton.addEventListener('click', () => {
    navigationMenu.classList.add('hide');
});

activateBanner.addEventListener('click', () => {
    banner.style.display = 'flex';
    setTimeout(() => {
        banner.classList.add('show');
        banner.classList.remove('hide');
    }, 10);
});

closeBanner.addEventListener('click', () => {
    banner.style.display = 'none';
    setTimeout(() => {
        banner.classList.add('hide');
        banner.classList.remove('show');
    }, 10);
});
