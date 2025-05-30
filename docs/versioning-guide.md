# Guia de Versionamento - MeetAI

## 📋 Visão Geral

Este documento define as práticas de versionamento para garantir consistência entre todos os componentes do projeto MeetAI, seguindo os princípios do **Semantic Versioning (SemVer)**.

## 🔢 Semantic Versioning Explicado

### Formato: `MAJOR.MINOR.PATCH[-PRERELEASE]`

```
   0.1.0-alpha
   │ │ │ └─────── Pré-lançamento (alpha, beta, rc)
   │ │ └─────────── PATCH: Correções de bugs
   │ └───────────── MINOR: Novas funcionalidades (compatível)
   └─────────────── MAJOR: Mudanças que quebram compatibilidade
```

### 🎯 Quando Incrementar Cada Versão

#### 1. **MAJOR Version** (1.0.0, 2.0.0, 3.0.0...)

**Incrementar quando houver mudanças que quebram compatibilidade:**

✅ **Exemplos para MeetAI:**

- Remover APIs públicas existentes
- Alterar estrutura de dados de autenticação
- Mudar formato de respostas da API
- Migrar para nova arquitetura (ex: App Router → Pages Router)
- Remover suporte a versões antigas do Node.js
- Mudanças no banco de dados que exigem migração manual

❌ **NÃO incrementar para:**

- Melhorias de performance
- Correções de bugs
- Novas funcionalidades opcionais

#### 2. **MINOR Version** (0.1.0, 0.2.0, 0.3.0...)

**Incrementar quando adicionar funcionalidades compatíveis:**

✅ **Exemplos para MeetAI:**

- Nova funcionalidade de transcrição
- Adicionar novo provedor de autenticação (Google, GitHub)
- Implementar chat em tempo real
- Adicionar dashboard de analytics
- Novos endpoints de API (sem alterar existentes)
- Novas páginas ou componentes de UI

❌ **NÃO incrementar para:**

- Apenas correções de bugs
- Melhorias internas sem impacto na funcionalidade

#### 3. **PATCH Version** (0.1.1, 0.1.2, 0.1.3...)

**Incrementar apenas para correções de bugs:**

✅ **Exemplos para MeetAI:**

- Corrigir erro de login
- Resolver problema de cache do Service Worker
- Ajustar estilos CSS quebrados
- Corrigir typos na documentação
- Resolver vazamento de memória
- Patch de segurança

❌ **NÃO incrementar para:**

- Qualquer nova funcionalidade
- Refatoração de código (sem mudança de comportamento)

### 🏷️ **PRERELEASE Tags** (-alpha, -beta, -rc)

#### Alpha (`0.1.0-alpha`, `0.1.0-alpha.1`)

- **Desenvolvimento ativo**: Funcionalidades em desenvolvimento
- **Instabilidade esperada**: Bugs e mudanças frequentes
- **Público limitado**: Desenvolvedores e early adopters
- **Sem garantias**: Pode quebrar ou mudar completamente

#### Beta (`0.1.0-beta`, `0.1.0-beta.1`)

- **Funcionalidades completas**: Todas as features planejadas implementadas
- **Testes em andamento**: Foco em encontrar e corrigir bugs
- **Público ampliado**: Usuários dispostos a testar
- **API estável**: Poucas mudanças estruturais

#### Release Candidate (`0.1.0-rc.1`, `0.1.0-rc.2`)

- **Pronto para produção**: Candidato ao release final
- **Apenas correções críticas**: Sem novas funcionalidades
- **Testes finais**: Validação final antes do launch
- **Documentação completa**: Pronto para usuários finais

## 🎯 Arquivos que Devem Estar Sincronizados

### 1. **package.json** (Fonte da Verdade)

- Campo `version` é a referência principal
- Atual: `0.1.0-alpha`

### 2. **README.md**

- Badge de versão deve corresponder ao package.json
- Formato: `[![Version](https://img.shields.io/badge/Version-{VERSION}-blue.svg)](...)`

### 3. **Service Worker (public/sw.js)**

- Comentário de versão no cabeçalho
- Nomes dos caches incluem a versão
- Constantes: `CACHE_NAME`, `STATIC_CACHE`, `DYNAMIC_CACHE`

## 🔄 Processo de Atualização de Versão

### 🤖 Automatizado (Recomendado)

```bash
# PATCH: Correções de bugs
npm run version:patch

# MINOR: Novas funcionalidades
npm run version:minor

# MAJOR: Mudanças que quebram compatibilidade
npm run version:major

# PRERELEASE: Versões de desenvolvimento
npm run version:prerelease
```

