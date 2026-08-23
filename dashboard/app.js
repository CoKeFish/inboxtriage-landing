/* Panel de InboxTriage. Frontend puro sobre los datos de ejemplo de datos.js:
   la bandeja se navega con rutas de hash (#/bandeja, #/bandeja/3, #/intereses),
   los intereses persisten en localStorage y las correcciones de sello viven en memoria.
   Bilingüe ES/EN: la preferencia se comparte con la landing vía la clave "it-lang". */
(function () {
  "use strict";

  var SELLOS = {
    AHORA:   { clase: "ahora",   corto: { es: "Ahora", en: "Now" },        largo: { es: "Responder ahora", en: "Reply now" } },
    DESPUES: { clase: "despues", corto: { es: "Después", en: "Later" },    largo: { es: "Responder después", en: "Reply later" } },
    NO:      { clase: "no",      corto: { es: "Sin resp.", en: "No reply" }, largo: { es: "Sin respuesta", en: "No reply" } }
  };

  var TXT = {
    "titulo":          { es: "InboxTriage — Tu bandeja, revisada", en: "InboxTriage — Your inbox, reviewed" },
    "meta.desc":       { es: "Revisa cómo quedó ordenado tu correo, corrige sellos y escribe qué es importante esta semana.",
                         en: "See how your email was sorted, fix stamps and write what matters this week." },
    "riel.rotulo":     { es: "tu correo, ordenado", en: "your email, sorted" },
    "riel.nav":        { es: "Secciones del panel", en: "Panel sections" },
    "nav.bandeja":     { es: "Bandeja", en: "Inbox" },
    "nav.intereses":   { es: "Tus intereses", en: "Your interests" },
    "estado.modelo":   { es: "Modelo local activo", en: "Local model running" },
    "estado.triaje":   { es: "Último triaje · hoy 08:34", en: "Last triage · today 08:34" },
    "estado.nube":     { es: "Enviado a la nube · 0 correos", en: "Sent to the cloud · 0 emails" },
    "chip.correos":    { es: "Sin conexión con la app", en: "Not connected to the app" },
    "chip.datos":      { es: "Sin conexión con la app", en: "Not connected to the app" },
    "chip.real":       { es: "Conectado · tus correos reales", en: "Connected · your real emails" },
    "chip.real.datos": { es: "Conectado · tu criterio real", en: "Connected · your real rules" },
    "riel.web":        { es: "← Volver a la web", en: "← Back to the site" },
    "riel.salir":      { es: "Cambiar de cuenta de Gmail", en: "Switch Gmail account" },
    "salir.pregunta":  { es: "¿Cerrar la sesión de Gmail?", en: "Sign out of Gmail?" },
    "salir.si":        { es: "Sí, cambiar", en: "Yes, switch" },
    "salir.no":        { es: "No", en: "No" },
    "salir.adios":     { es: "Sesión cerrada. Se abrirá la ventana de InboxTriage con la pantalla de Google para elegir otra cuenta — puedes cerrar esta pestaña.",
                         en: "Signed out. The InboxTriage window will open with Google's screen to pick another account — you can close this tab." },
    "vacio.sinDatos":  { es: "Aún no hay correos clasificados. Corre InboxTriage (clasifica tu bandeja) y recarga esta página.",
                         en: "No emails classified yet. Run InboxTriage (it sorts your inbox) and reload this page." },
    "buscar.ph":       { es: "Buscar remitente, asunto o texto…", en: "Search sender, subject or text…" },
    "buscar.aria":     { es: "Buscar correo", en: "Search email" },
    "filtros.aria":    { es: "Filtrar por sello", en: "Filter by stamp" },
    "filtros.todos":   { es: "Todos", en: "All" },
    "filtros.noleidos":    { es: "No leídos", en: "Unread" },
    "accion.clasificar":   { es: "↻ Clasificar nuevos", en: "↻ Classify new" },
    "accion.clasificando": { es: "Clasificando…", en: "Classifying…" },
    "registro.aria":   { es: "Correos clasificados", en: "Sorted emails" },
    "dia.hoy":         { es: "Hoy", en: "Today" },
    "dia.ayer":        { es: "Ayer", en: "Yesterday" },
    "dia.hoy.min":     { es: "hoy", en: "today" },
    "dia.ayer.min":    { es: "ayer", en: "yesterday" },
    "porque.b":        { es: "por qué:", en: "why:" },
    "vacio.busqueda":  { es: "Ningún correo coincide con «{q}».", en: "No email matches “{q}”." },
    "vacio.ahora":     { es: "Nada urgente esperando respuesta. Buena señal.", en: "Nothing urgent waiting for a reply. That's a good sign." },
    "vacio.sello":     { es: "Nada con este sello por ahora.", en: "Nothing with this stamp for now." },
    "lector.fantasma": { es: "Revisar", en: "Review" },
    "lector.vacio":    { es: "Elige un correo del registro para leerlo y revisar su sello.",
                         en: "Pick an email from the log to read it and check its stamp." },
    "lector.aria":     { es: "Correo seleccionado", en: "Selected email" },
    "volver":          { es: "← Volver a la bandeja", en: "← Back to the inbox" },
    "porque.h3":       { es: "Por qué este sello", en: "Why this stamp" },
    "razon.corregida": { es: "corregido por ti", en: "corrected by you" },
    "origen.corregido":{ es: "InboxTriage tendrá en cuenta esta corrección en el próximo triaje.",
                         en: "InboxTriage will take this correction into account in the next triage." },
    "origen.interes":  { es: "Coincide con tu interés: «{t}».", en: "Matches your interest: “{t}”." },
    "origen.borrado":  { es: "Venía de uno de tus intereses de esta semana.", en: "It came from one of this week's interests." },
    "origen.general":  { es: "Criterio general: se fija en si te preguntan algo y para cuándo.",
                         en: "General rule: it looks at whether they ask you something, and by when." },
    "ver.intereses":   { es: "Ver tus intereses →", en: "See your interests →" },
    "corrigelo":       { es: "¿Sello equivocado? Corrígelo", en: "Wrong stamp? Fix it" },
    "gmail":           { es: "Abrir en Gmail", en: "Open in Gmail" },
    "intereses.h1":    { es: "Tus intereses", en: "Your interests" },
    "ficha.aria":      { es: "Tu criterio de la semana", en: "Your rules for the week" },
    "ficha.h2":        { es: "Qué es importante esta semana", en: "What matters this week" },
    "ficha.intro":     { es: "InboxTriage usa esta lista para decidir qué correo va primero. Escríbelo como se lo dirías a una persona: un evento, una entrega, ciertas personas.",
                         en: "InboxTriage uses this list to decide which email goes first. Write it the way you'd tell a person: an event, a deadline, certain people." },
    "interes.ph":      { es: "Escribe qué es importante…", en: "Write what matters…" },
    "interes.aria":    { es: "Interés {n}", en: "Interest {n}" },
    "interes.quitar":  { es: "Quitar este interés", en: "Remove this interest" },
    "impacto.uno":     { es: "movió 1 correo", en: "moved 1 email" },
    "impacto.varios":  { es: "movió {n} correos", en: "moved {n} emails" },
    "impacto.title":   { es: "Correos que este interés colocó en su bandeja esta semana",
                         en: "Emails this interest placed in their tray this week" },
    "impacto.nuevo":   { es: "desde el próximo triaje", en: "from the next triage on" },
    "anadir":          { es: "+ Añadir un interés", en: "+ Add an interest" },
    "guardar":         { es: "Guardar mi criterio", en: "Save my rules" },
    "guardado":        { es: "Guardado", en: "Saved" },
    "nota.privada":    { es: "Se guarda solo en tu computador. Nada de esto sale a internet.",
                         en: "Saved only on your computer. None of this goes to the internet." },
    "vacio.intereses": { es: "Tu lista está vacía. Sin criterio propio, InboxTriage ordena solo con el criterio general.",
                         en: "Your list is empty. Without your own rules, InboxTriage sorts with the general rule only." },
    "consejos.h3":     { es: "¿Cómo escribirlos?", en: "How to write them?" },
    "consejos.p":      { es: "Funciona mejor con frases concretas:", en: "It works best with concrete phrases:" },
    "consejos.e1":     { es: "«El evento de graduación del viernes 29»", en: "“The graduation event on Friday the 29th”" },
    "consejos.e2":     { es: "«Todo lo que mencione la auditoría va primero»", en: "“Anything that mentions the audit goes first”" },
    "consejos.e3":     { es: "«María, la proveedora del catering»", en: "“María, the catering vendor”" },
    "consejos.borra":  { es: "Y bórralos cuando dejen de importar: la próxima semana tu bandeja se ordena distinto.",
                         en: "And delete them when they stop mattering: next week your inbox sorts differently." }
  };

  var vista = document.getElementById("vista");

  var lang = (function () {
    var url = new URLSearchParams(location.search).get("lang");
    if (url === "es" || url === "en") return url;
    var guardado = null;
    try { guardado = localStorage.getItem("it-lang"); } catch (e) {}
    if (guardado === "es" || guardado === "en") return guardado;
    var nav = (navigator.language || "es").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  })();

  function t(clave, vars) {
    var entrada = TXT[clave] || {};
    var texto = entrada[lang] || entrada.es || clave;
    if (vars) {
      Object.keys(vars).forEach(function (k) { texto = texto.replace("{" + k + "}", vars[k]); });
    }
    return texto;
  }

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Campos de datos con traducción de demo opcional (bloque `en` en datos.js). */
  function campo(c, nombre) {
    if (lang === "en" && c.en && c.en[nombre] != null) return c.en[nombre];
    return c[nombre];
  }
  function razonDe(c) {
    return c.corregido ? t("razon.corregida") : campo(c, "razon");
  }
  function textoInteres(i) {
    return (lang === "en" && i.en != null) ? i.en : i.texto;
  }

  var estado = {
    filtro: "TODOS",
    busqueda: "",
    soloNoLeidos: (function () {
      try { return localStorage.getItem("it-noleidos") === "1"; } catch (e) { return false; }
    })(),
    clasificando: false,
    correos: window.DATOS.correos,
    intereses: cargarIntereses()
  };

  /* ---------- conexión con la app local ---------- */
  function conectado() {
    return Boolean(window.CONEXION && window.CONEXION.activa);
  }
  function api(ruta, cuerpo) {
    if (!conectado()) return;
    fetch(window.CONEXION.api + ruta, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cuerpo)
    }).catch(function () {});
  }

  /* ---------- intereses: carga y guardado ---------- */
  function cargarIntereses() {
    /* conectado: la fuente de verdad es contexto.json de la app, no localStorage */
    if (conectado()) {
      return window.DATOS.intereses.map(function (i) {
        return { id: i.id, texto: i.texto };
      });
    }
    try {
      var guardado = localStorage.getItem("it-intereses");
      if (guardado) {
        var lista = JSON.parse(guardado);
        if (Array.isArray(lista)) return lista;
      }
    } catch (e) {}
    return window.DATOS.intereses.map(function (i) {
      return { id: i.id, texto: i.texto, en: i.en };
    });
  }

  function guardarIntereses() {
    try { localStorage.setItem("it-intereses", JSON.stringify(estado.intereses)); } catch (e) {}
    api("/api/intereses", { intereses: estado.intereses.map(textoInteres) });
  }

  /* ---------- consultas sobre los datos ---------- */
  function correoPorId(id) {
    return estado.correos.find(function (c) { return c.id === id; }) || null;
  }
  function contarPorSello(s) {
    return estado.correos.filter(function (c) { return c.veredicto === s; }).length;
  }
  function impacto(idInteres) {
    return estado.correos.filter(function (c) { return c.regla === idInteres; }).length;
  }

  function coincide(c) {
    if (estado.soloNoLeidos && c.leido) return false;
    if (estado.filtro !== "TODOS" && c.veredicto !== estado.filtro) return false;
    var q = estado.busqueda.trim().toLowerCase();
    if (!q) return true;
    var pajar = (campo(c, "quien") + " " + c.de + " " + campo(c, "asunto") + " " +
      campo(c, "cuerpo").join(" ") + " " + razonDe(c)).toLowerCase();
    return pajar.indexOf(q) !== -1;
  }

  /* ---------- fechas ---------- */
  function fechaHoy() {
    var f = new Date().toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long" });
    return f.charAt(0).toUpperCase() + f.slice(1);
  }

  function semanaActual() {
    var hoy = new Date();
    var lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
    var domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);
    var mesL = lunes.toLocaleDateString(lang, { month: "long" });
    var mesD = domingo.toLocaleDateString(lang, { month: "long" });
    if (lang === "en") {
      return "Week of " + mesL + " " + lunes.getDate() + " to " +
        (mesL === mesD ? "" : mesD + " ") + domingo.getDate();
    }
    return "Semana del " + lunes.getDate() + (mesL === mesD ? "" : " de " + mesL) +
      " al " + domingo.getDate() + " de " + mesD;
  }

  /* ---------- idioma ---------- */
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("it-lang", l); } catch (e) {}
    document.documentElement.lang = l;
    document.title = t("titulo");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("meta.desc"));
    pintarRiel();
    render();
  }

  function pintarRiel() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    var nav = document.querySelector(".riel nav");
    if (nav) nav.setAttribute("aria-label", t("riel.nav"));
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("activo", b.getAttribute("data-lang") === lang);
    });
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* ---------- cambiar de cuenta (solo con la app conectada) ---------- */
  (function () {
    var enlace = document.getElementById("riel-salir");
    var caja = document.getElementById("riel-salir-confirma");
    if (!enlace || !caja || !conectado()) return;
    enlace.hidden = false;
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      enlace.hidden = true;
      caja.hidden = false;
    });
    document.getElementById("salir-no").addEventListener("click", function () {
      caja.hidden = true;
      enlace.hidden = false;
    });
    document.getElementById("salir-si").addEventListener("click", function () {
      fetch(window.CONEXION.api + "/api/salir", { method: "POST" })
        .catch(function () {})
        .then(function () {
          document.body.innerHTML = '<div class="salir-adios">' + t("salir.adios") + "</div>";
        });
    });
  })();

  /* ---------- riel: sección activa y contador ---------- */
  function actualizarNav(rutaActual) {
    document.querySelectorAll(".nav-item").forEach(function (a) {
      a.classList.toggle("activo", a.getAttribute("data-ruta") === rutaActual);
    });
    var n = contarPorSello("AHORA");
    var globo = document.getElementById("cuenta-nav");
    globo.textContent = n;
    globo.hidden = n === 0;
  }

  /* ---------- rutas ---------- */
  function ruta() {
    var h = (location.hash || "#/bandeja").replace(/^#\/?/, "");
    var partes = h.split("/");
    return { vista: partes[0] || "bandeja", id: partes[1] ? Number(partes[1]) : null };
  }

  function render() {
    var r = ruta();
    if (r.vista === "intereses") {
      actualizarNav("intereses");
      renderIntereses();
    } else {
      actualizarNav("bandeja");
      renderBandeja(correoPorId(r.id));
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);

  /* ================= bandeja ================= */
  function renderBandeja(correo) {
    if (correo) correo.leido = true;

    vista.innerHTML =
      '<header class="cab">' +
        '<h1>' + t("nav.bandeja") + '</h1>' +
        '<span class="fecha">' + esc(fechaHoy()) + '</span>' +
        '<span class="chip-demo">' + t(conectado() ? "chip.real" : "chip.correos") + '</span>' +
      '</header>' +
      '<div class="panel' + (correo ? " con-detalle" : "") + '">' +
        '<div class="registro-zona">' +
          '<div class="controles">' +
            '<input class="busqueda" id="busqueda" type="search" placeholder="' + esc(t("buscar.ph")) +
              '" aria-label="' + esc(t("buscar.aria")) + '">' +
            '<div class="filtros" role="group" aria-label="' + esc(t("filtros.aria")) + '" id="filtros"></div>' +
          '</div>' +
          '<div class="registro" id="registro" aria-label="' + esc(t("registro.aria")) + '"></div>' +
        '</div>' +
        '<div class="lector" id="lector"></div>' +
      '</div>';

    var buscador = document.getElementById("busqueda");
    buscador.value = estado.busqueda;
    buscador.addEventListener("input", function () {
      estado.busqueda = buscador.value;
      pintarRegistro(correo ? correo.id : null);
    });

    pintarFiltros(correo ? correo.id : null);
    pintarRegistro(correo ? correo.id : null);
    pintarLector(correo);
  }

  function pintarFiltros(idSel) {
    var cont = document.getElementById("filtros");
    if (!cont) return;
    var defs = [
      { f: "TODOS", nombre: t("filtros.todos"), n: estado.correos.length },
      { f: "AHORA", nombre: SELLOS.AHORA.largo[lang], n: contarPorSello("AHORA") },
      { f: "DESPUES", nombre: SELLOS.DESPUES.largo[lang], n: contarPorSello("DESPUES") },
      { f: "NO", nombre: SELLOS.NO.largo[lang], n: contarPorSello("NO") }
    ];
    var noLeidos = estado.correos.filter(function (c) { return !c.leido; }).length;
    cont.innerHTML = defs.map(function (d) {
      return '<button type="button" class="chip-filtro' + (estado.filtro === d.f ? " activo" : "") +
        '" data-f="' + d.f + '">' + esc(d.nombre) + ' <b>' + d.n + '</b></button>';
    }).join("") +
      '<button type="button" class="chip-filtro chip-noleidos' + (estado.soloNoLeidos ? " activo" : "") +
        '" id="chip-noleidos">' + esc(t("filtros.noleidos")) + ' <b>' + noLeidos + '</b></button>' +
      (conectado()
        ? '<button type="button" class="chip-filtro chip-clasificar" id="chip-clasificar"' +
          (estado.clasificando ? ' disabled' : '') + '>' +
          esc(t(estado.clasificando ? "accion.clasificando" : "accion.clasificar")) + '</button>'
        : "");
    cont.querySelectorAll("button[data-f]").forEach(function (b) {
      b.addEventListener("click", function () {
        estado.filtro = b.getAttribute("data-f");
        pintarFiltros(idSel);
        pintarRegistro(idSel);
      });
    });
    document.getElementById("chip-noleidos").addEventListener("click", function () {
      estado.soloNoLeidos = !estado.soloNoLeidos;
      try { localStorage.setItem("it-noleidos", estado.soloNoLeidos ? "1" : "0"); } catch (e) {}
      pintarFiltros(idSel);
      pintarRegistro(idSel);
    });
    var btnClasificar = document.getElementById("chip-clasificar");
    if (btnClasificar) {
      btnClasificar.addEventListener("click", function () { clasificarNuevos(idSel); });
    }
  }

  /* ---------- clasificar correos nuevos (con la app conectada) ---------- */
  function clasificarNuevos(idSel) {
    if (!conectado() || estado.clasificando) return;
    estado.clasificando = true;
    pintarFiltros(idSel);
    fetch(window.CONEXION.api + "/api/clasificar", { method: "POST" }).catch(function () {});
    var intentos = 0;
    var timer = setInterval(function () {
      intentos += 1;
      fetch(window.CONEXION.api + "/api/clasificar")
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j.ocupado || intentos > 120) {
            clearInterval(timer);
            recargarBandeja(idSel);
          }
        })
        .catch(function () {
          clearInterval(timer);
          estado.clasificando = false;
          pintarFiltros(idSel);
        });
    }, 2500);
  }

  function recargarBandeja(idSel) {
    fetch(window.CONEXION.api + "/api/bandeja")
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && Array.isArray(j.correos)) {
          var leidos = {};
          estado.correos.forEach(function (c) { if (c.leido) leidos[c.gmailId || c.id] = 1; });
          j.correos.forEach(function (c) { if (leidos[c.gmailId || c.id]) c.leido = true; });
          estado.correos = j.correos;
        }
        estado.clasificando = false;
        pintarFiltros(idSel);
        pintarRegistro(idSel);
        actualizarNav(location.hash.indexOf("intereses") !== -1 ? "intereses" : "bandeja");
      })
      .catch(function () {
        estado.clasificando = false;
        pintarFiltros(idSel);
      });
  }

  /* Refresco suave: si el servidor clasificó por su cuenta (polling), la
     bandeja se actualiza sola al minuto, sin arrancarle el lector a nadie. */
  if (conectado()) {
    setInterval(function () {
      if (estado.clasificando) return;
      if (location.hash && location.hash.indexOf("#/bandeja/") === 0) return;
      fetch(window.CONEXION.api + "/api/bandeja")
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !Array.isArray(j.correos)) return;
          var firmaNueva = j.correos.map(function (c) { return c.gmailId || c.id; }).join(",");
          var firmaVieja = estado.correos.map(function (c) { return c.gmailId || c.id; }).join(",");
          if (firmaNueva !== firmaVieja) recargarBandeja(null);
        })
        .catch(function () {});
    }, 60000);
  }

  function pintarRegistro(idSel) {
    var cont = document.getElementById("registro");
    if (!cont) return;
    var lista = estado.correos.filter(coincide);

    if (!lista.length) {
      var q = estado.busqueda.trim();
      var mensaje;
      if (q) {
        mensaje = t("vacio.busqueda", { q: esc(q) });
      } else if (!estado.correos.length) {
        mensaje = t("vacio.sinDatos");
      } else {
        mensaje = estado.filtro === "AHORA" ? t("vacio.ahora") : t("vacio.sello");
      }
      cont.innerHTML = '<div class="vacio">' + mensaje + '</div>';
      return;
    }

    var html = "";
    var diaPrevio = null;
    lista.forEach(function (c) {
      if (c.dia !== diaPrevio) {
        diaPrevio = c.dia;
        html += '<div class="dia-rotulo">' + t(c.dia === "hoy" ? "dia.hoy" : "dia.ayer") + '</div>';
      }
      var s = SELLOS[c.veredicto];
      html +=
        '<button type="button" class="fila fila-' + s.clase +
          (c.leido ? "" : " no-leido") + (c.id === idSel ? " activa" : "") +
          '" data-id="' + c.id + '">' +
          '<span class="fila-arriba">' +
            '<span class="fila-quien">' + esc(campo(c, "quien")) + '</span>' +
            '<span class="etiqueta-mini mini-' + s.clase + '">' + esc(s.corto[lang]) + '</span>' +
          '</span>' +
          '<span class="fila-asunto">' + esc(campo(c, "asunto")) + '</span>' +
          '<span class="fila-razon"><span><b>' + t("porque.b") + '</b> ' + esc(razonDe(c)) + '</span>' +
          '<span class="fila-hora">' + esc(c.hora) + '</span></span>' +
        '</button>';
    });
    cont.innerHTML = html;

    cont.querySelectorAll(".fila").forEach(function (f) {
      f.addEventListener("click", function () {
        location.hash = "#/bandeja/" + f.getAttribute("data-id");
      });
    });
  }

  function pintarLector(c) {
    var cont = document.getElementById("lector");

    if (!c) {
      cont.innerHTML =
        '<div class="lector-vacio">' +
          '<span class="sello-fantasma" aria-hidden="true">' + t("lector.fantasma") + '</span>' +
          '<p>' + t("lector.vacio") + '</p>' +
        '</div>';
      return;
    }

    c.leido = true;
    var s = SELLOS[c.veredicto];
    var regla = c.regla
      ? estado.intereses.find(function (i) { return i.id === c.regla; })
      : null;

    var origen;
    if (c.corregido) {
      origen = t("origen.corregido");
    } else if (regla) {
      origen = t("origen.interes", { t: esc(textoInteres(regla)) }) +
        ' <a href="#/intereses">' + t("ver.intereses") + '</a>';
    } else if (c.regla) {
      origen = t("origen.borrado");
    } else {
      origen = t("origen.general");
    }

    var razon = razonDe(c);
    var razonBonita = razon.charAt(0).toUpperCase() + razon.slice(1);
    var busquedaGmail = encodeURIComponent('subject:"' + campo(c, "asunto") + '"');

    cont.innerHTML =
      '<button type="button" class="btn-volver" id="volver">' + t("volver") + '</button>' +
      '<article class="carta-detalle" aria-label="' + esc(t("lector.aria")) + '">' +
        '<span class="sello-marca estampa color-' + s.clase + '">' + esc(s.corto[lang]) + '</span>' +
        '<p class="detalle-de">' + esc(campo(c, "quien")) + ' &lt;' + esc(c.de) + '&gt; · ' +
          t(c.dia === "hoy" ? "dia.hoy.min" : "dia.ayer.min") + " " + esc(c.hora) + '</p>' +
        '<h2 class="detalle-asunto">' + esc(campo(c, "asunto")) + '</h2>' +
        '<div class="detalle-cuerpo">' +
          campo(c, "cuerpo").map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        '</div>' +
        '<div class="porque">' +
          '<h3>' + t("porque.h3") + '</h3>' +
          '<p>' + esc(razonBonita) + '.</p>' +
          '<p class="origen">' + origen + '</p>' +
        '</div>' +
        '<div class="acciones">' +
          '<span class="rotulo">' + t("corrigelo") + '</span>' +
          ["AHORA", "DESPUES", "NO"].map(function (v) {
            var sv = SELLOS[v];
            var actual = c.veredicto === v;
            return '<button type="button" class="boton-sello color-' + sv.clase +
              (actual ? " actual" : "") + '" data-v="' + v + '" aria-pressed="' + actual + '">' +
              esc(sv.largo[lang]) + '</button>';
          }).join("") +
          '<a class="enlace-gmail" target="_blank" rel="noopener" ' +
            'href="https://mail.google.com/mail/u/0/#search/' + busquedaGmail + '">' + t("gmail") + '</a>' +
        '</div>' +
      '</article>';

    document.getElementById("volver").addEventListener("click", function () {
      location.hash = "#/bandeja";
    });

    cont.querySelectorAll(".boton-sello").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-v");
        if (v === c.veredicto) return;
        c.veredicto = v;
        c.corregido = true;
        c.regla = null;
        if (c.gmailId) api("/api/sello", { gmailId: c.gmailId, veredicto: v }); /* re-etiqueta en Gmail */
        actualizarNav("bandeja");
        pintarFiltros(c.id);
        pintarRegistro(c.id);
        pintarLector(c); /* vuelve a estampar el sello */
      });
    });
  }

  /* ================= intereses ================= */
  function renderIntereses() {
    vista.innerHTML =
      '<header class="cab">' +
        '<h1>' + t("intereses.h1") + '</h1>' +
        '<span class="fecha">' + esc(semanaActual()) + '</span>' +
        '<span class="chip-demo">' + t(conectado() ? "chip.real.datos" : "chip.datos") + '</span>' +
      '</header>' +
      '<div class="intereses-grid">' +
        '<section class="ficha" aria-label="' + esc(t("ficha.aria")) + '">' +
          '<div class="ficha-cab"><h2>' + t("ficha.h2") + '</h2></div>' +
          '<p class="ficha-intro">' + t("ficha.intro") + '</p>' +
          '<div id="lista-intereses"></div>' +
          '<div class="ficha-acciones">' +
            '<button type="button" class="btn-anadir" id="anadir">' + t("anadir") + '</button>' +
            '<button type="button" class="btn-guardar" id="guardar">' + t("guardar") + '</button>' +
            '<span class="sello-marca sello-guardado" id="sello-guardado" hidden>' + t("guardado") + '</span>' +
          '</div>' +
          '<p class="nota-privada">' + t("nota.privada") + '</p>' +
        '</section>' +
        '<aside class="consejos">' +
          '<h3>' + t("consejos.h3") + '</h3>' +
          '<p>' + t("consejos.p") + '</p>' +
          '<p class="ejemplo">' + t("consejos.e1") + '</p>' +
          '<p class="ejemplo">' + t("consejos.e2") + '</p>' +
          '<p class="ejemplo">' + t("consejos.e3") + '</p>' +
          '<p>' + t("consejos.borra") + '</p>' +
        '</aside>' +
      '</div>';

    pintarIntereses();

    document.getElementById("anadir").addEventListener("click", function () {
      estado.intereses.push({ id: null, texto: "" });
      pintarIntereses();
      var campos = document.querySelectorAll(".interes-texto");
      if (campos.length) campos[campos.length - 1].focus();
    });

    document.getElementById("guardar").addEventListener("click", function () {
      estado.intereses = estado.intereses.filter(function (i) { return textoInteres(i).trim() !== ""; });
      estado.intereses.forEach(function (i) {
        i.texto = i.texto.trim();
        if (i.en != null) i.en = i.en.trim();
      });
      guardarIntereses();
      pintarIntereses();
      var sello = document.getElementById("sello-guardado");
      sello.hidden = false;
      sello.classList.remove("estampa");
      void sello.offsetWidth; /* reinicia la animación de estampado */
      sello.classList.add("estampa");
    });
  }

  function ocultarSelloGuardado() {
    var sello = document.getElementById("sello-guardado");
    if (sello) sello.hidden = true;
  }

  function pintarIntereses() {
    var cont = document.getElementById("lista-intereses");
    cont.innerHTML = "";

    if (!estado.intereses.length) {
      cont.innerHTML = '<div class="vacio">' + t("vacio.intereses") + '</div>';
      return;
    }

    estado.intereses.forEach(function (interes, idx) {
      var fila = document.createElement("div");
      fila.className = "interes-fila";

      var guion = document.createElement("span");
      guion.className = "guion";
      guion.setAttribute("aria-hidden", "true");
      guion.textContent = "—";

      var entrada = document.createElement("input");
      entrada.className = "interes-texto";
      entrada.type = "text";
      entrada.value = textoInteres(interes);
      entrada.placeholder = t("interes.ph");
      entrada.setAttribute("aria-label", t("interes.aria", { n: idx + 1 }));
      entrada.addEventListener("input", function () {
        /* en la demo bilingüe cada idioma edita su propia versión del texto */
        if (lang === "en" && interes.en != null) interes.en = entrada.value;
        else interes.texto = entrada.value;
        ocultarSelloGuardado();
      });

      var chip = document.createElement("span");
      chip.className = "impacto";
      var n = interes.id ? impacto(interes.id) : 0;
      if (n > 0) {
        chip.textContent = n === 1 ? t("impacto.uno") : t("impacto.varios", { n: n });
        chip.title = t("impacto.title");
      } else {
        chip.textContent = t("impacto.nuevo");
        chip.classList.add("nuevo");
      }

      var quitar = document.createElement("button");
      quitar.type = "button";
      quitar.className = "borrar";
      quitar.textContent = "×";
      quitar.setAttribute("aria-label", t("interes.quitar"));
      quitar.addEventListener("click", function () {
        estado.intereses.splice(estado.intereses.indexOf(interes), 1);
        pintarIntereses();
        ocultarSelloGuardado();
      });

      fila.append(guion, entrada, chip, quitar);
      cont.appendChild(fila);
    });
  }

  setLang(lang);
})();
