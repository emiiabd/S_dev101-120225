
const ENVIROMENT = {
  URL_FRONT: "http://localhost:5173",
  URL_BACK: `https://back-final-pwa-utn.vercel.app`,
  G_MAPS_API_KEY: 'AIzaSyDho985O13eR1wkuDX00c2vWwkA8xabyCc',
  G_CAPTCHA_API_KEY: '6LeezH0qAAAAAImjUoIqHzED8LdLmJHIwQAd1wzM' 
}

const INFODATA = {
  NAME: "Seguridad 101",
  DESCRIPTION: "Seguridad 101",
  KEYWORDS: "Seguridad 101",
  AUTHOR: "Seguridad 101",
  PRESENTATION: {
    HOME: {
      title: "Sistemas de alarmas y videovigilancia",
      text: "Tu seguridad es nuestra misión.",
      btn: "Pedir cotización"
    },
    CONTACT: {
      title: "Contacto",
      text: "¿Tienes alguna pregunta o duda? Háznosla saber."
    },
    ABOUTUS: {
      title: "Sobre nosotros",
      text: "¿Quienes somos? Conoce nuestra historia."
    },
    LOGIN: {
      title: "Login",
      text: "Esta seccion es solo para usuarios registrados."
    }
  },
  HOME_CARDS: [   
    {
      title: "Sistemas de Seguridad",
      description: "Instalamos sistemas de alarmas de última tecnología. Nuestros técnicos se asegura de diseñar un sistema de anillo exterior que prevenga cualquier intrusión, garantizando una protección inmediata para tu hogar, comercio o industria.",
      imageURL: "./IMG_0391.png",
      styles: {
        translate: "-100% 0",
        transition: "translate 0.7s ease-out",
      }
    },
    {
      title: "Sistemas de Videovigilancia",
      description: "Ofrecemos sistemas de videovigilancia de última tecnología con conexión a internet, permitiendo el acceso desde cualquier dispositivo para mantener tu propiedad siempre vigilada.",
      imageURL: "./ezvizCameraCard.jpg",
      styles: {
        translate: "0 100%",
        transition: "translate 0.7s ease-out",
      }
    },
    {
      title: "Sistemas de Control de Acceso y Aperturas Biométricas",
      description: "Nuestra empresa vende, instala y mantiene sistemas integrados de control de acceso y aperturas biométricas, garantizando la seguridad y control en todo momento.",
      imageURL: "./accesControl.jpg",
      styles: {
        translate: "100% 0",
        transition: "translate 0.7s ease-out",
      }
    }
  ],
  HOME_WHY_US: [
    {
      title: "Tecnología de Punta",
      description: "Utilizamos la tecnología más avanzada, asegurando una vigilancia y control eficientes y modernos para la máxima tranquilidad y comodidad de nuestros clientes.",
      styles: {
        translate: "100% 0",
        transition: "translate 0.4s ease-out",
      }
    },
    {
      title: "Expertos en Seguridad",
      description: "Con mas de 35 años de experiencia en el sector, nuestro equipo de profesionales está altamente capacitado para proyectar e instalar sistemas de seguridad adaptados a tus necesidades específicas.",
      styles: {
        translate: "100% 0",
        transition: "translate 0.5s ease-out",
      }
    },
    {
      title: "Instalaciones Profesionales y Limpias",
      description: "Nuestros técnicos realizan instalaciones minuciosas, cuidando cada detalle para no afectar la estética de tu propiedad mientras se garantiza la máxima seguridad.",
      styles: {
        translate: "100% 0",
        transition: "translate 0.6s ease-out",
      }
    },
    {
      title: "Soporte y Seguimiento Postventa",
      description: "Nuestro compromiso con tu seguridad no termina con la instalación de nuestros sistemas. Realizamos un servicio de seguimiento postventa para asegurarnos de que su sistema siempre funcione de manera óptima. Nos dedicamos a resolver cualquier inquietud o problema que pueda surgir, siempre disponibles para brindar asistencia técnica rápida y eficiente.",
      styles: {
        translate: "100% 0",
        transition: "translate 0.7s ease-out",
      }
    },
  ],
  HOME_VALUES: [
    {
      title: "Impecabilidad",
      description: "Nos destacamos por nuestra impecabilidad en cada proyecto. Cuidamos cada detalle, combinando seguridad y estética para ofrecer soluciones que superan las expectativas de nuestros clientes.",
      styles: {
        translate: "-100% 0",
        transition: "translate 0.4s ease-out",
      }
    },
    {
      title: "Confianza",
      description: "En nuestra empresa, la confianza no es solo una meta, sino una garantía. Nos esforzamos por construir relaciones sólidas y duraderas con nuestros clientes a través de un servicio transparente y honesto. Cada proyecto es una oportunidad para demostrar nuestro compromiso inquebrantable con la seguridad y la satisfacción de quienes confían en nosotros.",
      styles: {
        translate: "100% 0",
        transition: "translate 0.4s ease-out",
      }
    },
    {
      title: "Calidad",
      description: "Nuestro equipo, altamente calificado, se dedica a utilizar la mejor tecnología disponible para asegurar una experiencia excepcional. Nos comprometemos a mantener los más altos estándares de calidad en todos nuestros servicios.",
      styles: {
        translate: "-100% 0",
        transition: "translate 0.6s ease-out",
      }
    },
    {
      title: "Compromiso",
      description: "Nuestros clientes son el centro de nuestra atención. Nos comprometemos a exceder sus expectativas mediante un seguimiento continuo y asegurándonos de su total satisfacción en cada etapa del proceso. Su tranquilidad es nuestra principal prioridad.",
      styles: {
        translate: "100% 0",
        transition: "translate 0.6s ease-out",
      }
    },
    ]
}

