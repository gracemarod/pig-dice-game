/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//dice images
const diceSide1 = './assets/images/dice-1.png';
const diceSide2 = './assets/images/dice-2.png';
const diceSide3 = './assets/images/dice-3.png';
const diceSide4 = './assets/images/dice-4.png';
const diceSide5 = './assets/images/dice-5.png';
const diceSide6 = './assets/images/dice-6.png';


//global variables from html elements
const buttonRoll = document.getElementById('btn-roll');
const buttonHold = document.getElementById('btn-hold');

//can make this into objects
const player1 = {
    currentScore :0,
    holdingScore: 0,
    turn: false
}

const player2 = {
    currentScore: 0,
    holdingScore: 0,
    turn: false
}

let gameStart = false;
let diceThrow = 0;

buttonRoll.addEventListener('click', function(event){
    diceThrow = getRandomIntInclusive(0,6);
    console.log("Dice throw: ", diceThrow);
    switch(diceThrow){        
        case 1:
            document.querySelector(".dice").src=diceSide1;
            break;
        case 2:
            document.querySelector(".dice").src=diceSide2;
            break;
        case 3:
            document.querySelector(".dice").src=diceSide3;
            break;
        case 4:
            document.querySelector(".dice").src=diceSide4;
            break;
        case 5:
            document.querySelector(".dice").src=diceSide5;
            break;
        case 6:
            document.querySelector(".dice").src=diceSide6;
            break;
        default:
            document.querySelector(".dice").src=diceSide1;
    }
    if(!gameStart) {
        player1.turn = true;
        gameStart = true;
    }
    console.log("Panel 0:", );
    if(player1.turn && diceThrow !== 1){
        console.log('Its player 1s turn');
        player1.currentScore += diceThrow;
    }else if(player1.turn && diceThrow === 1){
        console.log('Player 1 throws a 1 and loses hold. Its players 2 turn');
        player1.currentScore = 0;
        player2.turn = true;
        player1.turn = false;
        diceThrow = 0;
        
    } else if(player2.turn && diceThrow !== 1){
        console.log('Its player 2s turn');
        player2.currentScore += diceThrow;
    }else{
        console.log('Player 2 throws a 1 and loses hold. Its players 2 turn');
        player2.currentScore = 0;
        player2.turn = false;
        player1.turn = true;
        diceThrow = 0;
    }
    document.getElementById('current-0').innerText = player1.currentScore;
    document.getElementById('current-1').innerText = player2.currentScore;
    changePlayerPanelHighlight(player1.turn, player2.turn);
});


buttonHold.addEventListener('click',function(event) {
    if(player1.turn){
       console.log("Player 1 HOLD");
       player1.holdingScore += player1.currentScore;
       player1.currentScore = 0;
       document.getElementById('current-0').innerText = player1.currentScore;
       player1.turn = false;
       player2.turn = true; 
    }else{
      console.log("Player 2 HOLD");
       player2.holdingScore += player2.currentScore;
       player2.currentScore = 0;
       document.getElementById('current-1').innerText = player2.currentScore;
       player2.turn = false;
       player1.turn = true; 
    }
    document.getElementById('score-0').innerText = player1.holdingScore;
    document.getElementById('score-1').innerText = player2.holdingScore;
    changePlayerPanelHighlight(player1.turn, player2.turn);
})

//random dice throw selector
function getRandomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) +1) + min;
}

function changePlayerPanelHighlight(player1turn, player2turn){
    const player1PanelClasses = document.querySelector('.player-1-panel').classList;
    const player2PanelClasses = document.querySelector('.player-2-panel').classList;
    const tableLeftClasses = document.querySelector('.table-left').classList;
    const tableRightClasses = document.querySelector('.table-right').classList;

    if (player2turn){
        player1PanelClasses.remove('active');
        player2PanelClasses.add('active');
        tableLeftClasses.remove('active');
        tableRightClasses.add('active');

    }else{
        player2PanelClasses.remove('active');
        player1PanelClasses.add('active');
        tableRightClasses.remove('active');
        tableLeftClasses.add('active');
    }
}