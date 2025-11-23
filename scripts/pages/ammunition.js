// Страница боеприпасов
const AmmunitionPage = {
    async render() {
        return `
            <div class="page-header">
                <div class="container">
                    <div class="breadcrumbs">
                        <a href="#/">Главная</a>
                        <span class="breadcrumb-separator">/</span>
                        <span class="breadcrumb-current">Боеприпасы</span>
                    </div>
                    <h1>Боеприпасы и вооружение</h1>
                    <p>Раздел находится в разработке. Скоро здесь появятся ракеты, снаряды и другое вооружение.</p>
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
        console.log('Ammunition page initialized');
    }
};

export default AmmunitionPage;
