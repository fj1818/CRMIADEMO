# 🔔 Sistema de Monitoreo de Tareas

## Descripción General

Este sistema monitorea automáticamente las tareas comerciales del día y notifica al usuario cuando una tarea está vencida, ofreciendo opciones para completarla, reagendarla o gestionar el seguimiento mediante un chat interactivo integrado con N8N.

---

## 🎯 Funcionalidades

### 1. **Asignación Automática de Horas**
- Cada tarea del día se genera con una hora específica:
  - **08:00** - Primera tarea
  - **10:00** - Segunda tarea
  - **12:00** - Tercera tarea
  - **14:00** - Cuarta tarea
  - **16:00** - Quinta tarea
  - **18:00** - Sexta tarea

### 2. **Monitoreo Continuo**
- El servicio revisa cada **60 segundos** si hay tareas vencidas.
- **Auto-completa** todas las tareas vencidas EXCEPTO la más reciente.
- La tarea más reciente vencida genera una **alerta** al usuario.

### 3. **Campana de Alertas** 🔔
- Icono de campana fijo en la **esquina superior derecha**.
- Badge rojo con el número de tareas pendientes.
- Animación de "sacudida" cuando hay alertas activas.
- Al hacer clic, abre el chat de seguimiento.

### 4. **Notificación Emergente**
- Aparece desde la derecha con animación suave.
- Muestra:
  - Título de la tarea
  - Hora programada
  - Botón "Responder" para abrir el chat
- Se auto-cierra después de **10 segundos** si no se interactúa.

### 5. **Chat Interactivo**
- Modal centrado con overlay difuminado.
- Mensaje inicial del bot preguntando si se completó la tarea.
- **Acciones rápidas**:
  - ✅ "Sí, la completé" → Marca como completada
  - ❌ "No contestó el cliente" → Ofrece reagendar
- Campo de texto libre para respuestas personalizadas.
- **Typing indicator** mientras N8N procesa la respuesta.

---

## 🛠️ Arquitectura Técnica

### Archivos Creados/Modificados

#### **Nuevos Archivos**
1. **`js/services/tareasMonitor.js`**
   - Servicio independiente de monitoreo.
   - Gestiona alertas, notificaciones y comunicación con N8N.

2. **`css/components/tareas-monitor.css`**
   - Estilos para campana, notificaciones y chat.
   - Animaciones y transiciones suaves.

3. **`prompts/tareas-monitor-prompt.txt`**
   - Prompt para el agente de N8N.
   - Define comportamiento y formato de respuestas.

#### **Archivos Modificados**
1. **`js/modules/misAcciones.js`**
   - Agregado campo `hora` a cada tarea.
   - Visualización de hora en cada tarjeta de tarea (⏰ HH:MM).

2. **`index.html`**
   - Importación de `tareas-monitor.css`.
   - Importación de `tareasMonitor.js`.

3. **`js/app.js`**
   - Inicialización del servicio al cargar el DOM.

4. **`js/modules/navigation.js`**
   - Exposición global de la instancia de `MisAccionesModule`.

---

## 🔗 Integración con N8N

### Endpoint del Webhook
```
https://n8n.segurointeligente.mx/webhook/tareas-monitor
```

### Payload Enviado (POST)
```json
{
  "header": {
    "sessionId": "tareas-1234567890-abc123",
    "timestamp": "2025-11-12T14:35:00Z",
    "currentUser": "Nombre del Usuario"
  },
  "body": {
    "tarea": {
      "id": "dia-2025-11-12-3",
      "titulo": "Reunión con cliente para ofertar crédito empresarial",
      "descripcion": "Presenta propuesta de crédito con condiciones preferenciales",
      "hora": "14:00",
      "fecha": "2025-11-12T14:00:00",
      "tipo": "reunion"
    },
    "mensaje": "No contestó el cliente",
    "accion": "no-contacto",
    "timestamp": "2025-11-12T14:35:00Z"
  }
}
```

### Respuesta Esperada (JSON)
```json
{
  "respuesta": "Entiendo. Te sugiero reagendar esta tarea para mañana a las 14:00 hrs. ¿Te parece bien?",
  "accion": "solicitar_mas_info"
}
```

### Acciones Disponibles
- **`marcar_completada`**: Marca la tarea como completada y cierra el chat.
- **`reagendar`**: Requiere campos adicionales `nuevaFecha` y `nuevaHora`.
- **`solicitar_mas_info`**: Continúa la conversación sin cerrar.
- **`cerrar_alerta`**: Cierra la alerta sin acción adicional.

---

## 📋 Configuración del Agente N8N

### Paso 1: Crear Nuevo Workflow
1. Acceder a N8N: `https://n8n.segurointeligente.mx`
2. Crear nuevo workflow llamado **"Tareas Monitor"**.

### Paso 2: Configurar Webhook
1. Agregar nodo **Webhook**.
2. Configurar:
   - **Method**: POST
   - **Path**: `tareas-monitor`
   - **Authentication**: None (o según tus necesidades)
   - **Response Mode**: When Last Node Finishes

### Paso 3: Agregar Nodo de IA
1. Agregar nodo **OpenAI** (o tu LLM preferido).
2. Configurar:
   - **Model**: gpt-4 (o similar)
   - **System Message**: Copiar contenido de `prompts/tareas-monitor-prompt.txt`
   - **User Message**: `{{$json.body.mensaje}}`
   - **Temperature**: 0.3
   - **Response Format**: JSON

