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
    singles: {unrest: 0, treasury: 14, size: 10}
  };

  var dataInterface = {
    save: function(mutableData) {
      //TODO: Fall back to some mutually agreeable init value if stuff is not in localStorage
      window.localStorage["kingmakerKingdomData"] = JSON.stringify(mutableData.editables);
      window.localStorage["kingmakerSingleValues"] = JSON.stringify(mutableData.singles);
    },
    load: function() {
      try {
        return {
          editables: JSON.parse(window.localStorage["kingmakerKingdomData"]),
          singles: JSON.parse(window.localStorage["kingmakerSingleValues"])
        };
      } catch(error) {
        return  mutableData;
      }
    },
    nuke: function() {
      delete window.localStorage["kingmakerKingdomData"];
      delete window.localStorage["kingmakerSingleValues"];
    }
  };


  renderMainInterface(staticData, dataInterface);

});
