const mongoose = require('mongoose');
const config = require('./env/env');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.connect(config.dbURL);
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dbURL))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;