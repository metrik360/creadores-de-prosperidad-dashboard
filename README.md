# MÉTRIK - Dashboard BI
## Creadores de Prosperidad

Sistema de inteligencia de negocios para monitorear métricas críticas de ventas, recaudos y campañas de marketing.

### 📊 Características

- **3 Dashboards Especializados:**
  - **General**: Visión ejecutiva de KPIs clave
  - **Estudiante**: Análisis individual de estudiantes y su cartera
  - **Marketing**: Efectividad y ROI de campañas

- **5 Métricas Generales:**
  - Ventas Totales
  - Total Recaudado
  - Cartera Pendiente
  - Número de Programas Vendidos
  - Total de Estudiantes Atendidos

- **5 Métricas por Estudiante:**
  - Total Vendido
  - Pendiente por Recaudo
  - Total Recaudado
  - Estado
  - Número de Programas Matriculados

- **5 Métricas de Marketing:**
  - Ventas totales por Campañas
  - Total Recaudo por Campañas
  - Ratio de Efectividad
  - Total Campañas Realizadas
  - Número de Estudiantes Por Campañas

- **Gráficas Interactivas:**
  - Ventas Totales por Programa (General)
  - Recaudo/Ingreso por Programa (Estudiante)
  - Ventas Totales por Campaña (Marketing)

- **Filtros Globales:**
  - Fecha de Recaudo (rango)
  - Exclusión de Estado (ej: Retirado)

### 🛠️ Instalación

Las dependencias ya han sido instaladas. Para reinstalar:

```bash
npm install
cd frontend && npm install
```

### 🚀 Ejecución

#### Opción 1: Backend + Frontend (desarrollo)

```bash
# En una terminal - Backend
npm run dev

# En otra terminal - Frontend
npm run client
```

#### Opción 2: Producción (build + servidor)

```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:5000`

### 📊 Cargar datos desde Google Sheets

Para actualizar los datos de Google Sheets:

```bash
npm run etl
```

### 🗄️ Base de Datos

La base de datos SQLite se encuentra en `db.sqlite` con las siguientes tablas:

- **students**: Información de estudiantes
- **programs**: Catálogo de programas
- **campaigns**: Campañas de marketing
- **sales**: Transacciones de venta
- **cart**: Información de cartera pendiente

### 📁 Estructura del Proyecto

```
metrik-creadores-prosperidad/
├── backend/
│   ├── db.js              # Configuración de BD
│   ├── server.js          # Servidor Express
│   ├── routes/
│   │   └── metrics.js     # Endpoints de métricas
│   └── etl/
│       └── data-pipeline.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas (General, Estudiante, Marketing)
│   │   ├── services/      # Cliente API
│   │   └── App.jsx
│   └── package.json
├── db.sqlite              # Base de datos
└── README.md
```

### 🔗 Endpoints API

**Métricas Generales:**
- `GET /api/metrics/general`

**Métricas por Estudiante:**
- `GET /api/metrics/student/:studentName`
- `GET /api/metrics/students` (listado)

**Métricas por Programa:**
- `GET /api/metrics/programs`

**Métricas por Campaña:**
- `GET /api/metrics/campaigns`

**Metadata:**
- `GET /api/metrics/date-range`

### 🔍 Filtros (Query Parameters)

Todos los endpoints de métricas soportan:
- `startDate`: Fecha inicio (YYYY-MM-DD)
- `endDate`: Fecha fin (YYYY-MM-DD)
- `excludeStatus`: Estado a excluir (ej: "Retirado")

Ejemplo:
```
GET /api/metrics/general?startDate=2024-10-01&endDate=2025-03-31&excludeStatus=Retirado
```

### 📋 Notas

- Los datos se cargan desde: [Google Sheets](https://docs.google.com/spreadsheets/d/1xPx1KNRJg0n6pYmKUn7cwD0kEs999xso3cLlwxZe1sg)
- Se excluyen automáticamente registros con estado "Retirado"
- Período de datos: Octubre 2024 - Marzo 2025 (1,186 registros)
- Moneda: COP (Pesos Colombianos)

### 🔧 Desarrollo

El proyecto usa:
- **Backend**: Node.js, Express, SQLite3
- **Frontend**: React, Chart.js, React Router
- **Styling**: CSS3 con variables CSS

Para desarrollo local con hot-reload:

```bash
npm run dev        # Backend con nodemon
npm run client     # Frontend con react-scripts
```

### 📞 Soporte

Para issues o mejoras, contacta al equipo de desarrollo.
