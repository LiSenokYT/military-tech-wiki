// Главная страница
const HomePage = {
    async render() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">Энциклопедия Военной Техники</h1>
                    <p class="hero-subtitle">Исследуйте мир военной техники: от исторических танков до современных боевых систем</p>
                    <div class="hero-actions">
                        <a href="#/ground" class="btn btn-primary">Начать探索</a>
                        <a href="#/catalog" class="btn btn-secondary">Весь каталог</a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="tech-silhouettes">
                        <div class="silhouette tank"></div>
                        <div class="silhouette plane"></div>
                        <div class="silhouette ship"></div>
                    </div>
                </div>
            </section>

            <section class="features">
                <div class="section-header">
                    <h2>Что вы найдете</h2>
                    <p>Полная информация о военной технике со всего мира</p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <h3>Подробные характеристики</h3>
                        <p>Технические specs, вооружение, бронирование и многое другое</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📚</div>
                        <h3>Исторические справки</h3>
                        <p>История создания, модификации и боевое применение</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔍</div>
                        <h3>Умные фильтры</h3>
                        <p>Легкий поиск по типам, странам, характеристикам</p>
                    </div>
                </div>
            </section>

            <section class="stats">
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">1000+</div>
                        <div class="stat-label">Единиц техники</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Стран</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">80+</div>
                        <div class="stat-label">Лет истории</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Обновления</div>
                    </div>
                </div>
            </section>
        `;
    },

    async init() {
        this.addHeroStyles();
    },

    addHeroStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
                align-items: center;
                padding: 4rem 0;
            }

            .hero-title {
                font-size: 3.5rem;
                font-weight: 700;
                line-height: 1.1;
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-red) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .hero-subtitle {
                font-size: 1.3rem;
                color: var(--text-secondary);
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .hero-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .btn-primary {
                background: linear-gradient(135deg, var(--accent-red) 0%, var(--accent-red-hover) 100%);
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: var(--radius);
                font-weight: 500;
                text-decoration: none;
                transition: var(--transition);
                box-shadow: var(--shadow);
            }

            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }

            .btn-secondary {
                background: transparent;
                color: var(--text-primary);
                padding: 12px 30px;
                border: 2px solid var(--border-color);
                border-radius: var(--radius);
                font-weight: 500;
                text-decoration: none;
                transition: var(--transition);
            }

            .btn-secondary:hover {
                border-color: var(--accent-red);
                color: var(--accent-red);
            }

            .tech-silhouettes {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                height: 200px;
            }

            .silhouette {
                width: 80px;
                height: 80px;
                background-color: var(--bg-card);
                border-radius: var(--radius);
                position: relative;
                opacity: 0.7;
                transition: var(--transition);
            }

            .silhouette:hover {
                opacity: 1;
                transform: translateY(-5px);
            }

            .silhouette::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2rem;
            }

            .tank::after { content: '⚔️'; }
            .plane::after { content: '✈️'; }
            .ship::after { content: '🚢'; }

            .features {
                padding: 4rem 0;
                border-top: 1px solid var(--border-light);
                border-bottom: 1px solid var(--border-light);
                margin: 2rem 0;
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

            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
            }

            .feature-card {
                background: var(--bg-card);
                padding: 2rem;
                border-radius: var(--radius);
                border: 1px solid var(--border-color);
                transition: var(--transition);
                text-align: center;
            }

            .feature-card:hover {
                transform: translateY(-5px);
                border-color: var(--accent-red);
                box-shadow: var(--shadow-lg);
            }

            .feature-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            .feature-card h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .feature-card p {
                color: var(--text-secondary);
                line-height: 1.6;
            }

            .stats {
                padding: 3rem 0;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                text-align: center;
            }

            .stat-item {
                padding: 2rem;
            }

            .stat-number {
                font-size: 3rem;
                font-weight: 700;
                color: var(--accent-red);
                margin-bottom: 0.5rem;
            }

            .stat-label {
                font-size: 1.1rem;
                color: var(--text-secondary);
                font-weight: 500;
            }

            @media (max-width: 768px) {
                .hero {
                    grid-template-columns: 1fr;
                    text-align: center;
                    padding: 2rem 0;
                }

                .hero-title {
                    font-size: 2.5rem;
                }

                .hero-actions {
                    justify-content: center;
                }

                .tech-silhouettes {
                    height: 150px;
                }

                .silhouette {
                    width: 60px;
                    height: 60px;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

export default HomePage;
