# AGENTS.md — Instrucciones para Agentes IA

## Contexto del Proyecto

Estás construyendo la web de **Desguaces Valdeferrín**, un desguace profesional (Centro Autorizado de Tratamiento de Vehículos - CATV) ubicado en **Ejea de los Caballeros, Zaragoza, Aragón, España**.

El negocio se dedica a:
1. **Venta de recambios de segunda mano** — piezas extraídas de vehículos desguazados, revisadas y con garantía
2. **Gestión de bajas de vehículos** — tramitación de baja definitiva en DGT, con recogida gratuita con grúa
3. **Tasación y compra de vehículos** — compra de coches averiados, siniestrados o para desguace
4. **Reciclaje medioambiental** — tratamiento de vehículos conforme a normativa CATV

La zona de influencia comercial es: **Ejea de los Caballeros, Cinco Villas, comarca de Zaragoza, Aragón**, con envío de piezas a toda España.

---

## Principios de Diseño

### Tono y voz
- **Profesional pero accesible**: No somos un taller de barrio, somos un centro autorizado. Pero hablamos claro.
- **Orientado a beneficios**: Cada sección debe responder "¿qué gano yo?" para el visitante.
- **Confianza constante**: Mencionar certificaciones (CATV, ANADRA), garantías y servicio oficial.
- **Local y cercano**: Usar referencias geográficas (Ejea, Cinco Villas, Aragón) de forma natural.

