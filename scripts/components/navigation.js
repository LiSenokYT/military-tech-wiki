// Компонент навигации
class Navigation {
    constructor() {
        this.isMobileMenuOpen = false;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupNavigationEvents();
        this.setupAdminAccess();
        this.setupThemePersistence();
        this.addNavigationStyles();
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
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPage = link.getAttribute('data-page');
                    const href = link.getAttribute('href');
                    
                    // Плавный переход с закрытием меню
                    this.closeMobileMenu();
                    
                    // Даем время для анимации закрытия меню перед переходом
                    setTimeout(() => {
                        if (href && href !== '#') {
                            window.location.hash = href;
                        } else if (targetPage) {
                            window.location.hash = `/${targetPage === 'home' ? '' : targetPage}`;
                        }
                    }, 300);
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
                if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        if (this.isAnimating) return;
        
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            this.isAnimating = true;
            
            if (this.isMobileMenuOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 300);
        }
    }

    openMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        this.isMobileMenuOpen = true;
        
        // Блокируем прокрутку тела когда меню открыто
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        this.isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        const header = document.getElementById('header');
        let isHeaderHidden = false;
        let scrollTimeout;

        if (header) {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                
                // Показываем/скрываем header при скролле
                if (currentScrollY > 100) {
                    header.style.background = 'rgba(10, 10, 10, 0.98)';
                    header.style.backdropFilter = 'blur(15px)';
                    
                    // Скрываем header при скролле вниз, показываем при скролле вверх
                    if (currentScrollY > lastScrollY && currentScrollY > 200 && !this.isMobileMenuOpen) {
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
                    header.style.backdropFilter = 'blur(10px)';
                    header.style.transform = 'translateY(0)';
                    isHeaderHidden = false;
                }

                lastScrollY = currentScrollY;
            };

            // Добавляем throttle для производительности
            const throttledScroll = () => {
                if (!scrollTimeout) {
                    scrollTimeout = setTimeout(() => {
                        handleScroll();
                        scrollTimeout = null;
                    }, 10);
                }
            };

            window.addEventListener('scroll', throttledScroll);

            // Добавляем transition для плавности
            header.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    setupNavigationEvents() {
        // Обработка активного состояния навигации
        this.updateActiveNavigation();
        
        // Слушаем изменения hash для обновления навигации
        window.addEventListener('hashchange', () => {
            this.updateActiveNavigation();
        });

        // Плавная навигация по клику
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#/') || href === '#') {
                    e.preventDefault();
                    
                    // Плавный переход
                    this.handlePageTransition(() => {
                        if (href === '#') {
                            window.location.hash = '';
                        } else {
                            window.location.hash = href;
                        }
                    });
                }
            }
        });
    }

    handlePageTransition(callback) {
        const content = document.getElementById('content');
        if (content) {
            // Плавное исчезновение
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                callback();
                
                // Плавное появление после смены страницы
                setTimeout(() => {
                    if (content) {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }
                }, 50);
            }, 200);
        } else {
            callback();
        }
    }

    updateActiveNavigation() {
        const hash = window.location.hash.slice(1) || '/';
        const currentPage = hash.split('/')[1] || 'home';
        
        // Плавное обновление активного состояния
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('data-page');
            
            if (linkPage === currentPage) {
                // Плавное добавление активного класса
                setTimeout(() => {
                    link.classList.add('active');
                }, 50);
            } else {
                link.classList.remove('active');
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

    addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Плавные переходы для навигации */
            .nav-link {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }

            .nav-menu {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }

            .nav-toggle .bar {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }

            /* Анимация для активного состояния */
            .nav-link.active {
                position: relative;
                transform: translateY(-1px);
            }

            .nav-link.active::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, var(--accent-red), var(--accent-gold));
                animation: expandWidth 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            @keyframes expandWidth {
                to {
                    width: calc(100% - 2rem);
                }
            }

            /* Плавное появление мобильного меню */
            @media (max-width: 768px) {
                .nav-menu {
                    transform: translateX(-100%);
                }

                .nav-menu.active {
                    transform: translateX(0);
                }
            }

            /* Улучшенная анимация для иконки бургера */
            .nav-toggle.active .bar:nth-child(1) {
                transform: translateY(8px) rotate(45deg) scaleX(1.1);
            }

            .nav-toggle.active .bar:nth-child(2) {
                opacity: 0;
                transform: scaleX(0);
            }

            .nav-toggle.active .bar:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg) scaleX(1.1);
            }

            /* Плавное изменение контента */
            #content {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
    }

    // Публичные методы для внешнего использования
    setActivePage(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                setTimeout(() => {
                    link.classList.add('active');
                }, 50);
            }
        });
    }

    refreshNavigation() {
        this.updateActiveNavigation();
        this.updateAdminButton();
    }
}

// Инициализируем навигацию когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

export default Navigation;
