/* Datos de ejemplo del panel. Cuando exista el backend, este archivo
   se reemplaza por llamadas a la API — la forma de los objetos es el contrato.
   El bloque `en` de cada objeto es solo para la demo bilingüe: la API real
   entregará los textos en un solo idioma. */
window.DATOS = {

  /* Intereses de la semana: lo que el usuario escribió como importante.
     `id` conecta cada interés con los correos que movió (campo `regla`). */
  intereses: [
    { id: "auditoria", texto: "Todo lo que mencione la auditoría va primero",
      en: "Anything that mentions the audit goes first" },
    { id: "evento", texto: "El evento de graduación del viernes 29 de agosto",
      en: "The graduation event on Friday, August 29" },
    { id: "catering", texto: "María Fernanda, la proveedora del catering",
      en: "María Fernanda, the catering vendor" },
    { id: "informe", texto: "El informe trimestral que entrego el viernes",
      en: "The quarterly report I submit on Friday" }
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
      razon: "te hacen una pregunta directa y es para hoy",
      en: {
        asunto: "Can you cover the 11 o'clock meeting?",
        cuerpo: [
          "Hi — a clinic appointment just came up and I can't make the 11 o'clock coordination meeting.",
          "Could you cover for me? It's just presenting the progress update you saw on Monday. Let me know before 10 so I can confirm with the team."
        ],
        razon: "they ask you something directly and it's for today"
      }
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
      razon: "te pregunta algo y es para mañana",
      en: {
        quien: "María Fernanda — Catering",
        asunto: "Confirming setup for tomorrow?",
        cuerpo: [
          "Good morning. To close tomorrow's order we need the final guest count: is it 80 or 120?",
          "With that number I'll confirm the setup first thing. If we don't hear back today, the furniture supplier can no longer guarantee delivery."
        ],
        razon: "she asks you something and it's for tomorrow"
      }
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
      razon: "tu criterio: si menciona auditoría, va primero",
      en: {
        quien: "Vice-rector's Office",
        asunto: "Signature pending: audit report",
        cuerpo: [
          "Dear professor: the internal audit closing report is ready and only your signature is missing.",
          "The committee's deadline is today at 3:00 pm. You can stop by the office or sign it in the document system."
        ],
        razon: "your rule: if it mentions the audit, it goes first"
      }
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
      razon: "es para el viernes — puede esperar a la tarde",
      en: {
        quien: "Events Office",
        asunto: "Quarterly report — reminder",
        cuerpo: [
          "A reminder that the quarterly report is due this Friday before noon.",
          "You can use last quarter's template; only the budget section changed."
        ],
        razon: "it's due Friday — it can wait until the afternoon"
      }
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
      razon: "aviso general — nadie espera tu respuesta",
      en: {
        quien: "General Management",
        asunto: "Monthly wellness bulletin",
        cuerpo: [
          "Attached is this month's wellness bulletin, with active-break activities and the vaccination calendar.",
          "We invite you to read it at your leisure and share it with your teams."
        ],
        razon: "general announcement — nobody is waiting for your reply"
      }
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
      razon: "piden tu opinión, con plazo hasta el jueves",
      en: {
        quien: "Graduate Committee",
        asunto: "Thesis defense calendar review",
        cuerpo: [
          "We are sharing the proposed defense calendar for the semester for your review.",
          "Comments are welcome until Thursday, before we publish it to students."
        ],
        razon: "they ask for your opinion, due Thursday"
      }
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
      razon: "notificación automática — no hay nada que responder",
      en: {
        asunto: "Your account statement is ready",
        cuerpo: [
          "Your monthly account statement is now available in the app and in online banking.",
          "This is an automatic message; please do not reply."
        ],
        razon: "automatic notification — there is nothing to answer"
      }
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
      razon: "que grite urgencia no lo hace urgente — es promoción masiva",
      en: {
        asunto: "LAST HOURS! 40% off",
        cuerpo: [
          "Today only! Renew your licenses at 40% off with code FINAL40.",
          "Don't miss this one-time opportunity. The offer ends at midnight."
        ],
        razon: "shouting urgency doesn't make it urgent — it's a bulk promotion"
      }
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
      razon: "te piden algo, pero sin fecha límite cercana",
      en: {
        quien: "Julián Torres — Student",
        asunto: "Recommendation letter request",
        cuerpo: [
          "Professor, I am applying to the master's in cultural management and would like to ask you for a recommendation letter.",
          "The call closes at the end of the month, so there is time. I can send you my transcript and a draft if it helps."
        ],
        razon: "a request, but with no close deadline"
      }
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
      razon: "es del evento del 29, pero no vence hoy",
      en: {
        asunto: "Quote for table centerpieces",
        cuerpo: [
          "Here is the quote for the centerpieces for the event on Friday the 29th: three options by budget.",
          "Any of the three can be confirmed with 48 hours' notice, so you have until Wednesday to decide."
        ],
        razon: "it's about the event on the 29th, but it isn't due today"
      }
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
      razon: "solo información — no hay pregunta para ti",
      en: {
        quien: "Communications Office",
        asunto: "FYI: photos from the last event",
        cuerpo: [
          "The photos from the alumni gathering are now available in the shared folder.",
          "Shared for your information and records."
        ],
        razon: "just information — there is no question for you"
      }
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
      razon: "aviso general — no se requiere acción tuya",
      en: {
        quien: "IT Support",
        asunto: "Scheduled maintenance on Sunday",
        cuerpo: [
          "On Sunday between 2:00 and 6:00 am there will be maintenance on the institutional servers.",
          "Email and the document system may be intermittent during that window. No action is required."
        ],
        razon: "general notice — no action needed from you"
      }
    }
  ]
};
