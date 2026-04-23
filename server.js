const app = require('./app');
const { PORT } = require('./shared/config/env');
const { connectDB } = require('./shared/config/connection')
const logger = require('./shared/logger/logger');

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        logger.error(err);
    })