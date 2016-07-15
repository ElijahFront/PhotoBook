var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/skillsDB');



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({type: 'application/json'}));

app.use(express.static('build'));

app.set('view engine', 'jade');


app.get('/*', function (req, res) {
    res.setHeader('Content-Type', 'text/html; encoding: utf-8;');
    console.log('Got new request at', req.url);
    var fileName = './build/'+ req.url;
    var content = fs.readFileSync(fileName, {encoding: 'utf-8'});
    console.log('Server running');
    res.write(content);
    res.end();
});


app.listen(3035);
