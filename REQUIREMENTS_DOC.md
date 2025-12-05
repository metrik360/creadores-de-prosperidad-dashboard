# MÉTRIK Requirements Doc - Creadores de Prosperidad

**Fecha:** 24/11/2025
**Responsable Discovery:** DISCOVERY AGENT
**Cliente:** Creadores de Prosperidad
**Proyecto:** Dashboard Operacional - Educación Virtual
**Presupuesto:** 10 horas
**Fecha Entrega:** 01/12/2025 (Día 7)

---

## 1. CONTEXTO DEL NEGOCIO

- **Industria:** Cursos de Educación Financiera Virtual
- **Problema que resuelve:**
  - No existe un espacio centralizado para consultar indicadores clave
  - Navegan sin data confiable o basándose en intuición
  - Falta visibilidad de pagos y recaudos por estudiante
  - No saben cuánta cartera está pendiente por recoger
  - Desconocen el impacto real de las campañas de marketing en los ingresos

- **Usuario principal:**
  - 2 Founders (CEO/Co-founder)
  - Equipo operativo
  - Área contable
  - Nivel técnico: Google Sheets básico (no técnico)
  - Nombres exactos: Pendiente de confirmar

- **Decisiones clave:**
  1. Lanzar nuevas campañas de marketing
  2. Lanzar nuevos cursos
  3. Cerrar cursos (si no generan revenue)
  4. Acciones de cobranza y seguimiento a estudiantes
  5. Ajustar precios o crear promociones
  6. Decisiones de inversión en marketing

---

## 2. PREGUNTAS CRÍTICAS - TOP 3

Las 3 preguntas más importantes que el dashboard debe responder:

### Pregunta 1: ¿Cuánto revenue tuvimos este mes vs. el mes pasado?
**Frecuencia de consulta:** Diaria
**Quién pregunta:** Founders

### Pregunta 2: ¿Cuánta cartera está pendiente por recaudar?
**Frecuencia de consulta:** Diaria
**Quién pregunta:** Founders y Área Contable

### Pregunta 3: ¿Cuál fue el impacto de mi última campaña?
**Frecuencia de consulta:** Semanal/Según necesidad
**Quién pregunta:** Founders

---

## 3. FUENTE DE DATOS

| Aspecto | Detalle |
|--------|---------|
| **Sistema origen** | Google Sheets |
| **Ubicación** | https://docs.google.com/spreadsheets/d/1xPx1KNRJg0n6pYmKUn7cwD0kEs999xso3cLlwxZe1sg/edit?gid=1833187071#gid=1833187071 |
| **Hoja** | BASE INGRESOS |
| **Acceso** | Link público - sin credenciales requeridas |
| **Frecuencia actualización** | Manual, varias veces al día (dentro de las 24 horas) |
| **Responsable actualización** | Pendiente de confirmar |
| **Costo acceso** | Gratis |

### Columnas disponibles (críticas para el dashboard):

**Identificación:**
- ESTUDIANTE: Nombre del estudiante
- ESTADO: Estado del estudiante

**Segmentación:**
- PROGRAMA: Curso/Programa vendido
- CAMPAÑA (Juli): Campaña de marketing
- ORIGEN (Victor): Fuente del lead
- AÑO CIERRE DE VENTA: Año contable

**Ingresos y Recaudos:**
- TOTAL VENTA *EXP COP*: Valor de venta en COP (COLUMNA PRINCIPAL)
- $R & PROY exp pesos: Recaudo y proyectado final en COP
- NETO EXPRESADO EN PESOS: Total recaudado en COP
- PENDIENTE RECAUDO INICIAL EXPRESADO TODO EN PESOS: Cartera pendiente en COP
- *A* PENDIENTE RECAUDO EXPRESADO EN PESOS: Cartera pendiente ajustada en COP

**Fechas (críticas para filtros):**
- FECHA VENCIMIENTO: Fecha máxima de pago
- AJUSTES VENCIMIENTO: Nueva fecha según acuerdos
- FECHA PAGO: Fecha exacta del pago realizado
- F. INICIO: Inicio del programa
- F. FINALIZACIÓN: Fin del programa

