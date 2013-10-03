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

define(["./js/data/namespace","./js/mainInterface/mainInterface"], function(data, renderMainInterface){

  var staticData = {
    edicts: data.edicts,
    alignments: data.alignments,
    debug: false //TODO: this isn't really static
  };

  var mutableData = {
    editables: data.editables,
    singles: {unrest: 1, treasury: 13, size: 6}
  };

  var dataInterface = {
    save: function(mutableData) {
      window.localStorage["kingmakerKingdomData"] = JSON.stringify(mutableData.editables);
      window.localStorage["kingmakerSingleValues"] = JSON.stringify(mutableData.singles);
    },
    load: function() {
      var newEditables = JSON.parse(window.localStorage["kingmakerKingdomData"]);
      var newSingles = JSON.parse(window.localStorage["kingmakerSingleValues"]);
      return {
        editables: newEditables,
        singles: newSingles
      };
    }
  };


  //TODO: turn arguments into an options argument if I need any more things passed in
  renderMainInterface(staticData, mutableData, dataInterface);

});