### ✋ Manual (Para casos especiais)

#### 1. Atualizar a Versão Principal

```bash
# Usando npm (atualiza package.json e cria tag git)
npm version patch|minor|major|prerelease
# ou editar manualmente o campo "version"
```

#### 2. Sincronizar Outros Arquivos

#### README.md

```markdown
[![Version](https://img.shields.io/badge/Version-NOVA_VERSAO-blue.svg)](...)
```

#### Service Worker (public/sw.js)

```javascript
// Versão NOVA_VERSAO - Descrição
const CACHE_NAME = "meetai-vNOVA_VERSAO";
const STATIC_CACHE = "meetai-static-vNOVA_VERSAO";
const DYNAMIC_CACHE = "meetai-dynamic-vNOVA_VERSAO";
```

#### 3. Verificar Consistência

```bash
npm run version:check
```

## 🛠️ Scripts de Automação

O projeto inclui scripts automáticos para gerenciar versões:

### Verificação

```bash
# Verificar consistência atual
npm run version:check
```

### Incremento Automático

```bash
# Patch: 0.1.0 → 0.1.1 (bugs)
npm run version:patch

# Minor: 0.1.0 → 0.2.0 (features)
npm run version:minor

# Major: 0.1.0 → 1.0.0 (breaking changes)
npm run version:major

# Prerelease: 0.1.0 → 0.1.1-alpha.0
npm run version:prerelease
```

### Saída Esperada

```
🔍 Verificando consistência de versões...

📄 Package.json version:
   0.1.0-alpha

📄 README.md badge version:
   0.1.0-alpha

📄 Service Worker versions:
   comment: 0.1.0-alpha
   cache: 0.1.0-alpha

🎯 Análise de Consistência:

✅ Todas as versões estão consistentes!
```

## 🔒 Versionamento do Service Worker

### Por que é Importante?

- **Cache Invalidation**: Nomes diferentes forçam atualização do cache
- **Debugging**: Facilita identificação de versões em produção
- **Rollback**: Permite reverter para versões anteriores específicas

### Estratégia de Cache

```javascript
// Versão ATUAL + sufixo específico
const STATIC_CACHE = "meetai-static-v0.1.0-alpha";
const DYNAMIC_CACHE = "meetai-dynamic-v0.1.0-alpha";
```

## 🎯 Fluxo de Decisão de Versionamento

```
📋 Pergunta: O que você implementou?

┌─ 🔧 Corrigiu um bug?
│  └─ ✅ PATCH (0.1.0 → 0.1.1)
│
┌─ ⭐ Adicionou nova funcionalidade?
│  ├─ ✅ Compatível com API existente?
│  │  └─ ✅ MINOR (0.1.0 → 0.2.0)
│  └─ ❌ Quebra compatibilidade?
│     └─ ✅ MAJOR (0.1.0 → 1.0.0)
│
┌─ 🧪 Versão experimental/desenvolvimento?
│  └─ ✅ PRERELEASE (0.1.0 → 0.1.1-alpha.0)
│
└─ 🤔 Ainda em dúvida?
   └─ Use PATCH (menor risco)
```

## 📊 Exemplos Práticos para MeetAI

### 🔧 PATCH Examples (0.1.0 → 0.1.1)

```bash
npm run version:patch
```

**Cenários:**

- ✅ Corrigir bug de autenticação que impedia login
- ✅ Resolver problema de CSS em dispositivos móveis
- ✅ Patch de segurança no Service Worker
- ✅ Corrigir erro de transcrição que causava crash
- ✅ Ajustar typos na documentação

### ⭐ MINOR Examples (0.1.0 → 0.2.0)

```bash
npm run version:minor
```

**Cenários:**

- ✅ Adicionar suporte ao GitHub OAuth (novo provedor)
- ✅ Implementar chat em tempo real
- ✅ Adicionar dashboard de analytics
- ✅ Nova página de configurações de usuário
- ✅ Implementar gravação de reuniões
- ✅ Adicionar tema escuro

### 🚨 MAJOR Examples (0.1.0 → 1.0.0)

```bash
npm run version:major
```

**Cenários:**

- ⚠️ Migrar de Pages Router para App Router
- ⚠️ Alterar estrutura da API de autenticação
- ⚠️ Remover suporte ao Node.js 18 (requer Node 20+)
- ⚠️ Mudança no formato de resposta das APIs
- ⚠️ Refatoração completa do banco de dados

### 🧪 PRERELEASE Examples (0.1.0 → 0.1.1-alpha.0)

```bash
npm run version:prerelease
```

**Cenários:**

