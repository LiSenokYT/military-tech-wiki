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
                            <a href="#specifications" class="nav-link" data-section="specifications">
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
                        <section id="specifications" class="content-section">
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
                                <div class="history-summary">
                                    <div class="timeline-overview">
                                        <h3>Краткая хронология</h3>
                                        <div class="timeline-items">
                                            <div class="timeline-item">
                                                <div class="timeline-year">1970-1973</div>
                                                <div class="timeline-event">Разработка базовой модели Т-72</div>
                                            </div>
                                            <div class="timeline-item">
                                                <div class="timeline-year">1974-1989</div>
                                                <div class="timeline-event">Серийное производство и первые модификации</div>
                                            </div>
                                            <div class="timeline-item">
                                                <div class="timeline-year">1990-2010</div>
                                                <div class="timeline-event">Постсоветский период и локальные конфликты</div>
                                            </div>
                                            <div class="timeline-item">
                                                <div class="timeline-year">2011-н.в.</div>
                                                <div class="timeline-event">Глубокая модернизация до Т-72Б3</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" id="show-detailed-history">
                                        <i class="fas fa-book-open"></i>
                                        Читать подробную историю
                                    </button>
                                </div>
                                <div class="detailed-history" id="detailed-history" style="display: none;">
                                    <!-- Детальная история будет загружена здесь -->
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

            <!-- Модальное окно для детальной истории -->
            <div id="history-modal" class="modal">
                <div class="modal-content large">
                    <div class="modal-header">
                        <h3>Подробная история Т-72Б3</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="modal-history-content" id="modal-history-content">
                            <!-- Контент истории будет загружен сюда -->
                        </div>
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
        
        // Прокручиваем к верху страницы
        window.scrollTo(0, 0);
    },

    async loadVehicleData() {
        const vehicleId = this.getVehicleIdFromUrl();
        
        // Подробные данные
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
                            "Активная защита": "опционально Арена-М"
                        },
                        "Вооружение": {
                            "Основное орудие": "125-мм 2А46М-5 (гладкоствольная)",
                            "Длина ствола": "48 калибров",
                            "Боекомплект": "45 выстрелов",
                            "Скорострельность": "8 выстр/мин",
                            "Система управления огнем": "1А40-4 или Сосна-У",
                            "Стабилизатор вооружения": "2Э42-4",
                            "Прицел наводчика": "ТПД-К1, ТПН-3-49 (ночной)",
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
                    detailedHistory: `
                        <div class="history-article">
                            <h2>Полная история создания и развития танка Т-72Б3</h2>
                            
                            <h3>Предыстория и необходимость модернизации</h3>
                            <p>К началу 2000-х годов основной парк танков Российской армии состоял из модификаций Т-72 различных лет выпуска. Опыт локальных конфликтов, в частности боевых действий в Чечне, выявил необходимость серьезной модернизации существующей техники. Основные проблемы, требующие решения:</p>
                            <ul>
                                <li>Устаревшая система управления огнем, не позволяющая эффективно поражать цели в любое время суток</li>
                                <li>Недостаточный уровень защиты от современных противотанковых средств</li>
                                <li>Ограниченные возможности двигательной установки</li>
                                <li>Отсутствие современных средств связи и навигации</li>
                            </ul>

                            <h3>Разработка программы модернизации (2008-2010)</h3>
                            <p>В 2008 году Министерство обороны РФ инициировало программу глубокой модернизации танков Т-72. Основными исполнителями были определены:</p>
                            <ul>
                                <li>Уралвагонзавод - головной исполнитель</li>
                                <li>НИИ Стали - разработка элементов защиты</li>
                                <li>КБП - системы управления огнем</li>
                                <li>ЧТЗ - силовые установки</li>
                            </ul>
                            <p>Программа предусматривала создание нескольких вариантов модернизации с разной степенью глубокости изменений. Т-72Б3 стал компромиссным вариантом, сочетающим существенное улучшение характеристик при относительно невысокой стоимости модернизации.</p>

                            <h3>Технические особенности модернизации</h3>
                            
                            <h4>Система управления огнем</h4>
                            <p>Основным нововведением стала установка современной СУО "Сосна-У". Система включает:</p>
                            <ul>
                                <li>Тепловизионный прицельный комплекс с дальностью обнаружения до 5000 метров</li>
                                <li>Цифровой баллистический вычислитель</li>
                                <li>Лазерный дальномер с точностью ±10 метров</li>
                                <li>Систему автоматического сопровождения целей</li>
                            </ul>
                            <p>Это позволило значительно повысить точность стрельбы и возможность ведения боевых действий в условиях ограниченной видимости.</p>

                            <h4>Защита</h4>
                            <p>Была усилена как пассивная, так и активная защита танка:</p>
                            <ul>
                                <li>Установлены дополнительные модули динамической защиты "Контакт-5"</li>
                                <li>Улучшено противоминное бронирование днища</li>
                                <li>Добавлена система оптико-электронного подавления "ТШУ-1-7"</li>
                                <li>Возможность установки комплекса активной защиты "Арена-М"</li>
                            </ul>

                            <h4>Подвижность</h4>
                            <p>Модернизация силовой установки включала:</p>
                            <ul>
                                <li>Установку двигателя В-84-1 мощностью 1130 л.с.</li>
                                <li>Модернизацию трансмиссии</li>
                                <li>Улучшение системы охлаждения</li>
                                <li>Внедрение цифровой системы диагностики</li>
                            </ul>

                            <h3>Этапы производства и внедрения</h3>
                            
                            <h4>Опытная партия (2011-2012)</h4>
                            <p>Первые 10 танков Т-72Б3 были изготовлены в 2011 году и направлены для войсковых испытаний в различные военные округа. Испытания проводились в экстремальных климатических условиях - от заполярья до южных регионов.</p>

                            <h4>Серийное производство (2013-2016)</h4>
                            <p>После успешного завершения испытаний началось массовое переоборудование танков. Ежегодно модернизировалось от 200 до 300 единиц техники. Основными получателями стали соединения Западного и Южного военных округов.</p>

                            <h4>Современный этап (2017-н.в.)</h4>
                            <p>С 2017 года начался выпуск усовершенствованной версии Т-72Б3 с дополнительными улучшениями. Параллельно ведется разработка дальнейших модернизационных решений.</p>

                            <h3>Боевое применение</h3>
                            <p>Т-72Б3 активно применяется в ходе специальной военной операции на Украине. По отзывам экипажей, танк показал себя надежной и эффективной машиной. Отмечаются:</p>
                            <ul>
                                <li>Высокая точность стрельбы из основного орудия</li>
                                <li>Хорошая защищенность от большинства противотанковых средств</li>
                                <li>Надежность ходовой части и двигателя</li>
                                <li>Удобство работы экипажа</li>
                            </ul>

                            <h3>Экспортные перспективы</h3>
                            <p>На базе Т-72Б3 создана экспортная модификация Т-72Б3М, предлагаемая на международном рынке вооружений. Основные отличия экспортной версии:</p>
                                <ul>
                                <li>Адаптация под стандарты НАТО</li>
                                <li>Дополнительные системы связи</li>
                                <li>Улучшенный климат-контроль</li>
                                <li>Варианты окраски под разные ТВД</li>
                            </ul>

                            <h3>Заключение</h3>
                            <p>Т-72Б3 стал удачным примером глубокой модернизации проверенной временем конструкции. Сочетание относительно невысокой стоимости и существенного роста боевых характеристик делает его важным элементом бронетанкового парка Российской армии на ближайшие годы. Программа модернизации продолжается, что свидетельствует о перспективности данной платформы.</p>
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
                        }
                    ],
                    gallery: [
                        { type: "photo", description: "Т-72Б3 на учениях 'Запад-2021'", category: "photo" },
                        { type: "photo", description: "Вид сбоку, демонстрирующий динамическую защиту", category: "photo" },
                        { type: "schema", description: "Схема бронирования Т-72Б3", category: "schema" }
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

    setupEventListeners() {
        // Навигация по разделам - прокрутка к верху при переключении
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                
                // Прокручиваем к верху страницы перед переключением
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Даем время для прокрутки, затем переключаем секцию
                setTimeout(() => {
                    this.switchSection(sectionId);
                }, 300);
            });
        });

        // Кнопка показа детальной истории
        document.getElementById('show-detailed-history')?.addEventListener('click', () => {
            this.showDetailedHistory();
        });

        // Модальное окно
        this.setupModal();
    },

    setupModal() {
        const modal = document.getElementById('history-modal');
        const closeBtn = document.querySelector('.close-modal');

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    },

    showDetailedHistory() {
        const modal = document.getElementById('history-modal');
        const content = document.getElementById('modal-history-content');
        
        if (modal && content && this.currentVehicle) {
            content.innerHTML = this.currentVehicle.details.detailedHistory;
            modal.style.display = 'block';
        }
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
    },

    async loadAllContent() {
        await this.loadSpecifications();
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
                        <button class="collapse-btn" data-category="${this.slugify(category)}">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div class="specs-table" id="specs-${this.slugify(category)}">
                        ${Object.keys(specs[category]).map(key => `
                            <div class="spec-row">
                                <div class="spec-name">${key}</div>
                                <div class="spec-value">${specs[category][key]}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            // Добавляем обработчики для сворачивания/разворачивания
            document.querySelectorAll('.collapse-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.toggleSpecCategory(btn.dataset.category);
                });
            });
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

    // Вспомогательные методы
    slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },

    getGalleryTypeName(type) {
        const names = {
            'photo': 'Фото',
            'schema': 'Схема',
            'blueprint': 'Чертеж'
        };
        return names[type] || type;
    },

    toggleSpecCategory(category) {
        const table = document.getElementById(`specs-${category}`);
        const btn = document.querySelector(`[data-category="${category}"]`);
        const icon = btn.querySelector('i');
        
        if (table.classList.contains('collapsed')) {
            table.classList.remove('collapsed');
            icon.className = 'fas fa-chevron-down';
        } else {
            table.classList.add('collapsed');
            icon.className = 'fas fa-chevron-right';
        }
    },

    addVehicleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Стили для сворачиваемых характеристик */
            .specs-category-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                cursor: pointer;
                padding: 1rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                transition: var(--transition);
            }

            .specs-category-header:hover {
                border-color: var(--accent-red);
            }

            .collapse-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0.5rem;
                border-radius: var(--radius);
                transition: var(--transition);
            }

            .collapse-btn:hover {
                background: var(--bg-primary);
                color: var(--text-primary);
            }

            .specs-table {
                transition: all 0.3s ease;
                overflow: hidden;
            }

            .specs-table.collapsed {
                display: none;
            }

            /* Стили для истории */
            .history-summary {
                text-align: center;
                padding: 2rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                margin-bottom: 2rem;
            }

            .timeline-overview {
                margin-bottom: 2rem;
            }

            .timeline-overview h3 {
                color: var(--text-primary);
                margin-bottom: 1.5rem;
            }

            .timeline-items {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }

            .timeline-item {
                padding: 1rem;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                text-align: center;
            }

            .timeline-year {
                font-weight: 700;
                color: var(--accent-red);
                margin-bottom: 0.5rem;
            }

            .timeline-event {
                color: var(--text-secondary);
                font-size: 0.9rem;
                line-height: 1.4;
            }

            /* Модальное окно для истории */
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
            }

            .modal-content {
                background-color: var(--bg-primary);
                margin: 2% auto;
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }

            .modal-content.large {
                max-width: 1000px;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 0;
                background: var(--bg-primary);
                z-index: 10;
            }

            .modal-header h3 {
                margin: 0;
                color: var(--text-primary);
            }

            .close-modal {
                color: var(--text-secondary);
                font-size: 1.5rem;
                font-weight: bold;
                cursor: pointer;
                transition: var(--transition);
            }

            .close-modal:hover {
                color: var(--accent-red);
            }

            .modal-body {
                padding: 1.5rem;
            }

            .modal-history-content {
                color: var(--text-secondary);
                line-height: 1.7;
            }

            .modal-history-content h2 {
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                border-bottom: 2px solid var(--accent-red);
                padding-bottom: 0.5rem;
            }

            .modal-history-content h3 {
                color: var(--text-primary);
                margin: 2rem 0 1rem;
            }

            .modal-history-content h4 {
                color: var(--text-primary);
                margin: 1.5rem 0 0.75rem;
            }

            .modal-history-content p {
                margin-bottom: 1rem;
            }

            .modal-history-content ul {
                margin-bottom: 1rem;
                padding-left: 1.5rem;
            }

            .modal-history-content li {
                margin-bottom: 0.5rem;
            }

            /* Адаптивность для модального окна */
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 5% auto;
                }

                .modal-content.large {
                    width: 98%;
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
