export const site = {
  name: 'Desguaces Valdeferrin',
  slogan: 'Tu Desguace de Confianza',
  description: 'Centro Autorizado de Tratamiento de Vehiculos (CATV) en Ejea de los Caballeros, Zaragoza. Venta de recambios de segunda mano con garantia, gestion de bajas definitivas y tasacion de vehiculos.',
  url: 'https://desguacesvaldeferrin.es',

  phone: '976 66 00 00',
  phoneHref: 'tel:+34976660000',
  whatsapp: '34976660000',
  whatsappUrl: 'https://wa.me/34976660000?text=Hola%2C%20me%20interesa%20consultar%20sobre%20una%20pieza',
  email: 'info@desguacesvaldeferrin.es',

  address: {
    street: 'Ctra. de Erla, s/n',
    city: 'Ejea de los Caballeros',
    province: 'Zaragoza',
    region: 'Aragon',
    postalCode: '50600',
    country: 'ES',
  },

  coordinates: {
    lat: 42.1268,
    lng: -1.1373,
  },

  horario: {
    lunesViernes: '09:00 - 14:00 / 16:00 - 19:00',
    sabado: '09:00 - 13:00',
    domingo: 'Cerrado',
  },

  social: {
    ebay: '#',
    wallapop: '#',
    facebook: '#',
    instagram: '#',
  },

  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Recambios', href: '/recambios' },
    { label: 'Campa', href: '/campa' },
    { label: 'Tasacion', href: '/tasacion' },
    { label: 'Baja de Vehiculo', href: '/baja-vehiculo' },
    { label: 'Contacto', href: '/contacto' },
  ],
} as const;