- 🧪 Versão experimental com nova funcionalidade
- 🧪 Teste de nova integração com OpenAI
- 🧪 Branch de desenvolvimento para nova feature
- 🧪 Versão beta para teste com usuários

## 📋 Checklist de Release

### ✅ Antes do Release

- [ ] Todos os testes passando
- [ ] Documentação atualizada
- [ ] Changelog preparado
- [ ] Code review concluído
- [ ] Nenhum TODO crítico pendente

### ✅ Durante o Release

- [ ] Executar `npm run version:[tipo]`
- [ ] Verificar `npm run version:check`
- [ ] Revisar mudanças: `git show`
- [ ] Testar build: `npm run build`

### ✅ Após o Release

- [ ] Push commits: `git push`
- [ ] Push tags: `git push --tags`
- [ ] Atualizar changelog público
- [ ] Comunicar aos usuários (se necessário)

## 📝 Changelog e Comunicação

### Formato de Changelog

```markdown
# Changelog

## [0.2.0] - 2024-01-15

### ⭐ Adicionado

- Chat em tempo real durante reuniões
- Suporte ao GitHub OAuth
- Dashboard de analytics básico

### 🔧 Corrigido

- Bug de autenticação em dispositivos móveis
- Problema de cache do Service Worker

### ⚠️ Descontinuado

- Suporte ao Internet Explorer
```

### Comunicação de Breaking Changes

```markdown
## 🚨 BREAKING CHANGES em v2.0.0

### Migração Necessária

1. Atualizar Node.js para versão 20+
2. Executar nova migração do banco: `npm run db:migrate`
3. Atualizar variáveis de ambiente (veja .env.example)

### APIs Removidas

- `POST /api/auth/legacy` → use `POST /api/auth/login`
- `GET /api/meetings/old` → use `GET /api/meetings`
```

## 🏷️ Convenção de Tags Git

### Formato

```
v{MAJOR}.{MINOR}.{PATCH}[-{PRERELEASE}]
```

### Exemplos

- `v0.1.0-alpha` ← Atual
- `v0.1.0-beta`
- `v0.1.0` (stable)
- `v0.2.0`
- `v1.0.0` (first stable)

### Comandos Git

```bash
# Listar todas as tags
git tag

# Ver detalhes de uma tag
git show v0.1.0-alpha

# Checkout para uma versão específica
git checkout v0.1.0-alpha
```

## 🔧 Scripts Disponíveis

| Comando                      | Descrição              | Exemplo                            |
| ---------------------------- | ---------------------- | ---------------------------------- |
| `npm run version:check`      | Verificar consistência | `0.1.0-alpha em todos os arquivos` |
| `npm run version:patch`      | Correção de bugs       | `0.1.0 → 0.1.1`                    |
| `npm run version:minor`      | Nova funcionalidade    | `0.1.0 → 0.2.0`                    |
| `npm run version:major`      | Breaking changes       | `0.1.0 → 1.0.0`                    |
| `npm run version:prerelease` | Versão experimental    | `0.1.0 → 0.1.1-alpha.0`            |

## 🚀 Roadmap de Versões

### 🎯 v0.1.x (Atual - Alpha)

- [ ] Autenticação básica
- [ ] Interface de usuário fundamental
- [ ] Service Worker com cache seguro
- [ ] Documentação inicial

### 🎯 v0.2.x (Beta Planejada)

- [ ] Chat em tempo real
- [ ] Gravação de reuniões
- [ ] Dashboard de analytics
- [ ] Testes automatizados

### 🎯 v1.0.x (First Stable)

- [ ] Todos os recursos principais estáveis
- [ ] Documentação completa
- [ ] Testes abrangentes
- [ ] Performance otimizada

## 🛡️ Boas Práticas

### ✅ DO (Faça)

- Sempre use os scripts automatizados
- Siga rigorosamente o Semantic Versioning
- Mantenha changelog atualizado
- Teste antes de fazer release
- Comunique breaking changes claramente

### ❌ DON'T (Não Faça)

- Editar versões manualmente sem scripts
- Misturar tipos de mudanças em um release
- Fazer breaking changes em PATCH/MINOR
- Esquecer de atualizar documentação
- Push direto sem verificar consistência

## 📞 Dúvidas e Suporte

- **GitHub Issues**: [Reportar problemas de versionamento](https://github.com/lucaspedroabreu/meetai/issues)
- **Documentação**: Consulte este guia
- **Scripts**: Execute `npm run version:check` para diagnóstico

---

**🔄 Última atualização**: 2024-12 | **📝 Versão do guia**: 1.0
