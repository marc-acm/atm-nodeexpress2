var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var mongoose = require('mongoose');

/* Get login page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
  	res.redirect('/users');
  } else {
  	res.render('login', { title: 'Login' });
  }
});

/* Proccess Login */
router.post('/', function(req, res, next) {
  var email = req.body.email;
  var pass = req.body.password;
  var query = Client.findOne({ 'email': email, 'password':pass });
  query.select('id email password');
  query.exec(function (err, client) {
  if (err) return handleError(err);
  	console.log('Email: %s, Password: %s', client.email, client.password);
  	res.cookie('logged',client.id);
  	res.redirect('/users');
  });
});
module.exports = router;
