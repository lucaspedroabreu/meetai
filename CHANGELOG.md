# Changelog

Todas as mudanças importantes neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### 🎯 Em Desenvolvimento

- Interface de chat em tempo real
- Dashboard de analytics avançado
- Gravação automática de reuniões

---

## [0.1.0-alpha] - 2024-12-15

### ⭐ Adicionado

- **Autenticação**: Sistema de login/registro com Better Auth
- **Service Worker**: Cache inteligente com estratégias de segurança
- **Interface**: Layout responsivo com Tailwind CSS v4
- **Documentação**: Guia completo de versionamento
- **Scripts**: Automação para gestão de versões
- **Segurança**: Prevenção de cache de dados sensíveis (JWTs, cookies)

### 🔧 Corrigido

- Cache de endpoints de autenticação removido por segurança
- Sincronização de versões entre arquivos do projeto

### 🛠️ Infraestrutura

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Database**: Drizzle ORM + NeonDB (PostgreSQL)
- **Auth**: Better Auth com suporte OAuth
- **Styling**: Tailwind CSS v4 + Shadcn/ui

### 📝 Documentação

- README.md atualizado com instruções detalhadas
- Guia de versionamento com Semantic Versioning
- Scripts automatizados para gestão de versões

---

## [0.0.1] - 2024-12-01

### ⭐ Adicionado

- Configuração inicial do projeto
- Estrutura básica Next.js 15
- Configuração do banco de dados
- Autenticação básica

---

## Como Usar Este Changelog

### 📋 Tipos de Mudanças

- **⭐ Adicionado** - Novas funcionalidades
- **🔄 Alterado** - Mudanças em funcionalidades existentes
- **⚠️ Descontinuado** - Funcionalidades que serão removidas
- **❌ Removido** - Funcionalidades removidas
- **🔧 Corrigido** - Correções de bugs
- **🔒 Segurança** - Correções de vulnerabilidades

### 🎯 Semantic Versioning

- **MAJOR** (1.0.0): Mudanças que quebram compatibilidade
- **MINOR** (0.1.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.1): Correções de bugs
- **PRERELEASE** (0.1.0-alpha): Versões experimentais

### 🔗 Links

- [0.1.0-alpha]: https://github.com/lucaspedroabreu/meetai/releases/tag/v0.1.0-alpha
- [0.0.1]: https://github.com/lucaspedroabreu/meetai/releases/tag/v0.0.1
- [Unreleased]: https://github.com/lucaspedroabreu/meetai/compare/v0.1.0-alpha...HEAD
