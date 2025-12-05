# 📋 MÉTRIK - Comandos Útiles

## 🚀 Inicio Rápido

### Iniciar Sistema (Auto)
```bash
cd /Users/mauricio/metrik-creadores-prosperidad
./start.sh
```

### Iniciar Sistema (Manual)

**Terminal 1 - Backend (Puerto 5000)**
```bash
cd /Users/mauricio/metrik-creadores-prosperidad
npm run dev
```

**Terminal 2 - Frontend (Puerto 3000)**
```bash
cd /Users/mauricio/metrik-creadores-prosperidad
npm run client
```

### Acceder al Dashboard
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

---

## 🔄 Datos & ETL

### Actualizar datos desde Google Sheets
```bash
npm run etl
```

### Validar integridad de datos
```bash
node validate-data.js
```

Muestra:
- Estadísticas de tablas
- Integridad referencial
- Métricas financieras
- Top programas/campañas
- Rango de fechas
- Distribución de estados

---

## 📦 Dependencias

### Instalar todas las dependencias
```bash
npm install
cd frontend && npm install && cd ..
```

### Actualizar dependencias
```bash
npm update
cd frontend && npm update && cd ..
```

### Auditar seguridad
```bash
npm audit
cd frontend && npm audit && cd ..
```

### Auditar y arreglar
```bash
npm audit fix
cd frontend && npm audit fix && cd ..
```

---

## 🛠️ Desarrollo

### Dev con hot-reload (Backend)
```bash
npm run dev
```

### Iniciar solo frontend (dev)
```bash
npm run client
```

### Build para producción
```bash
npm run build
```

---

## 🧪 Testing & Validación

### Ver estadísticas de datos
```bash
node validate-data.js
```

### Ejecutar ETL nuevamente
```bash
rm db.sqlite
npm run etl
```

### Limpiar caché y reinstalar
```bash
rm -rf node_modules frontend/node_modules package-lock.json
npm install
cd frontend && npm install && cd ..
```

---

## 📊 Base de Datos

### Acceder a SQLite directamente
```bash
sqlite3 db.sqlite
```

**Comandos SQL útiles:**
```sql
-- Ver tablas
.tables

-- Ver estadísticas
SELECT 'students' as tabla, COUNT(*) as count FROM students
UNION ALL
SELECT 'programs', COUNT(*) FROM programs
UNION ALL
SELECT 'campaigns', COUNT(*) FROM campaigns
UNION ALL
SELECT 'sales', COUNT(*) FROM sales;

-- Top programas
SELECT p.name, COUNT(*) as ventas, SUM(s.sale_amount_cop) as total
FROM sales s
JOIN programs p ON s.program_id = p.id
GROUP BY p.id
ORDER BY total DESC
LIMIT 10;

-- Top estudiantes
SELECT st.name, COUNT(*) as programas, SUM(s.sale_amount_cop) as total
FROM sales s
JOIN students st ON s.student_id = st.id
GROUP BY st.id
ORDER BY total DESC
LIMIT 10;

-- Salir
.quit
```

---

## 🔌 API REST

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Obtener métricas generales
```bash
curl "http://localhost:5000/api/metrics/general"
```

### Con filtros
```bash
curl "http://localhost:5000/api/metrics/general?startDate=2024-10-01&endDate=2025-03-31&excludeStatus=Retirado"
```

### Obtener estudiantes
```bash
curl "http://localhost:5000/api/metrics/students"
```

### Obtener métricas de un estudiante
```bash
curl "http://localhost:5000/api/metrics/student/Lina%20Barón"
```

### Obtener programas
```bash
curl "http://localhost:5000/api/metrics/programs"
```

### Obtener campañas
```bash
curl "http://localhost:5000/api/metrics/campaigns"
```

### Rango de fechas disponibles
```bash
curl "http://localhost:5000/api/metrics/date-range"
```

---

## 🐛 Troubleshooting

### Puerto 5000 ocupado
```bash
# Encontrar proceso
lsof -i :5000

# Matar proceso (reemplaza PID)
kill -9 [PID]

# Alternativamente, usar puerto diferente
PORT=5001 npm run dev
```

