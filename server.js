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
})).use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// if you have some predefining things to do
bot.start();

// domain.tld/bot/ see below
router.post('/', function(req, res) {

    bot
        .setUser(req.body.message.chat)
        .route(req.body.message.text);

    res.json({
        status: true
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /bot

app
    .use('/api', router)
    .listen(process.env.PORT || 4711);

console.log('Magic happens');
