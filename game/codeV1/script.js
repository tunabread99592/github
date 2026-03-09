(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    const gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg',
            '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 100,
    };

    let attacker;
    let defender;
    let defenderIndex;


    startGame.addEventListener('click', function(){
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

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

        document.querySelector('#roll').addEventListener('click', function(){
            console.log('Roll the Dice!');
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random()*6) + 1;
        gameData.roll2 = Math.floor(Math.random()*6) + 1;

        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}">
        <img src="images/${gameData.dice[gameData.roll2-1]}">`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;


        if(gameData.index){
            attacker = gameData.score[0];
            defender = gameData.score[1];
            // defenderIndex = 0;
        }
        else {
            attacker = gameData.score[1];
            defender = gameData.score[0];
            // defenderIndex = 1;
        }

        // if two 1s are rolled
        if(gameData.rollSum === 2) {
            console.log("snake eyes");
            game.innerHTML+= '<p>Oh snap! Snake eyes!</p>';
            //set the score for the current player
            gameData.score = (gameData.index = 0);
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //we will ad showCurrentScore() function here...
            //wait 2 seconds
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }


        else if(gameData.roll1 === 6) {
            console.log('Dice 1 is a 6');
            game.innerHTML+= '<p>A direct hit!<p>';

            gameData.score[defender] = defender - gameData.roll2;
            console.log(gameData.score[gameData.index]);
            console.log(gameData.roll2);









            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.querySelector('#rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();

            // bottomLine();
        }


        else if (gameData.roll2 === 6) {
            console.log('Dice 2 is a 6');
            game.innerHTML+= '<p>A direct hit!<p>';

            gameData.score[defender] = defender - gameData.roll1;
            console.log(gameData.score[gameData.index]);
            console.log(gameData.roll1);







            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.querySelector('#rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();

            // bottomLine();
        }

        else {
            console.log('neither die was a 1, so the game continues');
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.querySelector('#rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
        }

        console.log
            (`player 1 score: ${gameData.score[0]} 
            player 2 score: ${gameData.score[1]}
            ${gameData.roll1}, ${gameData.roll2}`
            );
     
        // gameData.roll1 = 1;
        // gameData.roll2 = 1;


        
        // else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
        //     console.log('one of the two dice rolled is a 1');
        //     gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        //     game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
        //     setTimeout(setUpTurn, 2000);
        // }

        
        // else {
        //     console.log('neither die was a 1, so the game continues');
        //     gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
        //     actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

        //     document.querySelector('#rollagain').addEventListener('click', function(){
        //         throwDice();
        //     });

        //     document.querySelector('#pass').addEventListener('click', function(){
        //         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        //         setUpTurn();
        //     });

        //     checkWinningCondition();
        // }
    }

    function bottomLine(){
        if(gameData.score[0]<0){
            gameData.score[0]=0;
        }
        else if(gameData.score[1]<0){
            gameData.score[1]=0;
        };
    }

    function checkWinningCondition() {
        // console.log(gameData.players[gameData.index], gameData.score[gameData.index]);
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a New Game?';
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} : ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} : ${gameData.score[1]}</strong></p>`;
    }

})();