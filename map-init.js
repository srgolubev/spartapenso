ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.708137, 37.735675], // Координаты центра карты
        zoom: 15, // Уровень масштабирования
        controls: ['zoomControl', 'fullscreenControl'] // Элементы управления
    });

    var myPlacemark = new ymaps.Placemark([55.708137, 37.735675], {
        hintContent: 'ГБУ ДО СШОР «Москвич»',
        balloonContent: '<strong>ГБУ ДО СШОР «Москвич»</strong><br>Волгоградский просп., 46/15с7'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        // iconImageHref: 'images/myIcon.gif', // Укажите путь к вашей иконке, если нужно
        // Размеры метки.
        // iconImageSize: [30, 42],
        // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
        // iconImageOffset: [-5, -38]
    });

    myMap.geoObjects.add(myPlacemark);

    // Отключение масштабирования колесом мыши
    myMap.behaviors.disable('scrollZoom');
}
