const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const driver = require('../config/neo');
const games = require('../model/game.model');
const mongoose = require('mongoose');

routes.get('/gamesrel/:genre', function(req, res) {
    res.contentType('application/json');
    const genre = req.param('genre');
    console.log(genre)
    var session = driver.session();

    session
        .run("MATCH (n)-[:has_genre]->(:Genre {genre: {genreParam}}) return n", {genreParam: genre})
        .then(function (result) {
            var gameArr = [];
            // console.log(result.records[0]._fields[0].properties.name);
            // console.log(result.record);
            result.records.forEach(function (record) {
                console.log(record._fields[0].properties.name)
                gameArr.push({
                    _id: record._fields[0].properties.id,
                    name: record._fields[0].properties.name,
                    imagePath: record._fields[0].properties.imagePath
                });
            });
            res.status(200).send(gameArr);

            session.close();
        });
});

routes.get('/games', function(req, res) {
    res.contentType('application/json');
    games.find({})
        .populate({
            path: 'characters'
        })
        .then((games) => {
        res.status(200).json(games);
        })
        .catch((error) => res.status(400).json(error));
});


routes.get('/games/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    games.findOne({_id: id})
        .populate({
            path: 'characters'
        })
        .then((games) => {
            res.status(200).send(games);
        })
        .catch((error) => res.status(400).json(error));
});


routes.post('/games', function(req, res) {
    const gameProps = req.body;

    var session = driver.session();

    games.create(gameProps)
        .then((games) => {

            var name = games.name;
            var id = games._id.toString();
            var imagePath = games.imagePath;
            var genre = games.genre;
            session
                //("CREATE(g:Genre {genre: {genreParam}})-[:have_genre]->(g)"
                .run("MATCH (g:Genre {genre: {genreParam}})" + " CREATE(n:Game {name: {nameParam}, id: {idParam}, imagePath: {imagePathParam}})-[:has_genre]->(g)", {genreParam: genre, nameParam: name, idParam: id, imagePathParam: imagePath }).then(function () {
                console.log('done');
                session.close();

            }).catch((error) => console.log(error));
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
        .then((game) => {
            var session = driver.session();
            var name = game.name;
            var genre = game.genre;
            console.log(name);
            console.log(genre);
            session
                .run("MATCH (n:Game {name: {nameParam}})-[rel:has_genre]->(), (m:Genre {genre: {genreParam}}) DELETE rel CREATE (n)-[:has_genre]->(m)", {nameParam: name, genreParam: genre})
                .then(function () {
                    console.log('done');
                    session.close();
                }).catch((error) => console.log(error));
            res.send(game)
        })
        .catch((error) => res.status(400).json(error))


});


routes.delete('/games/:id', function(req, res) {
    const id = req.param('id');
    var session = driver.session();
    session
        .run("MATCH (n:Game {id: {idParam}}) DETACH DELETE n", {idParam:  id})
        .then(function () {
            session.close();
        });

    games.findByIdAndRemove(id)
        .then((status) => res.status(200).json(status))
        .catch((error) => res.status(400).json(error))
});

module.exports = routes;