### Puerto 3000 ocupado
```bash
# Encontrar proceso
lsof -i :3000

# Matar proceso (reemplaza PID)
kill -9 [PID]
```

### Errores de dependencias
```bash
# Limpiar node_modules
rm -rf node_modules
rm -rf frontend/node_modules
rm package-lock.json

# Reinstalar
npm install
cd frontend && npm install && cd ..
```

### BD corrupta
```bash
# Eliminar DB
rm db.sqlite

# Cargar datos nuevamente
npm run etl
```

### Problemas con SSL (Google Sheets)
```bash
# Si hay errores de certificado, temporalmente:
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run etl

# O actualizar Node.js a última versión
```

---

## 📈 Monitoreo

### Ver logs del backend
```bash
# Já está en la terminal si usas npm run dev
```

### Ver logs del frontend (dev)
```bash
# Visible en la terminal que corre npm run client
```

### Ver logs del navegador
Presiona `F12` → Console

---

## 🚢 Deployment

### Build para producción
```bash
npm run build
```

Genera:
- `/frontend/build/` - Assets frontend optimizados

### Servir producción localmente
```bash
npm start
```

---

## 📝 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `server.js` | Punto de entrada backend |
| `db.js` | Configuración SQLite |
| `routes/metrics.js` | Endpoints API |
| `etl/data-pipeline.js` | Pipeline de carga |
| `frontend/src/App.jsx` | App principal React |
| `frontend/src/pages/` | Dashboards |
| `frontend/src/components/Filters.jsx` | Filtros |
| `db.sqlite` | Base de datos |

---

## 🔍 Debugging

### Habilitar logs del backend
```bash
# Editar server.js y agregar:
app.use(morgan('dev')); // Instalar morgan primero

npm install morgan
npm run dev
```

### Inspeccionar requests API
```bash
# En DevTools (F12), ir a Network tab
# Ejecutar acciones en dashboard
# Ver requests y responses
```

### Validar JSON de API
```bash
# En terminal
curl -s http://localhost:5000/api/metrics/general | jq '.'
```

---

## 🎯 Scripts Disponibles

### Backend (package.json)
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "etl": "node etl/data-pipeline.js",
  "client": "cd frontend && npm start",
  "build": "cd frontend && npm run build"
}
```

### Ejecutar scripts
```bash
npm start         # Producción
npm run dev       # Desarrollo
npm run etl       # Cargar datos
npm run client    # Frontend dev
npm run build     # Build frontend
```

---

## 📚 Documentación

```bash
# Ver documentos disponibles
ls *.md

# Leer documentos
cat README.md        # Guía completa
cat QUICKSTART.md    # Inicio rápido
cat ARCHITECTURE.md  # Diseño técnico
cat PHASES.md        # Progreso
cat DELIVERY.md      # Documento de entrega
cat COMMANDS.md      # Este archivo
```

---

## 🔗 Enlaces Útiles

**Datos:**
- [Google Sheets](https://docs.google.com/spreadsheets/d/1xPx1KNRJg0n6pYmKUn7cwD0kEs999xso3cLlwxZe1sg)

**Dependencias:**
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Chart.js](https://www.chartjs.org/)
- [SQLite](https://www.sqlite.org/)

---

## 💡 Tips & Tricks

### Resetear todo rápidamente
```bash
rm db.sqlite
rm -rf node_modules frontend/node_modules
npm install && cd frontend && npm install && cd ..
npm run etl
npm run dev &
npm run client
```

### Cambiar puerto backend
```bash
PORT=8000 npm run dev
```

### Cambiar puerto frontend (en frontend/.env)
```
PORT=3001
REACT_APP_API_URL=http://localhost:8000/api
```

### Ejecutar ETL en background
```bash
npm run etl &
```

### Ver proceso
```bash
ps aux | grep node
```

---

**Última actualización**: 24 Noviembre 2025
**Versión**: 1.0.0
