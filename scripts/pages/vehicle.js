// Страница отдельной техники
const VehiclePage = {
    currentVehicle: null,
    currentImageIndex: 0,
    images: [],
    
    async render() {
        return `
            <div class="vehicle-page">
                <!-- Хлебные крошки -->
                <section class="page-header">
                    <div class="container">
                        <div class="breadcrumbs">
                            <a href="#/">Главная</a>
                            <span class="breadcrumb-separator">/</span>
                            <a href="#/ground">Наземная техника</a>
                            <span class="breadcrumb-separator">/</span>
                            <span class="breadcrumb-current">Загрузка...</span>
                        </div>
                    </div>
                </section>

                <!-- Основная информация -->
                <section class="vehicle-hero-section">
                    <div class="container">
                        <div class="vehicle-hero-grid">
                            <!-- Изображение -->
                            <div class="vehicle-hero-image">
                                <div class="image-gallery">
                                    <div class="image-container">
                                        <div class="image-placeholder">
                                            <i class="fas fa-tank"></i>
                                            <span>Изображение техники</span>
                                        </div>
                                        <div class="image-badges">
                                            <span class="badge era-badge">Modern</span>
                                            <span class="badge country-badge">Russia</span>
                                        </div>
                                    </div>
                                    <div class="gallery-controls">
                                        <button class="gallery-btn prev-btn">
                                            <i class="fas fa-chevron-left"></i>
                                        </button>
                                        <div class="gallery-counter">
                                            <span class="current-image">1</span> / <span class="total-images">3</span>
                                        </div>
                                        <button class="gallery-btn next-btn">
                                            <i class="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <div class="image-caption">
                                        Основной вид техники
                                    </div>
                                </div>
                            </div>

                            <!-- Информация о технике -->
                            <div class="vehicle-hero-info">
                                <div class="vehicle-header">
                                    <h1 class="vehicle-title">Загрузка...</h1>
                                    <div class="vehicle-meta">
                                        <span class="meta-item vehicle-year">2023</span>
                                        <span class="meta-item vehicle-country">Россия</span>
                                        <span class="meta-item vehicle-category">ОБТ</span>
                                    </div>
                                </div>

                                <div class="vehicle-description">
                                    <p>Загрузка описания...</p>
                                </div>

                                <!-- Быстрые характеристики -->
                                <div class="quick-stats-grid">
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-weight-hanging"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value">0 т</div>
                                            <div class="stat-label">Боевая масса</div>
                                        </div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-users"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value">0 чел</div>
                                            <div class="stat-label">Экипаж</div>
                                        </div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-crosshairs"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value">0 мм</div>
                                            <div class="stat-label">Калибр орудия</div>
                                        </div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-tachometer-alt"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value">0 км/ч</div>
                                            <div class="stat-label">Макс. скорость</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Навигация по разделам -->
                                <nav class="content-quick-nav">
                                    <a href="#specifications" class="nav-btn active" data-section="specifications">
                                        <i class="fas fa-list-alt"></i>
                                        Характеристики
                                    </a>
                                    <a href="#history" class="nav-btn" data-section="history">
                                        <i class="fas fa-history"></i>
                                        История
                                    </a>
                                    <a href="#modifications" class="nav-btn" data-section="modifications">
                                        <i class="fas fa-code-branch"></i>
                                        Модификации
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Контент -->
                <div class="vehicle-content-sections">
                    <div class="container">
                        <!-- Характеристики -->
                        <section id="specifications" class="content-section active">
                            <div class="section-header">
                                <h2>Тактико-технические характеристики</h2>
                                <p>Полные технические specifications техники</p>
                            </div>
                            <div class="specifications-content">
                                <div class="loading-state">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка характеристик...</p>
                                </div>
                            </div>
                        </section>

                        <!-- История -->
                        <section id="history" class="content-section">
                            <div class="section-header">
                                <h2>История создания и службы</h2>
                                <p>Хронология разработки и эволюции техники</p>
                            </div>
                            <div class="history-content">
                                <div class="loading-state">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка истории...</p>
                                </div>
                            </div>
                        </section>

                        <!-- Модификации -->
                        <section id="modifications" class="content-section">
                            <div class="section-header">
                                <h2>Модификации и варианты</h2>
                                <p>Развитие и модернизации базовой модели</p>
                            </div>
                            <div class="modifications-content">
                                <div class="loading-state">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка информации о модификациях...</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `;
    },

    async init() {
        await this.loadVehicleData();
        this.setupEventListeners();
        this.loadAllContent();
        this.addVehicleStyles();
        
        this.switchSection('specifications');
        window.scrollTo(0, 0);
    },

    async loadVehicleData() {
        const vehicleId = this.getVehicleIdFromUrl();
        
        // Простые данные для тестирования
        this.currentVehicle = {
            id: 't-72b3',
            name: 'Т-72Б3',
            year: '2016',
            country: 'russia',
            category: 'mbt',
            era: 'modern',
            description: 'Основной боевой танк Т-72Б3 представляет собой глубоко модернизированную версию танка Т-72. Разработан в рамках программы обновления парка бронетанковой техники Российской армии.',
            weight: 46,
            crew: 3,
            main_gun: 125,
            speed: 60,
            engine_power: 1130,
            road_range: 500,
            images: [
                {
                    type: 'photo',
                    description: 'Т-72Б3 на параде Победы в Москве'
                },
                {
                    type: 'photo', 
                    description: 'Вид сбоку, демонстрирующий динамическую защиту'
                }
            ],
            details: {
                specifications: {
                    "Основные параметры": {
                        "Боевая масса": "46 т",
                        "Экипаж": "3 человека",
                        "Длина с пушкой вперёд": "9.53 м",
                        "Длина корпуса": "6.86 м",
                        "Ширина": "3.46 м",
                        "Высота": "2.23 м"
                    },
                    "Бронирование": {
                        "Тип брони": "Комбинированная противоснарядная",
                        "Лоб корпуса": "эквивалент 550-600 мм против БПС",
                        "Лоб корпуса (с ДЗ)": "эквивалент 800-1000 мм против БПС",
                        "Лоб башни": "эквивалент 800-1000 мм против БПС"
                    },
                    "Вооружение": {
                        "Основное орудие": "125-мм 2А46М-5 (гладкоствольная)",
                        "Боекомплект": "45 выстрелов",
                        "Спаренный пулемет": "7,62-мм ПКТ",
                        "Зенитный пулемет": "12,7-мм НСВТ"
                    }
                },
                history: {
                    timeline: [
                        { year: "2010", event: "Начало модернизации", description: "Старт программы глубокой модернизации до уровня Т-72Б3" },
                        { year: "2011", event: "Первые прототипы", description: "Создание и испытания первых образцов Т-72Б3" },
                        { year: "2013", event: "Принятие на вооружение", description: "Т-72Б3 официально принят на вооружение ВС РФ" }
                    ]
                },
                modifications: [
                    {
                        name: "Т-72Б3 обр. 2011 г.",
                        years: "2011-2014",
                        description: "Первая версия модернизации с системой управления огнем 1А40-4",
                        features: [
                            "СУО 1А40-4 с лазерным дальномером",
                            "Двигатель В-84-1 мощностью 1130 л.с.",
                            "Динамическая защита 'Контакт-5'"
                        ]
                    }
                ]
            }
        };

        this.images = this.currentVehicle.images || [];
        this.updateBasicInfo();
    },

    getVehicleIdFromUrl() {
        const hash = window.location.hash;
        const match = hash.match(/\/vehicle\/([^\/]+)/);
        return match ? match[1] : 't-72b3';
    },

    updateBasicInfo() {
        if (!this.currentVehicle) return;

        const vehicle = this.currentVehicle;
        
        // Обновляем хлебные крошки
        const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = vehicle.name;
        }
        
        // Обновляем основную информацию
        const title = document.querySelector('.vehicle-title');
        if (title) title.textContent = vehicle.name;
        
        const year = document.querySelector('.vehicle-year');
        if (year) year.textContent = vehicle.year;
        
        const country = document.querySelector('.vehicle-country');
        if (country) country.textContent = this.getCountryName(vehicle.country);
        
        const category = document.querySelector('.vehicle-category');
        if (category) category.textContent = this.getCategoryName(vehicle.category);
        
        const description = document.querySelector('.vehicle-description p');
        if (description) description.textContent = vehicle.description;

        // Обновляем быстрые характеристики
        const weight = document.querySelector('.quick-stats-grid .stat-card:nth-child(1) .stat-value');
        if (weight) weight.textContent = `${vehicle.weight} т`;
        
        const crew = document.querySelector('.quick-stats-grid .stat-card:nth-child(2) .stat-value');
        if (crew) crew.textContent = `${vehicle.crew} чел`;
        
        const gun = document.querySelector('.quick-stats-grid .stat-card:nth-child(3) .stat-value');
        if (gun) gun.textContent = `${vehicle.main_gun} мм`;
        
        const speed = document.querySelector('.quick-stats-grid .stat-card:nth-child(4) .stat-value');
        if (speed) speed.textContent = `${vehicle.speed} км/ч`;

        // Обновляем бейджи
        const eraBadge = document.querySelector('.era-badge');
        if (eraBadge) eraBadge.textContent = this.getEraName(vehicle.era);
        
        const countryBadge = document.querySelector('.country-badge');
        if (countryBadge) countryBadge.textContent = this.getCountryName(vehicle.country);
    },

    setupEventListeners() {
        // Навигация по разделам
        document.querySelectorAll('.content-quick-nav .nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = btn.dataset.section;
                this.switchSection(sectionId);
            });
        });

        // Кнопки галереи
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevImage();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextImage();
            });
        }
    },

    switchSection(sectionId) {
        // Обновляем активные кнопки
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Показываем активный раздел
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    },

    nextImage() {
        if (this.images.length === 0) return;
        
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateImageDisplay();
    },

    prevImage() {
        if (this.images.length === 0) return;
        
        this.currentImageIndex = this.currentImageIndex === 0 ? this.images.length - 1 : this.currentImageIndex - 1;
        this.updateImageDisplay();
    },

    updateImageDisplay() {
        const caption = document.querySelector('.image-caption');
        const currentImage = document.querySelector('.current-image');
        const totalImages = document.querySelector('.total-images');
        
        if (this.images.length > 0) {
            const image = this.images[this.currentImageIndex];
            
            if (caption) caption.textContent = image.description;
            if (currentImage) currentImage.textContent = this.currentImageIndex + 1;
            if (totalImages) totalImages.textContent = this.images.length;
            
            // Обновляем иконку в зависимости от типа изображения
            const placeholderIcon = document.querySelector('.image-placeholder i');
            if (placeholderIcon) {
                placeholderIcon.className = image.type === 'schema' ? 'fas fa-draw-polygon' : 'fas fa-image';
            }
        }
    },

    async loadAllContent() {
        await this.loadSpecifications();
        await this.loadHistory();
        await this.loadModifications();
    },

    async loadSpecifications() {
        const container = document.querySelector('.specifications-content');
        const specs = this.currentVehicle.details.specifications;

        if (specs && container) {
            container.innerHTML = Object.keys(specs).map(category => `
                <div class="specs-category">
                    <div class="specs-category-header">
                        <h3 class="specs-category-title">${category}</h3>
                        <button class="collapse-btn">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div class="specs-table">
                        ${Object.keys(specs[category]).map(key => `
                            <div class="spec-row">
                                <div class="spec-name">${key}</div>
                                <div class="spec-value">${specs[category][key]}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            // Добавляем обработчики для сворачивания
            document.querySelectorAll('.specs-category-header').forEach(header => {
                header.addEventListener('click', () => {
                    const table = header.nextElementSibling;
                    const icon = header.querySelector('i');
                    
                    if (table.style.display === 'none') {
                        table.style.display = 'block';
                        icon.className = 'fas fa-chevron-down';
                    } else {
                        table.style.display = 'none';
                        icon.className = 'fas fa-chevron-right';
                    }
                });
            });
        }
    },

    async loadHistory() {
        const container = document.querySelector('.history-content');
        const history = this.currentVehicle.details.history;

        if (history && container) {
            container.innerHTML = `
                <div class="timeline">
                    ${history.timeline.map((item, index) => `
                        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                            <div class="timeline-content">
                                <div class="timeline-year">${item.year}</div>
                                <h4 class="timeline-event">${item.event}</h4>
                                <p class="timeline-description">${item.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="text-center">
                    <button class="btn btn-primary">
                        <i class="fas fa-book-open"></i>
                        Читать полную историю
                    </button>
                </div>
            `;
        }
    },

    async loadModifications() {
        const container = document.querySelector('.modifications-content');
        const modifications = this.currentVehicle.details.modifications;

        if (modifications && modifications.length > 0 && container) {
            container.innerHTML = `
                <div class="modifications-grid">
                    ${modifications.map(mod => `
                        <div class="modification-card">
                            <div class="mod-header">
                                <h3 class="mod-name">${mod.name}</h3>
                                <span class="mod-years">${mod.years}</span>
                            </div>
                            <p class="mod-description">${mod.description}</p>
                            <div class="mod-features">
                                <h4>Основные особенности:</h4>
                                <ul class="features-list">
                                    ${mod.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    },

    // Вспомогательные методы
    getCountryName(countryCode) {
        const countries = {
            'russia': 'Россия',
            'usa': 'США',
            'germany': 'Германия',
            'uk': 'Великобритания'
        };
        return countries[countryCode] || countryCode;
    },

    getCategoryName(categoryCode) {
        const categories = {
            'mbt': 'Основной боевой танк',
            'light_tank': 'Легкий танк',
            'medium_tank': 'Средний танк'
        };
        return categories[categoryCode] || categoryCode;
    },

    getEraName(eraCode) {
        const eras = {
            'modern': 'Современность',
            'cold_war': 'Холодная война',
            'ww2': 'Вторая мировая'
        };
        return eras[eraCode] || eraCode;
    },

    addVehicleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .vehicle-page {
                min-height: 100vh;
            }

            .page-header {
                padding: 1.5rem 0;
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
            }

            .vehicle-hero-section {
                padding: 3rem 0;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
            }

            .vehicle-hero-grid {
                display: grid;
                grid-template-columns: 1fr 1.2fr;
                gap: 4rem;
                align-items: start;
            }

            .vehicle-hero-image {
                position: sticky;
                top: 100px;
            }

            .image-container {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                margin-bottom: 1rem;
            }

            .image-badges {
                position: absolute;
                top: 1rem;
                left: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .badge {
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .era-badge {
                background: var(--accent-blue);
                color: white;
            }

            .country-badge {
                background: var(--accent-red);
                color: white;
            }

            .gallery-controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin: 1rem 0;
            }

            .gallery-btn {
                background: var(--bg-card);
                border: 2px solid var(--border-color);
                color: var(--text-secondary);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: var(--transition);
            }

            .gallery-btn:hover {
                border-color: var(--accent-red);
                color: var(--accent-red);
            }

            .gallery-counter {
                color: var(--text-secondary);
                font-weight: 500;
                font-family: 'Orbitron', sans-serif;
            }

            .image-caption {
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .vehicle-hero-info {
                padding-top: 1rem;
            }

            .vehicle-header {
                margin-bottom: 2rem;
            }

            .vehicle-title {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .vehicle-meta {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .meta-item {
                background: var(--bg-card);
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
                color: var(--text-secondary);
                font-size: 0.9rem;
                border: 1px solid var(--border-color);
            }

            .vehicle-description {
                font-size: 1.2rem;
                line-height: 1.6;
                color: var(--text-secondary);
                margin-bottom: 2.5rem;
            }

            .quick-stats-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 2.5rem;
            }

            .stat-card {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.5rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                transition: var(--transition);
            }

            .stat-card:hover {
                border-color: var(--accent-red);
            }

            .stat-icon {
                font-size: 2rem;
                color: var(--accent-red);
            }

            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
                font-family: 'Orbitron', sans-serif;
            }

            .stat-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
            }

            .content-quick-nav {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.75rem;
            }

            .nav-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem 1.5rem;
                background: var(--bg-card);
                border: 2px solid var(--border-color);
                border-radius: var(--radius);
                color: var(--text-secondary);
                text-decoration: none;
                font-weight: 500;
                transition: var(--transition);
            }

            .nav-btn:hover,
            .nav-btn.active {
                border-color: var(--accent-red);
                color: var(--accent-red);
            }

            .vehicle-content-sections {
                padding: 4rem 0;
                background: var(--bg-secondary);
            }

            .content-section {
                display: none;
            }

            .content-section.active {
                display: block;
            }

            .section-header {
                text-align: center;
                margin-bottom: 3rem;
            }

            .section-header h2 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .section-header p {
                font-size: 1.2rem;
                color: var(--text-secondary);
            }

            .specs-category {
                margin-bottom: 2rem;
            }

            .specs-category-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                cursor: pointer;
                margin-bottom: 0.5rem;
            }

            .specs-category-title {
                font-size: 1.2rem;
                color: var(--text-primary);
                margin: 0;
            }

            .collapse-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
            }

            .specs-table {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                overflow: hidden;
            }

            .spec-row {
                display: flex;
                justify-content: space-between;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid var(--border-light);
            }

            .spec-row:last-child {
                border-bottom: none;
            }

            .spec-name {
                color: var(--text-secondary);
            }

            .spec-value {
                color: var(--text-primary);
                font-weight: 600;
            }

            .timeline {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
            }

            .timeline::before {
                content: '';
                position: absolute;
                left: 50%;
                top: 0;
                bottom: 0;
                width: 2px;
                background: var(--accent-red);
                transform: translateX(-50%);
            }

            .timeline-item {
                padding: 2rem 0;
                position: relative;
                width: 50%;
            }

            .timeline-item.left {
                left: 0;
                padding-right: 3rem;
            }

            .timeline-item.right {
                left: 50%;
                padding-left: 3rem;
            }

            .timeline-content {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                padding: 1.5rem;
            }

            .timeline-year {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--accent-red);
                margin-bottom: 0.5rem;
            }

            .timeline-event {
                font-size: 1.2rem;
                color: var(--text-primary);
                margin-bottom: 0.75rem;
            }

            .modifications-grid {
                display: grid;
                gap: 2rem;
                max-width: 800px;
                margin: 0 auto;
            }

            .modification-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                padding: 2rem;
            }

            .mod-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }

            .mod-name {
                font-size: 1.3rem;
                color: var(--text-primary);
                margin: 0;
            }

            .mod-years {
                background: var(--accent-red);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.8rem;
            }

            .mod-description {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
            }

            .features-list {
                list-style: none;
                padding: 0;
            }

            .features-list li {
                padding: 0.5rem 0;
                color: var(--text-secondary);
                border-bottom: 1px solid var(--border-light);
            }

            .features-list li:last-child {
                border-bottom: none;
            }

            .text-center {
                text-align: center;
                margin-top: 2rem;
            }

            .loading-state {
                text-align: center;
                padding: 3rem;
                color: var(--text-secondary);
            }

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid var(--border-color);
                border-left: 3px solid var(--accent-red);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @media (max-width: 968px) {
                .vehicle-hero-grid {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                .vehicle-hero-image {
                    position: static;
                }

                .quick-stats-grid {
                    grid-template-columns: 1fr;
                }

                .content-quick-nav {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

window.app = window.app || {};
window.app.pages = window.app.pages || {};
window.app.pages.vehicle = VehiclePage;

export default VehiclePage;
