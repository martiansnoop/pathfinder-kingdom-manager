var express = require("express");
var app = express(),
    port = 3000;

app.get("/", function(req, res) {
  //TODO: which of these is better?
  // I prefer not exposing the file extension, for future extensibility
  res.sendfile("app/index.html");
//  res.redirect("index.html");
});

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.directory('app'));
  app.use(express.static('app'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

//app.get('/hello', function(req, res) {
//  var body = "Good morning, Dave";
//  res.send(body);
//});
//
//app.post("/hello", express.bodyParser(), function(req, res) {
//  console.log("I'm sorry, Dave. I'm afraid I can't do that. ");
//  res.end();
//});

app.listen(port);
console.log("listening on port " + port);
