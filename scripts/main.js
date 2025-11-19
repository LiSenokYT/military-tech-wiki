// Main JavaScript for MilitaryTech Wiki

class MilitaryWiki {
    constructor() {
        this.init();
    }

    init() {
        this.initializeScrollEffects();
        this.initializeSearch();
        this.initializeNavigation();
        this.initializeAnimations();
    }

    // Scroll effects and animations
    initializeScrollEffects() {
        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(42, 42, 42, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(42, 42, 42, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Fade in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Search functionality
    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');

        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                // TODO: Implement actual search logic
                console.log('Searching for:', query);
                // This will be connected to Supabase later
                this.showSearchResults(query);
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    showSearchResults(query) {
        // Placeholder for search results
        // This will be implemented with Supabase integration
        alert(`Поиск: ${query}\n\nФункция поиска будет реализована после подключения базы данных Supabase`);
    }

    // Navigation handling
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get target section
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Category cards navigation
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                this.navigateToCategory(category);
            });
        });
    }

    navigateToCategory(category) {
        // TODO: Implement category navigation
        // This will load the appropriate category page with filters
        console.log('Navigating to category:', category);
        
        // For now, show a message
        const categoryNames = {
            'ground': 'Наземная техника',
            'air': 'Воздушная техника',
            'naval': 'Морская техника',
            'ammo': 'Боеприпасы'
        };
        
        alert(`Переход к разделу: ${categoryNames[category]}\n\nЭтот функционал будет полностью реализован на следующих этапах разработки`);
    }

    // Initialize animations
    initializeAnimations() {
        // Add fade-in class to elements that should animate
        const elementsToAnimate = document.querySelectorAll('.category-card, .addition-card, .stat-item');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
        });

        // Particle effect for hero section
        this.createParticleEffect();
    }

    createParticleEffect() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Create additional particle elements
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(184, 134, 11, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particlesContainer.appendChild(particle);
        }

        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Utility function for API calls (for future Supabase integration)
    async fetchData(endpoint, options = {}) {
        const baseURL = 'https://your-supabase-url.supabase.co';
        const apiKey = 'your-supabase-anon-key';
        
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        try {
            const response = await fetch(`${baseURL}${endpoint}`, {
                ...defaultOptions,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Method to load equipment data (for future use)
    async loadEquipment(category, filters = {}) {
        // TODO: Implement with Supabase
        const endpoint = `/rest/v1/${category}?select=*`;
        return await this.fetchData(endpoint);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.militaryWiki = new MilitaryWiki();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MilitaryWiki;
}
