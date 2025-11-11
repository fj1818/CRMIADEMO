# 📊 Ejemplo de Uso - Tabla de Clientes

## Estructura de Datos de Clientes

### Campos de la Tabla

```javascript
{
    id: 1,                              // Identificador único
    nombre: "Nombre del Cliente",       // Razón Social o Nombre
    rfc: "ABC123456XYZ",               // RFC (12 dígitos PM, 13 dígitos PF)
    celular: "55-1234-5678",           // Número de celular
    correo: "email@empresa.com",        // Correo electrónico
    fechaAlta: "2023-01-15",           // Fecha de alta del cliente
    ide: "IDE-2023-001",               // Identificador IDE
    idProspecto: "180123456789012345",  // ID de prospecto (18 dígitos)
    tipoPersona: "Persona Moral",       // Tipo de persona
    fechaBaja: null                     // Fecha de baja (null si está activo)
}
```

### Tipos de Persona

1. **Persona Moral (PM)**: RFC de 12 dígitos
   - Empresas, sociedades, asociaciones
   
2. **Persona Física con Actividad Empresarial (PFAE)**: RFC de 13 dígitos
   - Profesionistas independientes, negocios propios
   
3. **Persona Física (PF)**: RFC de 13 dígitos
   - Personas sin actividad empresarial

## 📈 Estadísticas Disponibles

```javascript
const stats = ClientesUtils.getEstadisticas();
// Retorna:
{
    total: 50,
    personasMorales: 25,
    personasFisicasConActividad: 15,
    personasFisicas: 10,
    clientesActivos: 45,
    clientesBaja: 5
}
```

## 🔍 Funciones de Consulta

### 1. Obtener Todos los Clientes
```javascript
const todosLosClientes = ClientesUtils.getTodos();
// Retorna array con 50 clientes
```

### 2. Obtener Solo Clientes Activos
```javascript
const activos = ClientesUtils.getActivos();
// Retorna 45 clientes activos
```

### 3. Obtener Clientes Dados de Baja
```javascript
const baja = ClientesUtils.getBaja();
// Retorna 5 clientes dados de baja
```

### 4. Buscar Cliente por ID
```javascript
const cliente = ClientesUtils.getPorId(5);
// Retorna el cliente con id 5
```

### 5. Filtrar por Tipo de Persona
```javascript
const personasMorales = ClientesUtils.getPorTipo("Persona Moral");
// Retorna 25 personas morales
```

### 6. Buscar por Nombre
```javascript
const resultados = ClientesUtils.buscarPorNombre("Constructora");
// Busca en nombres que contengan "Constructora"
```

### 7. Buscar por RFC
```javascript
const cliente = ClientesUtils.buscarPorRFC("CAZ890123BN5");
// Retorna el cliente con ese RFC
```

### 8. Filtrado Avanzado
```javascript
const filtrados = ClientesUtils.filtrar({
    tipoPersona: "Persona Moral",
    activo: true,
    fechaDesde: "2024-01-01",
    fechaHasta: "2024-12-31"
});
// Retorna clientes que cumplan todos los criterios
```

## 🎨 Componente de Tabla

### Ejemplo de Uso Básico

```javascript
const miTabla = new TableComponent({
    containerId: 'mi-contenedor',
    title: 'Lista de Clientes',
    data: ClientesUtils.getTodos(),
    columns: [
        {
            label: 'ID',
            field: 'id'
        },
        {
            label: 'Nombre',
            field: 'nombre'
        },
        {
            label: 'RFC',
            field: 'rfc'
        }
    ]
});

miTabla.init();
```

### Ejemplo con Formato Personalizado

```javascript
const miTabla = new TableComponent({
    containerId: 'mi-contenedor',
    title: 'Lista de Clientes',
    data: ClientesUtils.getTodos(),
    columns: [
        {
            label: 'ID',
            field: 'id',
            className: 'text-center'
        },
        {
            label: 'Nombre',
            field: 'nombre',
            className: 'table-cell-truncate'
        },
        {
            label: 'Estado',
            field: 'fechaBaja',
            render: (value) => {
                return value === null 
                    ? '<span class="badge badge-success">Activo</span>'
                    : '<span class="badge badge-danger">Baja</span>';
            }
        }
    ],
    searchable: true,      // Habilitar búsqueda
    filterable: true,      // Habilitar filtros
    paginated: true,       // Habilitar paginación
    pageSize: 10          // 10 registros por página
});

miTabla.init();
```

### Ejemplo con Acciones

