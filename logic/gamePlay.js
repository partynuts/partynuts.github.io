const gamePlay = (function() {
    const weapons = constants.weapons;

    function computerWeaponChoice() {
        return [weapons.ROCK, weapons.PAPER, weapons.SCISSORS][
            Math.floor(Math.random() * 3)
        ];
    }

    function weaponChoiceHuman(e) {
        const humanChoice = e.target.id;
        if (e.target.id === "weaponButtonsBox") {
            gameUI.initPlayerModeHumanComputer();
            return;
        }
        const computerChoice = computerWeaponChoice();
        gameUI.disableSwitchMode();
        gameUI.toggleBoxes();
        gameUI.startGame(humanChoice, computerChoice, e);
    }

    function startingBattleComputerComputer() {
        const computerChoice1 = gamePlay.computerWeaponChoice();
        const computerChoice2 = gamePlay.computerWeaponChoice();
        gameUI.disableSwitchMode();
        gameUI.toggleBoxes();
        gameUI.startGame(computerChoice1, computerChoice2);
    }

    function countScore(result) {
        if (result === 1 && playerMode === "hc") {
            scoreLeft++;
            return;
        }
        if (result === 1 && playerMode === "cc") {
            scoreLeft++;
            return;
        }
        if (result === 2 && playerMode === "hc") {
            scoreRight++;
            return;
        }
        if (result === 2 && playerMode === "cc") {
            scoreRight++;
        }
    }

    return {
        announceWinner,
        computerWeaponChoice,
        countScore,
        playRound,
        startingBattleComputerComputer,
        weaponChoiceHuman
    };
})();

function playRound(weapon1, weapon2) {
    const weapons = constants.weapons;

    if (weapon1 === weapon2) {
        return 0;
    }

    if (weapon1 === weapons.SCISSORS) {
        switch (weapon2) {
            case weapons.ROCK:
                return 2;
            case weapons.PAPER:
                return 1;
        }
    }

    if (weapon1 === weapons.ROCK) {
        switch (weapon2) {
            case weapons.PAPER:
                return 2;
            case weapons.SCISSORS:
                return 1;
        }
    }

    if (weapon1 === weapons.PAPER) {
        switch (weapon2) {
            case weapons.ROCK:
                return 1;
            case weapons.SCISSORS:
                return 2;
        }
    }
}

function announceWinner(result, playerMode) {
    if (result === 0) {
        return "Tie Game";
    } else if (result === 1 && playerMode === "hc") {
        return "You win!";
    } else if (result === 1 && playerMode === "cc") {
        return "R2-D2 wins!";
    } else if (result === 2 && playerMode === "hc") {
        return "The computer wins";
    } else if (result === 2 && playerMode === "cc") {
        return "C-3PO wins";
    }
}
