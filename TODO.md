# 📋 TODO - Sistema de Gerenciamento de Academia

**Projeto:** proj_tematico_2  
**Data de Criação:** 31/10/2025  
**Status Geral:** � Em Desenvolvimento (≈60% completo)

---

## 📊 VISÃO GERAL DO PROJETO

### Tecnologias
- **Backend:** NestJS + Prisma + PostgreSQL
- **Frontend:** Next.js 14+ (App Router) + TypeScript + TailwindCSS
- **Desktop:** Python (main.py)

### Roles do Sistema
- **TRAINEE (0):** Aluno - visualiza planos e registra treinos
- **TRAINER (1):** Instrutor - gerencia alunos, planos e avaliações
- **ADMIN (2):** Administrador - gerencia todos os usuários

---

## 🔴 PROBLEMAS CRÍTICOS NA API (BLOQUEADORES)

### ✅ P0 - Módulo Exercise Inexistente
**Status:** ✅ IMPLEMENTADO  
**Impacto:** Desbloqueia UC03, UC04, UC09  
**Prioridade:** CRÍTICA

**Tarefas:**
- [x] Criar módulo Exercise via `nest g resource exercise`
- [x] Implementar DTOs (CreateExerciseDto, UpdateExerciseDto)
- [x] Criar controller com endpoints:
  - [x] `POST /exercise` - Registrar execução de treino
  - [x] `GET /exercise` - Listar execuções (com query params)
  - [x] `GET /exercise?traineeId=xxx` - Filtrar por aluno
  - [x] `GET /exercise?planId=xxx` - Filtrar por plano
  - [x] `GET /exercise?trainId=xxx` - Filtrar por treino
  - [x] `GET /exercise/:id` - Buscar por ID
  - [x] `PATCH /exercise/:id` - Atualizar execução
  - [x] `DELETE /exercise/:id` - Remover execução
- [x] Implementar service com lógica de negócio
- [x] Adicionar guards de autenticação e autorização
- [x] Validar permissões (TRAINEE cria seus próprios, TRAINER/ADMIN veem todos)
- [ ] Testar endpoints no Insomnia/Postman

---

## 🟡 PROBLEMAS NO SCHEMA PRISMA

### ✅ P1 - Plan.weekDay é ENUM singular
**Status:** ✅ CORRIGIDO  
**Problema:** Um plano só pode ter 1 dia da semana  
**Solução:** weekDay movido para Train

**Tarefas:**
- [x] Remover weekDay do Plan
- [x] Adicionar weekDay ao Train
- [x] Criar migration: `fix-schema-relations`
- [x] Atualizar DTOs do Plan
- [x] Atualizar service do Plan
- [x] Atualizar DTOs do Train
- [x] Atualizar service do Train
- [x] Testar criação de planos com múltiplos dias

---

### ✅ P1 - Plan não tem trainerId
**Status:** ✅ CORRIGIDO  
**Problema:** Não identifica qual instrutor criou o plano  

**Tarefas:**
- [x] Adicionar campo trainerId no schema
- [x] Criar migration: `fix-schema-relations`
- [x] Atualizar CreatePlanDto (trainerId automático via JWT)
- [x] Atualizar PlanService.create() para pegar trainerId do perfil autenticado
- [x] Atualizar filtros em PlanService.findAll()
- [x] Testar criação e listagem de planos

---

### ✅ P2 - Report não tem createdBy
**Status:** ✅ CORRIGIDO  
**Problema:** Não identifica qual instrutor criou a avaliação

**Tarefas:**
- [x] Adicionar campo createdBy no schema
- [x] Criar migration: `fix-schema-relations`
- [x] Atualizar CreateReportDto
- [x] Atualizar ReportService.create() para pegar createdBy do perfil autenticado
- [x] Testar criação de relatórios

---

## ✅ API - MÓDULOS IMPLEMENTADOS

### ✓ AuthModule
**Status:** ✅ COMPLETO  
**Casos de Uso:** UC01 - Logar no sistema

**Endpoints:**
- [x] `POST /auth/login` - Login com email/senha
- [x] `POST /auth/register` - Registro de usuário
- [x] `POST /auth/refresh` - Renovar tokens (com RefreshJwtGuard)

**Arquivos:**
- [x] auth.controller.ts
- [x] auth.service.ts
- [x] LoginDto, RegisterDto
- [x] Guards: AuthGuard, RefreshJwtGuard

---

### ✓ ProfileModule
**Status:** ✅ COMPLETO  
**Casos de Uso:** UC05, UC11 - Gerenciar Alunos/Usuários

**Endpoints:**
- [x] `POST /profile` - Criar perfil (ADMIN only)
- [x] `GET /profile` - Listar perfis (todos os roles)
- [x] `GET /profile/:id` - Buscar por ID
- [x] `PATCH /profile/:id` - Atualizar perfil
- [x] `DELETE /profile/:id` - Remover perfil (ADMIN only)

**Guards:**
- [x] AuthGuard + RoleGuard implementados
- [x] Decorator @Access(ROLE.X, ROLE.Y)
- [x] Decorator @ProfileAuth() para pegar usuário autenticado

---

### ✓ PlanModule
**Status:** ✅ COMPLETO (com ressalvas do schema)  
**Casos de Uso:** UC02, UC07 - Visualizar/Gerenciar Planos

**Endpoints:**
- [x] `POST /plan` - Criar plano (TRAINER, ADMIN)
- [x] `GET /plan` - Listar planos
- [x] `GET /plan/:id` - Buscar por ID
- [x] `PATCH /plan/:id` - Atualizar plano (TRAINER, ADMIN)
- [x] `DELETE /plan/:id` - Remover plano (TRAINER, ADMIN)

**Pendências:**
- [ ] Verificar se retorna Activities relacionadas
- [ ] Verificar se retorna Trains relacionados
- [ ] Adicionar filtros (traineeId, trainerId, ativo/inativo)

---

