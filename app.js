const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use(express.json());

app.use('/api/v1', routes);


app.get('/', (req, res) => {
    res.send('Welcome to Shamsul Huda Portal API');
});

module.exports = app;