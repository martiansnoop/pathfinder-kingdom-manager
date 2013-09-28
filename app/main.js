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
      edicts: data.edicts
    }
  });

  ui.on({
    onChange: function(event) {
      //TODO: find out how to recalculate only the necessary checks
      ui.set("checks", [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)]);
    },
    addBuilding: function(event) {
      data.editables.buildings.push(deepCopy(data.defaultBuilding));
      ui.fire("onChange");
    },
    addEvent: function(event) {
      data.editables.events.push(deepCopy(data.defaultEvent));
      ui.fire("onChange");
    }
  });

//  NOTE: This is one giant hack to get holidays to update
  var pairsToObserve = [{editable: data.editables.edicts.holidays, keypath: "selectedHoliday"},
    {editable: data.editables.edicts.taxation, keypath: "selectedTaxation"},
    {editable: data.editables.edicts.promotion, keypath: "selectedPromotion"}];

  pairsToObserve.forEach(function(pair){
    ui.observe(pair.keypath, function(){
      $.extend(true, pair.editable, ui.get(pair.keypath));
      ui.fire("onChange");
    });
  });


  function deepCopy(thing) {
    return $.extend(true, {}, thing);
  }

});
