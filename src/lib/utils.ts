import { clsx, type ClassValue } from "clsx"
import { id } from "date-fns/locale"
import { twMerge } from "tailwind-merge"
import { ApiResponseActivities } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const gerency = [
  {
    id: 1,
    name: "defender",
    label: "Gerencia de la defensoría nacional de los derechos de la mujer",
  },
  {
    id: 2,
    name: "regional",
    label: "Gerencia de desarrollo alternativo y política regional ",
  },
  {
    id: 3,
    name: "prevention",
    label: "Gerencia de atención integral y prevención de la violencia contra las mujeres",
  },
  {
    id: 4,
    name: "research",
    label: "Gerencia de investigación y capacitación ",
  },
  {
    id: 5,
    name: "oac",
    label: "Gerencia de oficina de atención a la ciudadania",
  }
]

export const actionsOptions = [
  {
    id: 1,
    name: "legalAttention",
    label: "Atención jurídica",
  },
  {
    id: 2,
    name: "prevention",
    label: "Prevención",
  },
  {
    id: 3,
    name: "training",
    label: "Formación",
  },
  {
    id: 4,
    name: "oac",
    label: "OAC",
  },
]

export const activities = [
  {
    "Atención jurídica": [
      {
        id: 1,
        name: "legal advice",
        label: "Asesoría legal",
      },
      {
        id: 2,
        name: "mobile ombudsman",
        label: "Defensoría móvil",
      },
      {
        id: 3,
        name: "gender justice",
        label: "Mesa técnica de justicia de género",
      },
      {
        id: 4,
        name: "representation in court cases",
        label: "Repesentación en causas judiciales",
      },
      {
        id: 5,
        name: "victimOfTrafficking",
        label: "Victima de trata",
      },
      {
        id: 6,
        name: "femicide",
        label: "Violencia de genero",
      },
      {
        id: 7,
        name: "procedural action",
        label: "Actuación procesal",
      },
    ],
    "Prevención": [
      {
        id: 8,
        name: "psicolocial attention",
        label: "Atención psicológica",
      },
      {
        id: 9,
        name: "ginecoloical attention",
        label: "Atención ginecológica",
      },
      {
        id: 10,
        name: "house to house",
        label: "Casa por casa",
      },
      {
        id: 11,
        name: "conversation",
        label: "Conversatorio",
      },
      {
        id: 12,
        name: "violet Dot",
        label: "Punto violeta",
      },

      {
        id: 13,
        name: "space Intake",
        label: "Toma de espacio",
      },
      {
        id: 14,
        name: "preventive dynamics",
        label: "Dinámicas preventivas",
      },
      {
        id: 15,
        name: "cinema Forum",
        label: "Cine foro"
      },

      {
        id: 16,
        name: "telephone service",
        label: "Atención telefónica",
      },



    ],
    "Formación": [
      {
        id: 17,
        name: "community defenders",
        label: "Defensoras comunales comunitarias",
      },
      {
        id: 18,
        name: "communal labor defenders",
        label: "Defensoras comunales laborales"
      },
      {
        id: 19,
        name: "youth community defenders",
        label: "Defensoras comunales juveniles"
      }
    ],
    "OAC": [
      {
        id: 0,
        name: "not activity",
        label: "Sin actividad"
      }
    ]
  }
]

export const places = [
  {
    id: 1,
    name: "MINMUJER headquarters",
    label: "Sede MINMUJER",
  },
  {
    id: 2,
    name: "CAFIM",
    label: "CAFIM",
  },
  {
    id: 3,
    name: "UAIM",
    label: "UAIM",
  },
  {
    id: 4,
    name: "community",
    label: "Comunidad",
  },
  {
    id: 5,
    name: "public ministry",
    label: "Ministerio público",
  },
  {
    id: 6,
    name: "TSJ",
    label: "TSJ",
  },
  {
    id: 7,
    name: "justice palace",
    label: "Palacio de justicia",
  },
  {
    id: 8,
    name: "hospital",
    label: "Hospital",
  },
  {
    id: 9,
    name: "ambulatory",
    label: "Ambulatorio",
  },
  {
    id: 10,
    name: "CDI",
    label: "CDI",
  },
  {
    id: 11,
    name: "mission base",
    label: "Base de misiones",
  },
  {
    id: 12,
    name: "educational Unit",
    label: "Unidad educativa",
  },
  {
    id: 13,
    name: "university",
    label: "Universidad",
  },
  {
    id: 14,
    name: "others",
    label: "Otros",
  }
]

