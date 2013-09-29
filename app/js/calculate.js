define(["jquery", "underscore"], function($, _) {

  var economy = "economy";
  var stability = "stability";
  var loyalty = "loyalty";
  var consumption = "consumption";

  function sum(item, memo) {
    return item + memo;
  }

  //Note: ideally, this would be recursive and get the check modifier from
  //any arbitrary depth at which it may exist
  function pluckFromSelfOrModifiers(checkName, item) {
    if(_.has(item, checkName)) {
      return item[checkName];
    }
    else {
      return item.modifiers ? item.modifiers[checkName] : undefined;
    }
  }

  function getModifierSet(checkName, sources) {
    var pluckCheckModifier = _.partial(pluckFromSelfOrModifiers, checkName);

    var sourceKeys = _.keys(sources);
    var modifierList =  _.map(sources, function(source){
        return _.chain(source)
          .map(pluckCheckModifier)
          .filter(_.isNumber) //get rid of crap
          .reduce(sum, 0)
          .value();
      });

    return _.object(sourceKeys, modifierList);
  }

  function calculate(safeData, checkName) {
    var modifierSet = getModifierSet(checkName, safeData);

    return {
      name: checkName,
      sources: modifierSet,
      modifier: _.reduce(modifierSet, sum, 0)
    }

  }

  return function (editables){
    var safeData = $.extend(true, {}, editables);
    var calculateCheck = _.partial(calculate, safeData)

    return [calculateCheck(economy), calculateCheck(loyalty), calculateCheck(stability), calculateCheck(consumption)];
  }

});
