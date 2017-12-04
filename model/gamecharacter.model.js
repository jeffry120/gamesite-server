const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GamecharacterSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description: String,
    imagePath: String,
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'character'
    }]
});


module.exports = GamecharacterSchema;