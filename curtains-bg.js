// Эффект ткани на ветру с помощью Curtains.js
// https://www.curtainsjs.com/

document.addEventListener("DOMContentLoaded", function() {
    if(!window.Curtains) {
        console.error("Curtains.js не найден!");
        return;
    }
    console.log("Curtains.js найден, создаём Curtains...");
    var curtains = new Curtains({
        container: "curtains-canvas"
    });
    if(!curtains) {
        console.error("Curtains объект не создан!");
        return;
    }
    console.log("Curtains создан", curtains);

    var vs = `
        precision mediump float;
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        varying vec2 vTextureCoord;
        void main() {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            vTextureCoord = aTextureCoord;
        }
    `;
    var fs = `
        precision mediump float;
        varying vec2 vTextureCoord;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // чёрный
        }
    `;

    var params = {
        vertexShader: vs,
        fragmentShader: fs,
        image: document.getElementById("curtains-texture")
    };

    var planeElement = document.getElementById("curtains-plane");
    if(!planeElement) {
        console.error("curtains-plane не найден в DOM!");
        return;
    }
    console.log("Создаём Plane...", planeElement);
    try {
        var plane = new Plane(curtains, planeElement, params);
        if(plane) {
            console.log("Plane успешно создан", plane);
        } else {
            console.error("Plane не был создан!");
        }
    } catch(e) {
        console.error("Ошибка при создании Plane", e);
    }
});
