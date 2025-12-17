/**
 * ============================================
 * DATOS DE VARIACIONES DE CLIENTES
 * ============================================
 * Registro de variaciones en cuentas y productos
 */

const VARIACIONES_DATA = [
    {
        id: "VAR001",
        cliente: "Grupo Industrial Monterrey",
        variacion: "+$850,000",
        variacionNumero: 850000,
        tipo: "incremento",
        fechaVariacion: "2024-12-02",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR002",
        cliente: "Transportes del Norte SA",
        variacion: "-$320,000",
        variacionNumero: -320000,
        tipo: "decremento",
        fechaVariacion: "2024-12-03",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR003",
        cliente: "Comercializadora Regio",
        variacion: "+$1,200,000",
        variacionNumero: 1200000,
        tipo: "incremento",
        fechaVariacion: "2024-12-04",
        producto: "Crédito"
    },
    {
        id: "VAR004",
        cliente: "Alimentos del Bajío",
        variacion: "-$150,000",
        variacionNumero: -150000,
        tipo: "decremento",
        fechaVariacion: "2024-12-05",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR005",
        cliente: "Constructora Nuevo León",
        variacion: "+$2,500,000",
        variacionNumero: 2500000,
        tipo: "incremento",
        fechaVariacion: "2024-12-06",
        producto: "Crédito"
    },
    {
        id: "VAR006",
        cliente: "Servicios Logísticos MX",
        variacion: "+$430,000",
        variacionNumero: 430000,
        tipo: "incremento",
        fechaVariacion: "2024-12-09",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR007",
        cliente: "Farmacéutica del Centro",
        variacion: "-$780,000",
        variacionNumero: -780000,
        tipo: "decremento",
        fechaVariacion: "2024-12-10",
        producto: "Crédito"
    },
    {
        id: "VAR008",
        cliente: "Grupo Industrial Monterrey",
        variacion: "+$1,100,000",
        variacionNumero: 1100000,
        tipo: "incremento",
        fechaVariacion: "2024-12-11",
        producto: "Crédito"
    },
    {
        id: "VAR009",
        cliente: "Textiles Premium SA",
        variacion: "-$95,000",
        variacionNumero: -95000,
        tipo: "decremento",
        fechaVariacion: "2024-12-12",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR010",
        cliente: "Agroindustrias del Valle",
        variacion: "+$670,000",
        variacionNumero: 670000,
        tipo: "incremento",
        fechaVariacion: "2024-12-13",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR011",
        cliente: "Tecnología Avanzada MX",
        variacion: "+$3,200,000",
        variacionNumero: 3200000,
        tipo: "incremento",
        fechaVariacion: "2024-12-16",
        producto: "Crédito"
    },
    {
        id: "VAR012",
        cliente: "Distribuidora Nacional",
        variacion: "-$420,000",
        variacionNumero: -420000,
        tipo: "decremento",
        fechaVariacion: "2024-12-17",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR013",
        cliente: "Energéticos del Golfo",
        variacion: "+$890,000",
        variacionNumero: 890000,
        tipo: "incremento",
        fechaVariacion: "2024-12-17",
        producto: "Crédito"
    },
    {
        id: "VAR014",
        cliente: "Comercializadora Regio",
        variacion: "+$560,000",
        variacionNumero: 560000,
        tipo: "incremento",
        fechaVariacion: "2024-12-16",
        producto: "Cuenta cheques"
    },
    {
        id: "VAR015",
        cliente: "Plásticos Industriales SA",
        variacion: "-$210,000",
        variacionNumero: -210000,
        tipo: "decremento",
        fechaVariacion: "2024-12-13",
        producto: "Cuenta cheques"
    }
];

/**
 * Utilidades para manejar variaciones
 */
const VariacionesUtils = {
    getTodos() {
        return VARIACIONES_DATA;
    },

    getPorId(id) {
        return VARIACIONES_DATA.find(v => v.id === id);
    },

    getPorCliente(cliente) {
        return VARIACIONES_DATA.filter(v => 
            v.cliente.toLowerCase().includes(cliente.toLowerCase())
        );
    },

    getPorProducto(producto) {
        return VARIACIONES_DATA.filter(v => 
            v.producto.toLowerCase().includes(producto.toLowerCase())
        );
    },

    getPorTipo(tipo) {
        return VARIACIONES_DATA.filter(v => v.tipo === tipo);
    },

    getIncrementos() {
        return VARIACIONES_DATA.filter(v => v.tipo === 'incremento');
    },

    getDecrementos() {
        return VARIACIONES_DATA.filter(v => v.tipo === 'decremento');
    },

    getPorFecha(fecha) {
        return VARIACIONES_DATA.filter(v => v.fechaVariacion === fecha);
    },

    getPorRangoFechas(fechaInicio, fechaFin) {
        return VARIACIONES_DATA.filter(v => {
            const fecha = new Date(v.fechaVariacion);
            return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
        });
    },

    getResumen() {
        const incrementos = this.getIncrementos();
        const decrementos = this.getDecrementos();
        
        const totalIncrementos = incrementos.reduce((sum, v) => sum + v.variacionNumero, 0);
        const totalDecrementos = decrementos.reduce((sum, v) => sum + Math.abs(v.variacionNumero), 0);
        
        return {
            totalVariaciones: VARIACIONES_DATA.length,
            cantidadIncrementos: incrementos.length,
            cantidadDecrementos: decrementos.length,
            montoIncrementos: totalIncrementos,
            montoDecrementos: totalDecrementos,
            variacionNeta: totalIncrementos - totalDecrementos
        };
    },

    getTopIncrementos(cantidad = 5) {
        return [...VARIACIONES_DATA]
            .filter(v => v.tipo === 'incremento')
            .sort((a, b) => b.variacionNumero - a.variacionNumero)
            .slice(0, cantidad);
    },

    getTopDecrementos(cantidad = 5) {
        return [...VARIACIONES_DATA]
            .filter(v => v.tipo === 'decremento')
            .sort((a, b) => a.variacionNumero - b.variacionNumero)
            .slice(0, cantidad);
    }
};

window.VariacionesUtils = VariacionesUtils;
window.VARIACIONES_DATA = VARIACIONES_DATA;

