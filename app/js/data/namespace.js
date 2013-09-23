define(["./stubbedKingdomSpec", "./edicts"], function(stubbedData, allEdicts){
  return {
    edicts: allEdicts,
    editables: stubbedData.modifierSources
  }
});
