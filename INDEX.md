# 📑 MÉTRIK - Índice de Archivos y Documentación

## 📚 Documentación

| Archivo | Descripción | Leer si... |
|---------|------------|-----------|
| **[README.md](./README.md)** | Guía técnica completa | Necesitas info técnica detallada |
| **[QUICKSTART.md](./QUICKSTART.md)** | Inicio en 5 minutos | Quieres comenzar ya |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Diseño técnico | Necesitas entender la arquitectura |
| **[PHASES.md](./PHASES.md)** | Progreso del proyecto | Quieres ver el estado general |
| **[DELIVERY.md](./DELIVERY.md)** | Documento de entrega | Necesitas un resumen ejecutivo |
| **[COMMANDS.md](./COMMANDS.md)** | Comandos útiles | Necesitas referencia de comandos |
| **[SUMMARY.txt](./SUMMARY.txt)** | Resumen visual | Quieres una visión general rápida |
| **[INDEX.md](./INDEX.md)** | Este archivo | Necesitas navegar el proyecto |

---

## 🔧 Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias y scripts del backend |
| `package-lock.json` | Lock file de npm |
| `.env` | Variables de entorno (privado) |
| `.env.example` | Template de variables de entorno |
| `.gitignore` | Archivos ignorados por git |

---

## 🖥️ Backend (Node.js + Express)

### Punto de Entrada
| Archivo | Descripción |
|---------|------------|
| `server.js` | Servidor Express principal - **INICIA AQUÍ** |

### Base de Datos
| Archivo | Descripción |
|---------|------------|
| `db.js` | Configuración SQLite y schema |
| `db.sqlite` | Base de datos (164 KB, 1,186 registros) |

