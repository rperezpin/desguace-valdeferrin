# Desguaces Valdeferrín - Web del Desguace en Ejea de los Caballeros

## 📋 Descripción del Proyecto

Web profesional para **Desguaces Valdeferrín**, un Centro Autorizado de Tratamiento de Vehículos (CATV) ubicado en **Ejea de los Caballeros, Zaragoza (Aragón)**. La web ofrece venta de recambios de segunda mano, gestión de bajas de vehículos y tasación online.

## 🏗️ Arquitectura del Sitio

### Páginas principales

| Página | Ruta | Descripción |
|--------|------|-------------|
| **Inicio** | `/` | Landing principal con buscador de piezas, servicios destacados y novedades de stock |
| **Recambios / Tienda** | `/recambios` | Catálogo filtrable de piezas con categorías (carrocería, mecánica, alumbrado, electrónica...) |
| **Campa** | `/campa` | Galería visual de vehículos actualmente en despiece (campa virtual) |
| **Tasación** | `/tasacion` | Formulario para solicitar valoración de vehículo (marca, modelo, año, estado, fotos) |
| **Baja de vehículo** | `/baja-vehiculo` | Info sobre el proceso de baja definitiva DGT + formulario de solicitud |
| **Contacto** | `/contacto` | Datos de contacto, mapa de ubicación, formulario general |
| **Acceder** | `/acceder` | Login para clientes (historial de pedidos, favoritos) |

### Estructura de contenido del Home

```
┌─────────────────────────────────────────────┐
│  HEADER: Logo + Nav + CTA "Acceder"         │
├─────────────────────────────────────────────┤
│  HERO: Claim principal + Buscador de piezas │
├─────────────────────────────────────────────┤
│  SERVICIOS: 2 bloques (Bajas / Recambios)   │
├─────────────────────────────────────────────┤
│  POR QUÉ ELEGIRNOS: 3 iconos con texto     │
│  (CATV, Stock real, Recogida grúa)          │
├─────────────────────────────────────────────┤
│  CANALES DE VENTA: eBay, Wallapop, etc.     │
├─────────────────────────────────────────────┤
│  NOVEDADES EN DESPIECE: Grid de productos   │
├─────────────────────────────────────────────┤
│  CONSULTA STOCK FÍSICO: CTA                 │
├─────────────────────────────────────────────┤
│  TEXTO SEO: Bloque descriptivo del negocio  │
├─────────────────────────────────────────────┤
│  SELLOS/BADGES: ANADRA, CATV, etc.          │
├─────────────────────────────────────────────┤
│  FOOTER: Legal, copyright, créditos         │
└─────────────────────────────────────────────┘
```

## 🔧 Stack Tecnológico Recomendado

### Opción A — WordPress + WooCommerce (rápido, económico)
- **CMS**: WordPress 6.x
- **Tienda**: WooCommerce (para catálogo de recambios)
- **Tema**: Starter theme personalizado (Flavor / flavor-starter o GeneratePress)
- **SEO**: Yoast SEO o Rank Math
- **Formularios**: WPForms o Contact Form 7
- **Caché/Rendimiento**: WP Rocket + Imagify

### Opción B — Jamstack / Headless (moderno, escalable)
- **Framework**: Next.js 14+ (App Router)
- **CMS Headless**: Strapi o Directus (para gestión de catálogo)
- **Estilos**: Tailwind CSS
- **Base de datos**: PostgreSQL (catálogo de piezas)
- **Hosting**: Vercel (frontend) + VPS para backend/API
- **Búsqueda**: Meilisearch o Algolia (buscador de piezas rápido)

### Opción C — HTML/CSS/JS estático con panel admin custom
- **Frontend**: HTML5 + Tailwind CSS + Alpine.js
- **Backend admin**: Panel ligero en PHP o Node.js para gestión de stock
- **BBDD**: MySQL/MariaDB
- **Hosting**: VPS con Nginx

## 🎨 Identidad Visual

### Paleta de colores (extraída del logo)
```css
:root {
  --color-primary: #63813F;      /* Verde oliva oscuro del logo */
  --color-primary-mid: #7F9D57;  /* Verde medio del logo */
  --color-primary-light: #ABBF8D;/* Verde claro del logo */
  --color-accent: #E68A00;       /* Ámbar — CTA, botones de acción */
  --color-dark: #2D2D2D;         /* Casi negro para textos */
  --color-light: #F5F3EE;        /* Blanco cálido (del fondo del logo) */
  --color-grey: #6B6B6B;         /* Textos secundarios */
  --color-white: #FFFFFF;
}
```

### Tipografía
- **Títulos**: Fuente display con carácter industrial (Archivo Black, Oswald, o Barlow Condensed)
- **Cuerpo**: Fuente legible y moderna (DM Sans, Source Sans 3, o Nunito Sans)

### Tono de comunicación
- Profesional pero cercano
- Enfocado en beneficios: ahorro, garantía, ecología
- Vocabulario local: mencionar Ejea, Cinco Villas, comarca, Aragón
- Trust signals constantes: CATV, ANADRA, DGT

## 📊 Modelo de Datos — Catálogo de Piezas

