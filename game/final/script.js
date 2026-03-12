(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const table = document.querySelector('#table');
    const actions = document.querySelector('#actions');

    const commandH = document.querySelector('#commands h2');
    const commandS = document.querySelector('#commands p');

    const rulesBtn = document.querySelector('#toRules');
    const musicBtn = document.querySelector('#toMusic');
    const rules = document.querySelector('#rules');
    const closeBtn = document.querySelector('#close');

    const lockBtn = document.querySelector('#lock');
    const header = document.querySelector('header');

    const main = document.querySelector('main');
    const healthBar = document.querySelectorAll('.health-bar');
    const arrows = document.querySelectorAll('.pChoose');
    const form = document.querySelectorAll('form');

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
        gameEnd: 30,
    };

//settings----------------------------------------
    const music = document.querySelector('#bgMusic');
    music.volume = 0;

    function fadeIn(audio){
        audio.volume = 0;
        audio.play();

        const fade = setInterval(function(){
            if(audio.volume < 0.9){
                audio.volume += 0.1;
            } else {
                audio.volume = 1;
                clearInterval(fade);
            }
    }, 100);
    }

    function fadeOut(audio){
        const fade = setInterval(function(){
            if(audio.volume > 0.1){
                audio.volume -= 0.1;
            } else {
                audio.volume = 0;
                clearInterval(fade);
            }
        }, 100);
    }

    musicBtn.addEventListener('click', function(){
        if (music.paused) {
            fadeIn(music);
            musicBtn.innerHTML = "&#x23F8;";
        } else {
            music.pause();
            musicBtn.innerHTML = "&#9658;";
        }
    });

    rulesBtn.addEventListener('click', function(){
        rules.className = 'showing';
    });

    closeBtn.addEventListener('click', function(){
        rules.className = 'hidden';
    });

//home screen--------------------------------------

    lockBtn.addEventListener('click', function(){
        const name1 = document.querySelector('#name1').value;
        const name2 = document.querySelector('#name2').value;
        const names = [name1, name2];

        gameData.players[0] = name1 || 'Player 1';
        gameData.players[1] = name2 || 'Player 2';

        header.className = 'small';
        main.className = 'showing';
        lockBtn.className = 'hidden';

        form.forEach(function(box, index){
            const input = box.querySelector('input');

            const nameTag = document.createElement('p');
            nameTag.classList.add('player-name');
            nameTag.textContent = names[index];

            box.insertBefore(nameTag, box.firstChild);
            input.remove();
        });

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

//player images ----------------------------

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
        setCommand(`<strong class="player-name">${gameData.players[gameData.index]}</strong> starts`, 'First turn');
        highlight();
        celebrate(gameData.index);
        setTimeout(setUpTurn,2000);
    });

//base functions------------------------------------

    function setUpTurn() {
        table.className = 'showing';
        setCommand(`<strong class="player-name">${gameData.players[gameData.index]}</strong>`,'Yer up');
        table.innerHTML = `
            <div class="bothDice"><img class="dice" src="images/diceCube.png">
            <img class="dice" src="images/diceCube.png"></div>`;
            
        actions.innerHTML = '<button id="roll">Roll the Dice</button>';

        document.querySelector('#roll').addEventListener('click', rollDice);
    }

    function proceed() {
        actions.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';
        document.querySelector('#rollagain').addEventListener('click', rollDice);

        document.querySelector('#pass').addEventListener('click', function(){
            switchPlayer();
            setUpTurn();
        });
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) {
            setCommand(`<strong class="player-name">${gameData.players[gameData.index]}</strong> wins!`,`with ${gameData.score[gameData.index]} points`);
            celebrate(gameData.index);

            actions.innerHTML = '';
        } else {
            proceed();
        }
    }

    function switchPlayer(){
        gameData.index = 1 - gameData.index;
        highlight();
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

        function colorStrong(strongEl){
            if (!strongEl) return;
            const text = strongEl.textContent;
            if (text === gameData.players[0]) {
                strongEl.style.color = 'rgb(217, 72, 0)';
            } else if (text === gameData.players[1]) {
                strongEl.style.color = 'rgb(0, 0, 199)';
            } else {
                strongEl.style.color = '#333';
            }
        }

        commandH.querySelectorAll('.player-name').forEach(colorStrong);

        commandS.querySelectorAll('.player-name').forEach(colorStrong);
    }

    function highlight(){

        selectors.forEach(function(card){
            card.classList.remove('active-player');
        })

        selectors[gameData.index].classList.add('active-player');

        // form.forEach(function(box){
        //     box.classList.remove('active-player');
        // })

        // healthBar.forEach(function(bar){
        //     bar.classList.remove('active-player');
        // })

        // form[gameData.index].classList.add('active-player');
        // healthBar[gameData.index].classList.add('active-player');
    }

// playing--------------------------------

function rollDice(){
        setCommand('<strong>Rolling...</strong>','almost there');
        table.innerHTML = `
            <div class="bothDice"><img class="dice" src="images/diceRoll.gif">
            <img class="dice" src="images/diceRoll.gif"></div>`;

        setTimeout(function(){
            displayDice();
            diceOutcomes();
        },1500);
    };

    function displayDice(){
        gameData.roll1 = Math.floor(Math.random()*6) + 1;
        gameData.roll2 = Math.floor(Math.random()*6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        table.innerHTML = `
        <div class="bothDice"><img class="dice" src="images/${gameData.dice[gameData.roll1-1]}">
        <img class="dice" src="images/${gameData.dice[gameData.roll2-1]}"></div>`;
    }

    function diceOutcomes(){
        actions.innerHTML = '';

        const attackerIndex = gameData.index
        const defenderIndex = 1- gameData.index;

        // SNAKE EYES
        if(gameData.rollSum === 2) {

            gameData.score[gameData.index] = 0;
            gameData.index = defenderIndex;

            setCommand('Snake eyes!!!',`Switching to <strong class="player-name">${gameData.players[defenderIndex]}</strong>`);
            updateBar(attackerIndex);
            setTimeout(setUpTurn, 2000);
            return;
        }

        // ONE 1
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            
            setCommand(`<strong class="player-name">${gameData.players[attackerIndex]}</strong> rolled a 1`,`Switching to <strong>${gameData.players[defenderIndex]}</strong>`);
            switchPlayer();
            setTimeout(setUpTurn, 2000);
            return;
        }

        // ATTACK
        else if(gameData.roll1 === 6 || gameData.roll2 === 6) {
            let damage = gameData.roll1 === 6 ? gameData.roll2 : gameData.roll1;
            gameData.score[defenderIndex] = Math.max(0, gameData.score[defenderIndex] - damage); 
    
            setCommand('Sabotage!',`Taking ${damage} swag from <strong class="player-name">${gameData.players[defenderIndex]}</strong>`);

            updateBar(defenderIndex);
            celebrate(attackerIndex);
        }

        // NORMAL ROLL
        else {
            gameData.score[attackerIndex] += gameData.rollSum;

            setCommand(`<strong class="player-name">${gameData.players[attackerIndex]}</strong> got ${gameData.rollSum} swag`,'Right on');
            updateBar(attackerIndex);
        }

        console.log(
            `player 1 score: ${gameData.score[0]} 
            player 2 score: ${gameData.score[1]}
            ${gameData.roll1}, ${gameData.roll2}`
        );

        checkWinningCondition();
    }

})();