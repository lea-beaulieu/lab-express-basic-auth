// routes/auth.routes.js
var express = require("express");
var signupRouter = express.Router();


// je récupère mon modèle
const User = require("../models/User.model")

// j'encrypte avec bcrypt
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)


// .get() route ==> to display the signup form to users
signupRouter.get('/sign-up', (req, res) => res.render('sign-up'));


// .post() route ==> to process form data


signupRouter.post('/sign-up', (req, res, next) => {

    // un user doit avoir username & password, ie le modèle
    const { username, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, salt);
    console.log(`Password hash: ${hashedPassword}`);

    //creer l'utilisateur
    User.create({
            // username: username
            username,
            // passwordHash => this is the key from the User model
            //     ^
            //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
            passwordHash: hashedPassword
        })
        .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB);
            res.redirect("/log-in")
        })
        .catch(error => next(error));
});


module.exports = signupRouter;