### Tabla: `piezas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT PK | Identificador único |
| `nombre` | VARCHAR(255) | Nombre descriptivo completo |
| `categoria` | ENUM | Alumbrado, Carrocería Frontal, Carrocería Trasera, Mecánica, Electrónica, Interior, Despiece |
| `marca_vehiculo` | VARCHAR(100) | Marca del vehículo origen |
| `modelo_vehiculo` | VARCHAR(100) | Modelo del vehículo origen |
| `anio_vehiculo` | YEAR | Año del vehículo origen |
| `motor` | VARCHAR(50) | Motorización (ej: 2.0 DCI) |
| `precio` | DECIMAL(8,2) | Precio con IVA |
| `estado` | ENUM | Disponible, Reservado, Vendido |
| `garantia` | BOOLEAN | Tiene garantía |
| `imagenes` | JSON | Array de URLs de imágenes |
| `referencia_oem` | VARCHAR(100) | Referencia original del fabricante |
| `peso_kg` | DECIMAL(5,2) | Para cálculo de envío |
| `created_at` | TIMESTAMP | Fecha de alta |

### Tabla: `vehiculos_campa`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT PK | Identificador |
| `marca` | VARCHAR(100) | Marca |
| `modelo` | VARCHAR(100) | Modelo |
| `anio` | YEAR | Año |
| `motor` | VARCHAR(50) | Motorización |
| `color` | VARCHAR(50) | Color |
| `estado_despiece` | ENUM | En proceso, Completado |
| `imagen` | VARCHAR(255) | Foto del vehículo |
| `fecha_entrada` | DATE | Fecha entrada en campa |

### Tabla: `solicitudes_baja`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT PK | Identificador |
| `nombre_cliente` | VARCHAR(200) | Nombre del solicitante |
| `telefono` | VARCHAR(20) | Teléfono |
| `email` | VARCHAR(200) | Email |
| `marca` | VARCHAR(100) | Marca vehículo |
| `modelo` | VARCHAR(100) | Modelo |
| `matricula` | VARCHAR(20) | Matrícula |
| `ubicacion` | VARCHAR(200) | Dónde está el coche |
| `comentarios` | TEXT | Notas adicionales |
| `estado` | ENUM | Pendiente, Contactado, Completado |

## 🔍 Estrategia SEO

### Keywords principales
- `desguace ejea de los caballeros`
- `desguace cinco villas`
- `recambios segunda mano ejea`
- `baja coche ejea de los caballeros`
- `piezas coche desguace zaragoza`
- `desguace cerca de ejea`
- `comprar piezas desguace aragón`

### SEO On-Page
- Title tags optimizados por página con localización
- Meta descriptions con CTA y keywords
- Schema.org: `AutoPartsStore`, `LocalBusiness`, `Product`
- URLs limpias y descriptivas
- Blog/noticias para contenido fresco (opcional pero recomendable)
- Imágenes con alt text descriptivo y WebP

### SEO Local
- Ficha Google Business Profile optimizada
- NAP consistente (Nombre, Dirección, Teléfono)
- Reseñas de clientes
- Citas en directorios locales (Páginas Amarillas, ANADRA, etc.)

## 🚀 Funcionalidades Clave

1. **Buscador de piezas** — Input con autocompletado por marca/modelo/pieza
2. **Catálogo filtrable** — Filtros por categoría, marca, año, rango de precio
3. **Fichas de producto** — Imágenes múltiples, especificaciones, botón de consulta/compra
4. **Formulario de tasación** — Multi-step con subida de fotos
5. **Formulario de baja** — Datos del vehículo + recogida
6. **WhatsApp flotante** — Botón fijo para consulta rápida
7. **Campa virtual** — Grid visual de vehículos en despiece
8. **Links a marketplaces** — eBay, Wallapop, Milanuncios
9. **Zona privada** (opcional) — Login para clientes recurrentes

## 📁 Estructura de Archivos (Next.js)

```
desguaces-valdeferrin/
├── app/
│   ├── layout.tsx            # Layout principal (header + footer)
│   ├── page.tsx              # Home
│   ├── recambios/
│   │   ├── page.tsx          # Catálogo
│   │   └── [slug]/page.tsx   # Ficha de producto
│   ├── campa/page.tsx        # Campa virtual
│   ├── tasacion/page.tsx     # Formulario tasación
│   ├── baja-vehiculo/page.tsx
│   ├── contacto/page.tsx
│   └── acceder/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroBuscador.tsx
│   ├── ServiciosCards.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── WhatsAppButton.tsx
│   ├── TasacionForm.tsx
│   └── MarketplaceLinks.tsx
├── lib/
│   ├── db.ts                 # Conexión BBDD
│   ├── api.ts                # Funciones de datos
│   └── seo.ts                # Helpers de metadata
├── public/
│   ├── images/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 📋 Checklist de Lanzamiento

- [ ] Dominio registrado (ej: desguacesvaldeferrin.es / .com)
- [ ] Certificado SSL activo
- [ ] Google Business Profile creado y verificado
- [ ] Google Analytics 4 + Search Console configurados
- [ ] Textos legales: Aviso legal, Política de privacidad, Cookies, Devoluciones
- [ ] Formularios testeados con notificaciones por email
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] Responsive testado en móvil, tablet y desktop
- [ ] Velocidad: Core Web Vitals en verde
- [ ] Schema.org implementado
- [ ] Sitemap.xml y robots.txt
- [ ] Integración con WhatsApp Business
- [ ] Perfiles en eBay y Wallapop enlazados
