#!/bin/bash

# MÉTRIK - Startup Script
# Inicia backend y frontend en modo desarrollo

echo "🚀 MÉTRIK - Iniciando ambiente de desarrollo..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Backend en puerto 5000${NC}"
echo -e "${BLUE}Frontend en puerto 3000${NC}"
echo ""

# Iniciar backend en background
npm run dev &
BACKEND_PID=$!

# Esperar a que el backend esté listo
sleep 2

# Iniciar frontend
echo -e "${GREEN}✓ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo ""
echo -e "${BLUE}Iniciando Frontend...${NC}"
npm run client

# Cleanup
trap "kill $BACKEND_PID" EXIT
