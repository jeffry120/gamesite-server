const assert = require('assert');
const Game = require('../model/game.model');
const Character = require('../model/gamecharacter.model');
const Platform = require('../model/platform.model');

describe('Reading games out of the database', () => {
    let game;
    let gamecharacter;

    beforeEach=((done) => {
        game = new Game({ name: 'Overwatch' });
        game.save()
            .then(() => done());

    });

    it('finds all games with a name of Overwatch', (done) => {
        console.log(game);
        Game.find({ name: 'Overwatch' })
            .then((games) => {console.log(games),
                assert(games[0]._id.toString() === game._id.toString());
            });
        done();
    });

    it('find a game with a particular id', (done) => {
        Game.findOne({ _id: game._id })
            .then((game) => {
                assert(game.name === 'Overwatch');
            });
        done();
    });
});

// describe('Reading characters out of the database', () => {
//     let gamecharacter;
//
//     beforeEach((done) => {
//         gamecharacter = new Gamecharacter({ name: 'Overwatch' });
//         gamecharacter.save()
//             .then(() => done());
//     });
//
//     it('finds all series with a name of overwatch', (done) => {
//         Gamecharacter.find({ name: 'Final Fantasy' })
//             .then((gamecharacter) => {
//                 assert(gamecharacter[0]._id.toString() === gamecharacter._id.toString());
//                 done();
//             });
//     });
//
//     it('find a Gamecharacter with a particular id', (done) => {
//         Character.findOne({ _id: character._id })
//             .then((gamecharacter) => {
//                 assert(gamecharacter.name === 'Final Fantasy');
//                 done();
//             });
//     });
// });

