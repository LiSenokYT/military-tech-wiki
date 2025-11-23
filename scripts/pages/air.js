// Страница воздушной техники
const AirPage = {
    async render() {
        return `
            <div class="page-header">
                <div class="container">
                    <div class="breadcrumbs">
                        <a href="#/">Главная</a>
                        <span class="breadcrumb-separator">/</span>
                        <span class="breadcrumb-current">Воздушная техника</span>
                    </div>
                    <h1>Воздушная военная техника</h1>
                    <p>Раздел находится в разработке. Скоро здесь появятся самолеты, вертолеты и БПЛА.</p>
                    <div class="page-actions">
                        <a href="#/ground" class="btn btn-primary">
                            <i class="fas fa-tank"></i>
                            Перейти к наземной технике
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    async init() {
        console.log('Air page initialized');
    }
};

export default AirPage;