### ✓ ActivityModule
**Status:** ✅ COMPLETO  
**Casos de Uso:** UC06 - Cadastrar/Editar Atividade

**Endpoints:**
- [x] `POST /activity` - Criar atividade
- [x] `GET /activity` - Listar atividades
- [x] `GET /activity/:id` - Buscar por ID
- [x] `PATCH /activity/:id` - Atualizar atividade
- [x] `DELETE /activity/:id` - Remover atividade

**Tipos de Atividade:**
- [x] CARDIO
- [x] STRENGTH
- [x] FLEXIBILITY
- [x] BALANCE

---

### ✓ TrainModule
**Status:** ✅ COMPLETO  
**Casos de Uso:** UC03 (parcial) - Estrutura do treino

**Endpoints:**
- [x] `POST /train` - Criar treino
- [x] `GET /train` - Listar treinos
- [x] `GET /train/:id` - Buscar por ID
- [x] `PATCH /train/:id` - Atualizar treino
- [x] `DELETE /train/:id` - Remover treino

**Pendências:**
- [ ] Adicionar filtro por planId
- [ ] Adicionar filtro por data (from/to)
- [ ] Verificar se retorna Activities relacionadas

---

### ✓ ReportModule
**Status:** ✅ COMPLETO  
**Casos de Uso:** UC08, UC10 - Registrar/Visualizar Avaliações

**Endpoints:**
- [x] `POST /report` - Criar avaliação (TRAINER, ADMIN)
- [x] `GET /report` - Listar avaliações
- [x] `GET /report/:id` - Buscar por ID
- [x] `PATCH /report/:id` - Atualizar avaliação (TRAINER, ADMIN)
- [x] `DELETE /report/:id` - Remover avaliação (TRAINER, ADMIN)

**Pendências:**
- [ ] Adicionar filtro por profileId (aluno)
- [ ] Adicionar filtro por data
- [ ] Calcular IMC automaticamente no backend

---

### ✓ BodyPartModule
**Status:** ✅ COMPLETO  
**Casos de Uso:** UC08, UC10 - Detalhes da Avaliação

**Endpoints:**
- [x] `POST /body-part` - Criar medida corporal (TRAINER, ADMIN)
- [x] `GET /body-part` - Listar medidas
- [x] `GET /body-part/:id` - Buscar por ID
- [x] `PATCH /body-part/:id` - Atualizar medida (TRAINER, ADMIN)
- [x] `DELETE /body-part/:id` - Remover medida (TRAINER, ADMIN)

**Pendências:**
- [ ] Adicionar filtro por reportId

---

## 🎨 CLIENT (NEXT.JS) - PÁGINAS A DESENVOLVER

### 🔐 ÁREA DE AUTENTICAÇÃO `/app/(auth-routes)/`

#### 1. Página de Login
**Rota:** `/login`  
**Status:** 🟡 VERIFICAR IMPLEMENTAÇÃO  
**UC:** UC01  
**API:** `POST /auth/login`

**Checklist:**
- [ ] Formulário com email e senha
- [ ] Validação com Zod/React Hook Form
- [ ] Tratamento de erros (credenciais inválidas)
- [ ] Armazenar tokens (localStorage/cookies)
- [ ] Redirecionar baseado em role:
  - [ ] TRAINEE → `/trainee/dashboard`
  - [ ] TRAINER → `/trainer/dashboard`
  - [ ] ADMIN → `/admin/dashboard`
- [ ] Loading state
- [ ] Link para "Esqueci senha" e "Criar conta"

**Componentes:**
- [ ] Input customizado
- [ ] Button com loading
- [ ] Toast de notificação

---

#### 2. Página de Registro
**Rota:** `/register`  
**Status:** 🟡 VERIFICAR IMPLEMENTAÇÃO  
**UC:** UC01  
**API:** `POST /auth/register`

**Checklist:**
- [ ] Formulário: name, email, password, confirmPassword
- [ ] Validação de senha forte
- [ ] Verificar se senhas coincidem
- [ ] Verificar email único (feedback da API)
- [ ] Redirecionar para login após sucesso
- [ ] Loading state
- [ ] Link para "Já tenho conta"

---

#### 3. Página Esqueci Senha
**Rota:** `/forgot`  
**Status:** 🔴 SEM ENDPOINT NA API  
**UC:** N/A

**Checklist:**
- [ ] Criar endpoint `POST /auth/forgot-password` na API
- [ ] Criar endpoint `POST /auth/reset-password` na API
- [ ] Formulário para solicitar reset
- [ ] Página de confirmação
- [ ] (Futuro) Integração com email

---

### 👤 ÁREA DO ALUNO (TRAINEE) `/app/trainee/`

#### 4. Dashboard do Aluno
**Rota:** `/trainee/dashboard`  
**Status:** 🟡 VERIFICAR IMPLEMENTAÇÃO  
**UC:** UC02, UC04  
**API:**
- `GET /plan` (planos do aluno logado)
- `GET /report` (avaliações do aluno)
- `GET /exercise` (⚠️ FALTA IMPLEMENTAR)

**Checklist:**
- [ ] Layout com sidebar/header
- [ ] Card: Plano Ativo Atual
  - [ ] Título do plano
  - [ ] Período (from - to)
  - [ ] Próximo treino
  - [ ] Botão "Ver Detalhes"
- [ ] Card: Última Avaliação
  - [ ] Peso atual
  - [ ] IMC
  - [ ] % Gordura
  - [ ] Data da avaliação
- [ ] Card: Progresso Semanal
  - [ ] Treinos realizados esta semana
  - [ ] Gráfico de barras (dias x treinos)
- [ ] Botão flutuante: "Registrar Treino de Hoje"
- [ ] Loading skeletons
- [ ] Empty states (sem plano ativo, sem avaliações)

**Componentes a criar:**
- [ ] DashboardCard
- [ ] ProgressChart
- [ ] QuickActionButton

---

