var fs = require('fs'),
    Post = require('request').post,
    winston = require('winston'),
    routes = require('../messageRouting'),
    handlebars = require('handlebars'),
    config = require('./config'),
    user = require('./user');

module.exports = {

    pushUrl: 'https://api.telegram.org/bot' + config.botToken + '/sendMessage',

    run: function(command) {

        // get cleaned command
        command = this.getCommand(command);

        // exit if no command
        if (!command) {
            winston.log('exit', 'no command');
            return {
                status: false,
                reasion: 'route not found',
                routes: this.routes()
            };
        }

        return this.generate(command);
    },

    routes: function() {

        var cleanedRoutes = [];

        for (var route in routes) {
            cleanedRoutes.push({
                name: route,
                description: routes[route].description
            });
        }

        return cleanedRoutes;
    },

    generate: function(command) {

        // show route list, if command not exist
        if (!routes[command]) {
            return this.routes();
        }

        // check user
        if (!user.is()) {
            return {
                status: false,
                reason: 'no user set'
            };
        }

        var route = routes[command],
            request = {
                status: true,
                route: route,
                user: user.get(),
                routes: this.routes()
            };

        request.middleware = this.getMiddleware(request);

        request.message = this.getTemplate(request);

        this.sendMessage(request);

        return request;
    },

    /*
     * get middleware data by injected variable
     *
     * @params: request
     */
    getMiddleware: function(request) {
        return request.route.middleware !== null ? route.middleware(request) : null;
    },

    getTemplate: function(request) {
        try {
            var template = fs.readFileSync('./messages/' + request.route.message + '.hbs');
            return handlebars.compile(template.toString())(request);
        } catch (e) {
            return request.route.message;
        }
    },

    /*
     *  if you want to use it inside groups with more than one bot
     *  /command@yourBotName
     */
    getCommand: function(raw) {

        raw = raw.replace('/', '');

        var array = raw.split("@");

        if (array.length > 1) {

            // kick if the command is not for this bot
            if (array[1] !== config.botName) {
                return false;
            }
            return array[0];
        }

        return !raw ? false : raw;
    },

    sendMessage: function(request) {

        var params = {
            chat_id: request.user.chatID,
            text: request.message,
            reply_markup: JSON.stringify(request.route.keyboard)
        };

        Post({
            url: this.pushUrl,
            form: params
        }, function(err, httpResponse, body) {
            if (!err) {
                winston.log('info', 'message posted');
            } else {
                winston.log('error', 'posting not possable', body);
            }
        })
    }

}
