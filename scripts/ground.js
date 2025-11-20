// Ground Equipment Page JavaScript with Working Filters

// Sample equipment data
const equipmentData = [
    {
        id: 1,
        name: "T-14 Армата",
        type: "mbt",
        subtype: "Основной боевой танк",
        country: "ru",
        year: 2015,
        mass: 55,
        crew: 3,
        enginePower: 1500,
        speed: 80,
        range: 500,
        engineType: "diesel",
        mainGun: 125,
        gunType: ["smoothbore"],
        ammunition: 45,
        additionalWeapons: ["pkt", "atgm"],
        armorType: ["composite", "reactive"],
        frontalArmor: 900,
        protectionSystems: ["aps", "era", "smoke"],
        features: ["ДЗ «Малахит»", "КАЗ «Афганит»", "125 мм 2А82"]
    },
    {
        id: 2,
        name: "M1A2 Abrams",
        type: "mbt",
        subtype: "Основной боевой танк",
        country: "us",
        year: 1992,
        mass: 63.9,
        crew: 4,
        enginePower: 1500,
        speed: 67,
        range: 425,
        engineType: "turbine",
        mainGun: 120,
        gunType: ["smoothbore"],
        ammunition: 42,
        additionalWeapons: ["pkt", "aagun"],
        armorType: ["composite", "era"],
        frontalArmor: 800,
        protectionSystems: ["era", "smoke", "nbc"],
        features: ["ГТД 1500 л.с.", "СУО CITV", "ДЗ"]
    },
    {
        id: 3,
        name: "Leopard 2A7",
        type: "mbt",
        subtype: "Основной боевой танк",
        country: "de",
        year: 2014,
        mass: 67,
        crew: 4,
        enginePower: 1500,
        speed: 72,
        range: 450,
        engineType: "diesel",
        mainGun: 120,
        gunType: ["smoothbore"],
        ammunition: 42,
        additionalWeapons: ["pkt", "aagun"],
        armorType: ["composite", "reactive"],
        frontalArmor: 850,
        protectionSystems: ["era", "smoke", "laser"],
        features: ["DM63", "PERI-RTWL", "CLARA"]
    },
    {
        id: 4,
        name: "БМП-3",
        type: "ifv",
        subtype: "Боевая машина пехоты",
        country: "ru",
        year: 1987,
        mass: 18.7,
        crew: 3,
        enginePower: 500,
        speed: 70,
        range: 600,
        engineType: "diesel",
        mainGun: 100,
        gunType: ["smoothbore"],
        ammunition: 40,
        additionalWeapons: ["pkt", "atgm", "grenade"],
        armorType: ["aluminum"],
        frontalArmor: 100,
        protectionSystems: ["smoke", "nbc"],
        features: ["100 мм 2А70", "30 мм 2А72", "ПТУР «Штурм»"]
    },
    {
        id: 5,
        name: "M2 Bradley",
        type: "ifv",
        subtype: "Боевая машина пехоты",
        country: "us",
        year: 1981,
        mass: 27.6,
        crew: 3,
        enginePower: 600,
        speed: 66,
        range: 400,
        engineType: "diesel",
        mainGun: 25,
        gunType: ["autocannon"],
        ammunition: 900,
        additionalWeapons: ["pkt", "atgm"],
        armorType: ["aluminum"],
        frontalArmor: 150,
        protectionSystems: ["smoke"],
        features: ["25 мм M242", "ПТУР TOW", "Десант 7 чел"]
    },
    {
        id: 6,
        name: "2С19 Мста-С",
        type: "spg",
        subtype: "Самоходная гаубица",
        country: "ru",
        year: 1989,
        mass: 42,
        crew: 5,
        enginePower: 840,
        speed: 60,
        range: 500,
        engineType: "diesel",
        mainGun: 152,
        gunType: ["howitzer"],
        ammunition: 50,
        additionalWeapons: ["nsvt"],
        armorType: ["steel"],
        frontalArmor: 50,
        protectionSystems: ["nbc"],
        features: ["152 мм 2А64", "Дальность 29 км", "АСУНО"]
    },
    {
        id: 7,
        name: "PzH 2000",
        type: "spg",
        subtype: "Самоходная гаубица",
        country: "de",
        year: 1998,
        mass: 55.8,
        crew: 5,
        enginePower: 1000,
        speed: 60,
        range: 420,
        engineType: "diesel",
        mainGun: 155,
        gunType: ["howitzer"],
        ammunition: 60,
        additionalWeapons: ["pkt"],
        armorType: ["steel"],
        frontalArmor: 60,
        protectionSystems: ["nbc"],
        features: ["155 мм L52", "Дальность 40 км", "Автозаряжание"]
    },
    {
        id: 8,
        name: "Т-90М",
        type: "mbt",
        subtype: "Основной боевой танк",
        country: "ru",
        year: 2017,
        mass: 48,
        crew: 3,
        enginePower: 1130,
        speed: 65,
        range: 550,
        engineType: "diesel",
        mainGun: 125,
        gunType: ["smoothbore"],
        ammunition: 43,
        additionalWeapons: ["pkt", "nsvt"],
        armorType: ["composite", "reactive"],
        frontalArmor: 800,
        protectionSystems: ["era", "smoke", "laser"],
        features: ["ДЗ «Реликт»", "СУО «Калина»", "125 мм 2А46М-5"]
    }
];

