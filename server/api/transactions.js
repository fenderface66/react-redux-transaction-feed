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

