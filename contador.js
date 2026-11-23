(function () {
  var NS = "oficiosencasas";
  var BASE = "https://abacus.jasoncameron.dev/hit/" + NS + "/";
  var PAST = "go.hotmart.com/N108605406P";
  var GLOB = "go.hotmart.com/E108605414J";

  function hit(key) {
    var url = BASE + encodeURIComponent(key);
    try {
      // Abacus only increments on GET, so sendBeacon (POST) is not used.
      // keepalive lets the request finish if the page is closing.
      fetch(url, {
        method: "GET",
        mode: "no-cors",
        keepalive: true,
        cache: "no-store",
        credentials: "omit"
      }).catch(function () {});
    } catch (e) {
      try { (new Image()).src = url; } catch (e2) {}
    }
  }

  var path = (location.pathname || "").replace(/\/+$/, "");
  var file = path.split("/").pop() || "index.html";
  var visita = "visita-index";
  if (file.indexOf("pasteleria") !== -1) visita = "visita-pasteleria";
  else if (file.indexOf("globos") !== -1) visita = "visita-globos";
  hit(visita);

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a || !a.href) return;
    var href = a.href;
    if (href.indexOf(PAST) !== -1) hit("clic-pasteleria");
    else if (href.indexOf(GLOB) !== -1) hit("clic-globos");
  }, true);
})();
