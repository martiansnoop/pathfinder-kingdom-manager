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
define(["jquery", "underscore", "ractive", "./js/calculate", "./js/data/data", "./js/newItemDialog/newItemDialog", "./js/templates/namespace"],
function($, _, Ractive, calculateChecks, data, renderNewItemDialog, templates){

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
      edicts: data.edicts,
      debug: false
    }
  });


  ui.on({
    onChange: function(event) {
      ui.set("checks", calculateChecks(ui.get("editables"), ui.get("singleValues.unrest"), ui.get("singleValues.size")));
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
    addTileImprovement: function(event) {
      displayNewItemDialog(ui.get("editables.tileImprovements"), "New Tile Improvement");
    },
    removeItemFromList: function(event) {
      var thingBeingDeleted = event.context.name;
      confirm("Delete " + thingBeingDeleted + "?");

      var keys = event.keypath.split(".");
      var index = keys[2];
      var arrayKeyPath = keys[0] + "." + keys[1];
      var array = ui.get(arrayKeyPath);

      array.splice(index, 1);
      ui.fire("onChange");
    },
    saveEditables: function(event) {
      window.localStorage["kingmakerKingdomData"] = JSON.stringify(ui.get("editables"));
      window.localStorage["kingmakerSingleValues"] = JSON.stringify(ui.get("singleValues"));
    },
    loadEditables: function(event) {
      var newEditables = JSON.parse(window.localStorage["kingmakerKingdomData"]);
      var newSingles = JSON.parse(window.localStorage["kingmakerSingleValues"])
      init(newEditables, newSingles, ui);
    }
  });

  init(data.editables,{unrest: 1, treasury: 13, size: 6}, ui);

  function init(editables, singles, ui) {
    ui.set("editables", editables);
    ui.set("singleValues", singles);
    ui.set("checks", calculateChecks(editables, ui.get("singleValues.unrest"), ui.get("singleValues.size")) );
    wireSelectLists(editables, ui);
  }

  function displayNewItemDialog(listToPushTo, defaultItemName) {
    function callback(newItem) {
      if(newItem.modifiers.unrest) {
        ui.set("singleValues.unrest", parseInt(ui.get("singleValues.unrest")) + newItem.modifiers.unrest);
      }

      if(newItem.modifiers.bp_cost) {
        ui.set("singleValues.treasury", parseInt(ui.get("singleValues.treasury")) - newItem.modifiers.bp_cost);
      }

      listToPushTo.push(deepCopy(newItem));
      ui.fire("onChange");
    }

    renderNewItemDialog("editor", defaultItemName, callback);
  }

//  NOTE: This is one giant hack to get holidays to update. TODO: better figure out how to
//        wrangle ractive and select lists

  function wireSelectLists(editables, ui) {
    var pairsToObserve = [{editable: editables.edicts.holidays, keypath: "selectedHoliday"},
      {editable: editables.edicts.taxation, keypath: "selectedTaxation"},
      {editable: editables.edicts.promotion, keypath: "selectedPromotion"}];

    var edictDataSource = data.edicts;

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
