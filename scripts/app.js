// Главный файл приложения - роутинг и инициализация
class MilitaryWikiApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.isAdmin = false;
        this.pages = {};
        this.init();
    }

    init() {
        console.log('MilitaryWiki App инициализирован');
        this.setupRouter();
        this.setupAdminModal();
        this.setupThemeToggle();
        this.loadPage();
        this.setupEventListeners();
    }

    setupRouter() {
        // Обработка изменения хэша в URL
        window.addEventListener('hashchange', () => {
            this.loadPage();
        });

        // Первоначальная загрузка
        if (!window.location.hash) {
            window.location.hash = '/';
        }
    }

    setupAdminModal() {
        const adminBtn = document.getElementById('admin-access');
        const modal = document.getElementById('admin-modal');
        const closeBtn = document.querySelector('.close-modal');
        const loginForm = document.getElementById('admin-login-form');

        if (adminBtn && modal) {
            adminBtn.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const password = document.getElementById('admin-password').value;
                this.handleAdminLogin(password);
            });
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                if (document.body.classList.contains('light-theme')) {
                    icon.className = 'fas fa-sun';
                    localStorage.setItem('theme', 'light');
                } else {
                    icon.className = 'fas fa-moon';
                    localStorage.setItem('theme', 'dark');
                }
            });

            // Восстанавливаем тему из localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                icon.className = 'fas fa-sun';
            }
        }
    }

    async handleAdminLogin(password) {
        if (password === 'admin123') {
            this.isAdmin = true;
            localStorage.setItem('admin', 'true');
            window.location.hash = '/admin';
            document.getElementById('admin-modal').style.display = 'none';
        } else {
            alert('Неверный пароль!');
        }
    }

    setupEventListeners() {
        // Глобальные обработчики событий
        document.addEventListener('click', (e) => {
            // Обработка кликов по карточкам техники
            const vehicleCard = e.target.closest('[data-vehicle-id]');
            if (vehicleCard) {
                const vehicleId = vehicleCard.dataset.vehicleId;
                this.navigateToVehicle(vehicleId);
                return;
            }

            // Обработка кликов по кнопкам "Подробнее" в карточках
            if (e.target.closest('.btn') && e.target.closest('.vehicle-card')) {
                const vehicleCard = e.target.closest('.vehicle-card');
                const vehicleId = vehicleCard.dataset.vehicleId;
                this.navigateToVehicle(vehicleId);
                return;
            }
        });

        // Обработка навигации по страницам
        this.setupPageNavigation();
    }

    setupPageNavigation() {
        // Сохраняем ссылки на страницы для глобального доступа
        this.pages = {};
    }

    async loadPage() {
        const hash = window.location.hash.slice(1) || '/';
        
        // Специальная обработка для страницы техники
        if (hash.startsWith('/vehicle/')) {
            await this.loadVehiclePage();
            return;
        }
        
        const path = hash.split('/')[1] || 'home';
        
        console.log('Загрузка страницы:', path);

        this.showLoading();

        try {
            let pageModule;
            
            // Динамически импортируем модуль страницы
            try {
                pageModule = await import(`./pages/${path}.js`);
            } catch (importError) {
                console.warn(`Страница ${path} не найдена, загружаем заглушку`);
                await this.loadErrorPage();
                return;
            }
            
            // Загружаем содержимое страницы
            await this.renderPage(pageModule.default);
            
            this.currentPage = path;
            this.updateNavigation();
            
        } catch (error) {
            console.error('Ошибка загрузки страницы:', error);
            await this.loadErrorPage();
        } finally {
            this.hideLoading();
        }
    }

    async loadVehiclePage() {
        console.log('Загрузка страницы техники');
        this.showLoading();

        try {
            // Динамически импортируем модуль страницы техники
            const VehiclePage = await import('./pages/vehicle.js');
            
            // Загружаем содержимое страницы
            await this.renderPage(VehiclePage.default);
            
            this.currentPage = 'vehicle';
            this.updateNavigation();
            
        } catch (error) {
            console.error('Ошибка загрузки страницы техники:', error);
            await this.loadErrorPage();
        } finally {
            this.hideLoading();
        }
    }

    async renderPage(pageConfig) {
        const contentElement = document.getElementById('content');
        
        if (pageConfig && pageConfig.render) {
            contentElement.innerHTML = await pageConfig.render();
            
            // Инициализируем страницу если есть метод init
            if (pageConfig.init) {
                await pageConfig.init();
            }
            
            // Сохраняем ссылку на страницу
            if (this.currentPage !== 'home') {
                this.pages[this.currentPage] = pageConfig;
            }
            
            // Показываем контент с анимацией
            setTimeout(() => {
                contentElement.classList.add('loaded');
            }, 50);
        }
    }

    async loadErrorPage() {
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = `
            <div class="error-page" style="text-align: center; padding: 4rem;">
                <div style="font-size: 8rem; color: var(--accent-red); margin-bottom: 2rem;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">404 - Страница не найдена</h1>
                <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                    Запрошенная страница не существует или находится в разработке.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="window.location.hash = '/'" class="btn btn-primary btn-large">
                        <i class="fas fa-home"></i> Вернуться на главную
                    </button>
                    <button onclick="window.location.hash = '/ground'" class="btn btn-secondary btn-large">
                        <i class="fas fa-tank"></i> Смотреть технику
                    </button>
                </div>
            </div>
        `;
        contentElement.classList.add('loaded');
    }

    showLoading() {
        this.isLoading = true;
        const loadingElement = document.getElementById('loading');
        const contentElement = document.getElementById('content');
        
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }
        if (contentElement) {
            contentElement.classList.remove('loaded');
        }
    }

    hideLoading() {
        this.isLoading = false;
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }

    updateNavigation() {
        // Обновляем активное состояние в навигации
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    navigateToVehicle(vehicleId) {
        window.location.hash = `/vehicle/${vehicleId}`;
    }

    navigateToPage(page) {
        window.location.hash = `/${page}`;
    }

    // Вспомогательные методы
    formatNumber(num) {
        return new Intl.NumberFormat('ru-RU').format(num);
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Инициализация приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MilitaryWikiApp();
});

// Глобальные вспомогательные функции
window.navigateToVehicle = (vehicleId) => {
    if (window.app) {
        window.app.navigateToVehicle(vehicleId);
    } else {
        window.location.hash = `/vehicle/${vehicleId}`;
    }
};

window.navigateToPage = (page) => {
    if (window.app) {
        window.app.navigateToPage(page);
    } else {
        window.location.hash = `/${page}`;
    }
};

// Экспортируем для использования в других модулях
export default MilitaryWikiApp;
