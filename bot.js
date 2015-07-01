var request = require('request');
var winston = require('winston');

module.exports = {

    pushUrl: 'https://api.telegram.org/bot{yourBotToken}/sendMessage',
    botName: 'exampleBot',
    user: null,

    start: function() {

        // do some things bevor we go inside server listing
        // maybe call data from an external source

    },

    setUser: function(user) {
        this.user = user;
    },

    route: function(raw) {

        var command = this.getCommand(raw);

        if (!command) {
            console.log("exit: no command");
        }

        if (command === '/start') {

            this.sendMessage(
                this.getWelcome()
            );

        }

        winston.log('info', command + 'by user', this.user);
        winston.log('info', 'list of users', this.userList);
    },

    /*
        if you want to use it inside groups with more than one bot
        /command@yourBotName
    */
    getCommand: function (raw) {

        var array = raw.split("@");

        if (array.length > 1) {
            if (array[1] !== this.botName) {
                return false;
            }
            return array[0];
        }
    },

    getWelcome: function() {
        return 'Hi ' + this.user.first_name + '\nwelcome to my first bot <3';
    },

    sendMessage: function(message, keyboard) {

        if (typeof keyboard === 'undefined') {
            keyboard = {};
        }

        var params = {
            chat_id: this.user.id,
            text: message,
            reply_markup: JSON.stringify(keyboard)
        };

        //"keyboard": [["/like", "Done 2"], ["Update"], ["Log Time"]],

        request.post({
            url: this.pushUrl,
            form: params
        }, function(err, httpResponse, body) {
            winston.log('info', 'posted');
        })
    }

}
