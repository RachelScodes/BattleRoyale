$('.get-question').click(function(event){
  event.preventDefault();
  console.log('clicked!');

  $.ajax({
    url: 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/getAllQuizQuestions?limit=10&page=1',
    headers:{'X-Mashape-Key': 'TBD'}
  }).done(function(data){
        console.log(data);
    var list = $('.selected-question').append('<ul class="current-question">').find('ul');
    for (var i = 0; i < data.length; i ++) {
      $(list).append('<li>' + data[i] + '</li>');
    };
  });
}); 
