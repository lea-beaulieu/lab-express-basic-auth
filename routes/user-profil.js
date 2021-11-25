// routes/auth.routes.js
var express = require("express");
var profilRouter = express.Router();


// je récupère mon modèle
const User = require("../models/User.model")


profilRouter.get('/user-profil', (req, res) => res.render('user-profil'));