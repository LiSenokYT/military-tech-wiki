// Страница наземной техники
const GroundPage = {
    vehicles: [],
    filteredVehicles: [],
    filters: {
        // Основные фильтры
        category: '',
        country: '',
        era: '',
        weight_min: '',
        weight_max: '',
        crew_min: '',
        crew_max: '',
        search: '',
        // Расширенные фильтры
        main_gun: '',
        engine_power: '',
        armor: '',
        speed: '',
        // Новые расширенные фильтры
        road_range: '',
        trench_width: '',
        ammunition: '',
        production_years: ''
    },

    async render() {
        return `
            <div class="catalog-page">
                <!-- Заголовок и описание -->
                <section class="catalog-header">
                    <div class="container">
                        <div class="breadcrumbs">
                            <a href="#/">Главная</a>
                            <span class="breadcrumb-separator">/</span>
                            <span class="breadcrumb-current">Наземная техника</span>
                        </div>
                        <h1>Наземная военная техника</h1>
                        <p class="catalog-description">
                            Исследуйте полную коллекцию бронетанковой техники: от первых танков времен Первой мировой 
                            до современных основных боевых танков, боевых машин пехоты и самоходных артиллерийских установок.
                        </p>
                        <div class="catalog-stats">
                            <div class="catalog-stat">
                                <span class="stat-number" id="vehicles-count">0</span>
                                <span class="stat-label">единиц техники</span>
                            </div>
                            <div class="catalog-stat">
                                <span class="stat-number">15+</span>
                                <span class="stat-label">стран</span>
                            </div>
                            <div class="catalog-stat">
                                <span class="stat-number">100+</span>
                                <span class="stat-label">лет истории</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Фильтры -->
                <section class="filters-section">
                    <div class="container">
                        <div class="filters-header">
                            <h2>Фильтры</h2>
                            <button id="reset-filters" class="btn btn-secondary btn-small">
                                <i class="fas fa-redo"></i>
                                Сбросить фильтры
                            </button>
                        </div>
                        
                        <div class="filters-grid">
                            <!-- Основные фильтры -->
                            <div class="filter-group">
                                <label for="search-filter" class="filter-label">
                                    <i class="fas fa-search"></i>
                                    Поиск по названию
                                </label>
                                <input type="text" id="search-filter" placeholder="Например: Т-72, Abrams..." class="filter-input">
                            </div>

                            <div class="filter-group">
                                <label for="category-filter" class="filter-label">
                                    <i class="fas fa-tags"></i>
                                    Класс техники
                                </label>
                                <select id="category-filter" class="filter-select">
                                    <option value="">Все классы</option>
                                    <option value="mbt">Основной боевой танк (ОБТ)</option>
                                    <option value="light_tank">Легкий танк</option>
                                    <option value="medium_tank">Средний танк</option>
                                    <option value="heavy_tank">Тяжелый танк</option>
                                    <option value="ifv">Боевая машина пехоты (БМП)</option>
                                    <option value="apc">Бронетранспортер (БТР)</option>
                                    <option value="spg">Самоходная артиллерия (САУ)</option>
                                    <option value="spaa">Зенитная установка (ЗСУ)</option>
                                    <option value="mrap">Бронеавтомобиль (MRAP)</option>
                                    <option value="engineering">Инженерная техника</option>
                                </select>
                            </div>

                            <div class="filter-group">
                                <label for="country-filter" class="filter-label">
                                    <i class="fas fa-flag"></i>
                                    Страна
                                </label>
                                <select id="country-filter" class="filter-select">
                                    <option value="">Все страны</option>
                                    <option value="russia">Россия / СССР</option>
                                    <option value="usa">США</option>
                                    <option value="germany">Германия</option>
                                    <option value="uk">Великобритания</option>
                                    <option value="france">Франция</option>
                                    <option value="china">Китай</option>
                                    <option value="japan">Япония</option>
                                    <option value="israel">Израиль</option>
                                    <option value="italy">Италия</option>
                                    <option value="sweden">Швеция</option>
                                    <option value="ukraine">Украина</option>
                                    <option value="poland">Польша</option>
                                    <option value="czech">Чехия</option>
                                </select>
                            </div>

                            <div class="filter-group">
                                <label for="era-filter" class="filter-label">
                                    <i class="fas fa-history"></i>
                                    Период
                                </label>
                                <select id="era-filter" class="filter-select">
                                    <option value="">Все периоды</option>
                                    <option value="ww1">Первая мировая война</option>
                                    <option value="interwar">Межвоенный период</option>
                                    <option value="ww2">Вторая мировая война</option>
                                    <option value="cold_war">Холодная война</option>
                                    <option value="modern">Современность</option>
                                </select>
                            </div>

                            <!-- Дополнительные фильтры -->
                            <div class="filter-group double">
                                <label class="filter-label">
                                    <i class="fas fa-weight-hanging"></i>
                                    Масса (тонны)
                                </label>
                                <div class="range-inputs">
                                    <input type="number" id="weight-min" placeholder="От" class="filter-input range-input">
                                    <span class="range-separator">—</span>
                                    <input type="number" id="weight-max" placeholder="До" class="filter-input range-input">
                                </div>
                            </div>

                            <div class="filter-group double">
                                <label class="filter-label">
                                    <i class="fas fa-users"></i>
                                    Экипаж (человек)
                                </label>
                                <div class="range-inputs">
                                    <input type="number" id="crew-min" placeholder="От" class="filter-input range-input">
                                    <span class="range-separator">—</span>
                                    <input type="number" id="crew-max" placeholder="До" class="filter-input range-input">
                                </div>
                            </div>
                        </div>

                        <!-- Расширенные фильтры -->
                        <div class="advanced-filters-toggle">
                            <button id="toggle-advanced" class="btn btn-secondary btn-small">
                                <i class="fas fa-sliders-h"></i>
                                Расширенные фильтры
                                <i class="fas fa-chevron-down" id="advanced-arrow"></i>
                            </button>
                        </div>

                        <div class="advanced-filters" id="advanced-filters">
                            <div class="filters-grid">
                                <!-- Существующие расширенные фильтры -->
                                <div class="filter-group">
                                    <label for="main-gun-filter" class="filter-label">
                                        <i class="fas fa-crosshairs"></i>
                                        Калибр орудия (мм)
                                    </label>
                                    <select id="main-gun-filter" class="filter-select">
                                        <option value="">Любой калибр</option>
                                        <option value="20-50">20-50 мм</option>
                                        <option value="51-75">51-75 мм</option>
                                        <option value="76-100">76-100 мм</option>
                                        <option value="101-120">101-120 мм</option>
                                        <option value="121-125">121-125 мм</option>
                                        <option value="126-150">126-150 мм</option>
                                        <option value="150+">150+ мм</option>
                                    </select>
                                </div>

                                <div class="filter-group">
                                    <label for="engine-filter" class="filter-label">
                                        <i class="fas fa-cog"></i>
                                        Мощность двигателя (л.с.)
                                    </label>
                                    <select id="engine-filter" class="filter-select">
                                        <option value="">Любая мощность</option>
                                        <option value="0-300">до 300 л.с.</option>
                                        <option value="301-600">301-600 л.с.</option>
                                        <option value="601-900">601-900 л.с.</option>
                                        <option value="901-1200">901-1200 л.с.</option>
                                        <option value="1200+">1200+ л.с.</option>
                                    </select>
                                </div>

                                <div class="filter-group">
                                    <label for="armor-filter" class="filter-label">
                                        <i class="fas fa-shield-alt"></i>
                                        Уровень бронирования
                                    </label>
                                    <select id="armor-filter" class="filter-select">
                                        <option value="">Любой уровень</option>
                                        <option value="light">Легкое</option>
                                        <option value="medium">Среднее</option>
                                        <option value="heavy">Тяжелое</option>
                                        <option value="composite">Композитное</option>
                                        <option value="reactive">Динамическая защита</option>
                                    </select>
                                </div>

                                <div class="filter-group">
                                    <label for="speed-filter" class="filter-label">
                                        <i class="fas fa-tachometer-alt"></i>
                                        Макс. скорость (км/ч)
                                    </label>
                                    <select id="speed-filter" class="filter-select">
                                        <option value="">Любая скорость</option>
                                        <option value="0-30">до 30 км/ч</option>
                                        <option value="31-50">31-50 км/ч</option>
                                        <option value="51-70">51-70 км/ч</option>
                                        <option value="71-90">71-90 км/ч</option>
                                        <option value="90+">90+ км/ч</option>
                                    </select>
                                </div>

                                <!-- Новые расширенные фильтры -->
                                <div class="filter-group">
                                    <label for="road-range-filter" class="filter-label">
                                        <i class="fas fa-road"></i>
                                        Запас хода (км)
                                    </label>
                                    <select id="road-range-filter" class="filter-select">
                                        <option value="">Любой запас хода</option>
                                        <option value="0-200">до 200 км</option>
                                        <option value="201-400">201-400 км</option>
                                        <option value="401-600">401-600 км</option>
                                        <option value="601-800">601-800 км</option>
                                        <option value="800+">800+ км</option>
                                    </select>
                                </div>

                                <div class="filter-group">
                                    <label for="trench-filter" class="filter-label">
                                        <i class="fas fa-ditch"></i>
                                        Ширина рва (м)
                                    </label>
                                    <select id="trench-filter" class="filter-select">
                                        <option value="">Любая ширина</option>
                                        <option value="0-2">до 2 м</option>
                                        <option value="2.1-2.5">2.1-2.5 м</option>
                                        <option value="2.6-3.0">2.6-3.0 м</option>
                                        <option value="3.0+">3.0+ м</option>
                                    </select>
                                </div>

                                <div class="filter-group">
                                    <label for="ammo-filter" class="filter-label">
                                        <i class="fas fa-bullseye"></i>
                                        Боекомплект
                                    </label>
                                    <select id="ammo-filter" class="filter-select">
                                        <option value="">Любой боекомплект</option>
                                        <option value="0-20">до 20 выстрелов</option>
                                        <option value="21-40">21-40 выстрелов</option>
                                        <option value="41-60">41-60 выстрелов</option>
                                        <option value="60+">60+ выстрелов</option>
                                    </select>
                                </div>

                                <div class="filter-group">
                                    <label for="production-filter" class="filter-label">
                                        <i class="fas fa-calendar-alt"></i>
                                        Годы производства
                                    </label>
                                    <select id="production-filter" class="filter-select">
                                        <option value="">Любые годы</option>
                                        <option value="1910-1940">1910-1940</option>
                                        <option value="1941-1960">1941-1960</option>
                                        <option value="1961-1980">1961-1980</option>
                                        <option value="1981-2000">1981-2000</option>
                                        <option value="2001+">2001-н.в.</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Результаты -->
                <section class="results-section">
                    <div class="container">
                        <div class="results-header">
                            <div class="results-info">
                                <h3>Найдено единиц техники: <span id="results-count">0</span></h3>
                                <div class="active-filters" id="active-filters"></div>
                            </div>
                            <div class="results-sort">
                                <label for="sort-select" class="sort-label">Сортировка:</label>
                                <select id="sort-select" class="sort-select">
                                    <option value="name_asc">По названию (А-Я)</option>
                                    <option value="name_desc">По названию (Я-А)</option>
                                    <option value="year_asc">По году (старые)</option>
                                    <option value="year_desc">По году (новые)</option>
                                    <option value="weight_asc">По массе (легкие)</option>
                                    <option value="weight_desc">По массе (тяжелые)</option>
                                    <option value="speed_asc">По скорости (медленные)</option>
                                    <option value="speed_desc">По скорости (быстрые)</option>
                                </select>
                            </div>
                        </div>

                        <!-- Сетка карточек -->
                        <div class="vehicles-grid" id="vehicles-grid">
                            <div class="loading-cards">
                                <div class="loading-card"></div>
                                <div class="loading-card"></div>
                                <div class="loading-card"></div>
                                <div class="loading-card"></div>
                                <div class="loading-card"></div>
                                <div class="loading-card"></div>
                            </div>
                        </div>

                        <!-- Пагинация -->
                        <div class="pagination" id="pagination">
                            <!-- Пагинация будет генерироваться динамически -->
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    async init() {
        this.addCatalogStyles();
        await this.loadVehicles();
        this.setupEventListeners();
        this.applyFilters();
    },

    async loadVehicles() {
        // Временные данные для демонстрации с дополнительными полями для расширенных фильтров
        this.vehicles = [
            {
                id: 't-72b3',
                name: 'Т-72Б3',
                year: '2016',
                country: 'russia',
                category: 'mbt',
                era: 'modern',
                description: 'Глубоко модернизированная версия танка Т-72 с улучшенной системой управления огнем, динамической защитой и двигателем.',
                weight: 46,
                crew: 3,
                main_gun: 125,
                engine_power: 1130,
                armor: 'composite',
                speed: 60,
                road_range: 500,
                trench_width: 2.8,
                ammunition: 45,
                production_start: 2013,
                production_end: null,
                image: null
            },
            {
                id: 't-14-armata',
                name: 'Т-14 Армата',
                year: '2015',
                country: 'russia',
                category: 'mbt',
                era: 'modern',
                description: 'Российский основной боевой танк нового поколения с необитаемой башней и активной защитой.',
                weight: 55,
                crew: 3,
                main_gun: 125,
                engine_power: 1500,
                armor: 'composite',
                speed: 80,
                road_range: 500,
                trench_width: 3.2,
                ammunition: 40,
                production_start: 2015,
                production_end: null,
                image: null
            },
            {
                id: 't-90ms',
                name: 'Т-90МС',
                year: '2017',
                country: 'russia',
                category: 'mbt',
                era: 'modern',
                description: 'Экспортная модификация танка Т-90 с улучшенной защитой и системой управления огнем.',
                weight: 50,
                crew: 3,
                main_gun: 125,
                engine_power: 1130,
                armor: 'composite',
                speed: 65,
                road_range: 550,
                trench_width: 2.9,
                ammunition: 43,
                production_start: 2017,
                production_end: null,
                image: null
            },
            {
                id: 'bmp-3',
                name: 'БМП-3',
                year: '1987',
                country: 'russia',
                category: 'ifv',
                era: 'cold_war',
                description: 'Боевая машина пехоты с мощным вооружением включающим 100-мм орудие и пусковую установку ПТУР.',
                weight: 18.7,
                crew: 3,
                main_gun: 100,
                engine_power: 500,
                armor: 'light',
                speed: 70,
                road_range: 600,
                trench_width: 2.5,
                ammunition: 40,
                production_start: 1987,
                production_end: null,
                image: null
            },
            {
                id: 'btr-82a',
                name: 'БТР-82А',
                year: '2013',
                country: 'russia',
                category: 'apc',
                era: 'modern',
                description: 'Модернизированный бронетранспортер с улучшенным вооружением и защитой.',
                weight: 15.4,
                crew: 3,
                main_gun: 30,
                engine_power: 300,
                armor: 'light',
                speed: 80,
                road_range: 600,
                trench_width: 2.0,
                ammunition: 500,
                production_start: 2013,
                production_end: null,
                image: null
            },
            {
                id: 'm1a2-abrams',
                name: 'M1A2 Abrams',
                year: '1992',
                country: 'usa',
                category: 'mbt',
                era: 'modern',
                description: 'Американский основной боевой танк с advanced системой управления огнем и мощной защитой.',
                weight: 63,
                crew: 4,
                main_gun: 120,
                engine_power: 1500,
                armor: 'composite',
                speed: 67,
                road_range: 425,
                trench_width: 2.7,
                ammunition: 42,
                production_start: 1992,
                production_end: null,
                image: null
            },
            {
                id: 'leopard-2a7',
                name: 'Leopard 2A7',
                year: '2014',
                country: 'germany',
                category: 'mbt',
                era: 'modern',
                description: 'Немецкий основной боевой танк с improved защитой и modernized системами.',
                weight: 67,
                crew: 4,
                main_gun: 120,
                engine_power: 1500,
                armor: 'composite',
                speed: 72,
                road_range: 450,
                trench_width: 3.0,
                ammunition: 42,
                production_start: 2014,
                production_end: null,
                image: null
            },
            {
                id: 'challenger-2',
                name: 'Challenger 2',
                year: '1998',
                country: 'uk',
                category: 'mbt',
                era: 'modern',
                description: 'Британский основной боевой танк с знаменитой броней Chobham.',
                weight: 62.5,
                crew: 4,
                main_gun: 120,
                engine_power: 1200,
                armor: 'composite',
                speed: 59,
                road_range: 450,
                trench_width: 2.8,
                ammunition: 52,
                production_start: 1998,
                production_end: null,
                image: null
            },
            {
                id: 'merkava-mk4',
                name: 'Merkava Mk.4',
                year: '2004',
                country: 'israel',
                category: 'mbt',
                era: 'modern',
                description: 'Израильский основной боевой танк с уникальной компоновкой и advanced защитой.',
                weight: 65,
                crew: 4,
                main_gun: 120,
                engine_power: 1500,
                armor: 'composite',
                speed: 64,
                road_range: 500,
                trench_width: 3.0,
                ammunition: 48,
                production_start: 2004,
                production_end: null,
                image: null
            },
            {
                id: 'type-10',
                name: 'Type 10',
                year: '2012',
                country: 'japan',
                category: 'mbt',
                era: 'modern',
                description: 'Японский основной боевой танк с modular броней и advanced электроникой.',
                weight: 48,
                crew: 3,
                main_gun: 120,
                engine_power: 1200,
                armor: 'composite',
                speed: 70,
                road_range: 500,
                trench_width: 2.7,
                ammunition: 40,
                production_start: 2012,
                production_end: null,
                image: null
            },
            {
                id: 't-34-85',
                name: 'Т-34-85',
                year: '1944',
                country: 'russia',
                category: 'medium_tank',
                era: 'ww2',
                description: 'Советский средний танк периода Второй мировой войны, самый массовый танк в истории.',
                weight: 32,
                crew: 5,
                main_gun: 85,
                engine_power: 500,
                armor: 'medium',
                speed: 55,
                road_range: 300,
                trench_width: 2.5,
                ammunition: 60,
                production_start: 1944,
                production_end: 1958,
                image: null
            },
            {
                id: 'tiger-i',
                name: 'Tiger I',
                year: '1942',
                country: 'germany',
                category: 'heavy_tank',
                era: 'ww2',
                description: 'Немецкий тяжелый танк времен Второй мировой войны, известный своей мощной броней и вооружением.',
                weight: 57,
                crew: 5,
                main_gun: 88,
                engine_power: 700,
                armor: 'heavy',
                speed: 45,
                road_range: 195,
                trench_width: 2.3,
                ammunition: 92,
                production_start: 1942,
                production_end: 1944,
                image: null
            }
        ];

        this.filteredVehicles = [...this.vehicles];
        this.updateVehiclesCount();
    },

    setupEventListeners() {
        // Основные фильтры
        document.getElementById('search-filter').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFilters();
        });

        document.getElementById('country-filter').addEventListener('change', (e) => {
            this.filters.country = e.target.value;
            this.applyFilters();
        });

        document.getElementById('era-filter').addEventListener('change', (e) => {
            this.filters.era = e.target.value;
            this.applyFilters();
        });

        document.getElementById('weight-min').addEventListener('input', (e) => {
            this.filters.weight_min = e.target.value;
            this.applyFilters();
        });

        document.getElementById('weight-max').addEventListener('input', (e) => {
            this.filters.weight_max = e.target.value;
            this.applyFilters();
        });

        document.getElementById('crew-min').addEventListener('input', (e) => {
            this.filters.crew_min = e.target.value;
            this.applyFilters();
        });

        document.getElementById('crew-max').addEventListener('input', (e) => {
            this.filters.crew_max = e.target.value;
            this.applyFilters();
        });

        // Расширенные фильтры
        document.getElementById('main-gun-filter').addEventListener('change', (e) => {
            this.filters.main_gun = e.target.value;
            this.applyFilters();
        });

        document.getElementById('engine-filter').addEventListener('change', (e) => {
            this.filters.engine_power = e.target.value;
            this.applyFilters();
        });

        document.getElementById('armor-filter').addEventListener('change', (e) => {
            this.filters.armor = e.target.value;
            this.applyFilters();
        });

        document.getElementById('speed-filter').addEventListener('change', (e) => {
            this.filters.speed = e.target.value;
            this.applyFilters();
        });

        // Новые расширенные фильтры
        document.getElementById('road-range-filter').addEventListener('change', (e) => {
            this.filters.road_range = e.target.value;
            this.applyFilters();
        });

        document.getElementById('trench-filter').addEventListener('change', (e) => {
            this.filters.trench_width = e.target.value;
            this.applyFilters();
        });

        document.getElementById('ammo-filter').addEventListener('change', (e) => {
            this.filters.ammunition = e.target.value;
            this.applyFilters();
        });

        document.getElementById('production-filter').addEventListener('change', (e) => {
            this.filters.production_years = e.target.value;
            this.applyFilters();
        });

        // Сброс фильтров
        document.getElementById('reset-filters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Расширенные фильтры
        document.getElementById('toggle-advanced').addEventListener('click', () => {
            this.toggleAdvancedFilters();
        });

        // Сортировка
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.sortVehicles(e.target.value);
        });
    },

    applyFilters() {
        this.filteredVehicles = this.vehicles.filter(vehicle => {
            // Поиск по названию
            if (this.filters.search && !vehicle.name.toLowerCase().includes(this.filters.search.toLowerCase())) {
                return false;
            }

            // Фильтр по категории
            if (this.filters.category && vehicle.category !== this.filters.category) {
                return false;
            }

            // Фильтр по стране
            if (this.filters.country && vehicle.country !== this.filters.country) {
                return false;
            }

            // Фильтр по периоду
            if (this.filters.era && vehicle.era !== this.filters.era) {
                return false;
            }

            // Фильтр по массе
            if (this.filters.weight_min && vehicle.weight < parseFloat(this.filters.weight_min)) {
                return false;
            }
            if (this.filters.weight_max && vehicle.weight > parseFloat(this.filters.weight_max)) {
                return false;
            }

            // Фильтр по экипажу
            if (this.filters.crew_min && vehicle.crew < parseInt(this.filters.crew_min)) {
                return false;
            }
            if (this.filters.crew_max && vehicle.crew > parseInt(this.filters.crew_max)) {
                return false;
            }

            // Расширенные фильтры
            if (this.filters.main_gun && !this.checkRangeFilter(vehicle.main_gun, this.filters.main_gun)) {
                return false;
            }

            if (this.filters.engine_power && !this.checkRangeFilter(vehicle.engine_power, this.filters.engine_power)) {
                return false;
            }

            if (this.filters.armor && vehicle.armor !== this.filters.armor) {
                return false;
            }

            if (this.filters.speed && !this.checkRangeFilter(vehicle.speed, this.filters.speed)) {
                return false;
            }

            // Новые расширенные фильтры
            if (this.filters.road_range && !this.checkRangeFilter(vehicle.road_range, this.filters.road_range)) {
                return false;
            }

            if (this.filters.trench_width && !this.checkRangeFilter(vehicle.trench_width, this.filters.trench_width)) {
                return false;
            }

            if (this.filters.ammunition && !this.checkRangeFilter(vehicle.ammunition, this.filters.ammunition)) {
                return false;
            }

            if (this.filters.production_years && !this.checkProductionYears(vehicle, this.filters.production_years)) {
                return false;
            }

            return true;
        });

        this.updateDisplay();
        this.updateActiveFilters();
    },

    checkRangeFilter(value, range) {
        if (!value) return false;
        
        switch (range) {
            case '0-300': return value <= 300;
            case '301-600': return value >= 301 && value <= 600;
            case '601-900': return value >= 601 && value <= 900;
            case '901-1200': return value >= 901 && value <= 1200;
            case '1200+': return value > 1200;
            
            case '0-30': return value <= 30;
            case '31-50': return value >= 31 && value <= 50;
            case '51-70': return value >= 51 && value <= 70;
            case '71-90': return value >= 71 && value <= 90;
            case '90+': return value > 90;
            
            case '20-50': return value >= 20 && value <= 50;
            case '51-75': return value >= 51 && value <= 75;
            case '76-100': return value >= 76 && value <= 100;
            case '101-120': return value >= 101 && value <= 120;
            case '121-125': return value >= 121 && value <= 125;
            case '126-150': return value >= 126 && value <= 150;
            case '150+': return value > 150;
            
            case '0-200': return value <= 200;
            case '201-400': return value >= 201 && value <= 400;
            case '401-600': return value >= 401 && value <= 600;
            case '601-800': return value >= 601 && value <= 800;
            case '800+': return value > 800;
            
            case '0-2': return value <= 2;
            case '2.1-2.5': return value >= 2.1 && value <= 2.5;
            case '2.6-3.0': return value >= 2.6 && value <= 3.0;
            case '3.0+': return value > 3.0;
            
            case '0-20': return value <= 20;
            case '21-40': return value >= 21 && value <= 40;
            case '41-60': return value >= 41 && value <= 60;
            case '60+': return value > 60;
            
            default: return true;
        }
    },

    checkProductionYears(vehicle, range) {
        const startYear = vehicle.production_start;
        if (!startYear) return false;
        
        switch (range) {
            case '1910-1940': return startYear >= 1910 && startYear <= 1940;
            case '1941-1960': return startYear >= 1941 && startYear <= 1960;
            case '1961-1980': return startYear >= 1961 && startYear <= 1980;
            case '1981-2000': return startYear >= 1981 && startYear <= 2000;
            case '2001+': return startYear >= 2001;
            default: return true;
        }
    },

    resetFilters() {
        this.filters = {
            category: '',
            country: '',
            era: '',
            weight_min: '',
            weight_max: '',
            crew_min: '',
            crew_max: '',
            search: '',
            main_gun: '',
            engine_power: '',
            armor: '',
            speed: '',
            road_range: '',
            trench_width: '',
            ammunition: '',
            production_years: ''
        };

        // Сброс значений в DOM
        const filterIds = [
            'search-filter', 'category-filter', 'country-filter', 'era-filter',
            'weight-min', 'weight-max', 'crew-min', 'crew-max',
            'main-gun-filter', 'engine-filter', 'armor-filter', 'speed-filter',
            'road-range-filter', 'trench-filter', 'ammo-filter', 'production-filter'
        ];

        filterIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });

        this.applyFilters();
    },

    toggleAdvancedFilters() {
        const advancedFilters = document.getElementById('advanced-filters');
        const arrow = document.getElementById('advanced-arrow');
        
        advancedFilters.classList.toggle('show');
        arrow.classList.toggle('fa-chevron-down');
        arrow.classList.toggle('fa-chevron-up');
    },

    sortVehicles(sortType) {
        switch (sortType) {
            case 'name_asc':
                this.filteredVehicles.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name_desc':
                this.filteredVehicles.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'year_asc':
                this.filteredVehicles.sort((a, b) => a.year - b.year);
                break;
            case 'year_desc':
                this.filteredVehicles.sort((a, b) => b.year - a.year);
                break;
            case 'weight_asc':
                this.filteredVehicles.sort((a, b) => a.weight - b.weight);
                break;
            case 'weight_desc':
                this.filteredVehicles.sort((a, b) => b.weight - a.weight);
                break;
            case 'speed_asc':
                this.filteredVehicles.sort((a, b) => a.speed - b.speed);
                break;
            case 'speed_desc':
                this.filteredVehicles.sort((a, b) => b.speed - a.speed);
                break;
        }
        this.updateDisplay();
    },

    updateDisplay() {
        const grid = document.getElementById('vehicles-grid');
        
        if (this.filteredVehicles.length === 0) {
            grid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                    <div style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Ничего не найдено</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                        Попробуйте изменить параметры фильтрации или сбросить фильтры
                    </p>
                    <button onclick="app.pages.ground.resetFilters()" class="btn btn-primary">
                        <i class="fas fa-redo"></i>
                        Сбросить фильтры
                    </button>
                </div>
            `;
        } else {
            grid.innerHTML = this.filteredVehicles.map(vehicle => this.renderVehicleCard(vehicle)).join('');
        }

        this.updateVehiclesCount();
        this.setupVehicleCardEvents();
    },

    renderVehicleCard(vehicle) {
        const countryNames = {
            'russia': 'Россия / СССР',
            'usa': 'США',
            'germany': 'Германия',
            'uk': 'Великобритания',
            'france': 'Франция',
            'china': 'Китай',
            'japan': 'Япония',
            'israel': 'Израиль',
            'italy': 'Италия',
            'sweden': 'Швеция',
            'ukraine': 'Украина',
            'poland': 'Польша',
            'czech': 'Чехия'
        };

        const categoryNames = {
            'mbt': 'ОБТ',
            'light_tank': 'Легкий танк',
            'medium_tank': 'Средний танк',
            'heavy_tank': 'Тяжелый танк',
            'ifv': 'БМП',
            'apc': 'БТР',
            'spg': 'САУ',
            'spaa': 'ЗСУ',
            'mrap': 'Бронеавтомобиль',
            'engineering': 'Инженерная'
        };

        const eraNames = {
            'ww1': 'WWI',
            'interwar': 'Межвоенный',
            'ww2': 'WWII',
            'cold_war': 'Холодная война',
            'modern': 'Современный'
        };

        return `
            <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
                <div class="vehicle-image">
                    <div class="image-placeholder">
                        <i class="fas fa-tank"></i>
                    </div>
                    <div class="vehicle-badge">${categoryNames[vehicle.category]}</div>
                    <div class="vehicle-era">${eraNames[vehicle.era]}</div>
                </div>
                <div class="vehicle-content">
                    <div class="vehicle-header">
                        <h3 class="vehicle-name">${vehicle.name}</h3>
                        <span class="vehicle-year">${vehicle.year}</span>
                    </div>
                    <p class="vehicle-description">${vehicle.description}</p>
                    <div class="vehicle-specs">
                        <div class="vehicle-spec">
                            <span class="spec-label">Страна</span>
                            <span class="spec-value">${countryNames[vehicle.country]}</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Масса</span>
                            <span class="spec-value">${vehicle.weight} т</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Экипаж</span>
                            <span class="spec-value">${vehicle.crew} чел.</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Орудие</span>
                            <span class="spec-value">${vehicle.main_gun} мм</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Скорость</span>
                            <span class="spec-value">${vehicle.speed} км/ч</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Двигатель</span>
                            <span class="spec-value">${vehicle.engine_power} л.с.</span>
                        </div>
                    </div>
                    <div class="vehicle-actions">
                        <button class="btn btn-primary btn-full" onclick="app.navigateToVehicle('${vehicle.id}')">
                            <i class="fas fa-info-circle"></i>
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    setupVehicleCardEvents() {
        document.querySelectorAll('.vehicle-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const vehicleId = card.dataset.vehicleId;
                    app.navigateToVehicle(vehicleId);
                }
            });
        });
    },

    updateVehiclesCount() {
        document.getElementById('vehicles-count').textContent = this.filteredVehicles.length;
        document.getElementById('results-count').textContent = this.filteredVehicles.length;
    },

    updateActiveFilters() {
        const activeFiltersContainer = document.getElementById('active-filters');
        const activeFilters = [];

        // Функция для добавления фильтра
        const addFilter = (key, label, value) => {
            if (value) {
                activeFilters.push({ key, label, value });
            }
        };

        // Основные фильтры
        addFilter('search', `Поиск: "${this.filters.search}"`, this.filters.search);

        const categoryLabels = {
            'mbt': 'ОБТ', 'light_tank': 'Легкий танк', 'medium_tank': 'Средний танк',
            'heavy_tank': 'Тяжелый танк', 'ifv': 'БМП', 'apc': 'БТР',
            'spg': 'САУ', 'spaa': 'ЗСУ', 'mrap': 'Бронеавтомобиль', 'engineering': 'Инженерная'
        };
        addFilter('category', `Класс: ${categoryLabels[this.filters.category]}`, this.filters.category);

        const countryLabels = {
            'russia': 'Россия / СССР', 'usa': 'США', 'germany': 'Германия',
            'uk': 'Великобритания', 'france': 'Франция', 'china': 'Китай',
            'japan': 'Япония', 'israel': 'Израиль'
        };
        addFilter('country', `Страна: ${countryLabels[this.filters.country]}`, this.filters.country);

        const eraLabels = {
            'ww1': 'Первая мировая', 'interwar': 'Межвоенный период',
            'ww2': 'Вторая мировая', 'cold_war': 'Холодная война', 'modern': 'Современность'
        };
        addFilter('era', `Период: ${eraLabels[this.filters.era]}`, this.filters.era);

        if (this.filters.weight_min || this.filters.weight_max) {
            const min = this.filters.weight_min || '0';
            const max = this.filters.weight_max || '∞';
            addFilter('weight', `Масса: ${min}-${max} т`, 'weight');
        }

        if (this.filters.crew_min || this.filters.crew_max) {
            const min = this.filters.crew_min || '1';
            const max = this.filters.crew_max || '∞';
            addFilter('crew', `Экипаж: ${min}-${max} чел.`, 'crew');
        }

        // Расширенные фильтры
        const rangeLabels = {
            'main_gun': 'Калибр орудия',
            'engine_power': 'Мощность двигателя',
            'speed': 'Макс. скорость',
            'road_range': 'Запас хода',
            'trench_width': 'Ширина рва',
            'ammunition': 'Боекомплект'
        };

        Object.keys(rangeLabels).forEach(key => {
            if (this.filters[key]) {
                addFilter(key, `${rangeLabels[key]}: ${this.filters[key]}`, this.filters[key]);
            }
        });

        if (this.filters.armor) {
            const armorLabels = {
                'light': 'Легкое', 'medium': 'Среднее', 'heavy': 'Тяжелое',
                'composite': 'Композитное', 'reactive': 'Динамическая защита'
            };
            addFilter('armor', `Броня: ${armorLabels[this.filters.armor]}`, this.filters.armor);
        }

        if (this.filters.production_years) {
            addFilter('production_years', `Годы: ${this.filters.production_years}`, this.filters.production_years);
        }

        if (activeFilters.length === 0) {
            activeFiltersContainer.innerHTML = '';
        } else {
            activeFiltersContainer.innerHTML = activeFilters.map(filter => `
                <div class="active-filter">
                    <span>${filter.label}</span>
                    <button class="remove-filter" data-filter-key="${filter.key}" data-filter-value="${filter.value}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');

            // Добавляем обработчики для кнопок удаления фильтров
            document.querySelectorAll('.remove-filter').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const key = button.dataset.filterKey;
                    this.removeFilter(key, button.dataset.filterValue);
                });
            });
        }
    },

    removeFilter(key, value) {
        // Сбрасываем фильтр
        this.filters[key] = '';
        
        // Сбрасываем соответствующий элемент DOM
        const elementIds = {
            'search': 'search-filter',
            'category': 'category-filter',
            'country': 'country-filter',
            'era': 'era-filter',
            'weight': ['weight-min', 'weight-max'],
            'crew': ['crew-min', 'crew-max'],
            'main_gun': 'main-gun-filter',
            'engine_power': 'engine-filter',
            'armor': 'armor-filter',
            'speed': 'speed-filter',
            'road_range': 'road-range-filter',
            'trench_width': 'trench-filter',
            'ammunition': 'ammo-filter',
            'production_years': 'production-filter'
        };

        const elementId = elementIds[key];
        if (Array.isArray(elementId)) {
            elementId.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
        } else if (elementId) {
            const element = document.getElementById(elementId);
            if (element) element.value = '';
        }

        this.applyFilters();
    },

    addCatalogStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Стиль для эры на карточке */
            .vehicle-era {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: var(--accent-blue);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.7rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            /* Улучшенная сетка спецификаций */
            .vehicle-specs {
                grid-template-columns: repeat(3, 1fr);
            }

            @media (max-width: 768px) {
                .vehicle-specs {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 480px) {
                .vehicle-specs {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Сохраняем ссылку на страницу в глобальной области видимости
window.app = window.app || {};
window.app.pages = window.app.pages || {};
window.app.pages.ground = GroundPage;

export default GroundPage;
