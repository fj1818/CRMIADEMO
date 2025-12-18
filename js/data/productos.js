/**
 * ============================================
 * DATOS DE PRODUCTOS BANCARIOS
 * ============================================
 * Productos financieros asignados a clientes del CRM
 */

const PRODUCTOS_DATA = [
    // ========== PRODUCTOS PARA PERSONAS MORALES ==========

    // Cliente 1: Constructora Azteca S.A. de C.V. (IDE-2023-001)
    {
        idRegistro: 1,
        ide: "IDE-2023-001",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Empresarial Premium",
        numeroLinea: "4152-8901-2345-6789",
        montoLinea: 500000,
        fechaAlta: "2023-01-20",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 2,
        ide: "IDE-2023-001",
        familiaProducto: "Crédito Negocios",
        nombreProducto: "Crédito Empresarial Constructor",
        numeroLinea: "7890-1234-5678-9012",
        montoLinea: 5000000,
        fechaAlta: "2023-02-01",
        fechaBaja: null,
        tasa: 12.5,
        montoDeuda: 4250000,
        plazoTotal: 60,
        plazoRestante: 48
    },
    {
        idRegistro: 3,
        ide: "IDE-2023-001",
        familiaProducto: "TPV",
        nombreProducto: "Terminal Punto de Venta Smart",
        numeroLinea: "TPV-2023-001",
        montoLinea: 50000,
        fechaAlta: "2023-03-15",
        fechaBaja: null,
        tasa: 2.5,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 2: Tecnología Digital del Norte S.A. (IDE-2023-002)
    {
        idRegistro: 4,
        ide: "IDE-2023-002",
        familiaProducto: "Tarjeta de Crédito Empresarial",
        nombreProducto: "Tarjeta Empresarial",
        numeroLinea: "5412-7890-1234-5678",
        montoLinea: 300000,
        fechaAlta: "2023-02-25",
        fechaBaja: null,
        tasa: 18.5,
        montoDeuda: 125000,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 5,
        ide: "IDE-2023-002",
        familiaProducto: "Banca Electrónica",
        nombreProducto: "Banca Digital Empresarial Plus",
        numeroLinea: "BE-2023-002",
        montoLinea: null,
        fechaAlta: "2023-02-25",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 6,
        ide: "IDE-2023-002",
        familiaProducto: "TPV",
        nombreProducto: "Terminal POS Móvil",
        numeroLinea: "TPV-2023-002",
        montoLinea: 100000,
        fechaAlta: "2023-03-01",
        fechaBaja: null,
        tasa: 2.8,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 3: Alimentos Mexicanos Unidos (IDE-2023-003) - DADO DE BAJA
    {
        idRegistro: 7,
        ide: "IDE-2023-003",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Empresarial Estándar",
        numeroLinea: "4152-3456-7890-1234",
        montoLinea: 200000,
        fechaAlta: "2023-03-15",
        fechaBaja: "2024-08-15",
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 4: Transportes Rápidos del Bajío (IDE-2023-004)
    {
        idRegistro: 8,
        ide: "IDE-2023-004",
        familiaProducto: "Crédito Negocios",
        nombreProducto: "Crédito Capital de Trabajo",
        numeroLinea: "7890-4567-8901-2345",
        montoLinea: 2000000,
        fechaAlta: "2023-04-10",
        fechaBaja: null,
        tasa: 14.0,
        montoDeuda: 1650000,
        plazoTotal: 48,
        plazoRestante: 36
    },
    {
        idRegistro: 9,
        ide: "IDE-2023-004",
        familiaProducto: "Seguro Auto",
        nombreProducto: "Seguro Flotilla Empresarial",
        numeroLinea: "SA-2023-004",
        montoLinea: 450000,
        fechaAlta: "2023-04-15",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: 12,
        plazoRestante: 6
    },
    {
        idRegistro: 10,
        ide: "IDE-2023-004",
        familiaProducto: "TPV",
        nombreProducto: "Terminal POS Estándar",
        numeroLinea: "TPV-2023-004",
        montoLinea: 30000,
        fechaAlta: "2023-05-01",
        fechaBaja: null,
        tasa: 2.3,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 5: Industrias Químicas del Sureste (IDE-2023-005)
    {
        idRegistro: 11,
        ide: "IDE-2023-005",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Empresarial Premium Plus",
        numeroLinea: "4152-5678-9012-3456",
        montoLinea: 1000000,
        fechaAlta: "2023-05-20",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 12,
        ide: "IDE-2023-005",
        familiaProducto: "Crédito Negocios",
        nombreProducto: "Crédito Refaccionario Industrial",
        numeroLinea: "7890-5678-9012-3456",
        montoLinea: 8000000,
        fechaAlta: "2023-06-01",
        fechaBaja: null,
        tasa: 11.5,
        montoDeuda: 7200000,
        plazoTotal: 84,
        plazoRestante: 72
    },

    // Cliente 6: Comercializadora Global de México (IDE-2023-006)
    {
        idRegistro: 13,
        ide: "IDE-2023-006",
        familiaProducto: "Tarjeta de Crédito Empresarial",
        nombreProducto: "Tarjeta Empresarial",
        numeroLinea: "5412-6789-0123-4567",
        montoLinea: 500000,
        fechaAlta: "2023-06-25",
        fechaBaja: null,
        tasa: 17.9,
        montoDeuda: 280000,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 14,
        ide: "IDE-2023-006",
        familiaProducto: "Banca Electrónica",
        nombreProducto: "Banca Digital Corporativa",
        numeroLinea: "BE-2023-006",
        montoLinea: null,
        fechaAlta: "2023-06-25",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 7: Desarrollo Inmobiliario Pacífico (IDE-2023-007)
    {
        idRegistro: 15,
        ide: "IDE-2023-007",
        familiaProducto: "Crédito Negocios",
        nombreProducto: "Crédito Desarrollo Inmobiliario",
        numeroLinea: "7890-7890-1234-5678",
        montoLinea: 15000000,
        fechaAlta: "2023-07-30",
        fechaBaja: null,
        tasa: 10.5,
        montoDeuda: 13500000,
        plazoTotal: 120,
        plazoRestante: 108
    },
    {
        idRegistro: 16,
        ide: "IDE-2023-007",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Inversión Empresarial",
        numeroLinea: "4152-7890-1234-5678",
        montoLinea: 2000000,
        fechaAlta: "2023-07-30",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // ========== PRODUCTOS PARA PERSONAS FÍSICAS CON ACTIVIDAD EMPRESARIAL ==========

    // Cliente 26: Juan Carlos Martínez López (IDE-2023-026)
    {
        idRegistro: 17,
        ide: "IDE-2023-026",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Gold",
        numeroLinea: "4152-2601-2345-6789",
        montoLinea: 80000,
        fechaAlta: "2023-02-15",
        fechaBaja: null,
        tasa: 24.5,
        montoDeuda: 35000,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 18,
        ide: "IDE-2023-026",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Personal Plus",
        numeroLinea: "4152-2602-3456-7890",
        montoLinea: 150000,
        fechaAlta: "2023-02-15",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 19,
        ide: "IDE-2023-026",
        familiaProducto: "Seguro Vida",
        nombreProducto: "Seguro Vida Protección Total",
        numeroLinea: "SV-2023-026",
        montoLinea: 2000000,
        fechaAlta: "2023-03-01",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: 240,
        plazoRestante: 228
    },
    {
        idRegistro: 20,
        ide: "IDE-2023-026",
        familiaProducto: "TPV",
        nombreProducto: "Terminal POS Personal",
        numeroLinea: "TPV-2023-026",
        montoLinea: 20000,
        fechaAlta: "2023-04-01",
        fechaBaja: null,
        tasa: 2.5,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 27: María Fernanda García Rodríguez (IDE-2023-027)
    {
        idRegistro: 21,
        ide: "IDE-2023-027",
        familiaProducto: "Nómina",
        nombreProducto: "Cuenta Nómina Preferente",
        numeroLinea: "4152-2701-1234-5678",
        montoLinea: null,
        fechaAlta: "2023-03-25",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 22,
        ide: "IDE-2023-027",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Platinum",
        numeroLinea: "5412-2701-2345-6789",
        montoLinea: 120000,
        fechaAlta: "2023-04-01",
        fechaBaja: null,
        tasa: 22.5,
        montoDeuda: 65000,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 23,
        ide: "IDE-2023-027",
        familiaProducto: "Crédito Personal",
        nombreProducto: "Crédito Personal Rápido",
        numeroLinea: "7890-2701-3456-7890",
        montoLinea: 200000,
        fechaAlta: "2023-05-15",
        fechaBaja: null,
        tasa: 28.5,
        montoDeuda: 165000,
        plazoTotal: 36,
        plazoRestante: 28
    },
    {
        idRegistro: 24,
        ide: "IDE-2023-027",
        familiaProducto: "Banca Electrónica",
        nombreProducto: "Banca Móvil Premium",
        numeroLinea: "BE-2023-027",
        montoLinea: null,
        fechaAlta: "2023-03-25",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 28: Roberto Carlos Hernández Pérez (IDE-2023-028)
    {
        idRegistro: 25,
        ide: "IDE-2023-028",
        familiaProducto: "Crédito Auto",
        nombreProducto: "Crédito Automotriz Premium",
        numeroLinea: "7890-2801-4567-8901",
        montoLinea: 450000,
        fechaAlta: "2023-06-01",
        fechaBaja: null,
        tasa: 15.5,
        montoDeuda: 380000,
        plazoTotal: 48,
        plazoRestante: 40
    },
    {
        idRegistro: 26,
        ide: "IDE-2023-028",
        familiaProducto: "Seguro Auto",
        nombreProducto: "Seguro Auto Cobertura Amplia",
        numeroLinea: "SA-2023-028",
        montoLinea: 18000,
        fechaAlta: "2023-06-01",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: 12,
        plazoRestante: 5
    },
    {
        idRegistro: 27,
        ide: "IDE-2023-028",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Emprendedor",
        numeroLinea: "4152-2801-5678-9012",
        montoLinea: 200000,
        fechaAlta: "2023-05-20",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 29: Ana Patricia Sánchez Ramírez (IDE-2023-029) - DADO DE BAJA
    {
        idRegistro: 28,
        ide: "IDE-2023-029",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Gold",
        numeroLinea: "4152-2901-6789-0123",
        montoLinea: 50000,
        fechaAlta: "2023-07-10",
        fechaBaja: "2024-10-01",
        tasa: 26.9,
        montoDeuda: 0,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 30: Luis Fernando Torres González (IDE-2023-030)
    {
        idRegistro: 29,
        ide: "IDE-2023-030",
        familiaProducto: "Crédito Hipotecario",
        nombreProducto: "Crédito Hipotecario Hogar",
        numeroLinea: "7890-3001-7890-1234",
        montoLinea: 2500000,
        fechaAlta: "2023-09-20",
        fechaBaja: null,
        tasa: 10.5,
        montoDeuda: 2350000,
        plazoTotal: 240,
        plazoRestante: 228
    },
    {
        idRegistro: 30,
        ide: "IDE-2023-030",
        familiaProducto: "Seguro Hogar",
        nombreProducto: "Seguro Hogar Protección Integral",
        numeroLinea: "SH-2023-030",
        montoLinea: 35000,
        fechaAlta: "2023-09-20",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: 12,
        plazoRestante: 3
    },
    {
        idRegistro: 31,
        ide: "IDE-2023-030",
        familiaProducto: "Nómina",
        nombreProducto: "Cuenta Nómina Básica",
        numeroLinea: "4152-3001-8901-2345",
        montoLinea: null,
        fechaAlta: "2023-09-15",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // ========== PRODUCTOS PARA PERSONAS FÍSICAS ==========

    // Cliente 41: Sofía Alejandra Ríos Campos (IDE-2023-041)
    {
        idRegistro: 32,
        ide: "IDE-2023-041",
        familiaProducto: "Nómina",
        nombreProducto: "Cuenta Nómina Básica",
        numeroLinea: "4152-4101-9012-3456",
        montoLinea: null,
        fechaAlta: "2023-04-15",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 33,
        ide: "IDE-2023-041",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Gold",
        numeroLinea: "4152-4102-0123-4567",
        montoLinea: 30000,
        fechaAlta: "2023-05-01",
        fechaBaja: null,
        tasa: 28.9,
        montoDeuda: 12000,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 34,
        ide: "IDE-2023-041",
        familiaProducto: "Banca Electrónica",
        nombreProducto: "Banca Móvil Básica",
        numeroLinea: "BE-2023-041",
        montoLinea: null,
        fechaAlta: "2023-04-15",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 42: Fernando José Navarro Pérez (IDE-2023-042)
    {
        idRegistro: 35,
        ide: "IDE-2023-042",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Personal Básica",
        numeroLinea: "4152-4201-1234-5678",
        montoLinea: 50000,
        fechaAlta: "2023-06-25",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 36,
        ide: "IDE-2023-042",
        familiaProducto: "Crédito Personal",
        nombreProducto: "Crédito Personal Express",
        numeroLinea: "7890-4201-2345-6789",
        montoLinea: 80000,
        fechaAlta: "2023-07-15",
        fechaBaja: null,
        tasa: 32.5,
        montoDeuda: 68000,
        plazoTotal: 24,
        plazoRestante: 18
    },

    // Cliente 43: Gabriela Monserrat Ortega Luna (IDE-2023-043)
    {
        idRegistro: 37,
        ide: "IDE-2023-043",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Gold",
        numeroLinea: "5412-4301-3456-7890",
        montoLinea: 60000,
        fechaAlta: "2023-08-20",
        fechaBaja: null,
        tasa: 25.5,
        montoDeuda: 28000,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 38,
        ide: "IDE-2023-043",
        familiaProducto: "Seguro Vida",
        nombreProducto: "Seguro Vida Básico",
        numeroLinea: "SV-2023-043",
        montoLinea: 500000,
        fechaAlta: "2023-09-01",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: 120,
        plazoRestante: 108
    },

    // Cliente 44: Daniela Carolina Aguilar Salazar (IDE-2023-044)
    {
        idRegistro: 39,
        ide: "IDE-2023-044",
        familiaProducto: "Nómina",
        nombreProducto: "Cuenta Nómina Preferente",
        numeroLinea: "4152-4401-4567-8901",
        montoLinea: null,
        fechaAlta: "2023-11-01",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 40,
        ide: "IDE-2023-044",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Platinum",
        numeroLinea: "5412-4401-5678-9012",
        montoLinea: 90000,
        fechaAlta: "2023-11-15",
        fechaBaja: null,
        tasa: 23.9,
        montoDeuda: 45000,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 45: Héctor Manuel Romero Díaz (IDE-2024-023)
    {
        idRegistro: 41,
        ide: "IDE-2024-023",
        familiaProducto: "Crédito Auto",
        nombreProducto: "Crédito Automotriz Estándar",
        numeroLinea: "7890-4501-6789-0123",
        montoLinea: 280000,
        fechaAlta: "2024-02-20",
        fechaBaja: null,
        tasa: 17.5,
        montoDeuda: 265000,
        plazoTotal: 36,
        plazoRestante: 33
    },
    {
        idRegistro: 42,
        ide: "IDE-2024-023",
        familiaProducto: "Seguro Auto",
        nombreProducto: "Seguro Auto Básico",
        numeroLinea: "SA-2024-023",
        montoLinea: 12000,
        fechaAlta: "2024-02-20",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: 12,
        plazoRestante: 9
    },

    // MÁS PRODUCTOS PARA DIVERSOS CLIENTES...

    // Cliente 10: Grupo Hotelero del Centro (IDE-2023-010)
    {
        idRegistro: 43,
        ide: "IDE-2023-010",
        familiaProducto: "Crédito Negocios",
        nombreProducto: "Crédito Empresarial Turístico",
        numeroLinea: "7890-1001-7890-1234",
        montoLinea: 6000000,
        fechaAlta: "2023-10-15",
        fechaBaja: null,
        tasa: 13.0,
        montoDeuda: 5400000,
        plazoTotal: 72,
        plazoRestante: 62
    },
    {
        idRegistro: 44,
        ide: "IDE-2023-010",
        familiaProducto: "TPV",
        nombreProducto: "Terminal POS Hotelería",
        numeroLinea: "TPV-2023-010",
        montoLinea: 150000,
        fechaAlta: "2023-10-20",
        fechaBaja: null,
        tasa: 2.2,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 31: Carmen Elena Flores Mendoza (IDE-2023-031)
    {
        idRegistro: 45,
        ide: "IDE-2023-031",
        familiaProducto: "Crédito Personal",
        nombreProducto: "Crédito Personal Emprendedor",
        numeroLinea: "7890-3101-8901-2345",
        montoLinea: 150000,
        fechaAlta: "2023-12-01",
        fechaBaja: null,
        tasa: 30.5,
        montoDeuda: 135000,
        plazoTotal: 24,
        plazoRestante: 21
    },
    {
        idRegistro: 46,
        ide: "IDE-2023-031",
        familiaProducto: "Tarjeta de Crédito",
        nombreProducto: "Tarjeta Gold",
        numeroLinea: "5412-3101-9012-3456",
        montoLinea: 70000,
        fechaAlta: "2023-12-05",
        fechaBaja: null,
        tasa: 24.9,
        montoDeuda: 32000,
        plazoTotal: null,
        plazoRestante: null
    },

    // Cliente 16: Automotriz del Pacífico (IDE-2024-004)
    {
        idRegistro: 47,
        ide: "IDE-2024-004",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Empresarial Automotriz",
        numeroLinea: "4152-1601-0123-4567",
        montoLinea: 800000,
        fechaAlta: "2024-04-15",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 48,
        ide: "IDE-2024-004",
        familiaProducto: "Crédito Negocios",
        nombreProducto: "Crédito Piso Automotriz",
        numeroLinea: "7890-1601-1234-5678",
        montoLinea: 10000000,
        fechaAlta: "2024-05-01",
        fechaBaja: null,
        tasa: 12.0,
        montoDeuda: 9500000,
        plazoTotal: 60,
        plazoRestante: 54
    },

    // Cliente 32: José Manuel Ramírez Castro (IDE-2024-014)
    {
        idRegistro: 49,
        ide: "IDE-2024-014",
        familiaProducto: "TPV",
        nombreProducto: "Terminal POS Comercio",
        numeroLinea: "TPV-2024-014",
        montoLinea: 25000,
        fechaAlta: "2024-01-25",
        fechaBaja: null,
        tasa: 2.4,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    },
    {
        idRegistro: 50,
        ide: "IDE-2024-014",
        familiaProducto: "Cuenta de Cheques",
        nombreProducto: "Cuenta Comerciante",
        numeroLinea: "4152-3201-2345-6789",
        montoLinea: 100000,
        fechaAlta: "2024-01-20",
        fechaBaja: null,
        tasa: null,
        montoDeuda: null,
        plazoTotal: null,
        plazoRestante: null
    }
];

/**
 * Configuración de Familias de Productos
 */
const FAMILIAS_PRODUCTOS = {
    nomina: {
        nombre: "Nómina",
        aplicaTasa: false,
        aplicaDeuda: false,
        aplicaPlazo: false,
        tiposCliente: ["PF", "PFAE"]
    },
    tarjetaCredito: {
        nombre: "Tarjeta de Crédito",
        aplicaTasa: true,
        aplicaDeuda: true,
        aplicaPlazo: false,
        tiposCliente: ["PF", "PFAE"]
    },
    tarjetaEmpresarial: {
        nombre: "Tarjeta de Crédito Empresarial",
        aplicaTasa: true,
        aplicaDeuda: true,
        aplicaPlazo: false,
        tiposCliente: ["PM", "PFAE"]
    },
    creditoNegocios: {
        nombre: "Crédito Negocios",
        aplicaTasa: true,
        aplicaDeuda: true,
        aplicaPlazo: true,
        tiposCliente: ["PM", "PFAE"]
    },
    creditoHipotecario: {
        nombre: "Crédito Hipotecario",
        aplicaTasa: true,
        aplicaDeuda: true,
        aplicaPlazo: true,
        tiposCliente: ["PF", "PFAE"]
    },
    creditoAuto: {
        nombre: "Crédito Auto",
        aplicaTasa: true,
        aplicaDeuda: true,
        aplicaPlazo: true,
        tiposCliente: ["PF", "PFAE"]
    },
    seguroAuto: {
        nombre: "Seguro Auto",
        aplicaTasa: false,
        aplicaDeuda: false,
        aplicaPlazo: true,
        tiposCliente: ["PF", "PFAE", "PM"]
    },
    seguroHogar: {
        nombre: "Seguro Hogar",
        aplicaTasa: false,
        aplicaDeuda: false,
        aplicaPlazo: true,
        tiposCliente: ["PF", "PFAE"]
    },
    seguroVida: {
        nombre: "Seguro Vida",
        aplicaTasa: false,
        aplicaDeuda: false,
        aplicaPlazo: true,
        tiposCliente: ["PF", "PFAE"]
    },
    creditoPersonal: {
        nombre: "Crédito Personal",
        aplicaTasa: true,
        aplicaDeuda: true,
        aplicaPlazo: true,
        tiposCliente: ["PF", "PFAE"]
    },
    tpv: {
        nombre: "TPV",
        aplicaTasa: true,
        aplicaDeuda: false,
        aplicaPlazo: false,
        tiposCliente: ["PM", "PFAE"]
    },
    cuentaCheques: {
        nombre: "Cuenta de Cheques",
        aplicaTasa: false,
        aplicaDeuda: false,
        aplicaPlazo: false,
        tiposCliente: ["PF", "PFAE", "PM"]
    },
    bancaElectronica: {
        nombre: "Banca Electrónica",
        aplicaTasa: false,
        aplicaDeuda: false,
        aplicaPlazo: false,
        tiposCliente: ["PF", "PFAE", "PM"]
    }
};

/**
 * Estadísticas de productos
 */
const PRODUCTOS_STATS = {
    total: PRODUCTOS_DATA.length,
    porFamilia: {},
    productosActivos: PRODUCTOS_DATA.filter(p => p.fechaBaja === null).length,
    productosBaja: PRODUCTOS_DATA.filter(p => p.fechaBaja !== null).length,
    totalDeuda: PRODUCTOS_DATA.reduce((sum, p) => sum + (p.montoDeuda || 0), 0),
    totalLineas: PRODUCTOS_DATA.reduce((sum, p) => sum + (p.montoLinea || 0), 0)
};

// Calcular productos por familia
Object.values(FAMILIAS_PRODUCTOS).forEach(familia => {
    PRODUCTOS_STATS.porFamilia[familia.nombre] = PRODUCTOS_DATA.filter(
        p => p.familiaProducto === familia.nombre
    ).length;
});

/**
 * Funciones de utilidad para trabajar con productos
 */
const ProductosUtils = {
    /**
     * Obtiene todos los productos
     */
    getTodos() {
        return PRODUCTOS_DATA;
    },

    /**
     * Obtiene solo productos activos
     */
    getActivos() {
        return PRODUCTOS_DATA.filter(p => p.fechaBaja === null);
    },

    /**
     * Obtiene productos dados de baja
     */
    getBaja() {
        return PRODUCTOS_DATA.filter(p => p.fechaBaja !== null);
    },

    /**
     * Obtiene productos por IDE de cliente
     */
    getPorIDE(ide) {
        return PRODUCTOS_DATA.filter(p => p.ide === ide);
    },

    /**
     * Obtiene productos por familia
     */
    getPorFamilia(familia) {
        return PRODUCTOS_DATA.filter(p => p.familiaProducto === familia);
    },

    /**
     * Obtiene un producto por ID
     */
    getPorId(id) {
        return PRODUCTOS_DATA.find(p => p.idRegistro === id);
    },

    /**
     * Obtiene productos con deuda
     */
    getConDeuda() {
        return PRODUCTOS_DATA.filter(p => p.montoDeuda && p.montoDeuda > 0);
    },

    /**
     * Obtiene productos por vencer (plazo restante < 6 meses)
     */
    getPorVencer() {
        return PRODUCTOS_DATA.filter(p =>
            p.plazoRestante && p.plazoRestante > 0 && p.plazoRestante <= 6
        );
    },

    /**
     * Calcula deuda total de un cliente por IDE
     */
    getDeudaTotalPorIDE(ide) {
        return PRODUCTOS_DATA
            .filter(p => p.ide === ide && p.montoDeuda)
            .reduce((sum, p) => sum + p.montoDeuda, 0);
    },

    /**
     * Obtiene estadísticas
     */
    getEstadisticas() {
        return PRODUCTOS_STATS;
    },

    /**
     * Filtra productos por múltiples criterios
     */
    filtrar(criterios) {
        let resultado = [...PRODUCTOS_DATA];

        if (criterios.familiaProducto) {
            resultado = resultado.filter(p => p.familiaProducto === criterios.familiaProducto);
        }

        if (criterios.ide) {
            resultado = resultado.filter(p => p.ide === criterios.ide);
        }

        if (criterios.activo !== undefined) {
            resultado = resultado.filter(p =>
                criterios.activo ? p.fechaBaja === null : p.fechaBaja !== null
            );
        }

        if (criterios.conDeuda) {
            resultado = resultado.filter(p => p.montoDeuda && p.montoDeuda > 0);
        }

        return resultado;
    },

    /**
     * Obtiene familias de productos
     */
    getFamilias() {
        return FAMILIAS_PRODUCTOS;
    }
};

// Hacer disponibles globalmente
window.PRODUCTOS_DATA = PRODUCTOS_DATA;
window.FAMILIAS_PRODUCTOS = FAMILIAS_PRODUCTOS;
window.PRODUCTOS_STATS = PRODUCTOS_STATS;
window.ProductosUtils = ProductosUtils;

// Log de inicialización
console.log('✅ Base de datos de productos cargada:', PRODUCTOS_STATS);