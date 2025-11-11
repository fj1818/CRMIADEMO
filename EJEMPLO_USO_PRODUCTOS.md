# 💼 Guía de Uso - Tabla de Productos Bancarios

## Estructura de Datos de Productos

### Campos de la Tabla

```javascript
{
    idRegistro: 1,                          // ID único del producto
    ide: "IDE-2023-001",                   // IDE del cliente (relacionado)
    familiaProducto: "Cuenta de Cheques",   // Familia del producto
    nombreProducto: "Cuenta Premium",       // Nombre específico
    numeroLinea: "4152-8901-2345-6789",    // Número de línea/cuenta
    montoLinea: 500000,                    // Monto de la línea (si aplica)
    fechaAlta: "2023-01-20",              // Fecha de alta
    fechaBaja: null,                       // Fecha de baja (null = activo)
    tasa: null,                            // Tasa de interés % (si aplica)
    montoDeuda: null,                      // Monto adeudado (si aplica)
    plazoTotal: null,                      // Plazo total en meses (si aplica)
    plazoRestante: null                    // Plazo restante en meses (si aplica)
}
```

## 🏦 Familias de Productos

### 1. **Nómina** 
- **Aplica tasa**: ❌ No
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ❌ No
- **Clientes**: PF, PFAE
- **Ejemplo**: "Cuenta Nómina Preferente"

### 2. **Tarjeta de Crédito**
- **Aplica tasa**: ✅ Sí (22-28%)
- **Aplica deuda**: ✅ Sí
- **Aplica plazo**: ❌ No (revolving)
- **Clientes**: PF, PFAE
- **Ejemplos**: "Tarjeta Gold", "Tarjeta Platinum", "Tarjeta Clásica"

### 3. **Tarjeta de Crédito Empresarial**
- **Aplica tasa**: ✅ Sí (17-20%)
- **Aplica deuda**: ✅ Sí
- **Aplica plazo**: ❌ No (revolving)
- **Clientes**: PM, PFAE
- **Ejemplos**: "Tarjeta Business Elite", "Tarjeta Corporate Gold"

### 4. **Crédito Negocios**
- **Aplica tasa**: ✅ Sí (10-14%)
- **Aplica deuda**: ✅ Sí
- **Aplica plazo**: ✅ Sí (48-120 meses)
- **Clientes**: PM, PFAE
- **Ejemplos**: "Crédito Capital de Trabajo", "Crédito Empresarial Constructor"

### 5. **Crédito Hipotecario**
- **Aplica tasa**: ✅ Sí (10-12%)
- **Aplica deuda**: ✅ Sí
- **Aplica plazo**: ✅ Sí (120-240 meses)
- **Clientes**: PF, PFAE
- **Ejemplo**: "Crédito Hipotecario Hogar"

### 6. **Crédito Auto**
- **Aplica tasa**: ✅ Sí (15-18%)
- **Aplica deuda**: ✅ Sí
- **Aplica plazo**: ✅ Sí (36-60 meses)
- **Clientes**: PF, PFAE
- **Ejemplo**: "Crédito Automotriz Premium"

### 7. **Seguro Auto**
- **Aplica tasa**: ❌ No
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ✅ Sí (12 meses - anual)
- **Clientes**: PF, PFAE, PM
- **Ejemplo**: "Seguro Auto Cobertura Amplia"

### 8. **Seguro Hogar**
- **Aplica tasa**: ❌ No
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ✅ Sí (12 meses - anual)
- **Clientes**: PF, PFAE
- **Ejemplo**: "Seguro Hogar Protección Integral"

### 9. **Seguro Vida**
- **Aplica tasa**: ❌ No
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ✅ Sí (120-240 meses)
- **Clientes**: PF, PFAE
- **Ejemplo**: "Seguro Vida Protección Total"

### 10. **Crédito Personal**
- **Aplica tasa**: ✅ Sí (28-35%)
- **Aplica deuda**: ✅ Sí
- **Aplica plazo**: ✅ Sí (12-36 meses)
- **Clientes**: PF, PFAE
- **Ejemplo**: "Crédito Personal Rápido"

### 11. **TPV (Terminal Punto de Venta)**
- **Aplica tasa**: ✅ Sí (2-3% comisión)
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ❌ No
- **Clientes**: PM, PFAE
- **Ejemplo**: "Terminal POS Smart"

### 12. **Cuenta de Cheques**
- **Aplica tasa**: ❌ No
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ❌ No
- **Clientes**: PF, PFAE, PM
- **Ejemplos**: "Cuenta Personal Plus", "Cuenta Empresarial Premium"

### 13. **Banca Electrónica**
- **Aplica tasa**: ❌ No
- **Aplica deuda**: ❌ No
- **Aplica plazo**: ❌ No
- **Clientes**: PF, PFAE, PM
- **Ejemplo**: "Banca Móvil Premium"

