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

define(["jquery", "underscore", "ractive", "./js/calculate", "./js/data/data", "text!./js/template"],
function($, _, Ractive, calcFactory, data, template){

  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";
  var consumption = "consumption";

  var calculate = calcFactory(data.editables);

  var ui = new Ractive({
    el: 'placeForStuff',
    template: template,
    data: {
      checks: [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)],
      editables: data.editables,
      edicts: data.edicts,
      selectedHoliday: data.edicts.holidays[2]
    }
  });

  ui.on({
    onChange: function(event) {
      //TODO: find out how to recalculate only the necessary checks
      ui.set("checks", [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)]);
    }
  })
});
