var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var winston = require('winston');
var bot = require('./bot');

// configure app to use bodyParser()
// this will let us get the data from a POST
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 4711; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// if you have some predefining things to do
bot.start();

// domain.tld/bot/ see below
router.post('/', function(req, res) {

    bot.setUser(
        req.body.message.chat,
        req.body.message.text
    );

    bot.checkCommand(req.body.message.text);

    res.json({
        status: true
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /bot
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
