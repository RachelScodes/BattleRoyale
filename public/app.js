///// control flow between rooms, render chat, etc /////////////////////////////
'use strict'
console.log('script loaded');
let socket = io(), ///// listens and emits client-side - meat of socket in backend, just require in front end
    doc    = document;

$(function() {
	//these two divs will be hidden at the start
	$('#loginpage').hide();
	$('#createuserpage').hide();

	$('.login-link').click(function() {
		$('#navigation').hide();
		$('#loginpage').show();
	});


///// create new user - POST http://localhost:3000/user/signup - user_controller.js ////////////////
	$('.createuser-link').click(function() {
		$('#navigation').hide();
		$('#createuserpage').show();
	});

	 let username = $('#login-new').val();
 	 let email = $('#email-new').val();
 	 let password = $('#password-new').val();
 	 let newUserData = {
 		 username: username,
 		 email: email,
 		 password: password
 	 }
    $.ajax({
      url: "/user/signup",
      method: "POST",
      data: newUserData
    }).done(goToLogin); ///// executes /controllers/user_controller.js create function
  });

  let goToLogin = function() {
    $('#createuserpage').hide();
    $('#loginpage').show();
    // $('#submit-login').show(); ///// add login submit button to index.html
  }
///////////////////////////////////////////////////////////////////////////////////////////////
  // $('#submit-login-button').click(function() {
  //   let user = $('#name').val();
  //   let password = $('#password').val();
  //   let user = {
  //     fullname: fullname,
  //     password: password
  //   }
  //   $.ajax({
  //     url: "/user/authentication",
  //     method: "POST",
  //     data: userData
  //   }).done( FUNCTION TO SHOW GAME LOBBY GOES HERE) ///// incomplete
  // });
  //
  // let goToLobby = function() ///// incomplete


	$('#login-input').keypress(function(event) {
		//event.keyCode === 13 refers to the Enter or Return key
		if(event.keyCode === 13) {
			var username = $('#login-input').val();
			myUser = username;
			socket.emit('add user', username);
			$('#login-input').val('');
			$('#loginpage').hide();
		}
	});

//use ajax calls to store users
//store in a JSON object
//use bcrypt to encrypt the password along the way

	$('#login-new').keypress(function(event) {
		//event.keyCode === 13 refers to the Enter or Return key
		if(event.keyCode === 13) {
			//creating a new user below, need to link to server.js and create new server.js functions
			//.val() is the value of whatever is in field at the time of the keypress
			var username = $('#login-new').val();
			var password = $('#password-new').val();
			// newUser = username;
			// newPass = password;
			// socket.emit('new user', username);
			// socket.emit('new pass', password);
			// $('#login-new').val('');
			$('#createuserpage').hide();
		}
	});

	$('#message').keypress(function(event) {
		if(event.keyCode === 13) {
			var message = $('#message').val();
			socket.emit('send message', {name: myUser, message: message});
			$('#message').val('');
		}
	});

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
