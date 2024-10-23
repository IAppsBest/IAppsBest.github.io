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

// Функция для активации баннера
activateBanner.addEventListener('click', () => {
    banner.style.display = 'flex'; // Показываем баннер
});

// Функция для закрытия баннера
closeBanner.addEventListener('click', () => {
    banner.style.display = 'none'; // Скрываем баннер
});

function setViewportScale() {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    const width = window.innerWidth;

    if (width > 768) { // Для больших экранов
        viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.65');
    } else { // Для более мелких экранов
        viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.50');
    }
}

// Устанавливаем масштаб при загрузке страницы
setViewportScale();

// Устанавливаем масштаб при изменении размера окна
window.addEventListener('resize', setViewportScale);



