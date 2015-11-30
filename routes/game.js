'use strict';

let express = require('express');
let router = express.Router();
let room = require('../controllers/roomController');
let question = require('../controllers/qController')

/* so fresh and so clean! */

router.route('/start/:roomName')
   .get(room.fetch(req.params.roomName))

router.route('/end/:roomName')
   .put(room.update(req.params.roomName));

router.route('/')
   .get(room.fetch(req.params.roomName))

module.exports = router;
