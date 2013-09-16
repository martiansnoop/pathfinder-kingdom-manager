"use strict";

require.config({
  paths : {
    jquery: "./js/vendor/jquery",
    underscore: "./js/vendor/underscore",
    ractive: "./js/vendor/Ractive",
    text: "./js/vendor/text"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    }
  }
});

define(["jquery", "underscore", "./js/checkCalculator", "./js/stubbedKingdomSpec"], function($, _, calc, stubbedData){

  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";

  var calculateCheck = calc(stubbedData);
  var economyModifier = calculateCheck(economy);

  var breakpoint = false;
});
