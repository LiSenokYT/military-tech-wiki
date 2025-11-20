// Ground Equipment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGroundPage();
});

function initGroundPage() {
    initFilterTabs();
    initRangeSliders();
    initFilterTags();
    initViewControls();
    initEquipmentCards();
    initPagination();
}

// Filter Tabs
function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterGroups = document.querySelectorAll('.filter-group');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide filter groups
            filterGroups.forEach(group => {
                if (filterType === 'all') {
                    group.style.display = 'block';
                } else {
                    group.style.display = group.dataset.category === filterType ? 'block' : 'none';
                }
            });
        });
    });
}

// Range Sliders
function initRangeSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('#mass-value') || 
                           slider.parentElement.querySelector('#crew-value');
        
        slider.addEventListener('input', function() {
            if (valueDisplay) {
                if (this.id.includes('mass')) {
                    valueDisplay.textContent = `${this.value} т`;
                } else if (this.id.includes('crew')) {
                    valueDisplay.textContent = `${this.value} чел`;
                }
            }
        });
    });
}

// Filter Tags
function initFilterTags() {
    const filterTags = document.querySelector('.filter-tags');
    const resetBtn = document.querySelector('.reset-filters');
    
    // Add sample active filters (in real app, this would be dynamic)
    const sampleFilters = [
        { text: 'ОБТ', type: 'type' },
        { text: 'Россия', type: 'country' },
        { text: 'Масса: 40-60 т', type: 'mass' }
    ];
    
    sampleFilters.forEach(filter => {
        const tag = createFilterTag(filter.text, filter.type);
        filterTags.appendChild(tag);
    });
    
    // Reset filters
    resetBtn.addEventListener('click', function() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('select').forEach(select => {
            if (select.multiple) {
                Array.from(select.options).forEach(option => option.selected = false);
            } else {
                select.selectedIndex = 0;
            }
        });
        document.querySelectorAll('.range-input').forEach(input => input.value = '');
        document.querySelectorAll('.slider').forEach(slider => {
            slider.value = slider.max;
            const valueDisplay = slider.parentElement.querySelector('#mass-value') || 
                               slider.parentElement.querySelector('#crew-value');
            if (valueDisplay) {
                if (slider.id.includes('mass')) {
                    valueDisplay.textContent = `${slider.value} т`;
                } else if (slider.id.includes('crew')) {
                    valueDisplay.textContent = `${slider.value} чел`;
                }
            }
        });
        
        // Clear filter tags
        filterTags.innerHTML = '';
    });
}

function createFilterTag(text, type) {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
        ${text}
        <button class="remove" onclick="this.parentElement.remove()">×</button>
    `;
    return tag;
}

// View Controls
function initViewControls() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const equipmentGrid = document.getElementById('equipment-grid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const viewType = this.dataset.view;
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Change grid layout
            equipmentGrid.className = `equipment-grid ${viewType}`;
        });
    });
}

// Equipment Cards
function initEquipmentCards() {
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach(card => {
        // Add click handler for card (excluding buttons)
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.card-actions')) {
                // Navigate to equipment detail page
                console.log('Navigate to equipment detail');
            }
        });
        
        // Favorite button
        const favoriteBtn = card.querySelector('.btn-secondary');
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.className = 'fas fa-heart';
                this.style.color = 'var(--accent-color)';
                this.style.borderColor = 'var(--accent-color)';
            } else {
                icon.className = 'far fa-heart';
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
        
        // Detail button
        const detailBtn = card.querySelector('.btn-primary');
        detailBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Navigate to equipment detail page
            console.log('Navigate to equipment detail:', card.querySelector('.card-title').textContent);
        });
    });
}

// Pagination
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // Update active page
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In real app, this would load new page data
            console.log('Load page:', this.textContent);
        });
    });
    
    // Next page button
    const nextBtn = document.querySelector('.page-next');
    nextBtn.addEventListener('click', function() {
        const activePage = document.querySelector('.page-btn.active');
        const nextPage = activePage.nextElementSibling;
        
        if (nextPage && nextPage.classList.contains('page-btn')) {
            pageBtns.forEach(b => b.classList.remove('active'));
            nextPage.classList.add('active');
            console.log('Load page:', nextPage.textContent);
        }
    });
}

// Apply Filters
document.querySelector('.apply-filters').addEventListener('click', function() {
    // Collect all filter values
    const filters = {
        type: getSelectedValues('.filter-select[multiple]'),
        country: getSelectedValues('.filter-select[multiple]:nth-of-type(2)'),
        years: getRangeValues('.range-input'),
        mass: getSliderValue('.slider'),
        crew: getSliderValue('.slider:nth-of-type(2)'),
        enginePower: getRangeValues('.range-input:nth-of-type(3)'),
        speed: getRangeValues('.range-input:nth-of-type(5)'),
        range: getRangeValues('.range-input:nth-of-type(7)'),
        engineType: getSelectedValue('.filter-select:not([multiple])'),
        mainGun: getRangeValues('.range-input:nth-of-type(9)'),
        gunType: getSelectedValues('.filter-select[multiple]:nth-of-type(3)'),
        ammunition: getRangeValues('.range-input:nth-of-type(11)'),
        additionalWeapons: getCheckedValues('.checkbox input[type="checkbox"]'),
        armorType: getSelectedValues('.filter-select[multiple]:nth-of-type(4)'),
        frontalArmor: getRangeValues('.range-input:nth-of-type(13)'),
        protectionSystems: getCheckedValues('.checkbox-group:nth-of-type(2) input[type="checkbox"]')
    };
    
    console.log('Applied filters:', filters);
    
    // In real app, this would make an API call to Supabase
    // fetchFilteredEquipment(filters);
    
    // Show loading state
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-search"></i> Применить фильтры (2,847)';
        // Update results count based on filters
    }, 1000);
});

// Utility Functions
function getSelectedValues(selector) {
    const select = document.querySelector(selector);
    if (!select) return [];
    return Array.from(select.selectedOptions).map(option => option.value);
}

function getSelectedValue(selector) {
    const select = document.querySelector(selector);
    return select ? select.value : '';
}

function getRangeValues(selector) {
    const inputs = document.querySelectorAll(selector);
    if (inputs.length < 2) return { min: '', max: '' };
    return {
        min: inputs[0].value,
        max: inputs[1].value
    };
}

function getSliderValue(selector) {
    const slider = document.querySelector(selector);
    return slider ? slider.value : '';
}

function getCheckedValues(selector) {
    const checkboxes = document.querySelectorAll(selector);
    const values = [];
    checkboxes.forEach(cb => {
        if (cb.checked) values.push(cb.value);
    });
    return values;
}

// Export for global access
window.GroundPage = {
    initGroundPage,
    applyFilters: () => document.querySelector('.apply-filters').click()
};
