'use strict'

let jwt = require('jsonwebtoken');
let express = require('express');
let User = require('../models/user');
let router = express.Router();
let expressjwt = require('express-jwt');
let app = express();
let config = require('../config'); ///// require config file to get our secret - will have to move into bash profile later
app.set('soSecret', config.secret); ///// set secret variable
let routes = require('../routes/user_routes');

///// create user (POST http://localhost:3000/user/signup) ///////////////////////////////////////////////////////////////////////////////////
///// not protected - see user_routes.js
function createUser(req, res) {
  console.log("signup route hit");
  console.log(req.body);
  let userObj = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body);
  console.log('inside createUser');
  userObj.save((err, user) => {
    if (err) {
      console.log('about to error yo');
      return res.status(401).send({message: err.errmsg});
    } else {
      return res.status(200).send(user);
    }
    console.log(user);
  });
}

///// show all users (GET http://localhost:3000/user/users) //////////////////////////////////////////////////////////////////////////////////
///// shows the entire user obj, including encrypted passwords!
function showAllUsers(req, res) {
  User.find({}, function(err, users) {
    console.log('hit /users/show')
    res.send(users);
  });
}

///// edit user (PUT http://localhost:3000/user/edit) ////////////////////////////////////////////////////////////////////////////////////////
// function editUser(req, res) {
//   let userParams = req.body.user;
//   let query = {username: userParams.username}; ///// find user by username
//   let update = {username: userParams.username, password: userParams.password, email: userParams.email}; ///// update username, password, or email
//   let options = {new: true}; ///// return modified document/user instead of  original
//   User.findOneAndUpdate(query, update, options, function(err, user) { ///// finds the first document/user that matches the quest(if present) and updates it
//     if (err) throw err;
//     res.send(user);
//   });
// }


function editUser(req, res) {
  let userParams = req.body.user;
  User.findOne({email: userParams.email} , function (err, user) {
    user.update(
      {email: userParams.email},
      {email: userParams.newEmail, username: userParams.newUserName},
      function (err, user) {
        resend.send(user);
      }
    )
  })
}

///// delete user (DELETE http://localhost:3000/user/delete) //////////////////////////////////////////////////////////////////////////////////
function deleteUser(req, res) {
  console.log('hit delete')
  let userParams = req.body.user;
  User.findOneAndRemove({ username: userParams.username}, function (err, user) {
    if (err) {
      console.log('user not deleted');
      return;
    } user.remove(function(err) {
      res.send({"record" : 'deleted'});
    });
  });
}



///// login (GET http://localhost:3000/user/login) ////////////////////////////////////////////////////////////////////////////////////////////
// function login() - same as authenticate?

///// logout (GET http://localhost:3000/user/logout) //////////////////////////////////////////////////////////////////////////////////////////
// function logout()



///// authentication (POST http://localhost:3000/user/authenticate) //////////////////////////////////////////////////////////////////////////
///// not protected
///// code below allows us to check our user and password and passes back a token
///// in a JSON response. Mongoose is used to find the user and jsonwebtoken to create the token
function auth(req, res) {
  User.findOne({
    // name: req.body.name
      username: req.body.username
  }, function(err, user){
    if (err) throw err;
    console.log('yo yo yo')

    if(!user) {
      ///// check for user in database
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      ///// check if password matches
      if (user.password != req.body.password) {
        res.send({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        ///// if user is found and password correct - assign token
        let token = jwt.sign(user, app.get('soSecret'), {
          expiresIn: 31557600 //// expires in 1 year - seconds in a year
        });
        ///// return the information including token as json
        res.send({
          succes: true,
          message: 'Enjoy the token!',
          token: token
        });
      }
    }
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



module.exports = {
  createUser: createUser,
  showAllUsers: showAllUsers,
  auth: auth,
  editUser: editUser,
  deleteUser: deleteUser,
  // login: login,
  // logout: logout
}
