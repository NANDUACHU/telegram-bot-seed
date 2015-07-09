module.exports = {

    rollTheDice: function() {
        var number = (Math.floor(Math.random() * 6) + 1);

        return {
            number: number
        }
    }

}
