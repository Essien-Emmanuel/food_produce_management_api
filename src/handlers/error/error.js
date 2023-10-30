class AppError extends Error {
    constructor(message, statusCode, data = []) {
        super(message);
        this.message = message;
        this.statusCode = 200;
        this.code = statusCode;
        this.data = data;

        if (statusCode >= 200 && statusCode < 300) {
            this.status = 'success'
        } else if (statusCode >= 300 && statusCode < 500) {
            this.status = 'failed'
        } else if (statusCode === 200) { this.status = 'error' }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;