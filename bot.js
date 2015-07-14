var fs = require('fs'),
    request = require('request'),
    winston = require('winston'),
    routes = require('./messageRouting'),
    handlebars = require('handlebars'),
    config = require('./config');

module.exports = {

    pushUrl: 'https://api.telegram.org/bot' + config.botToken + '/sendMessage',
    user: null,

    setUser: function(response) {
        this.user = response.from;
        this.user.chatID = response.chat.id;

        if (response.chat.title)
            this.user.groupTitle = response.chat.title;
    },

    route: function(command) {

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

        // define variables
        var route = routes[command],
            self = this,
            data = {
                user: this.user,
                routes: this.routes()
            };

        // get data from middleware
        if (route.middleware !== null) {
            data.data = route.middleware(command, routes);
        }

        try {
            // get template file
            var template = fs.readFileSync('./messages/' + route.message + '.hbs');
            data.message = handlebars.compile(template.toString())(data);
        } catch (e) {
            data.message = route.message;
        }

        this.sendMessage(
            data.message,
            route.keyboard
        );
        return data;
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

    sendMessage: function(message, keyboard) {

        if (typeof keyboard === 'undefined') {
            keyboard = {};
        }

        var params = {
            chat_id: this.user.chatID,
            text: message,
            reply_markup: JSON.stringify(keyboard)
        };

        request.post({
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
