define(["jquery", "underscore", "text!./listComponent", "ractive"], function($, _, template, Ractive){

  var newItemTemplate =  {
    name: "New item",
      modifiers: {
        economy: 0,
        stability: 0,
        loyalty: 0,
        unrest: 0,
        consumption: 0,
        bp_cost: 0
    }
  };


  function deepCopy(thing) {
    return $.extend(true, {}, thing);
  }

  function filterUnusedModifiers(data) {

    function isNonzeroNumber(num) {
      return _.isNumber(num) && num != 0;
    }

    var safeData = deepCopy(data);
    var modifiers = safeData.modifiers;

    _.each(_.keys(modifiers), function(key) {
      if(!isNonzeroNumber(modifiers[key])) {
        delete modifiers[key];
      }
    });

    return safeData;
  }

  function render(elementId, data, onSave) {
    var component = new Ractive({
      el: elementId,
      template: template,
      data: data
    });

    component.on({
        "saveThenTeardown": function(event){
          var data = filterUnusedModifiers(component.data);
          onSave(data);
          component.teardown();
        },
        "discard" : function(event) {
          component.teardown();
        }
      });
  }

  return function(elementId, name, onSave) {
    var data = $.extend(true, {}, newItemTemplate)
    data.name = name || data.name;

    render(elementId, data, onSave);
  }

});
