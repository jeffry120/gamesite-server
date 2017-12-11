const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GamecharacterSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description: String,
    imagePath: String,

});

const Gamecharacter = mongoose.model('character', GamecharacterSchema)

module.exports = Gamecharacter;