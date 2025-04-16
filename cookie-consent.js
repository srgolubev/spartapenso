document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('cookie-consent-accept');

    // Проверяем, давал ли пользователь согласие ранее
    if (!localStorage.getItem('cookieConsent')) {
        // Если согласия нет, показываем баннер с небольшой задержкой
        setTimeout(() => {
            if (banner) {
                banner.classList.add('show');
            }
        }, 500); // Задержка 0.5 секунды
    }

    // Обработчик нажатия кнопки "Принять"
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Сохраняем согласие в localStorage
            localStorage.setItem('cookieConsent', 'true');
            // Скрываем баннер
            if (banner) {
                banner.classList.remove('show');
                // Можно добавить дополнительную логику, чтобы баннер плавно исчез перед удалением/скрытием
                // Например, дождаться окончания transition и потом установить display: none
                setTimeout(() => {
                   banner.style.display = 'none'; // Полностью скрываем после анимации
                }, 600); // Время должно быть чуть больше, чем transition-duration в CSS
            }
        });
    }

    // Важно: Найдите ссылку на политику <a href="#"> и замените '#'
    // на реальный URL вашей политики конфиденциальности или использования cookie,
    // когда она будет создана.
});
