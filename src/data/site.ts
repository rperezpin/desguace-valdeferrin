export const site = {
  name: 'Desguaces Valdeferrin',
  razonSocial: 'Desguaces Valdeferrin SL',
  cif: 'B99038317',
  slogan: 'Tu Desguace de Confianza',
  description: 'Centro Autorizado de Tratamiento de Vehiculos (CATV) en Ejea de los Caballeros, Zaragoza. Venta de recambios de segunda mano con garantia, gestion de bajas definitivas, tasacion de vehiculos y gestion oficial de residuos y metales.',
  url: 'https://desguacesvaldeferrin.es',

  phone: '609 720 031',
  phoneHref: 'tel:+34609720031',
  phoneBajas: '976 660 108',
  phoneBajasHref: 'tel:+34976660108',
  whatsapp: '34609720031',
  whatsappUrl: 'https://wa.me/34609720031?text=Hola%2C%20me%20interesa%20consultar%20sobre%20una%20pieza',
  email: 'ventas@desguacesvaldeferrin.es',

  address: {
    street: 'Poligono Industrial Valdeferrin, Calle D, Parcela 80/81',
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
    lunesJueves: '07:00 - 18:00',
    viernes: '07:00 - 15:00',
    sabado: 'Cerrado',
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
