module.exports = {

    settings: {
        min: 1,
        max: 6
    },

    rollTheDice: function() {
        var number = Math.floor(Math.random() * (this.settings.max - this.settings.min) + this.settings.min);

        return {
            number: number
        }
    }

}
