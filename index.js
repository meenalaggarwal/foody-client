var express = require('express');
var path = require('path');
var app = express();

var env = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'development';
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Service listening on port ' + port + '!');
});

app.use(express.static(path.join(__dirname, 'client')));