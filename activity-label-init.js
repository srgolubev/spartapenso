// Автоматически подставляет заглавный текст из data-alt в .activity-label

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.activity-card').forEach(function(card) {
        var label = card.querySelector('.activity-label');
        if(label && card.dataset.alt) {
            label.textContent = card.dataset.alt.toUpperCase();
        }
    });
});
