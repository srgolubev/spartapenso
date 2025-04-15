// Эффект плавного увеличения и параллакса для всех activity-card с inline-background

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.activity-card[style*="background"]').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            const posX = 50 + x * 10; // 50% ±10%
            const posY = 50 + y * 10; // 50% ±10%
            card.style.backgroundSize = '120%';
            card.style.backgroundPosition = `${posX}% ${posY}%`;
        });
        card.addEventListener('mouseleave', function() {
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        });
    });
});
