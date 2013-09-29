define(["text!./checks.html", "text!./edicts.html", "text!./master.html"], function(checks, edicts, master){
  return {
    master: master,
    checks: checks,
    edicts: edicts
  }
});
