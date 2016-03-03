'use strict';

var color = require('crayon-terminal');
var config = require('nconf');
var express = require('express');

var port = config.get('PORT') || 7777;

run();

///////////

function handleError(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
    console.log(color.red(err));
}

function getCSV(req, res) {
    res.send('Mozo, Is, My, Friend, 2016');
}

function run() {
    console.log(color.blue('Starting server on port: ' + port));

    let app = express();

    // HTTP Headers Injected
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    // Global Error Handler
    app.use(handleError);

    // API Routes
    app.get('/api/csv', getCSV);

    // The AngularJS web server
    app.use('/', express.static('app/'));
    // don't do this in a real app
    app.use('/lib/', express.static('node_modules/'));

    app.listen(port);
}

