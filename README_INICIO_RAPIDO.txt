╔═════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║   📊 MÉTRIK DASHBOARD - CREADORES DE PROSPERIDAD                  ║
║   Inicio Rápido                                                     ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝

🎯 LO QUE NECESITAS SABER
═════════════════════════

El dashboard requiere ejecutar un servidor Node.js para funcionar.

📋 REQUISITOS
─────────────
✓ Node.js instalado (verificar: node --version)
✓ Conexión a internet (para acceder a Google Sheets)

🚀 INICIAR EN 3 PASOS
────────────────────

1. ABRE TERMINAL Y VE A LA CARPETA:
   cd /Users/mauricio/projects/creadores_de_prosperidad

2. INICIA EL SERVIDOR:
   node server.js

3. ABRE EN NAVEGADOR:
   http://localhost:3000/

¡LISTO! El dashboard debe cargar con todos los datos.

✅ VERIFICACIÓN
──────────────

En el navegador:
- Presiona F12 (Developer Tools)
- Ve a la pestaña Console
- Busca: "✅ Datos cargados exitosamente"
- Los KPIs deben mostrar valores (ej: $21,120,000)

❓ ¿QUÉ PASA SI NO FUNCIONA?
────────────────────────────

1. ¿"node: command not found"?
   → Instala Node.js desde https://nodejs.org/

2. ¿Puerto 3000 en uso?
   → Edita server.js línea 11: const PORT = 3001;

3. ¿Aún sin datos?
   → Verifica el error en Console (F12) y repórtalo

📖 DOCUMENTOS IMPORTANTES
───────────────────────

- INSTRUCCIONES_SERVIDOR.md → Guía completa con solución de problemas
- SOLUCION_FINAL.md → Explicación de la solución implementada
- index.html → El dashboard (se sirve automáticamente)
- server.js → El servidor (ejecutar con: node server.js)

💬 PREGUNTAS FRECUENTES
──────────────────────

P: ¿Es seguro publicar Google Sheets?
R: Sí, solo se publica el CSV con lectura, sin fórmulas.

P: ¿Los datos se actualizan en tiempo real?
R: Cada 5 minutos (cache automático). Botón "Refrescar" para actualizar al instante.

P: ¿Puedo usar esto en teléfono?
R: Sí, si estás en la misma red local: http://[TU_IP]:3000/

═════════════════════════════════════════════════════════════════════

Creado por: MÉTRIK
Fecha: 25 de Noviembre, 2025

¡A usar el dashboard! 🚀
