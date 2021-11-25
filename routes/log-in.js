var express = require("express");
var loginRouter = express.Router();


// je récupère mon modèle
const User = require("../models/User.model")

// j'encrypte avec bcrypt
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)

loginRouter.get('/log-in', (req, res) => res.render('/log-in'));

loginRouter.post('/log-in', (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
        res.render('/log-in', {
            errorMessage: 'Please enter both and password to log-in.'
        });
        return;
    }

    User.findOne({ username })

    .then(userToFind => {

            // Si User pas crée ou introuvable
            if (!userToFind) {
                res.render('/log-in', { errorMessage: 'User is not registered.' });
                return;

                //  Si User crée + correct password
                const passwordOK = bcryptjs.compareSync(password, userToFind.passwordHash)
            } else if (passwordOK) {
                //req.session.user= userToFind;
                res.render('users/user-profile', { username });

                // Enfin password faux
            } else {
                res.render('/log-in', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(error => next(error));
});

module.exports = loginRouter;