```javascript
const miTabla = new TableComponent({
    containerId: 'mi-contenedor',
    data: ClientesUtils.getTodos(),
    columns: [...],
    actions: [
        {
            name: 'ver',
            label: 'Ver detalles',
            icon: '👁️',
            handler: (cliente) => {
                alert(`Ver detalles de: ${cliente.nombre}`);
            }
        },
        {
            name: 'editar',
            label: 'Editar',
            icon: '✏️',
            handler: (cliente) => {
                console.log('Editando:', cliente);
            }
        }
    ]
});

miTabla.init();
```

### Ejemplo con Filtros

```javascript
const miTabla = new TableComponent({
    containerId: 'mi-contenedor',
    data: ClientesUtils.getTodos(),
    columns: [...],
    filterable: true,
    filters: [
        {
            field: 'tipoPersona',
            label: 'Tipo',
            options: [
                { value: 'Persona Moral', label: 'Persona Moral' },
                { value: 'Persona Física', label: 'Persona Física' }
            ]
        }
    ]
});

miTabla.init();
```

## 🎯 Casos de Uso Comunes

### 1. Ver Solo Personas Morales
```javascript
const tabla = new TableComponent({
    containerId: 'tabla-pm',
    data: ClientesUtils.getPorTipo("Persona Moral"),
    columns: [...]
});
```

### 2. Ver Solo Clientes Activos
```javascript
const tabla = new TableComponent({
    containerId: 'tabla-activos',
    data: ClientesUtils.getActivos(),
    columns: [...]
});
```

### 3. Dashboard con Estadísticas
```javascript
// Obtener estadísticas
const stats = ClientesUtils.getEstadisticas();

// Renderizar tarjetas
document.getElementById('total-clientes').textContent = stats.total;
document.getElementById('activos').textContent = stats.clientesActivos;
document.getElementById('baja').textContent = stats.clientesBaja;
```

### 4. Actualizar Tabla Dinámicamente
```javascript
// Crear tabla
const miTabla = new TableComponent({
    containerId: 'mi-tabla',
    data: ClientesUtils.getActivos(),
    columns: [...]
});
miTabla.init();

// Más tarde, actualizar con nuevos datos
miTabla.setData(ClientesUtils.getTodos());
```

## 🔧 Personalización Avanzada

### Columnas con Funciones
```javascript
columns: [
    {
        label: 'Nombre Completo',
        field: (row) => {
            return `${row.nombre} (${row.rfc})`;
        }
    }
]
```

### Renderizado Condicional
```javascript
columns: [
    {
        label: 'Tipo',
        field: 'tipoPersona',
        render: (value, row) => {
            const color = row.fechaBaja ? 'gray' : 'green';
            return `<span style="color: ${color}">${value}</span>`;
        }
    }
]
```

## 📝 Datos de Ejemplo

El sistema incluye **50 clientes de ejemplo**:
- ✅ **25 Personas Morales** (Empresas)
- ✅ **15 Personas Físicas con Actividad Empresarial**
- ✅ **10 Personas Físicas**
- ✅ **45 Clientes Activos**
- ✅ **5 Clientes Dados de Baja**

### Ejemplos de Clientes

**Persona Moral:**
```javascript
{
    id: 1,
    nombre: "Constructora Azteca S.A. de C.V.",
    rfc: "CAZ890123BN5",  // 12 dígitos
    tipoPersona: "Persona Moral"
}
```

**Persona Física con Actividad Empresarial:**
```javascript
{
    id: 26,
    nombre: "Juan Carlos Martínez López",
    rfc: "MALJ850615HM3",  // 13 dígitos
    tipoPersona: "Persona Física con Actividad Empresarial"
}
```

**Persona Física:**
```javascript
{
    id: 41,
    nombre: "Sofía Alejandra Ríos Campos",
    rfc: "ROCS930615OP4",  // 13 dígitos
    tipoPersona: "Persona Física"
}
```

## 🚀 Ver en Acción

1. Abre `index.html` en tu navegador
2. Navega a la sección **"Mi Cartera"**
3. Verás:
   - 6 tarjetas de estadísticas
   - Tabla completa con 50 clientes
   - Búsqueda en tiempo real
   - Filtros por tipo de persona
   - Paginación (10 registros por página)
   - Acciones: Ver, Editar, Eliminar

## 💡 Tips

- Usa `Helpers.formatDate()` para formatear fechas
- Usa `Helpers.formatCurrency()` para montos
- Usa `Validators.isValidRFC()` para validar RFCs
- La tabla es completamente responsive
- Todos los datos están en `js/data/clientes.js`
- Puedes agregar más clientes fácilmente al array

---

**¡Tu tabla está lista para usar!** 🎉

