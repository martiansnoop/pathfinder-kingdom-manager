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

define(["jquery", "underscore", "ractive", "./js/checkCalculator", "./js/data/stubbedKingdomSpec", "text!./js/template"],
function($, _, Ractive, calc, stubbedData, template){

  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";

  var calculateCheck = calc(stubbedData);
  var economyData = calculateCheck(economy);
  var loyaltyData = calculateCheck(loyalty);
  var stabilityData = calculateCheck(stability);

  var ui = new Ractive({
    el: 'placeForStuff',
    template: template,
    data: {
      checks: [economyData, loyaltyData, stabilityData],
      modifierSources: stubbedData.modifierSources
    }
  });


  ui.on({
    onChange: function(event) {
      //TODO: find out how to recalculate only the necessary checks
      ui.set("checks", [calculateCheck(economy), calculateCheck(loyalty), calculateCheck(stability)]);
    }
  })
});
