/* Datos de ejemplo del panel. Cuando exista el backend, este archivo
   se reemplaza por llamadas a la API — la forma de los objetos es el contrato. */
window.DATOS = {

  /* Intereses de la semana: lo que el usuario escribió como importante.
     `id` conecta cada interés con los correos que movió (campo `regla`). */
  intereses: [
    { id: "auditoria", texto: "Todo lo que mencione la auditoría va primero" },
    { id: "evento", texto: "El evento de graduación del viernes 29 de agosto" },
    { id: "catering", texto: "María Fernanda, la proveedora del catering" },
    { id: "informe", texto: "El informe trimestral que entrego el viernes" }
  ],

  /* Correos ya clasificados por el modelo local.
     veredicto: AHORA | DESPUES | NO · regla: id del interés que aplicó (o null = criterio general). */
  correos: [
    {
      id: 1, dia: "hoy", hora: "08:26", leido: false,
      quien: "Laura Peña", de: "l.pena@uni.edu",
      asunto: "¿Me cubres la reunión de las 11?",
      cuerpo: [
        "Hola, me acaba de surgir un cruce con la clínica y no llego a la reunión de coordinación de las 11.",
        "¿Puedes cubrirme tú? Solo hay que presentar el avance que ya viste el lunes. Avísame antes de las 10 para confirmar con el equipo."
      ],
      veredicto: "AHORA", regla: null,
      razon: "te hacen una pregunta directa y es para hoy"
    },
    {
      id: 2, dia: "hoy", hora: "08:12", leido: false,
      quien: "María Fernanda — Catering", de: "catering@banquetesmf.mx",
      asunto: "¿Confirmamos montaje mañana?",
      cuerpo: [
        "Buen día. Para cerrar el pedido de mañana necesitamos el número final de invitados: ¿quedamos en 80 o en 120?",
        "Con ese dato confirmo el montaje a primera hora. Si no recibimos respuesta hoy, el proveedor de mobiliario ya no garantiza la entrega."
      ],
      veredicto: "AHORA", regla: "catering",
      razon: "te pregunta algo y es para mañana"
    },
    {
      id: 3, dia: "hoy", hora: "07:58", leido: false,
      quien: "Vicerrectoría", de: "vicerrectoria@uni.edu",
      asunto: "Firma pendiente: acta de auditoría",
      cuerpo: [
        "Estimada profesora: el acta de cierre de la auditoría interna quedó lista y solo falta su firma.",
        "El plazo del comité vence hoy a las 15:00. Puede pasar por la oficina o firmarla en el sistema documental."
      ],
      veredicto: "AHORA", regla: "auditoria",
      razon: "tu criterio: si menciona auditoría, va primero"
    },
    {
      id: 4, dia: "hoy", hora: "07:31", leido: false,
      quien: "Dirección de Eventos", de: "direccion.eventos@uni.edu",
      asunto: "Informe trimestral — recordatorio",
      cuerpo: [
        "Te recuerdo que el informe trimestral del área se entrega este viernes antes del mediodía.",
        "Puedes usar la plantilla del trimestre pasado; solo cambió la sección de presupuesto."
      ],
      veredicto: "DESPUES", regla: "informe",
      razon: "es para el viernes — puede esperar a la tarde"
    },
    {
      id: 5, dia: "hoy", hora: "07:12", leido: false,
      quien: "Dirección General", de: "comunicacion@uni.edu",
      asunto: "Comunicado mensual de bienestar",
      cuerpo: [
        "Adjuntamos el comunicado de bienestar del mes, con las actividades de pausas activas y el calendario de vacunación.",
        "Los invitamos a leerlo con calma y compartirlo con sus equipos."
      ],
      veredicto: "NO", regla: null,
      razon: "aviso general — nadie espera tu respuesta"
    },
    {
      id: 6, dia: "hoy", hora: "06:50", leido: false,
      quien: "Comité de Posgrado", de: "posgrado@uni.edu",
      asunto: "Revisión del calendario de defensas",
      cuerpo: [
        "Compartimos la propuesta de calendario de defensas del semestre para su revisión.",
        "Agradecemos comentarios a más tardar el jueves, antes de publicarlo a los estudiantes."
      ],
      veredicto: "DESPUES", regla: null,
      razon: "piden tu opinión, con plazo hasta el jueves"
    },
    {
      id: 7, dia: "hoy", hora: "06:02", leido: true,
      quien: "Banco Nacional", de: "avisos@banconacional.com",
      asunto: "Tu estado de cuenta ya está disponible",
      cuerpo: [
        "Tu estado de cuenta del mes ya puede consultarse desde la aplicación o la banca en línea.",
        "Este es un mensaje automático; por favor no respondas a este correo."
      ],
      veredicto: "NO", regla: null,
      razon: "notificación automática — no hay nada que responder"
    },
    {
      id: 8, dia: "ayer", hora: "22:37", leido: true,
      quien: "SoftwareDeals", de: "ofertas@softwaredeals.com",
      asunto: "¡ÚLTIMAS HORAS! 40% de descuento",
      cuerpo: [
        "¡Solo por hoy! Renueva tus licencias con un 40% de descuento usando el código FINAL40.",
        "No dejes pasar esta oportunidad única. La oferta termina a medianoche."
      ],
      veredicto: "NO", regla: null,
      razon: "que grite urgencia no lo hace urgente — es promoción masiva"
    },
    {
      id: 9, dia: "ayer", hora: "19:44", leido: true,
      quien: "Julián Torres — Alumno", de: "j.torres@correo.uni.edu",
      asunto: "Solicitud de carta de recomendación",
      cuerpo: [
        "Profesora, estoy aplicando a la maestría en gestión cultural y me gustaría pedirle una carta de recomendación.",
        "La convocatoria cierra a fin de mes, así que hay tiempo. Puedo enviarle mi expediente y una propuesta de borrador si le sirve."
      ],
      veredicto: "DESPUES", regla: null,
      razon: "te piden algo, pero sin fecha límite cercana"
    },
    {
      id: 10, dia: "ayer", hora: "17:05", leido: true,
      quien: "Florería El Jardín", de: "pedidos@floreriaeljardin.mx",
      asunto: "Cotización de centros de mesa",
      cuerpo: [
        "Le enviamos la cotización de los centros de mesa para el evento del viernes 29: tres opciones según presupuesto.",
        "Cualquiera de las tres se confirma con 48 horas de anticipación, así que tiene hasta el miércoles para decidir."
      ],
      veredicto: "DESPUES", regla: "evento",
      razon: "es del evento del 29, pero no vence hoy"
    },
    {
      id: 11, dia: "ayer", hora: "16:20", leido: true,
      quien: "Comunicaciones", de: "comunicaciones@uni.edu",
      asunto: "FYI: fotos del evento pasado",
      cuerpo: [
        "Ya están disponibles las fotografías del encuentro de egresados en la carpeta compartida del área.",
        "Se comparten solo para su conocimiento y archivo."
      ],
      veredicto: "NO", regla: null,
      razon: "solo información — no hay pregunta para ti"
    },
    {
      id: 12, dia: "ayer", hora: "15:11", leido: true,
      quien: "Soporte TI", de: "soporte@uni.edu",
      asunto: "Mantenimiento programado el domingo",
      cuerpo: [
        "El domingo entre las 02:00 y las 06:00 habrá mantenimiento en los servidores institucionales.",
        "Durante esa ventana el correo y el sistema documental podrían presentar intermitencias. No se requiere ninguna acción."
      ],
      veredicto: "NO", regla: null,
      razon: "aviso general — no se requiere acción tuya"
    }
  ]
};