let currentFilters = {};
let currentSort = 'name';
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', function() {
    initGroundPage();
    renderEquipment(equipmentData);
});

function initGroundPage() {
    initFilterTabs();
    initRangeSliders();
    initFilterTags();
    initViewControls();
    initEquipmentCards();
    initPagination();
    initSortControls();
    setupFilterListeners();
}

// Setup filter event listeners
function setupFilterListeners() {
    // Select filters
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Range inputs
    document.querySelectorAll('.range-input').forEach(input => {
        input.addEventListener('input', applyFilters);
    });
    
    // Checkboxes
    document.querySelectorAll('.checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Sliders
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', function() {
            const valueDisplay = this.parentElement.querySelector('#mass-value') || 
                               this.parentElement.querySelector('#crew-value');
            if (valueDisplay) {
                if (this.classList.contains('mass-slider')) {
                    valueDisplay.textContent = `${this.value} т`;
                } else if (this.classList.contains('crew-slider')) {
                    valueDisplay.textContent = `${this.value} чел`;
                }
            }
            applyFilters();
        });
    });
}

// Apply filters and sort
function applyFilters() {
    const filters = getCurrentFilters();
    currentFilters = filters;
    
    let filteredData = equipmentData.filter(item => {
        // Type filter
        if (filters.type.length > 0 && !filters.type.includes(item.type)) {
            return false;
        }
        
        // Country filter
        if (filters.country.length > 0 && !filters.country.includes(item.country)) {
            return false;
        }
        
        // Year filter
        if (filters.years.min && item.year < parseInt(filters.years.min)) return false;
        if (filters.years.max && item.year > parseInt(filters.years.max)) return false;
        
        // Mass filter
        if (filters.mass && item.mass > parseInt(filters.mass)) return false;
        
        // Crew filter
        if (filters.crew && item.crew > parseInt(filters.crew)) return false;
        
        // Engine power filter
        if (filters.enginePower.min && item.enginePower < parseInt(filters.enginePower.min)) return false;
        if (filters.enginePower.max && item.enginePower > parseInt(filters.enginePower.max)) return false;
        
        // Speed filter
        if (filters.speed.min && item.speed < parseInt(filters.speed.min)) return false;
        if (filters.speed.max && item.speed > parseInt(filters.speed.max)) return false;
        
        // Range filter
        if (filters.range.min && item.range < parseInt(filters.range.min)) return false;
        if (filters.range.max && item.range > parseInt(filters.range.max)) return false;
        
        // Engine type filter
        if (filters.engineType && filters.engineType !== '' && item.engineType !== filters.engineType) {
            return false;
        }
        
        // Main gun filter
        if (filters.mainGun.min && item.mainGun < parseInt(filters.mainGun.min)) return false;
        if (filters.mainGun.max && item.mainGun > parseInt(filters.mainGun.max)) return false;
        
        // Gun type filter
        if (filters.gunType.length > 0 && !filters.gunType.some(type => item.gunType.includes(type))) {
            return false;
        }
        
        // Ammunition filter
        if (filters.ammunition.min && item.ammunition < parseInt(filters.ammunition.min)) return false;
        if (filters.ammunition.max && item.ammunition > parseInt(filters.ammunition.max)) return false;
        
        // Additional weapons filter
        if (filters.additionalWeapons.length > 0 && 
            !filters.additionalWeapons.some(weapon => item.additionalWeapons.includes(weapon))) {
            return false;
        }
        
        // Armor type filter
        if (filters.armorType.length > 0 && 
            !filters.armorType.some(type => item.armorType.includes(type))) {
            return false;
        }
        
        // Frontal armor filter
        if (filters.frontalArmor.min && item.frontalArmor < parseInt(filters.frontalArmor.min)) return false;
        if (filters.frontalArmor.max && item.frontalArmor > parseInt(filters.frontalArmor.max)) return false;
        
        // Protection systems filter
        if (filters.protectionSystems.length > 0 && 
            !filters.protectionSystems.some(system => item.protectionSystems.includes(system))) {
            return false;
        }
        
        return true;
    });
    
    // Apply sorting
    filteredData = sortEquipment(filteredData, currentSort);
    
    // Update results count
    updateResultsCount(filteredData.length);
    
    // Render filtered equipment
    renderEquipment(filteredData);
    
    // Update filter tags
    updateFilterTags(filters);
}

