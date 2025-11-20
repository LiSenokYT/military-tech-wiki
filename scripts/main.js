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
    
    // Initialize category cards
    initCategoryCards();
    
    // Initialize stats counters
    initStatsCounters();
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
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
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
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}` || 
                (currentSection === '' && link.getAttribute('href') === '#main')) {
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
    const animateElements = document.querySelectorAll('.category-card, .feature-card, .stat-card, .stat-item, .hero-button');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

function initCategoryCards() {
    // Add interactive effects to category cards
    const categoryCards = document.querySelectorAll('.category-card.large');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initStatsCounters() {
    // Animate stats counters when they come into view
    const statElements = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const targetValue = parseInt(statElement.textContent.replace(/,/g, ''));
                animateCounter(statElement, 0, targetValue, 2000);
                statsObserver.unobserve(statElement);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Utility function for future API calls
async function fetchEquipmentData(category, filters = {}) {
    // This will be implemented when we connect to Supabase
    try {
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
    // This will be implemented when we add search functionality
    console.log('Search functionality ready to be implemented');
}

// Export functions for use in other modules
window.MilitaryTechWiki = {
    fetchEquipmentData,
    initSearch,
    animateCounter
};

// Initialize when page loads
window.addEventListener('load', initApp);
