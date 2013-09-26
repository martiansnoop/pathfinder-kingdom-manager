define(["jquery", "underscore"], function($, _) {

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
      return item.modifiers[checkName];
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

  return function (editables){
    return function calculateCheck(checkName) {
      var safeData = $.extend(true, {}, editables);

      var modifierSet = getModifierSet(checkName, safeData);

      //TODO: clean this up by modifying the template to take the data in a better format
      var sources = _.map(modifierSet, function(val, key) {
        return {
          from: key,
          modifier: val
        };
      });

      return {
        name: checkName,
        sources: sources,
        modifier: _.reduce(modifierSet, sum, 0)
      }

    }
  }

});
