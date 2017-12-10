const assert = require('assert');
const Game = require('../model/game.model');
const GamecharacterSchema = require('../model/gamecharacter.model');
const Platform = require('../model/platform.model');

describe('Updating records', () => {
    let game;

    beforeEach((done) => {
        game = new Game({name: 'Test', genre: 'FPS', description: 'description'});
        game.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => Game.find({}))
            .then((games) => {
                assert(games.length === 1);
                assert(games[0].name === 'Test1');
            });
        done();
    }
});

    it('A model class can find a record with an Id and update', (done) => {
        console.log();
        assertName(
            Game.findByIdAndUpdate(game._id, { name: 'Test1' }),
            done
        );

    });


// describe('Updating records', () => {
//     let character;
//
//     beforeEach((done) => {
//         character = new Character({ name: 'Test', start: '2015-05-05', description: 'description' });
//         character.save()
//             .then(() => done());
//     });
//
//     function assertName(operation, done) {
//         operation
//             .then(() => Character.find({}))
//             .then((character) => {
//                 assert(character.length === 1);
//                 assert(character[0].name === 'Test1');
//                 done();
//             });
//     }
//
//     it('A model class can find a record with an Id and update', (done) => {
//         console.log();
//         assertName(
//             Character.findByIdAndUpdate(character._id, { name: 'Test1' }),
//             done
//         );
//     });
//
// });