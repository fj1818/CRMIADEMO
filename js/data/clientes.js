/**
 * ============================================
 * DATOS DE CLIENTES
 * ============================================
 * Base de datos de clientes del CRM
 */

const CLIENTES_DATA = [
    // ========== PERSONAS MORALES (25 clientes) ==========
    {
        id: 1,
        nombre: "Constructora Azteca S.A. de C.V.",
        rfc: "CAZ890123BN5",
        celular: "55-1234-5678",
        correo: "contacto@constructoraazteca.com.mx",
        fechaAlta: "2023-01-15",
        ide: "IDE-2023-001",
        idProspecto: "180123456789012345",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 2,
        nombre: "Tecnología Digital del Norte S.A.",
        rfc: "TDN920315XY8",
        celular: "81-9876-5432",
        correo: "ventas@tecnorte.com",
        fechaAlta: "2023-02-20",
        ide: "IDE-2023-002",
        idProspecto: "180234567890123456",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 3,
        nombre: "Alimentos Mexicanos Unidos S.A. de C.V.",
        rfc: "AMU850610KL3",
        celular: "33-2345-6789",
        correo: "info@alimentosmx.com",
        fechaAlta: "2023-03-10",
        ide: "IDE-2023-003",
        idProspecto: "180345678901234567",
        tipoPersona: "Persona Moral",
        fechaBaja: "2024-08-15"
    },
    {
        id: 4,
        nombre: "Transportes Rápidos del Bajío S.C.",
        rfc: "TRB910225QW9",
        celular: "442-567-8901",
        correo: "operaciones@transportesbajio.mx",
        fechaAlta: "2023-04-05",
        ide: "IDE-2023-004",
        idProspecto: "180456789012345678",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 5,
        nombre: "Industrias Químicas del Sureste S.A.",
        rfc: "IQS870930ER7",
        celular: "961-345-6789",
        correo: "compras@iqsureste.com.mx",
        fechaAlta: "2023-05-12",
        ide: "IDE-2023-005",
        idProspecto: "180567890123456789",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 6,
        nombre: "Comercializadora Global de México S.A. de C.V.",
        rfc: "CGM940815TY4",
        celular: "55-8765-4321",
        correo: "contacto@cgmglobal.com",
        fechaAlta: "2023-06-18",
        ide: "IDE-2023-006",
        idProspecto: "180678901234567890",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 7,
        nombre: "Desarrollo Inmobiliario Pacífico S.A.",
        rfc: "DIP881205UI6",
        celular: "664-234-5678",
        correo: "info@dipacifico.mx",
        fechaAlta: "2023-07-22",
        ide: "IDE-2023-007",
        idProspecto: "180789012345678901",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 8,
        nombre: "Servicios Médicos Integrales S.C.",
        rfc: "SMI900420OP2",
        celular: "222-987-6543",
        correo: "atencion@serviciosmedicos.com.mx",
        fechaAlta: "2023-08-30",
        ide: "IDE-2023-008",
        idProspecto: "180890123456789012",
        tipoPersona: "Persona Moral",
        fechaBaja: "2024-09-20"
    },
    {
        id: 9,
        nombre: "Electrónica y Componentes S.A. de C.V.",
        rfc: "ECO930701AS8",
        celular: "81-5678-9012",
        correo: "ventas@electrocomp.mx",
        fechaAlta: "2023-09-14",
        ide: "IDE-2023-009",
        idProspecto: "180901234567890123",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 10,
        nombre: "Grupo Hotelero del Centro S.A.",
        rfc: "GHC860318DF5",
        celular: "473-456-7890",
        correo: "reservaciones@grupohotelero.com",
        fechaAlta: "2023-10-08",
        ide: "IDE-2023-010",
        idProspecto: "181012345678901234",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 11,
        nombre: "Maquinaria Industrial del Norte S.A. de C.V.",
        rfc: "MIN920525GH4",
        celular: "871-234-5678",
        correo: "contacto@maquinarianorte.mx",
        fechaAlta: "2023-11-12",
        ide: "IDE-2023-011",
        idProspecto: "181123456789012345",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 12,
        nombre: "Distribuidora de Alimentos Premium S.A.",
        rfc: "DAP890810JK9",
        celular: "33-3456-7890",
        correo: "ventas@distribuidorapremium.com",
        fechaAlta: "2023-12-20",
        ide: "IDE-2023-012",
        idProspecto: "181234567890123456",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 13,
        nombre: "Consultoría Empresarial Moderna S.C.",
        rfc: "CEM950615LM3",
        celular: "55-6789-0123",
        correo: "info@consultoriamoderna.mx",
        fechaAlta: "2024-01-10",
        ide: "IDE-2024-001",
        idProspecto: "181345678901234567",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 14,
        nombre: "Materiales de Construcción del Golfo S.A.",
        rfc: "MCG870920NP7",
        celular: "229-890-1234",
        correo: "ventas@materialesgolfo.com.mx",
        fechaAlta: "2024-02-05",
        ide: "IDE-2024-002",
        idProspecto: "181456789012345678",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 15,
        nombre: "Software y Soluciones Digitales S.A. de C.V.",
        rfc: "SSD910430QR5",
        celular: "442-901-2345",
        correo: "contacto@softwaredigital.mx",
        fechaAlta: "2024-03-15",
        ide: "IDE-2024-003",
        idProspecto: "181567890123456789",
        tipoPersona: "Persona Moral",
        fechaBaja: "2024-10-30"
    },
    {
        id: 16,
        nombre: "Automotriz del Pacífico S.A.",
        rfc: "ADP880725ST2",
        celular: "667-012-3456",
        correo: "servicio@automotrizpacifico.com",
        fechaAlta: "2024-04-08",
        ide: "IDE-2024-004",
        idProspecto: "181678901234567890",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 17,
        nombre: "Agroindustrias del Valle S.A. de C.V.",
        rfc: "AVI930305UV8",
        celular: "646-123-4567",
        correo: "compras@agroindustriasvalle.mx",
        fechaAlta: "2024-05-20",
        ide: "IDE-2024-005",
        idProspecto: "181789012345678901",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 18,
        nombre: "Energías Renovables del Sur S.A.",
        rfc: "ERS940618WX4",
        celular: "951-234-5678",
        correo: "info@energiassur.com.mx",
        fechaAlta: "2024-06-12",
        ide: "IDE-2024-006",
        idProspecto: "181890123456789012",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 19,
        nombre: "Laboratorios Farmacéuticos Nacionales S.A. de C.V.",
        rfc: "LFN860910YZ6",
        celular: "55-3456-7890",
        correo: "ventas@labfarmaceuticos.mx",
        fechaAlta: "2024-07-25",
        ide: "IDE-2024-007",
        idProspecto: "181901234567890123",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 20,
        nombre: "Textiles y Confecciones del Centro S.A.",
        rfc: "TCC920128AB3",
        celular: "222-567-8901",
        correo: "contacto@textilescentro.com",
        fechaAlta: "2024-08-18",
        ide: "IDE-2024-008",
        idProspecto: "182012345678901234",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 21,
        nombre: "Logística y Almacenamiento Total S.A. de C.V.",
        rfc: "LAT890515CD9",
        celular: "81-6789-0123",
        correo: "operaciones@logisticatotal.mx",
        fechaAlta: "2024-09-22",
        ide: "IDE-2024-009",
        idProspecto: "182123456789012345",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 22,
        nombre: "Metalúrgica Industrial Mexicana S.A.",
        rfc: "MIM950820EF7",
        celular: "33-7890-1234",
        correo: "ventas@metalurgicamex.com.mx",
        fechaAlta: "2024-10-05",
        ide: "IDE-2024-010",
        idProspecto: "182234567890123456",
        tipoPersona: "Persona Moral",
        fechaBaja: "2024-11-15"
    },
    {
        id: 23,
        nombre: "Publicidad y Medios Digitales S.A. de C.V.",
        rfc: "PMD910707GH5",
        celular: "55-8901-2345",
        correo: "contacto@publicidaddigital.mx",
        fechaAlta: "2024-10-18",
        ide: "IDE-2024-011",
        idProspecto: "182345678901234567",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 24,
        nombre: "Plásticos y Empaques Industriales S.A.",
        rfc: "PEI880412IJ2",
        celular: "442-012-3456",
        correo: "ventas@plasticosempaques.com",
        fechaAlta: "2024-11-02",
        ide: "IDE-2024-012",
        idProspecto: "182456789012345678",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },
    {
        id: 25,
        nombre: "Financiera de Crédito Empresarial S.A. de C.V.",
        rfc: "FCE930925KL8",
        celular: "81-1234-5678",
        correo: "creditos@financieraempresarial.mx",
        fechaAlta: "2024-11-20",
        ide: "IDE-2024-013",
        idProspecto: "182567890123456789",
        tipoPersona: "Persona Moral",
        fechaBaja: null
    },

    // ========== PERSONAS FÍSICAS CON ACTIVIDAD EMPRESARIAL (15 clientes) ==========
    {
        id: 26,
        nombre: "Juan Carlos Martínez López",
        rfc: "MALJ850615HM3",
        celular: "55-2345-6789",
        correo: "jc.martinez@negociosmartinez.com",
        fechaAlta: "2023-02-10",
        ide: "IDE-2023-026",
        idProspecto: "182678901234567890",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 27,
        nombre: "María Fernanda García Rodríguez",
        rfc: "GARM920318MN7",
        celular: "33-3456-7890",
        correo: "mf.garcia@consultorigarcia.mx",
        fechaAlta: "2023-03-22",
        ide: "IDE-2023-027",
        idProspecto: "182789012345678901",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 28,
        nombre: "Roberto Carlos Hernández Pérez",
        rfc: "HEPR880725OP4",
        celular: "81-4567-8901",
        correo: "roberto.hernandez@comercialrch.com",
        fechaAlta: "2023-05-15",
        ide: "IDE-2023-028",
        idProspecto: "182890123456789012",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 29,
        nombre: "Ana Patricia Sánchez Ramírez",
        rfc: "SARA910220QR9",
        celular: "442-567-8901",
        correo: "ana.sanchez@disenosana.mx",
        fechaAlta: "2023-07-08",
        ide: "IDE-2023-029",
        idProspecto: "182901234567890123",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: "2024-10-01"
    },
    {
        id: 30,
        nombre: "Luis Fernando Torres González",
        rfc: "TOGL870510ST5",
        celular: "222-678-9012",
        correo: "luis.torres@construccionestorres.com",
        fechaAlta: "2023-09-12",
        ide: "IDE-2023-030",
        idProspecto: "183012345678901234",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 31,
        nombre: "Carmen Elena Flores Mendoza",
        rfc: "FOMC930830UV2",
        celular: "55-7890-1234",
        correo: "carmen.flores@esteticaflores.mx",
        fechaAlta: "2023-11-20",
        ide: "IDE-2023-031",
        idProspecto: "183123456789012345",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 32,
        nombre: "José Manuel Ramírez Castro",
        rfc: "RACJ860405WX8",
        celular: "33-8901-2345",
        correo: "jm.ramirez@tiendasramirez.com",
        fechaAlta: "2024-01-18",
        ide: "IDE-2024-014",
        idProspecto: "183234567890123456",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 33,
        nombre: "Sandra Liliana Morales Ortiz",
        rfc: "MOOS940612YZ4",
        celular: "81-9012-3456",
        correo: "sandra.morales@contabilidadmorales.mx",
        fechaAlta: "2024-03-05",
        ide: "IDE-2024-015",
        idProspecto: "183345678901234567",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 34,
        nombre: "Miguel Ángel Vargas Ruiz",
        rfc: "VARM890920AB6",
        celular: "664-012-3456",
        correo: "miguel.vargas@tallermecanicovargas.com",
        fechaAlta: "2024-05-10",
        ide: "IDE-2024-016",
        idProspecto: "183456789012345678",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 35,
        nombre: "Diana Laura Jiménez Vega",
        rfc: "JIVD910715CD3",
        celular: "229-123-4567",
        correo: "diana.jimenez@marketingjimenez.mx",
        fechaAlta: "2024-07-15",
        ide: "IDE-2024-017",
        idProspecto: "183567890123456789",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 36,
        nombre: "Eduardo Alonso Medina Cruz",
        rfc: "MECE870328EF9",
        celular: "951-234-5678",
        correo: "eduardo.medina@transportesmedina.com",
        fechaAlta: "2024-09-08",
        ide: "IDE-2024-018",
        idProspecto: "183678901234567890",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 37,
        nombre: "Patricia Guadalupe Reyes Delgado",
        rfc: "REDP920505GH7",
        celular: "55-3456-7890",
        correo: "patricia.reyes@boutiquereyes.mx",
        fechaAlta: "2024-10-12",
        ide: "IDE-2024-019",
        idProspecto: "183789012345678901",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 38,
        nombre: "Alejandro Javier Castillo Núñez",
        rfc: "CANA880810IJ5",
        celular: "33-4567-8901",
        correo: "alejandro.castillo@ferretericastillo.com",
        fechaAlta: "2024-11-05",
        ide: "IDE-2024-020",
        idProspecto: "183890123456789012",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 39,
        nombre: "Verónica Isabel Guzmán Herrera",
        rfc: "GUHV950220KL2",
        celular: "81-5678-9012",
        correo: "veronica.guzman@cafeteriaguzman.mx",
        fechaAlta: "2024-11-18",
        ide: "IDE-2024-021",
        idProspecto: "183901234567890123",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 40,
        nombre: "Ricardo Alberto Mendoza Silva",
        rfc: "MESR860930MN8",
        celular: "442-678-9012",
        correo: "ricardo.mendoza@fotomendoza.com",
        fechaAlta: "2024-11-25",
        ide: "IDE-2024-022",
        idProspecto: "184012345678901234",
        tipoPersona: "Persona Física con Actividad Empresarial",
        fechaBaja: null
    },

    // ========== PERSONAS FÍSICAS (10 clientes) ==========
    {
        id: 41,
        nombre: "Sofía Alejandra Ríos Campos",
        rfc: "ROCS930615OP4",
        celular: "55-6789-0123",
        correo: "sofia.rios@gmail.com",
        fechaAlta: "2023-04-10",
        ide: "IDE-2023-041",
        idProspecto: "184123456789012345",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 42,
        nombre: "Fernando José Navarro Pérez",
        rfc: "NAPF880720QR7",
        celular: "33-7890-1234",
        correo: "fernando.navarro@hotmail.com",
        fechaAlta: "2023-06-22",
        ide: "IDE-2023-042",
        idProspecto: "184234567890123456",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 43,
        nombre: "Gabriela Monserrat Ortega Luna",
        rfc: "OELG910825ST3",
        celular: "81-8901-2345",
        correo: "gaby.ortega@yahoo.com",
        fechaAlta: "2023-08-15",
        ide: "IDE-2023-043",
        idProspecto: "184345678901234567",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 44,
        nombre: "Daniela Carolina Aguilar Salazar",
        rfc: "AUSD950310UV9",
        celular: "222-901-2345",
        correo: "daniela.aguilar@outlook.com",
        fechaAlta: "2023-10-28",
        ide: "IDE-2023-044",
        idProspecto: "184456789012345678",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 45,
        nombre: "Héctor Manuel Romero Díaz",
        rfc: "RODH870515WX5",
        celular: "442-012-3456",
        correo: "hector.romero@gmail.com",
        fechaAlta: "2024-02-14",
        ide: "IDE-2024-023",
        idProspecto: "184567890123456789",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 46,
        nombre: "Lorena Beatriz Cervantes Rojas",
        rfc: "CERL920620YZ2",
        celular: "664-123-4567",
        correo: "lorena.cervantes@hotmail.com",
        fechaAlta: "2024-04-20",
        ide: "IDE-2024-024",
        idProspecto: "184678901234567890",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 47,
        nombre: "Marcos Antonio Solís Márquez",
        rfc: "SOMM860905AB8",
        celular: "229-234-5678",
        correo: "marcos.solis@yahoo.com",
        fechaAlta: "2024-06-25",
        ide: "IDE-2024-025",
        idProspecto: "184789012345678901",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 48,
        nombre: "Paola Cristina Valdés Torres",
        rfc: "VATP940710CD4",
        celular: "951-345-6789",
        correo: "paola.valdes@gmail.com",
        fechaAlta: "2024-08-30",
        ide: "IDE-2024-026",
        idProspecto: "184890123456789012",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 49,
        nombre: "Jorge Alberto Parra Maldonado",
        rfc: "PAMJ891215EF6",
        celular: "55-4567-8901",
        correo: "jorge.parra@outlook.com",
        fechaAlta: "2024-10-08",
        ide: "IDE-2024-027",
        idProspecto: "184901234567890123",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    },
    {
        id: 50,
        nombre: "Isabella María Fuentes Cortés",
        rfc: "FUCI930425GH9",
        celular: "33-5678-9012",
        correo: "isabella.fuentes@hotmail.com",
        fechaAlta: "2024-11-15",
        ide: "IDE-2024-028",
        idProspecto: "185012345678901234",
        tipoPersona: "Persona Física sin Actividad Empresarial",
        fechaBaja: null
    }
];

