

const createError = require('http-errors');

module.exports.Response = {
    success: (res, status = 200, message = "Ok", data = {}) => {
        res.status(status).json({ message, data });
    },
    error: (res, error = null) => {
        const status = error?.statusCode || 500;
        const message = error?.message || 'Internal Server Error';
        res.status(status).json({ error: message });
    }

}