#### 5. Meus Planos de Treino
**Rota:** `/trainee/plans`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC02  
**API:** `GET /plan`

**Checklist:**
- [ ] Lista de planos (cards ou tabela)
- [ ] Filtros:
  - [ ] Status: Ativo / Histórico
  - [ ] Data: Últimos 30 dias, 3 meses, etc.
- [ ] Para cada plano:
  - [ ] Título
  - [ ] Período (from - to)
  - [ ] Status (ativo/expirado)
  - [ ] Botão "Ver Detalhes"
- [ ] Paginação (se muitos planos)
- [ ] Empty state: "Nenhum plano atribuído"

---

#### 6. Detalhes do Plano
**Rota:** `/trainee/plans/[id]`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC02  
**API:**
- `GET /plan/:id`
- `GET /train?planId=xxx`
- `GET /activity?planId=xxx`

**Checklist:**
- [ ] Breadcrumb: Dashboard > Planos > [Nome do Plano]
- [ ] Header:
  - [ ] Título do plano
  - [ ] Descrição
  - [ ] Período
  - [ ] Nome do instrutor
- [ ] Seção: Treinos da Semana
  - [ ] Tabs por dia da semana (SEG, TER, QUA, etc.)
  - [ ] Lista de atividades por dia:
    - [ ] Nome do exercício
    - [ ] Tipo (cardio/strength/etc.)
    - [ ] Séries x Repetições
    - [ ] Peso sugerido
    - [ ] Duração (se cardio)
- [ ] Botão: "Registrar Treino" (para o dia atual)
- [ ] Loading states

**Componentes a criar:**
- [ ] PlanHeader
- [ ] WeekdayTabs
- [ ] ActivityList
- [ ] ActivityCard

---

#### 7. Registrar Treino Realizado
**Rota:** `/trainee/train/new` ou `/trainee/plans/[id]/train`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC03 ⚠️ BLOQUEADO (falta API Exercise)  
**API:**
- `GET /plan/:id`
- `GET /train?planId=xxx`
- ⚠️ `POST /exercise` (NÃO EXISTE)

**Checklist:**
- [ ] Aguardar implementação do módulo Exercise na API
- [ ] Seletor: Qual plano treinar (se tiver múltiplos ativos)
- [ ] Seletor: Qual dia da semana (ou detectar automaticamente)
- [ ] Lista de atividades do treino selecionado
- [ ] Para cada atividade:
  - [ ] Nome do exercício
  - [ ] Séries planejadas (somente leitura)
  - [ ] Input: Séries realizadas
  - [ ] Input: Repetições realizadas
  - [ ] Input: Peso utilizado
  - [ ] Input: Duração (se cardio)
  - [ ] TextArea: Observações (opcional)
- [ ] Botão: "Marcar como Concluído"
- [ ] Confirmação: "Treino registrado com sucesso!"
- [ ] Redirecionar para Dashboard ou Histórico

**Validações:**
- [ ] Séries/reps/peso devem ser números positivos
- [ ] Não permitir registrar treino de dia futuro
- [ ] Permitir editar treino já registrado (mesmo dia)

---

#### 8. Histórico de Treinos
**Rota:** `/trainee/history/workouts`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC04 ⚠️ BLOQUEADO (falta API Exercise)  
**API:** ⚠️ `GET /exercise` (NÃO EXISTE)

**Checklist:**
- [ ] Aguardar implementação do módulo Exercise na API
- [ ] Lista de treinos concluídos (ordenados por data DESC)
- [ ] Filtros:
  - [ ] Data: Última semana, mês, 3 meses, ano
  - [ ] Plano: Dropdown com planos
  - [ ] Tipo de treino: Todos, Cardio, Força, etc.
- [ ] Para cada treino:
  - [ ] Data de execução
  - [ ] Plano e dia da semana
  - [ ] Resumo: X exercícios realizados
  - [ ] Botão: "Ver Detalhes"
- [ ] Detalhes do treino (modal ou página):
  - [ ] Lista de exercícios executados
  - [ ] Peso x Reps x Séries
  - [ ] Observações
  - [ ] Comparação com treino anterior (mesmo exercício)
- [ ] Gráficos de evolução:
  - [ ] Linha: Carga total ao longo do tempo
  - [ ] Barras: Treinos por semana

**Componentes a criar:**
- [ ] WorkoutHistoryList
- [ ] WorkoutDetailModal
- [ ] ProgressChart (evolução de carga)

---

#### 9. Histórico de Avaliações Físicas
**Rota:** `/trainee/history/assessments`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC04  
**API:**
- `GET /report?profileId=xxx`
- `GET /body-part?reportId=xxx`

**Checklist:**
- [ ] Lista de avaliações (ordenadas por data DESC)
- [ ] Para cada avaliação:
  - [ ] Data
  - [ ] Peso
  - [ ] IMC
  - [ ] % Gordura
  - [ ] Nome do instrutor
  - [ ] Botão: "Ver Detalhes"
- [ ] Detalhes da avaliação (modal ou página):
  - [ ] Dados gerais (peso, IMC, gordura)
  - [ ] Tabela de medidas corporais (BodyPart)
  - [ ] Observações do instrutor
- [ ] Gráficos de evolução:
  - [ ] Linha: Peso ao longo do tempo
  - [ ] Linha: IMC ao longo do tempo
  - [ ] Linha: % Gordura ao longo do tempo
- [ ] Comparação entre avaliações:
  - [ ] Diferença de peso, IMC, gordura
  - [ ] Ganho/perda muscular

**Componentes a criar:**
- [ ] AssessmentList
- [ ] AssessmentDetailModal
- [ ] EvolutionChart
- [ ] ComparisonTable

---

#### 10. Meu Perfil
**Rota:** `/trainee/profile`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** N/A (gerenciamento próprio)  
**API:**
- `GET /profile/:id`
- `PATCH /profile/:id`

**Checklist:**
- [ ] Formulário de edição:
  - [ ] Nome
  - [ ] Email (somente leitura)
  - [ ] Foto de perfil (upload - futuro)
