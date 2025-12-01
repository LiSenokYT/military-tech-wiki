// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // ===== Мобильное меню =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-nav') && !event.target.closest('.mobile-menu-btn') && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });

    // ===== Анимация чисел в статистике =====
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-target'));
                    const duration = 1800;
                    const step = target / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            clearInterval(timer);
                            element.textContent = target.toLocaleString();
                        } else {
                            element.textContent = Math.floor(current).toLocaleString();
                        }
                    }, 16);

                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => observer.observe(number));
    }

    // ===== Установка текущего года в футере =====
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ===== Заглушки для функций в разработке =====
    const searchBtn = document.getElementById('searchBtn');
    const glossaryLink = document.getElementById('glossaryLink');
    const compareLink = document.getElementById('compareLink');
    const timelineLink = document.getElementById('timelineLink');
    const mapLink = document.getElementById('mapLink');

    const inDevelopmentAlert = (featureName) => {
        alert(`Функция «${featureName}» в данный момент находится в разработке и будет доступна в ближайшем обновлении сайта.`);
    };

    if (searchBtn) {
        searchBtn.addEventListener('click', () => inDevelopmentAlert('Поиск по базе данных'));
    }
    if (glossaryLink) {
        glossaryLink.addEventListener('click', function(e) {
            e.preventDefault();
            inDevelopmentAlert('Глоссарий терминов');
        });
    }
    if (compareLink) {
        compareLink.addEventListener('click', function(e) {
            e.preventDefault();
            inDevelopmentAlert('Сравнение техники');
        });
    }
    if (timelineLink) {
        timelineLink.addEventListener('click', function(e) {
            e.preventDefault();
            inDevelopmentAlert('Хронология разработок');
        });
    }
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            e.preventDefault();
            inDevelopmentAlert('Карта производителей');
        });
    }

    // ===== Плавный скролл =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Имитация загрузки (для реалистичности) =====
    console.log('%cАрсенал | Энциклопедия военной техники', 'color: #2d8c3c; font-size: 16px; font-weight: bold;');
    console.log('База данных загружена. Добро пожаловать.');
});
