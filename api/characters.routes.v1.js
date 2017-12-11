const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const characters = require('../model/gamecharacter.model');
const mongoose = require('mongoose');

routes.get('/characters', function(req, res) {
    res.contentType('application/json');
    characters.find({})
        .then((characters) => {
            res.status(200).send(characters);
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/characters/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    characters.findOne({_id: id})
        .then((characters) => {
            res.status(200).send(characters);
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/characters', function(req, res) {
    const charactersProps = req.body;

    characters.create(charactersProps)
        .then((characters) => {
            res.status(200).send(characters)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/characters/:id', function(req, res) {
    res.contentType('application/json');
    const characterId = req.params.id;
    const characterProps = req.body;

    characters.findByIdAndUpdate({_id: characterId}, characterProps)
        .then(()=> characters.findById({_id: characterId}))
        .then(characters => res.send(characters))
        .catch((error) => res.status(400).json(error))

});

routes.delete('/characters/:id', function(req, res) {
    const id = req.param('id');
    characters.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
        .catch((error) => res.status(400).json(error))
});


module.exports = routes;