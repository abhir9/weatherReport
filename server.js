"use strict";

var express = require('express');
var logger = require('morgan');
var routes = require('./routes/index');
var bodyParser = require('body-parser');	
var app = express();


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');	
app.set('views', __dirname + '/views');
app.use('/weather', routes);



app.listen(4005, function() {
    console.log("Application is running on port " + 4005);
});