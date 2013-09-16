define(["jquery", "underscore"], function($, _) {

  return function getCalculator(dataSet) {

    function sum(item, memo) {
      return item + memo;
    }

    //Note - there's likely a more elegant (and more cryptic) way to write this.
    //There's probably also a more elegant and less cryptic way as well.
    //Also, this will be a pain in the ass to
    function getModifiersForCheck(checkName) {
      var modifiers = _.chain(dataSet.modifierSources)
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

    return function calculateCheck(checkName) {

      var modifiers = getModifiersForCheck(checkName);
      var totalModifier = _.chain(modifiers).pluck("modifier").reduce(sum, 0).value();

      return {
        sources: modifiers,
        modifier: totalModifier
      }

    }

  }
});
