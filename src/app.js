const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/admin', adminRoute);

app.use((error, req, res, next) => {
    const status = error.status || 'error'
    const message = error.message || 'Server Side Error';
    const code = error.code || 500;
    const data = error.data || null;
    const stack = process.env.NODE_ENV === "development" ? error.stack : undefined;
    return res.status(200).json({ status, message, code, data, stack})
});

module.exports = app