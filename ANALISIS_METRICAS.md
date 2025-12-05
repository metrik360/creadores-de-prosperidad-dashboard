# 📊 Análisis de Cálculo de Métricas - Página General

## Resumen Ejecutivo
Se encontró un **PROBLEMA EN LA LÓGICA DE CÁLCULO**. Estamos usando la columna incorrecta para "Ventas Totales".

---

## 🔴 PROBLEMA IDENTIFICADO

### Columnas Disponibles vs Significado

| Columna | Índice | Significado | Todos los Datos |
|---------|--------|-------------|-----------------|
| **TOTAL VENTA *EXP COP*** | 11 | Venta original registrada | $1,145,050,549 |
| **$R & PROY exp pesos** | 34 | Proyección de recaudo | $1,458,182,083 |
| **NETO EXPRESADO EN PESOS** | 30 | Lo que ya se recaudó | $1,138,399,511 |
| **PENDIENTE RECAUDO** | 31 | Lo que falta recaudar | $297,686,317 |

### El Error
Hace poco **cambiamos a usar "$R & PROY exp pesos"** asumiendo que era la venta total, pero:

**Fila Ejemplo: Viviana Villamil**
```
TOTAL VENTA *EXP COP*:     24,000,000
$R & PROY exp pesos:        7,000,000  ← DIFERENTE (menos)
NETO EXPRESADO EN PESOS:    7,000,000
```

**Conclusión:** "$R & PROY exp pesos" es una **proyección/estimación**, no la venta real.

---

## ✅ MÉTRICAS CORRECTAS (Sin Retirados)

### Datos Base
- **Filas válidas:** 1,183
- **Estudiantes únicos:** 311
- **Programas únicos:** 28
- **Estados:** Activo (1,162), Aplazado (17), Terminó (4)

### Cálculos Correctos

#### 1. **Ventas Totales**
```
Fuente: TOTAL VENTA *EXP COP*
Valor: $1,145,050,549
Lógica: Suma de todas las ventas registradas (sin retirados)
```

#### 2. **Recaudado**
```
Fuente: NETO EXPRESADO EN PESOS
Valor: $1,138,399,511
Lógica: Lo que ya se ha pagado/cobrado
Porcentaje: 99.4% de las ventas
```

#### 3. **Cartera Pendiente**
```
Fuente: PENDIENTE RECAUDO INICIAL EXPRESADO TODO EN PESOS
Valor: $297,686,317
Lógica: Lo que aún está por cobrar
Verificación: Neto + Pendiente ≠ Total Venta (hay diferencias)
```

#### 4. **Ticket Promedio**
```
Cálculo: TOTAL VENTA / Estudiantes únicos
Valor: $1,145,050,549 / 311 = $3,681,835 por estudiante
```

#### 5. **Programas**
```
Valor: 28 programas únicos
```

#### 6. **Estudiantes**
```
Valor: 311 estudiantes únicos (sin retirados)
```

---

## 🎯 RECOMENDACIÓN

### Opción A: Usar TOTAL VENTA *EXP COP* (CORRECTA)
```javascript
const ventas = filtered.reduce((s, r) =>
  s + parseFloat((r['TOTAL VENTA *EXP COP*'] || '0').toString().replace(/[^\d.-]/g, '')) || 0, 0);
```
✅ **Ventaja:** Refleja la venta real registrada
✅ **Validar:** Suma = $1,145,050,549 (sin retirados, todas las fechas)

### Opción B: Usar $R & PROY exp pesos (INCORRECTO PARA VENTAS)
```javascript
const ventas = filtered.reduce((s, r) =>
  s + parseFloat((r['$R & PROY exp pesos'] || '0').toString().replace(/[^\d.-]/g, '')) || 0, 0);
```
❌ **Problema:** Es una proyección, no la venta real
❌ **Resultado:** Suma = $1,458,182,083 (INCORRECTA para "Ventas Totales")
⚠️ **Posible uso:** Si necesitas "Ventas Proyectadas" como métrica diferente

---

## 📋 Acciones Requeridas

### 1. Decidir cuál es el KPI correcto
- **¿Qué representa "Ventas Totales"?**
  - Si es lo vendido: Usar TOTAL VENTA *EXP COP*
  - Si es lo que se espera recaudar: Usar $R & PROY exp pesos

### 2. Alinear con el negocio
Responder:
- ¿La columna "TOTAL VENTA *EXP COP*" representa la venta real?
- ¿La columna "$R & PROY exp pesos" es una proyección de recaudo?
- ¿Hay otras diferencias en los datos que debes validar?

### 3. Actualizar el código
Una vez confirmado, cambiar la fórmula en:
- `renderGeneralSheet()` - Ventas Totales KPI
- Gráfico de "Ventas por Programa"
- Cálculo de "Ticket Promedio"

---

## 🔍 Recomendación Final

**Usar TOTAL VENTA *EXP COP* para "Ventas Totales"** porque:
1. Es la cifra más cercana a la realidad registrada
2. Es consistente con "Recaudado" y "Pendiente"
3. Representa lo que realmente se vendió

Si necesitas también rastrear la proyección, puedes agregar un KPI adicional: **"Ventas Proyectadas"** con $R & PROY exp pesos.

---

**Fecha:** 25 de Noviembre, 2025
**Estado:** Requiere validación y decisión del usuario
