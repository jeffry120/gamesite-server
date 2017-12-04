const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CharactersSchema = require('./characters.model')
const GamecharacterSchema = require('./gamecharacter.model')

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: String,
    characters: [GamecharacterSchema],
    creators: []

});


const Game = mongoose.model('game', GameSchema);

Game.count({}, function (err, count) {

    if(count < 5){
        console.log('voeg game toe');
        const game = new Game({
            name: 'Overwatch',
            description: 'Soldiers. Scientists. Adventurers. Oddities.\n' +
            '\n' +
            'In a time of global crisis, an international task force of heroes banded together to restore peace to a war-torn world: OVERWATCH.\n' +
            '\n' +
            'Overwatch ended the crisis, and helped maintain peace in the decades that followed, inspiring an era of exploration, innovation, and discovery. But, after many years, Overwatch’s influence waned, and it was eventually disbanded.\n' +
            '\n' +
            'Now, conflict is rising across the world again, and the call has gone out to heroes old and new. Are you with us?',
            imagePath: 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch.jpg',
            characters: [
                {
                    name: 'Dva',
                    description: 'Amazing Robot',
                    details: []
                }

            ],
            creators: ['Blizzard']
        });

        const character = new CharactersSchema({

            name: 'D.VA',
            description: 'Love D.VA',
        });
        game.characters[0].details.push(character);
        character.save();
        game.save();
    }


 });

module.exports = Game;