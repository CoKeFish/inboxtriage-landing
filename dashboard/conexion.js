/* Puente con la app local de InboxTriage.
   Si la app corre en esta máquina (localhost:8000), reemplaza los datos de
   ejemplo por la bandeja y los intereses REALES antes de arrancar el panel.
   Si no responde, el panel arranca igual con los datos de ejemplo (demo). */
(function () {
  "use strict";
  /* Si el panel lo sirve la propia app local (mismo origen), la API es relativa
     y no hay permisos de red local del navegador de por medio. */
  var mismoOrigen = location.protocol === "http:" &&
    (location.hostname === "localhost" || location.hostname === "127.0.0.1");
  var API = mismoOrigen ? "" : "http://localhost:8000";
  window.CONEXION = { activa: false, api: API };

  function arrancar() {
    var s = document.createElement("script");
    s.src = "app.js";
    document.body.appendChild(s);
  }

  if (typeof AbortSignal === "undefined" || !AbortSignal.timeout || !window.fetch) {
    return arrancar();
  }

  fetch(API + "/salud", { signal: AbortSignal.timeout(1200) })
    .then(function (r) { return r.json(); })
    .then(function (j) {
      if (!j || j.app !== "inboxtriage") throw new Error("sin app local");
      return Promise.all([
        fetch(API + "/api/bandeja").then(function (r) { return r.json(); }),
        fetch(API + "/api/intereses").then(function (r) { return r.json(); })
      ]);
    })
    .then(function (rs) {
      if (rs[0] && Array.isArray(rs[0].correos)) window.DATOS.correos = rs[0].correos;
      if (rs[1] && Array.isArray(rs[1].intereses)) window.DATOS.intereses = rs[1].intereses;
      window.CONEXION.activa = true;
    })
    .catch(function () { /* sin app local: datos de ejemplo */ })
    .then(arrancar);
})();
