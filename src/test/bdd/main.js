["knockout", "zepto", "jquery"].forEach(function (tech) {
  "use strict";
  var expect = chai.expect;

  function newUI() {
    return new bdd.UI(tech, $);
  }

  bdd.consultingTasks(newUI, expect);
  bdd.addingTasks(newUI, expect);
  bdd.doingTasks(newUI, expect);
});
