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
                                    <p>Загрузка исторической информации...</p>
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
    },

    async loadVehicleData() {
        const vehicleId = this.getVehicleIdFromUrl();
        
        // Подробные данные для демонстрации
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
                details: {
                    specifications: {
                        "Основные параметры": {
                            "Боевая масса": "46 т",
                            "Экипаж": "3 человека",
                            "Длина с пушкой вперёд": "9.53 м",
                            "Длина корпуса": "6.86 м",
                            "Ширина": "3.46 м",
                            "Высота": "2.23 м",
                            "Клиренс": "0.49 м",
                            "Ширина гусеницы": "0.58 м",
                            "Удельное давление на грунт": "0.94 кг/см²"
                        },
                        "Бронирование": {
                            "Тип брони": "Комбинированная противоснарядная",
                            "Лоб корпуса": "эквивалент 550-600 мм против БПС",
                            "Лоб корпуса (с ДЗ)": "эквивалент 800-1000 мм против БПС",
                            "Лоб башни": "эквивалент 800-1000 мм против БПС",
                            "Борт корпуса": "80-100 мм",
                            "Борт башни": "150-200 мм",
                            "Корма": "60-80 мм",
                            "Динамическая защита": "Контакт-5",
                            "Активная защита": "опционально Арена-М",
                            "Система постановки дымзавес": "ТШУ-1-7"
                        },
                        "Вооружение": {
                            "Основное орудие": "125-мм 2А46М-5 (гладкоствольная)",
                            "Длина ствола": "48 калибров",
                            "Боекомплект": "45 выстрелов",
                            "Скорострельность": "8 выстр/мин",
                            "Система управления огнем": "1А40-4 или Сосна-У",
                            "Стабилизатор вооружения": "2Э42-4",
                            "Прицел наводчика": "ТПД-К1, ТПН-3-49 (ночной)",
                            "Прицел командира": "ТКН-3",
                            "Дальномер": "лазерный",
                            "Спаренный пулемет": "7,62-мм ПКТ",
                            "Зенитный пулемет": "12,7-мм НСВТ",
                            "Боекомплект пулеметов": "2000 (7,62-мм) + 300 (12,7-мм)"
                        },
                        "Подвижность": {
                            "Двигатель": "В-84-1, дизельный",
                            "Мощность двигателя": "1130 л.с. (840 кВт)",
                            "Удельная мощность": "23,7 л.с./т",
                            "Максимальная скорость": "60 км/ч",
                            "Скорость по пересеченной местности": "35-45 км/ч",
                            "Запас хода по шоссе": "500 км",
                            "Запас хода по пересеченной местности": "350 км",
                            "Емкость топливных баков": "1200 л + 400 л ПТБ",
                            "Преодолеваемый подъем": "30°",
                            "Преодолеваемый крен": "25°",
                            "Преодолеваемая стенка": "0.85 м",
                            "Преодолеваемый ров": "2.8 м",
                            "Преодолеваемый брод": "1.2 м (1.8 м с ОПВТ)"
                        },
                        "Специальное оборудование": {
                            "Навигационная система": "ТНА-4",
                            "Средства связи": "Р-173, Р-173П",
                            "Система защиты от ОМП": "ПАЗ, ППО",
                            "Система очистки воздуха": "ОВПУ",
                            "Оборудование для самоокапывания": "встроенное бульдозерное",
                            "Оборудование подводного вождения": "ОПВТ",
                            "Система пожаротушения": "3-кратного действия",
                            "Электрооборудование": "24 В"
                        }
                    },
                    history: {
                        content: `
                            <div class="history-timeline">
                                <div class="timeline-period">
                                    <h3>1970-1973: Разработка базовой модели</h3>
                                    <p>Разработка танка Т-72 началась в начале 1970-х годов в конструкторском бюро Уралвагонзавода под руководством главного конструктора В. Н. Венедиктова. Танк создавался как более технологичная и надежная альтернатива Т-64.</p>
                                    <p>Основные особенности новой конструкции:</p>
                                    <ul>
                                        <li>Упрощенная и более надежная ходовая часть</li>
                                        <li>Модернизированная система автоматического заряжания</li>
                                        <li>Улучшенная эргономика рабочего места экипажа</li>
                                        <li>Снижение стоимости производства</li>
                                    </ul>
                                </div>

                                <div class="timeline-period">
                                    <h3>1974-1989: Серийное производство и первые модификации</h3>
                                    <p>После принятия на вооружение в 1973 году, Т-72 быстро стал основным танком Советской Армии. В течение этого периода было разработано несколько модификаций:</p>
                                    <ul>
                                        <li><strong>Т-72А (1979)</strong> - установлена новая пушка 2А46, улучшено бронирование</li>
                                        <li><strong>Т-72Б (1985)</strong> - введена динамическая защита "Контакт", новая СУО</li>
                                        <li><strong>Т-72С</strong> - экспортный вариант с дополнительной защитой</li>
                                    </ul>
                                    <p>Танк поставлялся в страны Варшавского договора и другие дружественные государства.</p>
                                </div>

                                <div class="timeline-period">
                                    <h3>1990-2010: Постсоветский период и локальные конфликты</h3>
                                    <p>После распада СССР танк Т-72 продолжал оставаться на вооружении Российской армии и армий стран СНГ. Танк применялся в различных локальных конфликтах:</p>
                                    <ul>
                                        <li>Первая чеченская война (1994-1996)</li>
                                        <li>Вторая чеченская война (1999-2009)</li>
                                        <li>Вооруженный конфликт в Южной Осетии (2008)</li>
                                    </ul>
                                    <p>По опыту боевого применения были выявлены слабые места и начаты работы по глубокой модернизации.</p>
                                </div>

                                <div class="timeline-period">
                                    <h3>2011-н.в.: Глубокая модернизация до Т-72Б3</h3>
                                    <p>В 2010 году началась программа глубокой модернизации танков Т-72 до уровня Т-72Б3. Основные улучшения:</p>
                                    <ul>
                                        <li>Новая система управления огнем "Сосна-У" с тепловизионным каналом</li>
                                        <li>Модернизированный двигатель В-84-1 мощностью 1130 л.с.</li>
                                        <li>Усиленная динамическая защита</li>
                                        <li>Современные средства связи и навигации</li>
                                        <li>Цифровая бортовая информационная система</li>
                                    </ul>
                                    <p>Т-72Б3 активно используется в СВО, демонстрируя высокую надежность и боевую эффективность.</p>
                                </div>
                            </div>
                        `
                    },
                    modifications: [
                        {
                            name: "Т-72Б3 обр. 2011 г.",
                            years: "2011-2014",
                            description: "Первая версия модернизации с системой управления огнем 1А40-4",
                            features: [
                                "СУО 1А40-4 с лазерным дальномером",
                                "Двигатель В-84-1 мощностью 1130 л.с.",
                                "Динамическая защита 'Контакт-5'",
                                "Ночной прицел ТПН-3-49",
                                "Средства связи Р-173"
                            ],
                            production: "~500 единиц"
                        },
                        {
                            name: "Т-72Б3 обр. 2014 г.",
                            years: "2014-2016",
                            description: "Модернизированная версия с современной СУО 'Сосна-У'",
                            features: [
                                "СУО 'Сосна-У' с тепловизионным каналом",
                                "Стабилизатор вооружения 2Э42-4",
                                "Цифровая баллистика",
                                "Улучшенная система наблюдения",
                                "Современные средства связи"
                            ],
                            production: "~800 единиц"
                        },
                        {
                            name: "Т-72Б3 обр. 2016 г.",
                            years: "2016-2020",
                            description: "Улучшенная версия с дополнительной защитой и оборудованием",
                            features: [
                                "Усиленная динамическая защита",
                                "Система защиты от КУВ 'ТШУ-1-7'",
                                "Улучшенная система ППО",
                                "Модернизированная ходовая часть",
                                "Система навигации ТНА-4"
                            ],
                            production: "~1200 единиц"
                        },
                        {
                            name: "Т-72Б3М",
                            years: "2020-н.в.",
                            description: "Экспортная версия с дополнительными улучшениями",
                            features: [
                                "Дополнительная броневая защита",
                                "Улучшенная эргономика",
                                "Кондиционирование обитаемого отделения",
                                "Спутниковая навигация",
                                "Система боевого управления"
                            ],
                            production: "по заказу"
                        }
                    ],
                    gallery: [
                        { type: "photo", description: "Т-72Б3 на учениях 'Запад-2021'", category: "photo" },
                        { type: "photo", description: "Вид сбоку, демонстрирующий динамическую защиту", category: "photo" },
                        { type: "schema", description: "Схема бронирования Т-72Б3", category: "schema" },
                        { type: "blueprint", description: "Компоновочная схема танка", category: "blueprint" },
                        { type: "photo", description: "Интерьер боевого отделения", category: "photo" },
                        { type: "schema", description: "Схема системы управления огнем", category: "schema" }
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
            'russia': 'Россия',
            'usa': 'США',
            'germany': 'Германия'
        };
        return countries[countryCode] || countryCode;
    },

    getCategoryName(categoryCode) {
        const categories = {
            'mbt': 'Основной боевой танк',
            'light_tank': 'Легкий танк',
            'ifv': 'БМП'
        };
        return categories[categoryCode] || categoryCode;
    },

    setupEventListeners() {
        // Навигация по разделам
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.dataset.section);
            });
        });
    },

    switchSection(sectionId) {
        // Обновляем активную навигацию
        document.querySelectorAll('.nav-link').forEach(link => {
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
        }
    },

    async loadHistory() {
        const container = document.getElementById('history-content');
        const history = this.currentVehicle.details.history;

        if (history) {
            container.innerHTML = history.content;
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
                            <div class="mod-production">
                                <strong>Выпуск:</strong> ${mod.production}
                            </div>
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
                                    <i class="fas fa-${item.type === 'schema' ? 'draw-polygon' : item.type === 'blueprint' ? 'ruler-combined' : 'image'}"></i>
                                </div>
                                <div class="image-overlay">
                                    <span class="image-type">${this.getGalleryTypeName(item.type)}</span>
                                </div>
                            </div>
                            <div class="gallery-caption">${item.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    },

    getGalleryTypeName(type) {
        const names = {
            'photo': 'Фото',
            'schema': 'Схема',
            'blueprint': 'Чертеж'
        };
        return names[type] || type;
    },

    addVehicleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .vehicle-page {
                min-height: 100vh;
            }

            /* Основная информация */
            .vehicle-main-section {
                padding: 2rem 0;
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
            }

            .vehicle-main-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 3rem;
                align-items: start;
            }

            .vehicle-header {
                margin-bottom: 1.5rem;
            }

            .vehicle-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .vehicle-meta {
                display: flex;
                gap: 1.5rem;
                flex-wrap: wrap;
            }

            .meta-item {
                background: var(--bg-card);
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .vehicle-description {
                margin-bottom: 2rem;
            }

            .vehicle-description p {
                font-size: 1.1rem;
                line-height: 1.6;
                color: var(--text-secondary);
            }

            /* Быстрая статистика */
            .quick-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }

            .stat-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
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
                width: 40px;
                height: 40px;
                background: var(--accent-red);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .stat-value {
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--text-primary);
            }

            .stat-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
            }

            /* Изображение */
            .vehicle-image {
                position: sticky;
                top: 100px;
            }

            .image-container {
                height: 300px;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .image-placeholder {
                text-align: center;
                color: var(--text-muted);
            }

            .image-placeholder i {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: block;
            }

            /* Навигация */
            .content-navigation {
                background: var(--bg-primary);
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 70px;
                z-index: 100;
            }

            .content-nav {
                display: flex;
                gap: 0;
            }

            .nav-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem 1.5rem;
                color: var(--text-secondary);
                text-decoration: none;
                border-bottom: 3px solid transparent;
                transition: var(--transition);
            }

            .nav-link:hover,
            .nav-link.active {
                color: var(--accent-red);
                border-bottom-color: var(--accent-red);
                background: var(--bg-secondary);
            }

            /* Контент */
            .vehicle-content {
                padding: 3rem 0;
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
                font-size: 2.2rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }

            .section-header p {
                font-size: 1.1rem;
                color: var(--text-secondary);
            }

            /* Характеристики */
            .specs-category {
                margin-bottom: 3rem;
            }

            .specs-category-title {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--accent-red);
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
            }

            .spec-value {
                color: var(--text-primary);
                font-weight: 600;
                text-align: right;
            }

            /* История */
            .history-timeline {
                max-width: 800px;
                margin: 0 auto;
            }

            .timeline-period {
                margin-bottom: 3rem;
                padding-bottom: 2rem;
                border-bottom: 1px solid var(--border-color);
            }

            .timeline-period:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }

            .timeline-period h3 {
                font-size: 1.4rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }

            .timeline-period p {
                line-height: 1.7;
                color: var(--text-secondary);
                margin-bottom: 1rem;
            }

            .timeline-period ul {
                color: var(--text-secondary);
                line-height: 1.6;
                padding-left: 1.5rem;
            }

            .timeline-period li {
                margin-bottom: 0.5rem;
            }

            /* Модификации */
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
                transform: translateY(-2px);
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
                font-weight: 600;
            }

            .mod-description {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1rem;
            }

            .mod-production {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
            }

            .mod-features h4 {
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
                content: '•';
                color: var(--accent-red);
                position: absolute;
                left: -1rem;
            }

            /* Галерея */
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
                border-color: var(--accent-red);
                transform: translateY(-2px);
            }

            .gallery-image {
                height: 180px;
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
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
            }

            .image-overlay {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius);
                font-size: 0.8rem;
            }

            .gallery-caption {
                padding: 1rem;
                color: var(--text-primary);
                font-weight: 500;
                text-align: center;
            }

            /* Состояния загрузки */
            .loading-state {
                text-align: center;
                padding: 3rem;
                color: var(--text-secondary);
            }

            /* Адаптивность */
            @media (max-width: 968px) {
                .vehicle-main-grid {
                    grid-template-columns: 1fr;
                }

                .vehicle-image {
                    position: static;
                    order: -1;
                }

                .content-nav {
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .modifications-grid {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 768px) {
                .vehicle-title {
                    font-size: 2rem;
                }

                .quick-stats {
                    grid-template-columns: 1fr;
                }

                .gallery-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 480px) {
                .vehicle-meta {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .gallery-grid {
                    grid-template-columns: 1fr;
                }

                .nav-link {
                    padding: 0.75rem 1rem;
                    font-size: 0.9rem;
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
