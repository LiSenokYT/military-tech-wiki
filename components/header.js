// Header component for reuse across pages
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header class="main-header">
                <div class="container">
                    <nav class="navbar">
                        <div class="logo">
                            <h1>MilitaryTech<span>Wiki</span></h1>
                        </div>
                        <ul class="nav-menu">
                            <li><a href="index.html" class="nav-link">Главная</a></li>
                            <li><a href="ground.html" class="nav-link">Наземная</a></li>
                            <li><a href="air.html" class="nav-link">Воздушная</a></li>
                            <li><a href="naval.html" class="nav-link">Морская</a></li>
                            <li><a href="ammo.html" class="nav-link">Боеприпасы</a></li>
                        </ul>
                        <div class="search-box">
                            <input type="text" placeholder="Поиск техники..." id="searchInput">
                            <button class="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
        `;
    }
}

// Define the custom element
customElements.define('header-component', HeaderComponent);