export const countries = [
  { id: 1, country: "Afganistán" },
  { id: 2, country: "Islas Gland" },
  { id: 3, country: "Albania" },
  { id: 4, country: "Alemania" },
  { id: 5, country: "Andorra" },
  { id: 6, country: "Angola" },
  { id: 7, country: "Anguilla" },
  { id: 8, country: "Antártida" },
  { id: 9, country: "Antigua y Barbuda" },
  { id: 10, country: "Antillas Holandesas" },
  { id: 11, country: "Arabia Saudí" },
  { id: 12, country: "Argelia" },
  { id: 13, country: "Argentina" },
  { id: 14, country: "Armenia" },
  { id: 15, country: "Aruba" },
  { id: 16, country: "Australia" },
  { id: 17, country: "Austria" },
  { id: 18, country: "Azerbaiyán" },
  { id: 19, country: "Bahamas" },
  { id: 20, country: "Bahréin" },
  { id: 21, country: "Bangladesh" },
  { id: 22, country: "Barbados" },
  { id: 23, country: "Bielorrusia" },
  { id: 24, country: "Bélgica" },
  { id: 25, country: "Belice" },
  { id: 26, country: "Benin" },
  { id: 27, country: "Bermudas" },
  { id: 28, country: "Bhután" },
  { id: 29, country: "Bolivia" },
  { id: 30, country: "Bosnia y Herzegovina" },
  { id: 31, country: "Botsuana" },
  { id: 32, country: "Isla Bouvet" },
  { id: 33, country: "Brasil" },
  { id: 34, country: "Brunéi" },
  { id: 35, country: "Bulgaria" },
  { id: 36, country: "Burkina Faso" },
  { id: 37, country: "Burundi" },
  { id: 38, country: "Cabo Verde" },
  { id: 39, country: "Islas Caimán" },
  { id: 40, country: "Camboya" },
  { id: 41, country: "Camerún" },
  { id: 42, country: "Canadá" },
  { id: 43, country: "República Centroafricana" },
  { id: 44, country: "Chad" },
  { id: 45, country: "República Checa" },
  { id: 46, country: "Chile" },
  { id: 47, country: "China" },
  { id: 48, country: "Chipre" },
  { id: 49, country: "Isla de Navidad" },
  { id: 50, country: "Ciudad del Vaticano" },
  { id: 51, country: "Islas Cocos" },
  { id: 52, country: "Colombia" },
  { id: 53, country: "Comoras" },
  { id: 54, country: "República Democrática del Congo" },
  { id: 55, country: "Congo" },
  { id: 56, country: "Islas Cook" },
  { id: 57, country: "Corea del Norte" },
  { id: 58, country: "Corea del Sur" },
  { id: 59, country: "Costa de Marfil" },
  { id: 60, country: "Costa Rica" },
  { id: 61, country: "Croacia" },
  { id: 62, country: "Cuba" },
  { id: 63, country: "Dinamarca" },
  { id: 64, country: "Dominica" },
  { id: 65, country: "República Dominicana" },
  { id: 66, country: "Ecuador" },
  { id: 67, country: "Egipto" },
  { id: 68, country: "El Salvador" },
  { id: 69, country: "Emiratos Árabes Unidos" },
  { id: 70, country: "Eritrea" },
  { id: 71, country: "Eslovaquia" },
  { id: 72, country: "Eslovenia" },
  { id: 73, country: "España" },
  { id: 74, country: "Islas ultramarinas de Estados Unidos" },
  { id: 75, country: "Estados Unidos" },
  { id: 76, country: "Estonia" },
  { id: 77, country: "Etiopía" },
  { id: 78, country: "Islas Feroe" },
  { id: 79, country: "Filipinas" },
  { id: 80, country: "Finlandia" },
  { id: 81, country: "Fiyi" },
  { id: 82, country: "Francia" },
  { id: 83, country: "Gabón" },
  { id: 84, country: "Gambia" },
  { id: 85, country: "Georgia" },
  { id: 86, country: "Islas Georgias del Sur y Sandwich del Sur" },
  { id: 87, country: "Ghana" },
  { id: 88, country: "Gibraltar" },
  { id: 89, country: "Granada" },
  { id: 90, country: "Grecia" },
  { id: 91, country: "Groenlandia" },
  { id: 92, country: "Guadalupe" },
  { id: 93, country: "Guam" },
  { id: 94, country: "Guatemala" },
  { id: 95, country: "Guayana Francesa" },
  { id: 96, country: "Guinea" },
  { id: 97, country: "Guinea Ecuatorial" },
  { id: 98, country: "Guinea-Bissau" },
  { id: 99, country: "Guyana" },
  { id: 100, country: "Haití" },
  { id: 101, country: "Islas Heard y McDonald" },
  { id: 102, country: "Honduras" },
  { id: 103, country: "Hong Kong" },
  { id: 104, country: "Hungría" },
  { id: 105, country: "India" },
  { id: 106, country: "Indonesia" },
  { id: 107, country: "Irán" },
  { id: 108, country: "Iraq" },
  { id: 109, country: "Irlanda" },
  { id: 110, country: "Islandia" },
  { id: 111, country: "Israel" },
  { id: 112, country: "Italia" },
  { id: 113, country: "Jamaica" },
  { id: 114, country: "Japón" },
  { id: 115, country: "Jordania" },
  { id: 116, country: "Kazajstán" },
  { id: 117, country: "Kenia" },
  { id: 118, country: "Kirguistán" },
  { id: 119, country: "Kiribati" },
  { id: 120, country: "Kuwait" },
  { id: 121, country: "Laos" },
  { id: 122, country: "Lesotho" },
  { id: 123, country: "Letonia" },
  { id: 124, country: "Líbano" },
  { id: 125, country: "Liberia" },
  { id: 126, country: "Libia" },
  { id: 127, country: "Liechtenstein" },
  { id: 128, country: "Lituania" },
  { id: 129, country: "Luxemburgo" },
  { id: 130, country: "Macao" },
  { id: 131, country: "ARY Macedonia" },
  { id: 132, country: "Madagascar" },
  { id: 133, country: "Malasia" },
  { id: 134, country: "Malawi" },
  { id: 135, country: "Maldivas" },
  { id: 136, country: "Malí" },
  { id: 137, country: "Malta" },
  { id: 138, country: "Islas Malvinas" },
  { id: 139, country: "Islas Marianas del Norte" },
  { id: 140, country: "Marruecos" },
  { id: 141, country: "Islas Marshall" },
  { id: 142, country: "Martinica" },
  { id: 143, country: "Mauricio" },
  { id: 144, country: "Mauritania" },
  { id: 145, country: "Mayotte" },
  { id: 146, country: "México" },
  { id: 147, country: "Micronesia" },
  { id: 148, country: "Moldavia" },
  { id: 149, country: "Mónaco" },
  { id: 150, country: "Mongolia" },
  { id: 151, country: "Montserrat" },
  { id: 152, country: "Mozambique" },
  { id: 153, country: "Myanmar" },
  { id: 154, country: "Namibia" },
  { id: 155, country: "Nauru" },
  { id: 156, country: "Nepal" },
  { id: 157, country: "Nicaragua" },
  { id: 158, country: "Níger" },
  { id: 159, country: "Nigeria" },
  { id: 160, country: "Niue" },
  { id: 161, country: "Isla Norfolk" },
  { id: 162, country: "Noruega" },
  { id: 163, country: "Nueva Caledonia" },
  { id: 164, country: "Nueva Zelanda" },
  { id: 165, country: "Omán" },
  { id: 166, country: "Países Bajos" },
  { id: 167, country: "Pakistán" },
  { id: 168, country: "Palau" },
  { id: 169, country: "Palestina" },
  { id: 170, country: "Panamá" },
  { id: 171, country: "Papúa Nueva Guinea" },
  { id: 172, country: "Paraguay" },
  { id: 173, country: "Perú" },
  { id: 174, country: "Islas Pitcairn" },
  { id: 175, country: "Polinesia Francesa" },
  { id: 176, country: "Polonia" },
  { id: 177, country: "Portugal" },
  { id: 178, country: "Puerto Rico" },
  { id: 179, country: "Qatar" },
  { id: 180, country: "Reino Unido" },
  { id: 181, country: "Reunión" },
  { id: 182, country: "Ruanda" },
  { id: 183, country: "Rumania" },
  { id: 184, country: "Rusia" },
  { id: 185, country: "Sahara Occidental" },
  { id: 186, country: "Islas Salomón" },
  { id: 187, country: "Samoa" },
  { id: 188, country: "Samoa Americana" },
  { id: 189, country: "San Cristóbal y Nevis" },
  { id: 190, country: "San Marino" },
  { id: 191, country: "San Pedro y Miquelón" },
  { id: 192, country: "San Vicente y las Granadinas" },
  { id: 193, country: "Santa Helena" },
  { id: 194, country: "Santa Lucía" },
  { id: 195, country: "Santo Tomé y Príncipe" },
  { id: 196, country: "Senegal" },
  { id: 197, country: "Serbia y Montenegro" },
  { id: 198, country: "Seychelles" },
  { id: 199, country: "Sierra Leona" },
  { id: 200, country: "Singapur" },
  { id: 201, country: "Siria" },
  { id: 202, country: "Somalia" },
  { id: 203, country: "Sri Lanka" },
  { id: 204, country: "Suazilandia" },
  { id: 205, country: "Sudáfrica" },
  { id: 206, country: "Sudán" },
  { id: 207, country: "Suecia" },
  { id: 208, country: "Suiza" },
  { id: 209, country: "Surinam" },
  { id: 210, country: "Svalbard y Jan Mayen" },
  { id: 211, country: "Tailandia" },
  { id: 212, country: "Taiwán" },
  { id: 213, country: "Tanzania" },
  { id: 214, country: "Tayikistán" },
  { id: 215, country: "Territorio Británico del Océano Índico" },
  { id: 216, country: "Territorios Australes Franceses" },
  { id: 217, country: "Timor Oriental" },
  { id: 218, country: "Togo" },
  { id: 219, country: "Tokelau" },
  { id: 220, country: "Tonga" },
  { id: 221, country: "Trinidad y Tobago" },
  { id: 222, country: "Túnez" },
  { id: 223, country: "Islas Turcas y Caicos" },
  { id: 224, country: "Turkmenistán" },
  { id: 225, country: "Turquía" },
  { id: 226, country: "Tuvalu" },
  { id: 227, country: "Ucrania" },
  { id: 228, country: "Uganda" },
  { id: 229, country: "Uruguay" },
  { id: 230, country: "Uzbekistán" },
  { id: 231, country: "Vanuatu" },
  { id: 232, country: "Venezuela" },
  { id: 233, country: "Vietnam" },
  { id: 234, country: "Islas Vírgenes Británicas" },
  { id: 235, country: "Islas Vírgenes de los Estados Unidos" },
  { id: 236, country: "Wallis y Futuna" },
  { id: 237, country: "Yemen" },
  { id: 238, country: "Yibuti" },
  { id: 239, country: "Zambia" },
  { id: 240, country: "Zimbabue" }
];


