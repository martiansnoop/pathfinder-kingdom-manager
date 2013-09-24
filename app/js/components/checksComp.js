define(["../component", "../calculate", "jquery"], function(componentFactory, calcFactory, $){

  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";
  var consumption = "consumption";

  return function(messageBus) {
    var checksComponent;
    var backingData = {};
    var checksData = {};

    function updateData(data){

      $.extend(true, backingData, data);

      var calculate = calcFactory(backingData);

      checksData = {
        checks: [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)]
      };

      if(checksComponent) {
        checksComponent.update("checks", checksData.checks);
      }
    }

    function render(elementId, template) {
      checksComponent = componentFactory(elementId, checksData, template);
    }

    messageBus.subscribe("RecalculateChecksRequested", function(data){
      updateData(data);
    });

    return {
      render: render,
      updateData: updateData
    }
  }

});
