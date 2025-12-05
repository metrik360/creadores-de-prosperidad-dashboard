# 🚀 INSTRUCCIONES - Ejecutar Dashboard con Servidor Local

## El Problema Original

El dashboard no podía cargar datos directamente desde Google Sheets debido a restricciones CORS (Cross-Origin Resource Sharing) de los navegadores.

## La Solución

Se creó un **servidor Node.js local** que actúa como proxy entre el dashboard y Google Sheets, eliminando completamente el problema de CORS.

---

## ⚙️ Instalación y Ejecución

### Requisito Previo
Necesitas tener **Node.js** instalado en tu computadora.

**¿Cómo verificar si lo tienes?**
```bash
node --version
```

Si no aparece una versión, descarga Node.js desde: https://nodejs.org/

### Paso 1: Abre Terminal/Cmd
- **Mac:** Abre Terminal
- **Windows:** Abre Cmd o PowerShell
- **Linux:** Abre Terminal

### Paso 2: Navega a la carpeta del proyecto
```bash
cd /Users/mauricio/projects/creadores_de_prosperidad
```

### Paso 3: Inicia el servidor
```bash
node server.js
```

Deberías ver esto:
```
╔════════════════════════════════════════════════════════╗
║  📊 MÉTRIK Dashboard - Servidor Proxy Iniciado        ║
╚════════════════════════════════════════════════════════╝

✓ Servidor escuchando en: http://localhost:3000
✓ Dashboard disponible en: http://localhost:3000/
✓ API de datos en: http://localhost:3000/csv

Presiona Ctrl+C para detener el servidor.
```

### Paso 4: Abre el dashboard
En tu navegador, ve a:
```
http://localhost:3000/
```

¡Listo! El dashboard debe cargar los datos correctamente.

---

## 🔍 Verificación

### 1. Abre Developer Tools (F12)
- Ve a la pestaña **Console**

### 2. Busca el mensaje de éxito
Deberías ver:
```
✅ Datos cargados exitosamente: 487 filas
```

### 3. Verifica los KPIs
- Los valores deben mostrar dinero (ej: $21,120,000)
- NO deben estar vacíos o en $0

### 4. Prueba los filtros
- Cambia el mes
- Selecciona un programa
- Selecciona un estudiante
- Todo debe funcionar sin errores

---

## ⚠️ Solución de Problemas

### Problema: "node: command not found"
**Solución:** Node.js no está instalado. Descárgalo desde: https://nodejs.org/

### Problema: Puerto 3000 ya está en uso
**Solución:** Edita `server.js` y cambia el puerto:
```javascript
const PORT = 3001; // O cualquier número que no esté en uso
```

Luego accede a `http://localhost:3001/`

### Problema: "EADDRINUSE" error
**Solución:** Otro proceso está usando el puerto 3000. Puedes:
1. Cambiar el puerto (ver arriba)
2. O cerrar la aplicación que usa ese puerto
3. O reiniciar la computadora

### Problema: Dashboard carga pero sin datos
**Solución:**
1. Abre Console (F12)
2. Busca mensajes rojos de error
3. Verifica que Google Sheet siga publicado
4. Intenta refrescar la página (F5)

### Problema: "Cannot GET /csv"
**Solución:** El servidor está corriendo pero no puede conectarse a Google Sheets. Verifica:
1. Tienes conexión a internet
2. Google Sheet está publicado
3. Intenta refrescar la página

---

## 📱 Acceso desde Otros Dispositivos

Si quieres acceder al dashboard desde otra máquina en tu red local:

```
http://[TU_IP]:3000/
```

Reemplaza `[TU_IP]` con tu dirección IP local (ej: `192.168.1.100`).

**¿Cómo encontrar tu IP?**

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

**Windows:**
```bash
ipconfig
```

---

## 🛑 Detener el Servidor

En la terminal donde está corriendo, presiona:
```
Ctrl + C
```

---

## 🌐 Comparación: Archivo vs Servidor

| Aspecto | Abrir archivo HTML | Servidor Node |
|---------|-------------------|---------------|
| Datos cargan | ❌ NO (CORS bloqueado) | ✅ SÍ (sin CORS) |
| Filtros | ❌ Vacíos | ✅ Funcionan |
| KPIs | ❌ $0 | ✅ Correctos |
| Gráficas | ❌ Vacías | ✅ Con datos |
| Facilidad | ✅ Muy fácil (solo abrir) | ⚠️ Requiere terminal |

---

## 💡 ¿Cómo Funciona el Servidor?

```
Usuario (Navegador)
        ↓
    Solicita datos
        ↓
   Servidor Node.js (puerto 3000)
        ↓
    Solicita a Google Sheets
        ↓
  Google retorna CSV
        ↓
  Servidor devuelve al navegador
        ↓
  Dashboard muestra datos
```

**Ventaja:** El servidor puede hacer peticiones sin restricción de CORS, luego devuelve los datos al navegador sin problemas.

---

## 🎯 Próximas Opciones

### Opción A: Mantener el Servidor
- Pros: Simple, seguro, funciona perfecto
- Contras: Requiere tener Node.js ejecutándose

### Opción B: Publicar en Línea
- Desplegar en servicios como Heroku, Vercel, etc.
- El dashboard estaría disponible en internet
- Más trabajo pero totalmente funcional

### Opción C: Usar Extensión del Navegador
- Instalar extensión CORS en Chrome/Firefox
- Permite que el navegador ignore restricciones CORS
- Simple pero menos seguro

---

## ✅ Checklist de Verificación

- [ ] Node.js instalado (`node --version`)
- [ ] Terminal abierta en la carpeta del proyecto
- [ ] `node server.js` ejecutado correctamente
- [ ] Navegador abierto en `http://localhost:3000/`
- [ ] Console muestra "✅ Datos cargados exitosamente"
- [ ] KPIs muestran valores > $0
- [ ] Todos los filtros funcionan
- [ ] Las 3 hojas cargan correctamente
- [ ] Sin errores rojos en Console

Una vez todos los puntos estén marcados ✅, el dashboard está **100% funcional**.

---

**Creado por:** MÉTRIK QA Team
**Fecha:** 25 de Noviembre, 2025
**Versión:** 1.0
