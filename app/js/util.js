define(["jquery", "underscore"], function($, _) {

  function extendWrapper(isDeepCopy, original, newStuff) {
    return $.extend(isDeepCopy, original, newStuff)
  }

  return {
    deepCopy: function deepCopy(thingToClone) {
      return extendWrapper(true, {}, thingToClone)
    },
    cloneInto: function (original, newStuff) {
      return extendWrapper(true, original, newStuff);
    },
    valueEquality: function(thing1, thing2) { //Because Dr. Seuss
      return _.isEqual(thing1, thing2);
    }
  }
});
