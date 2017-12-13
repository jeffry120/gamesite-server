const assert = require('assert');
const Game = require('../model/game.model');
const GamecharacterSchema = require('../model/gamecharacter.model');
const Platform = require('../model/platform.model');

describe('Creating game records', () => {
    it('saves a game', (done) => {
        const game = new Game({ name: 'Test', genre: 'FPS', description: 'description', creators: 'Blizzard' });

        game.save()
            .then(() => {
                assert(!game.isNew);
            });
        done();
    });
});

describe('Creating character records', () => {
    it('saves a character', (done) => {
        const character = new GamecharacterSchema({ name: 'harry'  });

        character.save()
            .then(() => {
                assert(!character.isNew);
            });
        done();
    });
});
