// Компонент навигации
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
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

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        const header = document.getElementById('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            }

            lastScrollY = window.scrollY;
        });
    }
}

// Инициализируем навигацию
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

export default Navigation;
