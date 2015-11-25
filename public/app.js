///// control flow between rooms, render chat, etc /////////////////////////////
console.log('script loaded');
let socket = io(), // listens and emits client-side - meat of socket in backend, just require in front end
    doc    = document;

$(function() {
	//these two divs will be hidden at the start
	$('#loginpage').hide();
	$('#createuserpage').hide();

	$('.login-link').click(function() {
		$('#navigation').hide();
		$('#loginpage').show();
	});

	$('.createuser-link').click(function() {
		$('#navigation').hide();
		$('#createuserpage').show();
	});

///////////////////////////////////////////////////////////////////////////////////////////////
  $('#create-user-button').click(function() {
	 var username = $('#login-new').val();
 	 var email = $('#email-new').val();
 	 var password = $('#password-new').val();
 	 var newUserData = {
 		 username: username,
 		 email: email,
 		 password: password
 	 }
    $.ajax({
      url: "/user/signup",
      method: "POST",
      data: newUserData
    }).done($('#createuserpage').hide()); //executes /controllers/user_controller.js create function
  });
 // var createUser = function() {
 // 	newUserData.save
 // }
///////////////////////////////////////////////////////////////////////////////////////////////







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

//create a mongoDB to persist created users--need a schema
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
