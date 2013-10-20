define(["./data/namespace"], function(data){

  var kingdomDataKey = "kingmakerKingdomData";

  var mutableData = {
    editables: data.editables,
    singles: {unrest: 0, treasury: 14, size: 10}
  };

  var dataInterface = {
    save: function(mutableData) {
      window.localStorage[kingdomDataKey] = JSON.stringify(mutableData);
    },
    load: function() {
      try {
        return JSON.parse(window.localStorage[kingdomDataKey]);
      } catch(error) {
        return  mutableData;
      }
    },
    nuke: function() {
      delete window.localStorage[kingdomDataKey];
    },
    isAvailable: function() {
      return typeof(Storage) !== "undefined";
    }
  };

  return {
    localStorage: dataInterface
  }
});
