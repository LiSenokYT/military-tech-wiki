// Главная страница
const HomePage = {
    async render() {
        return `
            <!-- Герой секция -->
            <section class="hero-section">
                <div class="hero-background">
                    <div class="hero-particles"></div>
                </div>
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-text">
                            <div class="hero-badge">
                                <i class="fas fa-star"></i>
                                <span>Крупнейшая военная энциклопедия Рунета</span>
                            </div>
                            <h1 class="hero-title">
                                <span class="title-line">Энциклопедия</span>
                                <span class="title-line accent">Военной Техники</span>
                            </h1>
                            <p class="hero-description">
                                От первых танков Mark I до современных истребителей 5-го поколения. 
                                Полная информация о тысячах единиц военной техники со всего мира: 
                                подробные ТТХ, исторические справки, фотографии и 3D-модели.
                            </p>
                            <div class="hero-stats">
                                <div class="hero-stat">
                                    <div class="stat-value">1000+</div>
                                    <div class="stat-label">Единиц техники</div>
                                </div>
                                <div class="hero-stat">
                                    <div class="stat-value">50+</div>
                                    <div class="stat-label">Стран мира</div>
                                </div>
                                <div class="hero-stat">
                                    <div class="stat-value">80+</div>
                                    <div class="stat-label">Лет истории</div>
                                </div>
                            </div>
                            <div class="hero-actions">
                                <a href="#/ground" class="btn btn-primary btn-large">
                                    <i class="fas fa-search"></i>
                                    Начать исследование
                                </a>
                                <a href="#/about" class="btn btn-secondary btn-large">
                                    <i class="fas fa-info-circle"></i>
                                    О проекте
                                </a>
                            </div>
                        </div>
                        <div class="hero-visual">
                            <div class="floating-tech">
                                <div class="tech-item tank" data-tech="tank">
                                    <i class="fas fa-tank"></i>
                                    <span>Танки</span>
                                </div>
                                <div class="tech-item plane" data-tech="plane">
                                    <i class="fas fa-fighter-jet"></i>
                                    <span>Самолеты</span>
                                </div>
                                <div class="tech-item ship" data-tech="ship">
                                    <i class="fas fa-ship"></i>
                                    <span>Корабли</span>
                                </div>
                                <div class="tech-item missile" data-tech="missile">
                                    <i class="fas fa-missile"></i>
                                    <span>Ракеты</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Секция возможностей -->
            <section class="capabilities-section">
                <div class="container">
                    <div class="section-header">
                        <h2>Что мы предлагаем</h2>
                        <p>Полный набор инструментов для изучения военной техники</p>
                    </div>
                    <div class="capabilities-grid">
                        <div class="capability-card">
                            <div class="capability-icon">
                                <i class="fas fa-database"></i>
                            </div>
                            <h3>Полная база данных</h3>
                            <p>Самая большая коллекция военной техники в Рунете: танки, БМП, самолеты, корабли, ракеты и многое другое</p>
                            <ul class="capability-features">
                                <li><i class="fas fa-check"></i> 1000+ единиц техники</li>
                                <li><i class="fas fa-check"></i> 50+ стран производителей</li>
                                <li><i class="fas fa-check"></i> От WWI до современных образцов</li>
                            </ul>
                        </div>
                        <div class="capability-card">
                            <div class="capability-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3>Умный поиск и фильтры</h3>
                            <p>Мощная система фильтрации по десяткам параметров: тип, страна, калибр, масса, экипаж и многое другое</p>
                            <ul class="capability-features">
                                <li><i class="fas fa-check"></i> Фильтр по 20+ параметрам</li>
                                <li><i class="fas fa-check"></i> Быстрый поиск</li>
                                <li><i class="fas fa-check"></i> Сохранение результатов</li>
                            </ul>
                        </div>
                        <div class="capability-card">
                            <div class="capability-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3>Детальные характеристики</h3>
                            <p>Исчерпывающая информация по каждой единице техники: ТТХ, вооружение, бронирование, история службы</p>
                            <ul class="capability-features">
                                <li><i class="fas fa-check"></i> Полные ТТХ</li>
                                <li><i class="fas fa-check"></i> Исторические справки</li>
                                <li><i class="fas fa-check"></i> Модификации</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Секция категорий -->
            <section class="categories-section">
                <div class="container">
                    <div class="section-header">
                        <h2>Основные разделы</h2>
                        <p>Исследуйте технику по категориям</p>
                    </div>
                    <div class="categories-grid">
                        <a href="#/ground" class="category-card ground-tech">
                            <div class="category-icon">
                                <i class="fas fa-tank"></i>
                            </div>
                            <h3>Наземная техника</h3>
                            <p>Танки, БМП, БТР, САУ, ЗСУ и другая бронетанковая техника</p>
                            <div class="category-stats">
                                <span class="count">400+ единиц</span>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </a>
                        <a href="#/air" class="category-card air-tech">
                            <div class="category-icon">
                                <i class="fas fa-fighter-jet"></i>
                            </div>
                            <h3>Авиация</h3>
                            <p>Истребители, бомбардировщики, вертолеты, транспортные самолеты</p>
                            <div class="category-stats">
                                <span class="count">300+ единиц</span>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </a>
                        <a href="#/naval" class="category-card naval-tech">
                            <div class="category-icon">
                                <i class="fas fa-ship"></i>
                            </div>
                            <h3>Флот</h3>
                            <p>Авианосцы, эсминцы, подлодки, фрегаты, катера и корабли поддержки</p>
                            <div class="category-stats">
                                <span class="count">200+ единиц</span>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </a>
                        <a href="#/ammunition" class="category-card ammo-tech">
                            <div class="category-icon">
                                <i class="fas fa-missile"></i>
                            </div>
                            <h3>Вооружение</h3>
                            <p>Ракеты, снаряды, бомбы, торпеды и другое вооружение</p>
                            <div class="category-stats">
                                <span class="count">100+ видов</span>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Секция избранной техники -->
            <section class="featured-section">
                <div class="container">
                    <div class="section-header">
                        <h2>Избранная техника</h2>
                        <p>Самые известные и значимые образцы военной техники</p>
                    </div>
                    <div class="featured-grid">
                        <div class="featured-card">
                            <div class="featured-image">
                                <div class="image-placeholder">
                                    <i class="fas fa-tank"></i>
                                </div>
                            </div>
                            <div class="featured-content">
                                <h3>Т-72Б3</h3>
                                <p class="featured-description">
                                    Российский основной боевой танк. Модернизация танка Т-72Б с улучшенной системой управления огнем и динамической защитой.
                                </p>
                                <div class="featured-specs">
                                    <div class="spec">
                                        <span class="spec-label">Калибр:</span>
                                        <span class="spec-value">125 мм</span>
                                    </div>
                                    <div class="spec">
                                        <span class="spec-label">Экипаж:</span>
                                        <span class="spec-value">3 чел.</span>
                                    </div>
                                    <div class="spec">
                                        <span class="spec-label">Масса:</span>
                                        <span class="spec-value">46 т</span>
                                    </div>
                                </div>
                                <button class="btn btn-secondary" onclick="window.navigateToVehicle('t-72b3')">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                        <div class="featured-card">
                            <div class="featured-image">
                                <div class="image-placeholder">
                                    <i class="fas fa-fighter-jet"></i>
                                </div>
                            </div>
                            <div class="featured-content">
                                <h3>Су-57</h3>
                                <p class="featured-description">
                                    Российский многофункциональный истребитель пятого поколения. Оснащен стелс-технологиями и современным БРЭО.
                                </p>
                                <div class="featured-specs">
                                    <div class="spec">
                                        <span class="spec-label">Скорость:</span>
                                        <span class="spec-value">Мах 2.0</span>
                                    </div>
                                    <div class="spec">
                                        <span class="spec-label">Дальность:</span>
                                        <span class="spec-value">5500 км</span>
                                    </div>
                                    <div class="spec">
                                        <span class="spec-label">Вооружение:</span>
                                        <span class="spec-value">14 точек</span>
                                    </div>
                                </div>
                                <button class="btn btn-secondary" onclick="window.navigateToVehicle('su-57')">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                        <div class="featured-card">
                            <div class="featured-image">
                                <div class="image-placeholder">
                                    <i class="fas fa-ship"></i>
                                </div>
                            </div>
                            <div class="featured-content">
                                <h3>Авианосец «Адмирал Кузнецов»</h3>
                                <p class="featured-description">
                                    Тяжелый авианесущий крейсер проекта 1143.5. Единственный авианосец ВМФ России.
                                </p>
                                <div class="featured-specs">
                                    <div class="spec">
                                        <span class="spec-label">Водоизм.:</span>
                                        <span class="spec-value">61 390 т</span>
                                    </div>
                                    <div class="spec">
                                        <span class="spec-label">Длина:</span>
                                        <span class="spec-value">306 м</span>
                                    </div>
                                    <div class="spec">
                                        <span class="spec-label">Авиагруппа:</span>
                                        <span class="spec-value">50 летательных аппаратов</span>
                                    </div>
                                </div>
                                <button class="btn btn-secondary" onclick="window.navigateToVehicle('kuznetsov')">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Секция статистики -->
            <section class="stats-section">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-tank"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">400+</div>
                                <div class="stat-label">Наземной техники</div>
                                <div class="stat-description">Танки, БМП, САУ, БТР</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-fighter-jet"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">300+</div>
                                <div class="stat-label">Самолетов и вертолетов</div>
                                <div class="stat-description">Истребители, бомбардировщики, транспортники</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-ship"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">200+</div>
                                <div class="stat-label">Кораблей и судов</div>
                                <div class="stat-description">Надводные корабли и подлодки</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-missile"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">100+</div>
                                <div class="stat-label">Видов вооружения</div>
                                <div class="stat-description">Ракеты, снаряды, бомбы</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Секция CTA -->
            <section class="cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Готовы начать исследование?</h2>
                        <p>Присоединяйтесь к тысячам энтузиастов, изучающих военную технику</p>
                        <div class="cta-actions">
                            <a href="#/ground" class="btn btn-primary btn-large">
                                <i class="fas fa-search"></i>
                                Исследовать каталог
                            </a>
                            <a href="#/ground" class="btn btn-secondary btn-large">
                                <i class="fas fa-tank"></i>
                                Смотреть танки
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    async init() {
        this.addHomeStyles();
        this.setupTechAnimations();
        this.setupCounters();
    },

    addHomeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Герой секция */
            .hero-section {
                position: relative;
                min-height: 100vh;
                display: flex;
                align-items: center;
                overflow: hidden;
                background: linear-gradient(135deg, var(--bg-primary) 0%, #1a0a0a 50%, #2a0a0a 100%);
            }

            .hero-background {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
            }

            .hero-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: center;
                position: relative;
                z-index: 2;
            }

            .hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(220, 38, 38, 0.1);
                color: var(--accent-red);
                padding: 0.5rem 1rem;
                border-radius: 50px;
                border: 1px solid rgba(220, 38, 38, 0.3);
                margin-bottom: 2rem;
                font-size: 0.9rem;
                font-weight: 500;
            }

            .hero-title {
                font-size: 4rem;
                font-weight: 900;
                line-height: 1.1;
                margin-bottom: 1.5rem;
            }

            .title-line {
                display: block;
            }

            .title-line.accent {
                background: linear-gradient(135deg, var(--accent-red) 0%, var(--accent-gold) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .hero-description {
                font-size: 1.3rem;
                color: var(--text-secondary);
                margin-bottom: 2.5rem;
                line-height: 1.6;
            }

            .hero-stats {
                display: flex;
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .hero-stat {
                text-align: center;
            }

            .stat-value {
                font-size: 2.5rem;
                font-weight: 900;
                color: var(--accent-red);
                font-family: 'Orbitron', sans-serif;
            }

            .stat-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .hero-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            /* Floating Tech */
            .floating-tech {
                position: relative;
                height: 400px;
            }

            .tech-item {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                transition: var(--transition);
                animation: float 6s ease-in-out infinite;
            }

            .tech-item:hover {
                border-color: var(--accent-red);
                transform: scale(1.1);
                box-shadow: var(--shadow-glow);
            }

            .tech-item i {
                font-size: 2rem;
                color: var(--accent-red);
            }

            .tech-item span {
                font-size: 0.9rem;
                font-weight: 500;
                color: var(--text-primary);
            }

            .tech-item.tank {
                top: 20%;
                left: 10%;
                animation-delay: 0s;
            }

            .tech-item.plane {
                top: 10%;
                right: 20%;
                animation-delay: 1.5s;
            }

            .tech-item.ship {
                bottom: 20%;
                left: 20%;
                animation-delay: 3s;
            }

            .tech-item.missile {
                bottom: 10%;
                right: 10%;
                animation-delay: 4.5s;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }

            /* Секции */
            .section-header {
                text-align: center;
                margin-bottom: 4rem;
            }

            .section-header h2 {
                font-size: 3rem;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-red) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .section-header p {
                font-size: 1.3rem;
                color: var(--text-secondary);
            }

            /* Capabilities */
            .capabilities-section {
                padding: 6rem 0;
                background: var(--bg-secondary);
            }

            .capabilities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }

            .capability-card {
                background: var(--bg-card);
                padding: 3rem 2rem;
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
                transition: var(--transition);
                text-align: center;
            }

            .capability-card:hover {
                transform: translateY(-10px);
                border-color: var(--accent-red);
                box-shadow: var(--shadow-lg);
            }

            .capability-icon {
                font-size: 3rem;
                color: var(--accent-red);
                margin-bottom: 1.5rem;
            }

            .capability-card h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .capability-card p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }

            .capability-features {
                list-style: none;
                text-align: left;
            }

            .capability-features li {
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .capability-features i {
                color: var(--accent-red);
            }

            /* Categories */
            .categories-section {
                padding: 6rem 0;
            }

            .categories-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
            }

            .category-card {
                background: var(--bg-card);
                padding: 2.5rem 2rem;
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
                transition: var(--transition);
                text-decoration: none;
                color: inherit;
                position: relative;
                overflow: hidden;
            }

            .category-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--accent-red), var(--accent-gold));
                transform: scaleX(0);
                transition: var(--transition);
            }

            .category-card:hover::before {
                transform: scaleX(1);
            }

            .category-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-lg);
            }

            .category-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
            }

            .ground-tech .category-icon { color: #dc2626; }
            .air-tech .category-icon { color: #2563eb; }
            .naval-tech .category-icon { color: #059669; }
            .ammo-tech .category-icon { color: #d97706; }

            .category-card h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .category-card p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }

            .category-stats {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: var(--text-muted);
                font-size: 0.9rem;
            }

            .category-stats i {
                transition: var(--transition);
            }

            .category-card:hover .category-stats i {
                transform: translateX(5px);
                color: var(--accent-red);
            }

            /* Featured */
            .featured-section {
                padding: 6rem 0;
                background: var(--bg-secondary);
            }

            .featured-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }

            .featured-card {
                background: var(--bg-card);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
                overflow: hidden;
                transition: var(--transition);
            }

            .featured-card:hover {
                transform: translateY(-5px);
                border-color: var(--accent-red);
                box-shadow: var(--shadow-lg);
            }

            .featured-image {
                height: 200px;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .image-placeholder {
                font-size: 4rem;
                color: var(--accent-red);
                opacity: 0.7;
            }

            .featured-content {
                padding: 2rem;
            }

            .featured-card h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .featured-description {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }

            .featured-specs {
                display: grid;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .spec {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--border-light);
            }

            .spec-label {
                color: var(--text-secondary);
            }

            .spec-value {
                color: var(--text-primary);
                font-weight: 500;
            }

            /* Stats */
            .stats-section {
                padding: 6rem 0;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
            }

            .stat-card {
                background: var(--bg-card);
                padding: 2rem;
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                gap: 1.5rem;
                transition: var(--transition);
            }

            .stat-card:hover {
                border-color: var(--accent-red);
                transform: translateY(-5px);
                box-shadow: var(--shadow);
            }

            .stat-icon {
                font-size: 2.5rem;
                color: var(--accent-red);
            }

            .stat-number {
                font-size: 2rem;
                font-weight: 900;
                color: var(--text-primary);
                font-family: 'Orbitron', sans-serif;
            }

            .stat-label {
                font-size: 1.1rem;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .stat-description {
                font-size: 0.9rem;
                color: var(--text-secondary);
            }

            /* CTA */
            .cta-section {
                padding: 6rem 0;
                background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
                text-align: center;
            }

            .cta-content h2 {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .cta-content p {
                font-size: 1.3rem;
                color: var(--text-secondary);
                margin-bottom: 2.5rem;
            }

            .cta-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            /* Адаптивность */
            @media (max-width: 968px) {
                .hero-content {
                    grid-template-columns: 1fr;
                    text-align: center;
                    gap: 3rem;
                }

                .hero-title {
                    font-size: 3rem;
                }

                .hero-stats {
                    justify-content: center;
                }

                .floating-tech {
                    height: 300px;
                }

                .section-header h2 {
                    font-size: 2.5rem;
                }
            }

            @media (max-width: 768px) {
                .hero-title {
                    font-size: 2.5rem;
                }

                .hero-description {
                    font-size: 1.1rem;
                }

                .hero-stats {
                    flex-direction: column;
                    gap: 1rem;
                }

                .hero-actions {
                    justify-content: center;
                }

                .capabilities-grid,
                .categories-grid,
                .featured-grid {
                    grid-template-columns: 1fr;
                }

                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .cta-content h2 {
                    font-size: 2.5rem;
                }

                .cta-actions {
                    flex-direction: column;
                    align-items: center;
                }
            }

            @media (max-width: 480px) {
                .hero-title {
                    font-size: 2rem;
                }

                .section-header h2 {
                    font-size: 2rem;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                }

                .stat-card {
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    },

    setupTechAnimations() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 1.5}s`;
        });
    },

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number, .stat-value');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 20);
        });
    }
};

export default HomePage;
