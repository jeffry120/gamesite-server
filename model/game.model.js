const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GamecharacterSchema = require('./gamecharacter.model')
const PlatformSchema = require('./platform.model')

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    imagePath: String,
    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'character'
    }],
    creators: {
        type: String,
        required: true
    },
    platforms: [PlatformSchema]

});

GameSchema.pre('findByIdAndRemove', function(callback){
    console.log('werkt')
    this.model('characters').remove({_id: this._id}, callback);
});

const Game = mongoose.model('game', GameSchema);

Game.count({}, function (err, count) {

    // if(count < 5){
    //     console.log('voeg game toe');
    //     const game = new Game({
    //         name: 'Overwatch',
    //         description: 'Soldiers. Scientists. Adventurers. Oddities.\n' +
    //         '\n' +
    //         'In a time of global crisis, an international task force of heroes banded together to restore peace to a war-torn world: OVERWATCH.\n' +
    //         '\n' +
    //         'Overwatch ended the crisis, and helped maintain peace in the decades that followed, inspiring an era of exploration, innovation, and discovery. But, after many years, Overwatch’s influence waned, and it was eventually disbanded.\n' +
    //         '\n' +
    //         'Now, conflict is rising across the world again, and the call has gone out to heroes old and new. Are you with us?',
    //         genre: 'First person shooter',
    //         imagePath: 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch.jpg',
    //         characters: [],
    //         platforms: [
    //             {
    //                 name: 'PC',
    //
    //             },
    //             {
    //                 name: 'Playstation',
    //
    //             }
    //         ],
    //         creators: ['Blizzard']
    //     });
    //     const game2 = new Game({
    //         name: 'Final Fantasy',
    //         description: 'Enter an era of war within the world of Ivalice. The small kingdom of Dalmasca, conquered by the Archadian Empire, is left in ruin and uncertainty. Princess Ashe, the one and only heir to the throne, devotes herself to the resistance to liberate her country. Vaan, a young man who lost his family in the war, dreams of flying freely in the skies. In a fight for freedom and fallen royalty, join these unlikely allies and their companions as they embark on a heroic adventure to free their homeland. ',
    //         imagePath: 'http://image.gamersky.com/zqimg/ff12/image/cover1_b.jpg',
    //         genre: 'JRPG',
    //         characters: [],
    //         platforms: [
    //             {
    //                 name: 'Playstation 4',
    //
    //             },
    //             {
    //                 name: 'PC',
    //
    //             }
    //         ],
    //         creators: ['Square Enix']
    //     });
    //
    //     const character = new GamecharacterSchema({
    //
    //         name: 'D.VA',
    //         description: 'Love D.VA',
    //         imagePath: 'https://d1u1mce87gyfbn.cloudfront.net/media/thumbnail/dva-cosplay.jpg'
    //     });
    //
    //     game.characters.push(character);
    //     character.save();
    //     game.save();
    //     game2.save();
    // }


 });

module.exports = Game;