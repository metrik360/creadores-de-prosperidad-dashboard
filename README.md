# 📊 MÉTRIK Dashboard - Creadores de Prosperidad

Dashboard operacional interactivo para análisis de datos de Creadores de Prosperidad.

## 🎯 Características

### Hojas disponibles

- **General**: Vista general con KPIs, filtros por fecha, programa y año
- **Estudiante**: Análisis detallado por estudiante con tabla de pagos y gráficos
- **Marketing**: Análisis de campañas con efectividad y filtros avanzados

### Funcionalidades

✅ **Filtros Avanzados**
- Rango de fechas con accesos rápidos (Este Mes, Mes Anterior, Este Año, Todo)
- Búsqueda en tiempo real para Programa, Estudiante y Campaña
- Filtro por Año de Cierre de Venta

✅ **KPIs Dinámicos**
- Números compactos (1.1M, 4.7K) con tooltips de valores completos
- Cálculos en tiempo real basados en filtros

✅ **Visualizaciones**
- Gráficos interactivos con Chart.js
- Gráficos expandibles (Top 10 + OTROS)
- Tablas con datos filtrados

✅ **Diseño Responsive**
- Interfaz moderna y limpia
- Adaptable a diferentes tamaños de pantalla
- Temas con variables CSS

## 🚀 Inicio Rápido

### Requisitos
- Node.js (para ejecutar el servidor proxy)
- Navegador moderno

### Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/creadores-de-prosperidad-dashboard.git
cd creadores-de-prosperidad-dashboard
```

2. Instalar dependencias
```bash
npm install
```

3. Ejecutar el servidor
```bash
node server.js
```

4. Abrir en el navegador
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
├── index.html           # Aplicación principal (HTML + CSS + JS)
├── server.js            # Servidor Node.js (proxy CORS)
├── package.json         # Dependencias
├── README.md            # Este archivo
└── .gitignore           # Archivos a ignorar en git
```

## 🔧 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Gráficos**: Chart.js 3.9.1
- **Análisis de CSV**: PapaParse 5.4.1
- **Iconos**: Font Awesome 6.4.0
- **Backend**: Node.js + Express (proxy CORS)
- **Fuente**: Google Fonts (Inter, Poppins)

## 📊 Fuente de Datos

Los datos se cargan desde Google Sheets mediante una API proxy que maneja CORS.

## 🎨 Paleta de Colores

- **Primario**: #301063 (Púrpura oscuro)
- **Secundario**: #C0BECB (Púrpura claro)
- **Texto**: #36454F (Gris oscuro)
- **Éxito**: #27AE60 (Verde)
- **Error**: #E74C3C (Rojo)

## 📝 Cambios Recientes

### Sprint 1 (25 Nov 2025)
- ✅ Implementación de filtros completos
- ✅ Conversión de filtros a searchable dropdowns
- ✅ Fix de KPIs en hoja Estudiante
- ✅ Implementación de efectividad en Marketing
- ✅ Números compactos con tooltips
- ✅ Logo y ajustes visuales

## 🐛 Solución de Problemas

### Los datos no cargan
- Verifica que el servidor está ejecutándose (`node server.js`)
- Revisa la conexión a Google Sheets
- Abre la consola del navegador (F12) para ver errores

### Los gráficos no se muestran
- Asegúrate de que Chart.js se cargó correctamente
- Verifica que los datos filtrados no están vacíos

## 📧 Contacto

Para preguntas o mejoras, contacta al equipo de desarrollo de MÉTRIK.

---

**Estado**: ✅ Listo para Producción
**Última actualización**: 25 de Noviembre, 2025
