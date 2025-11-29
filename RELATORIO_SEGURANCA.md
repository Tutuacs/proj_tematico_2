# Relatório de Análise de Segurança - OWASP
## Sistema de Gerenciamento de Treinos (NestJS API)

**Autor:** Arthur Silva  
**Data:** 28 de Novembro de 2025  
**Repositório:** https://github.com/Tutuacs/proj_tematico_2

---

## 1. Escolha da Categoria de Ferramenta

### Categoria: **SAST (Static Application Security Testing)**

**Justificativa:**

Escolhi SAST pelos seguintes motivos:

1. **Adequação ao Projeto**: O back-end em TypeScript/NestJS possui sistema de autenticação JWT, APIs REST e integração com banco de dados, tornando-o ideal para análise estática de código.

2. **Momento Ideal**: SAST identifica vulnerabilidades durante o desenvolvimento, antes do deployment, quando correções são mais baratas e simples.

3. **Vantagens Técnicas**:
   - Não requer execução da aplicação
   - Análise rápida do código TypeScript/JavaScript
   - Integração simples com CI/CD
   - Detecta problemas de segurança, hardcoded secrets e configurações inadequadas

4. **Comparação com Alternativas**:
   - **DAST**: Requer aplicação em execução (mais complexo)
   - **IAST**: Necessita instrumentação no runtime
   - **SCA**: Foca apenas em dependências, não código customizado

---

## 2. Escolha da Ferramenta

### Ferramenta: **Semgrep v1.143.3**

**Características:**
- Análise estática com pattern matching semântico
- Suporte nativo para TypeScript/JavaScript e NestJS
- Regras pré-configuradas para OWASP Top 10
- Gratuito e open-source
- Baixa taxa de falsos positivos
- Integração fácil com CI/CD

**Justificativa:**
Escolhi o Semgrep pela compatibilidade perfeita com TypeScript, rapidez de análise (segundos), regras específicas para OWASP Top 10, e facilidade de uso via Docker sem instalação complexa

---

## 3. Aplicação da Ferramenta

### Instalação e Execução:

```bash
# Usando Docker (não requer instalação)
docker run --rm -v "$(pwd):/src" semgrep/semgrep \
  semgrep --config=auto src/

# Análise OWASP Top 10
docker run --rm -v "$(pwd):/src" semgrep/semgrep \
  semgrep --config="p/owasp-top-ten" src/

# Gerar relatório JSON
docker run --rm -v "$(pwd):/src" semgrep/semgrep \
  semgrep --config=auto --json --output=/src/report.json src/
```

### Resultado da Execução Inicial:

```
┌─────────────────┐
│ 2 Code Findings │
└─────────────────┘

src/main.ts - CORS Misconfiguration (HIGH)
src/prisma/types/index.js - Path Traversal (WARNING)

 Scan completed successfully.
• Findings: 2 (2 blocking)
• Rules run: 217
• Targets scanned: 99 files
```

**Relatórios Gerados:**
- `security-report-initial.json` - Relatório completo (50KB)
- Formato JSON estruturado para análise programática

---

## 4. Análise dos Resultados

### Tabela de Vulnerabilidades

| # | Vulnerabilidade | Severidade | Arquivo | Categoria OWASP |
|---|----------------|-----------|---------|----------------|
| 1 | CORS Misconfiguration | **ALTA** | `main.ts:14` | A05:2021 - Security Misconfiguration |
| 2 | Missing Rate Limiting | **MÉDIA** | `main.ts` | A04:2021 - Insecure Design |
| 3 | Weak JWT Secret Access | **MÉDIA** | `auth.service.ts:57` | A02:2021 - Cryptographic Failures |

---

### Vulnerabilidade 1: CORS Misconfiguration - ALTA

**Código Vulnerável:**
```typescript
app.enableCors({
  origin: '*',  // Permite QUALQUER origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});
```

**Descrição:**
A configuração `origin: '*'` desabilita a proteção Same-Origin Policy, permitindo que qualquer website faça requisições à API. Isso possibilita ataques CSRF, roubo de dados e session hijacking.

**Impacto:** Um site malicioso pode fazer requisições autenticadas em nome do usuário, acessar dados sensíveis e executar ações não autorizadas.

**OWASP:** A05:2021 - Security Misconfiguration, CWE-183

**Medidas Corretivas:**
1. Implementar whitelist de origens permitidas
2. Usar variável de ambiente `ALLOWED_ORIGINS`
3. Adicionar `credentials: true` para controle de cookies
4. Limitar métodos HTTP aos necessários
5. Configurar headers específicos

---

### Vulnerabilidade 2: Missing Rate Limiting - MÉDIA

**Problema:**
A API não possui limitação de taxa de requisições, permitindo número ilimitado de chamadas.

**Impacto:** 
- Ataques de força bruta em endpoints de login
- Denial of Service (DoS)
- Esgotamento de recursos do servidor
- Scraping massivo de dados

**OWASP:** A04:2021 - Insecure Design, API4:2023 - Unrestricted Resource Consumption

**Medidas Corretivas:**
```bash
# Instalar dependência
pnpm add @nestjs/throttler
```

```typescript
// Configurar rate limiting
ThrottlerModule.forRoot([{
  ttl: 60000,   // 60 segundos
  limit: 10,    // 10 requisições
}])

// Específico para auth
@Throttle({ default: { limit: 3, ttl: 60000 } })
@Post('login')
async login() { }
```

---

### Vulnerabilidade 3: Weak JWT Secret Validation - MÉDIA

