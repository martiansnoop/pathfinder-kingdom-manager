define(["../component"], function(componentFactory){

  return function(messageBus) {

    var data = {};
    var component;


    function updateData(newData) {
      data = newData;
      if(component) {
        component.update("leaders", newData.leaders);
      }
    }

    function render(elementId, template) {
      component = componentFactory(elementId, data, template);

      component.addListener("onChange", function(event){
        //TODO: make this more clear, or tap into more Ractive magic so it just works
        var keys = event.keypath.split(".");
        var arrayName = keys[0];
        var index = keys[1];
        var property = keys[2];

        data[arrayName][index][property] = event.context;
        messageBus.publish("UserEditedData", data);
      });
    }

    messageBus.subscribe("LeadersOverwriteRequested", function(newData) {
      updateData(newData);
    });


    return {
      render: render,
      updateData: updateData
    }
  }

});
