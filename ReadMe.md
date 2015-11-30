![Ninja](https://raw.githubusercontent.com/RachelScodes/BattleRoyale/develop/public/resources/cute-ninja.png)

# Welcome to BATTLE ROYALE!

Battle royale is "not your mother's trivia game". We have super hard questions and super cute ninjas... need I say more?

I'll say more.

---

### Tech Specs

* **Technologies used:**
  - built with node and express
  - databasing with mongo & mongoose
  - dependencies
    - bcrypt - securing and authenticating users
    - express-JWT and jsonwebtoken - tokens!
    - mongoose and mongoose-seed - database management
    - morgan - our logging tool
    - path - file sourcing
    - serve-favicon - overwrites certain middleware procedures to serve our favicon
    - socket.io - using sockets for chat and gameplay
    - underscore - added javascript functionality
    - unirest - used to communicate with mashape's API structure
  - questions sourced from pareshchouan's [Trivia Api](https://market.mashape.com/pareshchouhan/trivia) on mashape

* **Models:**
  - user:
    - full CRUD
    - must be authenticated in order to access game
    - stores scoring info
  - question:
    - can be created or deleted
    - used as quality control when we source our questions
  - room:
    - CRU, Delete not applicable.
    - 8 static rooms seeded from database.

* **See it in action!:** [On Heroku](https://calm-brushlands-3713.herokuapp.com/)

---

### User Stories

In our app a user is able to:
   - login or create an account

(once logged in):
   - chat with other players in the lobby while they choose a trivia game room.
   - select a trivia game room
   - enter the room with their friends and trash-talk each other mid-game.
   - play a round with ten questions
   - feel a rush as they try to get the right answer as fast as possible to score maximum points
   - feel pangs of despair as faster (but wrong answers) take away more points
   - or sit patiently, let a question roll by, neither lose nor gain any points
   - see their current points at the end of a questions
   - see their points relative to everyone they played with at the end of the game.

---

### Our Team and strategy:

   - Rachel Smyth [github](https://github.com/RachelScodes)
   - Mala Nimalasuriya [github](https://github.com/m428)
   - Alex Wang [github](https://github.com/sp180)

As a whole we were in constant communication. This avoided major merge conflicts for the most part, and made sure we were all on the same page and could help each other.

We divided some responsibilities between the three of us

|team member | responsibilities |
|-------------|------------------|
|Alex | sockets and chat on back and front end|
|Mala | security-salted/hashed/smothered/covered passwords, backend & database for users, mitigating with sockets, server management, user model design, wireframes |
|Rachel | API access, database for game models and seeding, front and backend for game, graphics, team management? |

Sometimes we would work in groups of two to combine our work.

And some tasks we all worked on:
   - front end
   - user stories/wireframing
   - managing github
   - deployment to heroku

---

### Installation Instructions:
   * **None for you!** For us, we needed to install our dependencies and seed our database on the host.

---

### Application Wireframes
![wireframes](http://i.imgur.com/5haEGc3.png)

---

### Hurdles:

   * ~~Accessing an api multiple times in a row (synchronous vs asynchronous)~~
   * ~~having authentication and sockets work in tandem~~
   * showing the same aspect of the game to all users (still not working, but almost there!)
   * writing original instance methods using mongoose
   * ~~mitigating sockets vs heroku server requirements~~

---

#### Copyright notice:

The media and information used in this app is for educational purposes. Project created as part of General Assembly's Web Development Immersive program.
