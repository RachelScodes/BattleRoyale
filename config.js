///// once authentication is working
///// pull out secret from user_controller.js, place that info in this file, and require the config in server.js
'use strict'

module.exports = {
  'secret': 'thissecretissofetch',
  'database': process.env.MONGOLAB_URI || 'mongodb://localhost/battle-royale'
};
