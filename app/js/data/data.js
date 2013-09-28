define(["./stubbedKingdomSpec", "./edicts"], function(stubbedData, allEdicts){
  return {
    edicts: allEdicts,
    editables: stubbedData.modifierSources,
    defaultBuilding: {
      name: "New building",
      modifiers: {
        economy: 0,
        stability: 0,
        loyalty: 0,
        unrest: 0
      }
    },
    defaultEvent: {
      name: "New event",
      modifiers: {
        economy: 0,
        stability: 0,
        loyalty: 0,
        unrest: 0
      }
    }
  }
});
