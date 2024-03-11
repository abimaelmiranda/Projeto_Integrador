const express = require('express');
const path = require(`path`);
const app = express();
const port = 8000;


app.use(express.static(path.join(__dirname, `assets`)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/explorer', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/pages/explorer.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/pages/whoWe.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/pages/login.html'));
});

app.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/pages/sign-in.html'));
});


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
