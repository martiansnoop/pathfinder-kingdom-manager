define(["./stubbedKingdomSpec", "edicts"], function(modifiers, allEdicts){
  return {
    edicts: allEdicts,
    modifiables: modifiers.modifierSources
  }
});