## 📊 Estadísticas de Productos

```javascript
const stats = ProductosUtils.getEstadisticas();
// Retorna:
{
    total: 50,                          // Total de productos
    productosActivos: 48,               // Productos activos
    productosBaja: 2,                   // Productos dados de baja
    totalLineas: 52850000,              // Suma total de líneas
    totalDeuda: 35680000,               // Suma total de deudas
    porFamilia: {                       // Productos por familia
        "Cuenta de Cheques": 8,
        "Crédito Negocios": 7,
        // ... etc
    }
}
```

## 🔍 Funciones de Consulta

### 1. Obtener Todos los Productos
```javascript
const todos = ProductosUtils.getTodos();
// Retorna array con 50 productos
```

### 2. Obtener Solo Productos Activos
```javascript
const activos = ProductosUtils.getActivos();
// Retorna 48 productos activos
```

### 3. Obtener Productos Dados de Baja
```javascript
const baja = ProductosUtils.getBaja();
// Retorna 2 productos dados de baja
```

### 4. Obtener Productos por IDE de Cliente
```javascript
const productos = ProductosUtils.getPorIDE("IDE-2023-001");
// Retorna todos los productos del cliente con ese IDE
```

### 5. Obtener Productos por Familia
```javascript
const tarjetas = ProductosUtils.getPorFamilia("Tarjeta de Crédito");
// Retorna todas las tarjetas de crédito
```

### 6. Obtener Producto por ID
```javascript
const producto = ProductosUtils.getPorId(5);
// Retorna el producto con idRegistro 5
```

### 7. Obtener Productos con Deuda
```javascript
const conDeuda = ProductosUtils.getConDeuda();
// Retorna productos que tienen saldo adeudado
```

### 8. Obtener Productos Por Vencer
```javascript
const porVencer = ProductosUtils.getPorVencer();
// Retorna productos con plazo restante <= 6 meses
```

### 9. Calcular Deuda Total de un Cliente
```javascript
const deudaTotal = ProductosUtils.getDeudaTotalPorIDE("IDE-2023-001");
// Retorna la suma de todas las deudas del cliente
```

### 10. Filtrado Avanzado
```javascript
const filtrados = ProductosUtils.filtrar({
    familiaProducto: "Crédito Negocios",
    ide: "IDE-2023-001",
    activo: true,
    conDeuda: true
});
// Retorna productos que cumplan todos los criterios
```

### 11. Obtener Familias de Productos
```javascript
const familias = ProductosUtils.getFamilias();
// Retorna objeto con definición de todas las familias
```

## 💡 Ejemplos de Uso

### Ejemplo 1: Dashboard de Cliente
```javascript
// Obtener cliente
const cliente = ClientesUtils.getPorId(1);

// Obtener sus productos
const productos = ProductosUtils.getPorIDE(cliente.ide);

// Calcular su deuda total
const deudaTotal = ProductosUtils.getDeudaTotalPorIDE(cliente.ide);

console.log(`${cliente.nombre} tiene ${productos.length} productos`);
console.log(`Deuda total: ${Helpers.formatCurrency(deudaTotal)}`);
```

### Ejemplo 2: Productos por Vencer
```javascript
const porVencer = ProductosUtils.getPorVencer();

porVencer.forEach(producto => {
    const cliente = ClientesUtils.getTodos().find(c => c.ide === producto.ide);
    console.log(`${producto.nombreProducto} de ${cliente.nombre} vence en ${producto.plazoRestante} meses`);
});
```

### Ejemplo 3: Reporte de Cartera
```javascript
const creditosActivos = ProductosUtils.filtrar({
    familiaProducto: "Crédito Negocios",
    activo: true,
    conDeuda: true
});

const totalCartera = creditosActivos.reduce((sum, p) => sum + p.montoDeuda, 0);

console.log(`Total en cartera de Crédito Negocios: ${Helpers.formatCurrency(totalCartera)}`);
```

### Ejemplo 4: Tabla Personalizada
```javascript
const tabla = new TableComponent({
    containerId: 'mi-tabla',
    title: 'Créditos con Mayor Deuda',
    data: ProductosUtils.getConDeuda()
        .sort((a, b) => b.montoDeuda - a.montoDeuda)
        .slice(0, 10),
    columns: [
        {
            label: 'Cliente',
            field: (row) => {
                const cliente = ClientesUtils.getTodos().find(c => c.ide === row.ide);
                return cliente ? cliente.nombre : 'N/A';
            }
        },
        {
            label: 'Producto',
            field: 'nombreProducto'
        },
        {
            label: 'Deuda',
            field: 'montoDeuda',
            render: (value) => Helpers.formatCurrency(value)
        }
    ]
});

tabla.init();
```

## 📈 Relación con Clientes

### Productos por Tipo de Cliente

