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


//global variables 
const buttonRoll = document.getElementById('btn-roll');

//can make this into objects
let player1CurrentScore = 0;
let player2CurrentScore = 0;

let player1HoldingScore = 0;
let player2HoldingScore = 0;

let player1Turn = false;
let player2Turn = false;

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
        player1Turn = true;
        gameStart = true;
    }

    if(player1Turn && diceThrow !== 1){
        console.log('Its player 1s turn');
        player1CurrentScore += diceThrow;
    }else if(player1Turn && diceThrow === 1){
        console.log('Player 1 throws a 1 and loses hold. Its players 2 turn');
        player1CurrentScore = 0;
        player2Turn = true;
        player1Turn = false;
        diceThrow = 0;
    } else if(player2Turn && diceThrow !== 1){
        console.log('Its player 2s turn');
        player2CurrentScore += diceThrow;
    }else{
        console.log('Player 2 throws a 1 and loses hold. Its players 2 turn');
        player2CurrentScore = 0;
        player2Turn = false;
        player1Turn = true;
        diceThrow = 0;
    }
    document.getElementById('current-0').innerText = player1CurrentScore;
    document.getElementById('current-1').innerText = player2CurrentScore;

});

//random dice throw selector
function getRandomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) +1) + min;
}

// function playerCurrentScore( whichPlayer,playerTurn, versusPlayerTurn, diceThrow){
//     let playerCurrent = 0;

//     if(playerTurn && diceThrow !== 1){
//         console.log('Its' + whichPlayer +'turn');
//         playerCurrent += diceThrow;
//     }else if(playerTurn && diceThrow === 1){
//         console.log(whichPlayer + 'throws a 1 and loses hold.');
//         playerCurrent = 0;
//         versusPlayerTurn = true;
//         playerTurn = false;
//         diceThrow = 0;
//     }
//     return playerCurrent;
// }