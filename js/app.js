
//NOTES: Always REMEMBER that Global variables can be used throughout the entire code, onces they are declared
/*
 * Create a list that holds all of your cards
 */

let modalClass = document.querySelector('.modal');

//This form of variable declaration is from the Memory Game Webinar with Ryan Waite
let listAllCards = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",        
"fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb",
"fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];


let deck = document.querySelector('.deck');

/*Grabbing all the cards and adding a click event listener to flip the cards
*/ 
let allCards = document.querySelectorAll('.card');
let movesClass = document.querySelector('.moves');

//List of cards to be shuffled
let unshuffledCards = Array.from(document.querySelectorAll('.deck li'));

//Star removal
let star1 = document.querySelector('.star1');
let star2 = document.querySelector('.star2');
let star3 = document.querySelector('.star3');



let openCards = []; //Stores a list of open cards in an array object as they are clicked
let matchedList = [];
let matchedPair= 0;
let moves = 0;
let stars = 3; //The number of stars begans at 3, and will decrease as the the number of moves increase
let moveList = []; //Stores a list of moves
let clock = 0;
let gameTimer = '';
let timer = document.querySelector('.game-timer');
let cardShuffle = '';
let readyToShuffle = [];
let theShuffledCards = shuffle(unshuffledCards);

//End of Game
let endGameTime = document.querySelector('.time');
let endGameRating = document.querySelector('.rating');
let endGameMoves = document.querySelector('.end-moves');


 //Reset Game

let yesButton = document.querySelector('.yes_button');
let resetCard = document.querySelectorAll('.match');
let resetButton = document.querySelector('.fa-repeat')

//LIST OF FUNCTIONS TO USE


function getEndMoves(){

    
console.log(moves);

return moves;
}


function showModal(){
    stars = trackMoves(); // The value of stars is being set equal to the returen value of the starRating function
    moves = getEndMoves();
    modalClass.classList.remove('hide_modal');
    endGameTime.innerHTML = 'Game Completion Time =  ' + clock;
    endGameRating.innerHTML = 'Final Star Rating =  ' + stars;

    
    endGameMoves.innerHTML = 'Final Number of Moves Taken = ' + moves;

}

function hideModal(){

    console.log('This function hides the modal');
    modalClass.classList.add('hide_modal');

}


function startGame(card){ 


shuffle(Array.from(unshuffledCards));
console.log('Cards are Shuffling', unshuffledCards);
} 


function shuffleCards(){ //This shuffle function concept is from https://matthewcranford.com/?s=memory+game

const theShuffledCards = shuffle(unshuffledCards);
console.log(unshuffledCards);

console.log('The shuffle was successful');

for (card of theShuffledCards){

deck.appendChild(card);

    }

}


    
function addOpenCards(card){
    openCards.push(card);
}


function matchedCards(){
 //Need to loop through an array to add "match" class to all card sets that are flipped and that match
    openCards.forEach(function(openCard){
    openCard.classList.add('match');
      });
    console.log('We have a match!!!');
   
   // addMatchedCards();
    openCards = [];
    //Need to keep track of matched sets. Need to store in an array. Max number of matches is 8
    matchedPair++;
    const totalMatches = 8;
    if (matchedPair === totalMatches){

        console.log('The game is over');

        //The Modal Should pop up when this happens
        console.log('This signifies the modal popping up');
        stopTimer();
        gameOver();
        
    }
    
}


function addMatchedCards(openCard){

    openCard.classList.add('match');

    matchedList.push(openCard);

    return matchedList;  
   
    
}


function unmatchedCards(){

    openCards.forEach(function(openCard){
        setTimeout(function closeCards(){   //Use a Set timeOut function
            openCard.classList.remove('open','show'); //Unmatched flipped over cards are turned back over
                                                  //Unmatched cards should be removed from the "OpenCards" array
        },250);
    });
        openCards = []; //Need to empty array
        
        console.log('This is not a match');

}


function matchCheck(card){//The max number of possible matches is 8. Need to keep track of matched sets. 
                          //When total of matched sets equals 8, the game is over.

    //Need to check if cards match, at this point
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
                
        matchedCards();    
                  
    }else //if(openCards[0].firstElementChild.className !== openCards[1].firstElementChild.className)
      
        unmatchedCards();        
        
   } 


