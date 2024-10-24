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
    setTimeout(() => {
        banner.classList.add('show');
        banner.classList.remove('hide');
    }, 10); // Задержка для плавного старта анимации
});

// Функция для закрытия баннера
closeBanner.addEventListener('click', () => {
    banner.classList.add('hide');
    banner.classList.remove('show');
    setTimeout(() => {
        banner.style.display = 'none'; // Скрываем баннер после завершения анимации
    }, 1700); // Скрытие после завершения анимации (1.5 сек)
});


