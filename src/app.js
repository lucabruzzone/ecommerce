const express = require('express');
const app = express();
const router = require('./routes/app.routes');
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});
app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;