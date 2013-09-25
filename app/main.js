"use strict";

require.config({
  paths : {
    jquery: "./js/vendor/jquery",
    underscore: "./js/vendor/underscore",
    ractive: "./js/vendor/Ractive",
    text: "./js/vendor/text",
    radio: "./js/vendor/radio"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    radio: {
      exports: "radio"
    }
  }
});

//TODO: clean up imports and make main.js responsible for fewer than all the things
define(["./js/data/namespace", "./js/templates/namespace", "./js/components/namespace", "./pubsub"],
function(data, templates, components, pubsub){

  var bus = pubsub();
  var componentList = [];

  var componentsToRender = [{
      factory: components.edicts,
      template: templates.edicts,
      elementId: "edictsComponent"
    },
    {
      factory: components.checks,
      template: templates.checks,
      elementId: "checksComponent"
    },
    {
      factory: components.leaders,
      template: templates.leaders,
      elementId: "leadersComponent"
    },
    {
      factory: components.buildings,
      template: templates.buildings,
      elementId: "buildingsComponent"
    }];

  componentsToRender.forEach(function(compDef){
    var comp = compDef.factory(bus);
    componentList.push(comp);
    comp.render(compDef.elementId, compDef.template);
  });

  bus.publish("EdictsOverwriteRequested", {allEdicts: data.edicts, selected: data.editables.edicts});
  bus.publish("LeadersOverwriteRequested", {leaders: data.editables.leaders});
  bus.publish("BuildingsOverwriteRequested", {buildings: data.editables.buildings});
  bus.publish("RecalculateChecksRequested", data.editables);

  bus.subscribe("UserEditedData", function(data){
    bus.publish("RecalculateChecksRequested", data);
  });

//  var buildingsData = {
//    buildings: data.editables.buildings
//  };
//  var buildingsComponent = componentFactory("buildingsComponent", buildingsData, templates.buildings);
//
//  var leadershipData = {
//    leaders: data.editables.leaders
//  };
//  var leadershipComponent = componentFactory("leadershipComponent", leadershipData, templates.leadership);



});
