'use strict';

var scores, roundScore, activePlayer, gamePlay, lastDice;

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    gamePlay = true;


    //Selecting Elements
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');

}

init();


function nextPlayer (){
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
   
    document.getElementById('current--0').textContent = '0'; 
    document.getElementById('current--1').textContent = '0';
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
  }
  

document.querySelector('.btn--new').addEventListener('click', init);


document.querySelector('.btn--roll').addEventListener('click', function(){

    if(gamePlay){

        //random number
    var dice = Math.floor(Math.random() * 6) + 1; 
    var dice1 = Math.floor(Math.random() * 6) + 1; 

    //change dice and display result
    var diceDom = document.querySelector('.dice');
    var diceDom1 = document.querySelector('.dice-1');
    diceDom.style.display = 'block';
    diceDom1.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    diceDom1.src = 'dice-' + dice1 + '.png';

    //update the round score if the rolled number is not 1
         if (dice !== 1 && dice1 !== 1){
        //Update score
        roundScore += dice + dice1;
        document.getElementById('current--' + activePlayer).textContent = roundScore;       

     } 
    
      else {
      //next player
      nextPlayer();

     }

     lastDice = dice;

    }

    

});

document.querySelector('.btn--hold').addEventListener('click', function(){

    if(gamePlay){
          //add current score to the global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

    //Getting the value from the input
    var input = document.querySelector('.final-score').value;
    
    //Undefined, 0, '', are COERCED to false
    //Anything else is COERCED to True
    var winScore;
    if (input){
        winScore = input;
    } else {
        winScore = 100;
    }

    //check if player won the game
    if (scores[activePlayer] >= winScore){
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.player--' + activePlayer).classList.remove('player--active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-1').style.display = 'none';

        gamePlay = false;

    } else {
     //next player
      nextPlayer();
    }

    }

  
 

});
