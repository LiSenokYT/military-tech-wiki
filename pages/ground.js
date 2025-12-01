// Логика для страницы наземной техники - новая версия
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    const totalCountElement = document.getElementById('totalCount');
    const totalCountElement2 = document.getElementById('totalCount2');
    const foundCountElement = document.getElementById('foundCount');
    const quickSearch = document.getElementById('quickSearch');
    const searchButton = document.getElementById('searchButton');
    const sortBy = document.getElementById('sortBy');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const resetNoResultsBtn = document.getElementById('resetNoResults');
    const noResults = document.getElementById('noResults');
    const viewButtons = document.querySelectorAll('.view-btn');
    const typeButtons = document.querySelectorAll('.type-btn');
    const toggleAdvancedBtn = document.getElementById('toggleAdvancedFilters');
    const advancedFilters = document.getElementById('advancedFilters');
    const applyAdvancedBtn = document.getElementById('applyAdvancedFilters');
    const closeAdvancedBtn = document.getElementById('closeAdvancedFilters');
    const clearAllFiltersBtn = document.querySelector('.clear-all-filters');
    const activeFiltersBar = document.getElementById('activeFilters');
    const filterTagsContainer = document.getElementById('filterTags');
    const countriesContainer = document.getElementById('countriesContainer');
    
    // Состояние фильтров
    let currentFilters = {
        search: '',
        types: new Set(['ОБТ', 'БМП', 'БТР', 'САУ', 'РСЗО']),
        countries: new Set(),
        yearRange: [1900, 2024],
        weightRange: [1, 100],
        crewRange: [1, 15],
        powerRange: [50, 2000],
        speedRange: [10, 100],
        calibers: new Set(),
        chassis: new Set(),
        protection: new Set(),
        layout: new Set()
    };
    
    let currentSort = 'name';
    let currentView = 'grid';
    let currentPage = 1;
    const itemsPerPage = 12;
    
    // Инициализация
    function init() {
        // Обновить счётчики
        totalCountElement.textContent = groundVehicles.length;
        totalCountElement2.textContent = groundVehicles.length;
        
        // Заполнить страны в фильтр
        fillCountriesFilter();
        
        // Показать все карточки
        renderVehicles();
        
        // Инициализировать range слайдеры
        initRangeSliders();
        
        // Назначить обработчики событий
        setupEventListeners();
    }
    
    // Заполнить фильтр стран
    function fillCountriesFilter() {
        countriesContainer.innerHTML = '';
        
        countries.forEach(country => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" name="country" value="${country}">
                ${country}
            `;
            countriesContainer.appendChild(label);
        });
        
        // Выбрать первые 6 стран по умолчанию
        const defaultCountries = ['Россия', 'США', 'Германия', 'Великобритания', 'Франция', 'СССР'];
        defaultCountries.forEach(country => {
            const checkbox = document.querySelector(`input[name="country"][value="${country}"]`);
            if (checkbox) {
                checkbox.checked = true;
                currentFilters.countries.add(country);
            }
        });
        
        updateActiveFilters();
    }
    
    // Инициализировать range слайдеры
    function initRangeSliders() {
        const ranges = [
            { 
                id: 'year', 
                slider1: 'yearRange', 
                slider2: 'yearRange2', 
                display: 'yearValue',
                min: 1900, max: 2024, 
                values: [1900, 2024],
                label: 'Год разработки'
            },
            { 
                id: 'weight', 
                slider1: 'weightRange', 
                slider2: 'weightRange2', 
                display: 'weightValue',
                min: 1, max: 100, 
                values: [1, 100],
                label: 'Масса (тонны)'
            },
            { 
                id: 'crew', 
                slider1: 'crewRange', 
                slider2: 'crewRange2', 
                display: 'crewValue',
                min: 1, max: 15, 
                values: [1, 15],
                label: 'Экипаж (человек)'
            },
            { 
                id: 'speed', 
                slider1: 'speedRange', 
                slider2: 'speedRange2', 
                display: 'speedValue',
                min: 5, max: 120, 
                values: [10, 100],
                label: 'Скорость (км/ч)'
            },
            { 
                id: 'power', 
                slider1: 'powerRange', 
                slider2: 'powerRange2', 
                display: 'powerValue',
                min: 20, max: 2500, 
                values: [50, 2000],
                label: 'Мощность двигателя (л.с.)'
            }
        ];
        
        ranges.forEach(range => {
            const slider1 = document.getElementById(range.slider1);
            const slider2 = document.getElementById(range.slider2);
            const display = document.getElementById(range.display);
            
            if (slider1 && slider2 && display) {
                // Установить начальные значения
                slider1.value = range.values[0];
                slider2.value = range.values[1];
                display.textContent = `${range.values[0]}-${range.values[1]}`;
                
                // Обновить отображение
                function updateDisplay() {
                    const minVal = Math.min(slider1.value, slider2.value);
                    const maxVal = Math.max(slider1.value, slider2.value);
                    
                    display.textContent = `${minVal}-${maxVal}`;
                }
                
                slider1.addEventListener('input', updateDisplay);
                slider2.addEventListener('input', updateDisplay);
                
                // Инициализировать отображение
                updateDisplay();
            }
        });
    }
    
    // Назначить обработчики событий
    function setupEventListeners() {
        // Поиск по нажатию Enter
        quickSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                currentFilters.search = this.value.toLowerCase();
                currentPage = 1;
                renderVehicles();
                updateActiveFilters();
            }
        });
        
        // Поиск по кнопке
        searchButton.addEventListener('click', function() {
            currentFilters.search = quickSearch.value.toLowerCase();
            currentPage = 1;
            renderVehicles();
            updateActiveFilters();
        });
        
        // Сортировка
        sortBy.addEventListener('change', function() {
            currentSort = this.value;
            renderVehicles();
        });
        
        // Сброс фильтров
        resetFiltersBtn.addEventListener('click', resetFilters);
        if (resetNoResultsBtn) {
            resetNoResultsBtn.addEventListener('click', resetFilters);
        }
        
        // Переключение вида
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                viewButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentView = this.dataset.view;
                vehiclesGrid.classList.toggle('list-view', currentView === 'list');
            });
        });
        
        // Кнопки типов техники
        typeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.dataset.type;
                
                if (type === 'all') {
                    // Сбросить все типы
                    typeButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilters.types.clear();
                    ['ОБТ', 'БМП', 'БТР', 'САУ', 'РСЗО'].forEach(t => currentFilters.types.add(t));
                } else {
                    // Переключить конкретный тип
                    typeButtons[0].classList.remove('active'); // Убрать "Все"
                    this.classList.toggle('active');
                    
                    if (this.classList.contains('active')) {
                        currentFilters.types.add(type);
                    } else {
                        currentFilters.types.delete(type);
                    }
                    
                    // Если ни один тип не выбран, выбрать "Все"
                    if (currentFilters.types.size === 0) {
                        typeButtons[0].classList.add('active');
                        ['ОБТ', 'БМП', 'БТР', 'САУ', 'РСЗО'].forEach(t => currentFilters.types.add(t));
                    }
                }
                
                currentPage = 1;
                renderVehicles();
                updateActiveFilters();
            });
        });
        
        // Переключение расширенных фильтров
        toggleAdvancedBtn.addEventListener('click', function() {
            advancedFilters.style.display = advancedFilters.style.display === 'none' ? 'block' : 'none';
            this.innerHTML = advancedFilters.style.display === 'none' 
                ? '<i class="fas fa-sliders-h"></i> Расширенные фильтры' 
                : '<i class="fas fa-times"></i> Скрыть фильтры';
        });
        
        closeAdvancedBtn.addEventListener('click', function() {
            advancedFilters.style.display = 'none';
            toggleAdvancedBtn.innerHTML = '<i class="fas fa-sliders-h"></i> Расширенные фильтры';
        });
        
        // Применить расширенные фильтры
        applyAdvancedBtn.addEventListener('click', function() {
            // Собрать данные с чекбоксов
            updateCheckboxFilters();
            
            // Собрать данные с range слайдеров
            updateRangeFilters();
            
            currentPage = 1;
            renderVehicles();
            updateActiveFilters();
            
            // Скрыть расширенные фильтры
            advancedFilters.style.display = 'none';
            toggleAdvancedBtn.innerHTML = '<i class="fas fa-sliders-h"></i> Расширенные фильтры';
        });
        
        // Очистить все фильтры
        if (clearAllFiltersBtn) {
            clearAllFiltersBtn.addEventListener('click', resetFilters);
        }
        
        // Обработка чекбоксов (живой обработчик)
        document.addEventListener('change', function(e) {
            if (e.target.matches('input[type="checkbox"]')) {
                updateCheckboxFilters();
            }
        });
        
        // Кнопки выбора всех и очистки для стран
        document.querySelector('.select-all-countries').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('input[name="country"]');
            checkboxes.forEach(cb => {
                cb.checked = true;
            });
            updateCheckboxFilters();
        });
        
        document.querySelector('.clear-countries').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('input[name="country"]');
            checkboxes.forEach(cb => {
                cb.checked = false;
            });
            updateCheckboxFilters();
        });
    }
    
    // Обновить чекбокс-фильтры
    function updateCheckboxFilters() {
        // Страны
        currentFilters.countries.clear();
        document.querySelectorAll('input[name="country"]:checked').forEach(cb => {
            currentFilters.countries.add(cb.value);
        });
        
        // Калибры
        currentFilters.calibers.clear();
        document.querySelectorAll('input[name="caliber"]:checked').forEach(cb => {
            currentFilters.calibers.add(cb.value);
        });
        
        // Ходовая
        currentFilters.chassis.clear();
        document.querySelectorAll('input[name="chassis"]:checked').forEach(cb => {
            currentFilters.chassis.add(cb.value);
        });
        
        // Защита
        currentFilters.protection.clear();
        document.querySelectorAll('input[name="protection"]:checked').forEach(cb => {
            currentFilters.protection.add(cb.value);
        });
        
        // Компоновка
        currentFilters.layout.clear();
        document.querySelectorAll('input[name="layout"]:checked').forEach(cb => {
            currentFilters.layout.add(cb.value);
        });
        
        currentPage = 1;
        renderVehicles();
        updateActiveFilters();
    }
    
    // Обновить range-фильтры
    function updateRangeFilters() {
        currentFilters.yearRange = [
            parseInt(document.getElementById('yearRange').value),
            parseInt(document.getElementById('yearRange2').value)
        ];
        
        currentFilters.weightRange = [
            parseInt(document.getElementById('weightRange').value),
            parseInt(document.getElementById('weightRange2').value)
        ];
        
        currentFilters.crewRange = [
            parseInt(document.getElementById('crewRange').value),
            parseInt(document.getElementById('crewRange2').value)
        ];
        
        currentFilters.speedRange = [
            parseInt(document.getElementById('speedRange').value),
            parseInt(document.getElementById('speedRange2').value)
        ];
        
        currentFilters.powerRange = [
            parseInt(document.getElementById('powerRange').value),
            parseInt(document.getElementById('powerRange2').value)
        ];
    }
    
    // Сбросить все фильтры
    function resetFilters() {
        // Сбросить состояние
        currentFilters = {
            search: '',
            types: new Set(['ОБТ', 'БМП', 'БТР', 'САУ', 'РСЗО']),
            countries: new Set(['Россия', 'США', 'Германия', 'Великобритания', 'Франция', 'СССР']),
            yearRange: [1900, 2024],
            weightRange: [1, 100],
            crewRange: [1, 15],
            powerRange: [50, 2000],
            speedRange: [10, 100],
            calibers: new Set(),
            chassis: new Set(),
            protection: new Set(),
            layout: new Set()
        };
        
        currentSort = 'name';
        currentPage = 1;
        
        // Сбросить UI
        quickSearch.value = '';
        sortBy.value = 'name';
        
        // Сбросить кнопки типов
        typeButtons.forEach(btn => btn.classList.remove('active'));
        typeButtons[0].classList.add('active'); // "Все"
        
        // Сбросить чекбоксы стран
        document.querySelectorAll('input[name="country"]').forEach(cb => {
            cb.checked = ['Россия', 'США', 'Германия', 'Великобритания', 'Франция', 'СССР'].includes(cb.value);
        });
        
        // Сбросить остальные чекбоксы
        document.querySelectorAll('input[name="caliber"], input[name="chassis"], input[name="protection"], input[name="layout"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Сбросить range слайдеры
        const ranges = [
            { id: 'yearRange', id2: 'yearRange2', display: 'yearValue', values: [1900, 2024] },
            { id: 'weightRange', id2: 'weightRange2', display: 'weightValue', values: [1, 100] },
            { id: 'crewRange', id2: 'crewRange2', display: 'crewValue', values: [1, 15] },
            { id: 'speedRange', id2: 'speedRange2', display: 'speedValue', values: [10, 100] },
            { id: 'powerRange', id2: 'powerRange2', display: 'powerValue', values: [50, 2000] }
        ];
        
        ranges.forEach(range => {
            const slider1 = document.getElementById(range.id);
            const slider2 = document.getElementById(range.id + '2');
            const display = document.getElementById(range.display);
            
            if (slider1 && slider2 && display) {
                slider1.value = range.values[0];
                slider2.value = range.values[1];
                display.textContent = `${range.values[0]}-${range.values[1]}`;
            }
        });
        
        // Скрыть расширенные фильтры
        advancedFilters.style.display = 'none';
        toggleAdvancedBtn.innerHTML = '<i class="fas fa-sliders-h"></i> Расширенные фильтры';
        
        // Перерисовать
        renderVehicles();
        updateActiveFilters();
    }
    
    // Отфильтровать технику
    function filterVehicles() {
        return groundVehicles.filter(vehicle => {
            // Поиск по тексту
            if (currentFilters.search) {
                const searchStr = currentFilters.search.toLowerCase();
                const nameMatch = vehicle.name.toLowerCase().includes(searchStr);
                const indexMatch = vehicle.index.toLowerCase().includes(searchStr);
                const countryMatch = vehicle.country.toLowerCase().includes(searchStr);
                if (!nameMatch && !indexMatch && !countryMatch) return false;
            }
            
            // Тип техники
            if (currentFilters.types.size > 0 && !currentFilters.types.has(vehicle.type)) {
                return false;
            }
            
            // Страна
            if (currentFilters.countries.size > 0 && !currentFilters.countries.has(vehicle.country)) {
                return false;
            }
            
            // Год
            if (vehicle.year < currentFilters.yearRange[0] || vehicle.year > currentFilters.yearRange[1]) {
                return false;
            }
            
            // Масса
            if (vehicle.weight < currentFilters.weightRange[0] || vehicle.weight > currentFilters.weightRange[1]) {
                return false;
            }
            
            // Экипаж
            if (vehicle.crew < currentFilters.crewRange[0] || vehicle.crew > currentFilters.crewRange[1]) {
                return false;
            }
            
            // Мощность двигателя
            if (vehicle.enginePower < currentFilters.powerRange[0] || vehicle.enginePower > currentFilters.powerRange[1]) {
                return false;
            }
            
            // Скорость
            if (vehicle.maxSpeed < currentFilters.speedRange[0] || vehicle.maxSpeed > currentFilters.speedRange[1]) {
                return false;
            }
            
            // Калибр
            if (currentFilters.calibers.size > 0 && !currentFilters.calibers.has(vehicle.caliber)) {
                return false;
            }
            
            // Ходовая
            if (currentFilters.chassis.size > 0 && !currentFilters.chassis.has(vehicle.chassis)) {
                return false;
            }
            
            // Защита
            if (currentFilters.protection.size > 0) {
                let protectionMatch = false;
                for (const prot of currentFilters.protection) {
                    if (vehicle.protection.includes(prot)) {
                        protectionMatch = true;
                        break;
                    }
                }
                if (!protectionMatch) return false;
            }
            
            // Компоновка
            if (currentFilters.layout.size > 0 && !currentFilters.layout.has(vehicle.layout)) {
                return false;
            }
            
            return true;
        });
    }
    
    // Отсортировать технику
    function sortVehicles(vehicles) {
        return [...vehicles].sort((a, b) => {
            switch(currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'year':
                    return b.year - a.year;
                case 'year_old':
                    return a.year - b.year;
                case 'weight':
                    return b.weight - a.weight;
                case 'weight_light':
                    return a.weight - b.weight;
                case 'crew':
                    return b.crew - a.crew;
                case 'crew_small':
                    return a.crew - b.crew;
                case 'speed':
                    return b.maxSpeed - a.maxSpeed;
                case 'power':
                    return b.enginePower - a.enginePower;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }
    
    // Отобразить технику
    function renderVehicles() {
        const filtered = filterVehicles();
        const sorted = sortVehicles(filtered);
        
        // Обновить счётчики
        foundCountElement.textContent = filtered.length;
        
        // Показать/скрыть сообщение "нет результатов"
        if (filtered.length === 0) {
            noResults.style.display = 'block';
            vehiclesGrid.style.display = 'none';
            document.getElementById('pagination').innerHTML = '';
            return;
        } else {
            noResults.style.display = 'none';
            vehiclesGrid.style.display = 'grid';
        }
        
        // Пагинация
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageVehicles = sorted.slice(startIndex, endIndex);
        
        // Очистить сетку
        vehiclesGrid.innerHTML = '';
        
        // Заполнить сетку
        pageVehicles.forEach(vehicle => {
            const card = createVehicleCard(vehicle);
            vehiclesGrid.appendChild(card);
        });
        
        // Отобразить пагинацию
        renderPagination(filtered.length, totalPages);
    }
    
    // Создать карточку техники
    function createVehicleCard(vehicle) {
        const card = document.createElement('div');
        card.className = `vehicle-card ${currentView === 'list' ? 'list-view' : ''}`;
        
        // Определить иконку по типу
        let icon = 'fa-tank';
        if (vehicle.type === 'БМП') icon = 'fa-shield-alt';
        if (vehicle.type === 'БТР') icon = 'fa-truck-monster';
        if (vehicle.type === 'САУ') icon = 'fa-crosshairs';
        if (vehicle.type === 'РСЗО') icon = 'fa-rocket';
        
        card.innerHTML = `
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                <div class="vehicle-badge">${vehicle.type}</div>
            </div>
            <div class="vehicle-content">
                <div class="vehicle-header">
                    <h3>${vehicle.name}</h3>
                    <div class="vehicle-subtitle">
                        <i class="fas fa-flag"></i> ${vehicle.country} • ${vehicle.index}
                    </div>
                </div>
                <div class="vehicle-specs">
                    <div class="spec-item">
                        <span class="spec-label"><i class="fas fa-calendar"></i> Год</span>
                        <span class="spec-value">${vehicle.year}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label"><i class="fas fa-weight"></i> Масса</span>
                        <span class="spec-value">${vehicle.weight} т</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label"><i class="fas fa-users"></i> Экипаж</span>
                        <span class="spec-value">${vehicle.crew} чел.</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label"><i class="fas fa-tachometer-alt"></i> Двигатель</span>
                        <span class="spec-value">${vehicle.enginePower} л.с.</span>
                    </div>
                </div>
                <div class="vehicle-footer">
                    <span class="vehicle-year">${vehicle.maxSpeed} км/ч • ${getCaliberName(vehicle.caliber)}</span>
                    <a href="ground-detail.html?id=${vehicle.id}" class="btn btn-details">
                        <i class="fas ${icon}"></i> Подробнее
                    </a>
                </div>
            </div>
        `;
        return card;
    }
    
    // Получить читаемое название калибра
    function getCaliberName(caliber) {
        const caliberNames = {
            '7.62mm': '7,62-мм',
            '12.7mm': '12,7-мм',
            '14.5mm': '14,5-мм',
            '20mm': '20-мм',
            '23mm': '23-мм',
            '25mm': '25-мм',
            '30mm': '30-мм',
            '37mm': '37-мм',
            '40mm': '40-мм',
            '45mm': '45-мм',
            '57mm': '57-мм',
            '75mm': '75-мм',
            '76mm': '76-мм',
            '85mm': '85-мм',
            '90mm': '90-мм',
            '100mm': '100-мм',
            '105mm': '105-мм',
            '115mm': '115-мм',
            '120mm': '120-мм',
            '122mm': '122-мм',
            '125mm': '125-мм',
            '130mm': '130-мм',
            '152mm': '152-мм',
            '155mm': '155-мм',
            '203mm': '203-мм',
            '240mm': '240-мм'
        };
        
        return caliberNames[caliber] || caliber;
    }
    
    // Отобразить пагинацию
    function renderPagination(totalItems, totalPages) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        
        // Предыдущая страница
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderVehicles();
                window.scrollTo({ top: vehiclesGrid.offsetTop - 100, behavior: 'smooth' });
            }
        });
        pagination.appendChild(prevBtn);
        
        // Номера страниц
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderVehicles();
                window.scrollTo({ top: vehiclesGrid.offsetTop - 100, behavior: 'smooth' });
            });
            pagination.appendChild(pageBtn);
        }
        
        // Следующая страница
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderVehicles();
                window.scrollTo({ top: vehiclesGrid.offsetTop - 100, behavior: 'smooth' });
            }
        });
        pagination.appendChild(nextBtn);
    }
    
    // Обновить активные фильтры
    function updateActiveFilters() {
        filterTagsContainer.innerHTML = '';
        let hasActiveFilters = false;
        
        // Поиск
        if (currentFilters.search) {
            addFilterTag(`Поиск: "${currentFilters.search}"`, 'search');
            hasActiveFilters = true;
        }
        
        // Типы (если не все выбраны)
        const allTypes = ['ОБТ', 'БМП', 'БТР', 'САУ', 'РСЗО'];
        const allTypesSelected = allTypes.every(type => currentFilters.types.has(type));
        
        if (!allTypesSelected) {
            currentFilters.types.forEach(type => {
                addFilterTag(`Тип: ${type}`, 'type', type);
            });
            hasActiveFilters = true;
        }
        
        // Страны (если выбраны не все)
        const defaultCountries = ['Россия', 'США', 'Германия', 'Великобритания', 'Франция', 'СССР'];
        const allCountriesSelected = defaultCountries.every(country => currentFilters.countries.has(country));
        
        if (!allCountriesSelected && currentFilters.countries.size > 0) {
            currentFilters.countries.forEach(country => {
                addFilterTag(`Страна: ${country}`, 'country', country);
            });
            hasActiveFilters = true;
        }
        
        // Год
        if (currentFilters.yearRange[0] !== 1900 || currentFilters.yearRange[1] !== 2024) {
            addFilterTag(`Год: ${currentFilters.yearRange[0]}-${currentFilters.yearRange[1]}`, 'year');
            hasActiveFilters = true;
        }
        
        // Масса
        if (currentFilters.weightRange[0] !== 1 || currentFilters.weightRange[1] !== 100) {
            addFilterTag(`Масса: ${currentFilters.weightRange[0]}-${currentFilters.weightRange[1]} т`, 'weight');
            hasActiveFilters = true;
        }
        
        // Калибр
        if (currentFilters.calibers.size > 0) {
            currentFilters.calibers.forEach(caliber => {
                addFilterTag(`Калибр: ${getCaliberName(caliber)}`, 'caliber', caliber);
            });
            hasActiveFilters = true;
        }
        
        // Ходовая
        if (currentFilters.chassis.size > 0) {
            currentFilters.chassis.forEach(chassis => {
                addFilterTag(`Ходовая: ${chassis}`, 'chassis', chassis);
            });
            hasActiveFilters = true;
        }
        
        // Показать/скрыть панель активных фильтров
        if (hasActiveFilters) {
            activeFiltersBar.classList.add('visible');
        } else {
            activeFiltersBar.classList.remove('visible');
        }
    }
    
    // Добавить тег фильтра
    function addFilterTag(text, type, value = null) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `
            ${text}
            <button type="button" class="remove-filter" data-type="${type}" data-value="${value}">
                <i class="fas fa-times"></i>
            </button>
        `;
        filterTagsContainer.appendChild(tag);
        
        // Обработчик удаления
        tag.querySelector('.remove-filter').addEventListener('click', function() {
            const filterType = this.dataset.type;
            const filterValue = this.dataset.value;
            
            switch(filterType) {
                case 'search':
                    currentFilters.search = '';
                    quickSearch.value = '';
                    break;
                case 'type':
                    currentFilters.types.delete(filterValue);
                    // Обновить кнопки типов
                    typeButtons.forEach(btn => {
                        if (btn.dataset.type === filterValue) {
                            btn.classList.remove('active');
                        }
                    });
                    break;
                case 'country':
                    currentFilters.countries.delete(filterValue);
                    document.querySelector(`input[name="country"][value="${filterValue}"]`).checked = false;
                    break;
                case 'year':
                    currentFilters.yearRange = [1900, 2024];
                    document.getElementById('yearRange').value = 1900;
                    document.getElementById('yearRange2').value = 2024;
                    document.getElementById('yearValue').textContent = '1900-2024';
                    break;
                case 'weight':
                    currentFilters.weightRange = [1, 100];
                    document.getElementById('weightRange').value = 1;
                    document.getElementById('weightRange2').value = 100;
                    document.getElementById('weightValue').textContent = '1-100';
                    break;
                case 'caliber':
                    currentFilters.calibers.delete(filterValue);
                    document.querySelector(`input[name="caliber"][value="${filterValue}"]`).checked = false;
                    break;
                case 'chassis':
                    currentFilters.chassis.delete(filterValue);
                    document.querySelector(`input[name="chassis"][value="${filterValue}"]`).checked = false;
                    break;
            }
            
            currentPage = 1;
            renderVehicles();
            updateActiveFilters();
        });
    }
    
    // Запустить инициализацию
    init();
});
