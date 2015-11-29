///// control flow between rooms, render chat, etc /////////////////////////////
// 'use strict'
console.log('script loaded');
var socket = io(), ///// listens and emits client-side - meat of socket in backend, just require in front end
    doc    = document,
    myUser;

$(function() {
	//these divs will be hidden at the start
	$('#loginpage').hide();
	$('#createuserpage').hide();
  $('#authenticate-page').hide(); /////

	$('.login-link').click(function() {
		$('#navigation').hide();
		// $('#loginpage').show(); ///// commented out to render authenticate login and test
    $('#authenticate-page').show(); ///// added to render authenticate login and test
  });


/// create new user - POST http://localhost:3000/user/signup ///////////////////////
$('.createuser-link').click(function() {
  $('#navigation').hide();
  $('#createuserpage').show();
});

$('#create-user-submit-button').click(function() {
 var username = $('#login-new').val();
 var email = $('#email-new').val();
 var password = $('#password-new').val();
 var newUserData = {
   username: username,
   email: email,
   password: password
 }
  $.ajax({  ///// executes user_controller.js create function
    url: "/user/signup",
    method: "POST",
    data: newUserData
  }).done(goToLogin); //// show login page
});


  var goToLogin = function() {
    $('#createuserpage').hide();
    $('#authenticate-page').show();
    $('#submit-login').show(); ///// add login submit button to index.html
  }

//////// authenticate - POST http://localhost:3000/user/authenticate ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $('#authenticate-submit-button').click(function() {
    // console.log('clicked');
    var username = $('#authenticate-username-input').val();
    var password = $('#authenticate-password-input').val();
    var userLoginData = {
      username: username,
      password: password
    }
    // console.log(userLoginData);
    $.ajax({ ///// executes user_controller.js auth function
      url: "/user/authenticate",
      method: "POST",
      data: userLoginData
    }).done(goToLobby)

    // console.log(username + 'this should be username');
      myUser = username;
      socket.emit('add user', username);
      $('#authenticate-username-input').val('');
    }); // end of authenticate submit button jQuery call

    var goToLobby = function() {
      $('#authenticate-page').hide();
    }


	$('#message').keypress(function(event) {
		if(event.keyCode === 13) {
			var message = $('#message').val();
      console.log(myUser);

			socket.emit('send message', {name: myUser, message: message});
			$('#message').val('');
		}
	});


// SOCKET EVENTS

socket.on('user joined', function(users) {
	var usersList = $('#users ul');
	usersList.empty();
	users.forEach(function(user) {
		var userElement = $('<li>');
		userElement.text(user.name);
		usersList.append(userElement);
	});
});

socket.on('send message', function(data) {
	var chatList = $('#messages');
	var message = $('<li>');
	message.text(data.name + " : " + data.message);
	chatList.append(message);
});
})
