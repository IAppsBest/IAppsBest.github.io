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
    }, 10); // Задержка, чтобы CSS-анимация применилась
});

// Функция для закрытия баннера
closeBanner.addEventListener('click', () => {
    banner.classList.add('hide');
    banner.classList.remove('show');
    setTimeout(() => {
        banner.style.display = 'none'; // Убираем баннер после завершения анимации
    }, 500); // Время совпадает с transition-duration
});



