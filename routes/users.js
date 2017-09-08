var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var mongoose = require('mongoose');
var clientdata;

/* Get member page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
    var uid = req.cookies.logged;
    var query = Client.findOne({ '_id' : uid });
    query.select('name email money card image_url');
    query.exec(function (err, client) {
    if (err) return handleError(err);
      clientdata=client;	
      res.render('users', { clientdata: client, title: 'users', action:'MAIN' });
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/withdraw', function(req, res, next) {
  res.render('users', { action: 'WITHDRAW', clientdata: clientdata, title: 'Withdraw' });
});
router.get('/deposit', function(req, res, next) {
  res.render('users', { action: 'DEPOSIT', clientdata: clientdata, title: 'Deposit' });
});
router.get('/logout', function(req, res, next) {
  res.clearCookie("logged");
  res.redirect('/login');
});
router.get('/transact', function(req, res, next) {
  res.send('it goes to get');
});
router.post('/transact', function(req, res, next) {
  console.log('transact working');
  var amount = req.body.amount;
  var card = req.body.card;
  var action = req.body.action;
  console.log(amount+' '+card+' '+action);
    if(action=='DEPOSIT'){
      var newAmount = (parseInt(amount) + parseInt(clientdata.money)).toString();
      var deposit = Client.updateOne(
      { 'card' : card },
      { $set: { 'money' : newAmount } }
      );
      deposit.exec(function (err, result) {
      if (err) return handleError(err);
        console.log(result);
      });
    };
    if(action=='WITHDRAW'){
      var newAmount = parseInt(clientdata.money) - parseInt(amount);
      if(newAmount<0){res.redirect('/users'); return;}
      var withdraw = Client.updateOne(
      { 'card' : card },
      { $set: { 'money' : newAmount } }
      );
      withdraw.exec(function (err, result) {
      if (err) return handleError(err);
        console.log(result);
      });
    };
    res.redirect('/users');
});
module.exports = router;
