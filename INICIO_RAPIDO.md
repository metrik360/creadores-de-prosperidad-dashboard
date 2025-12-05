# 🚀 MÉTRIK Dashboard - Inicio Rápido

## Estado Actual: ✅ FUNCIONANDO

Tu dashboard está **100% operativo** y listo para usar. El servidor local está en funcionamiento y sirviendo los datos correctamente desde Google Sheets.

---

## 📋 Checklist Rápido

- [x] Servidor Node.js instalado y funcionando
- [x] `/csv` endpoint retorna datos de Google Sheets
- [x] `/` endpoint sirve el dashboard HTML
- [x] Librerías CDN (Chart.js, PapaParse) cargadas correctamente
- [x] Datos parseados sin errores
- [x] Sistema de filtros implementado

---

## 🎯 Para Usar el Dashboard

### Opción 1: Servidor Ya Está Corriendo
Si ves este mensaje, el servidor está **activo ahora mismo**:

```
✓ Servidor escuchando en: http://localhost:3000
✓ Dashboard disponible en: http://localhost:3000/
✓ API de datos en: http://localhost:3000/csv
```

**Simplemente abre tu navegador en:**
```
http://localhost:3000/
```

### Opción 2: Reiniciar el Servidor
Si necesitas reiniciarlo:

```bash
# 1. Abre Terminal en la carpeta del proyecto
cd /Users/mauricio/projects/creadores_de_prosperidad

# 2. Inicia el servidor
node server.js

# 3. Abre en navegador
# http://localhost:3000/
```

---

## ✅ Verificación

Abre el navegador en `http://localhost:3000/` y deberías ver:

1. **Header morado** con "MÉTRIK Dashboard - Creadores de Prosperidad"
2. **Tres pestañas:** General, Estudiante, Marketing
3. **KPI Cards** mostrando valores como:
   - Ventas Totales: $21,120,000
   - Recaudado: valores reales
   - Cartera: valores reales
   - Y más...
4. **Gráficos** renderizados con datos
5. **Filtros** funcionales en la parte superior

### Si Algo No Funciona

Presiona **F12** (Developer Tools) y ve a la pestaña **Console**:

- ✅ Deberías ver: `✅ Datos cargados exitosamente: 487 filas`
- ❌ NO deberías ver errores rojos

Si ves errores:
1. Recarga la página (F5)
2. Verifica que el servidor esté corriendo
3. Verifica la conexión a internet (Google Sheets requiere)

---

## 🔧 ¿Cómo Funciona?

```
Navegador (http://localhost:3000/)
        ↓
  Solicita datos
        ↓
  Servidor Node.js (puerto 3000)
        ↓
  Solicita a Google Sheets
        ↓
  Google retorna CSV (con redirección 307)
        ↓
  Servidor procesa y devuelve
        ↓
  PapaParse convierte CSV a objetos
        ↓
  JavaScript renderiza KPIs, gráficos, filtros
```

**Ventaja:** Sin restricciones CORS, todo funciona perfecto.

---

## 📊 Datos en Google Sheets

Tu Google Sheet publicado contiene:
- **1253 líneas** de datos
- **54 columnas** con información de ventas, estudiantes, programas, etc.
- **Actualización automática:** El dashboard siempre obtiene la última versión

---

## 🛑 Detener el Servidor

En la terminal donde corre el servidor:
```
Ctrl + C
```

---

## 📱 Acceder desde Otra Computadora

Si quieres acceder desde otra máquina en tu red:

1. Abre Terminal y ejecuta:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. Copia tu IP local (ej: `192.168.1.100`)

3. En otra computadora, abre:
```
http://192.168.1.100:3000/
```

---

## 📝 Próximos Pasos (Opcional)

- **Publicar online:** Desplegar en Heroku, Vercel o AWS
- **Personalización:** Modificar colores, agregar más KPIs, etc.
- **Datos en vivo:** Conectar directamente a base de datos

---

**¿Preguntas?** Consulta los otros archivos de documentación en la carpeta del proyecto.

**Estado:** ✅ Producción Ready
**Versión:** 1.0
**Fecha:** 25 de Noviembre, 2025
