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
        // Здесь будет проверка пароля
        // Пока что просто редирект
        if (password === 'admin123') { // Временный пароль
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
            if (e.target.closest('[data-vehicle-id]')) {
                const vehicleId = e.target.closest('[data-vehicle-id]').dataset.vehicleId;
                this.navigateToVehicle(vehicleId);
            }
        });

        // Обработка навигации по страницам
        this.setupPageNavigation();
    }

    setupPageNavigation() {
        // Сохраняем ссылки на страницы для глобального доступа
        this.pages = {
            // Страницы будут добавляться динамически
        };
    }

    async loadPage() {
        const hash = window.location.hash.slice(1) || '/';
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

    // Утилиты для работы с датами
    formatYear(year) {
        if (!year) return 'н/д';
        return year.toString();
    }

    // Утилиты для работы с изображениями
    getImageUrl(imagePath) {
        if (!imagePath) return null;
        // Здесь будет логика для работы с Supabase Storage
        return imagePath;
    }

    // Утилиты для фильтрации и сортировки
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Работа с локальным хранилищем
    setStorage(key, value) {
        try {
            localStorage.setItem(`militarywiki_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage недоступен:', e);
        }
    }

    getStorage(key) {
        try {
            const item = localStorage.getItem(`militarywiki_${key}`);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('LocalStorage недоступен:', e);
            return null;
        }
    }

    removeStorage(key) {
        try {
            localStorage.removeItem(`militarywiki_${key}`);
        } catch (e) {
            console.warn('LocalStorage недоступен:', e);
        }
    }

    // Показать уведомление
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Добавляем стили для уведомлений
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-left: 4px solid var(--accent-red);
                    border-radius: var(--radius);
                    padding: 1rem 1.5rem;
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideInRight 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }

                .notification-success {
                    border-left-color: #10b981;
                }

                .notification-error {
                    border-left-color: #ef4444;
                }

                .notification-info {
                    border-left-color: var(--accent-blue);
                }

                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex: 1;
                }

                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: var(--radius);
                    transition: var(--transition);
                }

                .notification-close:hover {
                    background: var(--bg-primary);
                    color: var(--text-primary);
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @media (max-width: 768px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Закрытие по кнопке
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Автоматическое закрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Проверка авторизации администратора
    checkAdminAuth() {
        return this.isAdmin || localStorage.getItem('admin') === 'true';
    }

    // Выход из админки
    logoutAdmin() {
        this.isAdmin = false;
        localStorage.removeItem('admin');
        this.showNotification('Вы вышли из админ-панели', 'info');
        if (this.currentPage === 'admin') {
            this.navigateToPage('home');
        }
    }
}

// Инициализация приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MilitaryWikiApp();
});

// Глобальные вспомогательные функции
window.formatNumber = (num) => {
    return window.app ? window.app.formatNumber(num) : new Intl.NumberFormat('ru-RU').format(num);
};

window.escapeHtml = (unsafe) => {
    return window.app ? window.app.escapeHtml(unsafe) : unsafe;
};

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.app) {
        window.app.showNotification('Произошла ошибка. Пожалуйста, обновите страницу.', 'error');
    }
});

// Обработка обещаний без catch
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Экспортируем для использования в других модулях
export default MilitaryWikiApp;
