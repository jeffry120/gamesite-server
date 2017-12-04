const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        required: true
    }
});

const Characters = mongoose.model('character', CharactersSchema)

module.exports = Characters;