**Estados de Pago:**
- ESTADO PAGOS: Pagado/Pendiente
- TIPO DE INGRESO: Cartera/Primer Recaudo/Recuperación/Retirado

---

## 4. KPIS PRIORITARIOS

**Total KPIs:** 15

### GRUPO 1: GENERALES (5 KPIs)

| # | KPI | Definición | Unidad | Fórmula | Meta |
|---|-----|-----------|--------|---------|------|
| 1 | Ventas Totales | Suma de todas las ventas proyectadas | COP | SUM($R & PROY exp pesos) | Por definir |
| 2 | Total Recaudado | Dinero efectivamente cobrado | COP | SUM(NETO EXPRESADO EN PESOS) | Por definir |
| 3 | Cartera Pendiente | Dinero aún no recaudado | COP | SUM(PENDIENTE RECAUDO INICIAL EXPRESADO TODO EN PESOS) | Minimizar |
| 4 | Número de Programas Vendidos | Cantidad de programas/cursos únicos | Número | COUNT(DISTINCT PROGRAMA) | Por definir |
| 5 | Total de Estudiantes | Cantidad de estudiantes únicos atendidos | Número | COUNT(DISTINCT ESTUDIANTE) | Por definir |

### GRUPO 2: POR ESTUDIANTE (5 KPIs - con filtro)

| # | KPI | Definición | Unidad | Fórmula |
|---|-----|-----------|--------|---------|
| 6 | Total Vendido (por estudiante) | Valor total vendido a un estudiante | COP | SUM($R & PROY exp pesos) WHERE ESTUDIANTE = seleccionado |
| 7 | Pendiente por Recaudo (por estudiante) | Cartera pendiente del estudiante | COP | SUM(PENDIENTE RECAUDO INICIAL EXPRESADO TODO EN PESOS) WHERE ESTUDIANTE = seleccionado |
| 8 | Total Recaudado (por estudiante) | Dinero cobrado del estudiante | COP | SUM(NETO EXPRESADO EN PESOS) WHERE ESTUDIANTE = seleccionado |
| 9 | Estado (por estudiante) | Activo/Inactivo | Texto | IF(ESTADO = "ACTIVO" en almenos 1 registro, "Activo", "Inactivo") |
| 10 | Programas Matriculados | Cantidad de programas del estudiante | Número | COUNT(DISTINCT PROGRAMA) WHERE ESTUDIANTE = seleccionado |

### GRUPO 3: MARKETING (5 KPIs)

| # | KPI | Definición | Unidad | Fórmula |
|---|-----|-----------|--------|---------|
| 11 | Ventas por Campaña | Ingresos generados por cada campaña | COP | SUM($R & PROY exp pesos) WHERE CAMPAÑA != empty |
| 12 | Recaudo por Campaña | Dinero cobrado por cada campaña | COP | SUM(NETO EXPRESADO EN PESOS) WHERE CAMPAÑA != empty |
| 13 | Ratio de Efectividad | % de ventas que vienen de campañas | % | (SUM($R & PROY exp pesos) WHERE CAMPAÑA != empty / SUM($R & PROY exp pesos)) * 100 |
| 14 | Total Campañas Realizadas | Cantidad de campañas ejecutadas | Número | COUNT(DISTINCT CAMPAÑA) WHERE CAMPAÑA != empty |
| 15 | Estudiantes por Campaña | Cantidad de estudiantes por campaña | Número | COUNT(DISTINCT ESTUDIANTE) WHERE CAMPAÑA != empty |

---

## 5. CÁLCULOS ESPECIALES

No aplica. Todos los KPIs utilizan cálculos estándar (SUM, COUNT, DISTINCT) basados en las columnas disponibles del Google Sheet.

---

## 6. USUARIOS DEL DASHBOARD

**Total usuarios esperados:** 4-6 personas

| Rol | Nivel Técnico | Preguntas Clave | Acceso |
|-----|--------------|-----------------|--------|
| Founders (2) | Google Sheets básico | ¿Revenue este mes? ¿Cartera pendiente? ¿Impacto campañas? | Admin |
| Equipo Operativo | Google Sheets básico | ¿Estado general? ¿Estudiantes activos? | Visualización |
| Contabilidad | Google Sheets básico | ¿Cartera pendiente? ¿Recaudos? ¿Por estudiante? | Visualización |

