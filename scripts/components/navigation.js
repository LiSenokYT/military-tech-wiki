// Компонент навигации
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Закрываем меню при клике на ссылку
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }
}

// Инициализируем навигацию
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

export default Navigation;
