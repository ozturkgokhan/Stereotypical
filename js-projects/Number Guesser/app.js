
// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3,
    isFinished = false,
    msg = '';

// UI elements
const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

winningNum =  Math.floor(Math.random() * (max-min+1) + min);

// listen for play again button
gameWrapper.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
      window.location.reload();
    };
  } 
);

// listen for guess button
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max){
      msg = `You need to guess a number between ${min} and ${max}`;
      SetMessage(msg,'red');
    }else{
      ValidateWinningNum(guess);
    };
  }
);

function ValidateWinningNum(guess){
  if(guessesLeft > 0 && guessesLeft <= 3){

    if(guess == winningNum){
      msg  = `${winningNum} is correct, you win!!`;
      SetMessage(msg,'green');
      guessInput.style.borderColor = 'green';
      isFinished = true;
    } else {
      msg = `${guessInput.value} is not correct, you have ${guessesLeft-1} guesses left!`
      guessesLeft --;
      SetMessage(msg,'red');
      guessInput.style.borderColor = 'red';

      if(guessesLeft === 0){
        SetMessage(`Game over, you lost! Correct answer was ${winningNum}`)
        guessInput.style.borderColor = 'gray';
        isFinished = true;
      };
    };

    if(isFinished){
      guessBtn.value = 'Play Again';
      guessBtn.className += 'play-again';
      guessInput.value = '';
      guessInput.disabled = true;
    };
  };
};

function SetMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
};