export const rangeOfAge = [
  {
    id: 0,
    label: "Ninguno"
  },
  {
    id: 1,
    label: "1-17"
  },
  {
    id: 2,
    label: "18-30"
  },
  {
    id: 3,
    label: "31-45"
  },
  {
    id: 4,
    label: "46-85"
  },
]

export const killerStatus = [
  {
    id: 0,
    label: "Ninguno"
  },
  {
    id: 1,
    label: "Privado de libertad"
  },
  {
    id: 2,
    label: "Suicidio"
  },
  {
    id: 3,
    label: "Prófugo"
  },
  {
    id: 4,
    label: "Por determinar"
  },
  {
    id: 5,
    label: "Sentenciado"
  }
]

export const type_femicide = [
  {
    id: 0,
    label: "Ninguno"
  },
  {
    id: 1,
    label: "Femicidio Agravado"
  },
  {
    id: 2,
    label: "Femicidio Frustado"
  },
  {
    id: 3,
    label: "Femicidio"
  }]

export const type_weapon = [
  {
    id: 0,
    label: "Ninguno"
  },
  {
    id: 1,
    label: "Arma blanca"
  },
  {
    id: 2,
    label: "Fuerza Corporal"
  },
  {
    id: 3,
    label: "Arma de fuego"
  },
  {
    id: 4,
    label: "Objeto contundente"
  },
  {
    id: 5,
    label: "Material inflamable"
  },
  {
    id: 6,
    label: "Ahogamiento"
  }
]

