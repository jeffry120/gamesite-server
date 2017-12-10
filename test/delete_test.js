const assert = require('assert');
const Game = require('../model/game.model');
const Character = require('../model/gamecharacter.model');
const Platform = require('../model/platform.model');

describe('Deleting a game', () => {
    let game;

    beforeEach((done) => {
        game = new Game({ name: 'Test', genre: 'FPS', description: 'description' });
        game.save()
            .then(() => done());
    });

    it('Game findByIdAndRemove', (done) => {
        Game.findByIdAndRemove(game._id)
            .then(() => Game.findOne({ name: 'Test' }))
            .then((game) => {
                assert(game === null);

            });
        done();
    });
});


