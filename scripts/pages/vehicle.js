// Страница отдельной техники - ПРЕМИУМ ВЕРСИЯ
const VehiclePage = {
    currentVehicle: null,
    activeSpecCategory: 'general',
    
    async render() {
        return `
            <div class="vehicle-page premium">
                <!-- Верхняя панель с навигацией -->
                <section class="vehicle-top-panel">
                    <div class="container">
                        <div class="vehicle-breadcrumbs">
                            <a href="#/" class="breadcrumb-link">
                                <i class="fas fa-home"></i>
                                Главная
                            </a>
                            <span class="breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>
                            <a href="#/ground" class="breadcrumb-link">
                                <i class="fas fa-tank"></i>
                                Наземная техника
                            </a>
                            <span class="breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>
                            <span class="breadcrumb-current" id="breadcrumb-current">
                                <i class="fas fa-cog fa-spin"></i>
                                Загрузка...
                            </span>
                        </div>
                        
                        <div class="vehicle-quick-nav">
                            <button class="quick-nav-btn active" data-section="overview">
                                <i class="fas fa-eye"></i>
                                Обзор
                            </button>
                            <button class="quick-nav-btn" data-section="specs">
                                <i class="fas fa-list-alt"></i>
                                Характеристики
                            </button>
                            <button class="quick-nav-btn" data-section="history">
                                <i class="fas fa-history"></i>
                                История
                            </button>
                            <button class="quick-nav-btn" data-section="gallery">
                                <i class="fas fa-images"></i>
                                Галерея
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Герой секция с основной информацией -->
                <section class="vehicle-hero-section">
                    <div class="container">
                        <div class="vehicle-hero-grid">
                            <!-- Основная информация -->
                            <div class="vehicle-main-info">
                                <div class="vehicle-header">
                                    <div class="vehicle-badges">
                                        <span class="vehicle-badge era-modern" id="vehicle-era">Современный</span>
                                        <span class="vehicle-badge category-mbt" id="vehicle-category">ОБТ</span>
                                        <span class="vehicle-badge country-russia" id="vehicle-country">Россия</span>
                                    </div>
                                    <h1 class="vehicle-title" id="vehicle-title">
                                        <span class="title-glow">Загрузка...</span>
                                    </h1>
                                    <div class="vehicle-subtitle">
                                        <span class="vehicle-year" id="vehicle-year">2023</span>
                                        <span class="vehicle-manufacturer" id="vehicle-manufacturer">Уралвагонзавод</span>
                                    </div>
                                </div>

                                <div class="vehicle-description-card">
                                    <div class="description-header">
                                        <i class="fas fa-file-alt"></i>
                                        <h3>Описание</h3>
                                    </div>
                                    <p class="vehicle-description" id="vehicle-description">
                                        Загрузка описания техники...
                                    </p>
                                </div>

                                <!-- Быстрые характеристики -->
                                <div class="quick-specs-grid">
                                    <div class="quick-spec-card">
                                        <div class="spec-icon">
                                            <i class="fas fa-weight-hanging"></i>
                                        </div>
                                        <div class="spec-info">
                                            <span class="spec-value" id="quick-weight">0 т</span>
                                            <span class="spec-label">Боевая масса</span>
                                        </div>
                                    </div>
                                    <div class="quick-spec-card">
                                        <div class="spec-icon">
                                            <i class="fas fa-users"></i>
                                        </div>
                                        <div class="spec-info">
                                            <span class="spec-value" id="quick-crew">0 чел</span>
                                            <span class="spec-label">Экипаж</span>
                                        </div>
                                    </div>
                                    <div class="quick-spec-card">
                                        <div class="spec-icon">
                                            <i class="fas fa-crosshairs"></i>
                                        </div>
                                        <div class="spec-info">
                                            <span class="spec-value" id="quick-gun">0 мм</span>
                                            <span class="spec-label">Калибр орудия</span>
                                        </div>
                                    </div>
                                    <div class="quick-spec-card">
                                        <div class="spec-icon">
                                            <i class="fas fa-tachometer-alt"></i>
                                        </div>
                                        <div class="spec-info">
                                            <span class="spec-value" id="quick-speed">0 км/ч</span>
                                            <span class="spec-label">Макс. скорость</span>
                                        </div>
                                    </div>
                                    <div class="quick-spec-card">
                                        <div class="spec-icon">
                                            <i class="fas fa-horse-head"></i>
                                        </div>
                                        <div class="spec-info">
                                            <span class="spec-value" id="quick-power">0 л.с.</span>
                                            <span class="spec-label">Мощность двигателя</span>
                                        </div>
                                    </div>
                                    <div class="quick-spec-card">
                                        <div class="spec-icon">
                                            <i class="fas fa-road"></i>
                                        </div>
                                        <div class="spec-info">
                                            <span class="spec-value" id="quick-range">0 км</span>
                                            <span class="spec-label">Запас хода</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Галерея -->
                            <div class="vehicle-gallery-sidebar">
                                <div class="gallery-main">
                                    <div class="main-image" id="main-gallery-image">
                                        <div class="image-placeholder">
                                            <i class="fas fa-tank"></i>
                                            <span>Основное изображение</span>
                                        </div>
                                        <div class="image-overlay">
                                            <button class="zoom-btn">
                                                <i class="fas fa-expand-arrows-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="gallery-thumbnails" id="gallery-thumbnails">
                                    <!-- Миниатюры будут добавлены динамически -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Контент страницы -->
                <div class="vehicle-content-sections">
                    <div class="container">
                        <!-- Обзор -->
                        <section id="overview" class="content-section active">
                            <div class="section-header premium">
                                <div class="section-icon">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="section-title">
                                    <h2>Обзор техники</h2>
                                    <p>Ключевые особенности и возможности</p>
                                </div>
                            </div>

                            <div class="overview-content">
                                <div class="features-grid">
                                    <div class="feature-card">
                                        <div class="feature-icon">
                                            <i class="fas fa-shield-alt"></i>
                                        </div>
                                        <h4>Защита</h4>
                                        <p>Многослойное комбинированное бронирование с динамической защитой</p>
                                        <ul class="feature-list">
                                            <li>Композитная броня</li>
                                            <li>Динамическая защита "Контакт-5"</li>
                                            <li>Система активной защиты "Арена"</li>
                                        </ul>
                                    </div>
                                    <div class="feature-card">
                                        <div class="feature-icon">
                                            <i class="fas fa-bullseye"></i>
                                        </div>
                                        <h4>Вооружение</h4>
                                        <p>Мощное основное и вспомогательное вооружение</p>
                                        <ul class="feature-list">
                                            <li>125-мм гладкоствольная пушка</li>
                                            <li>Современная СУО</li>
                                            <li>Пулемётное вооружение</li>
                                        </ul>
                                    </div>
                                    <div class="feature-card">
                                        <div class="feature-icon">
                                            <i class="fas fa-cogs"></i>
                                        </div>
                                        <h4>Подвижность</h4>
                                        <p>Высокая мобильность и проходимость</p>
                                        <ul class="feature-list">
                                            <li>Мощный дизельный двигатель</li>
                                            <li>Гусеничная платформа</li>
                                            <li>Система подрессоривания</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Характеристики -->
                        <section id="specs" class="content-section">
                            <div class="section-header premium">
                                <div class="section-icon">
                                    <i class="fas fa-list-alt"></i>
                                </div>
                                <div class="section-title">
                                    <h2>Тактико-технические характеристики</h2>
                                    <p>Полные технические specifications</p>
                                </div>
                            </div>

                            <div class="specs-container">
                                <!-- Боковая навигация по категориям -->
                                <div class="specs-sidebar">
                                    <div class="specs-categories" id="specs-categories">
                                        <!-- Категории будут добавлены динамически -->
                                    </div>
                                </div>

                                <!-- Основной контент характеристик -->
                                <div class="specs-content">
                                    <div class="specs-category-content active" id="specs-general">
                                        <div class="loading-specs">
                                            <div class="loading-spinner"></div>
                                            <p>Загрузка характеристик...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- История -->
                        <section id="history" class="content-section">
                            <div class="section-header premium">
                                <div class="section-icon">
                                    <i class="fas fa-history"></i>
                                </div>
                                <div class="section-title">
                                    <h2>История создания и службы</h2>
                                    <p>Полная историческая справка</p>
                                </div>
                            </div>

                            <div class="history-container">
                                <!-- Боковая навигация по периодам -->
                                <div class="history-sidebar">
                                    <div class="history-periods" id="history-periods">
                                        <!-- Периоды будут добавлены динамически -->
                                    </div>
                                </div>

                                <!-- Основной контент истории -->
                                <div class="history-content">
                                    <div class="history-period-content active" id="history-development">
                                        <div class="loading-history">
                                            <div class="loading-spinner"></div>
                                            <p>Загрузка исторической информации...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Модификации -->
                        <section id="modifications" class="content-section">
                            <div class="section-header premium">
                                <div class="section-icon">
                                    <i class="fas fa-code-branch"></i>
                                </div>
                                <div class="section-title">
                                    <h2>Модификации и варианты</h2>
                                    <p>Развитие базовой модели</p>
                                </div>
                            </div>

                            <div class="modifications-container">
                                <div class="modifications-grid" id="modifications-content">
                                    <div class="loading-mods">
                                        <div class="loading-spinner"></div>
                                        <p>Загрузка информации о модификациях...</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Галерея -->
                        <section id="gallery" class="content-section">
                            <div class="section-header premium">
                                <div class="section-icon">
                                    <i class="fas fa-images"></i>
                                </div>
                                <div class="section-title">
                                    <h2>Галерея изображений</h2>
                                    <p>Фотографии, схемы и чертежи</p>
                                </div>
                            </div>

                            <div class="gallery-container">
                                <div class="gallery-filter">
                                    <button class="filter-btn active" data-filter="all">Все</button>
                                    <button class="filter-btn" data-filter="photo">Фото</button>
                                    <button class="filter-btn" data-filter="schema">Схемы</button>
                                    <button class="filter-btn" data-filter="blueprint">Чертежи</button>
                                </div>
                                <div class="gallery-grid" id="gallery-content">
                                    <div class="loading-gallery">
                                        <div class="loading-spinner"></div>
                                        <p>Загрузка галереи...</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <!-- Футер страницы -->
                <section class="vehicle-footer">
                    <div class="container">
                        <div class="footer-content">
                            <div class="footer-navigation">
                                <h4>Быстрая навигация</h4>
                                <div class="footer-nav-links">
                                    <a href="#overview" class="footer-nav-link">Обзор</a>
                                    <a href="#specs" class="footer-nav-link">Характеристики</a>
                                    <a href="#history" class="footer-nav-link">История</a>
                                    <a href="#gallery" class="footer-nav-link">Галерея</a>
                                </div>
                            </div>
                            <div class="footer-actions">
                                <button class="btn btn-primary" onclick="window.print()">
                                    <i class="fas fa-print"></i>
                                    Распечатать
                                </button>
                                <button class="btn btn-secondary" onclick="window.app.shareVehicle()">
                                    <i class="fas fa-share-alt"></i>
                                    Поделиться
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Модальное окно для изображений -->
            <div id="image-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modal-title">Просмотр изображения</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="modal-image" id="modal-image">
                            <!-- Изображение будет добавлено динамически -->
                        </div>
                        <div class="modal-caption" id="modal-caption"></div>
                    </div>
                </div>
            </div>
        `;
    },

    async init() {
        await this.loadVehicleData();
        this.addPremiumStyles();
        this.setupEventListeners();
        this.loadAllSections();
    },

    async loadVehicleData() {
        const vehicleId = this.getVehicleIdFromUrl();
        
        // Расширенные данные для демонстрации
        const vehiclesData = {
            't-72b3': {
                id: 't-72b3',
                name: 'Т-72Б3',
                full_name: 'Основной боевой танк Т-72Б3',
                year: '2016',
                country: 'russia',
                category: 'mbt',
                era: 'modern',
                manufacturer: 'Уралвагонзавод',
                short_description: 'Глубоко модернизированная версия танка Т-72 с улучшенной системой управления огнем, динамической защитой и двигателем. Представляет собой оптимальное сочетание проверенной конструкции и современных технологий.',
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
                    specifications: {
                        "Общие характеристики": {
                            "Длина с пушкой вперёд": "9.53 м",
                            "Длина корпуса": "6.86 м",
                            "Ширина": "3.46 м",
                            "Высота": "2.23 м",
                            "Клиренс": "0.49 м",
                            "Масса": "46 т",
                            "Экипаж": "3 человека",
                            "Ширина гусеницы": "0.58 м",
                            "Удельное давление": "0.94 кг/см²"
                        },
                        "Бронирование": {
                            "Тип брони": "Комбинированная противоснарядная",
                            "Лоб корпуса": "Эквивалент 550-600 мм против БПС",
                            "Борт корпуса": "80-100 мм",
                            "Лоб башни": "Эквивалент 800-1000 мм против БПС",
                            "Динамическая защита": "Контакт-5",
                            "Активная защита": "Опционально Арена-М",
                            "Система ПО": "Опционально ТШУ-1-7"
                        },
                        "Вооружение": {
                            "Калибр и марка пушки": "125-мм 2А46М-5",
                            "Тип пушки": "Гладкоствольная",
                            "Длина ствола": "48 калибров",
                            "Боекомплект пушки": "45 выстрелов",
                            "СУО": "1А40-4 или Сосна-У",
                            "Стабилизатор": "2Э42-4",
                            "Прицелы": "ТПД-К1, ТПН-3-49",
                            "Пулемёты": "1 × 12,7-мм НСВТ, 1 × 7,62-мм ПКТ",
                            "Боекомплект пулемётов": "300 × 12,7-мм, 2000 × 7,62-мм"
                        },
                        "Подвижность": {
                            "Двигатель": "В-84-1, дизельный",
                            "Мощность двигателя": "1130 л.с. (840 кВт)",
                            "Мощность двигателя (удельная)": "23,7 л.с./т",
                            "Скорость по шоссе": "60 км/ч",
                            "Скорость по пересечённой местности": "35-45 км/ч",
                            "Запас хода по шоссе": "500 км",
                            "Запас хода по пересечённой местности": "350 км",
                            "Ёмкость топливных баков": "1200 л + 400 л ПТБ",
                            "Преодолеваемый подъём": "30°",
                            "Преодолеваемая стенка": "0.85 м",
                            "Преодолеваемый ров": "2.8 м",
                            "Преодолеваемый брод": "1.2 м (1.8 м с ОПВТ)"
                        },
                        "Дополнительное оборудование": {
                            "Навигационная система": "ТНА-4",
                            "Средства связи": "Р-173, Р-173П",
                            "Система ОВПУ": "Есть",
                            "Система ПАЗ": "Есть",
                            "Система ППО": "Есть",
                            "Оборудование для самоокапывания": "Есть",
                            "Оборудование для подводного вождения": "ОПВТ"
                        }
                    },
                    history: {
                        "Разработка (1970-1980)": {
                            title: "Разработка и создание Т-72",
                            content: `
                                <h3>Предпосылки создания</h3>
                                <p>Разработка танка Т-72 началась в начале 1970-х годов как дальнейшее развитие успешной конструкции Т-64. Основной задачей было создание более надежного и технологичного танка при сохранении высоких боевых характеристик.</p>
                                
                                <h3>Конструкторские решения</h3>
                                <p>Была применена автоматизированная система заряжания, позволившая сократить экипаж до 3 человек. Комбинированная броня обеспечивала защиту от современных кумулятивных и бронебойных снарядов.</p>
                                
                                <h3>Принятие на вооружение</h3>
                                <p>Танк Т-72 был официально принят на вооружение Советской Армии в 1973 году и быстро стал одним из самых массовых танков в мире.</p>
                            `,
                            images: []
                        },
                        "Модернизация (1980-2000)": {
                            title: "Постоянное совершенствование",
                            content: `
                                <h3>Т-72Б - качественный скачок</h3>
                                <p>В 1985 году появилась модификация Т-72Б с динамической защитой "Контакт", значительно повысившей защиту от кумулятивных средств поражения.</p>
                                
                                <h3>Улучшение вооружения</h3>
                                <p>Была установлена новая система управления огнем 1А40-1, позволяющая эффективно поражать цели на больших дистанциях.</p>
                                
                                <h3>Экспортные версии</h3>
                                <p>Разработаны многочисленные экспортные модификации, поставлявшиеся в страны Варшавского договора и другие государства.</p>
                            `,
                            images: []
                        },
                        "Т-72Б3 (2010-н.в.)": {
                            title: "Глубокая модернизация",
                            content: `
                                <h3>Программа модернизации</h3>
                                <p>В 2010 году началась программа глубокой модернизации танков Т-72 до уровня Т-72Б3. Основной целью было приведение парка к современным требованиям при ограниченном бюджете.</p>
                                
                                <h3>Ключевые улучшения</h3>
                                <ul>
                                    <li>Новая система управления огнем "Сосна-У"</li>
                                    <li>Тепловизионный прицел наводчика</li>
                                    <li>Усиленная динамическая защита</li>
                                    <li>Модернизированный двигатель В-84-1</li>
                                    <li>Современные средства связи</li>
                                </ul>
                                
                                <h3>Боевое применение</h3>
                                <p>Т-72Б3 активно применяется в современных конфликтах, демонстрируя высокую надежность и боевую эффективность.</p>
                            `,
                            images: []
                        }
                    },
                    modifications: [
                        {
                            name: "Т-72Б3 обр. 2011 г.",
                            year: "2011",
                            description: "Первая версия модернизации с СУО 1А40-4",
                            features: ["СУО 1А40-4", "Двигатель В-84-1", "Динамическая защита Контакт-5"],
                            image: null
                        },
                        {
                            name: "Т-72Б3 обр. 2014 г.",
                            year: "2014",
                            description: "Установлена современная СУО 'Сосна-У' с тепловизионным каналом",
                            features: ["СУО Сосна-У", "Тепловизионный прицел", "Улучшенная защита"],
                            image: null
                        },
                        {
                            name: "Т-72Б3 обр. 2016 г.",
                            year: "2016",
                            description: "Модернизированная версия с дополнительными улучшениями защиты",
                            features: ["Усиленная ДЗ", "Новые средства связи", "Обновленная ходовая часть"],
                            image: null
                        },
                        {
                            name: "Т-72Б3М",
                            year: "2018",
                            description: "Экспортная версия с дополнительными улучшениями",
                            features: ["Дополнительная защита", "Улучшенная эргономика", "Экспортная комплектация"],
                            image: null
                        }
                    ],
                    gallery: [
                        { type: "photo", url: null, description: "Т-72Б3 на учениях 'Запад-2021'", category: "photo" },
                        { type: "photo", url: null, description: "Вид сбоку, демонстрирующий динамическую защиту", category: "photo" },
                        { type: "schema", url: null, description: "Схема бронирования Т-72Б3", category: "schema" },
                        { type: "blueprint", url: null, description: "Чертеж компоновки танка", category: "blueprint" },
                        { type: "photo", url: null, description: "Интерьер боевого отделения", category: "photo" },
                        { type: "schema", url: null, description: "Схема системы управления огнем", category: "schema" }
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
        
        // Обновляем основную информацию
        document.getElementById('vehicle-title').innerHTML = `<span class="title-glow">${vehicle.name}</span>`;
        document.getElementById('breadcrumb-current').innerHTML = `<i class="fas fa-tank"></i>${vehicle.name}`;
        document.getElementById('vehicle-year').textContent = vehicle.year;
        document.getElementById('vehicle-country').textContent = this.getCountryName(vehicle.country);
        document.getElementById('vehicle-category').textContent = this.getCategoryName(vehicle.category);
        document.getElementById('vehicle-era').textContent = this.getEraName(vehicle.era);
        document.getElementById('vehicle-manufacturer').textContent = vehicle.manufacturer;
        document.getElementById('vehicle-description').textContent = vehicle.short_description;

        // Быстрые характеристики
        document.getElementById('quick-weight').textContent = `${vehicle.weight} т`;
        document.getElementById('quick-crew').textContent = `${vehicle.crew} чел`;
        document.getElementById('quick-gun').textContent = `${vehicle.main_gun} мм`;
        document.getElementById('quick-speed').textContent = `${vehicle.speed} км/ч`;
        document.getElementById('quick-power').textContent = `${vehicle.engine_power} л.с.`;
        document.getElementById('quick-range').textContent = `${vehicle.road_range} км`;
    },

    getCountryName(countryCode) {
        const countries = {
            'russia': 'Россия',
            'usa': 'США',
            'germany': 'Германия',
            'uk': 'Великобритания',
            'france': 'Франция',
            'china': 'Китай'
        };
        return countries[countryCode] || countryCode;
    },

    getCategoryName(categoryCode) {
        const categories = {
            'mbt': 'ОБТ',
            'light_tank': 'Лёгкий танк',
            'medium_tank': 'Средний танк',
            'heavy_tank': 'Тяжёлый танк',
            'ifv': 'БМП',
            'apc': 'БТР'
        };
        return categories[categoryCode] || categoryCode;
    },

    getEraName(eraCode) {
        const eras = {
            'ww1': 'Первая мировая',
            'ww2': 'Вторая мировая',
            'cold_war': 'Холодная война',
            'modern': 'Современный'
        };
        return eras[eraCode] || eraCode;
    },

    setupEventListeners() {
        // Быстрая навигация
        document.querySelectorAll('.quick-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchMainSection(btn.dataset.section);
            });
        });

        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                if (targetId) {
                    e.preventDefault();
                    this.switchMainSection(targetId);
                }
            });
        });
    },

    switchMainSection(sectionId) {
        // Обновляем активную кнопку навигации
        document.querySelectorAll('.quick-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Показываем активный раздел
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Плавная прокрутка к началу раздела
        setTimeout(() => {
            document.getElementById(sectionId).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    },

    async loadAllSections() {
        await this.loadSpecifications();
        await this.loadHistory();
        await this.loadModifications();
        await this.loadGallery();
    },

    async loadSpecifications() {
        const specs = this.currentVehicle.details.specifications;
        const categoriesContainer = document.getElementById('specs-categories');
        const contentContainer = document.querySelector('.specs-content');

        if (specs) {
            // Создаем навигацию по категориям
            categoriesContainer.innerHTML = Object.keys(specs).map((category, index) => `
                <button class="spec-category-btn ${index === 0 ? 'active' : ''}" 
                        data-category="${this.slugify(category)}">
                    <span class="category-icon">
                        <i class="fas fa-${this.getCategoryIcon(category)}"></i>
                    </span>
                    <span class="category-name">${category}</span>
                    <span class="category-arrow">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </button>
            `).join('');

            // Создаем контент для каждой категории
            contentContainer.innerHTML = Object.keys(specs).map((category, index) => `
                <div class="specs-category-content ${index === 0 ? 'active' : ''}" 
                     id="specs-${this.slugify(category)}">
                    <h3 class="specs-category-title">${category}</h3>
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

            // Добавляем обработчики для переключения категорий
            document.querySelectorAll('.spec-category-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.dataset.category;
                    this.switchSpecCategory(category);
                });
            });
        }
    },

    async loadHistory() {
        const history = this.currentVehicle.details.history;
        const periodsContainer = document.getElementById('history-periods');
        const contentContainer = document.querySelector('.history-content');

        if (history) {
            // Создаем навигацию по периодам
            periodsContainer.innerHTML = Object.keys(history).map((period, index) => `
                <button class="history-period-btn ${index === 0 ? 'active' : ''}" 
                        data-period="${this.slugify(period)}">
                    <span class="period-year">${period.split(' ')[0]}</span>
                    <span class="period-name">${period.split(' ').slice(1).join(' ')}</span>
                    <span class="period-arrow">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </button>
            `).join('');

            // Создаем контент для каждого периода
            contentContainer.innerHTML = Object.keys(history).map((period, index) => `
                <div class="history-period-content ${index === 0 ? 'active' : ''}" 
                     id="history-${this.slugify(period)}">
                    <div class="history-period-header">
                        <h3 class="period-title">${history[period].title}</h3>
                        <span class="period-range">${period}</span>
                    </div>
                    <div class="history-period-body">
                        ${history[period].content}
                    </div>
                </div>
            `).join('');

            // Добавляем обработчики для переключения периодов
            document.querySelectorAll('.history-period-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const period = btn.dataset.period;
                    this.switchHistoryPeriod(period);
                });
            });
        }
    },

    async loadModifications() {
        const modifications = this.currentVehicle.details.modifications;
        const container = document.getElementById('modifications-content');

        if (modifications && modifications.length > 0) {
            container.innerHTML = modifications.map(mod => `
                <div class="modification-card premium">
                    <div class="mod-header">
                        <div class="mod-basic-info">
                            <h4 class="mod-name">${mod.name}</h4>
                            <span class="mod-year">${mod.year}</span>
                        </div>
                        <div class="mod-badge">Модификация</div>
                    </div>
                    <p class="mod-description">${mod.description}</p>
                    <div class="mod-features">
                        <h5>Основные особенности:</h5>
                        <ul class="features-list">
                            ${mod.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="mod-image">
                        <div class="image-placeholder">
                            <i class="fas fa-tank"></i>
                            <span>Изображение модификации</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    },

    async loadGallery() {
        const gallery = this.currentVehicle.details.gallery;
        const container = document.getElementById('gallery-content');

        if (gallery && gallery.length > 0) {
            container.innerHTML = gallery.map((item, index) => `
                <div class="gallery-item premium" data-type="${item.category}">
                    <div class="gallery-image">
                        <div class="image-placeholder">
                            <i class="fas fa-${item.type === 'schema' ? 'draw-polygon' : item.type === 'blueprint' ? 'ruler-combined' : 'image'}"></i>
                        </div>
                        <div class="gallery-overlay">
                            <button class="gallery-view-btn" data-index="${index}">
                                <i class="fas fa-expand"></i>
                                Просмотр
                            </button>
                            <button class="gallery-download-btn">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div class="gallery-info">
                        <span class="gallery-type">${this.getGalleryTypeName(item.type)}</span>
                        <p class="gallery-caption">${item.description}</p>
                    </div>
                </div>
            `).join('');

            // Добавляем фильтрацию галереи
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;
                    this.filterGallery(filter);
                });
            });
        }
    },

    // Вспомогательные методы
    slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },

    getCategoryIcon(category) {
        const icons = {
            'Общие характеристики': 'ruler-combined',
            'Бронирование': 'shield-alt',
            'Вооружение': 'crosshairs',
            'Подвижность': 'tachometer-alt',
            'Дополнительное оборудование': 'cogs'
        };
        return icons[category] || 'circle';
    },

    getGalleryTypeName(type) {
        const names = {
            'photo': 'Фотография',
            'schema': 'Схема',
            'blueprint': 'Чертеж'
        };
        return names[type] || type;
    },

    switchSpecCategory(category) {
        document.querySelectorAll('.spec-category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.specs-category-content').forEach(content => {
            content.classList.remove('active');
        });

        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        document.getElementById(`specs-${category}`).classList.add('active');
    },

    switchHistoryPeriod(period) {
        document.querySelectorAll('.history-period-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.history-period-content').forEach(content => {
            content.classList.remove('active');
        });

        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        document.getElementById(`history-${period}`).classList.add('active');
    },

    filterGallery(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.type === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    },

    addPremiumStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Премиум стили для страницы техники */
            .vehicle-page.premium {
                background: linear-gradient(135deg, var(--bg-primary) 0%, #0a0a0a 100%);
            }

            /* Верхняя панель */
            .vehicle-top-panel {
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
                padding: 1rem 0;
                position: sticky;
                top: 70px;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }

            .vehicle-breadcrumbs {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }

            .breadcrumb-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
                transition: var(--transition);
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
            }

            .breadcrumb-link:hover {
                color: var(--accent-red);
                border-color: var(--accent-red);
                transform: translateY(-1px);
            }

            .breadcrumb-separator {
                color: var(--text-muted);
            }

            .breadcrumb-current {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-primary);
                font-weight: 600;
                padding: 0.5rem 1rem;
                background: var(--bg-card);
                border-radius: var(--radius);
                border: 1px solid var(--accent-red);
            }

            .vehicle-quick-nav {
                display: flex;
                gap: 0.5rem;
                overflow-x: auto;
            }

            .quick-nav-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.5rem;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                color: var(--text-secondary);
                text-decoration: none;
                white-space: nowrap;
                transition: var(--transition);
                cursor: pointer;
            }

            .quick-nav-btn:hover,
            .quick-nav-btn.active {
                background: var(--accent-red);
                color: white;
                border-color: var(--accent-red);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
            }

            /* Герой секция */
            .vehicle-hero-section {
                padding: 3rem 0;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 50%, var(--bg-secondary) 100%);
                position: relative;
                overflow: hidden;
            }

            .vehicle-hero-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%);
                pointer-events: none;
            }

            .vehicle-hero-grid {
                display: grid;
                grid-template-columns: 1fr 400px;
                gap: 3rem;
                position: relative;
                z-index: 2;
            }

            .vehicle-header {
                margin-bottom: 2rem;
            }

            .vehicle-badges {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }

            .vehicle-badge {
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .era-modern { background: linear-gradient(135deg, var(--accent-red), #b91c1c); color: white; }
            .category-mbt { background: linear-gradient(135deg, var(--accent-blue), #1d4ed8); color: white; }
            .country-russia { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; }

            .vehicle-title {
                font-size: 3.5rem;
                font-weight: 900;
                margin-bottom: 0.5rem;
                line-height: 1.1;
            }

            .title-glow {
                background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-red) 50%, var(--accent-gold) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 30px rgba(220, 38, 38, 0.3);
            }

            .vehicle-subtitle {
                display: flex;
                gap: 2rem;
                color: var(--text-secondary);
                font-size: 1.1rem;
            }

            .vehicle-description-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                margin-bottom: 2rem;
                box-shadow: var(--shadow-lg);
            }

            .description-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .description-header i {
                font-size: 1.5rem;
                color: var(--accent-red);
            }

            .description-header h3 {
                margin: 0;
                color: var(--text-primary);
            }

            .vehicle-description {
                font-size: 1.1rem;
                line-height: 1.6;
                color: var(--text-secondary);
                margin: 0;
            }

            /* Быстрые характеристики */
            .quick-specs-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
            }

            .quick-spec-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                padding: 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }

            .quick-spec-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.1), transparent);
                transition: left 0.5s ease;
            }

            .quick-spec-card:hover::before {
                left: 100%;
            }

            .quick-spec-card:hover {
                border-color: var(--accent-red);
                transform: translateY(-2px);
                box-shadow: var(--shadow);
            }

            .spec-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--accent-red), var(--accent-red-hover));
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            }

            .spec-value {
                display: block;
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }

            .spec-label {
                font-size: 0.8rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            /* Галерея в сайдбаре */
            .vehicle-gallery-sidebar {
                position: sticky;
                top: 150px;
            }

            .gallery-main {
                margin-bottom: 1rem;
            }

            .main-image {
                height: 300px;
                background: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-lg);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }

            .main-image .image-placeholder {
                text-align: center;
                color: var(--text-muted);
            }

            .main-image .image-placeholder i {
                font-size: 4rem;
                margin-bottom: 1rem;
                display: block;
            }

            .image-overlay {
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

            .main-image:hover .image-overlay {
                opacity: 1;
            }

            .zoom-btn {
                background: var(--accent-red);
                color: white;
                border: none;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                cursor: pointer;
                transition: var(--transition);
            }

            .zoom-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
            }

            /* Премиум секции */
            .section-header.premium {
                display: flex;
                align-items: center;
                gap: 2rem;
                margin-bottom: 3rem;
                padding: 2rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                position: relative;
                overflow: hidden;
            }

            .section-header.premium::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background: linear-gradient(135deg, var(--accent-red), var(--accent-gold));
            }

            .section-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, var(--accent-red), var(--accent-red-hover));
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
            }

            .section-title h2 {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-red) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .section-title p {
                font-size: 1.2rem;
                color: var(--text-secondary);
                margin: 0;
            }

            /* Спецификации с боковой навигацией */
            .specs-container {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 2rem;
            }

            .specs-sidebar {
                position: sticky;
                top: 150px;
                height: fit-content;
            }

            .specs-categories {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
            }

            .spec-category-btn {
                display: flex;
                align-items: center;
                gap: 1rem;
                width: 100%;
                padding: 1.5rem;
                background: none;
                border: none;
                border-bottom: 1px solid var(--border-color);
                color: var(--text-secondary);
                text-align: left;
                cursor: pointer;
                transition: var(--transition);
            }

            .spec-category-btn:last-child {
                border-bottom: none;
            }

            .spec-category-btn:hover {
                background: var(--bg-primary);
                color: var(--text-primary);
            }

            .spec-category-btn.active {
                background: var(--accent-red);
                color: white;
            }

            .category-icon {
                width: 40px;
                height: 40px;
                background: var(--bg-primary);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .spec-category-btn.active .category-icon {
                background: rgba(255, 255, 255, 0.2);
            }

            .category-name {
                flex: 1;
                font-weight: 600;
            }

            .specs-category-content {
                display: none;
            }

            .specs-category-content.active {
                display: block;
                animation: fadeInUp 0.5s ease;
            }

            .specs-category-title {
                font-size: 2rem;
                margin-bottom: 2rem;
                color: var(--text-primary);
                border-bottom: 2px solid var(--accent-red);
                padding-bottom: 0.5rem;
            }

            .specs-table {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
            }

            .spec-row {
                display: flex;
                justify-content: space-between;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                transition: var(--transition);
            }

            .spec-row:last-child {
                border-bottom: none;
            }

            .spec-row:hover {
                background: var(--bg-primary);
            }

            .spec-name {
                color: var(--text-secondary);
                font-weight: 500;
                flex: 1;
            }

            .spec-value {
                color: var(--text-primary);
                font-weight: 600;
                text-align: right;
                flex: 1;
            }

            /* История с боковой навигацией */
            .history-container {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 2rem;
            }

            .history-sidebar {
                position: sticky;
                top: 150px;
                height: fit-content;
            }

            .history-periods {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
            }

            .history-period-btn {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                width: 100%;
                padding: 1.5rem;
                background: none;
                border: none;
                border-bottom: 1px solid var(--border-color);
                color: var(--text-secondary);
                text-align: left;
                cursor: pointer;
                transition: var(--transition);
            }

            .history-period-btn:last-child {
                border-bottom: none;
            }

            .history-period-btn:hover {
                background: var(--bg-primary);
                color: var(--text-primary);
            }

            .history-period-btn.active {
                background: var(--accent-red);
                color: white;
            }

            .period-year {
                font-size: 1.2rem;
                font-weight: 700;
            }

            .period-name {
                font-size: 0.9rem;
                opacity: 0.8;
            }

            .history-period-content {
                display: none;
            }

            .history-period-content.active {
                display: block;
                animation: fadeInUp 0.5s ease;
            }

            .history-period-header {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid var(--accent-red);
            }

            .period-title {
                font-size: 2rem;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .period-range {
                color: var(--accent-red);
                font-weight: 600;
                font-size: 1.1rem;
            }

            .history-period-body {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
            }

            .history-period-body h3 {
                color: var(--text-primary);
                margin: 2rem 0 1rem;
                font-size: 1.5rem;
            }

            .history-period-body h3:first-child {
                margin-top: 0;
            }

            .history-period-body p {
                line-height: 1.7;
                color: var(--text-secondary);
                margin-bottom: 1rem;
            }

            .history-period-body ul {
                color: var(--text-secondary);
                line-height: 1.6;
                padding-left: 1.5rem;
            }

            .history-period-body li {
                margin-bottom: 0.5rem;
            }

            /* Модификации */
            .modifications-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }

            .modification-card.premium {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }

            .modification-card.premium::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background: linear-gradient(135deg, var(--accent-red), var(--accent-gold));
            }

            .modification-card.premium:hover {
                transform: translateY(-5px);
                border-color: var(--accent-red);
                box-shadow: var(--shadow-lg);
            }

            .mod-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }

            .mod-basic-info {
                flex: 1;
            }

            .mod-name {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }

            .mod-year {
                color: var(--accent-red);
                font-weight: 600;
                font-size: 1.1rem;
            }

            .mod-badge {
                background: var(--accent-red);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .mod-description {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }

            .mod-features h5 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .features-list {
                color: var(--text-secondary);
                line-height: 1.6;
                padding-left: 1rem;
            }

            .features-list li {
                margin-bottom: 0.5rem;
                position: relative;
            }

            .features-list li::before {
                content: '▶';
                color: var(--accent-red);
                position: absolute;
                left: -1rem;
            }

            .mod-image {
                height: 200px;
                background: var(--bg-primary);
                border-radius: var(--radius);
                margin-top: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-muted);
            }

            /* Галерея */
            .gallery-filter {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }

            .filter-btn {
                padding: 0.75rem 1.5rem;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                color: var(--text-secondary);
                cursor: pointer;
                transition: var(--transition);
            }

            .filter-btn:hover,
            .filter-btn.active {
                background: var(--accent-red);
                color: white;
                border-color: var(--accent-red);
            }

            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
            }

            .gallery-item.premium {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                transition: var(--transition);
            }

            .gallery-item.premium:hover {
                transform: translateY(-5px);
                border-color: var(--accent-red);
                box-shadow: var(--shadow-lg);
            }

            .gallery-image {
                height: 200px;
                background: var(--bg-primary);
                position: relative;
                overflow: hidden;
            }

            .gallery-image .image-placeholder {
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: var(--text-muted);
            }

            .gallery-image .image-placeholder i {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            .gallery-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
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
                padding: 0.75rem 1.5rem;
                border-radius: var(--radius);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: var(--transition);
            }

            .gallery-view-btn:hover {
                background: var(--accent-red-hover);
                transform: scale(1.05);
            }

            .gallery-download-btn {
                background: var(--bg-primary);
                color: var(--text-primary);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: var(--transition);
            }

            .gallery-download-btn:hover {
                background: var(--accent-blue);
                color: white;
            }

            .gallery-info {
                padding: 1.5rem;
            }

            .gallery-type {
                display: inline-block;
                background: var(--accent-blue);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            .gallery-caption {
                color: var(--text-primary);
                font-weight: 500;
                margin: 0;
                line-height: 1.4;
            }

            /* Футер страницы */
            .vehicle-footer {
                background: var(--bg-secondary);
                border-top: 1px solid var(--border-color);
                padding: 3rem 0;
                margin-top: 4rem;
            }

            .footer-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .footer-navigation h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
            }

            .footer-nav-links {
                display: flex;
                gap: 1.5rem;
            }

            .footer-nav-link {
                color: var(--text-secondary);
                text-decoration: none;
                transition: var(--transition);
            }

            .footer-nav-link:hover {
                color: var(--accent-red);
            }

            .footer-actions {
                display: flex;
                gap: 1rem;
            }

            /* Анимации */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Адаптивность */
            @media (max-width: 1200px) {
                .vehicle-hero-grid {
                    grid-template-columns: 1fr;
                }

                .vehicle-gallery-sidebar {
                    position: static;
                    order: -1;
                }

                .specs-container,
                .history-container {
                    grid-template-columns: 1fr;
                }

                .specs-sidebar,
                .history-sidebar {
                    position: static;
                }
            }

            @media (max-width: 768px) {
                .vehicle-title {
                    font-size: 2.5rem;
                }

                .quick-specs-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .section-header.premium {
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }

                .section-icon {
                    width: 60px;
                    height: 60px;
                    font-size: 1.5rem;
                }

                .footer-content {
                    flex-direction: column;
                    gap: 2rem;
                    text-align: center;
                }

                .footer-nav-links {
                    justify-content: center;
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

                .quick-specs-grid {
                    grid-template-columns: 1fr;
                }

                .vehicle-subtitle {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .gallery-grid {
                    grid-template-columns: 1fr;
                }

                .quick-nav-btn {
                    padding: 0.5rem 1rem;
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
