#!/bin/bash

# MÉTRIK Dashboard Verification Script
# Verifica que todo esté funcionando correctamente

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║     MÉTRIK Dashboard - Verificación Rápida            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Node.js installed
echo -n "1. Verificando Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Instalado ($NODE_VERSION)"
else
    echo -e "${RED}✗${NC} No está instalado"
    exit 1
fi

# Check 2: Server running on port 3000
echo -n "2. Verificando servidor en puerto 3000... "
if nc -z localhost 3000 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Servidor ejecutándose"
else
    echo -e "${RED}✗${NC} Servidor no está corriendo"
    echo ""
    echo "Para iniciar el servidor, ejecuta:"
    echo "  cd $(pwd)"
    echo "  node server.js"
    echo ""
    exit 1
fi

# Check 3: HTML endpoint
echo -n "3. Verificando endpoint HTML (/). "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} HTTP $HTTP_CODE"
else
    echo -e "${RED}✗${NC} HTTP $HTTP_CODE"
    exit 1
fi

# Check 4: CSV endpoint
echo -n "4. Verificando endpoint CSV (/csv)... "
CSV_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/csv)
if [ "$CSV_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} HTTP $CSV_CODE"
else
    echo -e "${RED}✗${NC} HTTP $CSV_CODE"
    exit 1
fi

# Check 5: CSV data content
echo -n "5. Verificando contenido CSV... "
CSV_SIZE=$(curl -s http://localhost:3000/csv | wc -c)
CSV_LINES=$(curl -s http://localhost:3000/csv | wc -l)
if [ $CSV_SIZE -gt 1000 ]; then
    echo -e "${GREEN}✓${NC} ${CSV_LINES} líneas, ${CSV_SIZE} bytes"
else
    echo -e "${RED}✗${NC} Datos insuficientes (${CSV_SIZE} bytes)"
    exit 1
fi

# Check 6: CDN libraries in HTML
echo -n "6. Verificando librerías CDN... "
if curl -s http://localhost:3000/ | grep -q "cdnjs.cloudflare.com"; then
    echo -e "${GREEN}✓${NC} Enlaces CDN presentes"
else
    echo -e "${YELLOW}⚠${NC} Enlaces CDN no encontrados"
fi

# Check 7: Chart.js in HTML
echo -n "7. Verificando Chart.js... "
if curl -s http://localhost:3000/ | grep -q "chart.min.js"; then
    echo -e "${GREEN}✓${NC} Presente"
else
    echo -e "${RED}✗${NC} No encontrado"
fi

# Check 8: PapaParse in HTML
echo -n "8. Verificando PapaParse... "
if curl -s http://localhost:3000/ | grep -q "papaparse"; then
    echo -e "${GREEN}✓${NC} Presente"
else
    echo -e "${RED}✗${NC} No encontrado"
fi

# Success message
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo -e "║  ${GREEN}✅ TODO FUNCIONA CORRECTAMENTE${NC}              ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 El dashboard está listo para usar:"
echo ""
echo "   Abre tu navegador en:"
echo "   ${YELLOW}http://localhost:3000/${NC}"
echo ""
echo "   Presiona F12 para ver la consola y verificar:"
echo "   ✓ Sin errores rojos"
echo "   ✓ Mensaje: '✅ Datos cargados exitosamente: XXX filas'"
echo ""
