var routes = require('../messageRouting.js');

module.exports = {

    getCommands: function() {

        var commands = [];

        for (var route in routes) {
            commands.push({
                name: route,
                description: routes[route].description
            });
        }

        return {
            commands: commands
        }

    }

}
