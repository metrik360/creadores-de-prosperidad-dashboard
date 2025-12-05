# 🏗️ MÉTRIK - Arquitectura Técnica

## Visión General

MÉTRIK es una aplicación full-stack de Business Intelligence con:
- **Backend**: API REST con endpoints de métricas
- **Database**: SQLite con modelo normalizado
- **Frontend**: SPA React con 3 dashboards
- **ETL**: Pipeline automático desde Google Sheets

```
┌─────────────────────────────────────────────────────┐
│  Google Sheets (Fuente de Datos)                    │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  ETL Pipeline (data-pipeline.js)                    │
│  - Descarga CSV desde Google Sheets                 │
│  - Parsea y normaliza datos                         │
│  - Inserta en SQLite                                │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  SQLite Database (db.sqlite)                        │
│  ├─ students                                        │
│  ├─ programs                                        │
│  ├─ campaigns                                       │
│  ├─ sales                                           │
│  └─ cart                                            │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  Backend API (Express.js)                           │
│  ├─ GET /api/metrics/general                        │
│  ├─ GET /api/metrics/student/:name                  │
│  ├─ GET /api/metrics/programs                       │
│  ├─ GET /api/metrics/campaigns                      │
│  └─ GET /api/metrics/students                       │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  Frontend (React)                                   │
│  ├─ General Dashboard      (Página 1)              │
│  ├─ Student Dashboard      (Página 2)              │
│  └─ Marketing Dashboard    (Página 3)              │
└─────────────────────────────────────────────────────┘
```

## Stack Técnico

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18
- **Database**: SQLite3
- **HTTP Client**: Axios
- **Parser**: csv-parse
- **Dev**: Nodemon

### Frontend
- **Library**: React 18
- **Router**: React Router 6
- **Charts**: Chart.js 4 + react-chartjs-2 5
- **HTTP Client**: Axios
- **Build**: react-scripts 5
- **Styling**: CSS3 (sin frameworks)

### DevOps
- **Package Manager**: npm
- **Database**: SQLite (archivo local)
- **Environment**: .env

## Modelo de Datos

```sql
-- Students
students (id, name, created_at, updated_at)

-- Programs
programs (id, name, created_at)

-- Campaigns
campaigns (id, name, created_at)

-- Sales (transacciones)
sales (
  id, student_id (FK), program_id (FK), campaign_id (FK),
  sale_date, sale_amount_usd, sale_amount_cop, currency,
  status, payment_status, payment_method, payment_date,
  payment_amount, payment_currency, notes, created_at
)

-- Cart (cartera)
cart (
  id, sale_id (FK), pending_amount,
  vencido_dias, status, created_at
)
```

## Flujo de Datos

### 1. Ingesta (ETL)
```
Google Sheets CSV
    ↓
Descarga con Axios
    ↓
Parse CSV → Normalizar
    ↓
Deduplicar (INSERT OR IGNORE)
    ↓
SQLite (normalizado)
```

### 2. Consulta de Métricas
```
Frontend (React)
    ↓
Axios → /api/metrics/{endpoint}
    ↓
Express Route Handler
    ↓
SQL Query (con filtros)
    ↓
JSON Response
    ↓
React State → Render
```

### 3. Visualización
```
Datos JSON
    ↓
Chart.js (gráficas)
    ↓
Formato Moneda (COP)
    ↓
HTML Render
```

## Endpoints API

### General Metrics
```
GET /api/metrics/general
Query params: startDate, endDate, excludeStatus
Response: {
  totalSales: number,
  totalTransactions: number,
  totalRecaudado: number,
  carteraPendiente: number,
  programasVendidos: number,
  estudiantesAtendidos: number
}
```

### Student Metrics
```
GET /api/metrics/student/:studentName
Query params: startDate, endDate, excludeStatus
Response: {
  estudiante: string,
  totalVendido: number,
  totalRecaudado: number,
  pendiente: number,
  estado: string,
  programasMatriculados: number,
  detalles: [{program_name, sale_amount_cop, ...}]
}
```

### Program Metrics
```
GET /api/metrics/programs
Query params: startDate, endDate, excludeStatus
Response: [{
  program: string,
  totalVentas: number,
  ventasTotales: number,
  estudiantes: number,
  recaudoTotal: number
}]
```

