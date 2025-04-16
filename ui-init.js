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
                // Закрываем
                // accordionItem.classList.remove('active'); // НЕ удаляем класс сразу
                icon.textContent = '+';

                // Запускаем анимацию сворачивания
                accordionContent.style.maxHeight = '0px'; // Явно устанавливаем 0 для transition

                // --- Новая логика с transitionend ---
                // Добавляем слушатель, который сработает ОДИН РАЗ после завершения анимации
                // Используем именованную функцию, чтобы ее можно было удалить
                const handleTransitionEnd = () => {
                    // Убираем класс active ТОЛЬКО после того, как контент скрылся
                    accordionItem.classList.remove('active');
                    // Удаляем сам слушатель, чтобы он не сработал повторно
                    accordionContent.removeEventListener('transitionend', handleTransitionEnd);
                };
                accordionContent.addEventListener('transitionend', handleTransitionEnd);
                // --- Конец новой логики ---

            } else {
                accordionItem.classList.add('active');
                icon.textContent = '-';

                // --- Новая логика --- 
                // 1. Убедимся, что начинаем с 0 (на случай, если был null)
                accordionContent.style.maxHeight = '0px';

                // 2. Заставляем браузер пересчитать макет (reflow)
                //    Чтение offsetHeight - один из способов. Результат не используется.
                void accordionContent.offsetHeight;

                // 3. Теперь устанавливаем целевую высоту для анимации
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                // --- Конец новой логики ---
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
