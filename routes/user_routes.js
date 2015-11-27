'use strict'

let express = require('express');
let router = express.Router();
let user = require('../controllers/user_controller');
let expressJWT = require('express-jwt');
let config = require('../config');

let secret = config.secret;

///// protected user routes ////////////////////////////////////////////////////
router.route('/show')
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  .get(user.showAllUsers) ///// show all users


router.route('/edit') ///// more testing
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  .put(user.editUser) ///// edit user


router.route('/delete') ///// more testing
  // .all(expressJWT({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .delete(user.deleteUser) ///// edit user


///// unprotected user routes //////////////////////////////////////////////////
router.route('/signup') ///// may need to adjust route to /signup alone
  .post(user.createUser);

router.route('/authenticate') ///// may need to adjust route to /authenticate alone
  .post(user.auth);

// router.route('/login') ///// may need to adjust route to /login alone
//   .post(user.login);

// router.route('/user/logout') ///// may need to adjust route to /login alone
//   .post(user.login);





module.exports = router;
