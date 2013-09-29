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

//TODO: make this responsible for fewer than all the things
define(["jquery", "underscore", "ractive", "./js/calculate", "./js/data/data", "./js/listUtil/listUtil", "./js/templates/namespace"],
function($, _, Ractive, calcFactory, data, listUtil, templates){

  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";
  var consumption = "consumption";

  var calculate = calcFactory(data.editables);

  var ui = new Ractive({
    el: 'placeForStuff',
    template: templates.master,
    partials: {
      lists: templates.lists,
      checks: templates.checks,
      edicts: templates.edicts,
      leaders: templates.leaders
    },
    data: {
      checks: [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)],
      editables: data.editables,
      edicts: data.edicts
    }
  });

  function displayNewItemDialog(listToPushTo, defaultItemName) {
    function callback(newItem) {
      listToPushTo.push(deepCopy(newItem));
      ui.fire("onChange");
    }

    listUtil("editor", defaultItemName, callback);
  }

  ui.on({
    onChange: function(event) {
      //TODO: find out how to recalculate only the necessary checks.
      //      Also, this relies on the fact that data.editables is an object reference shared across everything
      //        which really isn't the best thing ever
      ui.set("checks", [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)]);
    },
    addBuilding: function(event) {
      displayNewItemDialog(data.editables.buildings, "New Building");
    },
    addEvent: function(event) {
      displayNewItemDialog(data.editables.events, "New Event");
    },
    saveEditables: function(event) {
      window.localStorage["kingmakerKingdomData"] = JSON.stringify(data.editables);
    },
    loadEditables: function(event) {
      data.editables = JSON.parse(window.localStorage["kingmakerKingdomData"]);
    }
  });

//  NOTE: This is one giant hack to get holidays to update. TODO: better figure out how to
//        wrangle ractive and select lists
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