- [ ] Seção: Alterar Senha
  - [ ] Senha atual
  - [ ] Nova senha
  - [ ] Confirmar nova senha
  - [ ] Endpoint: `PATCH /profile/:id/password` (criar na API)
- [ ] Botão: "Salvar Alterações"
- [ ] Feedback de sucesso/erro

---

### 🏋️ ÁREA DO INSTRUTOR (TRAINER) `/app/trainer/`

#### 11. Dashboard do Instrutor
**Rota:** `/trainer/dashboard`  
**Status:** 🟡 VERIFICAR IMPLEMENTAÇÃO  
**UC:** N/A  
**API:**
- `GET /profile` (contar alunos do instrutor)
- `GET /plan` (planos ativos)
- `GET /activity` (total de exercícios)

**Checklist:**
- [ ] Layout com sidebar/header
- [ ] Cards de métricas:
  - [ ] Total de Alunos
  - [ ] Planos Ativos
  - [ ] Exercícios Cadastrados
  - [ ] Avaliações Pendentes (futuro)
- [ ] Seção: Alunos Recentes
  - [ ] Lista dos últimos 5 alunos cadastrados
  - [ ] Botão "Ver Todos"
- [ ] Seção: Atalhos Rápidos
  - [ ] "Criar Novo Plano"
  - [ ] "Registrar Avaliação"
  - [ ] "Cadastrar Exercício"
- [ ] Gráfico: Planos criados por mês (últimos 6 meses)

---

#### 12. Gerenciar Alunos
**Rota:** `/trainer/trainees`  
**Status:** 🟡 VERIFICAR IMPLEMENTAÇÃO  
**UC:** UC05  
**API:** `GET /profile?role=0&trainerId=xxx`

**Checklist:**
- [ ] Implementar filtro por trainerId na API
- [ ] Tabela/Grid de alunos:
  - [ ] Nome
  - [ ] Email
  - [ ] Data de cadastro
  - [ ] Plano ativo (sim/não)
  - [ ] Última avaliação
  - [ ] Ações: Ver Perfil, Editar
- [ ] Busca por nome/email
- [ ] Ordenação (nome, data cadastro)
- [ ] Paginação
- [ ] Empty state: "Nenhum aluno cadastrado"

---

#### 13. Perfil do Aluno (Visão do Instrutor)
**Rota:** `/trainer/trainees/[id]`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC05, UC09, UC10  
**API:**
- `GET /profile/:id`
- `PATCH /profile/:id`
- `GET /plan?traineeId=xxx`
- `GET /report?profileId=xxx`
- ⚠️ `GET /exercise?traineeId=xxx` (NÃO EXISTE)

**Checklist:**
- [ ] Header:
  - [ ] Foto do aluno
  - [ ] Nome
  - [ ] Email
  - [ ] Data de cadastro
- [ ] Formulário de edição (inline ou modal):
  - [ ] Nome
  - [ ] Email
  - [ ] Alterar instrutor responsável (admin only)
  - [ ] Botão "Salvar"
- [ ] Tabs:
  - [ ] **Planos de Treino**
    - [ ] Lista de planos do aluno
    - [ ] Status (ativo/expirado)
    - [ ] Botão "Criar Novo Plano"
    - [ ] Botão "Ver Detalhes" / "Editar" / "Excluir"
  - [ ] **Avaliações Físicas**
    - [ ] Lista de avaliações
    - [ ] Gráficos de evolução
    - [ ] Botão "Registrar Nova Avaliação"
  - [ ] **Histórico de Execuções**
    - [ ] ⚠️ Aguardar API Exercise
    - [ ] Lista de treinos realizados
    - [ ] Filtro por plano
    - [ ] Comparação de cargas/progressão

---

#### 14. Gerenciar Atividades/Exercícios
**Rota:** `/trainer/activities`  
**Status:** 🟡 VERIFICAR IMPLEMENTAÇÃO  
**UC:** UC06  
**API:**
- `GET /activity`
- `POST /activity`
- `PATCH /activity/:id`
- `DELETE /activity/:id`

**Checklist:**
- [ ] Tabela/Grid de atividades:
  - [ ] Nome
  - [ ] Tipo (Cardio/Força/Flexibilidade/Equilíbrio)
  - [ ] Descrição (resumida)
  - [ ] Ações: Editar, Excluir
- [ ] Busca por nome
- [ ] Filtro por tipo
- [ ] Botão: "Cadastrar Nova Atividade"
- [ ] Modal/Form de criação:
  - [ ] Nome (obrigatório)
  - [ ] Tipo (select com enum ACTIVITY_TYPE)
  - [ ] Descrição
  - [ ] Grupos musculares (tags ou multi-select)
  - [ ] Observações
- [ ] Modal/Form de edição (mesmos campos)
- [ ] Confirmação de exclusão
- [ ] Validação: não permitir excluir se atividade está em uso

---

#### 15. Gerenciar Planos de Treino
**Rota:** `/trainer/plans`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC07  
**API:**
- `GET /plan?trainerId=xxx`
- `DELETE /plan/:id`

**Checklist:**
- [ ] Implementar filtro por trainerId na API
- [ ] Tabela/Grid de planos:
  - [ ] Título
  - [ ] Aluno (nome)
  - [ ] Período (from - to)
  - [ ] Status (ativo/expirado)
  - [ ] Ações: Ver, Editar, Excluir
- [ ] Filtros:
  - [ ] Aluno (dropdown)
  - [ ] Status (ativo/expirado/todos)
  - [ ] Data
- [ ] Busca por título
- [ ] Botão: "Criar Novo Plano"
- [ ] Confirmação de exclusão

---

#### 16. Criar Plano de Treino
**Rota:** `/trainer/plans/new`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC07  
**API:**
- `GET /profile?role=0` (listar alunos)
- `GET /activity` (listar atividades)
- `POST /plan`
- `POST /train` (múltiplos, um por dia)