### Campaign Metrics
```
GET /api/metrics/campaigns
Query params: startDate, endDate, excludeStatus
Response: [{
  campaign: string,
  totalVentas: number,
  ventasTotales: number,
  recaudoTotal: number,
  estudiantes: number,
  efectividad: number (%)
}]
```

### Student List
```
GET /api/metrics/students
Response: [string, string, ...]
```

### Date Range
```
GET /api/metrics/date-range
Response: {
  minDate: string (YYYY-MM-DD),
  maxDate: string (YYYY-MM-DD)
}
```

## Componentes React

### Pages
- **General.jsx**: Dashboard general con métricas y gráfica
- **Estudiante.jsx**: Selector de estudiante + métricas individuales
- **Marketing.jsx**: Métricas de campaña con efectividad

### Components
- **Filters.jsx**: Filtros globales (fecha, estado)

### Services
- **api.js**: Cliente Axios pre-configurado

## KPIs Implementados

### Generales (5)
1. Ventas Totales (transacciones)
2. Total Recaudado (COP)
3. Cartera Pendiente (COP)
4. Número de Programas Vendidos
5. Total de Estudiantes Atendidos

### Estudiante (5)
1. Total Vendido (COP)
2. Pendiente por Recaudo (COP)
3. Total Recaudado (COP)
4. Estado (texto)
5. Número de Programas Matriculados

### Marketing (5)
1. Ventas totales por Campañas (COP)
2. Total Recaudo por Campañas (COP)
3. Ratio de Efectividad (%)
4. Total Campañas Realizadas (#)
5. Número de Estudiantes Por Campañas

### Gráficas (3)
1. Ventas Totales por Programa (General)
2. Recaudo/Ingreso por Programa (Estudiante)
3. Ventas Totales por Campaña (Marketing)

## Filtros Globales

Todos los endpoints soportan:
- `startDate`: YYYY-MM-DD
- `endDate`: YYYY-MM-DD
- `excludeStatus`: Cadena (ej: "Retirado")

Implementados en:
- Frontend: `Filters.jsx`
- Backend: Parámetros SQL WHERE

## Decisiones de Diseño

### 1. SQLite en lugar de DB remota
✅ **Ventajas**: Portabilidad, sin dependencias externas
⚠️ **Limitación**: No es escalable a miles de usuarios

### 2. Normalización (INSERT OR IGNORE)
✅ Previene duplicados en re-ejecuciones del ETL
⚠️ No hay update de registros (solo inserts)

### 3. Moneda fija COP
✅ Simplifica cálculos y visualización
⚠️ No soporta conversiones USD dinámicas

### 4. Sin ORM (SQL directo)
✅ Control total, sin overhead
⚠️ Vulnerable a SQL injection (mitigado con prepared statements)

### 5. CSV directo de Google Sheets
✅ No requiere API key
⚠️ Requiere acceso público al link

## Escalabilidad

Para producción considerar:

1. **Database**
   - Migrar a PostgreSQL
   - Agregar índices en campos de filtro
   - Connection pooling

2. **Backend**
   - Caching con Redis
   - Paginación en endpoints
   - Rate limiting

3. **Frontend**
   - Code splitting
   - Lazy loading de pages
   - Service worker

4. **Deployment**
   - Docker + Docker Compose
   - CI/CD (GitHub Actions)
   - Monitoring (Sentry, LogRocket)

## Seguridad

Implementado:
- ✅ CORS habilitado
- ✅ Prepared statements (SQL injection prevention)
- ❌ Sin autenticación (por especificación)
- ❌ Sin rate limiting
- ❌ Sin validación de input (TODO)

## Performance

Optimizaciones:
- ✅ Índices implícitos (primary keys)
- ✅ Caché front-end (state)
- ⚠️ Sin paginación (1,200 registros es manageable)
- ⚠️ Chart.js renderiza todo a la vez

Para mejorar:
1. Agregar índices en sales.student_id, program_id, campaign_id
2. Limitar resultados de tabla con paginación
3. Lazy load gráficas con Intersection Observer

---

**Última actualización**: 2025-11-24
**Versión**: 1.0.0
