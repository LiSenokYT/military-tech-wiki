// Главный файл приложения - роутинг и инициализация
class MilitaryWikiApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.isAdmin = false;
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

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }

    async handleAdminLogin(password) {
        // Здесь будет проверка пароля
        // Пока что просто редирект
        if (password === 'admin123') { // Временный пароль
            this.isAdmin = true;
            window.location.hash = '/admin';
            document.getElementById('admin-modal').style.display = 'none';
        } else {
            alert('Неверный пароль!');
        }
    }

    setupEventListeners() {
        // Глобальные обработчики событий
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-vehicle-id]')) {
                const vehicleId = e.target.closest('[data-vehicle-id]').dataset.vehicleId;
                this.navigateToVehicle(vehicleId);
            }
        });
    }

    async loadPage() {
        const hash = window.location.hash.slice(1) || '/';
        const path = hash.split('/')[1] || 'home';
        
        console.log('Загрузка страницы:', path);

        this.showLoading();

        try {
            // Динамически импортируем модуль страницы
            const pageModule = await import(`./pages/${path}.js`);
            
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

    async renderPage(pageConfig) {
        const contentElement = document.getElementById('content');
        
        if (pageConfig && pageConfig.render) {
            contentElement.innerHTML = await pageConfig.render();
            
            // Инициализируем страницу если есть метод init
            if (pageConfig.init) {
                await pageConfig.init();
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
                <button onclick="window.location.hash = '/'" class="btn btn-primary btn-large">
                    <i class="fas fa-home"></i> Вернуться на главную
                </button>
            </div>
        `;
        contentElement.classList.add('loaded');
    }

    showLoading() {
        this.isLoading = true;
        document.getElementById('loading').style.display = 'flex';
        document.getElementById('content').classList.remove('loaded');
    }

    hideLoading() {
        this.isLoading = false;
        document.getElementById('loading').style.display = 'none';
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

    // Вспомогательные методы
    formatNumber(num) {
        return new Intl.NumberFormat('ru-RU').format(num);
    }

    escapeHtml(unsafe) {
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

// Экспортируем для использования в других модулях
export default MilitaryWikiApp;
