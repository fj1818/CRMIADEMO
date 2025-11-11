# 🏗️ Arquitectura del Sistema CRM IA

## 📐 Principios de Diseño

### 1. Modularidad
Cada componente es independiente y autocontenido. Esto permite:
- Desarrollo paralelo por múltiples personas
- Fácil mantenimiento y debugging
- Reutilización de código
- Escalabilidad sin límites

### 2. Separación de Responsabilidades
- **Config**: Configuración y constantes
- **CSS**: Presentación y estilos
- **JS**: Lógica y funcionalidad
- **HTML**: Estructura y contenido

### 3. Código Limpio
- Nombres descriptivos en español
- Comentarios claros
- Funciones pequeñas y específicas
- Sin duplicación de código

## 🔧 Cómo Agregar un Nuevo Módulo

### Paso 1: Crear el archivo del módulo
```javascript
// js/modules/nuevoModulo.js

class NuevoModuloModule {
    constructor() {
        this.sectionId = 'nuevo-modulo';
        this.container = null;
        this.datos = [];
    }

    init() {
        this.container = document.getElementById(this.sectionId);
        Helpers.log('Nuevo Módulo inicializado', 'success');
    }

    onEnter() {
        Helpers.log('Entrando a Nuevo Módulo', 'info');
        // Cargar datos cuando se entra a la sección
    }

    onLeave() {
        Helpers.log('Saliendo de Nuevo Módulo', 'info');
        // Limpiar o guardar cuando se sale
    }

    // Tus métodos específicos aquí
    cargarDatos() {
        // Implementación
    }
}

window.NuevoModuloModule = NuevoModuloModule;
```

### Paso 2: Agregar ruta en config/routes.js
```javascript
'nuevo-modulo': {
    id: 'nuevo-modulo',
    name: 'Nuevo Módulo',
    icon: '🆕',
    description: 'Descripción del nuevo módulo',
    module: 'NuevoModuloModule'
}
```

### Paso 3: Agregar sección en HTML
```html
<section id="nuevo-modulo" class="content-section">
    <div class="section-header">
        <h1>Nuevo Módulo</h1>
        <p class="section-subtitle">Descripción</p>
    </div>
    <!-- Contenido aquí -->
</section>
```

### Paso 4: Agregar enlace de navegación
```html
<li class="nav-item">
    <a href="#" class="nav-link" data-section="nuevo-modulo">
        <span class="nav-icon">🆕</span>
        <span>Nuevo Módulo</span>
    </a>
</li>
```

### Paso 5: Importar el script
```html
<script src="js/modules/nuevoModulo.js"></script>
```

## 🎨 Cómo Agregar Nuevos Estilos

### Opción 1: Crear nuevo archivo de componente
```css
/* css/components/nuevoComponente.css */

.nuevo-componente {
    /* Estilos aquí */
}
```

Luego importar en `css/main.css`:
```css
@import url('components/nuevoComponente.css');
```

### Opción 2: Usar archivo existente
Si el estilo es parte de un componente existente, agrégalo al archivo correspondiente.

### Opción 3: Usar clases de utilidad
Usa las clases predefinidas en `css/utilities.css`:
```html
<div class="d-flex justify-between align-center p-3">
    <!-- Contenido -->
</div>
```

## 📊 Flujo de Datos

```
Usuario Interactúa
    ↓
Navegación (navigation.js)
    ↓
Módulo Específico (inicio.js, prospectos.js, etc.)
    ↓
Utilidades (helpers.js, validators.js)
    ↓
Configuración (config.js, routes.js)
```

## 🔄 Ciclo de Vida de un Módulo

```javascript
1. Constructor
   - Se ejecuta al crear la instancia
   - Inicializa propiedades

2. init()
   - Se ejecuta al cargar la primera vez
   - Configura elementos del DOM
   - Prepara el módulo

3. onEnter()
   - Se ejecuta cada vez que se navega a la sección
   - Cargar datos frescos
   - Actualizar la UI

4. [Usuario interactúa con la sección]
   - Métodos personalizados del módulo

5. onLeave()
   - Se ejecuta al salir de la sección
   - Guardar cambios
   - Limpiar recursos
```

## 🗂️ Organización de Archivos

