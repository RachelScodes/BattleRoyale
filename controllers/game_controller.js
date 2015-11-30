

//// QUERYING & SAVING TO/FROM THE DATABASE

//  starting the game
let getRoom(rName) {
   // find the room where 'name' : rName
   // return that room object as json
}

let saveQuestions(rName,array) {
   // BASICALLY: findOneAndUpdate.
   // find the room where 'name' : rName
   // stores the array to the 'questions' property
}

// during the game
// let getQuestion(rName,index) {
//    let resultObj = {
//       room:       rName,
//       question:   '',
//       choice_1:   '',
//       choice_2:   '',
//       choice_3:   '',
//       choice_4:   '',
//       cat_name:   ''
//    }
//
//    // 1. find the room where 'name' : rName
//
//    // 2. use room.questions[index] of that room
//
//    // 3. push the following info into result:
//    //     key in result:  value from this field in question from db
//             // question:   text
//             // choice_1:   choice_1
//             // choice_2:   choice_2
//             // choice_3:   choice_3
//             // choice_4:   choice_4
//             // cat_name:   cat_name
//
//    return resultObj
// }

let checkQuestion(rName,index,choice) {
   // 1. and 2. - same as getQuestion
   // 3. if (choice === question[answer])
            return 'correct'
   //    else
            return 'incorrect'
}

// starting and ending the game
let saveQuestions(rName,array) {
   // find the room where 'name' : rName
   // let room = ;

   // stores the array to the 'questions' property of room object
   // room.questions = array

   // saves this to db
   // room.save
      // if success
         return true
      // no bueno
         return false

   // when this function is called...
   // at the start, this array will be ten questions
   // at the end, the array will be empty.
}




//// QUERYING & SAVING FROM THE API

// fetches a question from the API
let fetchQuestion = function(roomObj,array){
   let category = getCategory(roomObj)
   // see helpers below for what fetchUrl does
   let apiUrl = fetchUrl(roomObj)
   unirest.get(apiUrl)
   .header("X-Mashape-Key", "lX0iJk5iGlmshE7fTOCtRf7hsj3Zp1NuuosjsnBKj4jIROPs9R")
   .header("Accept", "application/json")
   .end(function(result){
      verifyQuestion(result,array,roomObj,category)
   }
}


let verifyQuestion = function (questionObj,array,roomObj,category) {
   // use questionObj and categoryto make a question for our db
   let questionNew = {
      text: questionObj['q_text'],
      choice_1: questionObj['q_options_1'],
      choice_2: questionObj['q_options_2'],
      choice_3: questionObj['q_options_3'],
      choice_4: questionObj['q_options_4'],
      answer: parseInt(questionObj['q_correct_option']),
      cat_name: category['title']
   }

   // save questionNew to database.
      // fyi: we won't access these qs from database directly.
      // saving just validates and makes sure a questionis good.
   // make the following the promise after saving:
   // if (successful) :
      // save to array to collect it
      storeQuestion(questionNew,array,roomObj,)
   // else :
      fetchQuestion(roomObj,array)

}

let storeQuestion = function(q,array,room){
   array.push(questionNew)
   if (array.length <= 9) {
      // ok, let's get some more questions
      fetchQuestion(roomObj,array)
   } else {
      // done! Save these to the database version of our room
      saveQuestions(roomObj['name'],array)
   }
}


//// HELPERS

// get a random category from our mirror of the room object
let getCategory(roomObj){
   let catties = roomObj.categories
   let index = Math.floor(Math.random()*catties.length)
   return catties[index]
}

// generate the url based on that category
let fetchUrl = function(room,category){
   let base = "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=";
   let random = Math.ceil(Math.random()*(category['max_qs']))
   return base + category['api_id'] + "&limit=1&page=" + random;
}



module.exports = {
   // group this little functions together so we get the return values of each loop
   populateQuestions:,
   check: checkQuestion,


}
