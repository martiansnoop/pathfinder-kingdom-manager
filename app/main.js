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

//TODO: make this responsible for fewer than all the things
define(["./js/data/data","./js/mainInterface/mainInterface"],
function(data, renderMainInterface){

  var staticData = {
    edicts: data.edicts,
    alignments: data.alignments,
    debug: false //TODO: this isn't really static
  };

  var mutableData = {
    editables: data.editables,
    singles: {unrest: 1, treasury: 13, size: 6}
  };

  //TODO: unhook these from the ractive/UI and make them store/retrieve stuff only
  var callbacks = {
    saveEditables: function(event) {
      window.localStorage["kingmakerKingdomData"] = JSON.stringify(ui.get("editables"));
      window.localStorage["kingmakerSingleValues"] = JSON.stringify(ui.get("singleValues"));
    },
    loadEditables: function(event) {
      var newEditables = JSON.parse(window.localStorage["kingmakerKingdomData"]);
      var newSingles = JSON.parse(window.localStorage["kingmakerSingleValues"]);
      init(newEditables, newSingles, ui);
    }
  };


  var ui = renderMainInterface(staticData, mutableData);


});
