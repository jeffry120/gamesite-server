const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
var neo4j = require('../config/neo4j.db');
const games = require('../model/game.model');
const mongoose = require('mongoose');

routes.get('/games', function(req, res) {
    res.contentType('application/json');
    games.find({})
        .populate({
            path: 'characters'
        })
        .then((games) => {
        console.log(games[0].characters[0]);
        res.status(200).json(games);
        })
        .catch((error) => res.status(400).json(error));
});


routes.get('/games/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    //const genre = req.query.genre;
    //
    // neo4j.cypher({
    //     query: 'MATCH (game :Game { genre: $genre }) RETURN game',
    //     params: {genre: genre}
    // }),
    games.findOne({_id: id})
        .populate({
            path: 'characters'
        })
        .then((games) => {
            res.status(200).send(games
            );
        })
        .catch((error) => res.status(400).json(error));
});


routes.post('/games', function(req, res) {
    const gameProps = req.body;
    // const name = req.query.name;
    // const description = req.query.description;
    // const genre = req.query.genre;
    // const creators = req.query.creators;
    //
    // neo4j.cypher({
    //     query: 'CREATE (game : Game {name: $name, description: $description, genre: $genre, creators: $creators})'
    //     + 'RETURN game',
    //     params: { name: name, description: description, genre: genre, creators: creators }
    // }),
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