// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initCounters();
    initSmoothScroll();
    initInteractiveElements();
});

// Навигация
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Анимации при скролле
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Наблюдаем за карточками
    document.querySelectorAll('.category-card, .feature-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Анимация счетчиков
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Интерактивные элементы
function initInteractiveElements() {
    // Информационные кнопки
    document.querySelectorAll('.category-info').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.category-card');
            const description = card.querySelector('.category-description');
            
            // Анимация раскрытия дополнительной информации
            description.style.maxHeight = description.style.maxHeight ? null : description.scrollHeight + 'px';
            description.style.overflow = 'hidden';
            description.style.transition = 'max-height 0.3s ease';
        });
    });

    // Поиск
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--accent-primary)';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.borderColor = 'var(--border-primary)';
            this.parentElement.style.boxShadow = 'none';
        });
    }
}

// Утилиты для работы с данными
const DataManager = {
    // Сохранение в localStorage
    set: (key, value) => {
        try {
            localStorage.setItem(`armorarchive_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    },

    // Получение из localStorage
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(`armorarchive_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },

    // Удаление из localStorage
    remove: (key) => {
        try {
            localStorage.removeItem(`armorarchive_${key}`);
        } catch (e) {
            console.error('Storage error:', e);
        }
    }
};

// Система фильтров (базовая структура)
const FilterSystem = {
    filters: {},

    init: function(category) {
        this.filters = DataManager.get(`filters_${category}`, {});
        this.renderFilters();
    },

    save: function(category) {
        DataManager.set(`filters_${category}`, this.filters);
    },

    addFilter: function(key, value) {
        if (!this.filters[key]) {
            this.filters[key] = [];
        }
        this.filters[key].push(value);
    },

    removeFilter: function(key, value) {
        if (this.filters[key]) {
            this.filters[key] = this.filters[key].filter(v => v !== value);
            if (this.filters[key].length === 0) {
                delete this.filters[key];
            }
        }
    },

    clearFilters: function() {
        this.filters = {};
    },

    renderFilters: function() {
        // Будет реализовано в следующих шагах
        console.log('Current filters:', this.filters);
    }
};

// Глобальные функции
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

// Экспорт для использования в других модулях
window.ArmorArchive = {
    DataManager,
    FilterSystem,
    initNavigation,
    initCounters
};

// Обработчики ошибок
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Регистрация Service Worker для кэширования (опционально)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
