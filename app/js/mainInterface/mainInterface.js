define(["ractive", "../util", "./templates/namespace", "../newItemDialog/newItemDialog", "../calculate"],
function(Ractive, util, templates, renderNewItemDialog, calculateChecks){

  function render(staticData) {
    var ui = new Ractive({
      el: 'placeForStuff',
      template: templates.master,
      partials: {
        lists: templates.lists,
        checks: templates.checks,
        edicts: templates.edicts,
        leaders: templates.leaders
      },
      data: staticData
    });

    return ui;
  }

  function init(mutableData, ui) {
    ui.set("editables", mutableData.editables);
    ui.set("singleValues", mutableData.singles);
    ui.set("checks", calculateChecks(mutableData.editables, ui.get("singleValues.unrest"), ui.get("singleValues.size")) );
    wireSelectLists(mutableData.editables, ui);
  }

  function wireEvents(ui, externalDataInterface) {
    ui.on({
      onChange: function(event) {
        ui.set("checks", calculateChecks(ui.get("editables"), ui.get("singleValues.unrest"), ui.get("singleValues.size")));
      },
      addBuilding: function(event) {
        displayNewItemDialog(ui, ui.get("editables.buildings"), "New Building");
      },
      addEvent: function(event) {
        displayNewItemDialog(ui, ui.get("editables.events"), "New Event");
      },
      addLeader: function(event) {
        displayNewItemDialog(ui, ui.get("editables.leaders"), "New Leader");
      },
      addTileImprovement: function(event) {
        displayNewItemDialog(ui, ui.get("editables.tileImprovements"), "New Tile Improvement");
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
        externalDataInterface.save(ui.get("editables"), ui.get("singleValues"));
      },
      loadEditables: function(event) {
        var newMutableData = externalDataInterface.load();
        init(newMutableData, ui);
      }
    });
  }

  function displayNewItemDialog(ui, listToPushTo, defaultItemName) {
    function callback(newItem) {
      if(newItem.modifiers.unrest) {
        ui.set("singleValues.unrest", parseInt(ui.get("singleValues.unrest")) + newItem.modifiers.unrest);
      }

      if(newItem.modifiers.bp_cost) {
        ui.set("singleValues.treasury", parseInt(ui.get("singleValues.treasury")) - newItem.modifiers.bp_cost);
      }

      listToPushTo.push(util.deepCopy(newItem));
      ui.fire("onChange");
    }

    renderNewItemDialog("editor", defaultItemName, callback);
  }

//  NOTE: This is one giant hack to get edicts to update. TODO: better figure out how to
//        wrangle ractive and select lists

  function wireSelectLists(editables, ui) {
    var pairsToObserve = [{editable: editables.edicts.holidays, keypath: "selectedHoliday"},
      {editable: editables.edicts.taxation, keypath: "selectedTaxation"},
      {editable: editables.edicts.promotion, keypath: "selectedPromotion"}];

    pairsToObserve.forEach(function(pair){
      ui.observe(pair.keypath, function(){
        util.cloneInto(pair.editable, ui.get(pair.keypath));
        ui.fire("onChange");
      });
    });
  }


  return function(staticData, mutableData, externalDataInterface) {
    var ui = render(staticData);
    init(mutableData, ui);
    wireEvents(ui, externalDataInterface);
  }
});