function getCurrentFilters() {
    return {
        type: getSelectedValues('.filter-select[multiple]:first-of-type'),
        country: getSelectedValues('.filter-select[multiple]:nth-of-type(2)'),
        years: getRangeValues('.range-input:nth-of-type(1)'),
        mass: getSliderValue('.mass-slider'),
        crew: getSliderValue('.crew-slider'),
        enginePower: getRangeValues('.range-input:nth-of-type(3)'),
        speed: getRangeValues('.range-input:nth-of-type(5)'),
        range: getRangeValues('.range-input:nth-of-type(7)'),
        engineType: getSelectedValue('.filter-select:not([multiple]):first-of-type'),
        mainGun: getRangeValues('.range-input:nth-of-type(9)'),
        gunType: getSelectedValues('.filter-select[multiple]:nth-of-type(3)'),
        ammunition: getRangeValues('.range-input:nth-of-type(11)'),
        additionalWeapons: getCheckedValues('.checkbox-group:first-of-type input[type="checkbox"]'),
        armorType: getSelectedValues('.filter-select[multiple]:nth-of-type(4)'),
        frontalArmor: getRangeValues('.range-input:nth-of-type(13)'),
        protectionSystems: getCheckedValues('.checkbox-group:nth-of-type(2) input[type="checkbox"]')
    };
}

function sortEquipment(data, sortBy) {
    return [...data].sort((a, b) => {
        switch(sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'year':
                return b.year - a.year;
            case 'country':
                return a.country.localeCompare(b.country);
            case 'mass':
                return b.mass - a.mass;
            case 'firepower':
                return b.mainGun - a.mainGun;
            default:
                return 0;
        }
    });
}

function initSortControls() {
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        applyFilters();
    });
}

function updateResultsCount(count) {
    const applyBtn = document.querySelector('.apply-filters');
    applyBtn.innerHTML = `<i class="fas fa-search"></i> Показать результаты (${count})`;
}

