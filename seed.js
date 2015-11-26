'use strict'
// global variable
let rooms = [];

let Room   = require('./models/room.js'),
  Category = require('./models/category.js'),
  mongoose = require('mongoose');

//Connect to mongodb
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/battle-royale'); ///// can refactor later and pull into config file
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('db connected!');
});

// make the Lobby!
let lobby = new Room({
  title: 'Lobby',
  // players: allUsers // global array of all players not in another room
});

lobby.save(function(err) {
  rooms.push[lobby._id]
});


// seeding info
let roomTitles = [
   "History", "Math", "Science", "Computers and Coding", "Language and Logic", "Sports", "Business and Finance", "Movies"
];
let images = [
  // history
  "http://www.timsackett.com/wp-content/uploads/2015/07/history-2-landing.jpg",
  // math
  "https://i.ytimg.com/vi/TInfxe7c7yA/maxresdefault.jpg",
  // science
  "http://weknowyourdreams.com/images/space/space-09.jpg",
  // computers
  "http://www.cccblog.org/wp-content/uploads/2013/10/robot.jpg",
  // Language
  "http://thefederalist.com/wp-content/uploads/2014/01/5399905776_d5b05ff08a_o.jpg",
  // Sports
  "http://redboxpictures.com/commercial/wp-content/uploads/2011/01/spring-sports-prep-seattle-composite-web-1763x800.jpg",
  // Biz
  "http://thecareact.com/wp-content/uploads/2013/11/commercial-business-loans-london.jpg",
  // Movies
  "http://www.fiz-x.com/wp-content/uploads/2015/11/shutterstock_923692841.jpg"
];
let descriptions = [
  "What is, what was, and what will be...your failure.",
  "The odds are not in your favor.",
  "Prove my theory of your stupidity.",
  "Your answers will not compute.",
  "Winning is to Charlie Sheen as Failure is to YOU.",
  "Take a swing (and miss) in our sports category.",
  "How to succeed in Business: don\'t be you.",
  "Hope you know Bollywood!"
];
let categories = [
   [ // history
      {'api_id': 30, 'title':'International Affairs', 'max_qs':468},
      {'api_id': 43, 'title':'Geography', 'max_qs':371},
      {'api_id': 117, 'title':'General History', 'max_qs':164}
   ],[ // math
      {'api_id': 65, 'title':'Area & Volume', 'max_qs':138},
      {'api_id': 66, 'title':'Arithmetic', 'max_qs':105},
      {'api_id': 67, 'title':'Averages', 'max_qs':270},
      {'api_id': 68, 'title':'The Calendar', 'max_qs':54},
      {'api_id': 69, 'title':'Cloin...Clocks', 'max_qs':55},
      {'api_id': 70, 'title':'Decimals and Fractions', 'max_qs':532},
      {'api_id': 73, 'title':'Height and Distance', 'max_qs':10},
      {'api_id': 74, 'title':'Geometry', 'max_qs':137},
      {'api_id': 77, 'title':'The Number System', 'max_qs':883},
      {'api_id': 79, 'title':'Percentage', 'max_qs':600},
      {'api_id': 80, 'title':'Probability', 'max_qs':160},
      {'api_id': 81, 'title':'Permutation', 'max_qs':46},
      {'api_id': 82, 'title':'Age', 'max_qs':104},
      {'api_id': 85, 'title':'Ratio and Proportions', 'max_qs':388},
      {'api_id': 88, 'title':'Simplification', 'max_qs':79},
      {'api_id': 91, 'title':'Trigonometry', 'max_qs':9},
      {'api_id': 101, 'title':'Square Roots', 'max_qs':9},
      {'api_id': 104, 'title':'Algebra', 'max_qs':338},
      {'api_id': 159, 'title':'Calculus', 'max_qs':29}
   ],[ // science
      {'api_id': 21, 'title':'Geology', 'max_qs':1355},
      {'api_id': 24, 'title':'Science and Technology', 'max_qs':382},
      {'api_id': 35, 'title':'Environment', 'max_qs':250},
      {'api_id': 43, 'title':'Geography', 'max_qs':371},
      {'api_id': 60, 'title':'Biology', 'max_qs':1796},
      {'api_id': 61, 'title':'Physics', 'max_qs':1347},
      {'api_id': 62, 'title':'Chemistry', 'max_qs':2071},
      {'api_id': 68, 'title':'The Calendar', 'max_qs':54},
      {'api_id': 73, 'title':'Height and Distance', 'max_qs':10},
      {'api_id': 76, 'title':'Mixture', 'max_qs':49},
      {'api_id': 83, 'title':'Trains', 'max_qs':297},
      {'api_id': 86, 'title':'Rivers and Boats', 'max_qs':101},
      {'api_id': 89, 'title':'Distance and Time', 'max_qs':297},
      {'api_id': 112, 'title':'Agriculture', 'max_qs':849},
      {'api_id': 118, 'title':'Geneology', 'max_qs':65},
      {'api_id': 120, 'title':'Geography - Directions', 'max_qs':13},
      {'api_id': 135, 'title':'Human Evolution', 'max_qs':45},
      {'api_id': 158, 'title':'Logic Puzzles', 'max_qs':12},
      {'api_id': 165, 'title':'Botany', 'max_qs':418}
   ],[ // computers
      {'api_id': 26, 'title':'Computers', 'max_qs':332},
      {'api_id': 166, 'title':'Intro to Computer Science', 'max_qs':82},
      {'api_id': 167, 'title':'Computer Software', 'max_qs':71},
      {'api_id': 168, 'title':'Computer Hardware', 'max_qs':37},
      {'api_id': 169, 'title':'Computer Memory', 'max_qs':122},
      {'api_id': 170, 'title':'Computer Operating Systems', 'max_qs':115},
      {'api_id': 171, 'title':'The Internet', 'max_qs':81},
      {'api_id': 172, 'title':'Microsoft', 'max_qs':246},
      {'api_id': 173, 'title':'Computer Networking', 'max_qs':78},
      {'api_id': 174, 'title':'Computing Language', 'max_qs':40},
      {'api_id': 175, 'title':'Computer Applications', 'max_qs':28},
      {'api_id': 176, 'title':'Input-Output', 'max_qs':72},
      {'api_id': 177, 'title':'Data Interpretation', 'max_qs':22},
      {'api_id': 178, 'title':'Computer Science', 'max_qs':30}
   ],[ // language and logic
      {'api_id': 25, 'title':'Antonyms', 'max_qs':764},
      {'api_id': 27, 'title':'Synonyms', 'max_qs':674},
      {'api_id': 102, 'title':'Books and Authors', 'max_qs':321},
      {'api_id': 105, 'title':'IQ Test Questions', 'max_qs':387},
      {'api_id': 119, 'title':'Cryptography', 'max_qs':92},
      {'api_id': 121, 'title':'Logic', 'max_qs':11},
      {'api_id': 122, 'title':'Syllogism', 'max_qs':57},
      {'api_id': 124, 'title':'(Mostly Indian) Literature', 'max_qs':62},
      {'api_id': 126, 'title':'English', 'max_qs':134},
      {'api_id': 127, 'title':'Related Words', 'max_qs':482},
      {'api_id': 128, 'title':'Appropriate Words', 'max_qs':1153},
      {'api_id': 129, 'title':'One word substitutions', 'max_qs':1298},
      {'api_id': 131, 'title':'Prepositions', 'max_qs':1048},
      {'api_id': 132, 'title':'Articles', 'max_qs':68},
      {'api_id': 133, 'title':'Noun, Verb, or Adjective', 'max_qs':70},
      {'api_id': 134, 'title':'Error Detection', 'max_qs':25},
      {'api_id': 136, 'title':'One of these things is not like the others', 'max_qs':90},
      {'api_id': 139, 'title':'Statement-Conclusion', 'max_qs':6},
      {'api_id': 140, 'title':'Statement-Assumption', 'max_qs':5},
      {'api_id': 141, 'title':'Spelling', 'max_qs':5},
      {'api_id': 142, 'title':'Sentence Arrangement', 'max_qs':111},
      {'api_id': 155, 'title':'Direct Indirect', 'max_qs':17},
      {'api_id': 156, 'title':'Active Passive', 'max_qs':16},
      {'api_id': 157, 'title':'Word Arrangement', 'max_qs':15},
      {'api_id': 179, 'title':'Sentence Correction', 'max_qs':152}
   ],[ // sports
      {'api_id': 41, 'title':'Sports', 'max_qs':388}
   ],[ // business
      {'api_id': 17, 'title':'Economy', 'max_qs':313},
      {'api_id': 66, 'title':'Arithmetic', 'max_qs':105},
      {'api_id': 67, 'title':'Averages', 'max_qs':270},
      {'api_id': 70, 'title':'Decimals and Fractions', 'max_qs':532},
      {'api_id': 71, 'title':'Discounts and Shares', 'max_qs':192},
      {'api_id': 72, 'title':'Interest', 'max_qs':380},
      {'api_id': 78, 'title':'Partnership', 'max_qs':69},
      {'api_id': 79, 'title':'Percentage', 'max_qs':600},
      {'api_id': 80, 'title':'Probability', 'max_qs':160},
      {'api_id': 81, 'title':'Permutation', 'max_qs':46},
      {'api_id': 84, 'title':'Profit and Loss', 'max_qs':12},
      {'api_id': 85, 'title':'Ratio and Proportions', 'max_qs':388},
      {'api_id': 87, 'title':'Series', 'max_qs':679},
      {'api_id': 88, 'title':'Simplification', 'max_qs':79},
      {'api_id': 90, 'title':'Efficiency, aka Time vs Work', 'max_qs':440},
      {'api_id': 98, 'title':'Banking and Business', 'max_qs':359},
      {'api_id': 100, 'title':'Marketing', 'max_qs':142},
      {'api_id': 104, 'title':'Algebra', 'max_qs':338},
      {'api_id': 143, 'title':'Global Economic Policy', 'max_qs':165},
      {'api_id': 162, 'title':'Compound Interest', 'max_qs':2},
      {'api_id': 163, 'title':'Stocks and Dividends', 'max_qs':297}
   ],[ // film
      {'api_id': 57, 'title':'Movies', 'max_qs':70}
   ]
]

// make them!
let r = 0;
while (r < roomTitles.length){
   let newRoom = new Room({
     title: roomTitles[r],
     img_url: images[r],
     description: descriptions[r],
     categories: []
   });

   newRoom.save(function(err) {
     if (err) {
       console.log(err)
     } else {
         let cats = []; let c = 0;
         while (c < categories[r].length) {
            let newCat = new Category({
               api_id: categories[c]['api_id']
               title: categories[c]['title'],
               max_qs: categories[c]['max_qs'],
            });
            newCat.save(function(err) {
               if (err) {
                 console.log(err)
               } else {
               newRoom.categories.push(newCat._id);
               }
            });
            c++;
         } // end category maker
      }); // end else
   }
   // end room save, push to global var
   rooms.push[newRoom._id]
   r++;
} // end room maker
