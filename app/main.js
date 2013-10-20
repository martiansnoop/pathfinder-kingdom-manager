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

define(["./js/data/namespace", "./js/mainInterface/mainInterface", "./js/storageManager"],
function(data, renderMainInterface, storageManager) {

  var staticData = {
    edicts: data.edicts,
    alignments: data.alignments,
    debug: false //TODO: this isn't really static
  };

  var mutableData = {
    editables: data.editables,
    singles: {unrest: 0, treasury: 14, size: 10}
  };

  renderMainInterface(staticData, storageManager.localStorage);

});
