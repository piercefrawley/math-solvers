var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var solver = require('./solver');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var max = fs.readFileSync('./max.txt').toString().split('\n').pop() || 12;
  var primes = solver.getPrimes(max);
  res.render('index.ejs', { max: max, primes: primes });
});

app.get('/primes', function(req, res) {
  res.render('primes.ejs');
});

app.post('/primes', function(req, res) {
  fs.appendFile("./max.txt", "\n" + req.body.max);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('listening on 3000')
});
