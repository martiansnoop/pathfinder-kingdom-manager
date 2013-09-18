define(["jquery", "underscore"], function($, _) {

  function sum(item, memo) {
    return item + memo;
  }

  //Note - there's likely a more elegant (and more cryptic) way to write this.
  //There's probably also a more elegant and less cryptic way as well.
  //Also, this will be a pain in the ass to
  function getModifiersForCheck(checkName, modifiables) {
    var modifiers = _.chain(modifiables)
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

  return function calculateCheck(checkName, modifiables) {

    var modifiers = getModifiersForCheck(checkName, modifiables);
    var totalModifier = _.chain(modifiers).pluck("modifier").reduce(sum, 0).value();

    return {
      name: checkName,
      sources: modifiers,
      modifier: totalModifier
    }

  }
});
