const express = require('express');
const routes = require('./routes/index');
const cors = require('cors')

const app = express();
const errorMiddleware = require('./shared/middleware/error.middleware');


app.use(cors())

app.use(express.json());

app.use('/api/v1', routes);


app.get('/', (req, res) => {
    res.send('Welcome to Shamsul Huda Portal API');
});
 
app.use(errorMiddleware);

module.exports = app;