**Checklist:**
- [ ] **IMPORTANTE:** Corrigir schema Prisma primeiro (weekDay no Train)
- [ ] Step 1 - Informações Básicas:
  - [ ] Select: Aluno (obrigatório)
  - [ ] Input: Título do plano (obrigatório)
  - [ ] TextArea: Descrição
  - [ ] DatePicker: Data de início (from)
  - [ ] DatePicker: Data de fim (to)
  - [ ] Botão: "Próximo"
- [ ] Step 2 - Configurar Dias da Semana:
  - [ ] Checkboxes: Selecionar dias (Seg, Ter, Qua, etc.)
  - [ ] Para cada dia selecionado, criar um bloco
  - [ ] Botão: "Próximo"
- [ ] Step 3 - Adicionar Atividades por Dia:
  - [ ] Para cada dia selecionado:
    - [ ] Título: "Segunda-feira", etc.
    - [ ] Botão: "Adicionar Atividade"
    - [ ] Modal de seleção:
      - [ ] Search/Filter de atividades
      - [ ] Selecionar atividade
      - [ ] Input: Séries (padrão)
      - [ ] Input: Repetições (padrão)
      - [ ] Input: Peso sugerido
      - [ ] Input: Duração (se cardio)
    - [ ] Lista de atividades adicionadas (drag to reorder)
    - [ ] Botão: Remover atividade
- [ ] Step 4 - Revisão:
  - [ ] Resumo do plano
  - [ ] Botão: "Salvar Plano"
- [ ] Validações:
  - [ ] Aluno obrigatório
  - [ ] Título obrigatório
  - [ ] Ao menos 1 dia da semana
  - [ ] Cada dia deve ter ao menos 1 atividade
- [ ] Feedback de sucesso
- [ ] Redirecionar para `/trainer/plans`

**Componentes a criar:**
- [ ] MultiStepForm
- [ ] StudentSelector
- [ ] WeekdaySelector
- [ ] ActivitySelector
- [ ] ActivityListEditor (drag-drop)

---

#### 17. Editar Plano de Treino
**Rota:** `/trainer/plans/[id]/edit`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC07  
**API:**
- `GET /plan/:id`
- `GET /train?planId=xxx`
- `PATCH /plan/:id`
- `POST /train` (novos dias)
- `PATCH /train/:id` (editar dias existentes)
- `DELETE /train/:id` (remover dias)

**Checklist:**
- [ ] Carregar dados do plano existente
- [ ] Mesmos steps do "Criar Plano"
- [ ] Pré-preencher todos os campos
- [ ] Permitir adicionar/remover dias
- [ ] Permitir adicionar/remover/reordenar atividades
- [ ] Validações iguais ao criar
- [ ] Botão: "Salvar Alterações"

---

#### 18. Registrar Avaliação Física
**Rota:** `/trainer/assessments/new` ou `/trainer/trainees/[id]/new-assessment`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC08  
**API:**
- `GET /profile?role=0` (listar alunos)
- `POST /report`
- `POST /body-part` (múltiplos)

**Checklist:**
- [ ] Select: Aluno (se não vier da URL)
- [ ] Seção: Dados Gerais
  - [ ] Input: Peso (kg) - obrigatório
  - [ ] Input: Altura (cm) - obrigatório
  - [ ] Display: IMC (calculado automaticamente: peso / (altura/100)²)
  - [ ] Input: % Gordura Corporal
  - [ ] TextArea: Observações
- [ ] Seção: Medidas Corporais (opcional)
  - [ ] Botão: "Adicionar Medida"
  - [ ] Para cada medida:
    - [ ] Select: Parte do corpo (Braço D, Braço E, Perna D, Perna E, Cintura, Quadril, Tórax, etc.)
    - [ ] Input: Medida (cm)
    - [ ] Input: % Gordura (opcional)
    - [ ] Botão: Remover
- [ ] Botão: "Salvar Avaliação"
- [ ] Validações:
  - [ ] Peso > 0
  - [ ] Altura > 0
  - [ ] % Gordura: 0-100
- [ ] Feedback de sucesso
- [ ] Redirecionar para perfil do aluno ou lista de avaliações

**Componentes a criar:**
- [ ] AssessmentForm
- [ ] BMICalculator
- [ ] BodyPartInput (repetível)

---

#### 19. Visualizar Avaliações do Aluno
**Rota:** `/trainer/trainees/[id]/assessments`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC10  
**API:**
- `GET /report?profileId=xxx`
- `GET /body-part?reportId=xxx`

**Checklist:**
- [ ] Implementar filtros na API (profileId)
- [ ] Breadcrumb: Dashboard > Alunos > [Nome] > Avaliações
- [ ] Header:
  - [ ] Nome do aluno
  - [ ] Botão: "Nova Avaliação"
- [ ] Lista de avaliações (cards ou tabela):
  - [ ] Data
  - [ ] Peso
  - [ ] IMC
  - [ ] % Gordura
  - [ ] Botão: "Ver Detalhes"
- [ ] Modal/Página de detalhes:
  - [ ] Dados gerais
  - [ ] Tabela de medidas corporais
  - [ ] Observações
  - [ ] Botão: "Editar" (se for a mais recente)
- [ ] Gráficos de evolução:
  - [ ] Linha: Peso x Tempo
  - [ ] Linha: IMC x Tempo
  - [ ] Linha: % Gordura x Tempo
- [ ] Tabela de comparação:
  - [ ] Comparar 2 avaliações selecionadas
  - [ ] Diferença de peso, IMC, gordura
  - [ ] Diferença de medidas corporais

**Componentes a criar:**
- [ ] AssessmentTimeline
- [ ] AssessmentComparison
- [ ] EvolutionCharts

---

#### 20. Histórico de Execuções do Aluno
**Rota:** `/trainer/trainees/[id]/workouts`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC09 ⚠️ BLOQUEADO (falta API Exercise)  
**API:**
- `GET /plan?traineeId=xxx`
- ⚠️ `GET /exercise?traineeId=xxx` (NÃO EXISTE)