### Estética visual
- Inspiración: **industrial limpio** — un desguace no tiene que parecer sucio en la web.
- Colores: Verde oliva del logo (#63813F, #7F9D57, #ABBF8D) + ámbar para CTAs (#E68A00) + fondos cálidos (#F5F3EE).
- Tipografía: Condensada/bold para títulos (impacto industrial), sans-serif limpia para cuerpo.
- Fotografía: Imágenes reales del desguace siempre que sea posible. Evitar stock genérico.
- Iconografía: Línea simple, monocromática. Lucide Icons o Heroicons.

### UX Priorities
1. **El buscador de piezas es el elemento #1** — Debe estar visible e inmediato en el hero.
2. **Contacto fácil** — WhatsApp flotante + teléfono visible en header.
3. **Dos flujos principales**: buscar pieza → comprar/consultar | dar de baja coche → formulario.
4. **Mobile first** — La mayoría de usuarios buscarán desde el móvil.
5. **Velocidad** — Carga rápida, imágenes optimizadas, código limpio.

---

## Instrucciones por Sección

### Header
```
[Logo Desguaces Valdeferrín] [Teléfono clickable] [Nav: Inicio | Recambios | Campa | Tasación | Baja de Vehículo | Contacto] [Botón: Acceder]
```
- Logo a la izquierda, nav centrado o derecho
- Teléfono visible en desktop, icono en mobile
- Menú hamburguesa en mobile
- Header sticky con fondo blur al hacer scroll

### Hero / Buscador
- Claim principal: texto potente sobre el servicio
- Subtexto: propuesta de valor concisa
- **Buscador prominente**: input grande con placeholder tipo "Busque su pieza (Ej: Motor Seat León 2.0 TDI)..."
- Botón de búsqueda con icono
- Fondo: imagen del desguace con overlay oscuro, o gradiente industrial

**Ejemplo de copy:**
```
Desguace en Ejea de los Caballeros: Recambios Garantizados
En Desguaces Valdeferrín encontrará su pieza de segunda mano al instante.
Especialistas en despiece de vehículos y gestión de bajas definitivas en las Cinco Villas.
```

### Bloques de Servicios (2 columnas)
Dos cards principales side-by-side:

**Card 1 — Bajas y Tasación:**
- Icono de coche + documento
- Título: "Bajas y Tasación de Vehículos"
- Texto: orientado a que compramos el coche, recogida gratis, certificado DGT
- Checklist visual: ✓ Tasación máxima | ✓ Grúa gratuita | ✓ Certificado DGT
- CTA: "Tramitar Baja"

**Card 2 — Recambios:**
- Icono de engranaje/pieza
- Título: "Piezas de Coche de Desguace"
- Texto: ahorro, garantía, envío 24h
- Checklist: ✓ Garantía | ✓ Envío España | ✓ Calidad revisada
- CTA: "Ver Recambios"

### Por qué elegirnos (3 columnas)
Tres bloques con icono + título + descripción corta:
1. **Gestión CATV** — Centro Autorizado, normativa medioambiental
2. **Stock Real** — Más de X recambios revisados en stock permanente
3. **Recogida Propia** — Servicio de grúa en Ejea y comarca sin coste

### Canales de venta externos
Grid de logos/links a:
- eBay (tienda internacional)
- Wallapop (1 o 2 perfiles si aplica)
- Milanuncios (opcional)
Cada uno con logo, descripción corta y link externo.

### Novedades en despiece
- Grid de 4-8 productos recientes (ProductCard)
- Cada card: imagen, categoría tag, nombre, precio con "IVA incluido"
- Hover: "Vista Rápida" o enlace a ficha
- Botón final: "Ver todo el stock →"

### CTA Stock físico
Banner o sección destacada:
```
¿No encuentra la pieza en la web?
Disponemos de miles de referencias en nuestras instalaciones de Ejea que aún no están catalogadas online.
[Botón: Consultar Stock Físico] (enlaza a WhatsApp o formulario)
```

### Bloque SEO / Texto descriptivo
Párrafos de texto natural, ~200-300 palabras, incluyendo keywords de forma orgánica:
- Presentación del negocio
- Servicios principales
- Zona geográfica
- Ventajas competitivas
- Mencionar economía circular / sostenibilidad
- Incluir keywords: desguace ejea, recambios cinco villas, baja coche ejea, etc.

### Sellos de confianza
- Logo ANADRA (asociación de desguaces)
- Badge CATV Autorizado
- Cualquier otra certificación
- Alineados en fila, centrados

### Footer
- Links a política de privacidad, devoluciones, aviso legal, cookies
- Datos de contacto resumidos
- Copyright con año actual
- Crédito de diseño web

---

## Instrucciones para Páginas Secundarias

### /recambios
- Filtros laterales: categoría, marca, modelo, año, precio
- Grid de productos con paginación
- Ordenar por: precio, novedad, relevancia
- Cada producto: imagen, nombre, precio, categoría, botón consultar/comprar

### /campa
- Grid visual de vehículos actualmente en despiece
- Cada vehículo: foto, marca, modelo, año, motor, estado del despiece
- Click para ver piezas disponibles de ese vehículo

### /tasacion
- Formulario multi-step o single page:
  - Paso 1: Marca, Modelo, Año, Motorización
  - Paso 2: Estado (averiado, siniestrado, funciona), Kilómetros
  - Paso 3: Ubicación del vehículo, Fotos (upload)
  - Paso 4: Datos de contacto (nombre, teléfono, email)
- Envía notificación por email al desguace
- Mensaje de confirmación al usuario

### /baja-vehiculo
- Contenido informativo sobre el proceso de baja definitiva
- Pasos explicados visualmente (timeline/stepper)
- FAQ sobre bajas (¿cuánto cuesta?, ¿necesito llevar el coche?, etc.)
- Formulario de solicitud de baja (similar a tasación)

### /contacto
- Mapa embebido (Google Maps) con ubicación del desguace
- Datos: dirección, teléfono, email, horario
- Formulario de contacto general
- Links a redes sociales si las hay

---

## Instrucciones de Código

### Convenciones generales
- Código limpio, comentado, semántico
- HTML5 semántico: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Accesibilidad: alt texts, aria-labels, contraste WCAG AA mínimo
- Responsive: mobile-first con breakpoints estándar (sm: 640, md: 768, lg: 1024, xl: 1280)

### SEO técnico
- Cada página tiene su propio `<title>` y `<meta description>` únicos
- Heading hierarchy correcta (un solo H1 por página)
- Schema.org con JSON-LD:
  - Home: `LocalBusiness` + `AutoPartsStore`
  - Productos: `Product` con `offers`
  - Contacto: `ContactPoint`
- Open Graph tags para compartir en redes
- Canonical URLs
- Hreflang si se considera versión en inglés (opcional)

### Imágenes
- Formato WebP con fallback JPG
- Lazy loading nativo (`loading="lazy"`)
- Tamaños responsive con `srcset`
- Nombres de archivo descriptivos (no IMG_2034.jpg → faro-derecho-seat-leon-2018.webp)

### Formularios
- Validación client-side + server-side
- Honeypot anti-spam (no CAPTCHA visual si es posible)
- Feedback visual de envío (loading → éxito/error)
- Envío de email al desguace con datos estructurados
- Respuesta automática al cliente (opcional)

### Rendimiento
- Lighthouse score objetivo: >90 en todas las métricas
- Preload de fuentes críticas
- CSS/JS minificado
- Imágenes optimizadas y servidas desde CDN si es posible
- Above the fold optimizado (hero + buscador carga primero)

---

## Datos del Negocio (a rellenar por el cliente)

```yaml
nombre_comercial: "Desguaces Valdeferrín"
razon_social: "[A rellenar]"
cif: "[A rellenar]"
direccion: "[Dirección completa, Ejea de los Caballeros, Zaragoza]"
codigo_postal: "50600"
telefono: "[A rellenar]"
whatsapp: "[A rellenar]"
email: "[A rellenar]"
horario:
  lunes_viernes: "09:00 - 14:00 / 16:00 - 19:00"
  sabado: "09:00 - 13:00"
  domingo: "Cerrado"
coordenadas:
  lat: 42.1268
  lng: -1.1373
numero_catv: "[Número de autorización CATV]"
miembro_anadra: true/false
redes_sociales:
  ebay: "[URL tienda eBay]"
  wallapop: "[URL perfil Wallapop]"
  facebook: "[URL si existe]"
  instagram: "[URL si existe]"
```

---

## Contenido de Ejemplo para Testing

### Productos de ejemplo
```json
[
  {
    "nombre": "FARO DELANTERO IZQUIERDO SEAT LEÓN 2.0 TDI 2019",
    "categoria": "Alumbrado",
    "precio": 85.00,
    "marca": "Seat",
    "modelo": "León",
    "anio": 2019,
    "motor": "2.0 TDI"
  },
  {
    "nombre": "PARAGOLPES DELANTERO VOLKSWAGEN GOLF VII 1.6 TDI 2017",
    "categoria": "Carrocería Frontal",
    "precio": 180.00,
    "marca": "Volkswagen",
    "modelo": "Golf VII",
    "anio": 2017,
    "motor": "1.6 TDI"
  },
  {
    "nombre": "MOTOR COMPLETO OPEL ASTRA J 1.7 CDTI 2014",
    "categoria": "Mecánica",
    "precio": 950.00,
    "marca": "Opel",
    "modelo": "Astra J",
    "anio": 2014,
    "motor": "1.7 CDTI"
  },
  {
    "nombre": "CAJA DE CAMBIOS RENAULT MÉGANE III 1.5 DCI 2016",
    "categoria": "Mecánica",
    "precio": 420.00,
    "marca": "Renault",
    "modelo": "Mégane III",
    "anio": 2016,
    "motor": "1.5 DCI"
  }
]
```
