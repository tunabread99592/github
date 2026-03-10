(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const table = document.querySelector('#table');
    const actions = document.querySelector('#actions');

    const commandH = document.querySelector('#commands h2');
    const commandS = document.querySelector('#commands p');

    const main = document.querySelector('main');
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

//home screen--------------------------------------

    const lockBtn = document.querySelector('#lock');
    const header = document.querySelector('header');

    lockBtn.addEventListener('click', function(){

        const arrows = document.querySelectorAll('.pChoose');

        header.className = 'small';
        main.className = 'showing';
        lockBtn.className = 'hidden';

        arrows.forEach(function(arrow){
            arrow.classList.remove('showing');
            arrow.classList.add('hidden');

            console.log('removing arrows');
        })

        healthBar.forEach(function(bar){
            bar.classList.remove('hidden');
            bar.classList.add('showing');

            console.log('adding health bar');
        })
    });

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

    document.querySelector('#quitBtn').addEventListener('click', function (){
                location.reload();
        });

    startGame.addEventListener('click', function(){

        startGame.style.display = 'none';

        gameData.selectedCharacters = [
            gameData.characters[characterIndex[0]],
            gameData.characters[characterIndex[1]]
        ];

        updateBar(0);
        updateBar(1);

        gameData.index = Math.round(Math.random());
                console.log(gameData.index);

        setUpTurn();
        console.log('set up the turn');
    });

//base functions------------------------------------

    function proceed() {
        actions.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';
        document.querySelector('#rollagain').addEventListener('click', throwDice);

        document.querySelector('#pass').addEventListener('click', function(){
            switchPlayer();
            setUpTurn();
        });
    }

    function setUpTurn() {

        setCommand(`${gameData.players[gameData.index]}`,'Yer up');
        actions.innerHTML = '<button id="roll">Roll the Dice</button>';

        document.querySelector('#roll').addEventListener('click', throwDice);
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) {
            commandH.innerHTML = `${gameData.players[gameData.index]} wins!`
            commandS.innerHTML = `with ${gameData.score[gameData.index]} points`;

            actions.innerHTML = '';
            // document.querySelector('#quitBtn').innerHTML = 'Start a New Game?';
        } else {
            updateBar();
        }
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
        commandH.innerHTML = `${gameData.players[gameData.index]}`;
        commandS.innerHTML = 'Roll the dice';
        
        table.innerHTML = `
        <div class="bothDice"><img class="dice" src="images/${gameData.dice[gameData.roll1-1]}">
        <img class="dice" src="images/${gameData.dice[gameData.roll2-1]}"></div>`;
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
        const tagText = healthBar[playerIndex].querySelector('.tags p:last-child');
        tagText.textContent = `${points}/${total}`;

        bar.style.width = percent + '%';

        healthBar[playerIndex].dataset.value = points;
    }

    function setCommand(title,subtitle){
        commandH.innerHTML = title;
        commandS.innerHTML = subtitle;
    }

// playing--------------------------------

    function throwDice(){
        actions.innerHTML = '';

        rollDice();
        displayDice();
        
        const attackerIndex = gameData.index
        const defenderIndex = 1- gameData.index;

        // SNAKE EYES
        if(gameData.rollSum === 2) {

            gameData.score[gameData.index] = 0;
            gameData.index = defenderIndex;

            setCommand('Snake eyes!!!',`Switching to ${gameData.players[defenderIndex]}`);
            updateBar(attackerIndex);
            setTimeout(setUpTurn, 2000);
            return;
        }

        // ONE 1
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            
            setCommand(`${gameData.players[attackerIndex]} rolled a 1`,`Switching to ${gameData.players[defenderIndex]}`);
            switchPlayer();
            setTimeout(setUpTurn, 2000);
            return;
        }

        // ATTACK
        else if(gameData.roll1 === 6 || gameData.roll2 === 6) {
            let damage = gameData.roll1 === 6 ? gameData.roll2 : gameData.roll1;
            gameData.score[defenderIndex] = Math.max(0, gameData.score[defenderIndex] - damage); 
    
            setCommand('Sabotage!',`Taking ${damage} swag from ${gameData.players[defenderIndex]}`);

            updateBar(defenderIndex);
            celebrate(attackerIndex);
        }

        // NORMAL ROLL
        else {
            gameData.score[attackerIndex] += gameData.rollSum;

            setCommand(`${gameData.players[attackerIndex]} got ${gameData.rollSum} swag`,'Keep it comin');
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