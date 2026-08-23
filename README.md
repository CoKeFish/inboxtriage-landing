# InboxTriage — Landing

Landing de distribución y marketing para **InboxTriage** (Aleph Hackathon, agosto 2026 — sponsor Tether / QVAC), según RF-05 del PRD.

## Estructura

- `index.html` — landing principal: hero con triaje animado (el "sello"), caso canónico,
  las 3 cubetas con correos de ejemplo y CTA en *Responder ahora*, cómo decide (5 preguntas + policy),
  privacidad, requisitos + comando de clone, equipo.
- `dashboard.html` — dashboard de ejecución explicativo: flujo animado de los 8 pasos del pipeline
  con latencias, los 5 jueces con pesos, y log JSONL de QVAC reproducido.

Ambas páginas son autocontenidas (CSS/JS inline, sin build step). Única dependencia externa:
Google Fonts (Archivo, Public Sans, IBM Plex Mono) con fallbacks de sistema.

## Antes de publicar

Buscar `EDITAR:` en ambos archivos y reemplazar:

- la URL del repositorio de GitHub (`https://github.com/inboxtriage/inboxtriage` es placeholder),
- los nombres del equipo en la sección Equipo.

## Despliegue

Hosting estático en ISPConfig 3.3: copiar `index.html` y `dashboard.html` a la raíz del vhost.
Sin backend, sin build.

## Idiomas

`index.html` es bilingüe ES/EN: detecta el idioma del sistema (`navigator.language`),
con toggle ES/EN en el nav, persistencia en `localStorage` y override por URL (`?lang=en`).
El español vive en el HTML (fuente de verdad); el inglés, en el diccionario `EN` del script.
El dashboard permanece solo en español.

## Accesibilidad

Responsive hasta móvil, foco visible por teclado, y `prefers-reduced-motion` respetado
(las animaciones se sustituyen por el estado final estático).
