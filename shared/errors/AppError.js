class AppError extends Error {
    constructor(message, statuCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = AppError;