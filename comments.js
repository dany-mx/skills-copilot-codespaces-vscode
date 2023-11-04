//create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

// get comments
app.get('/api/comments', function(req, res) {
  fs.readFile('./public/comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// add comment
app.post('/api/comments', function(req, res) {
  fs.readFile('./public/comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),