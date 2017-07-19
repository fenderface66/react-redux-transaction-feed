/**
 * Script that performs deals with all transaction based endpoints.
 */

var fs = require('fs');
var path = require('path');

exports.getTransactions = function(req, res, next) {
  var obj;
  fs.readFile(path.join(__dirname, 'model/transactions.json'), function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(obj);
  });
}

exports.updateEmotion = function(req, res, next) {
  fs.readFile(path.join(__dirname, 'model/transactions.json'), function (err, data) {
    var obj
    obj = JSON.parse(data);
    obj.map(function(transaction) {
      if (transaction.id === req.query.id) {
        transaction.emotion = req.query.emotion;
      }
    })
    
    fs.writeFile(path.join(__dirname, 'model/transactions.json'), JSON.stringify(obj), function (err) {
      if (err) return console.log(err);
      console.log('writing to ' + path.join(__dirname, 'model/transactions.json'));
      res.send(obj);
    });
    
  });
}

