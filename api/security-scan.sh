#!/bin/bash
# Script para executar análise de segurança com Semgrep

echo "🔍 Iniciando análise de segurança com Semgrep..."
echo "=================================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Diretório do projeto
PROJECT_DIR="$(pwd)"

# 1. Análise completa com todas as regras
echo -e "${YELLOW}📋 Executando análise completa...${NC}"
docker run --rm -v "$PROJECT_DIR:/src" semgrep/semgrep \
  semgrep --config=auto src/ --text

echo ""
echo "=================================================="

# 2. Análise específica OWASP Top 10
echo -e "${YELLOW}📋 Executando análise OWASP Top 10...${NC}"
docker run --rm -v "$PROJECT_DIR:/src" semgrep/semgrep \
  semgrep --config="p/owasp-top-ten" src/ --text

echo ""
echo "=================================================="

# 3. Gerar relatório JSON
echo -e "${YELLOW}📄 Gerando relatório JSON...${NC}"
docker run --rm -v "$PROJECT_DIR:/src" semgrep/semgrep \
  semgrep --config=auto src/ --json --output=/src/semgrep-report.json

if [ -f "semgrep-report.json" ]; then
  echo -e "${GREEN} Relatório JSON gerado: semgrep-report.json${NC}"
else
  echo -e "${RED} Erro ao gerar relatório JSON${NC}"
fi

echo ""
echo "=================================================="

# 4. Gerar relatório SARIF (para GitHub)
echo -e "${YELLOW}📄 Gerando relatório SARIF...${NC}"
docker run --rm -v "$PROJECT_DIR:/src" semgrep/semgrep \
  semgrep --config=auto src/ --sarif --output=/src/semgrep-report.sarif

if [ -f "semgrep-report.sarif" ]; then
  echo -e "${GREEN} Relatório SARIF gerado: semgrep-report.sarif${NC}"
else
  echo -e "${RED} Erro ao gerar relatório SARIF${NC}"
fi

echo ""
echo "=================================================="

# 5. Análise por severidade
echo -e "${YELLOW}📊 Contagem por severidade:${NC}"
echo ""

echo -e "${RED} ERROS (HIGH):${NC}"
docker run --rm -v "$PROJECT_DIR:/src" semgrep/semgrep \
  semgrep --config=auto src/ --severity=ERROR --count

echo ""
echo -e "${YELLOW} WARNINGS (MEDIUM):${NC}"
docker run --rm -v "$PROJECT_DIR:/src" semgrep/semgrep \
  semgrep --config=auto src/ --severity=WARNING --count

echo ""
echo "=================================================="
echo -e "${GREEN} Análise completa!${NC}"
echo ""
echo "📁 Relatórios gerados:"
echo "  - semgrep-report.json (formato JSON)"
echo "  - semgrep-report.sarif (formato SARIF para GitHub)"
echo ""
echo "🔗 Para mais informações: https://semgrep.dev/docs/"
