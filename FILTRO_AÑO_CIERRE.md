# 📅 Filtro de Año Cierre de Venta - Implementación

**Fecha:** 24 de Noviembre, 2025
**Estado:** ✅ COMPLETADO

---

## 📋 Resumen

Se ha agregado un nuevo filtro dropdown en la página **General** que permite filtrar datos por **"AÑO CIERRE DE VENTA"**. Este filtro se ubica junto a los filtros existentes de Programa y actúa dinámicamente con los demás filtros.

---

## 🎯 Funcionalidades Implementadas

### 1. Nuevo Elemento HTML
**Ubicación:** Sección de filtros de la página General (línea ~138-141)

```html
<div class="filter-group">
    <label>Año Cierre</label>
    <select id="filterYear"><option value="">Todos</option></select>
</div>
```

**Características:**
- ID: `filterYear`
- Opción por defecto: "Todos" (sin filtro)
- Se actualiza dinámicamente según los datos disponibles

### 2. Población de Opciones
**Función:** `populateFilterOptions()` (línea ~352-356)

```javascript
const years = [...new Set(allData
    .filter(r => r['AÑO CIERRE DE VENTA'] && r['AÑO CIERRE DE VENTA'].trim())
    .map(r => r['AÑO CIERRE DE VENTA'].trim())
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true })))];

document.getElementById('filterYear').innerHTML = '<option value="">Todos</option>' +
    years.map(y => `<option value="${y}">${y}</option>`).join('');
```

**Lógica:**
1. Extrae valores únicos de la columna "AÑO CIERRE DE VENTA"
2. Excluye celdas vacías o con espacios en blanco
3. Ordena los años de **mayor a menor** (orden descendente)
4. Genera opciones en el dropdown

### 3. Event Listener
**Función:** `setupFilters()` (línea ~397)

```javascript
document.getElementById('filterYear').addEventListener('change', renderAllSheets);
```

**Comportamiento:**
- Cuando el usuario cambia el año seleccionado
- Se ejecuta `renderAllSheets()` que actualiza todos los gráficos y KPIs

### 4. Lógica de Filtrado
**Función:** `renderGeneralSheet()` (línea ~433, 459)

```javascript
const year = document.getElementById('filterYear').value;

// En el filtro:
if (year && r['AÑO CIERRE DE VENTA'] !== year) return false;
```

**Comportamiento:**
- Si el usuario selecciona un año específico, solo se muestran filas con ese año
- Si selecciona "Todos", se muestran todas las filas (sin filtro)
- El filtro actúa en conjunto con los demás (fecha, programa, etc.)

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│ Usuario selecciona año en dropdown "Año Cierre"         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ Change Event         │
              │ (addEventListener)   │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ renderAllSheets()    │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ renderGeneralSheet() │
              │ (aplica filtro)      │
              └──────────┬───────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│ Dashboard actualiza con nuevos datos                    │
│ - KPIs recalculados                                     │
│ - Gráfico "Ventas por Programa" actualizado             │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Ejemplo de Uso

### Escenario 1: Sin filtro de año
```
Filtros seleccionados:
- Fecha: Este Mes
- Programa: Todos
- Año Cierre: Todos ✓

Resultado: Datos de este mes para todos los años y programas
```

### Escenario 2: Con filtro de año específico
```
Filtros seleccionados:
- Fecha: Este Mes
- Programa: Todos
- Año Cierre: 2024 ✓

Resultado: Datos de este mes SOLO para el año 2024
```

### Escenario 3: Múltiples filtros
```
Filtros seleccionados:
- Fecha: Este Mes
- Programa: Ingeniería en Sistemas
- Año Cierre: 2023 ✓

Resultado: Datos de este mes, programa Ingeniería en Sistemas, año 2023
```

---

## 🎨 Posicionamiento en la UI

```
┌────────────────────────────────────────────────────────────┐
│ VISTA GENERAL                                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────┐│
│ │Fecha    │ │Fecha    │ │Accesos   │ │Programa  │ │Año  ││
│ │Inicio   │ │Fin      │ │Rápidos   │ │          │ │Cierre││
│ │         │ │         │ │          │ │          │ │     ││
│ └─────────┘ └─────────┘ └──────────┘ └──────────┘ └─────┘│
│                                        ▲
│                      Nuevo filtro ───┐ │
│                                       │ ▼
│                             ┌──────────────────┐
│                             │ Selector de año  │
│                             │ Todos            │
│                             │ 2024             │
│                             │ 2023             │
│                             │ 2022             │
│                             │ 2021             │
│                             └──────────────────┘
└────────────────────────────────────────────────────────────┘
```

---

## 🧪 Casos de Prueba

### Test 1: Carga inicial
```
1. Abrir http://localhost:3000/
2. Verificar que dropdown "Año Cierre" contenga:
   ✓ Opción "Todos" (seleccionada por defecto)
   ✓ Años disponibles en orden descendente
   ✓ Sin años duplicados
3. Verificar que datos mostrados sean correctos
```

