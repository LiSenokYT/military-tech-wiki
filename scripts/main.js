// Main JavaScript for MilitaryTech Wiki

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize navigation active state
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize equipment cards
    initEquipmentCards();
    
    // Add any other initializations here
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.category-card, .equipment-card, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

function initEquipmentCards() {
    // Add click handlers for equipment cards
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach(card => {
        card.addEventListener('click', function() {
            // This will be expanded when we have individual equipment pages
            console.log('Equipment card clicked:', this.querySelector('h3').textContent);
            // For now, just add a visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Utility function for future API calls
async function fetchEquipmentData(category, filters = {}) {
    // This will be implemented when we connect to Supabase
    try {
        // Placeholder for future API implementation
        const response = await fetch(`/api/${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching equipment data:', error);
        return null;
    }
}

// Search functionality (to be expanded)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск техники...';
    searchInput.className = 'search-input';
    
    // This will be expanded when we have search functionality
    searchInput.addEventListener('input', debounce(function(e) {
        console.log('Search query:', e.target.value);
        // Implement search logic here
    }, 300));
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other modules
window.MilitaryTechWiki = {
    fetchEquipmentData,
    initSearch,
    debounce
};
