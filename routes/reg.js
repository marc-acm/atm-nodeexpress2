var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var mongoose = require('mongoose');

/* Get register page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
  	res.redirect('/users');
  } else {
  	res.render('reg', { title: 'Register' });
  }
});

/* Proccess Register*/
router.post('/', function(req, res, next) {
  var client = new Client({
  	name: req.body.name,
  	card: req.body.card,
  	password: req.body.password,
  	email: req.body.email
  });

  client.save();
  res.render('login', { title: 'Login' });
});
module.exports = router;
