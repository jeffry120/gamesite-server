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
            genre: 'First person shooter',
            imagePath: 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch.jpg',
            characters: [
                // {
                //     name: 'D.VA',
                //     description: 'Amazing Robot',
                //     imagePath: 'https://i.pinimg.com/564x/43/ee/30/43ee3019b64c5e0397233e00da670456--overwatch-wallpapers-kawaii-anime.jpg',
                //     //details: []
                // },
                // {
                //     name: 'Soldier 76',
                //     description: 'The favorite character of Tom (aka The Green Arrow)',
                //     imagePath: 'https://img00.deviantart.net/fbad/i/2015/275/d/f/soldier76___overwatch_by_plank_69-d9bm9d3.png',
                //     //details: []
                // },
                // {
                //     name: 'Mercy',
                //     description: 'Healing Angel',
                //     imagePath: 'https://cdn3.dualshockers.com/wp-content/uploads/2017/09/overwatch-mercy.jpg',
                //     //details: []
                // }

            ],
            platforms: [
                {
                    name: 'PC',
                    model: 'Pc'
                },
                {
                    name: 'Playstation',
                    model: 'PS Pro'
                }
            ],
            creators: ['Blizzard']
        });
        const game2 = new Game({
            name: 'Final Fantasy',
            description: 'Enter an era of war within the world of Ivalice. The small kingdom of Dalmasca, conquered by the Archadian Empire, is left in ruin and uncertainty. Princess Ashe, the one and only heir to the throne, devotes herself to the resistance to liberate her country. Vaan, a young man who lost his family in the war, dreams of flying freely in the skies. In a fight for freedom and fallen royalty, join these unlikely allies and their companions as they embark on a heroic adventure to free their homeland. ',
            imagePath: 'http://image.gamersky.com/zqimg/ff12/image/cover1_b.jpg',
            genre: 'JRPG',
            characters: [
                // {
                //     name: 'Balthier',
                //     description: 'Balthier holds allegiance to no crown, or counsel. A man of wit and charm, he prowls the sky\'s of Ivalice with his partner Fran, in search of treasure. But perhaps he is searching for something more...',
                //     imagePath: 'https://cdn.shopify.com/s/files/1/1893/4781/products/BalthierOriginalArt_345x@2x.png?v=1498682855',
                //     //details: []
                // },
                // {
                //     name: 'Fran',
                //     description: 'Fran is Viera, and has an intense sensitivity to the mist. It will affect her drastically, and can make her a force to reckon with.\n' +
                //     'Fran is the loyal partner of fellow sky pirate Balthier. With her top notch mastery of weapons, she is also a great mechanic.\n' +
                //     'Longing to learn of the greater world, she abandoned her forest home, and sought out greater meaning. But has she truly lost the voice of her home?',
                //     imagePath: 'https://pbs.twimg.com/media/ChoZJcaVIAQ2uaB.png',
                //     //details: []
                // },
                // {
                //     name: 'Basch',
                //     description: 'Basch was a great leader in Dalmasca. Captain of the order of knights, he swore to protect the king at all costs. The official word is that Basch assassinated the king, when he saw the attempt to gain peace with Archadia.\n' +
                //     'But is this the truth, or is it false?',
                //     imagePath: 'http://i.imgur.com/uIEwgnJ.jpg',
                //    //details: []
                // }

            ],
            platforms: [
                {
                    name: 'Playstation 4',
                    model: 'PS4, PS4 slim, PS4 Pro'
                },
                {
                    name: 'PC',
                    model: 'PC'
                }
            ],
            creators: ['Square Enix']
        });

        const character = new GamecharacterSchema({

            name: 'D.VA',
            description: 'Love D.VA',
            imagePath: 'https://d1u1mce87gyfbn.cloudfront.net/media/thumbnail/dva-cosplay.jpg'
        });

        game.characters.push(character);
        character.save();
        game.save();
        game2.save();
    }


 });

module.exports = Game;