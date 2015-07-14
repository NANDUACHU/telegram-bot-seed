var dice = require('../middleware/dice'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var expect = require("chai").expect;

describe("dice", function() {

    describe(".rollTheDice()", function() {

        it("is number", function() {
            var result = dice.rollTheDice();

            expect(result).to.be.a('object');
            expect(result.number).to.be.a('number');
        });

        it("set Dice range and check between", function() {
            dice.settings = {
                min: 0,
                max: 100
            };

            for (var iteration = 0; iteration < 100; iteration++) {
                expect(
                    dice.rollTheDice().number
                ).to.be.within(
                    dice.settings.min,
                    dice.settings.max
                );
            }
        });

    });

});
