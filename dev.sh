#!/bin/bash

# ─────────────────────────────────────────────────────────
# Bistrot De La Cour - Development Server Launcher
# Starts both Strapi CMS and React frontend in one command
# ─────────────────────────────────────────────────────────

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
STRAPI_DIR="$PROJECT_ROOT/strapi"

# Colors
GREEN='\033[0;32m'
AMBER='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  ${AMBER}Bistrot De La Cour${NC} - Development Servers   ${BLUE}║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"

# Check if frontend dependencies are installed
if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
    echo -e "${AMBER}⚠ Frontend dependencies not found. Installing...${NC}"
    cd "$PROJECT_ROOT" && npm install
fi

# Check if Strapi dependencies are installed
if [ ! -d "$STRAPI_DIR/node_modules" ]; then
    echo -e "${AMBER}⚠ Strapi dependencies not found. Installing...${NC}"
    cd "$STRAPI_DIR" && npm install
fi

# Check if Strapi is built
if [ ! -d "$STRAPI_DIR/build" ]; then
    echo -e "${AMBER}⚠ Strapi not built. Building...${NC}"
    cd "$STRAPI_DIR" && npm run build
fi

echo ""
echo -e "${GREEN}Starting development servers...${NC}"
echo ""
echo -e "  ${AMBER}Strapi CMS${NC}  → ${BLUE}http://localhost:1337/admin${NC}"
echo -e "  ${AMBER}Frontend${NC}    → ${BLUE}http://localhost:5173${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop all servers${NC}"
echo ""

# Start both servers
# Strapi in background
cd "$STRAPI_DIR"
npm run develop &
STRAPI_PID=$!

# Wait a moment for Strapi to start
sleep 2

# Frontend in background
cd "$PROJECT_ROOT"
npm run dev &
FRONTEND_PID=$!

# Trap Ctrl+C and kill both processes
trap "echo ''; echo -e '${RED}Stopping servers...${NC}'; kill $STRAPI_PID $FRONTEND_PID 2>/dev/null; wait; echo -e '${GREEN}Done.${NC}'; exit 0" INT TERM

# Wait for both
wait
