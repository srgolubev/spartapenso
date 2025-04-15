async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    const map = new YMap(
        document.getElementById('app'),
        {
            location: {
                center: [55.708137, 37.735675],
                zoom: 10
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer());
}

particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.js loaded - callback');
});

initMap();