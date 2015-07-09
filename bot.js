var request = require('request'),
    winston = require('winston'),
    routes = require('./messageRouting'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    config = require('./config');

module.exports = {

    pushUrl: 'https://api.telegram.org/bot' + config.botToken + '/sendMessage',
    user: null,

    setUser: function(response) {
        this.user = response.from;
        this.user.chatID = response.chat.id;
    },

    route: function(command) {

        // get cleaned command
        command = this.getCommand(command);

        // exit if no command
        if (!command) {
            winston.log('exit', 'no command');
            return false;
        }

        return this.renderAndSendMessage(command);
    },

    renderAndSendMessage: function(command) {

        if (!routes[command]) {
            winston.log('error', 'no routing found');
            return false;
        }

        var route = routes[command],
            self = this,
            data = {
                user: this.user
            };

        if (route.middleware !== null) {
            data.data = route.middleware(command);
        }

        // get template file
        fs.readFile('./messages/' + route.message + '.hbs', function(err, template) {
            if (err) {
                winston.log('error', 'template not found');
                return false;
            }

            var message = handlebars.compile(template.toString())(data);

            self.sendMessage(
                message,
                route.keyboard
            );
        });

        return data;
    },

    /*
        if you want to use it inside groups with more than one bot
        /command@yourBotName
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
