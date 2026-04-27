document.addEventListener('DOMContentLoaded', () => {

    // Логика аккордеона
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const accordionContent = button.nextElementSibling;
            const accordionItem = button.closest('.accordion-item'); // Находим родительский элемент
            const icon = button.querySelector('.accordion-icon');
            const isActive = accordionItem.classList.contains('active');

            // Закрываем все другие открытые секции
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                    item.querySelector('.accordion-icon').textContent = '+';
                }
            });

            // Открываем/закрываем текущую секцию
            if (isActive) {
                // Закрываем: фиксируем текущую высоту, потом анимируем к 0
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                void accordionContent.offsetHeight; // reflow
                accordionContent.style.maxHeight = '0px';

                const handleTransitionEnd = () => {
                    accordionItem.classList.remove('active');
                    accordionContent.removeEventListener('transitionend', handleTransitionEnd);
                };
                accordionContent.addEventListener('transitionend', handleTransitionEnd);

            } else {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = '0px';
                void accordionContent.offsetHeight; // reflow
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';

                // После завершения анимации снимаем ограничение высоты,
                // чтобы вложенные раскрывашки (<details>) не обрезались.
                const releaseMaxHeight = (e) => {
                    if (e.propertyName !== 'max-height') return;
                    if (accordionItem.classList.contains('active')) {
                        accordionContent.style.maxHeight = 'none';
                    }
                    accordionContent.removeEventListener('transitionend', releaseMaxHeight);
                };
                accordionContent.addEventListener('transitionend', releaseMaxHeight);
            }
        });
    });

    // ====== Theme Toggle Logic ======
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const darkClass = 'dark-theme';

    function applyTheme(dark) {
        document.body.classList.toggle(darkClass, dark);
    
    }

    // Load saved theme
    let userTheme = localStorage.getItem('theme');
    if (userTheme === 'dark') applyTheme(true);
    else /* по умолчанию всегда светлая */ applyTheme(false);

    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle(darkClass);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

    });
    // ====== End Theme Toggle Logic ======

    // Инициализация ScrollReveal
    // Убедитесь, что ScrollReveal() доступен глобально
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero-content, .description, .program, .gallery, .location-block', {
            duration: 800,
            distance: '40px',
            easing: 'ease-in-out',
            origin: 'bottom',
            // reset: true, // Раскомментируйте, если хотите, чтобы анимация повторялась при прокрутке вверх
            viewFactor: 0.2 // Запускать анимацию, когда 20% элемента видно
        });
    } else {
        console.error('ScrollReveal is not loaded.');
    }

});
