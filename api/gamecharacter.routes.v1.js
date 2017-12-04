const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const gamecharacters = require('../model/gamecharacter.model');

routes.get('/gamecharacter', function (req, res) {
    res.contentType('application/json');
    res.status(200).json({
        character: 'Overwatch'
    })

});

module.exports = routes;