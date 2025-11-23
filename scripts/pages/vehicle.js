// Страница отдельной техники
const VehiclePage = {
    currentVehicle: null,
    
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
                            <span class="breadcrumb-current" id="breadcrumb-current">Загрузка...</span>
                        </div>
                    </div>
                </section>

                <!-- Основная информация -->
                <section class="vehicle-main-section">
                    <div class="container">
                        <div class="vehicle-main-grid">
                            <!-- Информация о технике -->
                            <div class="vehicle-info">
                                <div class="vehicle-header">
                                    <h1 class="vehicle-title" id="vehicle-title">Загрузка...</h1>
                                    <div class="vehicle-meta">
                                        <span class="meta-item" id="vehicle-year"></span>
                                        <span class="meta-item" id="vehicle-country"></span>
                                        <span class="meta-item" id="vehicle-category"></span>
                                    </div>
                                </div>

                                <div class="vehicle-description">
                                    <p id="vehicle-description">Загрузка описания...</p>
                                </div>

                                <!-- Быстрые характеристики -->
                                <div class="quick-stats">
                                    <div class="stat-item">
                                        <div class="stat-icon">
                                            <i class="fas fa-weight-hanging"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value" id="quick-weight">0 т</div>
                                            <div class="stat-label">Масса</div>
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-icon">
                                            <i class="fas fa-users"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value" id="quick-crew">0 чел</div>
                                            <div class="stat-label">Экипаж</div>
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-icon">
                                            <i class="fas fa-crosshairs"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value" id="quick-gun">0 мм</div>
                                            <div class="stat-label">Орудие</div>
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-icon">
                                            <i class="fas fa-tachometer-alt"></i>
                                        </div>
                                        <div class="stat-info">
                                            <div class="stat-value" id="quick-speed">0 км/ч</div>
                                            <div class="stat-label">Скорость</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Изображение -->
                            <div class="vehicle-image">
                                <div class="image-container" id="main-image">
                                    <div class="image-placeholder">
                                        <i class="fas fa-tank"></i>
                                        <span>Изображение техники</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Навигация по разделам -->
                <section class="content-navigation">
                    <div class="container">
                        <nav class="content-nav">
                            <a href="#specifications" class="nav-link active" data-section="specifications">
                                <i class="fas fa-list-alt"></i>
                                Характеристики
                            </a>
                            <a href="#history" class="nav-link" data-section="history">
                                <i class="fas fa-history"></i>
                                История
                            </a>
                            <a href="#modifications" class="nav-link" data-section="modifications">
                                <i class="fas fa-code-branch"></i>
                                Модификации
                            </a>
                            <a href="#gallery" class="nav-link" data-section="gallery">
                                <i class="fas fa-images"></i>
                                Галерея
                            </a>
                        </nav>
                    </div>
                </section>

                <!-- Контент -->
                <div class="vehicle-content">
                    <div class="container">
                        <!-- Характеристики -->
                        <section id="specifications" class="content-section active">
                            <div class="section-header">
                                <h2>Тактико-технические характеристики</h2>
                                <p>Полные технические specifications техники</p>
                            </div>
                            <div class="specifications-content" id="specifications-content">
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
                                <p>Подробная историческая справка</p>
                            </div>
                            <div class="history-content" id="history-content">
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
                            <div class="modifications-content" id="modifications-content">
                                <div class="loading-state">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка информации о модификациях...</p>
                                </div>
                            </div>
                        </section>

                        <!-- Галерея -->
                        <section id="gallery" class="content-section">
                            <div class="section-header">
                                <h2>Галерея изображений</h2>
                                <p>Фотографии, схемы и чертежи</p>
                            </div>
                            <div class="gallery-content" id="gallery-content">
                                <div class="loading-state">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка галереи...</p>
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
        
        const vehiclesData = {
            't-72b3': {
                id: 't-72b3',
                name: 'Т-72Б3',
                year: '2016',
                country: 'russia',
                category: 'mbt',
                description: 'Основной боевой танк Т-72Б3 представляет собой глубоко модернизированную версию танка Т-72. Разработан в рамках программы обновления парка бронетанковой техники Российской армии. Отличается улучшенной системой управления огнем, современной динамической защитой и модернизированной силовой установкой.',
                weight: 46,
                crew: 3,
                main_gun: 125,
                speed: 60,
                engine_power: 1130,
                details: {
                    specifications: {
                        "Основные параметры": {
                            "Боевая масса": "46 т",
                            "Экипаж": "3 человека",
                            "Длина с пушкой вперёд": "9.53 м",
                            "Длина корпуса": "6.86 м",
                            "Ширина": "3.46 м",
                            "Высота": "2.23 м",
                            "Клиренс": "0.49 м"
                        },
                        "Бронирование": {
                            "Тип брони": "Комбинированная противоснарядная",
                            "Лоб корпуса": "эквивалент 550-600 мм против БПС",
                            "Лоб корпуса (с ДЗ)": "эквивалент 800-1000 мм против БПС",
                            "Лоб башни": "эквивалент 800-1000 мм против БПС",
                            "Динамическая защита": "Контакт-5"
                        },
                        "Вооружение": {
                            "Основное орудие": "125-мм 2А46М-5 (гладкоствольная)",
                            "Боекомплект": "45 выстрелов",
                            "Спаренный пулемет": "7,62-мм ПКТ",
                            "Зенитный пулемет": "12,7-мм НСВТ"
                        },
                        "Подвижность": {
                            "Двигатель": "В-84-1, дизельный",
                            "Мощность двигателя": "1130 л.с.",
                            "Максимальная скорость": "60 км/ч",
                            "Запас хода по шоссе": "500 км",
                            "Преодолеваемый подъем": "30°",
                            "Преодолеваемая стенка": "0.85 м",
                            "Преодолеваемый ров": "2.8 м"
                        }
                    },
                    history: `
                        <div class="history-content">
                            <h3>История создания</h3>
                            <p>Т-72Б3 был разработан в рамках программы модернизации танкового парка Российской армии. Работы начались в 2010 году на Уралвагонзаводе.</p>
                            
                            <h3>Основные этапы</h3>
                            <ul>
                                <li><strong>2011:</strong> Создание первых прототипов</li>
                                <li><strong>2012:</strong> Начало государственных испытаний</li>
                                <li><strong>2013:</strong> Принятие на вооружение</li>
                                <li><strong>2014:</strong> Начало серийного производства</li>
                            </ul>
                            
                            <h3>Боевое применение</h3>
                            <p>Т-72Б3 активно используется в Вооруженных Силах РФ и показал высокую эффективность в современных конфликтах.</p>
                        </div>
                    `,
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
                        },
                        {
                            name: "Т-72Б3 обр. 2016 г.",
                            years: "2016-н.в.",
                            description: "Улучшенная версия с современной СУО",
                            features: [
                                "Современная система управления огнем",
                                "Улучшенная динамическая защита",
                                "Модернизированная трансмиссия"
                            ]
                        }
                    ],
                    gallery: [
                        { type: "photo", description: "Т-72Б3 на учениях", category: "photo" },
                        { type: "schema", description: "Схема бронирования", category: "schema" }
                    ]
                }
            },
            't-14-armata': {
                id: 't-14-armata',
                name: 'Т-14 Армата',
                year: '2015',
                country: 'russia',
                category: 'mbt',
                description: 'Российский основной боевой танк нового поколения с необитаемой башней, цифровой платформой и комплексом активной защиты «Афганит». Первый в мире серийный танк третьего поколения.',
                weight: 55,
                crew: 3,
                main_gun: 125,
                speed: 80,
                engine_power: 1500,
                details: {
                    specifications: {
                        "Основные параметры": {
                            "Боевая масса": "55 т",
                            "Экипаж": "3 человека",
                            "Длина": "10.8 м",
                            "Ширина": "3.5 м",
                            "Высота": "3.3 м"
                        },
                        "Бронирование": {
                            "Тип брони": "Многослойная комбинированная",
                            "Активная защита": "Афганит",
                            "Динамическая защита": "Малахит"
                        },
                        "Вооружение": {
                            "Основное орудие": "125-мм 2А82-1М",
                            "Боекомплект": "40 выстрелов",
                            "Дистанционно управляемый модуль": "12,7-мм пулемет"
                        }
                    },
                    history: "Т-14 'Армата' - принципиально новый танк, представленный публике в 2015 году.",
                    modifications: [],
                    gallery: []
                }
            }
        };

        this.currentVehicle = vehiclesData[vehicleId] || vehiclesData['t-72b3'];
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
        
        document.getElementById('vehicle-title').textContent = vehicle.name;
        document.getElementById('breadcrumb-current').textContent = vehicle.name;
        document.getElementById('vehicle-year').textContent = vehicle.year;
        document.getElementById('vehicle-country').textContent = this.getCountryName(vehicle.country);
        document.getElementById('vehicle-category').textContent = this.getCategoryName(vehicle.category);
        document.getElementById('vehicle-description').textContent = vehicle.description;

        document.getElementById('quick-weight').textContent = `${vehicle.weight} т`;
        document.getElementById('quick-crew').textContent = `${vehicle.crew} чел`;
        document.getElementById('quick-gun').textContent = `${vehicle.main_gun} мм`;
        document.getElementById('quick-speed').textContent = `${vehicle.speed} км/ч`;
    },

    getCountryName(countryCode) {
        const countries = {
            'russia': 'Россия / СССР',
            'usa': 'США',
            'germany': 'Германия',
            'uk': 'Великобритания',
            'france': 'Франция',
            'china': 'Китай',
            'japan': 'Япония',
            'israel': 'Израиль'
        };
        return countries[countryCode] || countryCode;
    },

    getCategoryName(categoryCode) {
        const categories = {
            'mbt': 'Основной боевой танк',
            'light_tank': 'Легкий танк',
            'medium_tank': 'Средний танк',
            'heavy_tank': 'Тяжелый танк',
            'ifv': 'Боевая машина пехоты',
            'apc': 'Бронетранспортер'
        };
        return categories[categoryCode] || categoryCode;
    },

    setupEventListeners() {
        document.querySelectorAll('.content-nav .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                this.switchSection(sectionId);
            });
        });
    },

    switchSection(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    },

    async loadAllContent() {
        await this.loadSpecifications();
        await this.loadHistory();
        await this.loadModifications();
        await this.loadGallery();
    },

    async loadSpecifications() {
        const container = document.getElementById('specifications-content');
        const specs = this.currentVehicle.details.specifications;

        if (specs) {
            container.innerHTML = Object.keys(specs).map(category => `
                <div class="specs-category">
                    <div class="specs-category-header">
                        <h3 class="specs-category-title">${category}</h3>
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
        }
    },

    async loadHistory() {
        const container = document.getElementById('history-content');
        const history = this.currentVehicle.details.history;

        if (history) {
            container.innerHTML = history;
        }
    },

    async loadModifications() {
        const container = document.getElementById('modifications-content');
        const modifications = this.currentVehicle.details.modifications;

        if (modifications && modifications.length > 0) {
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
        } else {
            container.innerHTML = '<p>Информация о модификациях отсутствует.</p>';
        }
    },

    async loadGallery() {
        const container = document.getElementById('gallery-content');
        const gallery = this.currentVehicle.details.gallery;

        if (gallery && gallery.length > 0) {
            container.innerHTML = `
                <div class="gallery-grid">
                    ${gallery.map((item, index) => `
                        <div class="gallery-item">
                            <div class="gallery-image">
                                <div class="image-placeholder">
                                    <i class="fas fa-${item.type === 'schema' ? 'draw-polygon' : 'image'}"></i>
                                </div>
                            </div>
                            <div class="gallery-caption">${item.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            container.innerHTML = '<p>Галерея временно недоступна.</p>';
        }
    },

    addVehicleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .vehicle-page {
                min-height: 100vh;
            }

            .page-header {
                padding: 2rem 0 1rem;
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
            }

            .vehicle-main-section {
                padding: 3rem 0;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
            }

            .vehicle-main-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: start;
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
                margin-bottom: 2rem;
            }

            .quick-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
            }

            .stat-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.5rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                transition: var(--transition);
            }

            .stat-item:hover {
                border-color: var(--accent-red);
                transform: translateY(-2px);
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

            .vehicle-image {
                position: relative;
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
            }

            .content-navigation {
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 70px;
                z-index: 800;
            }

            .content-nav {
                display: flex;
                gap: 0;
            }

            .content-nav .nav-link {
                padding: 1rem 2rem;
                color: var(--text-secondary);
                text-decoration: none;
                border-bottom: 3px solid transparent;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .content-nav .nav-link:hover,
            .content-nav .nav-link.active {
                color: var(--text-primary);
                border-bottom-color: var(--accent-red);
                background: rgba(220, 38, 38, 0.05);
            }

            .vehicle-content {
                padding: 3rem 0;
            }

            .content-section {
                display: none;
            }

            .content-section.active {
                display: block;
                animation: fadeIn 0.5s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
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
                margin-bottom: 1rem;
            }

            .specs-category-title {
                font-size: 1.5rem;
                color: var(--text-primary);
                border-bottom: 2px solid var(--accent-red);
                padding-bottom: 0.5rem;
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

            .spec-row:nth-child(even) {
                background: rgba(255, 255, 255, 0.02);
            }

            .spec-name {
                color: var(--text-secondary);
                font-weight: 500;
            }

            .spec-value {
                color: var(--text-primary);
                font-weight: 600;
            }

            .modifications-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }

            .modification-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                padding: 2rem;
                transition: var(--transition);
            }

            .modification-card:hover {
                border-color: var(--accent-red);
                transform: translateY(-5px);
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
                font-weight: 500;
            }

            .mod-description {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.5;
            }

            .mod-features h4 {
                color: var(--text-primary);
                margin-bottom: 0.75rem;
            }

            .features-list {
                list-style: none;
                padding: 0;
            }

            .features-list li {
                padding: 0.5rem 0;
                color: var(--text-secondary);
                border-bottom: 1px solid var(--border-light);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .features-list li:before {
                content: '•';
                color: var(--accent-red);
                font-weight: bold;
            }

            .features-list li:last-child {
                border-bottom: none;
            }

            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
            }

            .gallery-item {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                overflow: hidden;
                transition: var(--transition);
            }

            .gallery-item:hover {
                transform: translateY(-5px);
                border-color: var(--accent-red);
            }

            .gallery-image {
                height: 200px;
                background: var(--bg-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .gallery-caption {
                padding: 1rem;
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
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
                .vehicle-main-grid {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                .vehicle-title {
                    font-size: 2.5rem;
                }

                .quick-stats {
                    grid-template-columns: 1fr;
                }

                .content-nav {
                    flex-wrap: wrap;
                }

                .content-nav .nav-link {
                    flex: 1;
                    min-width: 150px;
                    justify-content: center;
                }
            }

            @media (max-width: 768px) {
                .vehicle-title {
                    font-size: 2rem;
                }

                .section-header h2 {
                    font-size: 2rem;
                }

                .modifications-grid {
                    grid-template-columns: 1fr;
                }

                .gallery-grid {
                    grid-template-columns: 1fr;
                }

                .spec-row {
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }

            @media (max-width: 480px) {
                .vehicle-meta {
                    flex-direction: column;
                }

                .content-nav .nav-link {
                    min-width: 120px;
                    padding: 1rem;
                    font-size: 0.9rem;
                }

                .mod-header {
                    flex-direction: column;
                    gap: 0.5rem;
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
