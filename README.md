<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://utfs.io/f/eiiA8GXc0v9SqLuNPUnvpTHYU6ftd3wqVrulk9QMG4cXSDx0" alt="Project logo"></a>
</p>

<h3 align="center">Sistema de Gerenciamento de Treinos</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Security](https://img.shields.io/badge/security-scanned-green.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

##  Análise de Segurança OWASP

Este projeto passou por análise completa de segurança usando **Semgrep (SAST)**.

### Documentação

- **[RELATORIO_SEGURANCA.md](./RELATORIO_SEGURANCA.md)** - Relatório completo da análise OWASP

###  Resultados

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Vulnerabilidades** | 2 | 1 |  **-50%** |
| **Severidade HIGH** | 1 | 0 |  **-100%** |

###  Vulnerabilidades

 **CORS Misconfiguration** (HIGH) - Corrigida  
 **Rate Limiting** (MEDIUM) - Documentada  
 **JWT Secret Validation** (MEDIUM) - Documentada

### Executar Análise

```bash
cd api
./security-scan.sh
```

---

##  Sobre o Projeto

Sistema Full-Stack de gerenciamento de treinos com:
-  Autenticação JWT
-  Planos e atividades
-  Relatórios de progresso
-  Docker
-  Segurança OWASP

---

##  Quick Start

### Clone e Instale
```bash
git clone https://github.com/Tutuacs/proj_tematico_2.git
cd proj_tematico_2
```

### Backend
```bash
cd api
pnpm install
docker-compose up -d  # Banco de dados
pnpm run dev
```

### Frontend
```bash
cd client
pnpm install
pnpm run dev
```

### Análise de Segurança
```bash
cd api
./security-scan.sh
```

---

## 📚 Documentação Adicional

- **[RELATORIO_SEGURANCA.md](./RELATORIO_SEGURANCA.md)** - Análise completa OWASP
- **[TABELA_VULNERABILIDADES.md](./TABELA_VULNERABILIDADES.md)** - Resumo executivo
- **[COMO_ENTREGAR.md](./COMO_ENTREGAR.md)** - Guia de entrega

---

## 🛠️ Tecnologias

**Backend:**
- NestJS 11
- Prisma ORM
- PostgreSQL
- JWT Authentication

**Frontend:**
- Next.js 14
- TailwindCSS
- TypeScript

**Segurança:**
- Semgrep SAST
- OWASP Top 10 Compliance

---

##  Autor

**Arthur Silva**
- GitHub: [@Tutuacs](https://github.com/Tutuacs)

---

##  License

MIT License - see LICENSE file for details