export const type_telephone_service = [
  {
    id: 0,
    label: "Ninguno"
  },
  {
    id: 1,
    label: "Psicológia"
  },
  {
    id: 2,
    label: "Legal"
  },
  {
    id: 3,
    label: "Orientación"
  }
]



export const formatDataActivities = (data: ApiResponseActivities) => {
  const formattedData = Array.isArray(data) ? data.reduce((acc, item) => {
    const finishedFormat = item.finished === null ? "0" : item.finished
    const actionIndex = acc.findIndex((action: { action: string }) => action.action === item.type_action);
    if (actionIndex === -1) {
      acc.push({
        action: item.type_action,
        details: [{
          no: `${acc.length + 1}.1`,
          description: item.type_activity,
          total: finishedFormat,
          percentage: "0%" // Placeholder, calculate percentage later
        }],
        subTotal: { total: finishedFormat, percentage: "0%" } // Placeholder, calculate percentage later
      });
    } else {
      const detailIndex = acc[actionIndex].details.findIndex((detail: { description: string }) => detail.description === item.type_activity);
      if (detailIndex === -1) {
        acc[actionIndex].details.push({
          no: `${actionIndex + 1}.${acc[actionIndex].details.length + 1}`,
          description: item.type_activity,
          total: finishedFormat,
          percentage: "0%" // Placeholder, calculate percentage later
        });
      } else {
        acc[actionIndex].details[detailIndex].total = (parseInt(acc[actionIndex].details[detailIndex].total) + parseInt(item.finished)).toString();
      }
      acc[actionIndex].subTotal.total = (parseInt(acc[actionIndex].subTotal.total) + parseInt(finishedFormat)).toString();
    }
    return acc;
  }, []) : [];

  // Calculate percentages
  const grandTotal = formattedData.reduce((acc: number, item: { subTotal: { total: string } }) => acc + parseInt(item.subTotal.total), 0);
  formattedData.forEach((action: { subTotal: { total: string, percentage: string }, details: { total: string, percentage: string }[] }) => {
    action.subTotal.percentage = ((parseInt(action.subTotal.total) / grandTotal) * 100).toFixed(1) + "%";
    action.details.forEach((detail: { total: string, percentage: string }) => {
      detail.percentage = ((parseInt(detail.total) / grandTotal) * 100).toFixed(1) + "%";
    });
  });

  return { data: formattedData, grandTotal };
};

