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
function($, _, Ractive, calculateChecks, data, listUtil, templates){

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
      edicts: data.edicts
    }
  });


  ui.on({
    onChange: function(event) {
      ui.set("checks", calculateChecks(ui.get("editables")));
    },
    addBuilding: function(event) {
      displayNewItemDialog(ui.get("editables.buildings"), "New Building");
    },
    addEvent: function(event) {
      displayNewItemDialog(ui.get("editables.events"), "New Event");
    },
    addLeader: function(event) {
      displayNewItemDialog(ui.get("editables.leaders"), "New Leader");
    },
    saveEditables: function(event) {
      window.localStorage["kingmakerKingdomData"] = JSON.stringify(ui.get("editables"));
    },
    loadEditables: function(event) {
      var newEditables = JSON.parse(window.localStorage["kingmakerKingdomData"]);
      init(newEditables, ui);
    }
  });

  init(data.editables, ui);

  function init(editables, ui) {
    ui.set("editables", editables);
    ui.set("checks", calculateChecks(editables) );
    wireSelectLists(editables, ui);
  }

  function displayNewItemDialog(listToPushTo, defaultItemName) {
    function callback(newItem) {
      listToPushTo.push(deepCopy(newItem));
      ui.fire("onChange");
    }

    listUtil("editor", defaultItemName, callback);
  }

//  NOTE: This is one giant hack to get holidays to update. TODO: better figure out how to
//        wrangle ractive and select lists

  function wireSelectLists(editables, ui) {
    var pairsToObserve = [{editable: editables.edicts.holidays, keypath: "selectedHoliday"},
      {editable: editables.edicts.taxation, keypath: "selectedTaxation"},
      {editable: editables.edicts.promotion, keypath: "selectedPromotion"}];

    pairsToObserve.forEach(function(pair){
      ui.observe(pair.keypath, function(){
        $.extend(true, pair.editable, ui.get(pair.keypath));
        ui.fire("onChange");
      });
    });
  }

  function deepCopy(thing) {
    return $.extend(true, {}, thing);
  }

});
