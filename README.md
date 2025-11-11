# 🤖 CRM IA - Sistema de Gestión Inteligente

Sistema CRM modular y escalable con interfaz moderna, diseñado para ser migrado a Google Apps Script.

## 📁 Estructura del Proyecto

```
CRMIADEMO/
│
├── index.html                 # Archivo HTML principal
│
├── config/                    # Archivos de configuración
│   ├── config.js             # Configuración global de la aplicación
│   └── routes.js             # Definición de rutas y secciones
│
├── css/                       # Estilos CSS modulares
│   ├── main.css              # Archivo principal que importa todos los CSS
│   ├── variables.css         # Variables CSS (colores, espaciados, etc.)
│   ├── reset.css             # Reset y configuración base
│   ├── responsive.css        # Media queries para responsive
│   ├── utilities.css         # Clases de utilidad
│   │
│   ├── layout/               # Estilos de layout
│   │   ├── navbar.css        # Barra de navegación
│   │   └── main.css          # Layout principal y secciones
│   │
│   └── components/           # Componentes reutilizables
│       ├── cards.css         # Tarjetas
│       ├── buttons.css       # Botones
│       └── construction.css  # Mensaje de construcción
│
└── js/                        # JavaScript modular
    ├── app.js                # Aplicación principal (punto de entrada)
    │
    ├── modules/              # Módulos de cada sección
    │   ├── navigation.js     # Sistema de navegación
    │   ├── inicio.js         # Módulo de Inicio
    │   ├── prospectos.js     # Módulo de Prospectos
    │   ├── oportunidades.js  # Módulo de Oportunidades
    │   ├── miCartera.js      # Módulo de Mi Cartera
    │   └── misAcciones.js    # Módulo de Mis Acciones
    │
    └── utils/                # Utilidades
        ├── helpers.js        # Funciones de ayuda
        └── validators.js     # Funciones de validación
```

## 🎨 Paleta de Colores

- **Principal**: `#FF8000` (Naranja corporativo)
- **Secundarios**: Blanco, Negro, Grises suaves
- Diseño mate y profesional

## 🚀 Características

### Arquitectura Modular
- ✅ Código dividido en módulos independientes
- ✅ Fácil mantenimiento y escalabilidad
- ✅ Preparado para migración a Apps Script
- ✅ Cada módulo tiene responsabilidad única

### Navegación
- 5 secciones principales:
  - 🏠 **Inicio**: Dashboard principal
  - 👥 **Prospectos**: Gestión de clientes potenciales
  - 💼 **Oportunidades**: Seguimiento de negocios
  - 📊 **Mi Cartera**: Análisis de cartera
  - ✅ **Mis Acciones**: Tareas y actividades

### Diseño Responsive
- Adaptable a móviles, tablets y desktop
- Animaciones suaves
- UI moderna y profesional

## 📦 Módulos JavaScript

### 1. Configuración (`config/`)
- `config.js`: Variables globales, colores, API settings
- `routes.js`: Definición de todas las secciones

### 2. Utilidades (`js/utils/`)
- `helpers.js`: Funciones de ayuda (formato de fechas, moneda, etc.)
- `validators.js`: Validación de datos (email, teléfono, RFC, etc.)

### 3. Módulos de Secciones (`js/modules/`)
Cada sección tiene su propio módulo con:
- `init()`: Inicialización del módulo
- `onEnter()`: Callback al entrar a la sección
- `onLeave()`: Callback al salir de la sección
- Métodos específicos de cada sección

### 4. Aplicación Principal (`js/app.js`)
- Coordina todos los módulos
- Inicializa la aplicación
- Verifica dependencias
- Exporta todo para Apps Script

## 🔧 Cómo Usar

### Desarrollo Local
1. Abre `index.html` en tu navegador
2. La aplicación se inicializa automáticamente
3. Navega entre secciones usando el menú superior

### Agregar Nueva Funcionalidad
1. Identifica el módulo correspondiente
2. Agrega tus funciones en el módulo específico
3. El código permanece organizado y modular

### Ejemplo: Agregar función en Prospectos
```javascript
// En js/modules/prospectos.js
buscarProspecto(nombre) {
    return this.prospectos.filter(p => p.nombre.includes(nombre));
}
```

## 📝 Orden de Carga

### CSS
1. Variables y configuración base
2. Layout (navbar, main)
3. Componentes (cards, buttons, etc.)
4. Utilidades
5. Responsive (al final)

### JavaScript
1. Archivos de configuración
2. Utilidades (helpers, validators)
3. Módulos de navegación y secciones
4. Aplicación principal (al final)

## 🔄 Migración a Apps Script

El código está preparado para Apps Script:

