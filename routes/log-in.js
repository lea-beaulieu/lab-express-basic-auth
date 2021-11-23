var express = require("express");
var signupRouter = express.Router();


// je récupère mon modèle
const User = require("../models/User.model")

// j'encrypte avec bcrypt
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)

router.get('/log-in', (req, res) => res.render('/log-in'));

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
   
    if (username === '' || password === '') {
      res.render('/log-in', {
        errorMessage: 'Please enter both, email and password to log-in.'
      });
      return;
    }
   
    User.findOne({ username })
      .then(user => {
        if (!username) {
          res.render('/log-in', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          res.render('users/user-profile', { username });
        } else {
          res.render('/log-in', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });