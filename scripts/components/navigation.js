// Компонент навигации
class Navigation {
    constructor() {
        this.isMobileMenuOpen = false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupNavigationEvents();
        this.setupAdminAccess();
        this.setupThemePersistence();
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });

            // Закрываем меню при клике на ссылку
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Закрываем меню при клике вне его
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Закрываем меню при изменении размера окна
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            this.isMobileMenuOpen = navMenu.classList.contains('active');
            
            // Блокируем прокрутку тела когда меню открыто
            document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        }
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            this.isMobileMenuOpen = false;
            document.body.style.overflow = '';
        }
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        const header = document.getElementById('header');
        let isHeaderHidden = false;

        if (header) {
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                // Показываем/скрываем header при скролле
                if (currentScrollY > 100) {
                    header.style.background = 'rgba(10, 10, 10, 0.95)';
                    header.style.backdropFilter = 'blur(10px)';
                    
                    // Скрываем header при скролле вниз, показываем при скролле вверх
                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        if (!isHeaderHidden) {
                            header.style.transform = 'translateY(-100%)';
                            isHeaderHidden = true;
                        }
                    } else {
                        if (isHeaderHidden) {
                            header.style.transform = 'translateY(0)';
                            isHeaderHidden = false;
                        }
                    }
                } else {
                    header.style.background = 'rgba(26, 26, 26, 0.95)';
                    header.style.transform = 'translateY(0)';
                    isHeaderHidden = false;
                }

                lastScrollY = currentScrollY;
            });

            // Добавляем transition для плавности
            header.style.transition = 'all 0.3s ease';
        }
    }

    setupNavigationEvents() {
        // Обработка активного состояния навигации
        this.updateActiveNavigation();
        
        // Слушаем изменения hash для обновления навигации
        window.addEventListener('hashchange', () => {
            this.updateActiveNavigation();
        });

        // Плавная прокрутка для anchor ссылок
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                const href = link.getAttribute('href');
                if (href.startsWith('#/')) {
                    // Это внутренняя навигация, обрабатывается роутером
                    return;
                }
                
                // Anchor ссылки
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    updateActiveNavigation() {
        const hash = window.location.hash.slice(1) || '/';
        const currentPage = hash.split('/')[1] || 'home';
        
        // Обновляем активное состояние в навигации
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            
            const linkPage = link.getAttribute('data-page');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });

        // Обновляем хлебные крошки если они есть
        this.updateBreadcrumbs(currentPage);
    }

    updateBreadcrumbs(currentPage) {
        const breadcrumbsContainer = document.querySelector('.breadcrumbs');
        if (!breadcrumbsContainer) return;

        const pageTitles = {
            'home': 'Главная',
            'ground': 'Наземная техника',
            'air': 'Воздушная техника',
            'naval': 'Морская техника',
            'ammunition': 'Боеприпасы',
            'admin': 'Админ-панель',
            'vehicle': 'Техника'
        };

        const hash = window.location.hash.slice(1);
        const paths = hash.split('/').filter(p => p);
        
        let breadcrumbsHTML = '<a href="#/">Главная</a>';
        
        paths.forEach((path, index) => {
            const isLast = index === paths.length - 1;
            const title = pageTitles[path] || this.capitalize(path);
            
            if (isLast) {
                breadcrumbsHTML += `<span class="breadcrumb-separator">/</span><span class="breadcrumb-current">${title}</span>`;
            } else {
                const href = '#/' + paths.slice(0, index + 1).join('/');
                breadcrumbsHTML += `<span class="breadcrumb-separator">/</span><a href="${href}">${title}</a>`;
            }
        });

        breadcrumbsContainer.innerHTML = breadcrumbsHTML;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    setupAdminAccess() {
        const adminBtn = document.getElementById('admin-access');
        if (adminBtn) {
            // Проверяем авторизацию и обновляем иконку
            this.updateAdminButton();
            
            // Слушаем изменения в localStorage для авторизации
            window.addEventListener('storage', (e) => {
                if (e.key === 'admin') {
                    this.updateAdminButton();
                }
            });
        }
    }

    updateAdminButton() {
        const adminBtn = document.getElementById('admin-access');
        if (adminBtn) {
            const isAdmin = localStorage.getItem('admin') === 'true';
            const icon = adminBtn.querySelector('i');
            
            if (isAdmin) {
                adminBtn.style.color = 'var(--accent-gold)';
                adminBtn.style.borderColor = 'var(--accent-gold)';
                icon.className = 'fas fa-user-shield';
                adminBtn.title = 'Админ-панель (активна)';
            } else {
                adminBtn.style.color = '';
                adminBtn.style.borderColor = '';
                icon.className = 'fas fa-cog';
                adminBtn.title = 'Админ-панель';
            }
        }
    }

    setupThemePersistence() {
        // Восстанавливаем тему при загрузке
        const savedTheme = localStorage.getItem('theme');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (savedTheme === 'light' && themeToggle) {
            document.body.classList.add('light-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-sun';
            }
        }
    }

    // Публичные методы для внешнего использования
    setActivePage(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    refreshNavigation() {
        this.updateActiveNavigation();
        this.updateAdminButton();
    }

    // Метод для показа/скрытия loading состояния в навигации
    setLoadingState(isLoading) {
        const navLinks = document.querySelectorAll('.nav-link');
        if (isLoading) {
            navLinks.forEach(link => link.style.opacity = '0.6');
        } else {
            navLinks.forEach(link => link.style.opacity = '1');
        }
    }

    // Обновление счетчиков в навигации (если понадобится)
    updateCounters(counters) {
        // Можно добавить badges к пунктам меню с количеством элементов
        // Пока что оставляем как заглушку для будущего расширения
    }

    // Обработка клавиатуры для доступности
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC закрывает мобильное меню
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }

            // Tab в мобильном меню
            if (e.key === 'Tab' && this.isMobileMenuOpen) {
                this.handleMobileMenuTab(e);
            }
        });
    }

    handleMobileMenuTab(e) {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;

        const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    // Анимации для навигации
    addNavigationAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Анимации для навигации */
            .nav-link {
                position: relative;
                overflow: hidden;
            }

            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.1), transparent);
                transition: left 0.5s ease;
            }

            .nav-link:hover::before {
                left: 100%;
            }

            /* Анимация появления мобильного меню */
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .nav-menu.active {
                animation: slideInLeft 0.3s ease;
            }

            /* Анимация для активного состояния */
            .nav-link.active {
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Деструктор для очистки
    destroy() {
        document.removeEventListener('click', this.boundHandleClick);
        window.removeEventListener('scroll', this.boundHandleScroll);
        window.removeEventListener('resize', this.boundHandleResize);
        document.removeEventListener('keydown', this.boundHandleKeydown);
    }
}

// Инициализируем навигацию когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
    
    // Добавляем анимации после инициализации
    setTimeout(() => {
        window.navigation.addNavigationAnimations();
        window.navigation.setupKeyboardNavigation();
    }, 100);
});

// Экспортируем для использования в других модулях
export default Navigation;
