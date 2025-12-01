// Логика для страницы наземной техники
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    const totalCountElement = document.getElementById('totalCount');
    const totalCountElement2 = document.getElementById('totalCount2');
    const foundCountElement = document.getElementById('foundCount');
    const quickSearch = document.getElementById('quickSearch');
    const sortBy = document.getElementById('sortBy');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const resetNoResultsBtn = document.getElementById('resetNoResults');
    const noResults = document.getElementById('noResults');
    const viewButtons = document.querySelectorAll('.view-btn');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const filterTagsContainer = document.querySelector('.filter-tags');
    
    // Состояние фильтров
    let currentFilters = {
        search: '',
        types: new Set(['ОБТ', 'БМП', 'БТР']),
        countries: new Set(),
        yearRange: [1940, 2024],
        weightRange: [5, 70],
        crewRange: [1, 12],
        powerRange: [50, 2000],
        speedRange: [20, 100],
        weapons: new Set(),
        secondary: new Set(),
        layout: new Set(),
        protection: new Set(),
        chassis: new Set()
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
        
        // Инициализировать аккордеон
        initAccordion();
        
        // Инициализировать range слайдеры
        initRangeSliders();
        
        // Назначить обработчики событий
        setupEventListeners();
    }
    
    // Заполнить фильтр стран
    function fillCountriesFilter() {
        const countriesContainer = document.querySelector('.checkbox-group.scrollable');
        countriesContainer.innerHTML = '';
        
        countries.forEach(country => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" name="country" value="${country}">
                ${country}
            `;
            countriesContainer.appendChild(label);
        });
        
        // Выбрать первые 5 стран по умолчанию
        const defaultCountries = ['Россия', 'США', 'Германия', 'Китай', 'Израиль'];
        defaultCountries.forEach(country => {
            const checkbox = document.querySelector(`input[name="country"][value="${country}"]`);
            if (checkbox) {
                checkbox.checked = true;
                currentFilters.countries.add(country);
            }
        });
    }
    
    // Инициализировать аккордеон
    function initAccordion() {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                item.classList.toggle('open');
            });
        });
    }
    
    // Инициализировать range слайдеры
    function initRangeSliders() {
        const ranges = [
            { id: 'yearRange', min: 'yearMin', max: 'yearMax', values: [1940, 2024] },
            { id: 'weightRange', min: 'weightMin', max: 'weightMax', values: [5, 70] },
            { id: 'crewRange', min: 'crewMin', max: 'crewMax', values: [1, 12] },
            { id: 'powerRange', min: 'powerMin', max: 'powerMax', values: [50, 2000] },
            { id: 'speedRange', min: 'speedMin', max: 'speedMax', values: [20, 100] }
        ];
        
        ranges.forEach(range => {
            const slider1 = document.getElementById(range.id);
            const slider2 = document.getElementById(range.id + '2');
            const minSpan = document.getElementById(range.min);
            const maxSpan = document.getElementById(range.max);
            
            if (slider1 && slider2) {
                // Установить начальные значения
                slider1.value = range.values[0];
                slider2.value = range.values[1];
                
                // Обновить отображение
                function updateDisplay() {
                    const minVal = Math.min(slider1.value, slider2.value);
                    const maxVal = Math.max(slider1.value, slider2.value);
                    
                    minSpan.textContent = minVal;
                    maxSpan.textContent = maxVal;
                    
                    // Обновить фильтры
                    updateRangeFilter(range.id.replace('Range', '').toLowerCase(), [parseInt(minVal), parseInt(maxVal)]);
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
        // Быстрый поиск
        quickSearch.addEventListener('input', function() {
            currentFilters.search = this.value.toLowerCase();
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
        
        // Обработка чекбоксов
        document.addEventListener('change', function(e) {
            if (e.target.matches('input[type="checkbox"]')) {
                const name = e.target.name;
                const value = e.target.value;
                const isChecked = e.target.checked;
                
                switch(name) {
                    case 'type':
                        updateSetFilter(currentFilters.types, value, isChecked);
                        break;
                    case 'country':
                        updateSetFilter(currentFilters.countries, value, isChecked);
                        break;
                    case 'weapon':
                        updateSetFilter(currentFilters.weapons, value, isChecked);
                        break;
                    case 'secondary':
                        updateSetFilter(currentFilters.secondary, value, isChecked);
                        break;
                    case 'layout':
                        updateSetFilter(currentFilters.layout, value, isChecked);
                        break;
                    case 'protection':
                        updateSetFilter(currentFilters.protection, value, isChecked);
                        break;
                    case 'chassis':
                        updateSetFilter(currentFilters.chassis, value, isChecked);
                        break;
                }
                
                currentPage = 1;
                renderVehicles();
                updateActiveFilters();
            }
        });
        
        // Кнопки выбора всех и очистки для стран
        document.querySelector('.select-all').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('input[name="country"]');
            checkboxes.forEach(cb => {
                cb.checked = true;
                currentFilters.countries.add(cb.value);
            });
            renderVehicles();
            updateActiveFilters();
        });
        
        document.querySelector('.clear-selection').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('input[name="country"]');
            checkboxes.forEach(cb => {
                cb.checked = false;
            });
            currentFilters.countries.clear();
            renderVehicles();
            updateActiveFilters();
        });
    }
    
    // Обновить фильтр-множество
    function updateSetFilter(set, value, shouldAdd) {
        if (shouldAdd) {
            set.add(value);
        } else {
            set.delete(value);
        }
    }
    
    // Обновить range-фильтр
    function updateRangeFilter(type, values) {
        switch(type) {
            case 'year':
                currentFilters.yearRange = values;
                break;
            case 'weight':
                currentFilters.weightRange = values;
                break;
            case 'crew':
                currentFilters.crewRange = values;
                break;
            case 'power':
                currentFilters.powerRange = values;
                break;
            case 'speed':
                currentFilters.speedRange = values;
                break;
        }
        currentPage = 1;
        renderVehicles();
        updateActiveFilters();
    }
    
    // Сбросить все фильтры
    function resetFilters() {
        // Сбросить значения
        currentFilters = {
            search: '',
            types: new Set(['ОБТ', 'БМП', 'БТР']),
            countries: new Set(['Россия', 'США', 'Германия', 'Китай', 'Израиль']),
            yearRange: [1940, 2024],
            weightRange: [5, 70],
            crewRange: [1, 12],
            powerRange: [50, 2000],
            speedRange: [20, 100],
            weapons: new Set(),
            secondary: new Set(),
            layout: new Set(),
            protection: new Set(),
            chassis: new Set()
        };
        
        currentSort = 'name';
        currentPage = 1;
        
        // Сбросить UI
        quickSearch.value = '';
        sortBy.value = 'name';
        
        // Сбросить чекбоксы типов
        document.querySelectorAll('input[name="type"]').forEach(cb => {
            cb.checked = ['ОБТ', 'БМП', 'БТР'].includes(cb.value);
        });
        
        // Сбросить чекбоксы стран
        document.querySelectorAll('input[name="country"]').forEach(cb => {
            cb.checked = ['Россия', 'США', 'Германия', 'Китай', 'Израиль'].includes(cb.value);
        });
        
        // Сбросить остальные чекбоксы
        document.querySelectorAll('input[name="weapon"], input[name="secondary"], input[name="layout"], input[name="protection"], input[name="chassis"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Сбросить range слайдеры
        const ranges = [
            { id: 'yearRange', id2: 'yearRange2', values: [1940, 2024] },
            { id: 'weightRange', id2: 'weightRange2', values: [5, 70] },
            { id: 'crewRange', id2: 'crewRange2', values: [1, 12] },
            { id: 'powerRange', id2: 'powerRange2', values: [50, 2000] },
            { id: 'speedRange', id2: 'speedRange2', values: [20, 100] }
        ];
        
        ranges.forEach(range => {
            const slider1 = document.getElementById(range.id);
            const slider2 = document.getElementById(range.id + '2');
            if (slider1 && slider2) {
                slider1.value = range.values[0];
                slider2.value = range.values[1];
                document.getElementById(range.id.replace('Range', 'Min')).textContent = range.values[0];
                document.getElementById(range.id.replace('Range', 'Max')).textContent = range.values[1];
            }
        });
        
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
            
            // Вооружение
            if (currentFilters.weapons.size > 0) {
                let weaponMatch = false;
                for (const weapon of currentFilters.weapons) {
                    if (vehicle.weapons.includes(weapon)) {
                        weaponMatch = true;
                        break;
                    }
                }
                if (!weaponMatch) return false;
            }
            
            // Доп. вооружение
            if (currentFilters.secondary.size > 0) {
                let secondaryMatch = false;
                for (const weapon of currentFilters.secondary) {
                    if (vehicle.secondaryWeapons.includes(weapon)) {
                        secondaryMatch = true;
                        break;
                    }
                }
                if (!secondaryMatch) return false;
            }
            
            // Компоновка
            if (currentFilters.layout.size > 0 && !currentFilters.layout.has(vehicle.layout)) {
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
            
            // Ходовая
            if (currentFilters.chassis.size > 0 && !currentFilters.chassis.has(vehicle.chassis)) {
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
                case 'country':
                    return a.country.localeCompare(b.country);
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
                        <span class="spec-label">Год</span>
                        <span class="spec-value">${vehicle.year}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Масса</span>
                        <span class="spec-value">${vehicle.weight} т</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Экипаж</span>
                        <span class="spec-value">${vehicle.crew} чел.</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Двигатель</span>
                        <span class="spec-value">${vehicle.enginePower} л.с.</span>
                    </div>
                </div>
                <div class="vehicle-footer">
                    <span class="vehicle-year">${vehicle.crew} чел., ${vehicle.maxSpeed} км/ч</span>
                    <a href="ground-detail.html?id=${vehicle.id}" class="btn btn-details">
                        <i class="fas fa-info-circle"></i> Подробнее
                    </a>
                </div>
            </div>
        `;
        return card;
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
        
        // Поиск
        if (currentFilters.search) {
            addFilterTag(`Поиск: "${currentFilters.search}"`, 'search');
        }
        
        // Типы (только если выбраны не все по умолчанию)
        if (currentFilters.types.size !== 3 || !currentFilters.types.has('ОБТ') || !currentFilters.types.has('БМП') || !currentFilters.types.has('БТР')) {
            currentFilters.types.forEach(type => {
                addFilterTag(`Тип: ${type}`, 'type', type);
            });
        }
        
        // Страны (только если выбраны не все)
        if (currentFilters.countries.size > 0 && currentFilters.countries.size < 5) {
            currentFilters.countries.forEach(country => {
                addFilterTag(`Страна: ${country}`, 'country', country);
            });
        }
        
        // Год
        if (currentFilters.yearRange[0] !== 1940 || currentFilters.yearRange[1] !== 2024) {
            addFilterTag(`Год: ${currentFilters.yearRange[0]}-${currentFilters.yearRange[1]}`, 'year');
        }
        
        // Масса
        if (currentFilters.weightRange[0] !== 5 || currentFilters.weightRange[1] !== 70) {
            addFilterTag(`Масса: ${currentFilters.weightRange[0]}-${currentFilters.weightRange[1]} т`, 'weight');
        }
        
        // Остальные range фильтры аналогично...
        
        // Оружие
        currentFilters.weapons.forEach(weapon => {
            addFilterTag(`Оружие: ${weapon}`, 'weapon', weapon);
        });
        
        // Доп. оружие
        currentFilters.secondary.forEach(weapon => {
            addFilterTag(`Доп: ${weapon}`, 'secondary', weapon);
        });
        
        // Если есть активные фильтры, показать блок
        if (filterTagsContainer.children.length > 0) {
            document.getElementById('activeFilters').style.display = 'block';
        } else {
            document.getElementById('activeFilters').style.display = 'none';
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
                    document.querySelector(`input[name="type"][value="${filterValue}"]`).checked = false;
                    break;
                case 'country':
                    currentFilters.countries.delete(filterValue);
                    document.querySelector(`input[name="country"][value="${filterValue}"]`).checked = false;
                    break;
                case 'year':
                    currentFilters.yearRange = [1940, 2024];
                    document.getElementById('yearRange').value = 1940;
                    document.getElementById('yearRange2').value = 2024;
                    document.getElementById('yearMin').textContent = 1940;
                    document.getElementById('yearMax').textContent = 2024;
                    break;
                case 'weight':
                    currentFilters.weightRange = [5, 70];
                    document.getElementById('weightRange').value = 5;
                    document.getElementById('weightRange2').value = 70;
                    document.getElementById('weightMin').textContent = 5;
                    document.getElementById('weightMax').textContent = 70;
                    break;
                case 'weapon':
                    currentFilters.weapons.delete(filterValue);
                    document.querySelector(`input[name="weapon"][value="${filterValue}"]`).checked = false;
                    break;
                case 'secondary':
                    currentFilters.secondary.delete(filterValue);
                    document.querySelector(`input[name="secondary"][value="${filterValue}"]`).checked = false;
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
