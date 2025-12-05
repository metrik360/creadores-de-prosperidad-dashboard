# INICIO RÁPIDO - Dashboard MÉTRIK
## Creadores de Prosperidad

---

## PARA EL CLIENTE: Cómo empezar en 3 pasos

### Paso 1: Abre el Dashboard
```
1. Ve a la carpeta: /Users/mauricio/projects/creadores_de_prosperidad/
2. Haz doble clic en: index.html
3. Tu navegador abrirá el dashboard automáticamente
```

### Paso 2: Explora las 3 hojas
- **General:** Vista ejecutiva de ventas
- **Estudiante:** Análisis individual
- **Marketing:** Efectividad de campañas

### Paso 3: Usa los filtros
- Selecciona período (mes/año)
- Filtra por programa, estudiante o campaña
- Click "Refrescar" para actualizar datos

**¿Necesitas ayuda?** Abre `DOCUMENTATION.md` (documentación completa)

---

## PARA DESARROLLADORES: Setup en 3 pasos

### Paso 1: Clona o descarga
```bash
cd /Users/mauricio/projects/creadores_de_prosperidad/
```

### Paso 2: Abre con Live Server (opcional)
```bash
# VS Code: Click derecho en index.html > "Open with Live Server"
# O simplemente abre index.html en tu navegador
```

### Paso 3: Customiza (opcional)
```javascript
// Cambiar URL del Google Sheet (línea 529)
const SHEET_URL = 'TU_NUEVA_URL';

// Cambiar colores (líneas 20-28)
--color-primary: #301063;
--color-secondary: #C0BECB;
```

**¿Necesitas más info?** Abre `README.md` (guía técnica)

---

## ARCHIVOS PRINCIPALES

### Para usar el dashboard:
- **index.html** - Dashboard completo (ABRE ESTE)
- **DOCUMENTATION.md** - Guía usuario completa

### Para desarrollo:
- **README.md** - Guía técnica
- **CODE_PHASE_COMPLETE.md** - Resumen del proyecto

---

## DESPLIEGUE RÁPIDO

### GitHub Pages (Gratis)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/dashboard.git
git push -u origin main
# Activa Pages en Settings > Pages
```

### Netlify (MÁS RÁPIDO)
```bash
# Ve a: https://app.netlify.com/drop
# Arrastra: index.html
# ¡Listo en 10 segundos!
```

---

## VERIFICACIÓN RÁPIDA

### El dashboard debe:
- ✅ Cargar datos del Google Sheet
- ✅ Mostrar 3 hojas (General, Estudiante, Marketing)
- ✅ Calcular 15 KPIs automáticamente
- ✅ Renderizar 6 gráficas interactivas
- ✅ Aplicar filtros dinámicamente
- ✅ Exportar a CSV
- ✅ Verse bien en móvil/tablet/desktop

### Si algo no funciona:
1. Verifica conexión a internet
2. Abre consola del navegador (F12)
3. Busca errores en rojo
4. Consulta `DOCUMENTATION.md` > Troubleshooting

---

## CONTACTO Y SOPORTE

### Documentación:
- Usuario: `DOCUMENTATION.md` (22 KB, 783 líneas)
- Técnica: `README.md` (6.7 KB, 311 líneas)
- Resumen: `CODE_PHASE_COMPLETE.md` (700 líneas)

### Recursos útiles:
- Chart.js: https://www.chartjs.org/docs/
- PapaParse: https://www.papaparse.com/docs
- Google Sheets API: https://developers.google.com/sheets

---

## ESTADÍSTICAS DEL PROYECTO

### Código:
- HTML: 1,335 líneas
- CSS: ~450 líneas (embedded)
- JavaScript: ~400 líneas (embedded)
- Total: 49 KB

### Documentación:
- Total: 2,341 líneas en Markdown
- Tamaño: ~50 KB

### Proyecto completo:
- Archivos: 9 (.html + .md)
- Tamaño total: 148 KB
- Tiempo de desarrollo: 10 horas

---

**Versión:** 1.0.0
**Fecha:** 24 de Noviembre, 2025
**Estado:** ✅ PRODUCTION READY

**¡Tu dashboard está listo para usar!**
