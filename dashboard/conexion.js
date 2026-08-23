/* Puente con la app local de InboxTriage.
   El panel SOLO muestra correos reales: si la app corre en esta máquina
   (localhost:8000), carga la bandeja y los intereses reales y arranca.
   Si no hay app, redirige a la descarga — aquí no hay modo demo. */
(function () {
  "use strict";
  /* Si el panel lo sirve la propia app local (mismo origen), la API es relativa
     y no hay permisos de red local del navegador de por medio. */
  var mismoOrigen = location.protocol === "http:" &&
    (location.hostname === "localhost" || location.hostname === "127.0.0.1");
  var API = mismoOrigen ? "" : "http://localhost:8000";
  window.CONEXION = { activa: false, api: API, local: mismoOrigen };

  function arrancar() {
    document.body.removeAttribute("data-esperando");
    var s = document.createElement("script");
    s.src = "app.js";
    document.body.appendChild(s);
  }

  function aDescargas() {
    location.replace("https://inboxtriage.vercel.app/#descargar");
  }

  if (typeof AbortSignal === "undefined" || !AbortSignal.timeout || !window.fetch) {
    return mismoOrigen ? arrancar() : aDescargas();
  }

  /* En la web, la primera vez Chrome puede pedir permiso de "red local":
     se espera lo suficiente para que la persona acepte. En la app instalada
     la respuesta es inmediata. */
  fetch(API + "/salud", { signal: AbortSignal.timeout(mismoOrigen ? 1500 : 6000) })
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
    .then(arrancar)
    .catch(function () {
      /* Sin app conectada no hay nada real que mostrar:
         en la app instalada arranca vacío; en la web, directo a la descarga. */
      if (mismoOrigen) return arrancar();
      aDescargas();
    });
})();
