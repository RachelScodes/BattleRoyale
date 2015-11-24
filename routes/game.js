'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    mongoose = require('mongoose'),
    Question = require('../models/question.js'),
    room     = [],
    unirest  = require('unirest'); //not needed
///// require all the things because yolo //////////////////////////////////////


   // get question from API
let getQuestions = function(catNum, array){
   console.log('2. inside getQuestions');
   let i = array.length
   // run this until we have enough good questions
   while (i < 10){
      (function(){
         let waw = i
         setTimeout(function(){
            console.log(i);
            console.log(prompt);
            console.log('2.5 inside setTimeout1');
         }, 1000 * array.length);
      })()
      console.log('3. inside while loop');
      let pageNum = Math.ceil(Math.random()*30);
      unirest.get(getUrl(catNum,pageNum))
      .header("X-Mashape-Key", "lX0iJk5iGlmshE7fTOCtRf7hsj3Zp1NuuosjsnBKj4jIROPs9R")
      .header("Accept", "application/json")
      .end(function(result){
         (function(){
               if (result.body.length >= 1) {
                  console.log('5. result status: ' + result.status);
                  var prompt = '6. we have: ' + array.length + ' questions'
                  setTimeout(function(){
                     console.log(prompt);
                     console.log('7. inside setTimeout');
                     if (array.length < 10){
                        console.log('8. inside IF tenQ.length');
                        var question = new Question(result.body[0]);
                        question.save(function(err) {
                           console.log('9. inside question.save');
                           if (err) {
                              // if bad question, don't save
                              console.log('10. error');
                           } else {
                              // if it's good, save it to array
                              console.log('10. question:');
                              console.log(question);
                              array.push(question)
                           }
                        })
                     }
                  }, 1000 * array.length);
               }
            })
         ()
      })
   }
   // when we have enough questions, send them to game.
   console.log(array);
   return array
}

// end function (){
   // set variable that is data
   // if it works, go up, if not, don't go up.
   // use set timeout
   // for(var i = 0)
// }


// save valid api question to our database
let saveQuestions = function(num,object, array){
   console.log('6. num is: ' + num + 'array is: ');
   console.log(array);
   console.log('7 aka LAST. result retrieved!');
   console.log(object.body[0]);
   if (array.length < 10){
      var question = new Question(object.body[0]);
      question.save(function(err) {
         if (err) {
            // if bad question, don't save
            console.log('noooope');
         } else {
            // if it's good, save it to array
            console.log(question);
            array.push(question)
         }
      })
   }
   console.log(array);
   return array
}

let getUrl = function(cNum,pNum){
   console.log('4. page num: '+ pNum);
   let base = "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=";
   return base + cNum + "&limit=1&page=" + pNum;
}


module.exports = getQuestions;
