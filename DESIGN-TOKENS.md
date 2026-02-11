# DESIGN-TOKENS.md — Sistema de Diseño

## Paleta de Colores

> Adaptada del logo oficial de Desguaces Valdeferrín (verde oliva / kaki industrial)

### Colores extraídos del logo
| Muestra | Hex | RGB | Uso en logo |
|---------|-----|-----|-------------|
| 🟢 | `#63813F` | (99, 129, 63) | Verde oscuro — borde circular, textos |
| 🟢 | `#7F9D57` | (127, 157, 87) | Verde medio — ilustraciones, iconos |
| 🟢 | `#ABBF8D` | (171, 191, 141) | Verde claro — líneas decorativas |
| ⚪ | `#F5F3EE` | (245, 243, 238) | Blanco cálido — fondo del logo |
| ⬛ | `#3A3A3A` | (58, 58, 58) | Negro suave — tipografía del logo |

### Variables CSS
```css
:root {
  /* Primarios — Verde Oliva (del logo) */
  --color-primary-900: #3D5A1E;   /* Verde muy oscuro */
  --color-primary-800: #4A6B28;   /* Verde oscuro profundo */
  --color-primary-700: #63813F;   /* ★ Verde oscuro del logo — bordes, headers */
  --color-primary-600: #6E8F47;   /* Verde medio-oscuro */
  --color-primary-500: #7F9D57;   /* ★ Verde medio del logo — iconos, links */
  --color-primary-400: #96B06F;   /* Verde medio-claro */
  --color-primary-300: #ABBF8D;   /* ★ Verde claro del logo — decorativo */
  --color-primary-200: #C5D4AD;   /* Verde muy claro */
  --color-primary-100: #DDE6CC;   /* Verde pálido */
  --color-primary-50:  #F0F4E8;   /* Verde casi blanco — fondos sutiles */

  /* Accent — Naranja/Ámbar (complementario al verde oliva) */
  --color-accent-700: #C75B00;
  --color-accent-600: #D97706;
  --color-accent-500: #E68A00;    /* CTA principal, botones de acción */
  --color-accent-400: #F59E0B;
  --color-accent-300: #FBC04E;
  --color-accent-100: #FEF3C7;

  /* Neutros (cálidos, armonizando con el verde oliva) */
  --color-dark:    #2D2D2D;       /* Textos principales */
  --color-grey-800: #3A3A3A;      /* ★ Negro del logo */
  --color-grey-700: #4A4A4A;
  --color-grey-600: #6B6B6B;
  --color-grey-400: #9E9E9E;
  --color-grey-200: #E0DFDB;
  --color-grey-100: #EEEDEA;
  --color-light:   #F5F3EE;       /* ★ Blanco cálido del logo */
  --color-white:   #FFFFFF;

  /* Semánticos */
  --color-success: #63813F;       /* Reutiliza el verde principal */
  --color-error:   #C62828;
  --color-warning: #E68A00;       /* Reutiliza el accent */
  --color-info:    #1565C0;
}
```

## Tipografía

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  /* Escala tipográfica */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  1.875rem;   /* 30px */
  --text-4xl:  2.25rem;    /* 36px */
  --text-5xl:  3rem;       /* 48px */
  --text-6xl:  3.75rem;    /* 60px */
}

/* Aplicación */
h1, h2, h3 { font-family: var(--font-display); text-transform: uppercase; }
body        { font-family: var(--font-body); }
```

## Espaciado

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* Secciones */
  --section-padding-y: var(--space-16);
  --container-max-width: 1280px;
  --container-padding-x: var(--space-6);
}
```

## Bordes y Sombras

```css
:root {
  --radius-sm:  0.375rem;  /* 6px */
  --radius-md:  0.5rem;    /* 8px */
  --radius-lg:  0.75rem;   /* 12px */
  --radius-xl:  1rem;      /* 16px */
  --radius-full: 9999px;

  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  --shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  --shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
}
```

## Breakpoints

```css
/* Mobile first */
/* sm:  640px  — teléfonos grandes */
/* md:  768px  — tablets */
/* lg:  1024px — laptops */
/* xl:  1280px — desktop */
/* 2xl: 1536px — pantallas grandes */
```

## Componentes Base

### Botón Primario
```css
.btn-primary {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--color-accent-500);  /* #E68A00 ámbar */
  color: var(--color-white);
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}
.btn-primary:hover {
  background: var(--color-accent-700);  /* #C75B00 */
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

### Botón Secundario
```css
.btn-secondary {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: transparent;
  color: var(--color-primary-700);  /* #63813F verde logo */
  padding: var(--space-3) var(--space-8);
  border: 2px solid var(--color-primary-700);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
}
.btn-secondary:hover {
  background: var(--color-primary-700);
  color: var(--color-white);
}
```

### Card de Producto
```css
.product-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}
.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
.product-card__image {
  aspect-ratio: 4/3;
  object-fit: cover;
  width: 100%;
}
.product-card__body {
  padding: var(--space-4);
}
.product-card__category {
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--color-primary-700);
  font-weight: 600;
  letter-spacing: 0.05em;
}
.product-card__title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-dark);
  margin-top: var(--space-2);
}
.product-card__price {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-accent-700);
  margin-top: var(--space-2);
}
```

### Input de Búsqueda (Hero)
```css
.search-hero {
  display: flex;
  max-width: 700px;
  margin: 0 auto;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.search-hero__input {
  flex: 1;
  padding: var(--space-4) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-lg);
  border: none;
  outline: none;
}
.search-hero__button {
  background: var(--color-accent-500);
  color: var(--color-white);
  padding: var(--space-4) var(--space-8);
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.search-hero__button:hover {
  background: var(--color-accent-700);
}
```

## Iconos

Usar **Lucide Icons** o **Heroicons** (outline style). Iconos relevantes:
- `truck` — Recogida / envío
- `shield-check` — Garantía / CATV
- `package` — Stock / recambios
- `file-text` — Certificado DGT
- `phone` — Contacto
- `search` — Buscador
- `car` — Vehículos
- `recycle` — Reciclaje / medioambiente
- `map-pin` — Ubicación
- `clock` — Horario
- `star` — Valoraciones
