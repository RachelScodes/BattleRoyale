// get question from API
console.log('testing categories');
// var results = []
for (var i = 0; i < 10; i++){
   unirest.get("https://pareshchouhan-trivia-v1.p.mashape.com/v1/getAllQuizQuestions?limit=1&page=" + b)
   .header("X-Mashape-Key", "Nx6b43HFWUmshFvYztDKgsSev9gtp1LcyISjsnECbsti8VCWr7")
   .header("Accept", "application/json")
   .end(function (result) {
      console.log('result retrieved!');
      console.log(result.body[0]);
      // save api question to our database
      var question = new Question(result.body[0]);
      question.save(function(err) {
         if (err) {
            console.log(room.length);
            room.push('nope')
            // if bad question, don't save
            console.log('noooope');
         } else {
            // if it's good, save it and render it for user
            console.log(question);
            room.push(question)
         }
      })
   })
}
// run this until we have enough good questions

// when we have enough questions, send them to game.





code graveyard
while (room.questions.length < 10) {
   console.log(room.length);
   console.log('hit function');
   // unirest.get(apiUrl().toString())
   unirest.get("https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion")
   .header("X-Mashape-Key", "Nx6b43HFWUmshFvYztDKgsSev9gtp1LcyISjsnECbsti8VCWr7")
   .header("Accept", "application/json")
   .end(function (result) {
     console.log(result.status, result.headers, result.body);
   });
   .end(function (result) {
      console.log('result retrieved!');
      console.log(result.body[0]);
      // save api question to our database
      var question = new Question(result.body[0]);
      question.save(function(err) {
         if (err) {
            console.log(room.length);
            room.push('nope')
            // if bad question, don't save
            console.log('noooope');
         } else {
            // if it's good, save it and render it for user
            console.log(question);
            room.push(question)
         }
      })
   })
}


let apiUrl = function(){
   let fetchUrl = 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=1&limit=10&page=';
   let randoNum = Math.ceil(Math.random()*37375);

   fetchUrl += randoNum
   console.log(fetchUrl);

   // var num = undefined;
   // request('http://api.futuretraxex.com/v1/questionCount', function(err2, res2, body2) {
   //   }).on('data', function(data) {
   //       console.log('data is: ' + data);
   //       console.log(data[0]['count']);
   //       var num = Math.ceil(Math.random()*data['count'])
   //   })
   // console.log('number is: ' + num);
   //
   // return (num != undefined) ? num : 37375;

   return fetchUrl;
}