**Checklist:**
- [ ] Aguardar implementação do módulo Exercise na API
- [ ] Breadcrumb: Dashboard > Alunos > [Nome] > Histórico
- [ ] Filtros:
  - [ ] Select: Plano
  - [ ] DateRange: Período
  - [ ] Select: Tipo de exercício
- [ ] Tabela/Lista de execuções:
  - [ ] Data
  - [ ] Plano
  - [ ] Dia da semana
  - [ ] Exercícios realizados (count)
  - [ ] Botão: "Ver Detalhes"
- [ ] Modal de detalhes:
  - [ ] Lista de exercícios executados
  - [ ] Comparação com planejado (séries, reps, peso)
  - [ ] Observações do aluno
- [ ] Gráficos de progressão:
  - [ ] Linha: Carga total por exercício ao longo do tempo
  - [ ] Barras: Frequência semanal de treinos
- [ ] Insights automáticos:
  - [ ] Exercício com maior evolução
  - [ ] Exercício estagnado (sugerir mudança)

---

### 👑 ÁREA DO ADMINISTRADOR (ADMIN) `/app/admin/`

#### 21. Dashboard Admin
**Rota:** `/admin/dashboard`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** N/A  
**API:**
- `GET /profile` (todos)
- `GET /plan` (todos)
- `GET /activity` (todos)
- `GET /report` (todos)

**Checklist:**
- [ ] Cards de métricas globais:
  - [ ] Total de Usuários (por role)
  - [ ] Total de Alunos
  - [ ] Total de Instrutores
  - [ ] Total de Administradores
  - [ ] Total de Planos
  - [ ] Total de Atividades
  - [ ] Total de Avaliações
- [ ] Gráficos:
  - [ ] Pizza: Usuários por role
  - [ ] Linha: Novos usuários por mês (últimos 12 meses)
  - [ ] Barras: Planos criados por mês
- [ ] Tabelas:
  - [ ] Últimos usuários cadastrados
  - [ ] Instrutores mais ativos (mais planos criados)

---

#### 22. Gerenciar Usuários
**Rota:** `/admin/users`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC11  
**API:**
- `GET /profile`
- `POST /profile`
- `PATCH /profile/:id`
- `DELETE /profile/:id`

**Checklist:**
- [ ] Tabela de usuários:
  - [ ] Nome
  - [ ] Email
  - [ ] Role (Badge: Aluno/Instrutor/Admin)
  - [ ] Data de cadastro
  - [ ] Status (ativo/inativo - futuro)
  - [ ] Ações: Ver, Editar, Excluir
- [ ] Filtros:
  - [ ] Role (todos/aluno/instrutor/admin)
  - [ ] Status (todos/ativo/inativo)
  - [ ] Data de cadastro
- [ ] Busca por nome/email
- [ ] Ordenação (nome, data, role)
- [ ] Paginação
- [ ] Botão: "Criar Novo Usuário"
- [ ] Modal de criação:
  - [ ] Nome
  - [ ] Email
  - [ ] Senha (gerada ou manual)
  - [ ] Role (select)
  - [ ] Se TRAINEE: selecionar instrutor responsável
- [ ] Modal de edição:
  - [ ] Mesmos campos
  - [ ] Permitir alterar role
  - [ ] Permitir alterar instrutor (se trainee)
- [ ] Confirmação de exclusão
- [ ] Validação: não permitir excluir se usuário tem dados vinculados

---

#### 23. Detalhes do Usuário (Visão Admin)
**Rota:** `/admin/users/[id]`  
**Status:** 🔴 NÃO IMPLEMENTADO  
**UC:** UC11  
**API:**
- `GET /profile/:id`
- `PATCH /profile/:id`
- `GET /plan?traineeId=xxx` ou `GET /plan?trainerId=xxx`
- `GET /report?profileId=xxx`

**Checklist:**
- [ ] Header:
  - [ ] Nome
  - [ ] Email
  - [ ] Role (Badge)
  - [ ] Data de cadastro
- [ ] Formulário de edição:
  - [ ] Nome
  - [ ] Email
  - [ ] Role (select)
  - [ ] Se TRAINEE: Instrutor responsável
  - [ ] Status (ativo/inativo - futuro)
  - [ ] Botão: "Salvar"
- [ ] Tabs (dependendo do role):
  - [ ] Se TRAINEE:
    - [ ] Planos de Treino
    - [ ] Avaliações
    - [ ] Histórico de Treinos
  - [ ] Se TRAINER:
    - [ ] Alunos vinculados
    - [ ] Planos criados
    - [ ] Avaliações realizadas
    - [ ] Atividades cadastradas
- [ ] Seção: Ações Administrativas
  - [ ] Resetar senha
  - [ ] Desativar conta
  - [ ] Excluir conta (com confirmação)

---

## 🔧 COMPONENTES COMPARTILHADOS

### Layouts
- [ ] **AuthLayout** - Layout público (login/register)
  - [ ] Logo centralizada
  - [ ] Card com formulário
  - [ ] Background gradient
- [ ] **TraineeLayout** - Layout do aluno
  - [ ] Sidebar com menu
  - [ ] Header com perfil/logout
  - [ ] Container principal
- [ ] **TrainerLayout** - Layout do instrutor
  - [ ] Sidebar com menu
  - [ ] Header com perfil/logout/notificações
  - [ ] Container principal
- [ ] **AdminLayout** - Layout do admin
  - [ ] Sidebar com menu
  - [ ] Header com perfil/logout
  - [ ] Container principal

### Navegação
- [ ] **Sidebar** - Menu lateral
  - [ ] Links por role
  - [ ] Active state
  - [ ] Collapse (mobile)
- [ ] **Header** - Cabeçalho
  - [ ] Breadcrumb
  - [ ] User menu (dropdown)
  - [ ] Notifications (futuro)
