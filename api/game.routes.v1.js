const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
var neo4j = require('../config/neo4j.db');
const games = require('../model/game.model');
const mongoose = require('mongoose');

routes.get('/games', function(req, res) {
    res.contentType('application/json');
    games.find({})
        .populate('gamecharacter.characters')
        .then((games) => {
        console.log(games[0].characters[0]);
        res.status(200).json(games);
        })
        .catch((error) => res.status(400).json(error));
});


routes.get('/games/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    games.findOne({_id: id})
        .populate('gamecharacter.characters')
        .then((games) => {
            res.status(200).send(games
            );
        })
        .catch((error) => res.status(400).json(error));
});


routes.post('/games', function(req, res) {
    const gameProps = req.body;
    games.create(gameProps)
        .then((games) => {
        res.status(200).send(games)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/games/:id', function(req, res) {
    res.contentType('application/json');
    const gameId = req.params.id;
    const gameProps = req.body;

    games.findByIdAndUpdate({_id: gameId}, gameProps)
        .then(()=> games.findById({_id: gameId}))
        .then(game => res.send(game))
        .catch((error) => res.status(400).json(error))

});


routes.delete('/games/:id', function(req, res) {
    const id = req.param('id');
    games.findByIdAndRemove(id)
        .then((status) => res.status(200).json(status))
        .catch((error) => res.status(400).json(error))
});

module.exports = routes;