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

 // Origen DECLARADO en el enlace (?src=ig, ?src=tiktok, ?src=prueba). No es
 // atribucion comprobada: solo dice que enlace se uso, y puede faltar.
 var src = "";
 try {
 var m = (location.search || "").match(/[?&]src=([a-z0-9-]{1,20})(?:&|$)/i);
 if (m) src = m[1].toLowerCase();
 } catch (e) {}
 var isTest = src === "prueba";

 // Las visitas/clics de prueba van a claves aparte ("prueba-...") para no
 // mezclarlas con los datos reales. Las claves historicas no cambian.
 function count(key) {
 if (isTest) { hit("prueba-" + key); return; }
 hit(key);
 if (src) hit(key + "__src-" + src);
 }

 var path = (location.pathname || "").replace(/\/+$/, "");
 var file = path.split("/").pop() || "index.html";
 var visita = "visita-index";
 if (file.indexOf("pasteleria") !== -1) visita = "visita-pasteleria";
 else if (file.indexOf("globos") !== -1) visita = "visita-globos";
 count(visita);

 // Mantener el origen declarado al pasar de la portada a las subpaginas.
 if (src) {
 var links = document.querySelectorAll('a[href$=".html"]');
 for (var i = 0; i < links.length; i++) {
 var h = links[i].getAttribute("href");
 if (h && h.indexOf("://") === -1 && h.indexOf("?") === -1) {
 links[i].setAttribute("href", h + "?src=" + src);
 }
 }
 }

 document.addEventListener("click", function (e) {
 var a = e.target && e.target.closest ? e.target.closest("a") : null;
 if (!a || !a.href) return;
 var href = a.href;
 if (href.indexOf(PAST) !== -1) count("clic-pasteleria");
 else if (href.indexOf(GLOB) !== -1) count("clic-globos");
 }, true);
})();
