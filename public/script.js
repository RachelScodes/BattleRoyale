


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