---

## 7. INTEGRACIONES Y EXPORTS

- **Export CSV:** Sí - Los datos debe poder descargarse por periodo
- **Alertas automáticas:** No requerido inicialmente
- **Conexión a otras herramientas:** No requerido inicialmente

---

## 8. EXPECTATIVAS

### Diseño
- [x] Moderno y profesional
- [x] Colores corporativos: Por definir con cliente
- [x] Logo: Incluir logo de Creadores de Prosperidad
- [x] Responsive: No crítico (uso principalmente desktop)

### Funcionalidad
- [x] Filtros por: Fecha (AJUSTES VENCIMIENTO), Estudiante, Programa, Campaña
- [x] Gráficas interactivas: Sí (Ventas por Programa, Recaudo por Campaña)
- [x] Tablas detalladas: Sí (datos por estudiante)
- [x] Actualización: Diaria con opción de actualizar manualmente

### Performance
- [x] Carga en < 3 segundos
- [x] Funciona sin conexión: No requerido
- [x] Cálculos en tiempo real: Sí

---

## 9. CRITERIOS DE ÉXITO

Dashboard se considera **exitoso** cuando:

1. **Tomar mejores decisiones de marketing basadas en data** - Los founders pueden ver claramente qué campaña trae los mejores resultados
2. **Descubrir qué campaña realmente trae los mejores estudiantes** - Identificar la campaña con mejor ROI
3. **Visibilidad centralizada** - Un único lugar para consultar todos los indicadores clave sin navegar múltiples hojas
4. **Gestión de cartera mejorada** - Conocer en tiempo real cuánto dinero está pendiente y por quién
5. **Reducción de tiempo** - De 2 horas de análisis manual a máximo 15 minutos de consulta

---

## 10. CONTEXTO HISTÓRICO

### Dashboards anteriores
- **Herramienta anterior:** Google Sheets manual
- **Por qué cambiar:** Información desorganizada, no centralizada, requiere mucho tiempo consolidar
- **Qué funcionaba bien:** El Google Sheet tiene buena estructura de datos
- **Qué no funcionaba:** Falta de visualizaciones, difícil hacer análisis rápidos

### Decisiones previas
- Usar Google Sheets como fuente única de verdad
- Mantener la arquitectura actual de datos
- No conectar a otras herramientas (por ahora)

---

## FILTROS GLOBALES (APLICAN EN TODAS LAS VISTAS)

1. **Filtro de Fecha:** Basado en columna AJUSTES VENCIMIENTO (permite análisis histórico y proyectivo)
2. **Exclusión:** Excluir registros donde ESTADO = "Retirado"

---

## ESTRUCTURA DEL DASHBOARD (3 Hojas/Secciones)

### Hoja 1: GENERAL
- **KPIs:** Ventas Totales, Total Recaudado, Cartera Pendiente, Programas, Estudiantes
- **Gráfica:** Ventas Totales por Programa (Barras o Pie)
- **Filtros:** Fecha, Programa, Campaña

### Hoja 2: ESTUDIANTE
- **KPIs:** Datos del estudiante seleccionado (Total Vendido, Pendiente, Recaudado, Estado, Programas)
- **Gráfica:** Recaudo/Ingreso por Programa del estudiante
- **Tabla:** Detalle de pagos por programa
- **Filtros:** Estudiante, Fecha, Programa

### Hoja 3: MARKETING
- **KPIs:** Ventas por Campaña, Recaudo por Campaña, Ratio Efectividad, # Campañas, # Estudiantes
- **Gráfica:** Ventas Totales por Campaña
- **Tabla:** Desglose detallado por campaña
- **Filtros:** Campaña, Fecha

---

## VALIDACIÓN DE ESTE DOCUMENTO

**Aprobación cliente:** [ ] Sí / [ ] No / [ ] Parcial

**Comentarios cliente:**
> [Feedback del cliente]

**Última actualización:** 24/11/2025 14:30
**Actualizado por:** DISCOVERY AGENT - MÉTRIK