### CSS
```
css/
├── main.css              → Importa todo
├── variables.css         → Solo variables
├── reset.css             → Solo reset
├── layout/               → Estructura general
│   ├── navbar.css       → Solo navbar
│   └── main.css         → Solo layout principal
├── components/           → Componentes reutilizables
│   ├── cards.css        → Solo tarjetas
│   ├── buttons.css      → Solo botones
│   └── ...
├── utilities.css         → Clases de utilidad
└── responsive.css        → Media queries
```

### JavaScript
```
js/
├── app.js                → Coordina todo
├── modules/              → Lógica por sección
│   ├── navigation.js    → Navegación
│   ├── inicio.js        → Dashboard
│   └── ...
└── utils/                → Herramientas compartidas
    ├── helpers.js       → Funciones generales
    └── validators.js    → Validaciones
```

### Config
```
config/
├── config.js             → Variables globales
└── routes.js             → Definición de secciones
```

## 🎯 Mejores Prácticas

### ✅ HACER

1. **Un archivo = Una responsabilidad**
   ```javascript
   // Bien: prospectos.js solo maneja prospectos
   class ProspectosModule { ... }
   ```

2. **Usar configuración centralizada**
   ```javascript
   // Bien: Usar CONFIG
   const color = CONFIG.colors.primaryOrange;
   
   // Mal: Hardcodear valores
   const color = '#FF8000';
   ```

3. **Validar antes de procesar**
   ```javascript
   if (!Validators.isValidEmail(email)) {
       Helpers.log('Email inválido', 'error');
       return;
   }
   ```

4. **Usar helpers para operaciones comunes**
   ```javascript
   const fecha = Helpers.formatDate(new Date());
   const precio = Helpers.formatCurrency(1500);
   ```

5. **Documentar funciones importantes**
   ```javascript
   /**
    * Busca prospectos por nombre
    * @param {string} nombre - Nombre a buscar
    * @returns {Array} Prospectos encontrados
    */
   buscarPorNombre(nombre) { ... }
   ```

### ❌ EVITAR

1. **Código duplicado**
   ```javascript
   // Mal: Misma lógica en varios lugares
   // Crear una función en helpers.js
   ```

2. **Funciones demasiado largas**
   ```javascript
   // Mal: Función de 200 líneas
   // Dividir en funciones más pequeñas
   ```

3. **Variables globales sin organizar**
   ```javascript
   // Mal: window.miVariable = ...
   // Usar CONFIG o crear namespace
   ```

4. **Hardcodear valores**
   ```javascript
   // Mal: if (estado === 'activo') { ... }
   // Usar CONFIG.estados.ACTIVO
   ```

5. **Ignorar errores**
   ```javascript
   // Mal: try { ... } catch(e) { }
   // Siempre manejar errores apropiadamente
   ```

## 🔐 Preparación para Apps Script

### Variables de Entorno
Separar configuración por ambiente:
```javascript
const CONFIG = {
    app: {
        environment: 'development' // o 'production'
    },
    api: {
        baseUrl: environment === 'production' 
            ? 'https://script.google.com/...' 
            : 'http://localhost'
    }
};
```

### Funciones Asíncronas
Preparar para comunicación con servidor:
```javascript
async cargarProspectos() {
    try {
        // En local: cargar de localStorage
        // En Apps Script: google.script.run
        const datos = await this.fetchData();
        this.prospectos = datos;
    } catch (error) {
        Helpers.log('Error al cargar', 'error');
    }
}
```

### Estructura de Datos
Definir esquemas claros:
```javascript
const SCHEMAS = {
    prospecto: {
        id: 'string',
        nombre: 'string',
        email: 'string',
        telefono: 'string',
        fechaCreacion: 'date',
        estado: 'string'
    }
};
```

## 📈 Escalabilidad

Este sistema está diseñado para crecer:

- ✅ Agregar nuevas secciones sin modificar código existente
- ✅ Múltiples desarrolladores trabajando simultáneamente
- ✅ Fácil debugging por módulos independientes
- ✅ Testing modular
- ✅ Migración gradual a Apps Script

## 🎓 Recursos Adicionales

- Ver `README.md` para estructura general
- Revisar `config/` para configuración
- Explorar `js/utils/` para funciones disponibles
- Consultar componentes en `css/components/`

---

**Recuerda**: Un código bien organizado ahora te ahorrará horas de dolor después. 🚀

