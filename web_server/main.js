const main = require('../index');
const fs = require('fs');

const express = require('express');
const app = express();

app.listen(8080, () => {
    console.log('Web started')
})

app.use(express.static(`${__dirname}/pages`));

app.get('/(*)?', (req, res, next) => {
    res.status(404);
    res.sendFile(`${__dirname}/pages/err_404/index.html`)
});