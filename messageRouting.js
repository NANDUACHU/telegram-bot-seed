var dice = require('./middleware/dice');

module.exports = {

    start: {
        message: "sayHello",
        middleware: null,
        keyboard: {
            keyboard: [["/start", "/help"]],
            "one_time_keyboard": true,
            "resize_keyboard": true
        }
    },

    help: {
        message: "possableCommands",
        middleware: null,
        keyboard: {
            "hide_keyboard": true
        }
    },

    dice: {
        message: "rollTheDice",
        middleware: dice.rollTheDice,
        keyboard: {
            keyboard: [["/dice"]],
            "one_time_keyboard": true,
            "resize_keyboard": true
        }
    }
}
