// Страница отдельной техники
const VehiclePage = {
    currentVehicle: null,
    
    async render() {
        return `
            <div class="vehicle-page">
                <!-- Хлебные крошки -->
                <section class="breadcrumbs-section">
                    <div class="container">
                        <div class="breadcrumbs" id="breadcrumbs">
                            <a href="#/">Главная</a>
                            <span class="breadcrumb-separator">/</span>
                            <a href="#/ground">Наземная техника</a>
                            <span class="breadcrumb-separator">/</span>
                            <span class="breadcrumb-current">Загрузка...</span>
                        </div>
                    </div>
                </section>

                <!-- Основная информация -->
                <section class="vehicle-hero">
                    <div class="container">
                        <div class="vehicle-hero-content">
                            <div class="vehicle-main-info">
                                <h1 class="vehicle-title" id="vehicle-title">Загрузка...</h1>
                                <div class="vehicle-meta">
                                    <span class="vehicle-year" id="vehicle-year"></span>
                                    <span class="vehicle-country" id="vehicle-country"></span>
                                    <span class="vehicle-category" id="vehicle-category"></span>
                                </div>
                                <p class="vehicle-short-description" id="vehicle-short-description"></p>
                                
                                <div class="vehicle-quick-specs">
                                    <div class="quick-spec">
                                        <div class="quick-spec-icon">
                                            <i class="fas fa-weight-hanging"></i>
                                        </div>
                                        <div class="quick-spec-info">
                                            <span class="quick-spec-label">Масса</span>
                                            <span class="quick-spec-value" id="quick-weight"></span>
                                        </div>
                                    </div>
                                    <div class="quick-spec">
                                        <div class="quick-spec-icon">
                                            <i class="fas fa-users"></i>
                                        </div>
                                        <div class="quick-spec-info">
                                            <span class="quick-spec-label">Экипаж</span>
                                            <span class="quick-spec-value" id="quick-crew"></span>
                                        </div>
                                    </div>
                                    <div class="quick-spec">
                                        <div class="quick-spec-icon">
                                            <i class="fas fa-crosshairs"></i>
                                        </div>
                                        <div class="quick-spec-info">
                                            <span class="quick-spec-label">Орудие</span>
                                            <span class="quick-spec-value" id="quick-gun"></span>
                                        </div>
                                    </div>
                                    <div class="quick-spec">
                                        <div class="quick-spec-icon">
                                            <i class="fas fa-tachometer-alt"></i>
                                        </div>
                                        <div class="quick-spec-info">
                                            <span class="quick-spec-label">Скорость</span>
                                            <span class="quick-spec-value" id="quick-speed"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vehicle-gallery">
                                <div class="main-gallery-image" id="main-gallery-image">
                                    <div class="image-placeholder">
                                        <i class="fas fa-tank"></i>
                                        <span>Изображение загружается...</span>
                                    </div>
                                </div>
                                <div class="gallery-thumbnails" id="gallery-thumbnails">
                                    <!-- Миниатюры будут добавлены динамически -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Навигация по разделам -->
                <section class="vehicle-navigation">
                    <div class="container">
                        <nav class="vehicle-nav">
                            <a href="#history" class="vehicle-nav-link active" data-section="history">
                                <i class="fas fa-history"></i>
                                История
                            </a>
                            <a href="#specifications" class="vehicle-nav-link" data-section="specifications">
                                <i class="fas fa-list-alt"></i>
                                Характеристики
                            </a>
                            <a href="#modifications" class="vehicle-nav-link" data-section="modifications">
                                <i class="fas fa-code-branch"></i>
                                Модификации
                            </a>
                            <a href="#evolution" class="vehicle-nav-link" data-section="evolution">
                                <i class="fas fa-project-diagram"></i>
                                Эволюция
                            </a>
                            <a href="#gallery" class="vehicle-nav-link" data-section="gallery">
                                <i class="fas fa-images"></i>
                                Галерея
                            </a>
                        </nav>
                    </div>
                </section>

                <!-- Контент страницы -->
                <div class="vehicle-content-sections">
                    <div class="container">
                        <!-- История -->
                        <section id="history" class="content-section active">
                            <div class="section-header">
                                <h2>История создания</h2>
                                <p>История разработки и боевого применения</p>
                            </div>
                            <div class="history-content" id="history-content">
                                <div class="loading-content">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка исторической информации...</p>
                                </div>
                            </div>
                        </section>

                        <!-- Характеристики -->
                        <section id="specifications" class="content-section">
                            <div class="section-header">
                                <h2>Тактико-технические характеристики</h2>
                                <p>Полные технические specifications</p>
                            </div>
                            <div class="specifications-content" id="specifications-content">
                                <div class="loading-content">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка характеристик...</p>
                                </div>
                            </div>
                        </section>

                        <!-- Модификации -->
                        <section id="modifications" class="content-section">
                            <div class="section-header">
                                <h2>Модификации</h2>
                                <p>Варианты и модификации базовой модели</p>
                            </div>
                            <div class="modifications-content" id="modifications-content">
                                <div class="loading-content">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка информации о модификациях...</p>
                                </div>
                            </div>
                        </section>

                        <!-- Эволюция -->
                        <section id="evolution" class="content-section">
                            <div class="section-header">
                                <h2>Эволюция</h2>
                                <p>Развитие модели и преемственность</p>
                            </div>
                            <div class="evolution-content" id="evolution-content">
                                <div class="loading-content">
                                    <div class="loading-spinner"></div>
                                    <p>Загрузка информации об эволюции...</p>
                                </div>
                            </div>
                        </section>

                        <!-- Галерея -->
                        <section id="gallery" class="content-section">
                            <div class="section-header">
                                <h2>Галерея</h2>
                                <p>Фотографии и изображения</p>
                            </div>
                            <div class="gallery-content" id="gallery-content">
                                <div class="loading-content">
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
        this.addVehicleStyles();
        this.setupEventListeners();
        this.loadAllSections();
    },

    async loadVehicleData() {
        const vehicleId = this.getVehicleIdFromUrl();
        
        // Временные данные для демонстрации
        const vehiclesData = {
            't-72b3': {
                id: 't-72b3',
                name: 'Т-72Б3',
                year: '2016',
                country: 'russia',
                category: 'mbt',
                era: 'modern',
                short_description: 'Глубоко модернизированная версия танка Т-72 с улучшенной системой управления огнем, динамической защитой и двигателем.',
                weight: 46,
                crew: 3,
                main_gun: 125,
                engine_power: 1130,
                armor: 'composite',
                speed: 60,
                road_range: 500,
                trench_width: 2.8,
                ammunition: 45,
                details: {
                    history: [
                        { year: "1975", event: "Начало разработки танка Т-72" },
                        { year: "1985", event: "Появление модификации Т-72Б с динамической защитой" },
                        { year: "2010", event: "Начало программы глубокой модернизации до уровня Т-72Б3" },
                        { year: "2016", event: "Принятие на вооружение Т-72Б3 с СУО 'Сосна-У'" }
                    ],
                    specifications: {
                        "Общие характеристики": {
                            "Длина с пушкой вперёд": "9.53 м",
                            "Длина корпуса": "6.86 м",
                            "Ширина": "3.46 м",
                            "Высота": "2.23 м",
                            "Масса": "46 т",
                            "Экипаж": "3 человека"
                        },
                        "Бронирование": {
                            "Тип брони": "Комбинированная противоснарядная",
                            "Динамическая защита": "Контакт-5",
                            "Активная защита": "Опционально Арена-М"
                        },
                        "Вооружение": {
                            "Калибр и марка пушки": "125-мм 2А46М-5",
                            "Тип пушки": "Гладкоствольная",
                            "Боекомплект пушки": "45 выстрелов",
                            "Пулемёты": "1 × 12,7-мм НСВТ, 1 × 7,62-мм ПКТ"
                        },
                        "Подвижность": {
                            "Двигатель": "В-84-1, 1130 л.с.",
                            "Мощность двигателя": "23,7 л.с./т",
                            "Скорость по шоссе": "60 км/ч",
                            "Скорость по пересечённой местности": "35-45 км/ч",
                            "Запас хода по шоссе": "500 км",
                            "Удельное давление на грунт": "0.94 кг/см²"
                        }
                    },
                    modifications: [
                        { name: "Т-72Б3 обр. 2011 г.", description: "Первая версия с СУО 1А40-4", year: "2011" },
                        { name: "Т-72Б3 обр. 2014 г.", description: "Установлена СУО 'Сосна-У'", year: "2014" },
                        { name: "Т-72Б3 обр. 2016 г.", description: "Улучшенная динамическая защита", year: "2016" },
                        { name: "Т-72Б3М", description: "Экспортная версия с дополнительными улучшениями", year: "2018" }
                    ],
                    evolution: [
                        { name: "Т-72", relation: "predecessor", years: "1973-1992" },
                        { name: "Т-72А", relation: "predecessor", years: "1979-1985" },
                        { name: "Т-72Б", relation: "predecessor", years: "1985-2000" },
                        { name: "Т-72Б3", relation: "current", years: "2011-н.в." },
                        { name: "Т-90М", relation: "successor", years: "2017-н.в." }
                    ],
                    gallery: [
                        { type: "photo", url: null, description: "Т-72Б3 на учениях" },
                        { type: "photo", url: null, description: "Вид сбоку" },
                        { type: "photo", url: null, description: "Интерьер боевого отделения" },
                        { type: "schema", url: null, description: "Схема бронирования" }
                    ]
                }
            },
            't-14-armata': {
                id: 't-14-armata',
                name: 'Т-14 Армата',
                year: '2015',
                country: 'russia',
                category: 'mbt',
                era: 'modern',
                short_description: 'Российский основной боевой танк нового поколения с необитаемой башней и активной защитой.',
                weight: 55,
                crew: 3,
                main_gun: 125,
                engine_power: 1500,
                armor: 'composite',
                speed: 80,
                road_range: 500,
                trench_width: 3.2,
                ammunition: 40,
                details: {
                    history: [
                        { year: "2009", event: "Начало разработки платформы 'Армата'" },
                        { year: "2013", event: "Первый показ макета танка" },
                        { year: "2015", event: "Премьера на параде Победы" },
                        { year: "2018", event: "Начало государственных испытаний" }
                    ],
                    specifications: {
                        "Общие характеристики": {
                            "Длина с пушкой вперёд": "10.8 м",
                            "Длина корпуса": "8.7 м",
                            "Ширина": "3.5 м",
                            "Высота": "3.3 м",
                            "Масса": "55 т",
                            "Экипаж": "3 человека"
                        },
                        "Бронирование": {
                            "Тип брони": "Модульная многослойная",
                            "Динамическая защита": "Малахит",
                            "Активная защита": "Афганит"
                        },
                        "Вооружение": {
                            "Калибр и марка пушки": "125-мм 2А82-1М",
                            "Тип пушки": "Гладкоствольная",
                            "Боекомплект пушки": "40 выстрелов",
                            "Дистанционно управляемый модуль": "12,7-мм пулемёт"
                        },
                        "Подвижность": {
                            "Двигатель": "А-85-3А, 1500 л.с.",
                            "Мощность двигателя": "27,3 л.с./т",
                            "Скорость по шоссе": "80 км/ч",
                            "Скорость по пересечённой местности": "50 км/ч",
                            "Запас хода по шоссе": "500 км"
                        }
                    },
                    modifications: [
                        { name: "Т-14", description: "Базовая версия", year: "2015" },
                        { name: "Т-14 с УР 'Гермес'", description: "С ракетным вооружением", year: "2018" },
                        { name: "Т-14М", description: "Модернизированная версия", year: "2022" }
                    ],
                    evolution: [
                        { name: "Т-95", relation: "predecessor", years: "1988-2010" },
                        { name: "Т-14", relation: "current", years: "2015-н.в." }
                    ],
                    gallery: [
                        { type: "photo", url: null, description: "Т-14 на параде" },
                        { type: "photo", url: null, description: "Необитаемая башня" },
                        { type: "schema", url: null, description: "Компоновка" }
                    ]
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
        
        // Обновляем заголовок
        document.getElementById('vehicle-title').textContent = vehicle.name;
        document.getElementById('vehicle-year').textContent = vehicle.year;
        document.getElementById('vehicle-country').textContent = this.getCountryName(vehicle.country);
        document.getElementById('vehicle-category').textContent = this.getCategoryName(vehicle.category);
        document.getElementById('vehicle-short-description').textContent = vehicle.short_description;

        // Быстрые характеристики
        document.getElementById('quick-weight').textContent = `${vehicle.weight} т`;
        document.getElementById('quick-crew').textContent = `${vehicle.crew} чел.`;
        document.getElementById('quick-gun').textContent = `${vehicle.main_gun} мм`;
        document.getElementById('quick-speed').textContent = `${vehicle.speed} км/ч`;

        // Обновляем хлебные крошки
        document.querySelector('.breadcrumb-current').textContent = vehicle.name;
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
            'apc': 'Бронетранспортер',
            'spg': 'САУ',
            'spaa': 'ЗСУ'
        };
        return categories[categoryCode] || categoryCode;
    },

    setupEventListeners() {
        // Навигация по разделам
        document.querySelectorAll('.vehicle-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.dataset.section);
            });
        });

        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    this.switchSection(targetId);
                }
            });
        });
    },

    switchSection(sectionId) {
        // Обновляем активную навигацию
        document.querySelectorAll('.vehicle-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Показываем активный раздел
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Плавная прокрутка
        document.getElementById(sectionId).scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    },

    async loadAllSections() {
        await this.loadHistory();
        await this.loadSpecifications();
        await this.loadModifications();
        await this.loadEvolution();
        await this.loadGallery();
    },

    async loadHistory() {
        const container = document.getElementById('history-content');
        const history = this.currentVehicle.details.history;

        if (history && history.length > 0) {
            container.innerHTML = `
                <div class="history-timeline">
                    ${history.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-year">${item.year}</div>
                            <div class="timeline-content">
                                <div class="timeline-event">${item.event}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="history-description">
                    <h3>Историческая справка</h3>
                    <p>${this.currentVehicle.short_description}</p>
                    <p>Разработка ${this.currentVehicle.name} велась с учетом опыта предыдущих конфликтов и современных требований к бронетанковой технике.</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-history"></i>
                    <h3>Историческая информация отсутствует</h3>
                    <p>Информация об истории создания этой техники пока не добавлена в базу данных.</p>
                </div>
            `;
        }
    },

    async loadSpecifications() {
        const container = document.getElementById('specifications-content');
        const specs = this.currentVehicle.details.specifications;

        if (specs) {
            container.innerHTML = Object.keys(specs).map(category => `
                <div class="specs-category">
                    <h3 class="specs-category-title">${category}</h3>
                    <div class="specs-list">
                        ${Object.keys(specs[category]).map(key => `
                            <div class="spec-item">
                                <span class="spec-name">${key}</span>
                                <span class="spec-value">${specs[category][key]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-list-alt"></i>
                    <h3>Характеристики отсутствуют</h3>
                    <p>Тактико-технические характеристики этой техники пока не добавлены в базу данных.</p>
                </div>
            `;
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
                            <div class="modification-header">
                                <h4 class="modification-name">${mod.name}</h4>
                                <span class="modification-year">${mod.year}</span>
                            </div>
                            <p class="modification-description">${mod.description}</p>
                            <div class="modification-specs">
                                <div class="mod-spec">
                                    <span class="spec-label">Особенности</span>
                                    <span class="spec-value">${mod.description}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-code-branch"></i>
                    <h3>Модификации отсутствуют</h3>
                    <p>Информация о модификациях этой техники пока не добавлена в базу данных.</p>
                </div>
            `;
        }
    },

    async loadEvolution() {
        const container = document.getElementById('evolution-content');
        const evolution = this.currentVehicle.details.evolution;

        if (evolution && evolution.length > 0) {
            container.innerHTML = `
                <div class="evolution-timeline">
                    ${evolution.map(item => `
                        <div class="evolution-item ${item.relation}">
                            <div class="evolution-arrow"></div>
                            <div class="evolution-card">
                                <h4 class="evolution-name">${item.name}</h4>
                                <span class="evolution-years">${item.years}</span>
                                <span class="evolution-relation">${this.getRelationName(item.relation)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="evolution-description">
                    <h3>Эволюция развития</h3>
                    <p>${this.currentVehicle.name} представляет собой ${this.getEvolutionDescription()}</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-project-diagram"></i>
                    <h3>Информация об эволюции отсутствует</h3>
                    <p>Информация о развитии и преемственности этой техники пока не добавлена в базу данных.</p>
                </div>
            `;
        }
    },

    getRelationName(relation) {
        const relations = {
            'predecessor': 'Предшественник',
            'current': 'Текущая модель',
            'successor': 'Преемник'
        };
        return relations[relation] || relation;
    },

    getEvolutionDescription() {
        const vehicle = this.currentVehicle;
        if (vehicle.id === 't-72b3') {
            return 'глубоко модернизированную версию танка Т-72, которая сочетает в себе проверенную конструкцию с современными системами вооружения и защиты.';
        } else if (vehicle.id === 't-14-armata') {
            return 'принципиально новую разработку, не имеющую прямых аналогов в мире, с необитаемой башней и цифровой архитектурой.';
        }
        return 'важный этап в развитии бронетанковой техники.';
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
                                <div class="gallery-overlay">
                                    <button class="gallery-view-btn" data-index="${index}">
                                        <i class="fas fa-expand"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="gallery-caption">${item.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-images"></i>
                    <h3>Галерея отсутствует</h3>
                    <p>Изображения этой техники пока не добавлены в базу данных.</p>
                </div>
            `;
        }
    },

    addVehicleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Страница техники */
            .vehicle-page {
                min-height: 100vh;
            }

            /* Хлебные крошки */
            .breadcrumbs-section {
                padding: 1.5rem 0;
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
            }

            .breadcrumbs {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }

            .breadcrumbs a {
                color: var(--text-secondary);
                text-decoration: none;
                transition: var(--transition);
            }

            .breadcrumbs a:hover {
                color: var(--accent-red);
            }

            .breadcrumb-separator {
                color: var(--text-muted);
            }

            .breadcrumb-current {
                color: var(--text-primary);
                font-weight: 500;
            }

            /* Герой секция */
            .vehicle-hero {
                padding: 3rem 0;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
            }

            .vehicle-hero-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: start;
            }

            .vehicle-title {
                font-size: 3rem;
                font-weight: 900;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-red) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .vehicle-meta {
                display: flex;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }

            .vehicle-year,
            .vehicle-country,
            .vehicle-category {
                background: var(--bg-card);
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: 500;
                border: 1px solid var(--border-color);
            }

            .vehicle-short-description {
                font-size: 1.2rem;
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 2rem;
            }

            .vehicle-quick-specs {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }

            .quick-spec {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                transition: var(--transition);
            }

            .quick-spec:hover {
                border-color: var(--accent-red);
                transform: translateY(-2px);
            }

            .quick-spec-icon {
                width: 40px;
                height: 40px;
                background: var(--accent-red);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            }

            .quick-spec-label {
                font-size: 0.8rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .quick-spec-value {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-primary);
            }

            /* Галерея */
            .vehicle-gallery {
                position: sticky;
                top: 100px;
            }

            .main-gallery-image {
                height: 400px;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
                overflow: hidden;
            }

            .main-gallery-image .image-placeholder {
                text-align: center;
                color: var(--text-muted);
            }

            .main-gallery-image .image-placeholder i {
                font-size: 4rem;
                margin-bottom: 1rem;
                display: block;
            }

            .gallery-thumbnails {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 0.5rem;
            }

            /* Навигация по разделам */
            .vehicle-navigation {
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 70px;
                z-index: 800;
            }

            .vehicle-nav {
                display: flex;
                gap: 0;
                overflow-x: auto;
            }

            .vehicle-nav-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem 1.5rem;
                color: var(--text-secondary);
                text-decoration: none;
                white-space: nowrap;
                border-bottom: 3px solid transparent;
                transition: var(--transition);
            }

            .vehicle-nav-link:hover,
            .vehicle-nav-link.active {
                color: var(--accent-red);
                border-bottom-color: var(--accent-red);
                background: var(--bg-primary);
            }

            /* Секции контента */
            .content-section {
                display: none;
                padding: 3rem 0;
            }

            .content-section.active {
                display: block;
                animation: fadeIn 0.5s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
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

            /* История - Таймлайн */
            .history-timeline {
                position: relative;
                max-width: 800px;
                margin: 0 auto 3rem;
            }

            .history-timeline::before {
                content: '';
                position: absolute;
                left: 30px;
                top: 0;
                bottom: 0;
                width: 2px;
                background: var(--accent-red);
            }

            .timeline-item {
                display: flex;
                margin-bottom: 2rem;
                position: relative;
            }

            .timeline-year {
                width: 60px;
                text-align: center;
                background: var(--accent-red);
                color: white;
                padding: 0.5rem;
                border-radius: var(--radius);
                font-weight: 700;
                margin-right: 2rem;
                position: relative;
                z-index: 2;
            }

            .timeline-content {
                flex: 1;
                background: var(--bg-card);
                padding: 1.5rem;
                border-radius: var(--radius);
                border: 1px solid var(--border-color);
            }

            .timeline-event {
                font-size: 1.1rem;
                color: var(--text-primary);
                line-height: 1.5;
            }

            .history-description {
                max-width: 800px;
                margin: 0 auto;
                background: var(--bg-card);
                padding: 2rem;
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }

            .history-description h3 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .history-description p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1rem;
            }

            /* Характеристики */
            .specs-category {
                margin-bottom: 2rem;
            }

            .specs-category-title {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--accent-red);
            }

            .specs-list {
                display: grid;
                gap: 0.5rem;
            }

            .spec-item {
                display: flex;
                justify-content: space-between;
                padding: 1rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                transition: var(--transition);
            }

            .spec-item:hover {
                border-color: var(--accent-red);
                transform: translateX(5px);
            }

            .spec-name {
                color: var(--text-secondary);
                font-weight: 500;
            }

            .spec-value {
                color: var(--text-primary);
                font-weight: 700;
            }

            /* Модификации */
            .modifications-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            }

            .modification-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                transition: var(--transition);
            }

            .modification-card:hover {
                border-color: var(--accent-red);
                transform: translateY(-5px);
            }

            .modification-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }

            .modification-name {
                font-size: 1.2rem;
                color: var(--text-primary);
                margin: 0;
            }

            .modification-year {
                background: var(--accent-red);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 500;
            }

            .modification-description {
                color: var(--text-secondary);
                line-height: 1.5;
                margin-bottom: 1rem;
            }

            /* Эволюция */
            .evolution-timeline {
                max-width: 600px;
                margin: 0 auto 3rem;
            }

            .evolution-item {
                display: flex;
                align-items: center;
                margin-bottom: 2rem;
            }

            .evolution-arrow {
                width: 40px;
                height: 2px;
                background: var(--accent-red);
                margin: 0 1rem;
            }

            .evolution-item.predecessor .evolution-arrow {
                order: 1;
            }

            .evolution-item.current .evolution-arrow {
                background: var(--accent-gold);
            }

            .evolution-item.successor .evolution-arrow {
                order: -1;
            }

            .evolution-card {
                flex: 1;
                background: var(--bg-card);
                border: 2px solid var(--border-color);
                border-radius: var(--radius);
                padding: 1.5rem;
                text-align: center;
                transition: var(--transition);
            }

            .evolution-item.current .evolution-card {
                border-color: var(--accent-gold);
                transform: scale(1.05);
            }

            .evolution-name {
                font-size: 1.2rem;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .evolution-years {
                display: block;
                color: var(--text-muted);
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }

            .evolution-relation {
                display: inline-block;
                background: var(--bg-primary);
                color: var(--text-secondary);
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.8rem;
            }

            .evolution-item.current .evolution-relation {
                background: var(--accent-gold);
                color: var(--bg-primary);
            }

            /* Галерея */
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
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
                overflow: hidden;
            }

            .gallery-image .image-placeholder {
                font-size: 3rem;
                color: var(--text-muted);
            }

            .gallery-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: var(--transition);
            }

            .gallery-item:hover .gallery-overlay {
                opacity: 1;
            }

            .gallery-view-btn {
                background: var(--accent-red);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: var(--transition);
            }

            .gallery-view-btn:hover {
                transform: scale(1.1);
            }

            .gallery-caption {
                padding: 1rem;
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            /* Состояния загрузки и отсутствия данных */
            .loading-content {
                text-align: center;
                padding: 3rem;
                color: var(--text-secondary);
            }

            .no-data {
                text-align: center;
                padding: 4rem 2rem;
                color: var(--text-muted);
            }

            .no-data i {
                font-size: 4rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }

            .no-data h3 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            /* Адаптивность */
            @media (max-width: 968px) {
                .vehicle-hero-content {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                .vehicle-gallery {
                    position: static;
                }

                .vehicle-nav {
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .quick-specs {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 768px) {
                .vehicle-title {
                    font-size: 2.5rem;
                }

                .vehicle-meta {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .history-timeline::before {
                    left: 20px;
                }

                .timeline-year {
                    width: 40px;
                    margin-right: 1rem;
                    font-size: 0.8rem;
                }

                .modifications-grid {
                    grid-template-columns: 1fr;
                }

                .gallery-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 480px) {
                .vehicle-title {
                    font-size: 2rem;
                }

                .section-header h2 {
                    font-size: 2rem;
                }

                .gallery-grid {
                    grid-template-columns: 1fr;
                }

                .vehicle-nav-link {
                    padding: 0.75rem 1rem;
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Сохраняем ссылку на страницу
window.app = window.app || {};
window.app.pages = window.app.pages || {};
window.app.pages.vehicle = VehiclePage;

export default VehiclePage;
