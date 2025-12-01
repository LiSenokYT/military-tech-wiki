// Переключение темы (отдельный файл для удобства)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const currentThemeInfo = document.getElementById('currentThemeInfo');
    const htmlElement = document.documentElement;

    // Функция переключения темы
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('site-theme', newTheme);
        updateThemeIcon(newTheme);
        updateThemeInfo(newTheme);
    }

    // Функция обновления иконки
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
            if (mobileThemeToggle) {
                mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i> Сменить тему';
            }
        } else {
            icon.className = 'fas fa-sun';
            if (mobileThemeToggle) {
                mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Сменить тему';
            }
        }
    }

    // Функция обновления текста информации о теме
    function updateThemeInfo(theme) {
        if (currentThemeInfo) {
            currentThemeInfo.textContent = `Тема: ${theme === 'dark' ? 'Тёмная' : 'Светлая'}`;
        }
    }

    // Инициализация темы из localStorage
    const savedTheme = localStorage.getItem('site-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateThemeInfo(savedTheme);

    // Назначение обработчиков событий
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
            // Закрываем мобильное меню после смены темы (опционально)
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    }
});
