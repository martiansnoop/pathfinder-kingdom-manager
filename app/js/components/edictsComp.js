define(["../component"], function(componentFactory){

  return function(messageBus) {

    var edictsData = {};
    var edictsComponent;


    function updateData(data) {
      if(edictsComponent) {
        edictsComponent.update("selected", data.selected);
        edictsComponent.update("allEdicts", data.allEdicts);
      }
    }

    function render(elementId, template) {
      edictsComponent = componentFactory(elementId, edictsData, template);

      edictsComponent.addListener("selectedEdictsChanged", function(event){
        var newSelectedEdicts = event.context;
        messageBus.publish("UserEditedData", {edicts: newSelectedEdicts});
      });
    }

    messageBus.subscribe("EdictsOverwriteRequested", function(data) {
      updateData(data);
    });


    return {
      render: render,
      updateData: updateData
    }
  }

});