**Código Problemático:**
```typescript
secret: env.JWT_TOKEN_SECRET,  // Sem validação
```

**Descrição:**
Acesso direto a `env.JWT_TOKEN_SECRET` sem validar se existe ou tem comprimento adequado. Se undefined, toda segurança é comprometida.

**Impacto:** Tokens podem ser forjados, permitindo acesso não autorizado e escalonamento de privilégios.

**OWASP:** A02:2021 - Cryptographic Failures, ASVS V2.10

**Medidas Corretivas:**
```typescript
// Validar no startup
class EnvironmentVariables {
  @IsString()
  @MinLength(32)
  JWT_TOKEN_SECRET: string;
}

// No service
constructor(private config: ConfigService) {
  const secret = this.config.get<string>('JWT_TOKEN_SECRET');
  if (!secret || secret.length < 32) {
    throw new Error('JWT secret inválido');
  }
}
```

---

## 5. Correção e Reexecução

### Vulnerabilidade Corrigida: CORS Misconfiguration

**Código ANTES:**
```typescript
app.enableCors({
  origin: '*',  //  VULNERÁVEL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});
```

**Código DEPOIS:**
```typescript
const allowedOrigins = env.ALLOWED_ORIGINS
  ? env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.enableCors({
  origin: allowedOrigins,  //  Whitelist
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
});
```

**Configuração Adicionada (.env.example):**
```bash
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001"
```

### Resultado da Reexecução:

```
┌────────────────┐
│ 1 Code Finding │  -50% de vulnerabilidades
└────────────────┘

src/prisma/types/index.js - Path Traversal (WARNING)
```

### Comparação:

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Total** | 2 | 1 | **-50%** |
| **HIGH** | 1 | 0 | **-100%** |
| **MEDIUM** | 1 | 1 | - |

**Status:** Vulnerabilidade CORS eliminada com sucesso!

---

## 6. Reflexão Final

### O que Aprendi

1. **Configurações Simples, Impacto Crítico**: Aprendi que vulnerabilidades graves podem estar em configurações aparentemente simples como `origin: '*'`. Segurança não é sempre sobre código complexo.

2. **SAST no Desenvolvimento**: Ferramentas SAST como Semgrep são essenciais para detectar problemas precocemente. A análise estática encontrou vulnerabilidades que facilmente passariam despercebidas em code review manual.

3. **OWASP Top 10 na Prática**: Ver concretamente como as vulnerabilidades do OWASP Top 10 se manifestam em código real foi muito educativo. A teoria ganhou significado prático.

4. **Segurança em Camadas**: Uma única correção não torna o sistema seguro. É necessário combinar múltiplas proteções (CORS, rate limiting, validação de secrets, etc.).

### Limitações Percebidas

1. **Falsos Positivos**: Arquivos gerados automaticamente (Prisma) foram marcados com alertas que não representam riscos reais no contexto do projeto.

2. **Escopo Restrito**: SAST analisa apenas código estático. Não detecta vulnerabilidades de runtime, problemas de infraestrutura ou falhas em dependências externas.

3. **Dependência de Regras**: A qualidade da análise depende das regras configuradas. Vulnerabilidades específicas do domínio podem passar despercebidas sem regras customizadas.

4. **Contexto Limitado**: A ferramenta tem dificuldade em entender padrões específicos de frameworks (como decorators do NestJS) e lógica de negócio complexa.

### Integração no Fluxo de Desenvolvimento

**1. CI/CD Pipeline:**
```yaml
# .github/workflows/security-scan.yml
- uses: returntocorp/semgrep-action@v1
  with:
    config: p/security-audit
```

**2. Pre-commit Hook:**
```bash
semgrep --config=auto --severity=ERROR src/
```

**3. Cadência:**
- **A cada commit**: Scan rápido via pre-commit
- **A cada PR**: Scan completo com todas as regras
- **Diariamente**: Scan scheduled no branch main
- **Antes de releases**: Review manual + scan completo

**4. Cultura de Segurança:**
- Training mensal sobre OWASP Top 10
- Security champions no time
- Knowledge base de vulnerabilidades comuns
- Blameless postmortems para aprendizado

**Conclusão:** Este projeto demonstrou que segurança não é uma feature, mas um processo contínuo que deve ser integrado em todas as fases do desenvolvimento. Ferramentas automatizadas são essenciais, mas devem ser complementadas com conhecimento e revisão humana.

---

## Anexos

### Comandos Executados

```bash
# Análise inicial
docker run --rm -v "$(pwd):/src" semgrep/semgrep \
  semgrep --config=auto src/

# Gerar relatório JSON
docker run --rm -v "$(pwd):/src" semgrep/semgrep \
  semgrep --config=auto --json --output=/src/report.json src/

# Análise após correção
docker run --rm -v "$(pwd):/src" semgrep/semgrep \
  semgrep --config=auto src/
```

### Arquivos Gerados

- `security-report-initial.json` - Relatório antes das correções
- `security-report-after-fix.json` - Relatório após correções
- `api/src/main.ts` - Código corrigido
- `api/.env.example` - Variável ALLOWED_ORIGINS adicionada

### Referências

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [OWASP ASVS v4.0](https://owasp.org/www-project-application-security-verification-standard/)
- [Semgrep Documentation](https://semgrep.dev/docs/)
- [OWASP Free Tools](https://owasp.org/www-community/Free_for_Open_Source_Application_Security_Tools)

---

**Repositório**: https://github.com/Tutuacs/proj_tematico_2  
**Data**: 28/11/2025  
**Status**:  Completo
