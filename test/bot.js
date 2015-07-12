var bot = require('../bot'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var expect = require("chai").expect;

describe("bot", function() {

    describe(".getCommand()", function() {

        it("command to be a string", function() {
            var command = '/command@exampleBot';
            var result = bot.getCommand(command);

            expect(result).to.be.a('string');
        });

        it("command be cleaned", function() {
            var command = '/command@exampleBot';
            var result = bot.getCommand(command);

            expect(result).to.equal('command');
        });

        it("command not to be @", function() {
            var command = '/command@exampleBot';
            var result = bot.getCommand(command);

            expect(result).to.not.equal('@');
        });

        it("command should be false", function() {
            var command = '/command@otherBot';
            var result = bot.getCommand(command);

            expect(result).to.equal(false);
        });
    });

});
