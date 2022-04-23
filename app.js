'use strict';

const choices = $('button')
const compChoices = ['rock', 'paper', 'scissors'];
const reasonString = '.reason p';

let userChoice = '';
let compChoice = '';
let userScore = 0;
let compScore = 0;
let playing = true;

function updateScore(roundWinner, roundLoser){
  const winner = '.results .' + roundWinner;
  const loser = '.results .' + roundLoser;
  //Visual cue for round winner
  if($(loser).hasClass('roundWinner')){
    $(loser).removeClass('roundWinner');
  }
  if(!$(winner).hasClass('roundWinner')){
    $(winner).addClass('roundWinner');
  }
  //Display score
  $('.player .score').text(userScore);
  $('.computer .score').text(compScore);
  //When game is over
  if(userScore > 4 || compScore > 4){
    playing = false;
    $('.winner').removeClass('hidden');
    $('.winner h2').text(`${roundWinner} wins!`);
  }
}

//logic for comparing user and computer choices
function checkResult(user, comp){
  if(user === comp){
    $(reasonString).text('Tie');
  }else if(user === 'rock' && comp === 'scissors'
  || user === 'paper' && comp === 'rock'
  || user === 'scissors' && comp === 'paper'){
    userScore++;
    $(reasonString).text(`${user} beats ${comp}`);
    updateScore('player', 'computer');
  } else{
    compScore++;
    $(reasonString).text(`${user} loses to ${comp}`);
    updateScore('computer', 'player');
  }
}

//randomly generate computer choice
const compClick = function(){
  const index = Math.trunc(Math.random() * 3);
  compChoice = compChoices[index];
  $('.computer .option').text(compChoice);
};

//record player choice
const buttonClicked = function(button){
  userChoice = button;
  $('.player .option').text(userChoice);
};

//change button opacity for visual cue when clicked
const buttonAnimation = function(button){
  button.addClass('pressed');
  setTimeout(function() {
  button.removeClass('pressed');
}, 200);
}

//assign functions to rock paper scissors buttons
choices.each(function(){
  $(this).click(function(){
    if(playing){
      buttonAnimation($(this));
      buttonClicked($(this).val());
      compClick();
      checkResult(userChoice, compChoice);
    }
  });
});

//reset to defaults for new game
$('.newGame').click(function(){
  $('.winner').addClass('hidden');
  userChoice = '';
  compChoice = '';
  userScore = 0;
  compScore = 0;
  playing = true;
  $('.player .score').text(userScore);
  $('.computer .score').text(compScore);
  $(reasonString).text('');
  $('.results div').each(function(){
    if($(this).hasClass('roundWinner')){
      $(this).removeClass('roundWinner');
    }
  })
})