### Paso 4: Procesar Respuesta
1. Agregar nodo **Function** para validar JSON.
2. Código sugerido:
```javascript
try {
  const respuesta = JSON.parse($input.first().json.choices[0].message.content);
  return { json: respuesta };
} catch (error) {
  return {
    json: {
      respuesta: "Lo siento, ocurrió un error. ¿Podrías repetir tu solicitud?",
      accion: "solicitar_mas_info"
    }
  };
}
```

### Paso 5: Lógica de Reagendación (Opcional)
1. Agregar nodo **If** para detectar `accion === "reagendar"`.
2. Si el usuario no especificó fecha/hora:
   - Calcular siguiente día hábil.
   - Mantener hora original.
   - Agregar campos `nuevaFecha` y `nuevaHora`.

### Paso 6: Responder al Cliente
1. Agregar nodo **Respond to Webhook**.
2. Configurar:
   - **Response Body**: `{{$json}}`
   - **Response Code**: 200
   - **Content-Type**: application/json

---

## 🎨 Personalización

### Cambiar Frecuencia de Monitoreo
Archivo: `js/services/tareasMonitor.js`
```javascript
this.checkInterval = 60000; // Cambiar a milisegundos deseados
```

### Cambiar URL del Webhook
Archivo: `js/services/tareasMonitor.js`
```javascript
this.webhookUrl = 'https://tu-servidor.com/webhook/tareas';
```

### Modificar Horas de Tareas
Archivo: `js/modules/misAcciones.js`, método `crearTareasParaFecha`
```javascript
const horasBase = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
```

### Ajustar Auto-cierre de Notificación
Archivo: `js/services/tareasMonitor.js`, método `mostrarNotificacionEmergente`
```javascript
setTimeout(() => { /* ... */ }, 15000); // 15 segundos
```

---

## 🧪 Pruebas

### Prueba Manual
1. Ir a la sección **"Mis tareas comerciales"**.
2. Modificar manualmente una tarea para que su `fecha` sea anterior a la hora actual:
   ```javascript
   // En consola del navegador:
   const moduloAcciones = window.MisAccionesModuleInstance;
   moduloAcciones.tareas.dia.tareas[0].fecha = '2025-11-12T08:00:00';
   moduloAcciones.tareas.dia.tareas[0].hora = '08:00';
   ```
3. Esperar 60 segundos (o forzar revisión):
   ```javascript
   window.TareasMonitorService.revisarTareas();
   ```
4. Verificar que aparece la campana con badge.
5. Hacer clic en la campana y probar el chat.

### Validar Integración N8N
1. Usar Postman o similar para enviar payload de prueba.
2. Verificar que N8N responde con JSON válido.
3. Probar diferentes escenarios:
   - Usuario completa tarea.
   - Usuario indica que cliente no contestó.
   - Usuario pide reagendar.
   - Usuario da respuesta ambigua.

---

## 📚 Prompt para N8N (Resumen)

El prompt completo está en `prompts/tareas-monitor-prompt.txt`, pero el comportamiento esperado es:

1. **Analizar mensaje del usuario** (libre o acción rápida).
2. **Determinar intención**:
   - ¿Completó la tarea?
   - ¿No pudo contactar al cliente?
   - ¿Necesita reagendar?
   - ¿Mensaje ambiguo?
3. **Responder en JSON** con:
   - `respuesta`: Texto amigable (2-3 líneas).
   - `accion`: Una de las 4 acciones disponibles.
   - `nuevaFecha` y `nuevaHora` (solo si aplica).
4. **Tono**: Profesional pero cercano, conciso.
5. **Reagendación inteligente**:
   - Si hoy es viernes → reagendar para lunes.
   - Si no hay hora específica → mantener original.
   - Si no hay fecha específica → siguiente día hábil.

---

## 🐛 Solución de Problemas

### La campana no aparece
- Verificar que `js/services/tareasMonitor.js` está importado en `index.html`.
- Verificar que el servicio se inicializa en `js/app.js`.
- Verificar en consola: `window.TareasMonitorService`

### Las tareas no se auto-completan
- Verificar que la fecha de la tarea es anterior a la hora actual.
- Verificar que `window.MisAccionesModuleInstance` está definido.
- Revisar consola por errores de JavaScript.

### El chat no envía mensajes
- Verificar URL del webhook en `tareasMonitor.js`.
- Verificar que N8N está accesible.
- Revisar Network tab en DevTools para ver request/response.

### N8N no responde correctamente
- Verificar que el prompt está configurado correctamente.
- Verificar que el modelo de IA soporta JSON responses.
- Revisar logs de N8N para errores.

---

## 🚀 Próximas Mejoras

- [ ] Persistencia de tareas reagendadas en localStorage.
- [ ] Notificaciones del navegador (Web Notifications API).
- [ ] Historial de tareas completadas/reagendadas.
- [ ] Estadísticas de cumplimiento de tareas.
- [ ] Integración con calendario externo (Google Calendar).
- [ ] Recordatorios previos (ej: 15 minutos antes).
- [ ] Sonido de alerta configurable.

---

## 📞 Soporte

Para dudas o soporte técnico, contactar al equipo de desarrollo.

