'use strict'
    // set turnNum to 1.
let turnCount = 1,   thisRoom = '',
    win = window,    doc = document;

// keep track of time:
let startRound = parseInt(Date.now()), // time round starts
    endRound = 0, // time round ends
    score = 0,
    timerLength = 10, // how many seconds on the clock
    ticks = timerLength; // show countdown.

// initiate intervalIds
let timer = undefined, countdown = undefined, button = undefined;

(function createButton(){
   // draw & attach button
   button = $('<button>')
   button.attr('id','click-test')
   button.prependTo($('div.question'));

   // assign click event
   button.click(function(){
      console.log('clicked button');
      // get score
      getScore();

      // set or restart timer
      (turnCount < 10) ? resetTimers() : endGame();

      // pop bubbles
      return false;
   })
})()

let clickButt = function(){
   button.click()
   console.log('click triggered from Interval')
}

let getScore = function(){
   endRound = parseInt(Date.now());

   let diff = endRound - startRound;
   console.log('time elapsed since start is: '+(diff/1000)+' seconds');
   score += (diff > 7000) ? diff : 0;

   console.log('score is: ',score,' at end of turn: ',turnCount);
   turnCount++;
}

let resetTimers = function(){
   // clear the timer
   win.clearInterval(countdown);
   // start it up again
   startRound = parseInt(Date.now()),
   setTimer();
}

let countDown = function(){
   if (ticks > 0){
      let ticker = (ticks % 2 == 0) ? ' seconds...tick' : ' seconds...tock';
      console.log(ticks + ticker);
      ticks--
   } else {
      console.log('TIME\'S UP! TURN '+turnCount+' OVER!');
      timesUp()
   }
}

function timesUp(){
   // new round starting
   clickButt()
}

function setTimer(){
   ticks = timerLength;
   // time is up in....
   countdown = win.setInterval(countDown,1000)
}

function endGame(){
   win.clearInterval(countdown)
   console.log('GAME OVER!');
   turnCount = 10;
   button.detach();
}

setTimer();


// 0. on lobby page? call start game using name of room as param
// startgame(‘roomname’) = >
// get :/roomname
// this returns roomNameString,
// assign roomNameString to thisRoom

// 1. on controller/routes page:
// start game route does get questions()
   // -get questions queries database for 10 question objects, saves them to room object.
   // -after questions are received, send 'startTurns' to page.


// 2. recieving 'startTurns' means we call startTurns()

// // -startTurns does:
// let startTurns = function(){
//    turnCount = 1; //redundant now, but useful later on.
//    getTurn(rname,tnum)
// }
//
// let getTurn = function(){
//    let turnUrl = '/' + turnCount
//    $.ajax({
//       url: turnUrl,
//
//    })
// }
// // get /:tnum finds the question[turnNumber] for the room object[rname],
// // sends the following to the dom:
// // question
// // choices
// // assigns Date.now to a variable (startedQ).
// // user makes a selection. hitting confirm logs their choice and does
// // post /turn
// // difference = Date.now - startedQ
// // gets question[turnNum] and fetches correct choice.
// // sees if user choice matches answer
// // if yes: add multiple of difference
// // if no, subtract score
// // show score to user in dom
// // call setNextTurn(rname,tnum+1) <-calls next turn automatically. or can click button for next.
// // have 1 function that either listens for a click or fires automatically. how.
// //
// // document.getElementById('yourLinkID').click(); <-clicks link
// //
// // how to have setTimeout run click || user click.???
// //
// // may not be able to have questions timed, just assign scores of 0 if difference is greater than 30s
//
//
//
//
//
// // make a button appear for now. This will be triggered later.
// $('#start-game-button').click(function (event) {
//    console.log('starting game');
//
//    // call startgame function
//    return false
// })
//
// // this creates gathers our questions, starts the game
// let startGame = function(rName){
//    let thisRoom = Room.find({'title':rName})
//
//    // take room offline:
//    let changeStatusUrl = '/game/change/'+rname+'/true'
//    $.ajax({
//       url: changeStatusUrl
//    })
//
//    // display loading screen
//    $('.room-loading-text').text(thisRoom.description)
//    $('.room-loading-bg').css('background-url',thisRoom.img_url)
//    $('.room-loading-ninja').css('background-url'),thisRoom.ninja)
//    $('#room-loading').show();
//
//    // call draw gameboard
//
//    // calls get questions
//    getQuestionsFromAPI(rName,1)
// }

   // sets

   // $('.get-question').click(function(event){
   //   event.preventDefault();
   //   console.log('clicked!');
   //
   //   $.ajax({
   //     url: 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/getAllQuizQuestions?limit=10&page=1',
   //     headers:{'X-Mashape-Key': 'TBD'}
   //   }).done(function(data){
   //         console.log(data);
   //     var list = $('.selected-question').append('<ul class="current-question">').find('ul');
   //     for (var i = 0; i < data.length; i ++) {
   //       $(list).append('<li>' + data[i] + '</li>');
   //     };
   //   });
   // });
