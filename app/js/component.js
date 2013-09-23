define(["ractive"], function(Ractive) {

  return function(elementId, data, template) {

    var ui;

    function render() {

      ui = new Ractive({
        el: elementId,
        template: template,
        data: data
      });

    }

    function exportData(key) {
      return ui.get(key || "data");
    }

    function addListener(eventName, callback) {
      var listenObj = {};
      listenObj[eventName] = callback;
      ui.on(listenObj);
    }

    function update(keypath, data) {
      ui.set(keypath, data)
    }

    //TODO: should be give the outside world the power to render us?
    render();

    return {
      getData: exportData,
      addListener: addListener,
      update: update
    }
  }

});