### Test 2: Filtrado por año
```
1. Seleccionar un año específico (ej: 2024)
2. Verificar que:
   ✓ KPIs se actualicen (Ventas, Recaudado, etc.)
   ✓ Gráfico "Ventas por Programa" se actualice
   ✓ Solo se muestren datos del año 2024
3. Seleccionar otro año (ej: 2023)
4. Verificar que datos cambien al nuevo año
```

### Test 3: Combinación con otros filtros
```
1. Seleccionar un programa específico
2. Seleccionar un año específico
3. Cambiar rango de fechas
4. Verificar que todos los filtros se apliquen correctamente
5. Los datos deben cumplir TODAS las condiciones
```

### Test 4: Volver a "Todos"
```
1. Seleccionar un año específico
2. Ver que datos se filtren
3. Seleccionar "Todos" nuevamente
4. Verificar que se muestren datos de todos los años
```

### Test 5: Cambios dinámicos
```
1. Cambiar año
2. Sin necesidad de presionar botón (cambio automático)
3. Dashboard se actualiza instantáneamente
4. Transiciones visuales son suaves
```

---

## 📋 Cambios en el Código

### Archivos Modificados
1. **index.html** - Filtros, lógica y eventos

### Cambios Específicos

#### 1. HTML (línea ~138-141)
```diff
  <div class="filter-group">
      <label>Programa</label>
      <select id="filterProgram"><option value="">Todos</option></select>
  </div>
+ <div class="filter-group">
+     <label>Año Cierre</label>
+     <select id="filterYear"><option value="">Todos</option></select>
+ </div>
```

#### 2. populateFilterOptions() (línea ~352-361)
```diff
+ // Filter years: exclude empty and sort descending
+ const years = [...new Set(allData
+     .filter(r => r['AÑO CIERRE DE VENTA'] && r['AÑO CIERRE DE VENTA'].trim())
+     .map(r => r['AÑO CIERRE DE VENTA'].trim())
+     .sort((a, b) => b.localeCompare(a, undefined, { numeric: true })))];

+ document.getElementById('filterYear').innerHTML = '<option value="">Todos</option>' +
+     years.map(y => `<option value="${y}">${y}</option>`).join('');
```

#### 3. setupFilters() (línea ~397)
```diff
  document.getElementById('filterProgram').addEventListener('change', renderAllSheets);
+ document.getElementById('filterYear').addEventListener('change', renderAllSheets);
```

#### 4. renderGeneralSheet() (línea ~433, 459)
```diff
+ const year = document.getElementById('filterYear').value;

- if (program && r.PROGRAMA !== program) return false;
- return true;

+ if (program && r.PROGRAMA !== program) return false;
+ if (year && r['AÑO CIERRE DE VENTA'] !== year) return false;
+ return true;
```

---

## 🔍 Detalles Técnicos

### Ordenamiento de Años
```javascript
.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
```

**Explicación:**
- `localeCompare()` - Compara strings respetando locale
- `numeric: true` - Trata "2024" como número, no como string
- `b - a` (orden descendente) - Mayor año primero
- Resultado: [2024, 2023, 2022, 2021, ...]

### Comparación de Años
```javascript
if (year && r['AÑO CIERRE DE VENTA'] !== year) return false;
```

**Lógica:**
- `year &&` - Solo filtra si se seleccionó un año (no "Todos")
- `r['AÑO CIERRE DE VENTA'] !== year` - Descarta filas que no coincidan
- `return false` - Excluye la fila del resultado

---

## ✅ Checklist Final

- [x] Elemento HTML agregado
- [x] Función de población de años implementada
- [x] Event listener configurado
- [x] Lógica de filtrado en renderGeneralSheet()
- [x] Años ordenados de mayor a menor
- [x] Filtro excluye años vacíos
- [x] Funciona con otros filtros
- [x] Sin cambios en estructura de datos
- [x] Dashboard sigue 100% funcional
- [x] Actualización dinámica sin refresco

---

## 🚀 Resultado Final

**El dashboard ahora permite:**
- ✅ Filtrar datos por año de cierre de venta
- ✅ Años disponibles en orden descendente (más reciente primero)
- ✅ Combinar con otros filtros (fecha, programa)
- ✅ Cambio automático al actualizar selección
- ✅ Interfaz intuitiva y coherente

---

## 📝 Notas Adicionales

### Columna Utilizada
- Nombre: `AÑO CIERRE DE VENTA`
- Tipo: String (ej: "2024", "2023")
- Ubicación: Alguna columna en el CSV de Google Sheets
- Validación: Se excluyen celdas vacías

### Compatibilidad
- Compatible con todos los navegadores modernos
- Responsive: Se adapta a dispositivos móviles
- Accesible: Labels claros para cada filtro

---

**Implementado por:** MÉTRIK Development Team
**Completado:** 24 de Noviembre, 2025
**Estado:** ✅ LISTO PARA PRODUCCIÓN