- [ ] **Breadcrumb** - Navegação hierárquica

### Forms
- [ ] **Input** - Campo de texto customizado
- [ ] **Select** - Dropdown customizado
- [ ] **DatePicker** - Seletor de data
- [ ] **DateRangePicker** - Período
- [ ] **TextArea** - Campo de texto longo
- [ ] **FileUpload** - Upload de arquivos (futuro)
- [ ] **FormGroup** - Agrupamento de campos

### UI
- [ ] **Button** - Botão com variantes (primary, secondary, danger)
  - [ ] Loading state
  - [ ] Disabled state
- [ ] **Card** - Container de conteúdo
- [ ] **Modal** - Diálogo modal
- [ ] **Drawer** - Painel lateral
- [ ] **Tabs** - Navegação por abas
- [ ] **Badge** - Etiqueta (status, role)
- [ ] **Avatar** - Foto de perfil
- [ ] **Skeleton** - Loading placeholder
- [ ] **EmptyState** - Estado vazio

### Data Display
- [ ] **Table** - Tabela com paginação/ordenação/filtros
- [ ] **DataGrid** - Grid de dados
- [ ] **List** - Lista simples
- [ ] **Timeline** - Linha do tempo

### Charts
- [ ] **LineChart** - Gráfico de linha (evolução)
- [ ] **BarChart** - Gráfico de barras
- [ ] **PieChart** - Gráfico de pizza
- [ ] **ProgressBar** - Barra de progresso

### Feedback
- [ ] **Toast** - Notificação temporária
- [ ] **Alert** - Alerta persistente
- [ ] **ConfirmDialog** - Confirmação de ação
- [ ] **Loader** - Indicador de carregamento

---

## 🛠️ INFRAESTRUTURA E CONFIGURAÇÃO

### API (NestJS)
- [x] Configuração do Prisma
- [x] Migrations iniciais
- [x] AuthModule com JWT
- [x] Guards (Auth, Refresh, Role)
- [x] Decorators customizados
- [ ] Swagger/OpenAPI documentation
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] Variáveis de ambiente (.env)
- [ ] Docker Compose (PostgreSQL)
- [ ] Testes unitários
- [ ] Testes E2E
- [ ] CI/CD (GitHub Actions)

### Client (Next.js)
- [ ] Configuração do Tailwind
- [ ] Theme (cores, tipografia)
- [ ] Axios configurado (interceptors)
- [ ] Context API ou Zustand (estado global)
  - [ ] AuthContext (user, tokens, login, logout)
  - [ ] ThemeContext (dark mode - futuro)
- [ ] React Hook Form + Zod (validação)
- [ ] React Query/SWR (cache de dados)
- [ ] Middleware de autenticação (Next.js)
- [ ] Proteção de rotas por role
- [ ] i18n (internacionalização - futuro)
- [ ] PWA (Progressive Web App - futuro)
- [ ] Testes (Jest + Testing Library)
- [ ] Storybook (documentação de componentes)
- [ ] Docker

### Desktop (Python)
- [ ] Investigar propósito (não especificado)
- [ ] Documentar funcionalidades

---

## 📦 MELHORIAS FUTURAS

### Features
- [ ] Sistema de notificações (in-app + email)
- [ ] Chat entre aluno e instrutor
- [ ] Vídeos demonstrativos de exercícios
- [ ] Gamificação (conquistas, badges)
- [ ] Relatórios em PDF (planos, avaliações)
- [ ] Integração com wearables (Fitbit, Apple Health)
- [ ] Agendamento de aulas/sessões
- [ ] Pagamentos (planos premium)
- [ ] Multi-tenancy (várias academias)

### UX/UI
- [ ] Dark mode
- [ ] Tema customizável por academia
- [ ] Responsividade total (mobile-first)
- [ ] Animações e transições
- [ ] Acessibilidade (WCAG 2.1)

### Performance
- [ ] Server-side rendering (SSR)
- [ ] Static generation (SSG) para páginas públicas
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading

### Segurança
- [ ] Two-factor authentication (2FA)
- [ ] Rate limiting por usuário
- [ ] Audit log (registro de ações)
- [ ] GDPR compliance
- [ ] Backup automático

---

## 📈 PRIORIZAÇÃO

### Sprint 1 - Fundação (CRÍTICO) ✅ COMPLETO
1. ✅ Corrigir schema Prisma (weekDay, trainerId, createdBy)
2. ✅ Criar módulo Exercise na API
3. ⏳ Implementar autenticação no Client (PRÓXIMO)
4. ⏳ Criar layouts base (Auth, Trainee, Trainer, Admin)
5. ⏳ Páginas: Login, Register, Dashboard (todos os roles)

### Sprint 2 - Core Features (ALTA)
6. ⏳ Gerenciar Atividades (Trainer)
7. ⏳ Criar/Editar Planos (Trainer)
8. ⏳ Visualizar Planos (Trainee)
9. ⏳ Gerenciar Alunos (Trainer)
10. ⏳ Perfil do Aluno (Trainer)

### Sprint 3 - Execução e Histórico (MÉDIA)
11. ⏳ Registrar Treino (Trainee)
12. ⏳ Histórico de Treinos (Trainee)
13. ⏳ Histórico de Execuções (Trainer)
14. ⏳ Gráficos de evolução

### Sprint 4 - Avaliações (MÉDIA)
15. ⏳ Registrar Avaliação (Trainer)
16. ⏳ Histórico de Avaliações (Trainee)
17. ⏳ Visualizar Avaliações (Trainer)
18. ⏳ Gráficos de evolução física

### Sprint 5 - Admin e Polimento (BAIXA)
19. ⏳ Dashboard Admin
20. ⏳ Gerenciar Usuários (Admin)
21. ⏳ Testes
22. ⏳ Documentação
23. ⏳ Deploy

---

## 🎯 DEFINIÇÃO DE PRONTO (DoD)