### API REST
| Archivo | Descripción | Endpoints |
|---------|------------|-----------|
| `routes/metrics.js` | Controllers de API | GET /api/metrics/* |

### ETL
| Archivo | Descripción | Ejecutar con |
|---------|------------|---|
| `etl/data-pipeline.js` | Carga datos de Google Sheets | `npm run etl` |

### Validación
| Archivo | Descripción | Ejecutar con |
|---------|------------|---|
| `validate-data.js` | Valida integridad de datos | `node validate-data.js` |

---

## ⚛️ Frontend (React)

### Configuración
| Archivo | Propósito |
|---------|-----------|
| `frontend/package.json` | Dependencias y scripts frontend |
| `frontend/package-lock.json` | Lock file de npm |
| `frontend/public/index.html` | HTML raíz |

### Punto de Entrada
| Archivo | Descripción |
|---------|------------|
| `frontend/src/index.js` | Entry point React |
| `frontend/src/App.jsx` | Componente principal + Router |
| `frontend/src/App.css` | Estilos globales |

### Páginas (Dashboards)
| Archivo | Dashboard | KPIs | Gráficas |
|---------|-----------|------|----------|
| `frontend/src/pages/General.jsx` | General | 5 | 1 (Programas) |
| `frontend/src/pages/Estudiante.jsx` | Estudiante | 5 + selector | 1 (Recaudo) |
| `frontend/src/pages/Marketing.jsx` | Marketing | 5 | 1 (Campañas) |

### Estilos
| Archivo | Para |
|---------|------|
| `frontend/src/pages/General.css` | Página General |
| `frontend/src/pages/Estudiante.css` | Página Estudiante |
| `frontend/src/pages/Marketing.css` | Página Marketing |

### Componentes Reutilizables
| Archivo | Descripción | Ubicación |
|---------|------------|-----------|
| `frontend/src/components/Filters.jsx` | Filtros globales | Todas las páginas |
| `frontend/src/components/Filters.css` | Estilos filtros | - |

### Servicios
| Archivo | Descripción |
|---------|------------|
| `frontend/src/services/api.js` | Cliente HTTP (Axios) |

---

## 📊 Estructura de Datos

### Base de Datos (SQLite)

```
students (310)
├── id (PK)
├── name (UNIQUE)
├── created_at
└── updated_at

programs (27)
├── id (PK)
├── name (UNIQUE)
└── created_at

campaigns (30)
├── id (PK)
├── name (UNIQUE)
└── created_at

sales (1,186)
├── id (PK)
├── student_id (FK → students)
├── program_id (FK → programs)
├── campaign_id (FK → campaigns)
├── sale_date
├── sale_amount_usd
├── sale_amount_cop
├── currency
├── status
├── payment_status
├── payment_method
├── payment_date
├── payment_amount
├── payment_currency
├── notes
└── created_at

cart (0)
├── id (PK)
├── sale_id (FK → sales)
├── pending_amount
├── vencido_dias
├── status
└── created_at
```

---

## 🔗 Endpoints API

### Generales
```
GET /api/health                    Health check
GET /api/metrics/general           5 KPIs generales
GET /api/metrics/date-range        Rango de fechas
```

### Por Estudiante
```
GET /api/metrics/students          Listado de estudiantes
GET /api/metrics/student/:name     Métricas de un estudiante
```

### Por Programa
```
GET /api/metrics/programs          Análisis por programa
```

### Por Campaña
```
GET /api/metrics/campaigns         Análisis por campaña
```

### Parámetros de Filtro (Globales)
```
startDate=YYYY-MM-DD      Fecha inicial
endDate=YYYY-MM-DD        Fecha final
excludeStatus=Status      Estado a excluir (ej: Retirado)
```

---

## 🚀 Scripts Disponibles

### Backend
```bash
npm start                   Iniciar servidor (producción)
npm run dev                 Iniciar servidor (desarrollo con nodemon)
npm run etl                 Cargar datos desde Google Sheets
npm run client              Iniciar frontend (dev)
npm run build               Build frontend para producción
```

### Frontend (dentro de frontend/)
```bash
npm start                   Dev server (port 3000)
npm run build               Production build
npm run test                Ejecutar tests
npm run eject               Eject react-scripts (no reversible)
```

---

## 📱 Componentes React

### App
- **Ubicación**: `frontend/src/App.jsx`
- **Responsabilidad**: Router, layout principal
- **Props**: -
- **State**: filters

### Filters
- **Ubicación**: `frontend/src/components/Filters.jsx`
- **Responsabilidad**: Filtros globales
- **Props**: filters, setFilters
- **State**: startDate, endDate, excludeStatus

### Pages
- **General**: Métricas generales + tabla + gráfica
- **Estudiante**: Selector estudiante + métricas + tabla + gráfica
- **Marketing**: Métricas + tabla + gráfica

---

## 🔐 Seguridad

✅ **Implementado**:
- Prepared statements (SQLite)
- CORS configurado
- Input trimming

❌ **No implementado** (por especificación):
- Autenticación
- Rate limiting
- Validación exhaustiva

---

## 📈 KPIs Implementados

### Generales (5)
1. Ventas Totales (# transacciones)
2. Total Recaudado (COP)
3. Cartera Pendiente (COP)
4. Programas Vendidos (# únicos)
5. Estudiantes Atendidos (# total)

### Estudiante (5)
1. Total Vendido (COP)
2. Pendiente por Recaudo (COP)
3. Total Recaudado (COP)
4. Estado (texto)
5. Programas Matriculados (#)

### Marketing (5)
1. Ventas Totales por Campaña (COP)
2. Total Recaudo por Campaña (COP)
3. Ratio de Efectividad (%)
4. Total Campañas Realizadas (#)
5. Estudiantes por Campaña (#)

---

## 🎯 Guía Rápida de Uso

### Para Desarrolladores
1. Lee [QUICKSTART.md](./QUICKSTART.md)
2. Ejecuta `./start.sh`
3. Abre `http://localhost:3000`

### Para Entender la Arquitectura
1. Lee [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Revisa `db.js` para BD
3. Revisa `routes/metrics.js` para API
4. Explora `frontend/src/pages/` para UI

### Para Agregar Funcionalidades
1. Revisa [ARCHITECTURE.md](./ARCHITECTURE.md) - Sección "Escalabilidad"
2. Sigue [COMMANDS.md](./COMMANDS.md) para desarrollo
3. Usa [PHASES.md](./PHASES.md) para contexto

---

## 📋 Checklist de Lectura Recomendada

### Primer Contacto (5 min)
- [ ] Este archivo (INDEX.md)
- [ ] SUMMARY.txt

### Iniciadores (15 min)
- [ ] QUICKSTART.md
- [ ] Start.sh

### Comprensión General (30 min)
- [ ] README.md
- [ ] DELIVERY.md

### Detalle Técnico (60 min)
- [ ] ARCHITECTURE.md
- [ ] routes/metrics.js
- [ ] frontend/src/pages/General.jsx

### Referencia (búsqueda)
- [ ] COMMANDS.md
- [ ] validate-data.js

---

## 🗂️ Organización de Carpetas

```
metrik-creadores-prosperidad/
├── 📂 etl/                    ETL Pipeline
├── 📂 routes/                 Rutas API
├── 📂 frontend/               Frontend React
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 pages/          Dashboards (3)
│   │   ├── 📂 components/     Componentes
│   │   └── 📂 services/       Cliente HTTP
│   └── package.json
├── 📂 node_modules/           Dependencias (ignorar)
├── db.sqlite                  Base de datos
├── server.js                  Servidor
├── db.js                      Config BD
├── package.json               Dependencias
└── docs/*.md                  7 documentos
```

---

## 🔄 Flujo de Datos

```
Google Sheets (CSV)
    ↓
ETL (npm run etl)
    ↓
SQLite (db.sqlite)
    ↓
Express API (6 endpoints)
    ↓
React Frontend (3 páginas)
    ↓
Chart.js Visualizations
```

---

## 📞 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Puerto ocupado | `lsof -i :5000` → `kill -9 PID` |
| BD corrupta | `rm db.sqlite && npm run etl` |
| Dependencias rotas | `rm -rf node_modules && npm install` |
| Datos no cargan | `node validate-data.js` |
| Frontend no abre | Verifica puerto 3000 |

---

## 🎓 Recursos para Aprender

### Tecnologías Usadas
- **React**: https://react.dev
- **Express**: https://expressjs.com
- **SQLite**: https://www.sqlite.org
- **Chart.js**: https://www.chartjs.org

### Documentación Interna
- [README.md](./README.md) - Técnica
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Diseño
- [COMMANDS.md](./COMMANDS.md) - CLI

---

**Última actualización**: 24 Noviembre 2025
**Versión**: 1.0.0
**Proyecto**: MÉTRIK - Creadores de Prosperidad
