(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const scoreBoard = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    const healthBar = document.querySelectorAll('.health-bar');

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png',
            '4die.png', '5die.png', '6die.png'],
        players: ['player 1', 'player 2'],

        characters: ['wizard1.png', 'pirate1.png', 'ninja1.png', 'cowboy1.png'],

        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 100,
    };

//player customization ----------------------------

    const selectors = document.querySelectorAll('.character-select');
    
    let characterIndex = [];

    selectors.forEach(function(selector,player){
        const img = selector.querySelector('.displayed');
        const prev = selector.querySelector('.left');
        const next = selector.querySelector('.right');
        
        characterIndex[player] = 0;

        function updateImage() {
            img.src = `images/${gameData.characters[characterIndex[player]]}`;
        }

        updateImage();

        //NEXT 
        next.addEventListener('click', function(){
            characterIndex[player] = (characterIndex[player] + 1) % gameData.characters.length;

            updateImage();
        });

        //PREVIOUS
        prev.addEventListener('click', function(){
            characterIndex[player] = (characterIndex[player] - 1 + gameData.characters.length) % gameData.characters.length;
            updateImage();
        });
    });

   
// start game --------------------------------------

    startGame.addEventListener('click', function(){

        const arrows = document.querySelectorAll('.pChoose');
        arrows.forEach(function(arrow){
            arrow.classList.replace('showing','hidden');
        })

        healthBar.forEach(function(bar){
            bar.classList.replace('hidden','showing');
        })

        gameData.selectedCharacters = [
            gameData.characters[characterIndex[0]],
            gameData.characters[characterIndex[1]]
        ];

        updateBar(0);
        updateBar(1);

        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

        document.querySelector('#quit').addEventListener('click', function (){
                location.reload();
        });

        gameData.index = Math.round(Math.random());
                console.log(gameData.index);
        setUpTurn();
        console.log('set up the turn');
    });

//base functions------------------------------------

    function proceed() {
        actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';
        document.querySelector('#rollagain').addEventListener('click', function(){
            throwDice();
        });
        document.querySelector('#pass').addEventListener('click', function(){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setUpTurn();
        });
    }

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

        document.querySelector('#roll').addEventListener('click', function(){
            console.log('Roll the Dice!');
            throwDice();
        });
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) {
            game.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a New Game?';
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        scoreBoard.innerHTML =
         `<p>The score is currently
         <strong>${gameData.players[0]} : ${gameData.score[0]}</strong> and
         <strong>${gameData.players[1]} : ${gameData.score[1]}</strong></p>`;
    }

    function switchPlayer(){
        gameData.index = 1 - gameData.index;
    }

    function rollDice(){
        // game.innerHTML = `<p>Rolling...</p>`
        // game.innerHTML += `
        //     <img class="dice" src="images/diceRoll.gif">
        //     <img class="dice" src="images/diceRoll.gif">`;

        // setTimeout(function(){
        //     gameData.roll1 = Math.floor(Math.random()*6) + 1;
        //     gameData.roll2 = Math.floor(Math.random()*6) + 1;
        //     gameData.rollSum = gameData.roll1 + gameData.roll2;

        //     displayDice();
        // },2000);

        gameData.roll1 = Math.floor(Math.random()*6) + 1;
        gameData.roll2 = Math.floor(Math.random()*6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
    };

    function displayDice(){
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        
        game.innerHTML += `
        <img class="dice" src="images/${gameData.dice[gameData.roll1-1]}">
        <img class="dice" src="images/${gameData.dice[gameData.roll2-1]}">`;
    }

    function celebrate(player){
        const img = document.querySelectorAll('.displayed')[player];

        const normal = img.src;
        const celebrate = normal.replace('1.png','2.png');
        img.src = celebrate;

        setTimeout(function(){
            img.src = normal;
        },2000);
    }

    function updateBar(playerIndex) {
        const bar = healthBar[playerIndex].querySelector('.bar');
        const points = gameData.score[playerIndex];
        const total = parseInt(healthBar[playerIndex].dataset.total);
        const percent = Math.min(100, (points/total)*100);

        bar.style.width = percent + '%';

        healthBar[playerIndex].dataset.value = points;
    }

// playing--------------------------------

    function throwDice(){
        actionArea.innerHTML = '';

        rollDice();
        displayDice();
        
        const attackerIndex = gameData.index
        const defenderIndex = 1- gameData.index;

        // SNAKE EYES
        if(gameData.rollSum === 2) {

            game.innerHTML+= '<p>Oh snap! Snake eyes!</p>';
        
            gameData.score[gameData.index] = 0;
            gameData.index = defenderIndex;

            updateBar(attackerIndex);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
            return;
        }

        // ONE 1
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[defenderIndex]}</p>`;

            switchPlayer();
            setTimeout(setUpTurn, 2000);
            return;
        }

        // ATTACK
        else if(gameData.roll1 === 6 || gameData.roll2 === 6) {
            
            game.innerHTML += '<p>A direct hit!</p>';

            let damage = gameData.roll1 === 6 ? gameData.roll2 : gameData.roll1;

            gameData.score[defenderIndex] = Math.max(0, gameData.score[defenderIndex] - damage); 
    
            updateBar(defenderIndex);
            celebrate(attackerIndex);
        }

        // NORMAL ROLL
        else {
            gameData.score[attackerIndex] += gameData.rollSum;

            updateBar(attackerIndex);
        }

        console.log(
            `player 1 score: ${gameData.score[0]} 
            player 2 score: ${gameData.score[1]}
            ${gameData.roll1}, ${gameData.roll2}`
        );
     
        proceed();
        checkWinningCondition();
    }

})();