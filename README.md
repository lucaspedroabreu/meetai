# MeetAI - IA Avançada em Videoconferência

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/lucaspedroabreu/meetai?utm_source=oss&utm_medium=github&utm_campaign=lucaspedroabreu%2Fmeetai&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-0.1.0--alpha-blue.svg)](https://github.com/lucaspedroabreu/meetai)

**Plataforma de videoconferência de próxima geração com IA integrada.** Transcrições inteligentes, resumos automáticos e análises em tempo real powered by OpenAI.

## 🧪 Status do Projeto

- **Fase**: Alpha em desenvolvimento ativo
- **Estabilidade**: Versão inicial - mudanças frequentes
- **Suporte**: Limitado / Via GitHub Issues
- **Custos**: Serviço pago devido aos custos operacionais de IA
- **Licença**: MIT (código aberto)

> 🎯 **Para Desenvolvedores**: Este projeto está em fase alpha. Consulte a seção [Desenvolvimento](#-desenvolvimento) para limitações técnicas e expectativas.

## 🚀 Recursos Principais

### 🤖 Inteligência Artificial Integrada ⚡ Recursos em Alpha

- **Transcrição em tempo real** - Powered by OpenAI Whisper
- **Resumos automáticos** - Sínteses inteligentes de reuniões
- **Análise de sentimentos** - Insights sobre dinâmicas de comunicação
- **Assistentes virtuais** - IA conversacional durante reuniões
- **Busca inteligente** - Encontre qualquer tópico em histórico de reuniões

### 🎥 Videoconferência Avançada

- **WebRTC moderno** - Comunicação de vídeo de alta qualidade
- **Chat integrado** - Mensagens sincronizadas com transcrições
- **Gravação inteligente** - Captura com marcadores de IA
- **Interface responsiva** - Experiência otimizada para todos dispositivos
- **Compartilhamento de tela** - Com anotações inteligentes

### 📊 Analytics e Insights

- **Métricas de reunião** - Tempo de fala, participação, engajamento
- **Relatórios automáticos** - Dashboards com insights acionáveis
- **Histórico searchável** - Busca semântica em todas as reuniões
- **Exportação inteligente** - Formatos otimizados para diferentes usos

## 💻 Stack Tecnológico

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI/UX**: Tailwind CSS v4 + Shadcn/ui + Framer Motion
- **Backend**: Drizzle ORM + NeonDB (PostgreSQL)
- **IA**: OpenAI APIs (Whisper, GPT-4, Embeddings)
- **Auth**: Better Auth com suporte a OAuth
- **Real-time**: WebRTC + WebSocket para comunicação

## 🚀 Instalação Rápida

### Pré-requisitos

- Node.js 20+
- Conta OpenAI com API key
- Banco PostgreSQL (recomendado: NeonDB)

### Setup

```bash
# Clone o repositório
git clone https://github.com/lucaspedroabreu/meetai.git
cd meetai

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Execute migrações do banco
npm run db:migrate

# Inicie o servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL="postgresql://..."

# OpenAI (obrigatório)
OPENAI_API_KEY="sk-..."

# Autenticação
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"

# Opcional: Provedores OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## 🔧 Desenvolvimento

### Comandos Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run db:studio    # Interface visual do banco
npm run db:generate  # Gerar migrações
npm run lint         # Verificação de código
```

### Estrutura do Projeto

```
src/
├── app/                # Next.js App Router
│   ├── (auth)/        # Páginas de autenticação
│   ├── (dashboard)/   # Dashboard principal
│   ├── meeting/       # Salas de reunião
│   └── api/           # API routes
├── components/         # Componentes React
│   ├── ui/            # Componentes base (Shadcn)
│   ├── meeting/       # Componentes de reunião
│   └── ai/            # Componentes de IA
├── lib/               # Utilitários e configurações
└── hooks/             # Hooks customizados
```

### 🧪 Status de Desenvolvimento (Alpha)

**⚠️ Importante para Desenvolvedores:**

- **Estabilidade**: Alpha - mudanças frequentes esperadas
- **APIs**: Podem ser alteradas sem aviso prévio
- **Testes**: Cobertura limitada, contribuições bem-vindas
- **Documentação**: Em desenvolvimento ativo
- **Suporte**: Via GitHub Issues apenas

### Limitações Conhecidas

- Sem SLA de uptime ou performance
- Recursos experimentais podem ser removidos
- Integração com APIs externas (OpenAI) pode ter instabilidades
- Escalabilidade não testada para alto volume

## 💰 Modelo de Negócio

### Transparência de Custos

- **70%** - APIs OpenAI (Whisper, GPT-4, Embeddings)
- **20%** - Infraestrutura cloud (hosting, CDN, banco)
- **10%** - Desenvolvimento e manutenção

### Política de Cobrança

- ✅ Baseada em uso real de recursos
- ✅ Sem taxas fixas mensais
- ✅ Créditos gratuitos para novos usuários
- ✅ Transparência total de custos
- ✅ Política de reembolso flexível

## 📄 Licenciamento

### Open Source (MIT)

```
MIT License - Uso comercial, modificação e distribuição permitidos
```

### Dependências Importantes

- **OpenAI APIs** - Sujeitas aos termos da OpenAI
- **NeonDB** - Banco de dados serverless
- **Vercel** - Hosting e deployment

## 🤝 Contribuições

Contribuições são muito bem-vindas!

**Para contribuir:**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**Áreas que precisam de ajuda:**

- Testes automatizados
- Documentação
- Otimizações de performance
- Novos recursos de IA
- Melhorias de UX/UI

## 📞 Suporte

- **GitHub Issues**: [Reportar bugs ou solicitar features](https://github.com/lucaspedroabreu/meetai/issues)
- **Discussions**: [Ideias e feedback geral](https://github.com/lucaspedroabreu/meetai/discussions)
- **Email**: Apenas para questões críticas de segurança

## 🙏 Agradecimentos

- [OpenAI](https://openai.com) - APIs de IA de última geração
- [Vercel](https://vercel.com) - Plataforma de deployment
- [NeonDB](https://neon.tech) - Banco PostgreSQL serverless
- [Shadcn/ui](https://ui.shadcn.com) - Componentes React elegantes
- Comunidade open source

---

**🛠️ Desenvolvido com ❤️ por [Lucas Pedro Abreu](https://github.com/lucaspedroabreu)**

📄 **Nota Legal**: Consulte os [Termos de Serviço](./src/app/terms/page.tsx) e [Política de Privacidade](./src/app/privacy/page.tsx) para informações completas sobre limitações e responsabilidades.
