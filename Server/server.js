const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');

app.use(express.json());
app.use('/', express.static('public'));// в папке public файл index.html запустится автоматически, если не index то нужно написать название.
app.use('/api/cart', cart);

app.get('/api/products', (req, res) => {
    fs.readFile('Server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('связь установлена');
});