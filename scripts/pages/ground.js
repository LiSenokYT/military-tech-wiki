// Страница наземной техники
const GroundPage = {
    vehicles: [],
    filteredVehicles: [],
    filters: {
        category: '',
        country: '',
        era: '',
        weight_min: '',
        weight_max: '',
        crew_min: '',
        crew_max: '',
        search: ''
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

    addCatalogStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Страница каталога */
            .catalog-page {
                min-height: 100vh;
            }

            /* Хедер каталога */
            .catalog-header {
                padding: 3rem 0 2rem;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
                border-bottom: 1px solid var(--border-color);
            }

            .breadcrumbs {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
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

            .catalog-header h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-red) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .catalog-description {
                font-size: 1.2rem;
                color: var(--text-secondary);
                line-height: 1.6;
                max-width: 800px;
                margin-bottom: 2rem;
            }

            .catalog-stats {
                display: flex;
                gap: 3rem;
            }

            .catalog-stat {
                text-align: center;
            }

            .catalog-stat .stat-number {
                font-size: 2rem;
                font-weight: 900;
                color: var(--accent-red);
                display: block;
                font-family: 'Orbitron', sans-serif;
            }

            .catalog-stat .stat-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            /* Секция фильтров */
            .filters-section {
                padding: 2rem 0;
                background: var(--bg-secondary);
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 70px;
                z-index: 900;
            }

            .filters-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }

            .filters-header h2 {
                font-size: 1.5rem;
                color: var(--text-primary);
            }

            .btn-small {
                padding: 0.5rem 1rem;
                font-size: 0.8rem;
            }

            .filters-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .filter-group.double {
                grid-column: span 2;
            }

            .filter-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                font-weight: 500;
                color: var(--text-primary);
            }

            .filter-label i {
                color: var(--accent-red);
                width: 16px;
            }

            .filter-input,
            .filter-select {
                padding: 0.75rem;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                color: var(--text-primary);
                font-size: 0.9rem;
                transition: var(--transition);
            }

            .filter-input:focus,
            .filter-select:focus {
                outline: none;
                border-color: var(--accent-red);
                box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
            }

            .range-inputs {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .range-input {
                flex: 1;
            }

            .range-separator {
                color: var(--text-muted);
                font-weight: 500;
            }

            /* Расширенные фильтры */
            .advanced-filters-toggle {
                text-align: center;
                margin: 1rem 0;
            }

            .advanced-filters {
                display: none;
                padding-top: 1rem;
                border-top: 1px solid var(--border-light);
            }

            .advanced-filters.show {
                display: block;
                animation: slideDown 0.3s ease;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Секция результатов */
            .results-section {
                padding: 2rem 0 4rem;
            }

            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                gap: 2rem;
            }

            .results-info h3 {
                font-size: 1.3rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }

            #results-count {
                color: var(--accent-red);
                font-weight: 700;
            }

            .active-filters {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }

            .active-filter {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.8rem;
                color: var(--text-secondary);
            }

            .active-filter .remove-filter {
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                padding: 0;
                width: 16px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: var(--transition);
            }

            .active-filter .remove-filter:hover {
                background: var(--accent-red);
                color: white;
            }

            .results-sort {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-shrink: 0;
            }

            .sort-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
                white-space: nowrap;
            }

            .sort-select {
                padding: 0.5rem;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                color: var(--text-primary);
                font-size: 0.9rem;
                min-width: 200px;
            }

            /* Сетка карточек */
            .vehicles-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1.5rem;
                margin-bottom: 3rem;
            }

            .vehicle-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                transition: var(--transition);
                cursor: pointer;
            }

            .vehicle-card:hover {
                transform: translateY(-5px);
                border-color: var(--accent-red);
                box-shadow: var(--shadow-lg);
            }

            .vehicle-image {
                height: 200px;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }

            .vehicle-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: var(--transition);
            }

            .vehicle-card:hover .vehicle-image img {
                transform: scale(1.05);
            }

            .image-placeholder {
                font-size: 3rem;
                color: var(--accent-red);
                opacity: 0.5;
            }

            .vehicle-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: var(--accent-red);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-size: 0.7rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .vehicle-content {
                padding: 1.5rem;
            }

            .vehicle-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }

            .vehicle-name {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--text-primary);
                margin: 0;
            }

            .vehicle-year {
                font-size: 0.9rem;
                color: var(--text-muted);
                background: var(--bg-primary);
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius);
                white-space: nowrap;
            }

            .vehicle-description {
                color: var(--text-secondary);
                line-height: 1.5;
                margin-bottom: 1.5rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .vehicle-specs {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }

            .vehicle-spec {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .spec-label {
                font-size: 0.7rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .spec-value {
                font-size: 0.9rem;
                color: var(--text-primary);
                font-weight: 500;
            }

            .vehicle-actions {
                display: flex;
                gap: 0.5rem;
            }

            .btn-full {
                flex: 1;
                text-align: center;
                justify-content: center;
            }

            /* Карточки загрузки */
            .loading-cards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1.5rem;
            }

            .loading-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                height: 400px;
                position: relative;
                overflow: hidden;
            }

            .loading-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
                animation: loading 1.5s infinite;
            }

            @keyframes loading {
                0% { left: -100%; }
                100% { left: 100%; }
            }

            /* Пагинация */
            .pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
                margin-top: 2rem;
            }

            .pagination-btn {
                padding: 0.5rem 1rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                border-radius: var(--radius);
                cursor: pointer;
                transition: var(--transition);
                font-size: 0.9rem;
            }

            .pagination-btn:hover:not(.disabled) {
                border-color: var(--accent-red);
                color: var(--accent-red);
            }

            .pagination-btn.active {
                background: var(--accent-red);
                border-color: var(--accent-red);
                color: white;
            }

            .pagination-btn.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .pagination-info {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin: 0 1rem;
            }

            /* Адаптивность */
            @media (max-width: 968px) {
                .filters-grid {
                    grid-template-columns: 1fr;
                }

                .filter-group.double {
                    grid-column: span 1;
                }

                .results-header {
                    flex-direction: column;
                    align-items: stretch;
                }

                .results-sort {
                    align-self: flex-end;
                }
            }

            @media (max-width: 768px) {
                .catalog-header h1 {
                    font-size: 2.5rem;
                }

                .catalog-stats {
                    flex-direction: column;
                    gap: 1rem;
                }

                .vehicles-grid {
                    grid-template-columns: 1fr;
                }

                .loading-cards {
                    grid-template-columns: 1fr;
                }

                .vehicle-specs {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 480px) {
                .catalog-header h1 {
                    font-size: 2rem;
                }

                .vehicle-header {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .pagination {
                    flex-wrap: wrap;
                }
            }
        `;
        document.head.appendChild(style);
    },

    async loadVehicles() {
        // Временные данные для демонстрации
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
                image: null
            }
        ];

        this.filteredVehicles = [...this.vehicles];
        this.updateVehiclesCount();
    },

    setupEventListeners() {
        // Слушатели для фильтров
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

            return true;
        });

        this.updateDisplay();
        this.updateActiveFilters();
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
            search: ''
        };

        // Сброс значений в DOM
        document.getElementById('search-filter').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('country-filter').value = '';
        document.getElementById('era-filter').value = '';
        document.getElementById('weight-min').value = '';
        document.getElementById('weight-max').value = '';
        document.getElementById('crew-min').value = '';
        document.getElementById('crew-max').value = '';

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

        return `
            <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
                <div class="vehicle-image">
                    <div class="image-placeholder">
                        <i class="fas fa-tank"></i>
                    </div>
                    <div class="vehicle-badge">${categoryNames[vehicle.category]}</div>
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

        if (this.filters.search) {
            activeFilters.push({
                key: 'search',
                label: `Поиск: "${this.filters.search}"`,
                value: this.filters.search
            });
        }

        if (this.filters.category) {
            const categoryLabels = {
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
            activeFilters.push({
                key: 'category',
                label: `Класс: ${categoryLabels[this.filters.category]}`,
                value: this.filters.category
            });
        }

        if (this.filters.country) {
            const countryLabels = {
                'russia': 'Россия / СССР',
                'usa': 'США',
                'germany': 'Германия',
                'uk': 'Великобритания',
                'france': 'Франция',
                'china': 'Китай',
                'japan': 'Япония',
                'israel': 'Израиль'
            };
            activeFilters.push({
                key: 'country',
                label: `Страна: ${countryLabels[this.filters.country]}`,
                value: this.filters.country
            });
        }

        if (this.filters.era) {
            const eraLabels = {
                'ww1': 'Первая мировая',
                'interwar': 'Межвоенный период',
                'ww2': 'Вторая мировая',
                'cold_war': 'Холодная война',
                'modern': 'Современность'
            };
            activeFilters.push({
                key: 'era',
                label: `Период: ${eraLabels[this.filters.era]}`,
                value: this.filters.era
            });
        }

        if (this.filters.weight_min || this.filters.weight_max) {
            const min = this.filters.weight_min || '0';
            const max = this.filters.weight_max || '∞';
            activeFilters.push({
                key: 'weight',
                label: `Масса: ${min}-${max} т`,
                value: 'weight'
            });
        }

        if (this.filters.crew_min || this.filters.crew_max) {
            const min = this.filters.crew_min || '1';
            const max = this.filters.crew_max || '∞';
            activeFilters.push({
                key: 'crew',
                label: `Экипаж: ${min}-${max} чел.`,
                value: 'crew'
            });
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
        switch (key) {
            case 'search':
                this.filters.search = '';
                document.getElementById('search-filter').value = '';
                break;
            case 'category':
                this.filters.category = '';
                document.getElementById('category-filter').value = '';
                break;
            case 'country':
                this.filters.country = '';
                document.getElementById('country-filter').value = '';
                break;
            case 'era':
                this.filters.era = '';
                document.getElementById('era-filter').value = '';
                break;
            case 'weight':
                this.filters.weight_min = '';
                this.filters.weight_max = '';
                document.getElementById('weight-min').value = '';
                document.getElementById('weight-max').value = '';
                break;
            case 'crew':
                this.filters.crew_min = '';
                this.filters.crew_max = '';
                document.getElementById('crew-min').value = '';
                document.getElementById('crew-max').value = '';
                break;
        }
        this.applyFilters();
    }
};

// Сохраняем ссылку на страницу в глобальной области видимости
window.app = window.app || {};
window.app.pages = window.app.pages || {};
window.app.pages.ground = GroundPage;

export default GroundPage;
