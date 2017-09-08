var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.render('api', { title: 'API' });
});

/* Get all users. */
router.get('/clients', function(req, res, next) {
  var query = Client.find();
  query.select('name card money');
  query.exec(function (err, clients) {
    if (err) return handleError(err);
    res.json(clients);
  });
});

/* Get a specific client by card number. */
router.get('/client/:card', function(req, res, next) {
  var query = Client.findOne({'card':req.params.card});
  query.select('name card money');
  query.exec(function (err, client) {
    if (err) return handleError(err);
    res.json(client);
  });
});


module.exports = router;
