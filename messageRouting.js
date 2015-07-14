var dice = require('./middleware/dice');

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
        middleware: null,
        keyboard: {
            "hide_keyboard": true
        }
    },

    dice: {
        message: "rollTheDice",
        description: "roll the dice",
        middleware: dice.rollTheDice.bind(dice),
        keyboard: {
            keyboard: [["/dice"]],
            "one_time_keyboard": true,
            "resize_keyboard": true
        }
    }
}
