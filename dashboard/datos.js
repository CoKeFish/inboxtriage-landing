/* Estructura de datos del panel. Se llena SIEMPRE desde la app local
   (conexion.js -> /api/bandeja y /api/intereses). Sin app conectada, el panel
   redirige a la descarga: aquí no viven correos de ejemplo. */
window.DATOS = {
  intereses: [],
  correos: []
};