1. **Todos los módulos son autocontenidos**
2. **Sin dependencias externas**
3. **Estructura clara de archivos**
4. **Exportación limpia mediante `window.CRM`**

### Exportaciones Disponibles
```javascript
window.CRM = {
    App: CRMApp,
    Navigation: NavigationModule,
    Modules: { ... },
    Utils: { ... },
    Config: CONFIG,
    Routes: ROUTES
};
```

## 📊 Tablas Implementadas

### 1. Tabla de Clientes ✅

#### Datos Incluidos
- ✅ **50 clientes de ejemplo** con datos realistas
- ✅ **25 Personas Morales** (RFC 12 dígitos)
- ✅ **15 Personas Físicas con Actividad Empresarial** (RFC 13 dígitos)
- ✅ **10 Personas Físicas** (RFC 13 dígitos)
- ✅ **5 clientes dados de baja**

#### Campos por Cliente
- ID único
- Nombre / Razón Social
- RFC (validado por tipo)
- Celular
- Correo electrónico
- Fecha de alta
- IDE
- ID de Prospecto (18 dígitos)
- Tipo de persona
- Fecha de baja (null si activo)

Ver ejemplos de uso en: `EJEMPLO_USO_TABLA.md`

### 2. Tabla de Productos Bancarios ✅

#### Datos Incluidos
- ✅ **50 productos bancarios** relacionados con clientes
- ✅ **13 familias de productos** (Nómina, Tarjetas, Créditos, Seguros, TPV, etc.)
- ✅ **2 productos dados de baja**
- ✅ **Productos específicos por tipo de cliente**

#### Familias de Productos
1. **Nómina** - Cuentas de nómina
2. **Tarjeta de Crédito** - Gold, Platinum, Clásica
3. **Tarjeta de Crédito Empresarial** - Business Elite, Corporate
4. **Crédito Negocios** - Capital de trabajo, refaccionario
5. **Crédito Hipotecario** - Hogar, inversión
6. **Crédito Auto** - Financiamiento automotriz
7. **Seguro Auto** - Cobertura amplia, básica
8. **Seguro Hogar** - Protección integral
9. **Seguro Vida** - Protección total
10. **Crédito Personal** - Rápido, express
11. **TPV** - Terminales punto de venta
12. **Cuenta de Cheques** - Personal y empresarial
13. **Banca Electrónica** - Móvil y digital

#### Campos por Producto
- ID de registro
- IDE del cliente (relacionado)
- Familia de producto
- Nombre del producto
- Número de línea
- Monto de línea
- Fecha de alta/baja
- Tasa de interés (si aplica)
- Monto de deuda (si aplica)
- Plazo total/restante (si aplica)

Ver ejemplos de uso en: `EJEMPLO_USO_PRODUCTOS.md`

### Funcionalidades de las Tablas
- 🔍 **Búsqueda en tiempo real** (arreglada - permite escribir completo)
- 🎯 **Filtros dinámicos con valores por defecto**
  - Filtro por estado (Activos por defecto)
  - Filtro por tipo de persona
  - Filtro por familia de producto (busca clientes con esos productos)
- 📄 **Paginación** (10 registros por página)
- 📊 **Estadísticas visuales**
- 👁️ **Ver detalles completos** (cliente + productos + deuda)
- 📱 **Completamente responsive**
- 🔗 **Relación entre clientes y productos**
- 🔒 **Sin edición/eliminación** (solo lectura para proteger datos)

## 🎯 Próximos Pasos

1. ✅ ~~Desarrollar tabla de clientes~~ **COMPLETADO**
2. ✅ ~~Desarrollar tabla de productos bancarios~~ **COMPLETADO**
3. ✅ ~~Relacionar clientes con productos~~ **COMPLETADO**
4. ✅ ~~Rediseñar sección Mi Cartera con filtros avanzados~~ **COMPLETADO**
5. ✅ ~~Arreglar búsqueda en tablas~~ **COMPLETADO**
6. Implementar formularios de alta/edición
7. Desarrollar secciones de Prospectos y Oportunidades
8. Integrar con fuente de datos (localStorage/Google Sheets)
9. Implementar funcionalidad de IA
10. Agregar sistema de notificaciones
11. Implementar guardado automático
12. Migrar a Google Apps Script

## 💡 Buenas Prácticas

- ✅ Un archivo = Una responsabilidad
- ✅ Nombres descriptivos y claros
- ✅ Comentarios en español
- ✅ Código documentado
- ✅ Estructura consistente
- ✅ Fácil de mantener y escalar

## 🐛 Debugging

Abre la consola del navegador para ver:
- Logs de inicialización
- Navegación entre secciones
- Errores si los hay

## 📄 Licencia

Proyecto interno - Todos los derechos reservados

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025