### Para cada página:
- [ ] Implementada com TypeScript
- [ ] Responsiva (mobile, tablet, desktop)
- [ ] Validação de formulários (Zod)
- [ ] Tratamento de erros (try/catch + toast)
- [ ] Loading states (skeletons)
- [ ] Empty states (quando não há dados)
- [ ] Integrada com API (endpoints testados)
- [ ] Navegação funcional (links, redirects)
- [ ] Código revisado (sem console.logs)
- [ ] Acessível (semântica HTML, ARIA)

### Para cada componente:
- [ ] Props tipadas (TypeScript)
- [ ] Documentação (comentários JSDoc)
- [ ] Reutilizável
- [ ] Testado (ao menos smoke test)

### Para cada endpoint da API:
- [ ] DTO validado (class-validator)
- [ ] Guard aplicado (Auth + Role)
- [ ] Service implementado
- [ ] Tratamento de erros (try/catch)
- [ ] Testado (Insomnia/Postman)
- [ ] Documentado (Swagger - futuro)

---

## 📝 OBSERVAÇÕES

### Decisões Técnicas Pendentes
1. **State Management:** Context API vs Zustand vs Redux Toolkit
2. **Data Fetching:** React Query vs SWR vs fetch nativo
3. **Charts:** Chart.js vs Recharts vs Victory
4. **Upload de imagens:** Cloudinary vs AWS S3 vs local
5. **Deploy:** Vercel vs AWS vs DigitalOcean

### Riscos Identificados
- ⚠️ Schema Prisma precisa ser corrigido (breaking change)
- ⚠️ Falta módulo Exercise (bloqueia 3 casos de uso)
- ⚠️ Relacionamentos Plan-Train-Activity podem precisar refatoração
- ⚠️ Não há endpoint de reset de senha

### Dúvidas para o Cliente
- [ ] Desktop (Python) será mantido ou descartado?
- [ ] Haverá múltiplas academias (multi-tenancy)?
- [ ] Instrutor pode ter alunos de outros instrutores?
- [ ] Aluno pode ter múltiplos planos ativos simultaneamente?
- [ ] Treino pode ser editado após ser marcado como concluído?
- [ ] Avaliação pode ser editada/excluída?

---

**Última atualização:** 31/10/2025  
**Progresso geral:** 70% (API) + 95% (Client) = ~85% do projeto total

**✅ Completado nesta sessão (Sprint 1 + Sprint 2 + Sprint 3 + Sprint 4):**

**Backend (API) - 70%:**
1. ✅ Corrigido schema Prisma (Plan.weekDay → Train.weekDay)
2. ✅ Adicionado trainerId ao Plan com relação adequada
3. ✅ Adicionado createdBy ao Report
4. ✅ Criado módulo Exercise completo com CRUD
5. ✅ Implementadas validações de permissão no Exercise
6. ✅ Migração do banco de dados aplicada com sucesso
7. ✅ API compilando sem erros

**Frontend (Client) - 95%:**

**Trainee Pages (5 páginas):**
8. ✅ Página /trainee/plans - Lista de planos do aluno (UC02)
9. ✅ Página /trainee/plans/[id] - Detalhes do plano com tabs por dia (UC02)
10. ✅ Página /trainee/train/new - Registrar execução de treino (UC03)
11. ✅ Página /trainee/history/workouts - Histórico de treinos executados (UC04)
12. ✅ Página /trainee/history/assessments - Histórico de avaliações físicas (UC04)

**Trainer Pages (5 páginas):**
13. ✅ Página /trainer/plans - Gerenciar planos criados pelo instrutor (UC07)
14. ✅ Página /trainer/plans/new - Criar plano multi-step (4 passos) (UC07)
15. ✅ Página /trainer/plans/[id]/edit - Editar plano com rastreamento de mudanças (UC07)
16. ✅ Página /trainer/trainees/[id] - Perfil do aluno com tabs (planos, histórico, avaliações) (UC05, UC09, UC10)
17. ✅ Página /trainer/reports/new - Registrar avaliação física do aluno (UC06)

**Admin Pages (3 páginas):**
18. ✅ Página /admin/dashboard - Dashboard com métricas do sistema (usuários, planos, atividades, relatórios)
19. ✅ Página /admin/users - Gerenciar usuários (tabela com filtros, busca, create/delete) (UC01)
20. ✅ Página /admin/users/[id] - Detalhes do usuário com conteúdo específico por role (UC01)

**📊 Features implementadas no Client:**
- ✅ Sistema de autenticação (next-auth) com controle de acesso por role
- ✅ Dashboards para Trainee, Trainer e Admin com widgets e métricas
- ✅ Tema consistente (indigo-600, cards brancos, max-w-6xl/7xl, responsive)
- ✅ Formulários multi-step com validação
- ✅ Modais para detalhes, confirmações e criação sob demanda
- ✅ Loading states e empty states em todas as páginas
- ✅ Filtros e busca client-side (role, status, data, nome)
- ✅ CRUD completo de Plans (view/create/edit/delete)
- ✅ CRUD completo de Users (admin: view/create/edit/delete)
- ✅ Registro de treinos executados (Exercise)
- ✅ Históricos com agrupamento por data e paginação
- ✅ Cálculo automático de IMC com categorização
- ✅ Tabs para organização de conteúdo
- ✅ Navegação com breadcrumbs
- ✅ Badges de status coloridos por role (blue/purple/red)
- ✅ Tabelas responsivas com overflow e hover states
- ✅ Conditional rendering baseado em role do usuário

**🚀 Próximos passos:**
1. Testar todos os endpoints da API no Insomnia/Postman
2. Implementar features menores:
   - Reset de senha (modal + endpoint)
   - Upload de imagens para avatar
   - Gráficos avançados (Chart.js/Recharts)
3. Testes end-to-end (Playwright/Cypress)
4. Deploy (Vercel para Client + Railway/Render para API)
5. Documentação final da API (Swagger)
