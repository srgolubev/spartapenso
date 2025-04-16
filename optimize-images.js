// Скрипт для оптимизации изображений и переноса в папку /images
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.resolve(__dirname);
const galleryDir = path.join(srcDir, 'gallery');
const imagesDir = path.join(srcDir, 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Список изображений в корне
const rootImages = [
    'chess.png',
    'gym.png',
    'neuro.png',
    'paint.png',
    'phys.png',
    'quiz.png',
    'yoga.png',
    'zumba.png',
    '9M7A4354.jpg',
];

// Список изображений в gallery
const galleryImages = fs.readdirSync(galleryDir).filter(f => f.endsWith('.jpg'));

async function optimizeAndMoveImage(srcPath, destPath) {
    // Определяем формат
    const ext = path.extname(srcPath).toLowerCase();
    let pipeline = sharp(srcPath);
    if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 80 });
    }
    // Сохраняем как webp и в исходном формате (оптимизированном)
    await pipeline.toFile(destPath);
    await sharp(srcPath).webp({ quality: 75 }).toFile(destPath.replace(ext, '.webp'));
}

(async () => {
    // Корневые изображения
    for (const img of rootImages) {
        const srcPath = path.join(srcDir, img);
        if (fs.existsSync(srcPath)) {
            const destPath = path.join(imagesDir, img);
            await optimizeAndMoveImage(srcPath, destPath);
            fs.unlinkSync(srcPath); // удаляем оригинал
        }
    }
    // Галерея
    for (const img of galleryImages) {
        const srcPath = path.join(galleryDir, img);
        const destPath = path.join(imagesDir, img);
        await optimizeAndMoveImage(srcPath, destPath);
        fs.unlinkSync(srcPath);
    }
    console.log('Изображения оптимизированы и перемещены в /images');
})();
