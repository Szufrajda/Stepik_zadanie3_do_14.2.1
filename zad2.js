const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function listFilesInDirectory(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Błąd odczytu katalogu: ${err}`);
            rl.close();
        } else {
            console.log(`Lista plików w katalogu "${directoryPath}":`);
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error(`Błąd odczytu statystyk pliku ${filePath}: ${err}`);
                    } else {
                        if (stats.isDirectory()) {
                            console.log(`[KATALOG] ${file}`);
                            listFilesInDirectory(filePath);
                        } else {
                            console.log(`[PLIK] ${file}`);
                        }
                    }
                });
            });
            rl.close();
        }
    });
}

rl.question('Podaj ścieżkę do katalogu: ', (directoryPath) => {
    listFilesInDirectory(directoryPath);
});
