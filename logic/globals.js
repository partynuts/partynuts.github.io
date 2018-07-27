const constants = (function() {
    const weapons = {
        ROCK: 'rock',
        PAPER: 'paper',
        SCISSORS: 'scissors'
    };

    return {
        weapons
    };
})();

let playerMode = 'hc';
let scoreLeft = 0;
let scoreRight = 0;