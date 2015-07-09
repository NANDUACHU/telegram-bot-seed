var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    winston = require('winston'),
    bot = require('./bot'),
    config = require('./config');

// configure app to use bodyParser()
// this will let us get the data from a POST
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
})).use(bodyParser.json());
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// domain.tld/bot/ see below
router.post('/', function(req, res) {

    bot.setUser(req.body.message);

    res.json({
        response: bot.route(req.body.message.text)
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /bot

app.use('/bot', router);

app.listen(config.serverPort);

app.use(express.static('dist/'));

console.log('bot listining started on port: ' + config.serverPort);