/**
 * Estadísticas de los clientes
 */
const CLIENTES_STATS = {
    total: CLIENTES_DATA.length,
    personasMorales: CLIENTES_DATA.filter(c => c.tipoPersona === "Persona Moral").length,
    personasFisicasConActividad: CLIENTES_DATA.filter(c => c.tipoPersona === "Persona Física con Actividad Empresarial").length,
    personasFisicas: CLIENTES_DATA.filter(c => c.tipoPersona === "Persona Física sin Actividad Empresarial").length,
    clientesActivos: CLIENTES_DATA.filter(c => c.fechaBaja === null).length,
    clientesBaja: CLIENTES_DATA.filter(c => c.fechaBaja !== null).length
};

/**
 * Funciones de utilidad para trabajar con clientes
 */
const ClientesUtils = {
    /**
     * Obtiene todos los clientes
     */
    getTodos() {
        return CLIENTES_DATA;
    },

    /**
     * Obtiene solo clientes activos
     */
    getActivos() {
        return CLIENTES_DATA.filter(c => c.fechaBaja === null);
    },

    /**
     * Obtiene clientes dados de baja
     */
    getBaja() {
        return CLIENTES_DATA.filter(c => c.fechaBaja !== null);
    },

    /**
     * Obtiene un cliente por ID
     */
    getPorId(id) {
        return CLIENTES_DATA.find(c => c.id === id);
    },

    /**
     * Obtiene clientes por tipo de persona
     */
    getPorTipo(tipo) {
        // Compatibilidad con nombres anteriores
        if (tipo === "Persona Física") {
            return CLIENTES_DATA.filter(c => c.tipoPersona === "Persona Física sin Actividad Empresarial");
        }
        return CLIENTES_DATA.filter(c => c.tipoPersona === tipo);
    },

    /**
     * Busca clientes por nombre (búsqueda parcial)
     */
    buscarPorNombre(nombre) {
        const nombreLower = nombre.toLowerCase();
        return CLIENTES_DATA.filter(c =>
            c.nombre.toLowerCase().includes(nombreLower)
        );
    },

    /**
     * Busca cliente por RFC
     */
    buscarPorRFC(rfc) {
        return CLIENTES_DATA.find(c => c.rfc === rfc);
    },

    /**
     * Obtiene estadísticas
     */
    getEstadisticas() {
        return CLIENTES_STATS;
    },

    /**
     * Filtra clientes por múltiples criterios
     */
    filtrar(criterios) {
        let resultado = [...CLIENTES_DATA];

        if (criterios.tipoPersona) {
            resultado = resultado.filter(c => c.tipoPersona === criterios.tipoPersona);
        }

        if (criterios.activo !== undefined) {
            resultado = resultado.filter(c =>
                criterios.activo ? c.fechaBaja === null : c.fechaBaja !== null
            );
        }

        if (criterios.fechaDesde) {
            resultado = resultado.filter(c => c.fechaAlta >= criterios.fechaDesde);
        }

        if (criterios.fechaHasta) {
            resultado = resultado.filter(c => c.fechaAlta <= criterios.fechaHasta);
        }

        return resultado;
    }
};

// Hacer disponibles globalmente
window.CLIENTES_DATA = CLIENTES_DATA;
window.CLIENTES_STATS = CLIENTES_STATS;
window.ClientesUtils = ClientesUtils;

// Log de inicialización
console.log('✅ Base de datos de clientes cargada:', CLIENTES_STATS);