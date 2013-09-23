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

//TODO: clean up imports and make main.js responsible for fewer than all the things
define(["jquery", "underscore", "./js/calculate", "./js/data/namespace", "./js/component", "./js/templates/namespace"],
function($, _, calcFactory, data, componentFactory, templates){

  var buildingsData = {
    buildings: data.editables.buildings
  };
  var buildingsComponent = componentFactory("buildingsComponent", buildingsData, templates.buildings);

  var leadershipData = {
    leaders: data.editables.leaders
  };
  var leadershipComponent = componentFactory("leadershipComponent", leadershipData, templates.leadership);


  var edictsData = {
    allEdicts: data.edicts,
    selected: {
      holiday: data.edicts.holidays[0],
      taxation: data.edicts.taxation[0],
      promotion: data.edicts.promotion[0]
    }
  };
  var edictsComponent = componentFactory("edictsComponent", edictsData, templates.edicts);
  edictsComponent.addListener("selectedEdictsChanged", function(event){
    var breakpoint = false;
    var newEdicts = event.context;
  });


  //TODO: find out why strict mode complains when I make these constants
  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";
  var consumption = "consumption";

  var calculate = calcFactory(data.editables);

  var checksData = {
    checks: [calculate(economy), calculate(loyalty), calculate(stability), calculate(consumption)]
  };

  var checksComponent = componentFactory("checksComponent", checksData, templates.checks);
});
