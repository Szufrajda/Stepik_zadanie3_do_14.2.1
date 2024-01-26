const express = require('express');
const path = require('path');
const walidatorUrlSzuflix = require('walidator-url-szuflix');

const zad3 = express();
const port = 3000;

zad3.use(express.static(path.join(__dirname, 'public')));
zad3.use(express.urlencoded({ extended: true }));

zad3.get('/', (req, res) => {
    res.send('<h1>Strona Główna</h1><p>To jest dowolny tekst na stronie głównej.</p>');
});

zad3.post('/validate-url', (req, res) => {
    const inputUrl = req.body.url;
    const isUrlValid = walidatorUrlSzuflix.validateUrl(inputUrl);

    console.log(`Podany URL "${inputUrl}" jest poprawny: ${isUrlValid}`);

    res.send({ isValid: isUrlValid });
});

zad3.get('/about', (req, res) => {
    res.send('<h1>O Nas</h1><p>To jest dowolny tekst na stronie "O Nas".</p>');
});

zad3.get('/logo', (req, res) => {
    const images = [
        'https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png',
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    res.send(`<h1>Logo</h1><img src="${randomImage}" alt="Logo">`);
});

zad3.listen(port, () => {
    console.log(`Serwer uruchomiony na http://localhost:${port}`);
});
