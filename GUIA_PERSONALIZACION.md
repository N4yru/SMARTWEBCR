# Guía de Personalización de Plantillas Web

> Esta guía está diseñada para personas con conocimientos básicos en desarrollo web. Aquí aprenderás a editar cualquier apartado de las plantillas de forma sencilla y segura.

---

## Índice

1. [Estructura del Proyecto](#1-estructura-del-proyecto)
2. [Herramientas Necesarias](#2-herramientas-necesarias)
3. [Editor Visual (Recomendado)](#3-editor-visual-recomendado)
4. [Personalización Básica](#4-personalización-básica)
5. [Personalización Avanzada](#5-personalización-avanzada)
6. [Plantilla ShopFlow (E-commerce)](#6-plantilla-shopflow-e-commerce)
7. [Otras Plantillas](#7-otras-plantillas)
8. [Preguntas Frecuentes](#8-preguntas-frecuentes)

---

## 1. Estructura del Proyecto

```
proyecto/
├── index.html              ← Página principal (catálogo de plantillas)
├── favicon.ico             ← Icono de la pestaña
├── robots.txt / sitemap.xml ← Archivos para Google
│
├── css/                    ← Hojas de estilo (colores, fuentes, diseño)
│   ├── main.css            ← Estilos del sitio principal
│   ├── shopflow.css        ← Estilos de ShopFlow
│   ├── devfolio-pro.css    ← Estilos de DevFolio
│   ├── agencypro.css       ← Estilos de AgencyPro
│   ├── saaskit.css         ← Estilos de SaaSKit
│   ├── startup-hero.css    ← Estilos de Startup Hero
│   └── creativecanvas.css  ← Estilos de CreativeCanvas
│
├── js/                     ← Archivos JavaScript (funcionalidad)
│   ├── main.js             ← Lógica del sitio principal
│   ├── shopflow.js         ← Lógica de ShopFlow
│   ├── devfolio-pro.js     ← Lógica de DevFolio
│   ├── agencypro.js        ← Lógica de AgencyPro
│   ├── saaskit.js          ← Lógica de SaaSKit
│   ├── startup-hero.js     ← Lógica de Startup Hero
│   └── creativecanvas.js   ← Lógica de CreativeCanvas
│
├── pages/                  ← Páginas HTML de cada plantilla
│   ├── shopflow-index.html
│   ├── shopflow-catalogo.html
│   ├── shopflow-producto.html
│   ├── devfolio-pro.html
│   ├── agencypro.html
│   ├── saaskit.html
│   ├── startup-hero.html
│   └── creativecanvas.html
│
└── imagenes/               ← Carpeta para tus imágenes
    ├── logo-smartwebcr.png
    ├── andres.jpeg
    └── david.jpeg
```

---

## 2. Herramientas Necesarias

### 2.1 Editor de Código

**Recomendado: Visual Studio Code (VS Code)**
- Descarga gratuita: https://code.visualstudio.com/
- Permite editar HTML, CSS y JavaScript con colores que facilitan la lectura

### 2.2 Ver los Cambios en Tiempo Real

**Opción A: Live Server (Recomendada)**
1. En VS Code, ve a la pestaña de Extensiones (Ctrl+Shift+X)
2. Busca "Live Server" e instálala
3. Click derecho en cualquier archivo HTML → "Open with Live Server"
4. El sitio se abrirá automáticamente en tu navegador

**Opción B: Abrir directamente**
- Simplemente haz doble click en cualquier archivo `.html` para abrirlo en tu navegador
- **Nota:** Algunos estilos pueden no cargar correctamente sin un servidor local

### 2.3 Navegador Web

- Google Chrome (recomendado para usar las herramientas de desarrollador)
- Firefox, Edge, o Safari también funcionan

---

## 3. Editor Visual (Recomendado)

> **Esta es la forma más fácil de personalizar tu plantilla sin tocar código.**

### 3.1 ¿Qué plantillas tienen editor visual?

Actualmente, **SaaSKit** es la única plantilla con editor visual completo. Las demás se personalizan editando el código directamente (ver sección 4).

### 3.2 Cómo usar el editor de SaaSKit

1. **Abrir el editor:**
   - Abrí `editor-saaskit.html` en tu navegador
   - O usá Live Server y navegá a `http://127.0.0.1:5500/editor-saaskit.html`

2. **Navegar por las secciones:**
   - El panel izquierdo tiene un menú con todas las secciones editables
   - Hacé click en cada ítem para ir a esa sección

3. **Editar contenido:**
   - **General:** Nombre del producto, logo (emoji), tagline, descripción, email
   - **Colores:** Usá los selectores de color o ingresá códigos hexadecimales
   - **Hero:** Título, subtítulo, botones CTA, prueba social
   - **Marquee:** Lista de características en movimiento (agregá/eliminá items)
   - **Features:** Icono, título y descripción de cada característica
   - **Precios:** Nombre del plan, precios mensual/anual, características, CTA
   - **Testimonios:** Texto, autor, cargo, iniciales
   - **FAQ:** Preguntas y respuestas
   - **CTA:** Título, subtítulo, botones
   - **Footer:** Descripción, copyright, enlaces

4. **Reordenar items:**
   - Usá las flechas ↑ ↓ para mover items arriba/abajo
   - Usá la X para eliminar un item
   - Usá "+ Agregar" para crear nuevos items

5. **Vista previa:**
   - Click en "👁 Vista previa" para ver los cambios en la plantilla
   - Los cambios se guardan temporalmente en el navegador

6. **Guardar cambios:**
   - Click en "💾 Guardar" para descargar el archivo `saaskit-config.json`
   - Reemplazá el archivo `config/saaskit-config.json` con tu versión editada
   - ¡Listo! La plantilla cargará automáticamente tu configuración

### 3.3 Estructura del archivo de configuración

El archivo `config/saaskit-config.json` contiene toda la información de la plantilla:

```json
{
  "general": { "productName": "FlowApp", "logoEmoji": "⚡", ... },
  "colors": { "primary": "#6366F1", ... },
  "hero": { "title": "...", "ctaPrimary": "...", ... },
  "features": { "items": [...] },
  "pricing": { "plans": [...] },
  "testimonials": { "items": [...] },
  "faq": { "items": [...] },
  ...
}
```

### 3.4 Ventajas del editor visual

| Ventaja | Descripción |
|---------|-------------|
| ✅ Sin código | No necesitás tocar HTML/CSS/JS |
| ✅ Vista previa inmediata | Ver cambios en tiempo real |
| ✅ Todo en un lugar | Todos los campos editables juntos |
| ✅ Validación automática | Los colores y formatos se validan |
| ✅ Reordenar items | Cambiar el orden con flechas |

### 3.5 Limitaciones

- Solo funciona para la plantilla SaaSKit
- Los cambios se guardan en un archivo JSON separado
- Necesitás un navegador moderno (Chrome, Firefox, Edge)

---

## 4. Personalización Básica

### 4.1 ¿Qué puedo personalizar fácilmente?

| Elemento | Dónde se edita | Dificultad |
|----------|----------------|------------|
| Colores | Archivos `.css` | ⭐ Muy fácil |
| Textos | Archivos `.html` y `.js` | ⭐ Muy fácil |
| Imágenes | HTML y carpeta `imagenes/` | ⭐ Muy fácil |
| Logo | HTML y JS | ⭐ Muy fácil |
| Enlaces | Archivos `.html` | ⭐ Muy fácil |
| Precios | HTML y JS | ⭐ Muy fácil |

### 4.2 Cambiar los Colores

Los colores están definidos al inicio de cada archivo CSS. Buscá la sección `:root`:

```css
/* En css/shopflow.css, líneas 7-33 */
:root {
  --accent:      #F59E0B;        /* Color principal (ámbar) */
  --accent-h:    #FCD34D;        /* Versión más clara del color */
  --accent-dim:  rgba(245, 158, 11, .35);  /* Versión transparente */
  --accent-rgb:  245, 158, 11;   /* Color en formato RGB */
  
  --bg:          #080A0F;        /* Color de fondo principal */
  --bg2:         #0F1219;        /* Fondo secundario */
  --text1:       #F0F2FF;        /* Color de texto principal */
  --text2:       rgba(200, 210, 240, .6);  /* Texto secundario */
}
```

**Para cambiar el color de acento:**
1. Abrí el archivo CSS de tu plantilla (ej: `css/shopflow.css`)
2. Buscá `--accent:` en la línea 8
3. Reemplazá `#F59E0B` por tu color (usá un [color picker](https://htmlcolorcodes.com/))
4. Actualizá también `--accent-rgb:` en la línea 11 (convertí tu hex a RGB)

**Ejemplo para cambiar a azul:**
```css
--accent:      #3B82F6;   /* Azul */
--accent-h:    #60A5FA;   /* Azul claro */
--accent-dim:  rgba(59, 130, 246, .35);
--accent-rgb:  59, 130, 246;
```

### 4.3 Cambiar Textos

Los textos están en los archivos HTML. Buscá el texto que querés cambiar y reemplazalo:

**Ejemplo en `pages/shopflow-index.html`:**
```html
<!-- Antes -->
<h1 class="hero-h1">Estilo que<br><span>define</span><br>quién sos.</h1>

<!-- Después -->
<h1 class="hero-h1">Productos que<br><span>transforman</span><br>tu día.</h1>
```

### 4.4 Cambiar el Logo

**Opción A: Reemplazar el archivo**
1. Guardá tu logo como `logo.png` en la carpeta `imagenes/`
2. El logo se actualizará automáticamente

**Opción B: Cambiar la ruta en el HTML**
```html
<!-- En pages/shopflow-index.html, línea 74 -->
<img src="../imagenes/logo.png" alt="ShopFlow"/>
<!-- Cambiá a tu archivo -->
<img src="../imagenes/mi-logo.png" alt="Mi Tienda"/>
```

### 4.5 Cambiar Información de Contacto

En el archivo JavaScript de cada plantilla:

```javascript
// En js/shopflow.js, líneas 7-12
const STORE = {
  name:     'ShopFlow',         // Nombre de tu tienda
  email:    'hola@tienda.com',  // Email de contacto
  whatsapp: '50600000000',      // WhatsApp (código país + número)
  logo:     '../imagenes/logo.png',
};
```

---

## 5. Personalización Avanzada

### 5.1 Agregar un Nuevo Producto (ShopFlow)

En `pages/shopflow-catalogo.html` o `shopflow-index.html`, buscá un producto existente y copialo:

```html
<div class="prod-card reveal up">
  <div class="prod-img-wrap">
    <span>👟</span>  <!-- Emoji o ícono del producto -->
    <span class="prod-badge badge-new">Nuevo</span>
    <div class="prod-actions">
      <button class="prod-btn" onclick="location.href='shopflow-producto.html'">
        Agregar al carrito
      </button>
      <button class="prod-btn-icon" onclick="location.href='shopflow-producto.html'">
        👁
      </button>
    </div>
  </div>
  <div class="prod-body">
    <div class="prod-category">Calzado</div>
    <div class="prod-name">Zapatillas Urban Runner Pro</div>
    <div class="prod-rating">
      <span class="stars">★★★★★</span>
      <span class="rating-n">(128)</span>
    </div>
    <div class="prod-price">
      <span class="price-now">$89.99</span>
      <span class="price-old">$120</span>
      <span class="price-save">-25%</span>
    </div>
  </div>
</div>
```

**Campos a modificar:**
- `<span>👟</span>` → Emoji o reemplazá por `<img src="ruta-imagen.jpg">`
- `badge-new` → `badge-sale` para ofertas, `badge-hot` para populares
- `prod-category` → Categoría del producto
- `prod-name` → Nombre del producto
- `stars` → Calificación (1-5 estrellas)
- `price-now` → Precio actual
- `price-old` → Precio anterior (para mostrar descuento)
- `price-save` → Porcentaje de ahorro

### 5.2 Cambiar la Tipografía

En el archivo CSS, buscá la importación de Google Fonts:

```css
/* En css/shopflow.css, línea 1 */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
```

**Para cambiar las fuentes:**
1. Visitá [Google Fonts](https://fonts.google.com/)
2. Seleccioná las fuentes que te gusten
3. Copiá el enlace que te dan
4. Reemplazá la línea en el CSS
5. Actualizá las variables `--font-h` y `--font-b`

### 5.3 Modificar el Dark/Light Mode

Los colores del modo claro están en `[data-theme="light"]`:

```css
/* En css/shopflow.css, líneas 35-47 */
[data-theme="light"] {
  --bg:          #FAFAF8;
  --bg2:         #FFFFFF;
  --bg3:         #F3F2EE;
  --text1:       #0A0A0A;
  --text2:       #4A4A4A;
  /* ... más colores ... */
}
```

**Para desactivar el toggle de tema:**
- En el archivo JS, comentá o eliminá las líneas relacionadas con `theme-btn`

### 5.4 Agregar una Nueva Sección

Copiá una sección existente y modificá el contenido:

```html
<section class="nueva-seccion" style="padding:6rem 0">
  <div class="section-inner">
    <span class="tag">Tu etiqueta</span>
    <h2 class="h-title">Tu título <em>destacado</em></h2>
    <p class="h-sub">Tu descripción aquí.</p>
    <!-- Contenido adicional -->
  </div>
</section>
```

---

## 6. Plantilla ShopFlow (E-commerce)

### 6.1 Archivos de ShopFlow

| Archivo | Propósito |
|---------|-----------|
| `pages/shopflow-index.html` | Página de inicio |
| `pages/shopflow-catalogo.html` | Catálogo de productos |
| `pages/shopflow-producto.html` | Detalle de producto individual |
| `css/shopflow.css` | Estilos compartidos |
| `js/shopflow.js` | Funcionalidad compartida |

### 6.2 Personalizar el Catálogo

En `pages/shopflow-catalogo.html`:

**Filtros de categoría:**
```html
<!-- Líneas ~50-60 -->
<button class="filter-btn active" data-filter="all">Todos</button>
<button class="filter-btn" data-filter="ropa">Ropa</button>
<button class="filter-btn" data-filter="electronica">Electrónica</button>
```

**Para agregar un filtro:**
```html
<button class="filter-btn" data-filter="deportes">Deportes</button>
```

### 6.3 Configurar WhatsApp

En `js/shopflow.js`, actualizá el número:

```javascript
const STORE = {
  whatsapp: '50600000000',  // Tu número con código de país
};
```

El enlace de WhatsApp se genera automáticamente como:
`https://wa.me/50600000000`

### 6.4 Cambiar Imágenes de Productos

**Opción A: Usar emojis (más simple)**
```html
<div class="prod-img-wrap"><span>👟</span></div>
```

**Opción B: Usar imágenes reales**
```html
<div class="prod-img-wrap">
  <img src="../imagenes/productos/zapatillas.jpg" alt="Zapatillas" 
       style="width:100%;height:100%;object-fit:cover">
</div>
```

---

## 7. Otras Plantillas

### 7.1 DevFolio Pro (Portfolio)

**Personalizar en `pages/devfolio-pro.html`:**

**Skills/tecnologías:**
```html
<div class="skill-item">
  <span class="skill-icon">📱</span>
  <span class="skill-name">React</span>
</div>
```

**Proyectos:**
```html
<div class="project-card">
  <h3>Nombre del Proyecto</h3>
  <p>Descripción del proyecto...</p>
  <a href="#">Ver proyecto →</a>
</div>
```

### 7.2 AgencyPro

**Servicios en `pages/agencypro.html`:**
```html
<div class="service-card">
  <span class="service-icon">📊</span>
  <h3>Nombre del Servicio</h3>
  <p>Descripción...</p>
</div>
```

### 7.3 SaaSKit (código)

**Características en `pages/saaskit.html`:**
```html
<div class="feature-item">
  <span class="feature-icon">⚡</span>
  <h4>Característica</h4>
  <p>Descripción...</p>
</div>
```

**Planes de precios:**
```html
<div class="pricing-card">
  <h3>Plan Básico</h3>
  <div class="price">$29<span>/mes</span></div>
  <ul>
    <li>✓ Característica 1</li>
    <li>✓ Característica 2</li>
  </ul>
  <a href="#" class="btn btn-accent">Empezar</a>
</div>
```

---

## 8. Preguntas Frecuentes

### ¿Cómo cambio el título de la pestaña?

Buscá la etiqueta `<title>` en el HTML:
```html
<title>ShopFlow — Inicio</title>
<!-- Cambiá a -->
<title>Mi Tienda — Productos Premium</title>
```

### ¿Cómo agrego mi propio dominio?

1. Comprá tu dominio (GoDaddy, Namecheap, Google Domains)
2. Configurá los DNS para apuntar a tu hosting
3. En el HTML, actualizá los enlaces absolutos si los hay

### ¿Cómo cambio el favicon?

1. Reemplazá `favicon.ico` en la raíz del proyecto
2. También actualizá `apple-touch-icon.png` para dispositivos Apple

### ¿Puedo agregar más páginas?

Sí! Copiá un archivo HTML existente como plantilla:
```bash
cp shopflow-index.html pages/mi-nueva-pagina.html
```

### ¿Cómo hago para que el formulario funcione?

Los formularios en las plantillas son visuales. Para que funcionen:

**Opción A: Formspree (gratis)**
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
  <input type="email" name="email" placeholder="tu@correo.com">
  <button type="submit">Enviar</button>
</form>
```

**Opción B: EmailJS**
- Visitá https://www.emailjs.com/ para integrar envío de emails desde JavaScript

### ¿Cómo subo mi sitio a internet?

**Opciones gratuitas:**
1. **Netlify:** Arrastrá la carpeta del proyecto a https://app.netlify.com/drop
2. **Vercel:** Conectá tu repositorio de GitHub
3. **GitHub Pages:** Subí el código a GitHub y activá Pages

**Opciones de pago:**
- Hostinger, SiteGround, Bluehost (desde ~$3/mes)

### ¿Qué hago si algo se ve mal después de editar?

1. **Limpiá la caché del navegador:** Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
2. **Revisá que cerraste todas las etiquetas:** `</div>`, `</p>`, etc.
3. **Usá las herramientas de desarrollador:** F12 → Console para ver errores

---

## Apéndice: Referencias Rápidas

### Colores Comunes en Hexadecimal

| Color | Hex | RGB |
|-------|-----|-----|
| Rojo | #EF4444 | 239, 68, 68 |
| Naranja | #F59E0B | 245, 158, 11 |
| Amarillo | #FBBF24 | 251, 191, 36 |
| Verde | #10B981 | 16, 185, 129 |
| Azul | #3B82F6 | 59, 130, 246 |
| Morado | #8B5CF6 | 139, 92, 246 |
| Rosa | #EC4899 | 236, 72, 153 |
| Negro | #0A0A0A | 10, 10, 10 |
| Blanco | #FFFFFF | 255, 255, 255 |

### Recursos Útiles

- [Google Fonts](https://fonts.google.com/) - Fuentes gratuitas
- [HTML Color Codes](https://htmlcolorcodes.com/) - Selector de colores
- [Unsplash](https://unsplash.com/) - Imágenes gratuitas
- [Heroicons](https://heroicons.com/) - Íconos SVG
- [Formspree](https://formspree.io/) - Formularios funcionales
- [Netlify](https://netlify.com/) - Hosting gratuito

---

## Soporte

Si tenés dudas o necesitás ayuda personalizada:

📧 Email: contacto@smartwebcr.com  
💬 WhatsApp: +506 8624 2972  
🌐 Web: smartwebcr.com

---

*Última actualización: Abril 2026*
