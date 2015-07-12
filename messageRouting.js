var dice = require('./middleware/dice');
var help = require('./middleware/help');

module.exports = {

    start: {
        message: "sayHello",
        description: "say hello",
        middleware: null,
        keyboard: {
            keyboard: [["/start", "/help"]],
            "one_time_keyboard": true,
            "resize_keyboard": true
        }
    },

    help: {
        message: "possableCommands",
        description: "get help",
        middleware: help.getCommands,
        keyboard: {
            "hide_keyboard": true
        }
    },

    dice: {
        message: "rollTheDice",
        description: "roll the dice",
        middleware: dice.rollTheDice,
        keyboard: {
            keyboard: [["/dice"]],
            "one_time_keyboard": true,
            "resize_keyboard": true
        }
    }
}
