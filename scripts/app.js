// Главный файл приложения - роутинг и инициализация
class MilitaryWikiApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.init();
    }

    init() {
        console.log('MilitaryWiki App инициализирован');
        this.setupRouter();
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

    setupEventListeners() {
        // Глобальные обработчики событий
        document.addEventListener('click', (e) => {
            // Обработка кликов по карточкам и другим интерактивным элементам
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
            <div class="error-page">
                <h1>404 - Страница не найдена</h1>
                <p>Запрошенная страница не существует.</p>
                <button onclick="window.location.hash = '/'" class="btn">
                    Вернуться на главную
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
