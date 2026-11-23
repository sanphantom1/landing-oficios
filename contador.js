(function () {
  var NS = "oficiosencasas";
  var BASE = "https://abacus.jasoncameron.dev/hit/" + NS + "/";
  var PAST = "go.hotmart.com/N108605406P";
  var GLOB = "go.hotmart.com/E108605414J";

  function hit(key) {
    var url = BASE + encodeURIComponent(key);
    function send(attempt) {
      try {
        // GET + CORS: Abacus allows any origin and only increments on GET
        // (sendBeacon is POST, so it cannot be used). Retry a couple of
        // times because the service occasionally returns 500.
        fetch(url, {
          method: "GET",
          mode: "cors",
          keepalive: true,
          cache: "no-store",
          credentials: "omit"
        }).then(function (res) {
          if (!res.ok && attempt < 2) {
            setTimeout(function () { send(attempt + 1); }, 500 * (attempt + 1));
          }
        }).catch(function () {
          if (attempt < 2) setTimeout(function () { send(attempt + 1); }, 500 * (attempt + 1));
        });
      } catch (e) {}
    }
    send(0);
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