export const transformDataState = (data: any) => {
  return data?.map((item: any, index: number) => {
    const activities = Object.keys(item)
      .filter(key => key !== 'state' && key !== 'total')
      .map(key => ({
        name: key,
        total: Number(item[key])
      }));

    const total = Number(item.total);

    return {
      id: index + 1,
      name: item.state,
      total,
      // percentage: total / 100,
      activities
    };
  });
};

export const getMonths = (startMonth: number, yearActual: number, yearCard: number) => {
  const currentMonth = new Date().getMonth();
  let months = [];
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const fullMonths = [
    { number: 0, name: "Enero" },
    { number: 1, name: "Febrero" },
    { number: 2, name: "Marzo" },
    { number: 3, name: "Abril" },
    { number: 4, name: "Mayo" },
    { number: 5, name: "Junio" },
    { number: 6, name: "Julio" },
    { number: 7, name: "Agosto" },
    { number: 8, name: "Septiembre" },
    { number: 9, name: "Octubre" },
    { number: 10, name: "Noviembre" },
    { number: 11, name: "Diciembre" },
  ]
  if (yearCard < yearActual) {
    return months = fullMonths;
  } else {
    for (let month = startMonth; month <= currentMonth; month++) {
      months.push({ number: month, name: monthNames[month] });
    }
    return months;
  }
}

export const getMonth = (month: number) => {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return monthNames[month];
}

export const getYears = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};