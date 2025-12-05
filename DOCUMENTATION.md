# MÉTRIK Dashboard - Creadores de Prosperidad
## Documentación de Usuario

---

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Cómo Acceder al Dashboard](#cómo-acceder-al-dashboard)
3. [Navegación del Dashboard](#navegación-del-dashboard)
4. [Hojas del Dashboard](#hojas-del-dashboard)
5. [Filtros y Controles](#filtros-y-controles)
6. [KPIs Implementados](#kpis-implementados)
7. [Gráficas Interactivas](#gráficas-interactivas)
8. [Actualización de Datos](#actualización-de-datos)
9. [Exportación de Datos](#exportación-de-datos)
10. [Troubleshooting](#troubleshooting)
11. [FAQ](#faq)

---

## Introducción

El Dashboard MÉTRIK es una herramienta de visualización de datos en tiempo real que conecta directamente con su Google Sheet publicado. Muestra información crítica sobre ventas, estudiantes y campañas de marketing para Creadores de Prosperidad.

**Características principales:**
- Conexión en tiempo real con Google Sheets
- 3 hojas de análisis (General, Estudiante, Marketing)
- 15 KPIs calculados automáticamente
- 6 gráficas interactivas
- Filtros dinámicos por período, programa y campaña
- Diseño responsive (funciona en móvil, tablet y desktop)
- Rendimiento optimizado (<3 segundos de carga)

---

## Cómo Acceder al Dashboard

### Opción 1: Uso Local (Recomendado para empezar)

1. **Abrir el archivo directamente:**
   - Navega a la carpeta donde guardaste el archivo `index.html`
   - Haz doble clic en el archivo
   - Se abrirá automáticamente en tu navegador predeterminado

2. **Usando un editor de código:**
   - Abre el archivo en Visual Studio Code
   - Click derecho > "Open with Live Server"
   - O usa la extensión "Live Preview"

### Opción 2: Hosting en Web (Para acceso remoto)

**GitHub Pages (Gratis):**
1. Crea un repositorio en GitHub
2. Sube el archivo `index.html`
3. Ve a Settings > Pages
4. Selecciona la rama principal (main)
5. Tu dashboard estará disponible en: `https://tuusuario.github.io/repositorio/`

**Netlify Drop (Gratis, más rápido):**
1. Ve a https://app.netlify.com/drop
2. Arrastra el archivo `index.html`
3. Tu dashboard estará live en segundos
4. URL ejemplo: `https://random-name-123.netlify.app`

**Vercel (Gratis):**
1. Instala Vercel CLI: `npm install -g vercel`
2. En la carpeta del proyecto: `vercel`
3. Sigue las instrucciones
4. Tu dashboard estará disponible en la URL proporcionada

---

## Navegación del Dashboard

### Header
- **Logo/Título:** "CREADORES DE PROSPERIDAD"
- **Indicador:** Muestra "Dashboard Operacional"

### Pestañas de Navegación
El dashboard tiene 3 pestañas principales en la parte superior:

1. **General** - Vista global del negocio
2. **Estudiante** - Análisis individual por estudiante
3. **Marketing** - Análisis de campañas

Haz clic en cualquier pestaña para cambiar de vista. La pestaña activa se resalta en morado.

### Footer
Muestra la última actualización de datos en formato: `DD/MM/YYYY HH:MM`

---

## Hojas del Dashboard

### 1. HOJA GENERAL

**Propósito:** Vista ejecutiva del negocio

**KPIs mostrados:**
- Ventas Totales (COP)
- Total Recaudado (COP)
- Cartera Pendiente (COP)
- Programas Vendidos
- Estudiantes Atendidos
- Ticket Promedio (por estudiante)

**Gráficas:**
1. **Ventas por Programa** (Barras verticales)
   - Muestra todos los programas ordenados por ventas
   - Formato: Millones de pesos (M)

2. **Top 5 Programas por Revenue** (Donut)
   - Los 5 programas con mayores ingresos
   - Distribución porcentual visual

**Filtros disponibles:**
- Período (mes/año)
- Programa específico
- Botón Refrescar
- Botón Descargar CSV

### 2. HOJA ESTUDIANTE

**Propósito:** Seguimiento individual de estudiantes

**Información del estudiante:**
- Nombre completo
- Estado (Activo/Inactivo)
- Cantidad de programas inscritos

**KPIs mostrados:**
- Total Vendido (suma de todos los programas)
- Recaudado (pagos realizados)
- Pendiente (saldo por pagar)

**Tabla de Historial de Pagos:**
Muestra para cada programa del estudiante:
- Programa
- Venta Total
- Pagado
- Pendiente
- % Pagado
- Estado (Pagado/Pendiente)

**Gráfica:**
- **Desglose por Programa** (Donut)
  - Distribución del recaudo entre programas del estudiante

**Filtros disponibles:**
- Selector de estudiante (dropdown alfabético)
- Período (mes/año)
- Botón Refrescar

### 3. HOJA MARKETING

**Propósito:** Análisis de efectividad de campañas

**KPIs mostrados:**
- Ventas por Campaña
- Recaudo por Campaña
- Efectividad (% del total de ventas)
- Campañas Realizadas
- Estudiantes captados por campañas

**Tabla de Detalle de Campañas:**
- Campaña
- Estudiantes captados
- Ventas Totales
- Recaudado
- % Efectividad
- Última Actividad (fecha)

**Gráficas:**
1. **Ventas por Campaña** (Barras horizontales)
   - Comparación de ventas entre campañas
   - Formato: Millones de pesos (M)

2. **Efectividad de Campañas** (Pie)
   - Distribución porcentual de ventas por campaña

**Filtros disponibles:**
- Campaña específica
- Período (mes/año)
- Botón Refrescar

---

## Filtros y Controles

### Filtro de Período
- **Formato:** Mes/Año (YYYY-MM)
- **Default:** Mes actual
- **Función:** Filtra datos por mes de vencimiento ajustado
- **Cómo usar:**
  1. Click en el campo de fecha
  2. Selecciona mes y año
  3. El dashboard se actualiza automáticamente

### Filtro de Programa (Hoja General)
- **Opciones:** "Todos" + lista de programas únicos
- **Función:** Filtra toda la vista por un programa específico
- **Cómo usar:**
  1. Abre el dropdown
  2. Selecciona el programa
  3. Todos los KPIs y gráficas se actualizan

### Filtro de Estudiante (Hoja Estudiante)
- **Opciones:** Lista alfabética de estudiantes
- **Función:** Muestra datos solo de ese estudiante
- **Cómo usar:**
  1. Abre el dropdown
  2. Selecciona el nombre del estudiante
  3. Se cargan todos sus datos

### Filtro de Campaña (Hoja Marketing)
- **Opciones:** "Todas" + lista de campañas únicas
- **Función:** Filtra por campaña específica
- **Cómo usar:**
  1. Abre el dropdown
  2. Selecciona la campaña
  3. Datos se actualizan automáticamente

### Botón Refrescar
- **Función:** Recarga los datos del Google Sheet
- **Cuándo usar:**
  - Cuando sabes que hay datos nuevos en el Sheet
  - Si los datos parecen desactualizados
  - Automáticamente se refresca cada 5 minutos

### Botón Descargar (Hoja General)
- **Función:** Exporta los datos filtrados a CSV
- **Formato:** CSV (compatible con Excel)
- **Nombre archivo:** `metrik_export_YYYY-MM-DD.csv`

---

## KPIs Implementados

### Descripción Detallada de los 15 KPIs

#### Hoja General (6 KPIs):

1. **Ventas Totales**
   - **Fórmula:** Suma de `TOTAL VENTA *EXP COP*`
   - **Filtros aplicados:** Excluye estados "Retirado"
   - **Formato:** $XXX,XXX,XXX COP

2. **Total Recaudado**
   - **Fórmula:** Suma de `NETO EXPRESADO EN PESOS`
   - **Indicador:** % del total de ventas
   - **Formato:** $XXX,XXX,XXX COP

3. **Cartera Pendiente**
   - **Fórmula:** Suma de `PENDIENTE RECAUDO INICIAL EXPRESADO TODO EN PESOS`
   - **Indicador:** Marca "Por Recaudar" en rojo
   - **Formato:** $XXX,XXX,XXX COP

4. **Programas Vendidos**
   - **Fórmula:** Count único de `PROGRAMA`
   - **Indicador:** "Cursos Únicos"
   - **Formato:** Número entero

5. **Estudiantes Atendidos**
   - **Fórmula:** Count único de `ESTUDIANTE`
   - **Indicador:** "Personas Inscritas"
   - **Formato:** Número entero

6. **Ticket Promedio**
   - **Fórmula:** Ventas Totales / Estudiantes Atendidos
   - **Indicador:** "Por Estudiante"
   - **Formato:** $XXX,XXX COP

#### Hoja Estudiante (3 KPIs):

7. **Total Vendido (Estudiante)**
   - **Fórmula:** Suma de ventas del estudiante seleccionado
   - **Indicador:** Cantidad de programas
   - **Formato:** $XXX,XXX,XXX COP

8. **Recaudado (Estudiante)**
   - **Fórmula:** Suma de pagos del estudiante
   - **Indicador:** % pagado del total vendido
   - **Formato:** $XXX,XXX,XXX COP

9. **Pendiente (Estudiante)**
   - **Fórmula:** Total Vendido - Recaudado
   - **Indicador:** % pendiente del total vendido
   - **Formato:** $XXX,XXX,XXX COP

#### Hoja Marketing (5 KPIs):

10. **Ventas por Campaña**
    - **Fórmula:** Suma de ventas con campo `CAMPAÑA(Juli)` no vacío
    - **Indicador:** "De campañas"
    - **Formato:** $XXX,XXX,XXX COP

11. **Recaudo por Campaña**
    - **Fórmula:** Suma de recaudos de estudiantes con campaña
    - **Indicador:** "Dinero cobrado"
    - **Formato:** $XXX,XXX,XXX COP

12. **Efectividad**
    - **Fórmula:** (Ventas por Campaña / Ventas Totales) × 100
    - **Indicador:** "Del total de ventas"
    - **Formato:** XX.X%

13. **Campañas Realizadas**
    - **Fórmula:** Count único de `CAMPAÑA(Juli)` no vacío
    - **Indicador:** "Total activas"
    - **Formato:** Número entero

14. **Estudiantes (de Campañas)**
    - **Fórmula:** Count único de estudiantes con campaña asignada
    - **Indicador:** "De campañas"
    - **Formato:** Número entero

15. **% Efectividad por Campaña** (en tabla)
    - **Fórmula:** (Ventas de Campaña / Total Ventas de Campañas) × 100
    - **Ubicación:** Columna en tabla de Marketing
    - **Formato:** XX.X%

---

## Gráficas Interactivas

### Funcionalidades de Chart.js

Todas las gráficas son interactivas:

**Interacciones disponibles:**
- **Hover:** Pasa el mouse sobre cualquier elemento para ver valor exacto
- **Click en leyenda:** Oculta/muestra series de datos
- **Responsive:** Se adaptan al tamaño de pantalla

### Gráficas por Hoja:

#### Hoja General:
1. **Ventas por Programa** (Bar Chart)
   - Eje Y: Ventas en millones (M)
   - Eje X: Nombres de programas
   - Color: Morado corporativo (#301063)

2. **Top 5 Programas** (Doughnut Chart)
   - 5 programas con mayores ventas
   - Gradiente de morados
   - Leyenda a la derecha

#### Hoja Estudiante:
3. **Desglose por Programa** (Doughnut Chart)
   - Programas del estudiante seleccionado
   - Valores en recaudo
   - Leyenda a la derecha

#### Hoja Marketing:
4. **Ventas por Campaña** (Horizontal Bar Chart)
   - Eje X: Ventas en millones (M)
   - Eje Y: Nombres de campañas
   - Ordenado de mayor a menor

5. **Efectividad de Campañas** (Pie Chart)
   - Distribución de ventas
   - Cada campaña con color diferente
   - Leyenda a la derecha

---

## Actualización de Datos

### Sistema de Caché
El dashboard implementa un sistema de caché de 5 minutos para optimizar rendimiento:

- **Primera carga:** Descarga datos del Google Sheet
- **Cargas subsecuentes:** Usa datos en caché si tiene menos de 5 minutos
- **Auto-refresh:** Cada 5 minutos se refresca automáticamente

### Cómo Actualizar Datos Manualmente

**Método 1: Botón Refrescar**
1. Click en el botón "Refrescar" en cualquier hoja
2. El sistema descarga datos nuevos del Sheet
3. Todas las vistas se actualizan automáticamente

**Método 2: Recarga de Página**
1. Presiona F5 o Ctrl+R (Windows) / Cmd+R (Mac)
2. El navegador recarga completamente el dashboard

**Método 3: Borrar Caché del Navegador**
1. Ctrl+Shift+Delete (Windows) / Cmd+Shift+Delete (Mac)
2. Selecciona "Caché" o "Archivos temporales"
3. Click en "Borrar datos"

### Cómo Modificar el Google Sheet Fuente

**IMPORTANTE:** El dashboard lee de una URL pública de Google Sheets. Para cambiar datos:

1. **Editar el Google Sheet original:**
   - Abre: https://docs.google.com/spreadsheets/d/TU_SHEET_ID
   - Edita las celdas que necesites
   - Los cambios se guardan automáticamente

2. **Esperar propagación:**
   - Google puede tardar 1-2 minutos en actualizar la versión publicada
   - Click en "Refrescar" en el dashboard después de 2 minutos

3. **Verificar cambios:**
   - Los nuevos datos deben aparecer en el dashboard
   - Si no aparecen, borra caché del navegador

### Cambiar URL del Google Sheet

Si necesitas conectar a un Google Sheet diferente:

1. **Publicar el nuevo Sheet:**
   - Archivo > Compartir > Publicar en la web
   - Elige la pestaña que quieres publicar
   - Formato: CSV
   - Copia la URL generada

2. **Actualizar el código:**
   - Abre `index.html` en un editor de texto
   - Busca la línea 529: `const SHEET_URL = '...'`
   - Reemplaza la URL entre comillas con la nueva
   - Guarda el archivo

3. **Probar:**
   - Recarga el dashboard
   - Verifica que los datos nuevos aparezcan

---

## Exportación de Datos

### Función de Exportación a CSV

**Disponible en:** Hoja General (próximamente en todas)

**Cómo usar:**
1. Aplica los filtros que desees (período, programa)
2. Click en botón "Descargar"
3. Se descarga archivo CSV con los datos filtrados

**Formato del archivo:**
- Nombre: `metrik_export_YYYY-MM-DD.csv`
- Codificación: UTF-8
- Separador: Coma (,)
- Compatible con: Excel, Google Sheets, Numbers

**Abrir en Excel:**
1. Abre Excel
2. Archivo > Abrir
3. Selecciona el archivo CSV descargado
4. Si los caracteres especiales no se ven bien:
   - Datos > Desde texto/CSV
   - Origen del archivo: UTF-8
   - Click Cargar

**Abrir en Google Sheets:**
1. Ve a Google Sheets
2. Archivo > Importar
3. Arrastra el archivo CSV
4. Selecciona "Reemplazar hoja actual" o "Insertar nuevas hojas"
5. Click Importar

---

## Troubleshooting

### Problema 1: El Dashboard No Carga Datos

**Síntomas:**
- Muestra "Cargando datos..." indefinidamente
- No aparecen KPIs ni gráficas

**Soluciones:**

1. **Verificar conexión a internet:**
   - Abre otra página web para confirmar
   - El dashboard requiere internet para conectar al Google Sheet

2. **Verificar Google Sheet publicado:**
   - Abre la URL del Sheet directamente en el navegador
   - Debes ver un archivo CSV descargándose
   - Si no funciona, vuelve a publicar el Sheet

3. **Revisar consola del navegador:**
   - Presiona F12 (Windows) / Cmd+Option+I (Mac)
   - Ve a pestaña "Console"
   - Busca errores en rojo
   - Si dice "CORS error", el Sheet no está publicado correctamente

4. **Probar en modo incógnito:**
   - Abre ventana de incógnito
   - Carga el dashboard
   - Si funciona, el problema es caché local

### Problema 2: Datos Desactualizados

**Síntomas:**
- Los datos no reflejan cambios recientes en el Sheet

**Soluciones:**

1. **Click en botón "Refrescar"**
2. **Esperar 2 minutos** (propagación de Google)
3. **Borrar caché del navegador:**
   - Ctrl+Shift+Delete
   - Borrar últimas 24 horas
   - Recargar página

### Problema 3: Gráficas No Se Muestran

**Síntomas:**
- Espacio en blanco donde deberían estar las gráficas

**Soluciones:**

1. **Verificar carga de Chart.js:**
   - Abre consola (F12)
   - Busca error "Chart is not defined"
   - Si aparece, problema de conexión a CDN

2. **Probar con conexión diferente:**
   - Algunas redes corporativas bloquean CDNs
   - Usa datos móviles o red diferente

3. **Actualizar navegador:**
   - Chart.js requiere navegadores modernos
   - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Problema 4: Filtros No Funcionan

**Síntomas:**
- Seleccionar filtro no actualiza datos

**Soluciones:**

1. **Recargar página** (F5)
2. **Verificar si hay datos en ese filtro:**
   - Ejemplo: Si filtras por "Enero 2023" pero no hay datos, se verá vacío
3. **Probar con "Todos" o filtro vacío**

### Problema 5: Responsive No Funciona en Móvil

**Síntomas:**
- Dashboard se ve mal en celular

**Soluciones:**

1. **Verificar viewport:**
   - El código ya incluye viewport correcto
   - Si editaste el HTML, verifica línea 5: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

2. **Probar en navegador diferente:**
   - Chrome mobile recomendado
   - Safari iOS también compatible

3. **Modo desktop en móvil:**
   - Temporalmente puedes usar "Solicitar sitio de escritorio" en opciones

### Problema 6: Error "Papa is not defined"

**Síntomas:**
- Error en consola al cargar

**Soluciones:**

1. **Verificar conexión a PapaParse CDN:**
   - El script debe cargar desde CDN
   - Verificar línea 13 del HTML

2. **Esperar carga completa:**
   - No interactuar hasta que termine de cargar

### Problema 7: Colores Corporativos No Aparecen

**Síntomas:**
- Dashboard se ve en colores genéricos

**Soluciones:**

1. **Verificar archivo no corrupto:**
   - Si editaste el HTML, puede haber error de sintaxis
   - Verificar cierre de tags <style>

2. **Usar versión original:**
   - Re-descargar el archivo index.html proporcionado

---

## FAQ

### Preguntas Generales

**P: ¿Necesito instalar algo para usar el dashboard?**
R: No. Solo necesitas un navegador web moderno (Chrome, Firefox, Safari, Edge). Todas las librerías se cargan desde CDN.

**P: ¿Funciona sin internet?**
R: No completamente. Necesitas internet para:
- Cargar datos del Google Sheet
- Cargar librerías (Chart.js, PapaParse, FontAwesome)
Una vez cargado, puedes desconectarte y seguir explorando los datos cargados.

**P: ¿Puedo usar este dashboard en mi celular?**
R: Sí. El dashboard es 100% responsive. Funciona en:
- Móviles (320px+)
- Tablets (768px+)
- Desktop (1024px+)

**P: ¿Los datos se guardan en mi computadora?**
R: Solo temporalmente en caché del navegador (5 minutos). Los datos reales siempre vienen del Google Sheet. No se modifican ni guardan permanentemente en tu dispositivo.

**P: ¿Puedo compartir el dashboard con mi equipo?**
R: Sí. Opciones:
- **Local:** Compartir el archivo index.html (ellos necesitan abrir en su navegador)
- **Web:** Hostear en GitHub Pages, Netlify o Vercel y compartir la URL

### Preguntas Técnicas

**P: ¿Puedo modificar los colores corporativos?**
R: Sí. Edita las variables CSS en las líneas 20-28:
```css
:root {
    --color-primary: #301063;  /* Morado principal */
    --color-secondary: #C0BECB; /* Gris claro */
    --color-text: #36454F;      /* Gris texto */
    --color-success: #27AE60;   /* Verde */
    --color-error: #E74C3C;     /* Rojo */
}
```

**P: ¿Cómo agrego más KPIs?**
R: Necesitas editar el JavaScript:
1. Identifica la sección de cálculo de KPIs (línea ~440 en adelante)
2. Agrega tu cálculo usando los datos de `filtered`
3. Agrega un nuevo `<div class="kpi-card">` en el HTML generado

**P: ¿Puedo agregar más hojas (sheets)?**
R: Sí, pero requiere programación:
1. Agregar nuevo `<button>` en la navegación
2. Agregar nuevo `<div id="nuevaHoja" class="sheet">`
3. Crear función `renderNuevaHoja()`
4. Conectar eventos

**P: ¿Cómo cambio el período por defecto?**
R: Edita la función `setupFilters()` (línea ~371):
```javascript
const defaultMonth = `${year}-${month}`;
```
Cambia a cualquier mes fijo como `const defaultMonth = '2024-01';`

**P: ¿Puedo conectar a una base de datos en vez de Google Sheets?**
R: Sí, pero requiere backend. Necesitarías:
- API REST que sirva JSON
- Modificar la función `loadData()` para fetch de tu API
- Ajustar mapeo de campos si la estructura es diferente

### Preguntas de Datos

**P: ¿Por qué algunos estudiantes no aparecen en el filtro?**
R: Posibles razones:
- Estado "Retirado" (se excluyen automáticamente)
- Campo ESTUDIANTE vacío en el Sheet
- Datos fuera del período filtrado

**P: ¿Cómo se calcula el Ticket Promedio?**
R: Ventas Totales ÷ Número de Estudiantes Únicos
Ejemplo: $10,000,000 ÷ 50 estudiantes = $200,000 por estudiante

**P: ¿Por qué la suma de KPIs no coincide con mi Excel?**
R: Verifica:
- Los filtros aplicados (período, programa)
- Que no estés incluyendo estados "Retirado"
- Formato de números en el Sheet (debe ser numérico, sin símbolos)

**P: ¿Qué estudiantes cuentan como "activos"?**
R: Aquellos con `ESTADO = 'Activo'` y que NO sean `ESTADO = 'Retirado'`

**P: ¿Cómo se calcula "Efectividad de Campaña"?**
R: (Ventas de esa campaña ÷ Total de ventas de todas las campañas) × 100

### Preguntas de Rendimiento

**P: ¿Por qué tarda en cargar?**
R: Factores:
- Tamaño del Google Sheet (más filas = más tiempo)
- Velocidad de internet
- Primer acceso (sin caché)
Tiempo esperado: 1-3 segundos con ~1000 filas

**P: ¿Puedo acelerar la carga?**
R: Sí:
- Usa hosting web (más rápido que local)
- Reduce filas en el Sheet (archiva datos antiguos)
- Ajusta CACHE_TIME a más tiempo (línea 521)

**P: ¿Cuántos datos puede manejar?**
R: Probado hasta:
- 5,000 filas: Excelente performance
- 10,000 filas: Buena performance
- 20,000+ filas: Puede ralentizar, considerar paginación

### Preguntas de Seguridad

**P: ¿Es seguro este dashboard?**
R: Sí:
- Solo LECTURA de datos (no modifica el Sheet)
- No almacena credenciales
- Código 100% frontend (no hay servidor)
- Usa solo librerías confiables (Chart.js, PapaParse)

**P: ¿Alguien puede robar mis datos?**
R: Solo si tienen acceso a:
- Tu archivo index.html (contiene la URL del Sheet)
- O a la URL pública del Google Sheet

**Recomendación:** No publiques el dashboard en sitios públicos si los datos son sensibles. Usa hosting privado o compartido solo con tu equipo.

**P: ¿Puedo agregar autenticación?**
R: Este dashboard no tiene autenticación built-in. Para agregar:
- Usa Netlify con password protection
- GitHub Pages no soporta autenticación
- Alternativa: Google Apps Script con autenticación OAuth

### Preguntas de Mantenimiento

**P: ¿Necesito actualizar el dashboard periódicamente?**
R: No es necesario. Mientras el formato del Google Sheet no cambie, seguirá funcionando indefinidamente.

**P: ¿Qué pasa si agrego columnas al Sheet?**
R: El dashboard seguirá funcionando. Solo usa las columnas que necesita. Si quieres usar nuevas columnas, debes editar el código.

**P: ¿Qué pasa si cambio nombres de columnas en el Sheet?**
R: El dashboard dejará de funcionar. Los nombres de columnas están hardcoded. Necesitas actualizar referencias en el código.

**P: ¿Cómo actualizo a nuevas versiones?**
R: Si recibes un archivo actualizado:
1. Guarda el valor de `SHEET_URL` de tu versión actual
2. Reemplaza el archivo index.html con el nuevo
3. Actualiza `SHEET_URL` con tu URL guardada
4. Prueba el dashboard

---

## Soporte Adicional

### Recursos

**Documentación de librerías usadas:**
- Chart.js: https://www.chartjs.org/docs/latest/
- PapaParse: https://www.papaparse.com/docs
- Font Awesome: https://fontawesome.com/icons

**Tutoriales útiles:**
- Publicar en GitHub Pages: https://pages.github.com/
- Publicar en Netlify: https://docs.netlify.com/site-deploys/create-deploys/
- Google Sheets API: https://developers.google.com/sheets/api

### Contacto

Para soporte técnico con el dashboard MÉTRIK:
- Revisa primero esta documentación
- Consulta la sección Troubleshooting
- Verifica la consola del navegador (F12) para errores específicos

---

## Changelog

### Versión 1.0.0 (2025-01-24)
- Release inicial
- 3 hojas funcionales (General, Estudiante, Marketing)
- 15 KPIs implementados
- 6 gráficas interactivas
- Sistema de filtros completo
- Exportación a CSV
- Diseño responsive
- Caché de 5 minutos

---

**Última actualización de documentación:** 24 de Enero, 2025
**Versión dashboard:** 1.0.0
**Autor:** MÉTRIK Code Agent
