const express = require("express"); //importing express
const router = express.Router(); // use router module from express to handle any req/res
const db = require("../models"); // imports the database
const { User } = db; //imports the specific specific Agenda module
const passport = require('../middlewares/authentication');



router.post('/signup', (req, res) => {
    console.log("POST body: ", req.body);
    User.create({
      userName: req.body.userName,
      userPhone: req.body.userPhone,
      hashedPassword: req.body.hashedPassword,

    })
      .then((user) => {
        user.hashedPassword = undefined;
        req.login(user, () => res.status(201).json(user));
      })
      .catch((err) => {
        res.status(400).json({ msg: 'Failed Signup', err });
      });
  });

  router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  });

router.get('/login', (req, res) => {
  if(req.user) {
    res.json(req.user)
  } else {
    res.sendStatus(401);
  }
})

router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
  })

module.exports = router;