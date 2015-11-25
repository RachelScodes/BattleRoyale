'use strict';

let express = require('express');
let router = express.Router();
///// end requirements ////////////////////////////////////////////////////////


// the '/' means '/home, see server.js'
router.route('/')
  .get((req, res, next) => {
     //landing page
     res.send('hit get /home')
     console.log('hit get /home');
  })
  .post((req, res, next) => {
     // login??
     console.log('hit post /home')
  });

// router is the function being exported.
module.exports = router;
