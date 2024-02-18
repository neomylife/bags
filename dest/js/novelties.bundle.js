"use strict";

!function () {
  "use strict";

  var e = document.querySelectorAll(".novelties__list-link"),
    t = document.querySelectorAll(".novelties__list-button"),
    l = document.querySelectorAll(".novelties__list-article"),
    o = document.querySelectorAll(".novelties__list-title"),
    n = document.querySelectorAll(".novelties__list-text");
  function c(e) {
    e.forEach(function (e) {
      e.style.display = "none";
    });
  }
  function i(e) {
    e.forEach(function (e) {
      e.style.display = "block";
    });
  }
  c(e), c(t), l.forEach(function (l) {
    l.addEventListener("mouseover", function (l) {
      i(e), i(t), c(o), c(n);
    });
  }), l.forEach(function (l) {
    l.addEventListener("mouseout", function (l) {
      c(e), c(t), i(o), i(n);
    });
  });
}();