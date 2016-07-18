var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var config = require('./config');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/OurDB');



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret: config.get('session:secret'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(express.static('build'));

app.set('view engine', 'jade');

require('./routes')(app);


app.listen(3035);
