define(["radio"],function(radio){

  return function() {
    function publish(eventName, data) {
      radio(eventName).broadcast(data);
    }

    function subscribe(eventName, callback) {
      radio(eventName).subscribe(callback);
    }

    function unsubscribe(eventName, callback) {
      radio(eventName).unsubscribe(callback);
    }

    return {
      publish: publish,
      subscribe: subscribe,
      unsubscribe: unsubscribe
    }
  }

});
