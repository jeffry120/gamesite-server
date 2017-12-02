const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const games = require('../model/game.model');

routes.get('/games', function(req, res) {
    res.contentType('application/json');
    games.find({})
        .then((games) => {
        res.status(200).json(games);
        })
        .catch((error) => res.status(400).json(error));
});


routes.get('/games/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    games.find({_id: id})
        .then((games) => {
            res.status(200).json(games
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