// Инициализация эффекта ткани на ветру (waves)
document.addEventListener('DOMContentLoaded', function() {
    VANTA.WAVES({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x5e81ac,
        shininess: 40.00,
        waveHeight: 22.0,
        waveSpeed: 0.85,
        zoom: 0.95,
        backgroundColor: 0xffffff
    });
});
