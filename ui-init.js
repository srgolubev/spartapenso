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
                accordionItem.classList.remove('active');
                accordionContent.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                icon.textContent = '-';
            }
        });
    });

    // Инициализация ScrollReveal
    // Убедитесь, что ScrollReveal() доступен глобально
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero-content, .description, .program, .activities, .gallery, .location-block', {
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
