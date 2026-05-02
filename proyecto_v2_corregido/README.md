# Smart Web CR — Plantillas Web

## Estructura del proyecto

```
proyecto/
├── index.html                        ← Sitio principal (catálogo de plantillas)
├── favicon.ico / favicon-192.png / favicon-512.png
├── apple-touch-icon.png
├── robots.txt / sitemap.xml
│
├── css/
│   ├── main.css                      ← Estilos del sitio principal
│   ├── shopflow.css                  ← Estilos de ShopFlow
│   ├── devfolio-pro.css              ← Estilos de DevFolio Pro
│   ├── agencypro.css                 ← Estilos de AgencyPro
│   ├── saaskit.css                   ← Estilos de SaaSKit
│   ├── startup-hero.css              ← Estilos de Startup Hero
│   └── creativecanvas.css            ← Estilos de CreativeCanvas
│
├── js/
│   ├── main.js                       ← JS del sitio principal
│   ├── shopflow.js                   ← JS de ShopFlow
│   ├── devfolio-pro.js               ← JS de DevFolio Pro
│   ├── agencypro.js                  ← JS de AgencyPro
│   ├── saaskit.js                    ← JS de SaaSKit
│   ├── startup-hero.js               ← JS de Startup Hero
│   └── creativecanvas.js             ← JS de CreativeCanvas
│
├── imagenes/
│   ├── logo-smartwebcr.png
│   ├── andres.jpeg
│   └── david.jpeg
│
└── pages/
    ├── shopflow-index.html           ← ShopFlow: Home
    ├── shopflow-catalogo.html        ← ShopFlow: Catálogo
    ├── shopflow-producto.html        ← ShopFlow: Detalle de producto
    ├── devfolio-pro.html             ← DevFolio Pro: Portfolio
    ├── agencypro.html                ← AgencyPro: Landing
    ├── saaskit.html                  ← SaaSKit: Landing SaaS
    ├── startup-hero.html             ← Startup Hero: Landing
    └── creativecanvas.html           ← CreativeCanvas: Portfolio
```

## Cómo abrir en VS Code con Live Server

1. Abrí la carpeta `proyecto/` en VS Code
2. Click derecho en `index.html` → Open with Live Server
3. El sitio abre en http://127.0.0.1:5500

## Plantillas disponibles

| Plantilla | Tipo | Páginas | Precio |
|-----------|------|---------|--------|
| ShopFlow | E-commerce | 3 (home, catálogo, producto) | $49 |
| DevFolio Pro | Portfolio | 1 | $29 |
| AgencyPro | Landing Page | 1 | $39 |
| SaaSKit | SaaS Landing | 1 | Gratis |
| Startup Hero | Landing Page | 1 | $39 |
| CreativeCanvas | Portfolio | 1 | $35 |

## Personalizar una plantilla

### 1. Color de acento — en el CSS de la plantilla:
```css
--accent:     #F59E0B;   /* cambiá por el color del cliente */
--accent-rgb: 245,158,11; /* mismo color en RGB separado por comas */
```

### 2. Nombre y datos — en el JS de la plantilla:
```js
const STORE = {
  name:     'ShopFlow',          // nombre de la tienda
  email:    'hola@tienda.com',   // email de contacto
  whatsapp: '50600000000',       // número de WhatsApp
  logo:     '../imagenes/logo-smartwebcr.png', // ruta al logo
};
```

### 3. Logo — reemplazá `imagenes/logo.png` con el logo del cliente.

## Soporte

📧 Email: contacto@smartwebcr.com  
💬 WhatsApp: +506 8624 2972  
🌐 LinkedIn: [Smart Web CR](https://www.linkedin.com/company/112328530)
