const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users');
//passwords :
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST sign-up */
router.post('/sign-up', async function(req, res, next) {
  const checkExistingUserFromEmail = await UsersModel.findOne({email: req.body.emailFromFront});
  if (!!req.body.usernameFromFront && !!req.body.passwordFromFront && checkExistingUserFromEmail) {
    res.json({message: "il existe déjà un compte lié à cet email."})
  } else if (!req.body.usernameFromFront || !req.body.emailFromFront || !req.body.passwordFromFront) {
    res.json({message: "Veuillez remplir tous les champs pour créer un compte."})
  }  else {
    const userSave = await saveNewUser(req);
    const userToken = userSave.token;
    res.json({userToken, result:true});
  }
});

/* POST sign-in */
router.post('/sign-in', async function(req, res, next) {
  if (!req.body.emailFromFront || !req.body.passwordFromFront) {
    res.json({message: "Veuillez remplir tous les champs pour accéder à votre compte."})
  } else {
  const user = await UsersModel.findOne({email: req.body.emailFromFront});
  const password = req.body.passwordFromFront;
  const userToken = user.token;
  if (bcrypt.compareSync(password, user.password)) {
    res.json({ login: true, userToken });
  } else { 
    res.json({login: false, message: "Ce compte n'existe pas, veuillez réessayer ou créer un compte." }); }
}});

module.exports = router;

async function saveNewUser(req) {
  const cost = 10;
  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);
  const user = new UsersModel({
    name: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    password: hash,
    token: uid2(32)
  });
  const userSave = await user.save();
  return userSave;
}
