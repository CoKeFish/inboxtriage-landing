# InboxTriage — Panel (dashboard)

Panel web de InboxTriage: muestra la bandeja ya clasificada por el modelo local
(**Responder ahora / Responder después / Sin respuesta**), permite leer cada correo,
corregir su sello y escribir los **intereses de la semana** que guían el triaje.

**Estado: solo frontend con datos de ejemplo.** No hay backend todavía:

- Los correos y su clasificación viven en [`datos.js`](datos.js). La forma de esos
  objetos es el contrato pensado para la futura API.
- Los intereses se guardan en `localStorage` del navegador.
- Las correcciones de sello viven en memoria (se pierden al recargar).

Sin build, sin framework: HTML + CSS + JS planos, igual que la landing.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Cascarón: riel de navegación + contenedor de vistas |
| `estilo.css` | Sistema visual (mismos tokens de la landing) |
| `datos.js` | Correos e intereses de ejemplo (mock de la API) |
| `app.js` | Rutas por hash, bandeja, lector e intereses |

Rutas: `#/bandeja`, `#/bandeja/<id>` (correo abierto), `#/intereses`.

## Correr en local

```bash
cd dashboard
npm install
npm run dev        # sirve en http://localhost:3000
```

(o cualquier servidor estático: `npx serve dashboard`)

## Desplegar en Railway

1. New Project → **Deploy from GitHub repo** → elegir este repositorio.
2. En **Settings → Root Directory** poner `dashboard`.
3. Nada más: Railway detecta Node por el `package.json` y arranca con
   `npm start`, que sirve los archivos estáticos en el puerto `$PORT`.
4. **Settings → Networking → Generate Domain** para obtener la URL pública.

Esa URL es la que va en los enlaces "Dashboard" de la landing
(los `EDITAR:` marcados en `index.html` de la raíz).
