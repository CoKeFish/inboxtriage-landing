/* Panel de InboxTriage. Frontend puro sobre los datos de ejemplo de datos.js:
   la bandeja se navega con rutas de hash (#/bandeja, #/bandeja/3, #/intereses),
   los intereses persisten en localStorage y las correcciones de sello viven en memoria. */
(function () {
  "use strict";

  var SELLOS = {
    AHORA:   { corto: "Ahora",     largo: "Responder ahora",   clase: "ahora" },
    DESPUES: { corto: "Después",   largo: "Responder después", clase: "despues" },
    NO:      { corto: "Sin resp.", largo: "Sin respuesta",     clase: "no" }
  };

  var vista = document.getElementById("vista");

  var estado = {
    filtro: "TODOS",
    busqueda: "",
    correos: window.DATOS.correos,
    intereses: cargarIntereses()
  };

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- intereses: carga y guardado local ---------- */
  function cargarIntereses() {
    try {
      var guardado = localStorage.getItem("it-intereses");
      if (guardado) {
        var lista = JSON.parse(guardado);
        if (Array.isArray(lista)) return lista;
      }
    } catch (e) {}
    return window.DATOS.intereses.map(function (i) { return { id: i.id, texto: i.texto }; });
  }

  function guardarIntereses() {
    try { localStorage.setItem("it-intereses", JSON.stringify(estado.intereses)); } catch (e) {}
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
    if (estado.filtro !== "TODOS" && c.veredicto !== estado.filtro) return false;
    var q = estado.busqueda.trim().toLowerCase();
    if (!q) return true;
    var pajar = (c.quien + " " + c.de + " " + c.asunto + " " + c.cuerpo.join(" ")).toLowerCase();
    return pajar.indexOf(q) !== -1;
  }

  /* ---------- fechas ---------- */
  function fechaHoy() {
    var f = new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });
    return f.charAt(0).toUpperCase() + f.slice(1);
  }

  function semanaActual() {
    var hoy = new Date();
    var lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
    var domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);
    var mesL = lunes.toLocaleDateString("es", { month: "long" });
    var mesD = domingo.toLocaleDateString("es", { month: "long" });
    return "Semana del " + lunes.getDate() + (mesL === mesD ? "" : " de " + mesL) +
      " al " + domingo.getDate() + " de " + mesD;
  }

  /* ---------- riel ---------- */
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
        '<h1>Bandeja</h1>' +
        '<span class="fecha">' + esc(fechaHoy()) + '</span>' +
        '<span class="chip-demo">Demo · correos de ejemplo</span>' +
      '</header>' +
      '<div class="panel' + (correo ? " con-detalle" : "") + '">' +
        '<div class="registro-zona">' +
          '<div class="controles">' +
            '<input class="busqueda" id="busqueda" type="search" placeholder="Buscar remitente, asunto o texto…" aria-label="Buscar correo">' +
            '<div class="filtros" role="group" aria-label="Filtrar por sello" id="filtros"></div>' +
          '</div>' +
          '<div class="registro" id="registro" aria-label="Correos clasificados"></div>' +
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
    var defs = [
      { f: "TODOS", nombre: "Todos", n: estado.correos.length },
      { f: "AHORA", nombre: SELLOS.AHORA.largo, n: contarPorSello("AHORA") },
      { f: "DESPUES", nombre: SELLOS.DESPUES.largo, n: contarPorSello("DESPUES") },
      { f: "NO", nombre: SELLOS.NO.largo, n: contarPorSello("NO") }
    ];
    cont.innerHTML = defs.map(function (d) {
      return '<button type="button" class="chip-filtro' + (estado.filtro === d.f ? " activo" : "") +
        '" data-f="' + d.f + '">' + esc(d.nombre) + ' <b>' + d.n + '</b></button>';
    }).join("");
    cont.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        estado.filtro = b.getAttribute("data-f");
        pintarFiltros(idSel);
        pintarRegistro(idSel);
      });
    });
  }

  function pintarRegistro(idSel) {
    var cont = document.getElementById("registro");
    var lista = estado.correos.filter(coincide);

    if (!lista.length) {
      var q = estado.busqueda.trim();
      var mensaje = q
        ? "Ningún correo coincide con «" + esc(q) + "»."
        : (estado.filtro === "AHORA"
            ? "Nada urgente esperando respuesta. Buena señal."
            : "Nada con este sello por ahora.");
      cont.innerHTML = '<div class="vacio">' + mensaje + '</div>';
      return;
    }

    var html = "";
    var diaPrevio = null;
    lista.forEach(function (c) {
      if (c.dia !== diaPrevio) {
        diaPrevio = c.dia;
        html += '<div class="dia-rotulo">' + (c.dia === "hoy" ? "Hoy" : "Ayer") + '</div>';
      }
      var s = SELLOS[c.veredicto];
      html +=
        '<button type="button" class="fila fila-' + s.clase +
          (c.leido ? "" : " no-leido") + (c.id === idSel ? " activa" : "") +
          '" data-id="' + c.id + '">' +
          '<span class="fila-arriba">' +
            '<span class="fila-quien">' + esc(c.quien) + '</span>' +
            '<span class="etiqueta-mini mini-' + s.clase + '">' + esc(s.corto) + '</span>' +
          '</span>' +
          '<span class="fila-asunto">' + esc(c.asunto) + '</span>' +
          '<span class="fila-razon"><span><b>por qué:</b> ' + esc(c.razon) + '</span>' +
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
          '<span class="sello-fantasma" aria-hidden="true">Revisar</span>' +
          '<p>Elige un correo del registro para leerlo y revisar su sello.</p>' +
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
      origen = "InboxTriage tendrá en cuenta esta corrección en el próximo triaje.";
    } else if (regla) {
      origen = 'Coincide con tu interés: «' + esc(regla.texto) + '». <a href="#/intereses">Ver tus intereses →</a>';
    } else if (c.regla) {
      origen = "Venía de uno de tus intereses de esta semana.";
    } else {
      origen = "Criterio general: se fija en si te preguntan algo y para cuándo.";
    }

    var razonBonita = c.razon.charAt(0).toUpperCase() + c.razon.slice(1);
    var busquedaGmail = encodeURIComponent('subject:"' + c.asunto + '"');

    cont.innerHTML =
      '<button type="button" class="btn-volver" id="volver">← Volver a la bandeja</button>' +
      '<article class="carta-detalle" aria-label="Correo seleccionado">' +
        '<span class="sello-marca estampa color-' + s.clase + '">' + esc(s.corto) + '</span>' +
        '<p class="detalle-de">' + esc(c.quien) + ' &lt;' + esc(c.de) + '&gt; · ' +
          (c.dia === "hoy" ? "hoy" : "ayer") + " " + esc(c.hora) + '</p>' +
        '<h2 class="detalle-asunto">' + esc(c.asunto) + '</h2>' +
        '<div class="detalle-cuerpo">' +
          c.cuerpo.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        '</div>' +
        '<div class="porque">' +
          '<h3>Por qué este sello</h3>' +
          '<p>' + esc(razonBonita) + '.</p>' +
          '<p class="origen">' + origen + '</p>' +
        '</div>' +
        '<div class="acciones">' +
          '<span class="rotulo">¿Sello equivocado? Corrígelo</span>' +
          ["AHORA", "DESPUES", "NO"].map(function (v) {
            var sv = SELLOS[v];
            var actual = c.veredicto === v;
            return '<button type="button" class="boton-sello color-' + sv.clase +
              (actual ? " actual" : "") + '" data-v="' + v + '" aria-pressed="' + actual + '">' +
              esc(sv.largo) + '</button>';
          }).join("") +
          '<a class="enlace-gmail" target="_blank" rel="noopener" ' +
            'href="https://mail.google.com/mail/u/0/#search/' + busquedaGmail + '">Abrir en Gmail</a>' +
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
        c.razon = "corregido por ti";
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
        '<h1>Tus intereses</h1>' +
        '<span class="fecha">' + esc(semanaActual()) + '</span>' +
        '<span class="chip-demo">Demo · datos de ejemplo</span>' +
      '</header>' +
      '<div class="intereses-grid">' +
        '<section class="ficha" aria-label="Tu criterio de la semana">' +
          '<div class="ficha-cab"><h2>Qué es importante esta semana</h2></div>' +
          '<p class="ficha-intro">InboxTriage usa esta lista para decidir qué correo va primero. ' +
            'Escríbelo como se lo dirías a una persona: un evento, una entrega, ciertas personas.</p>' +
          '<div id="lista-intereses"></div>' +
          '<div class="ficha-acciones">' +
            '<button type="button" class="btn-anadir" id="anadir">+ Añadir un interés</button>' +
            '<button type="button" class="btn-guardar" id="guardar">Guardar mi criterio</button>' +
            '<span class="sello-marca sello-guardado" id="sello-guardado" hidden>Guardado</span>' +
          '</div>' +
          '<p class="nota-privada">Se guarda solo en tu computador. Nada de esto sale a internet.</p>' +
        '</section>' +
        '<aside class="consejos">' +
          '<h3>¿Cómo escribirlos?</h3>' +
          '<p>Funciona mejor con frases concretas:</p>' +
          '<p class="ejemplo">«El evento de graduación del viernes 29»</p>' +
          '<p class="ejemplo">«Todo lo que mencione la auditoría va primero»</p>' +
          '<p class="ejemplo">«María, la proveedora del catering»</p>' +
          '<p>Y bórralos cuando dejen de importar: la próxima semana tu bandeja se ordena distinto.</p>' +
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
      estado.intereses = estado.intereses.filter(function (i) { return i.texto.trim() !== ""; });
      estado.intereses.forEach(function (i) { i.texto = i.texto.trim(); });
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
      cont.innerHTML = '<div class="vacio">Tu lista está vacía. Sin criterio propio, ' +
        'InboxTriage ordena solo con el criterio general.</div>';
      return;
    }

    estado.intereses.forEach(function (interes, idx) {
      var fila = document.createElement("div");
      fila.className = "interes-fila";

      var guion = document.createElement("span");
      guion.className = "guion";
      guion.setAttribute("aria-hidden", "true");
      guion.textContent = "—";

      var campo = document.createElement("input");
      campo.className = "interes-texto";
      campo.type = "text";
      campo.value = interes.texto;
      campo.placeholder = "Escribe qué es importante…";
      campo.setAttribute("aria-label", "Interés " + (idx + 1));
      campo.addEventListener("input", function () {
        interes.texto = campo.value;
        ocultarSelloGuardado();
      });

      var chip = document.createElement("span");
      chip.className = "impacto";
      var n = interes.id ? impacto(interes.id) : 0;
      if (n > 0) {
        chip.textContent = n === 1 ? "movió 1 correo" : "movió " + n + " correos";
        chip.title = "Correos que este interés colocó en su bandeja esta semana";
      } else {
        chip.textContent = "desde el próximo triaje";
        chip.classList.add("nuevo");
      }

      var quitar = document.createElement("button");
      quitar.type = "button";
      quitar.className = "borrar";
      quitar.textContent = "×";
      quitar.setAttribute("aria-label", "Quitar este interés");
      quitar.addEventListener("click", function () {
        estado.intereses.splice(estado.intereses.indexOf(interes), 1);
        pintarIntereses();
        ocultarSelloGuardado();
      });

      fila.append(guion, campo, chip, quitar);
      cont.appendChild(fila);
    });
  }

  render();
})();
