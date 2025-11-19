// Main JavaScript for MilitaryTech Wiki

class MilitaryWiki {
    constructor() {
        this.init();
    }

    init() {
        this.initializeScrollEffects();
        this.initializeSearch();
        this.initializeNavigation();
        this.initializeAnimations();
        this.initializeCategoryCards();
        this.initializeModalHandlers();
        this.initializeImageLoading();
    }

    // Scroll effects and animations
    initializeScrollEffects() {
        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(42, 42, 42, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(42, 42, 42, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Fade in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add additional animation for stats
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observe stats for counter animation
        document.querySelectorAll('.stat-number').forEach(el => {
            observer.observe(el);
        });
    }

    // Search functionality
    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');

        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                this.showSearchResults(query);
            } else {
                this.showSearchModal();
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Search input animations
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.borderColor = 'var(--accent-color)';
            searchInput.parentElement.style.boxShadow = '0 0 0 2px rgba(184, 134, 11, 0.1)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.borderColor = 'var(--border-color)';
            searchInput.parentElement.style.boxShadow = 'none';
        });
    }

    showSearchResults(query) {
        this.showModal(
            'Результаты поиска',
            `Поиск: "${query}"\n\nФункция поиска будет полностью реализована после подключения базы данных Supabase.`,
            [
                '🔍 Расширенный поиск по характеристикам',
                '📊 Фильтрация по странам и годам',
                '🔄 Реальное время обновления',
                '📱 Адаптивный интерфейс'
            ]
        );
    }

    showSearchModal() {
        this.showModal(
            'Поиск по базе данных',
            'Введите название техники, модель или характеристики для поиска в нашей базе данных.',
            [
                'Примеры запросов: "Т-90", "F-35", "Абрамс"',
                'Поиск по странам: "Россия", "США", "Китай"',
                'Поиск по типам: "танк", "истребитель", "фрегат"',
                'Поиск по характеристикам: "125мм пушка", "скорость 80км/ч"'
            ]
        );
    }

    // Navigation handling
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get target section
                const targetId = link.getAttribute('href').substring(1);
                
                if (targetId === 'main') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Add click handlers for footer links
        document.querySelectorAll('.footer-section a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showComingSoonModal(link.textContent);
            });
        });
    }

    // Category cards functionality
    initializeCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                this.navigateToCategory(category);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    navigateToCategory(category) {
        const categoryData = {
            'ground': {
                name: 'Наземная техника',
                description: 'Танки, бронетехника, артиллерия, системы ПВО и другая наземная военная техника',
                features: [
                    'Расширенные фильтры по типу, стране, году',
                    'Сравнение технических характеристик',
                    'Исторические модификации',
                    'Фотогалерея и чертежи'
                ],
                stats: '1,247 единиц техники'
            },
            'air': {
                name: 'Воздушная техника',
                description: 'Истребители, бомбардировщики, вертолеты, БПЛА и авиационные системы',
                features: [
                    'Фильтры по поколениям и назначению',
                    'Летно-технические характеристики',
                    'Вооружение и системы',
                    'История разработки'
                ],
                stats: '856 единиц техники'
            },
            'naval': {
                name: 'Морская техника',
                description: 'Корабли, подлодки, катера и морские военные системы',
                features: [
                    'Классификация по водоизмещению',
                    'Тактико-технические элементы',
                    'Вооружение и системы',
                    'История службы'
                ],
                stats: '423 единицы техники'
            },
            'ammo': {
                name: 'Боеприпасы',
                description: 'Снаряды, ракеты, бомбы, патроны и вспомогательное вооружение',
                features: [
                    'Классификация по калибрам и типам',
                    'Технические характеристики',
                    'История разработки',
                    'Применение и эффективность'
                ],
                stats: '687 видов вооружения'
            }
        };

        const data = categoryData[category];
        this.showCategoryModal(data);
    }

    // Modal handlers
    initializeModalHandlers() {
        // Handle addition card clicks
        document.querySelectorAll('.addition-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                this.showEquipmentModal(title, description);
            });
        });

        // Handle tech card clicks
        document.querySelectorAll('.tech-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                this.showTechDetailModal(title, description);
            });
        });
    }

    // Image loading and optimization
    initializeImageLoading() {
        // Lazy loading for future images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Initialize animations
    initializeAnimations() {
        // Add fade-in class to elements that should animate
        const elementsToAnimate = document.querySelectorAll('.category-card, .addition-card, .stat-item, .tech-card, .feature');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
        });

        // Particle effect for hero section
        this.createParticleEffect();

        // Initialize counter animations
        this.initializeCounters();
    }

    createParticleEffect() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Create additional particle elements
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(184, 134, 11, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }

        // Add floating animation
        if (!document.querySelector('#particle-animations')) {
            const style = document.createElement('style');
            style.id = 'particle-animations';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeCounters() {
        // Initialize statistics counters
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            counter.setAttribute('data-target', counter.textContent.replace(/[^0-9]/g, ''));
            counter.textContent = '0';
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = this.formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(current));
            }
        }, 16);
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Modal system
    showModal(title, description, features = []) {
        this.createModal({ title, description, features });
    }

    showCategoryModal(data) {
        this.createModal({
            title: `Раздел: ${data.name}`,
            description: data.description,
            features: data.features,
            stats: data.stats,
            type: 'category'
        });
    }

    showEquipmentModal(title, description) {
        this.createModal({
            title: `Техника: ${title}`,
            description: description,
            features: [
                'Полные технические характеристики',
                'История разработки и модификации',
                'Фотогалерея и схемы',
                'Тактико-технические данные',
                'Боевое применение'
            ],
            type: 'equipment'
        });
    }

    showTechDetailModal(title, description) {
        this.createModal({
            title: `Технология: ${title}`,
            description: description,
            features: [
                'Техническая документация',
                'Примеры использования',
                'Интеграционные возможности',
                'Производительность и метрики'
            ],
            type: 'technology'
        });
    }

    showComingSoonModal(featureName) {
        this.createModal({
            title: 'Скоро будет доступно',
            description: `Функция "${featureName}" находится в разработке и будет доступна в ближайших обновлениях.`,
            features: [
                'Мы постоянно работаем над улучшением проекта',
                'Следите за обновлениями в нашем блоге',
                'Присоединяйтесь к сообществу разработчиков'
            ],
            type: 'coming-soon'
        });
    }

    createModal(config) {
        // Remove existing modal
        const existingModal = document.querySelector('.custom-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }

        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        
        let featuresHTML = '';
        if (config.features && config.features.length > 0) {
            featuresHTML = `
                <div class="modal-features">
                    <h4>Возможности раздела:</h4>
                    <ul>
                        ${config.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        let statsHTML = '';
        if (config.stats) {
            statsHTML = `<div class="modal-stats">${config.stats}</div>`;
        }

        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content ${config.type || ''}">
                <div class="modal-header">
                    <h3>${config.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${config.description}</p>
                    ${statsHTML}
                    ${featuresHTML}
                </div>
                <div class="modal-footer">
                    <button class="modal-btn primary">Понятно</button>
                    <button class="modal-btn secondary">Узнать больше</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = this.getModalStyles();
            document.head.appendChild(style);
        }

        // Add event listeners
        this.attachModalEvents(modal);
    }

    getModalStyles() {
        return `
            .custom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                font-family: 'Roboto', sans-serif;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: var(--secondary-color);
                border: 2px solid var(--accent-color);
                border-radius: 15px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: modalSlideIn 0.3s ease-out;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-header {
                background: var(--primary-color);
                padding: 1.5rem 2rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                color: var(--accent-color);
                margin: 0;
                font-family: 'Orbitron', sans-serif;
                font-size: 1.3rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: var(--accent-color);
                color: var(--primary-color);
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-body p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .modal-stats {
                background: var(--primary-color);
                padding: 1rem;
                border-radius: 10px;
                text-align: center;
                color: var(--accent-color);
                font-family: 'Orbitron', sans-serif;
                font-weight: 700;
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color);
            }
            
            .modal-features {
                margin-top: 1.5rem;
            }
            
            .modal-features h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }
            
            .modal-features ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-features li {
                color: var(--text-secondary);
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--border-color);
                position: relative;
                padding-left: 1.5rem;
            }
            
            .modal-features li::before {
                content: '✓';
                color: var(--accent-color);
                position: absolute;
                left: 0;
                font-weight: bold;
            }
            
            .modal-features li:last-child {
                border-bottom: none;
            }
            
            .modal-footer {
                padding: 1.5rem 2rem;
                border-top: 1px solid var(--border-color);
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                background: var(--primary-color);
            }
            
            .modal-btn {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 700;
                transition: all 0.3s ease;
                font-family: 'Roboto', sans-serif;
            }
            
            .modal-btn.primary {
                background: var(--accent-color);
                color: var(--primary-color);
            }
            
            .modal-btn.primary:hover {
                background: var(--accent-hover);
                transform: translateY(-2px);
            }
            
            .modal-btn.secondary {
                background: transparent;
                color: var(--text-secondary);
                border: 1px solid var(--border-color);
            }
            
            .modal-btn.secondary:hover {
                background: var(--border-color);
                color: var(--text-primary);
            }
            
            /* Category specific styles */
            .modal-content.category {
                border-color: #b8860b;
            }
            
            .modal-content.equipment {
                border-color: #2ecc71;
            }
            
            .modal-content.technology {
                border-color: #3498db;
            }
            
            .modal-content.coming-soon {
                border-color: #e74c3c;
            }
        `;
    }

    attachModalEvents(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const primaryBtn = modal.querySelector('.modal-btn.primary');
        const secondaryBtn = modal.querySelector('.modal-btn.secondary');
        const backdrop = modal.querySelector('.modal-backdrop');

        const closeModal = () => {
            modal.style.animation = 'modalSlideOut 0.3s ease-in';
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        primaryBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', () => {
                this.showComingSoonModal('Дополнительная информация');
            });
        }

        // Add slide out animation
        if (!document.querySelector('#modal-out-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-out-styles';
            style.textContent = `
                @keyframes modalSlideOut {
                    from {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Prevent modal content click from closing modal
        modal.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Utility function for API calls (for future Supabase integration)
    async fetchData(endpoint, options = {}) {
        const baseURL = 'https://your-supabase-url.supabase.co';
        const apiKey = 'your-supabase-anon-key';
        
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        try {
            const response = await fetch(`${baseURL}${endpoint}`, {
                ...defaultOptions,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Method to load equipment data (for future use)
    async loadEquipment(category, filters = {}) {
        // TODO: Implement with Supabase
        const endpoint = `/rest/v1/${category}?select=*`;
        return await this.fetchData(endpoint);
    }

    // Utility methods
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.militaryWiki = new MilitaryWiki();
    
    // Add loading animation removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Add some global styles for loading state
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    body {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
`;
document.head.appendChild(globalStyles);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MilitaryWiki;
}
