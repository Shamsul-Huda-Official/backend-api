const express = require('express');
const routes = require('./routes/index');

const app = express();
const errorMiddleware = require('./shared/middleware/error.middleware');


app.use(express.json());

app.use('/api/v1', routes);


app.get('/', (req, res) => {
    res.send('Welcome to Shamsul Huda Portal API');
});
 
app.use(errorMiddleware);

module.exports = app;