function renderEquipment(data) {
    const grid = document.getElementById('equipment-grid');
    
    if (data.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Техника не найдена</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
                <button class="btn-primary" onclick="resetFilters()">Сбросить фильтры</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = data.map(item => createEquipmentCard(item)).join('');
    initEquipmentCards();
}

function createEquipmentCard(item) {
    const countryNames = {
        ru: 'Россия', us: 'США', de: 'Германия', fr: 'Франция',
        uk: 'Великобритания', cn: 'Китай', jp: 'Япония',
        kr: 'Южная Корея', il: 'Израиль', ua: 'Украина',
        pl: 'Польша', se: 'Швеция'
    };
    
    const typeNames = {
        mbt: 'ОБТ', 'light-tank': 'ЛТ', 'heavy-tank': 'ТТ',
        ifv: 'БМП', apc: 'БТР', spg: 'САУ', mlrs: 'РСЗО',
        atgm: 'ПТРК', spaa: 'ЗСУ', sam: 'ЗРК',
        engineering: 'Инж', recon: 'Разв'
    };
    
    return `
        <div class="equipment-card" data-id="${item.id}">
            <div class="card-image">
                <div class="image-placeholder">${item.name}</div>
                <div class="card-badges">
                    <span class="badge country ${item.country}">${countryNames[item.country]}</span>
                    <span class="badge type ${item.type}">${typeNames[item.type]}</span>
                    <span class="badge year">${item.year}</span>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-subtitle">${item.subtype}</p>
                
                <div class="card-stats">
                    <div class="stat">
                        <i class="fas fa-weight-hanging"></i>
                        <span>${item.mass} т</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-user"></i>
                        <span>${item.crew} чел</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-crosshairs"></i>
                        <span>${item.mainGun} мм</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${item.speed} км/ч</span>
                    </div>
                </div>

                <div class="card-features">
                    ${item.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
                </div>

                <div class="card-actions">
                    <button class="btn-primary" onclick="viewEquipmentDetail(${item.id})">Подробнее</button>
                    <button class="btn-secondary" onclick="toggleFavorite(${item.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateFilterTags(filters) {
    const tagsContainer = document.querySelector('.filter-tags');
    tagsContainer.innerHTML = '';
    
    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
            value.forEach(val => {
                if (val) {
                    const tag = createFilterTag(getFilterDisplayName(key, val), key, val);
                    tagsContainer.appendChild(tag);
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            if (value.min && value.max) {
                const tag = createFilterTag(`${key === 'years' ? 'Годы' : key}: ${value.min}-${value.max}`, key);
                tagsContainer.appendChild(tag);
            }
        } else if (value) {
            const tag = createFilterTag(getFilterDisplayName(key, value), key, value);
            tagsContainer.appendChild(tag);
        }
    });
}

function getFilterDisplayName(filterKey, value) {
    const displays = {
        type: {
            mbt: 'ОБТ', 'light-tank': 'Легкий танк', 'heavy-tank': 'Тяжелый танк',
            ifv: 'БМП', apc: 'БТР', spg: 'САУ', mlrs: 'РСЗО',
            atgm: 'ПТРК', spaa: 'ЗСУ', sam: 'ЗРК',
            engineering: 'Инженерная', recon: 'Разведывательная'
        },
        country: {
            ru: 'Россия', us: 'США', de: 'Германия', fr: 'Франция',
            uk: 'Великобритания', cn: 'Китай', jp: 'Япония',
            kr: 'Южная Корея', il: 'Израиль', ua: 'Украина',
            pl: 'Польша', se: 'Швеция'
        },
        mass: `Масса до ${value} т`,
        crew: `Экипаж до ${value} чел`,
        engineType: {
            diesel: 'Дизельный', gasoline: 'Бензиновый', turbine: 'Газотурбинный',
            hybrid: 'Гибридный', electric: 'Электрический'
        }[value],
        // Add more display names as needed
    };
    
    return displays[filterKey]?.[value] || value;
}

// Keep the existing utility functions and other code...

// Add these new functions
function resetFilters() {
    document.querySelector('.reset-filters').click();
    applyFilters();
}

function viewEquipmentDetail(id) {
    // Navigate to equipment detail page
    console.log('View equipment detail:', id);
    // In real app: window.location.href = `equipment-detail.html?id=${id}`;
}

function toggleFavorite(id) {
    const btn = document.querySelector(`.equipment-card[data-id="${id}"] .btn-secondary`);
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.className = 'fas fa-heart';
        btn.style.color = 'var(--accent-color)';
        btn.style.borderColor = 'var(--accent-color)';
    } else {
        icon.className = 'far fa-heart';
        btn.style.color = '';
        btn.style.borderColor = '';
    }
}

// Update the HTML to add slider classes
document.addEventListener('DOMContentLoaded', function() {
    // Add classes to sliders for identification
    const massSlider = document.querySelector('.slider');
    if (massSlider) massSlider.classList.add('mass-slider');
    
    const crewSlider = document.querySelector('.slider:nth-of-type(2)');
    if (crewSlider) crewSlider.classList.add('crew-slider');
});
