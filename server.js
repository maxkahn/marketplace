var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/index');

var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log("Listening on "+ port);
});