const FORM_SCHEMA = {
  username: {
    elementHTML: 'input',
    type: 'text',
    labelText: 'Nombre de usuario',
    id: 'username',
    className: 'form-control',
    
  } ,
  password: {
    elementHTML: 'input',
    type: 'password',
    labelText: 'Contraseña',
    id: 'password',
    className: 'form-control',
    
  } ,
  name: {
    elementHTML: 'input',
    type: 'text',
    labelText: 'Nombre y Apellido',
    id: 'name',
    className: 'form-control',
  } ,
  phone: {
    elementHTML: 'input',
    type: 'tel',
    labelText: 'Número de Teléfono',
    id: 'phone',
    className: 'form-control',
    
  } ,
  location: {
    elementHTML: '<MapAutocompleteComponent onPlaceSelected={handlePlaceSelected} />'
  },
  typeOfWork: {
    elementHTML: 'select',
    type: '',
    labelText: 'Selecciona el trabajo a realizar',
    id: 'workToDo',
    className: 'form-select',
    options: [
      {value: 'Cámaras de Seguridad', text: 'Cámaras de Seguridad'},
      {value: 'Alarmas Antirrobo', text: 'Alarmas Antirrobo'},
      {value: 'Control de Acceso Biométrico', text: 'Control de Acceso Biométrico'},
      {value: 'Alarmas de Incendio', text: 'Alarmas de Incendio'},
      {value: 'Cerraduras Biométricas y/o Numéricas', text: 'Cerraduras Biométricas y/o Numéricas'},
      {value: 'Instalaciones de Redes', text: 'Instalaciones de Redes'},
      {value: 'Otro...', text: 'Otro...'}
    ]
  },
  commentBox: {
    elementHTML: 'textarea',
    type: 'text',
    labelText: 'Explicación breve del trabajo a realizar:',
    id: 'commentBox',
    className: 'form-control',
  },
  servicesType : {
    elementHTML: 'select',
    type: '',
    labelText: 'Tipo de servicio',
    id: 'servicesType',
    className: 'form-select',
    options: [
      {value: 'Cámaras de Seguridad', text: 'Cámaras de Seguridad'},
      {value: 'Alarmas Antirrobo', text: 'Alarmas Antirrobo'},
      {value: 'Control de Acceso Biométrico', text: 'Control de Acceso Biométrico'},
      {value: 'Alarmas de Incendio', text: 'Alarmas de Incendio'},
      {value: 'Cerraduras Biométricas y/o Numéricas', text: 'Cerraduras Biométricas y/o Numéricas'},
      {value: 'Instalaciones de Redes', text: 'Instalaciones de Redes'},
      {value: 'Otro...', text: 'Otro...'}
    ]
  }



}


export { ENVIROMENT, INFODATA, FORM_SCHEMA}