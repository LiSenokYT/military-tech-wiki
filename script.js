// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // ===== Мобильное меню =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            // Меняем иконку кнопки
            const icon = this.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden'; // Блокируем скролл
            } else {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие меню при клике на ссылку
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = '';
        });
    });

    // Закрытие меню при клике вне его области
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
                    const duration = 2000; // 2 секунды
                    const step = target / (duration / 16); // 60fps
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

                    observer.unobserve(element); // Останавливаем наблюдение после анимации
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

    // ===== Заглушки для будущих функций =====
    const searchBtn = document.getElementById('searchBtn');
    const contactBtn = document.getElementById('contactBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Функция поиска находится в разработке. Она будет интегрирована с Supabase для полнотекстового поиска по базе данных.');
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Форма обратной связи и система личных кабинетов находятся в разработке.');
        });
    }

    // ===== Плавный скролл для якорных ссылок (если не сработает нативный) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Сайт "Военная энциклопедия" загружен. Добро пожаловать!');
});
