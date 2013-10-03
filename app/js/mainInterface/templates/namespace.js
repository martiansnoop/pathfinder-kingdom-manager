define(["text!./checks.html", "text!./edicts.html", "text!./master.html", "text!./lists.html", "text!./leaders.html"], function(checks, edicts, master, lists, leaders){
  return {
    master: master,
    checks: checks,
    edicts: edicts,
    lists: lists,
    leaders: leaders
  }
});
