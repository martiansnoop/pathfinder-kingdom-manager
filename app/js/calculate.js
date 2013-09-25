define(["jquery", "underscore"], function($, _) {

  function sum(item, memo) {
    return item + memo;
  }

  //Note - there's likely a more elegant (and more cryptic) way to write this.
  //There's probably also a more elegant and less cryptic way as well.
  //Also, this will be a pain in the ass to
  function getModifiersForCheck(checkName, editables) {
    editables.edicts = _.toArray(editables.edicts); //HACK: come back and fix this once I have a better idea of exactly what this should do
    editables.stats = _.toArray(editables.stats); // this too
    var modifiers = _.chain(editables)
      .map(function(source, sourceName){
        var modifier = _.chain(source)
          .pluck("modifiers")
          .pluck(checkName)
          .filter(_.isNumber) //get rid of undefined values
          .reduce(sum, 0)
          .value();

        return {
          from: sourceName,
          modifier: modifier
        }
      })
      .value();

    return modifiers;
  }

  return function (editables){
    return function calculateCheck(checkName) {
      var safeData = $.extend(true, {}, editables);

      var modifiers = getModifiersForCheck(checkName, safeData);
      var totalModifier = _.chain(modifiers).pluck("modifier").reduce(sum, 0).value();

      return {
        name: checkName,
        sources: modifiers,
        modifier: totalModifier
      }

    }
  }

});
