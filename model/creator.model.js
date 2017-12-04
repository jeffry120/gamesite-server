const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CharactersSchema = require('./characters.model')
const GamecharacterSchema = require('./gamecharacter.model')

const CreatorsSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        required: true
    }
});

