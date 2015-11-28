


// make a button appear for now. This will be triggered later.
$('#start-game-button').click(function (event) {
   console.log('starting game');

   // call startgame function
   return false
})

// this creates gathers our questions, starts the game
let startGame = function(rName){
   let thisRoom = Room.find({'title':rName})

   // take room offline:
   let changeStatusUrl = '/game/change/'+rname+'/true'
   $.ajax({
      url: changeStatusUrl
   })

   // display loading screen
   $('.room-loading-text').text(thisRoom.description)
   $('.room-loading-bg').css('background-url',thisRoom.img_url)
   $('.room-loading-ninja').css('background-url'),thisRoom.ninja)
   $('#room-loading').show();

   // call draw gameboard

   // calls get questions
   getQuestionsFromAPI(rName,1)
}
'use strict'

///// click to show test functions /////////////////////////////////////////////
// let test = true
//
// let getResults = function (c,p) {
//    let reqUrl = '/test/'+c+'/'+p
//    $.ajax({
//       url: reqUrl,
//       method: "GET"
//    }).done(renderResults)
// }
//
// let renderResults = function(data) {
//    if (test){
//       if (data[0] == 'next') {
//          getResults(data[1],data[2])
//       } else {
//          $("#results").text(data[0])
//       }
//    }
// }
//
// $('#run').click(function(){
//    // loading screen
//    $("#results").text('running');
//
//    // DO ALL THE THINGS!!!
//    test = true;    console.log('running');
//
//    // get category id number from input box
//    let categoryNum = $('#category').val()
//
//    // go fetch
//    getResults(categoryNum,1)
//
//    // popping bubbles
//    return false
// })
// $('#stop').click(function(){
//    // staaahp
//    test = false;   console.log('stopped');
//    return false
// })
///// end of tester functions //////////////////////////////////////////////////

// first-tier variables
let thisRoom    = '?',     win   = window,
                           doc   = document;

// keep track of time and turn:
let turnCount   = 1,       score = 0,
    timerLength = 10,      ticks = timerLength,
    startRound = 0,        // intervalId
                           timer = undefined;

// second-tier variables
let button      = undefined,
    answer      = 2;

///// helper functions and shortcuts ///////////////////////////////////////////
//
// these are abstracted into helper.js:
//
// timeNow()               what time is it?
// clickButt(thisThing)    thisThing.click()
// timesUp(clickThis)      triggers clickThis.click()
// calculator(diff)        gets raw score based on diff in time

// set our timer
function setTimer(){
   ticks = timerLength;
   startRound = timeNow(),
   timer = win.setInterval(countDown,1000)
}

// clear and set timer
function resetTimer(){
   win.clearInterval(timer);
   setTimer();
}

///// end of helpers & shortcuts ///////////////////////////////////////////////

function createButton(){
   // draw & attach button
   button = $('<button>')
   button.attr('id','click-test')
   button.prependTo($('div.question'));

   // assign click event
   button.click(function(){
      console.log('clicked button');
      findChoice(0);
      // get score
      getScore();

      // set or restart timer
      (turnCount <= 10) ? resetTimer() : endGame();

      // pop bubbles
      return false;
   })
}

function assignClicks(){
   let divs = [
      {'#uno': 1},
      {'#dos': 2},
      {'#tres': 3},
      {'#four': 4}
   ]

   for (var i = 0; i < divs.length; i++) {
      let div = $('' + divs[i][0]);
      let a = divs[i][1]
      div.click(function(){
         // what was clicked?
         findChoice(a);
         console.log(answer);
         // get score
         getScore();

         // set or restart timer
         (turnCount <= 10) ? resetTimer() : endGame();

         // pop bubbles
         return false;
      })
   }
}

///// scoring unit /////////////////////////////////////////////////////////////

let findChoice = function(choice){
   // if ('uno'){
   //    answer = 1;
   // } else if (choice.id == 'dos'){
   //    answer = 2;
   // } else if (choice.id == 'tres'){
   //    answer = 3;
   // } else if (choice.id == 'four'){
   //    answer = 4;
   // } else {
   //    answer = 0;
   // }
   (choice <= 1 && choice >=4 ) ? (answer = choice) : (answer = 0);
}

let getScore = function(){
   let diff = timeNow() - startRound;
   score += calculateScore(diff);
   console.log('your current score is: ',score,' at the end of turn: ',turnCount);
   turnCount++;
}

let calculateScore = function(timeElapsed){
   let diff = timeElapsed/1000;
   let raw = calculator(diff); // helper is above
   console.log(raw);
   let checked = checkAnswer(raw,answer);
   console.log('you answered in '+diff+' seconds and got '+checked+' points!');
   return checked
}

let checkAnswer = function(points,answer){
   // write this route to query db!
   // for current room:     question #      check     pass in
   let getUrl = '/check/'+(turnCount-1)+'/'+answer+'/'+points
   $.ajax({
      url: getUrl,
      method: "GET"
   }).done(showAnswer)
}

// check answer passes 'data' to showAnswer
// data is an array with 2 values:
// [0]:   'correct' or 'incorrect'
// [1]:   rawPoints
let showAnswer = function(data) {
   if (data[0] != 'correct') {
      return data[1] * -1
   } else {
      return data[1]
   }
}
///// end of scoring unit //////////////////////////////////////////////////////

///// timer unit ///////////////////////////////////////////////////////////////
function countDown(){
   if (ticks > 0){
      let ticker = (ticks % 2 == 0) ? ' seconds...tick' : ' seconds...tock';
      console.log(ticks + ticker);
      ticks--
   } else {
      console.log('TIME\'S UP! TURN '+turnCount+' OVER!');
      timesUp(button)
   }
}

///// this is the end //////////////////////////////////////////////////////////

function endGame(){
   win.clearInterval(timer)
   console.log('GAME OVER!');
   turnCount = 1;
   button.detach();
}

////// start running shit! /////////////////////////////////////////////////////
createButton(); assignClicks(); setTimer();



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
//
//
// get /:tnum finds the question[turnNumber] for the room object[rname],
// sends the following to the dom:
// question
// choices
// assigns Date.now to a variable (startedQ).
// user makes a selection. hitting confirm logs their choice and does
// post /turn
// difference = Date.now - startedQ
// gets question[turnNum] and fetches correct choice.
// sees if user choice matches answer
// if yes: add multiple of difference
// if no, subtract score
// show score to user in dom
// call setNextTurn(rname,tnum+1) <-calls next turn automatically. or can click button for next.
// have 1 function that either listens for a click or fires automatically. how.
//
// document.getElementById('yourLinkID').click(); <-clicks link
//
// how to have setTimeout run click || user click.???
//
// may not be able to have questions timed, just assign scores of 0 if difference is greater than 30s
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