function moveCounter(count){
    
    if (moves > 0){
        
       // moveList.push(moves);
         
       movesClass.innerHTML = moves;
    
    }

    
   }


function startTimer(){ //This functions concept comes from https://matthewcranford.com/?s=memory+game

    gameTimer = setInterval(function(){

        clock++;
        timer.innerHTML = 'Timer  ' + clock;

    },1000);
    
   }


function resetTimer(){

 clock = 0;
 timer.innerHTML = 'Timer ' + clock;
 gameTimer = '';

}


function gameOver(){

//Need to Create Modal the Says Congratultions and gives the final score

setTimeout(function(){

    showModal();

    },1000);
    

}

function resetMoves(){
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;


}


function stopTimer(){


    clearInterval(gameTimer);
    
    }

function restartGame(){
     console.log('The game is reset.');
   // This will reset the game board, the timer, and the star rating.
   //resetCard.classList.remove('open','show','match'); //Reset card is a nodelist that need to be stored in an array
   hideModal();
   resetMoves();
   resetStars();
   resetTimer();
   resetCards();    
       
 }


function resetStars(){ //This reset stars function is from https://matthewcranford.com/?s=memory+game

   stars = 0;
   const allStars = document.querySelectorAll('.stars li');
   for (star of allStars){

        star.style.display = 'inline';
   }
   
   }


function resetCards(){

    for (card of allCards){

        card.classList.remove('open','show','match');

    }

   }



   // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(shuffledCardsArray) {
    let currentIndex = shuffledCardsArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = shuffledCardsArray[currentIndex];
        shuffledCardsArray[currentIndex] = shuffledCardsArray[randomIndex];
        shuffledCardsArray[randomIndex] = temporaryValue;
    }

    return shuffledCardsArray;
}


function removeStars(){ //This star removal function is from https://matthewcranford.com/?s=memory+game

   const allStars = document.querySelectorAll('.stars li');
   for (star of allStars){

        if (star.style.display !== 'none'){

            star.style.display = 'none';
            break;
        }
   }
}


function trackMoves(){

    if (moves === 16){
        removeStars();
        stars--; //The value of stars is 2
    } else if (moves === 24){
        removeStars();
        stars--; //The value of stars is one
    }
    
    //return stars; //This stores the current value of stars (which is = 1 star) to be later used, if necessary
   return stars; 
   
}

function playAgain(){

    yesButton.addEventListener('click', function (event) {
       console.log('The yes button was clicked');
       restartGame();
       
    });
    }


//Shuffle the cards from the previous game. Shuffle needs to happen as soon as the page loads.


//EVENTLISTENER FOR CLICKED CARDS

shuffleCards();
allCards.forEach(function(card){    
    
    card.addEventListener('click', function (evt){
       
        
        if (gameTimer===''){
           
            startTimer()

    } else {
        console.log('Stop the timer.');
    }
    
    if (openCards.indexOf(card)!==-1){
        return;
    } 
    if (openCards.length>1) {
      console.log(openCards.length);
      return;
    }

        card.classList.add('open','show'); // Flips cards over and shows icons

        console.log('This is the first Card flip');
        addOpenCards(card) // Stores clicked cards in an array object above                  
       
        if (openCards.length < 2){

            console.log('Click another card');
             // Flips cards over and shows icons for the 2nd card flip                 
                

        } else if (openCards.length === 2){
            console.log('Checking for a match');
             //Need to check if cards match, at this point
             matchCheck()
             moves++; //Need to increment moves after 2 cards are clicked. Running count of moves
             moveCounter();
             trackMoves();

            console.log('Two Card Max is Reached.');

                    
            }
    });

});   



//EVENTLISTENER for Modal Buttons

playAgain();


//EVENTLISTENER for Restart Button

resetButton.addEventListener('click', function (event){
stopTimer();
shuffleCards();
restartGame();
playAgain();
});


// References include:https://matthewcranford.com/?s=memory+game, Memory Game Webinar With Ryan Waite, Memory Game Webinar with Mke Wales, https://developer.mozilla.org, https://www.w3schools.com/


  




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
