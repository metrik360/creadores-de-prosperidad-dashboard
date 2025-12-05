# 🚀 MÉTRIK - Guía de Inicio Rápido

## ¿Qué es MÉTRIK?

Dashboard de Business Intelligence para **Creadores de Prosperidad** que proporciona:
- 📊 3 páginas especializadas (General, Estudiante, Marketing)
- 📈 Gráficas interactivas
- 🔍 Filtros globales por fecha y estado
- 💰 15 KPIs clave

## Iniciar MÉTRIK

### Opción 1: Script automático (Recomendado)

```bash
cd /Users/mauricio/metrik-creadores-prosperidad
./start.sh
```

Esto iniciará:
- ✅ Backend en `http://localhost:5000`
- ✅ Frontend en `http://localhost:3000`

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd /Users/mauricio/metrik-creadores-prosperidad
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/mauricio/metrik-creadores-prosperidad
npm run client
```

## Acceder a MÉTRIK

1. Abre tu navegador
2. Ve a: `http://localhost:3000` (o `http://localhost:5000`)
3. ¡Listo! 🎉

## Estructura del Dashboard

### 📄 Página: GENERAL
**Visión ejecutiva de KPIs principales**

Métricas:
- Ventas Totales (# transacciones)
- Total Recaudado (COP)
- Cartera Pendiente (COP)
- Programas Vendidos (# únicos)
- Estudiantes Atendidos (# total)

Gráfica:
- **Ventas Totales por Programa** (horizontal bar chart)

### 👤 Página: ESTUDIANTE
**Análisis individual de estudiantes**

- Selector de estudiante (dropdown)
- Métricas del estudiante seleccionado
- Desglose por programa

Métricas:
- Total Vendido (COP)
- Pendiente por Recaudo (COP)
- Total Recaudado (COP)
- Estado (Activo/Retirado/etc)
- Programas Matriculados (#)

Gráfica:
- **Recaudo/Ingreso por Programa** (stacked bar chart)

### 📢 Página: MARKETING
**Análisis de campañas de marketing**

Métricas Agregadas:
- Ventas Totales Campañas (COP)
- Total Recaudado Campañas (COP)
- Total Campañas Realizadas (#)
- Efectividad Promedio (%)
- Estudiantes Por Campaña (#)

Gráfica:
- **Ventas Totales por Campaña** (horizontal bar chart)

Tabla:
- Detalle de cada campaña con efectividad visual

## 🔍 Filtros Globales

Disponibles en todas las páginas:

1. **Fecha Inicial**: Rango de datos desde
2. **Fecha Final**: Rango de datos hasta
3. **Excluir Estado**: Filtra registros (ej: Retirado)

**Botones:**
- ✅ Aplicar - Ejecuta filtros
- 🔄 Limpiar - Resetea a datos completos

## 📊 Datos

- **Período**: Octubre 2024 - Marzo 2025
- **Total Registros**: 1,186 transacciones
- **Moneda**: COP (Pesos Colombianos)
- **Fuente**: Google Sheets (importación automática)

## 🔄 Actualizar Datos

Si Google Sheets fue actualizado:

```bash
npm run etl
```

Luego reinicia el servidor.

## 📊 Ejemplo de Flujo de Uso

1. **Abre MÉTRIK** → `http://localhost:3000`
2. **Ve a Página General** → Revisa KPIs generales
3. **Filtra por período** → Selecciona fechas de interés
4. **Visualiza gráficas** → Identifica programas top
5. **Va a Estudiante** → Selecciona un estudiante
6. **Revisa cartera** → Identifica pendientes
7. **Va a Marketing** → Analiza efectividad de campañas
8. **Filtra resultados** → Excluye estados innecesarios

## 🛑 Detener MÉTRIK

- **Si usas `./start.sh`**: Presiona `Ctrl+C`
- **Terminales manuales**: Presiona `Ctrl+C` en cada terminal

## 🆘 Troubleshooting

### Puerto ocupado (5000 o 3000)

```bash
# Encuentra qué proceso usa el puerto
lsof -i :5000
lsof -i :3000

# Matalo (reemplaza PID)
kill -9 PID
```

### Base de datos corrupta

```bash
rm db.sqlite
npm run etl
```

### Dependencias rotas

```bash
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install && cd ..
npm run etl
```

## 📝 Notas Técnicas

- **Backend**: Node.js + Express + SQLite
- **Frontend**: React + Chart.js
- **Idioma**: Español
- **Responsive**: Funciona en móvil/tablet

## 📚 Documentación Completa

Ver: [README.md](./README.md)

---

**¡Ya estás listo para usar MÉTRIK!** 🎉
