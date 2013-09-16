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

define(["jquery", "underscore", "ractive", "./js/checkCalculator", "./js/stubbedKingdomSpec", "text!./js/checkTemplate"],
function($, _, Ractive, calc, stubbedData, checkTemplate){

  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";

  var calculateCheck = calc(stubbedData);
  var economyData = calculateCheck(economy);


  var ui = new Ractive({
    el: 'placeForStuff',
    template: checkTemplate,
    data: {
      modifier: economyData.modifier,
      sources: economyData.sources
    }
  });

  var breakpoint = false;
});
