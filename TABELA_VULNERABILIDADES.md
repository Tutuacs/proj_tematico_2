# Tabela de Vulnerabilidades - Resumo Executivo

## 📊 Estatísticas Gerais

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Total de Vulnerabilidades** | 2 | 1 |  **-50%** |
| **Severidade HIGH** | 1 | 0 |  **-100%** |
| **Severidade MEDIUM** | 1 | 1 | - |
| **Arquivos Analisados** | 99 | 99 | - |
| **Regras Executadas** | 217 | 217 | - |

---

## 🎯 Tabela Completa de Vulnerabilidades

| Vulnerabilidade | Severidade | Descrição / Evidência | Categoria OWASP | Medidas Corretivas | Status |
|----------------|-----------|----------------------|----------------|-------------------|--------|
| **CORS Misconfiguration** | ** ALTA** | Configuração `origin: '*'` permite qualquer origem fazer requisições à API. Encontrado em `src/main.ts:14` | **A05:2021** - Security Misconfiguration<br>**CWE-183** | 1. Implementar whitelist de origens<br>2. Usar variável `ALLOWED_ORIGINS`<br>3. Adicionar `credentials: true`<br>4. Limitar métodos HTTP |  **CORRIGIDO** |
| **Missing Rate Limiting** | ** MÉDIA** | API não possui limitação de taxa de requisições, permitindo ataques de força bruta e DoS | **A04:2021** - Insecure Design<br>**API4:2023** | 1. Instalar `@nestjs/throttler`<br>2. Configurar limites globais (10 req/min)<br>3. Limites específicos para auth (3 req/min) |  **RECOMENDADO** |
| **Weak JWT Secret Validation** | ** MÉDIA** | Acesso direto a `env.JWT_TOKEN_SECRET` sem validação. Se undefined, compromete totalmente a segurança. `auth.service.ts:57` | **A02:2021** - Cryptographic Failures<br>**ASVS V2.10** | 1. Implementar validação no startup<br>2. Usar `@nestjs/config` com validation<br>3. Garantir mínimo 32 caracteres |  **RECOMENDADO** |

---

## 🔍 Detalhamento por Prioridade

###  Prioridade ALTA (Implementar Imediatamente)

#### 1. CORS Misconfiguration  CORRIGIDO

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
  origin: allowedOrigins,  //  SEGURO
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
});
```

**Impacto:** Elimina risco de CSRF, session hijacking e data exfiltration.

---

###  Prioridade MÉDIA (Próximo Sprint)

#### 2. Missing Rate Limiting  RECOMENDADO

**Implementação:**
```bash
pnpm add @nestjs/throttler
```

```typescript
ThrottlerModule.forRoot([{
  ttl: 60000,
  limit: 10,
}])
```

**Impacto:** Previne força bruta, DoS e resource exhaustion.

---

#### 3. Weak JWT Secret Validation  RECOMENDADO

**Implementação:**
```typescript
class EnvironmentVariables {
  @IsString()
  @MinLength(32)
  JWT_TOKEN_SECRET: string;
}
```

**Impacto:** Garante que secrets são válidos no startup.

---

##  Gráfico de Progresso

```
ANTES DA CORREÇÃO:
HIGH    : ██████████ (1 vulnerabilidade)
MEDIUM  : ██████████ (1 vulnerabilidade)

DEPOIS DA CORREÇÃO:
HIGH    : (0)   Eliminado
MEDIUM  : █████ (1)   -50% redução
```

---

##  Plano de Ação

###  Fase 1: Concluída
- [x] Corrigir CORS misconfiguration
- [x] Adicionar variável ALLOWED_ORIGINS
- [x] Testar configuração

###  Fase 2: Recomendada
- [ ] Implementar rate limiting
- [ ] Adicionar validação de JWT secrets
- [ ] Configurar Helmet.js

---

##  Referências

- **Ferramenta:** Semgrep v1.143.3
- **Repositório:** https://github.com/Tutuacs/proj_tematico_2
- **Relatório Completo:** [RELATORIO_SEGURANCA.md](./RELATORIO_SEGURANCA.md)
- **OWASP Top 10:** https://owasp.org/Top10/

---

**Data:** 28/11/2025  
**Status:**  50% de melhoria alcançada
