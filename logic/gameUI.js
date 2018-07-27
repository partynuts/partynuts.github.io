const gameUI = (function() {
    function initPlayerModeHumanComputer() {
        setPlayerMode("hc");
    }

    function initPlayerModeComputerComputer() {
        setPlayerMode("cc");
    }

    function setPlayerMode(mode) {
        playerMode = mode;
        resetScore();
        switchUI(playerMode);
    }

    function switchUI(playerMode) {
        if (playerMode === "cc") {
            changePlayerModeBtn.innerText = "You vs. computer";
            startFightBtn.classList.remove("hidden");
            weaponBox.classList.add("hidden");
            leftScoreCol.innerText = "R2-D2's score";
            rightScoreCol.innerText = "C-3PO's score";
        } else {
            changePlayerModeBtn.innerText = "Computer vs. computer";
            startFightBtn.classList.add("hidden");
            weaponBox.classList.remove("hidden");
            leftScoreCol.innerText = "Your score";
            rightScoreCol.innerText = "Computer's score";
        }
        fightHandsBox.classList.add("hidden");
        gameBtnsBox.classList.add("hidden");
        resetFightHandImgs();
    }

    function switchMode() {
        if (playerMode === "hc") {
            initPlayerModeComputerComputer();
            return;
        }
        initPlayerModeHumanComputer();
    }

    function disableSwitchMode() {
        changePlayerModeBtn.removeEventListener("click", switchMode);
    }

    function startGame(choice1, choice2) {
        const result = gamePlay.playRound(choice1, choice2);
        playGameAnimation(2, function() {
            onFinish(result, choice1, choice2);
        });
    }

    function playGameAnimation(iterations, onFinish) {
        animateHands();
        if (iterations === 0) {
            onFinish();
        } else {
            iterations--;
            setTimeout(() => {
                playGameAnimation(iterations, onFinish);
            }, 800);
        }
    }

    function onFinish(result, choice1, choice2) {
        return new Promise(resolve => {
            showChosenWeaponLeft(choice1);
            showChosenWeaponRight(choice2);
            setTimeout(() => {
                gamePlay.countScore(result);
                const winner = gamePlay.announceWinner(result, playerMode);
                gameUI.displayResultOfRound(result, winner);
            }, 1000);
            setTimeout(() => {
                gameUI.showGameBtns();
                changePlayerModeBtn.addEventListener(
                    "click",
                    gameUI.switchMode
                );
            }, 1200);
        });
    }

    function animateHands() {
        humanWeaponBox.style.left = "5vw";
        computerWeaponBox.style.left = "40vw";
        setTimeout(() => {
            humanWeaponBox.style.left = "10vw";
            computerWeaponBox.style.left = "35vw";
        }, 300);
    }

    function showChosenWeaponLeft(choice) {
        if (choice === weapons.SCISSORS) {
            scissorsWinHuman.classList.remove("hidden");
            rockWinHuman.classList.add("hidden");
        } else if (choice === weapons.PAPER) {
            paperWinHuman.classList.remove("hidden");
            rockWinHuman.classList.add("hidden");
        }
    }

    function showChosenWeaponRight(choice) {
        if (choice === weapons.SCISSORS) {
            scissorsWinComputer.classList.remove("hidden");
            rockWinComputer.classList.add("hidden");
        } else if (choice === weapons.PAPER) {
            paperWinComputer.classList.remove("hidden");
            rockWinComputer.classList.add("hidden");
        }
    }

    function toggleBoxes() {
        if (playerMode === "hc") {
            weaponBox.classList.toggle("hidden");
            fightHandsBox.classList.toggle("hidden");
            return;
        }
        if (playerMode === "cc") {
            fightHandsBox.classList.toggle("hidden");
            startFightBtn.classList.toggle("hidden");
        }
    }

    function toggleGameBtns() {
        gameBtnsBox.classList.toggle("hidden");
        changePlayerModeBtn.style.display = "block";
    }

    function resetScore() {
        scoreLeft = 0;
        scoreRight = 0;
        scoreLeftDisplay.innerText = 0;
        scoreRightDisplay.innerText = 0;
    }

    function resetFightHandImgs() {
        scissorsWinHuman.classList.add("hidden");
        paperWinHuman.classList.add("hidden");
        rockWinHuman.classList.remove("hidden");
        scissorsWinComputer.classList.add("hidden");
        paperWinComputer.classList.add("hidden");
        rockWinComputer.classList.remove("hidden");
    }

    function displayResultOfRound(result, winner) {
        if (result === 1) {
            scoreLeftDisplay.innerText = scoreLeft;
            document.getElementById("resultText").innerText = winner;
        } else if (result === 2) {
            scoreRightDisplay.innerText = scoreRight;
            document.getElementById("resultText").innerText = winner;
        } else {
            document.getElementById("resultText").innerText = winner;
        }
    }

    function showGameBtns() {
        toggleGameBtns();
    }

    function tryAgain() {
        toggleBoxes();
        resetFightHandImgs();
        toggleGameBtns();
    }

    function startNewGame() {
        toggleBoxes();
        toggleGameBtns();
        resetFightHandImgs();
        resetScore();
    }

    function showRules() {
        rulesModal.style.display = "block";
    }

    function closeRulesModal() {
        if (rulesModal.style.display === "block") {
            rulesModal.style.display = "none";
        }
    }

    function closeInfoModal() {
        infoModal.style.display = "none";
    }

    function closeModal(e) {
        if (e.target === infoModal || e.target === rulesModal) {
            infoModal.style.display = "none";
            rulesModal.style.display = "none";
        }
    }

    return {
        animateHands,
        closeRulesModal,
        closeInfoModal,
        closeModal,
        disableSwitchMode,
        displayResultOfRound,
        initPlayerModeHumanComputer,
        initPlayerModeComputerComputer,
        onFinish,
        playGameAnimation,
        resetFightHandImgs,
        resetScore,
        setPlayerMode,
        showChosenWeaponLeft,
        showChosenWeaponRight,
        showGameBtns,
        showRules,
        startGame,
        startNewGame,
        switchMode,
        switchUI,
        toggleBoxes,
        toggleGameBtns,
        tryAgain
    };
})();
