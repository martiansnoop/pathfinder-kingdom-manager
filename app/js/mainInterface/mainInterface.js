define(["ractive", "../util", "./templates/namespace", "../newItemDialog/newItemDialog", "../calculate"],
function(Ractive, util, templates, renderNewItemDialog, calculateChecks){

  function render(staticData) {
    return new Ractive({
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
  }

  function init(mutableData, immutableData, ui) {
    ui.set("editables", mutableData.editables);
    ui.set("singleValues", mutableData.singles);
    ui.set("checks", calculateChecks(mutableData.editables, ui.get("singleValues.unrest"), ui.get("singleValues.size")) );
    wireSelectLists(mutableData.editables.edicts, immutableData.edicts, ui);
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
        //WARNING: currently this depends on the context being an item in a list.
        //If you move the delete button into a different context, this may no longer function
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
        externalDataInterface.save({
          editables: ui.get("editables"),
          singles: ui.get("singleValues")
        })
      },
      loadEditables: function(event) {
        var newMutableData = externalDataInterface.load();
        init(newMutableData, ui);
      },
      nukeStoredData: function(event) {
        externalDataInterface.nuke();
      }
    });
  }

  function displayNewItemDialog(ui, listToPushTo, defaultItemName) {
    function callback(newItem) {
      if(newItem.modifiers.unrest) {
        ui.set("singleValues.unrest", parseInt(ui.get("singleValues.unrest")) + newItem.modifiers.unrest);
        delete newItem.modifiers.unrest;
      }

      if(newItem.modifiers.bp_cost) {
        ui.set("singleValues.treasury", parseInt(ui.get("singleValues.treasury")) - newItem.modifiers.bp_cost);
        delete newItem.modifiers.bp_cost
      }

      listToPushTo.push(util.deepCopy(newItem));
      ui.fire("onChange");
    }

    renderNewItemDialog("editor", defaultItemName, callback);
  }

//  NOTE: This is one giant hack to get edicts to update. TODO: better figure out how to
//        wrangle ractive and select lists

  function wireSelectLists(mutableEdicts, immutableEdicts, ui) {

    var pairsToObserve = [
      {editable: mutableEdicts.holidays, keypath: "selectedHoliday", immutables: immutableEdicts.holidays},
      {editable: mutableEdicts.taxation, keypath: "selectedTaxation", immutables: immutableEdicts.taxation},
      {editable: mutableEdicts.promotion, keypath: "selectedPromotion", immutables: immutableEdicts.promotion}
    ];

    pairsToObserve.forEach(function(pair){
      pair.immutables.forEach(function(immutable) {
        if(util.valueEquality(pair.editable.modifiers, immutable.modifiers)) {
          ui.set(pair.keypath, immutable);
        }
      });

      ui.observe(pair.keypath, function() {
        util.cloneInto(pair.editable, ui.get(pair.keypath));
        ui.defer(ui.fire("onChange"));
      });
    });
  }


  return function(immutableData, externalDataInterface) {
    var ui = render(immutableData);
    var mutableData = externalDataInterface.load();

    init(mutableData, immutableData, ui);
    wireEvents(ui, externalDataInterface);
  }
});
