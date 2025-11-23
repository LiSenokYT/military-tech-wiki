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

        if (header) {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 100) {
                    header.style.background = 'rgba(10, 10, 10, 0.98)';
                    header.style.backdropFilter = 'blur(15px)';
                    
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

            window.addEventListener('scroll', handleScroll);
            header.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    setupNavigationEvents() {
        this.updateActiveNavigation();
        
        window.addEventListener('hashchange', () => {
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const hash = window.location.hash.slice(1) || '/';
        const currentPage = hash.split('/')[1] || 'home';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('data-page');
            
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupAdminAccess() {
        const adminBtn = document.getElementById('admin-access');
        if (adminBtn) {
            this.updateAdminButton();
            
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
}

// Инициализируем навигацию когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

export default Navigation;
