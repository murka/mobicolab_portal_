const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 
                    'https://localhost:3443', 
                    'http://localhost:4200', 
                    'http://127.17.0.1:80',
                    'http://127.17.0.1:4200',
                    'http://127.17.0.1',
                    'http://46.101.252.104',
                    'http://46.101.252.104:80',
                    'http://46.101.252.104:4200',
                    'http://157.230.102.161',
                    'http://157.230.102.161:80',
                    'http://157.230.102.161:80'];
var cosrOptionsDelegate = (req, callback) => {
    var corsOptions;

    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(cosrOptionsDelegate);