**Personas Morales (PM):**
- Cuenta de Cheques Empresarial
- Tarjeta de Crédito Empresarial
- Crédito Negocios
- TPV
- Banca Electrónica
- Seguro Auto (flotillas)

**Personas Físicas con Actividad Empresarial (PFAE):**
- Todos los productos de PM
- Todos los productos de PF
- Mezcla de ambos según necesidades

**Personas Físicas (PF):**
- Nómina
- Cuenta de Cheques Personal
- Tarjeta de Crédito
- Crédito Personal
- Crédito Auto
- Crédito Hipotecario
- Seguros (Auto, Hogar, Vida)
- Banca Electrónica

### Ejemplo: Ver Productos de un Cliente
```javascript
// Seleccionar un cliente
const cliente = ClientesUtils.getPorId(1);

// Obtener sus productos
const productos = ProductosUtils.getPorIDE(cliente.ide);

// Mostrar resumen
console.log(`Cliente: ${cliente.nombre}`);
console.log(`Tipo: ${cliente.tipoPersona}`);
console.log(`Productos contratados: ${productos.length}`);

productos.forEach(p => {
    console.log(`- ${p.nombreProducto} (${p.familiaProducto})`);
});
```

## 🎯 Casos de Uso Bancarios

### 1. Alertas de Vencimiento
```javascript
const alertas = ProductosUtils.getPorVencer().map(p => {
    const cliente = ClientesUtils.getTodos().find(c => c.ide === p.ide);
    return {
        cliente: cliente.nombre,
        producto: p.nombreProducto,
        mesesRestantes: p.plazoRestante,
        tipo: p.familiaProducto
    };
});

// Enviar alertas...
```

### 2. Análisis de Cartera de Crédito
```javascript
const creditos = ProductosUtils.getTodos().filter(p => 
    p.familiaProducto.includes('Crédito') && p.montoDeuda > 0
);

const analisis = {
    totalCreditos: creditos.length,
    carteraTotal: creditos.reduce((sum, p) => sum + p.montoDeuda, 0),
    carteraVigente: creditos.reduce((sum, p) => sum + p.montoLinea, 0),
    promedioTasa: creditos.reduce((sum, p) => sum + (p.tasa || 0), 0) / creditos.length
};

console.log('Análisis de Cartera:', analisis);
```

### 3. Productos Más Populares
```javascript
const stats = ProductosUtils.getEstadisticas();

const ranking = Object.entries(stats.porFamilia)
    .sort((a, b) => b[1] - a[1])
    .map(([familia, cantidad]) => ({
        familia,
        cantidad
    }));

console.log('Top Productos:', ranking);
```

### 4. Clientes con Mayor Endeudamiento
```javascript
const clientesConDeuda = ClientesUtils.getActivos().map(cliente => ({
    nombre: cliente.nombre,
    deuda: ProductosUtils.getDeudaTotalPorIDE(cliente.ide),
    ide: cliente.ide
}))
.filter(c => c.deuda > 0)
.sort((a, b) => b.deuda - a.deuda)
.slice(0, 10);

console.log('Top 10 Deudores:', clientesConDeuda);
```

## 🚀 Ver en Acción

1. **Abre** `index.html` en tu navegador
2. **Dashboard (Inicio)**: Verás:
   - 6 tarjetas con estadísticas generales
   - Tabla de productos activos recientes
   - Filtros por familia de producto
   - Búsqueda en tiempo real

3. **Mi Cartera**: Verás:
   - Tabla completa de clientes
   - Al hacer clic en "Ver detalles" de un cliente, puedes ver sus productos

## 📝 Datos Incluidos

- ✅ **50 productos bancarios**
- ✅ **Distribuidos entre 20 clientes**
- ✅ **13 familias de productos**
- ✅ **2 productos dados de baja**
- ✅ **Productos realistas según tipo de cliente**
- ✅ **Tasas de interés reales del mercado**
- ✅ **Plazos y montos coherentes**

## 💰 Rangos de Valores

| Concepto | Rango |
|----------|-------|
| **Tasas de Interés** | 10% - 35% según producto |
| **Montos de Línea** | $20,000 - $15,000,000 |
| **Montos de Deuda** | $0 - $13,500,000 |
| **Plazos Totales** | 12 - 240 meses |
| **Plazos Restantes** | 3 - 228 meses |

## 🔗 Integración con Clientes

Todos los productos están vinculados a clientes existentes mediante el campo `ide`:

```javascript
// Ejemplo: Cliente y sus productos
const cliente = ClientesUtils.buscarPorRFC("CAZ890123BN5");
const productos = ProductosUtils.getPorIDE(cliente.ide);

console.log(`${cliente.nombre} tiene estos productos:`);
productos.forEach(p => {
    console.log(`- ${p.nombreProducto}`);
});
```

---

**¡Tu sistema de productos bancarios está completamente funcional!** 🏦✨
