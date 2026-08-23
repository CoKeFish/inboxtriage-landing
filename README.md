# InboxTriage — Landing

Landing pública de **InboxTriage**, un agente de IA 100% local que organiza tu Gmail
en tres categorías (Responder ahora / Responder después / No responder) sin que ningún
correo salga de tu computador.

**En vivo:** https://inboxtriage.vercel.app

## Estructura

- `index.html` — landing orientada a cliente: hero con la clasificación animada,
  privacidad como propuesta principal, ejemplo de dos correos, la bandeja en tres
  categorías, y sección de descarga con los requisitos de máquina.

Página autocontenida (CSS/JS inline, sin build step). Única dependencia externa:
Google Fonts (Archivo, Public Sans, IBM Plex Mono) con fallbacks de sistema.

El dashboard técnico lo construye otro integrante del equipo y vive fuera de este
repo; la landing le deja un enlace placeholder.

## Idiomas

`index.html` es bilingüe ES/EN: detecta el idioma del sistema (`navigator.language`),
con toggle ES/EN en el nav, persistencia en `localStorage` y override por URL
(`?lang=en`). El español vive en el HTML (fuente de verdad); el inglés, en el
diccionario `EN` del script.

## Despliegue

Hosting estático en Vercel (proyecto `inboxtriage`). Para publicar cambios:

```bash
vercel deploy --prod
```

Sirve igual en cualquier hosting estático: basta copiar `index.html`.

## Pendiente

Ambos marcados con `EDITAR:` en `index.html`:

- El botón **Descargar** apunta a `#`; reemplazar por la URL real cuando exista
  un release descargable.
- El botón **Dashboard** apunta a `#`; reemplazar por la URL real cuando el
  dashboard esté publicado.

## Accesibilidad

Responsive hasta móvil, foco visible por teclado, y `prefers-reduced-motion` respetado
(las animaciones se sustituyen por el estado final estático).
