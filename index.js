const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'origin');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('No fue posible leer el directorio: ' + err);
    }

    files.forEach(convertir);
})

const convertir = function (file) {
    const sizes = [480];
    const resizesPromises = sizes.map(size => {
        const fileName = path.basename(file, path.extname(file));
        const fileExtension = path.extname(file);
        const pathFileName = path.join(directoryPath, file);
        const pathFileNameOpt = 
        path.join(__dirname, `optimized/${fileName}-${size}${fileExtension}`);
        return sharp(pathFileName).resize(size).toFile(pathFileNameOpt);
    });
    Promise.all(resizesPromises);
}