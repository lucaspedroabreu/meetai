# Sistema de Tratamento de Erros de Autenticação

## Visão Geral

O sistema de autenticação implementa um tratamento abrangente de erros para oferecer uma experiência de usuário otimizada. Os erros são automaticamente traduzidos e categorizados com ações específicas.

## Tipos de Erro e Tratamento

### 🔒 Erros de Domínio/CORS

**Exemplo:** `"Invalid origin"`

**Tradução:** `"Domínio não autorizado. Verifique se está acessando pelo endereço correto"`

**Características:**

- Ícone: Shield (🛡️)
- Cor: Destrutiva (vermelho)
- Ação: "Verificar URL" (redireciona para domínio oficial)
- Dica: Mostra o endereço oficial correto

**Causas Comuns:**

- Acesso por URL incorreta
- Problemas de configuração de CORS
- Tentativa de acesso via localhost em produção

### 🌐 Erros de Rede/Conectividade

**Exemplo:** `"Network timeout"`

**Tradução:** `"Tempo limite de rede. Verifique sua conexão"`

**Características:**

- Ícone: Wifi (📶)
- Cor: Destrutiva (vermelho)
- Ação: "Tentar novamente" (retry automático)
- Dica: Orientações sobre conexão

**Causas Comuns:**

- Problemas de internet do usuário
- Indisponibilidade temporária do servidor
- Timeouts de rede

### ⚙️ Erros de Configuração

**Exemplo:** `"Provider configuration error"`

**Tradução:** `"Erro de configuração do provedor"`

**Características:**

- Ícone: Settings (⚙️)
- Cor: Destrutiva (vermelho)
- Ação: "Contatar suporte"
- Sem retry automático (requer intervenção técnica)

**Causas Comuns:**

- Configuração incorreta de OAuth
- Problemas com variáveis de ambiente
- Chaves de API inválidas

### 🔐 Erros de Autenticação

**Exemplo:** `"Invalid credentials"`

**Tradução:** `"Credenciais inválidas"`

**Características:**

- Ícone: AlertTriangle (⚠️)
- Cor: Destrutiva (vermelho)
- Ação: "Tentar novamente" (foca no campo email)
- Retry disponível

**Causas Comuns:**

- Email/senha incorretos
- Conta não encontrada
- Problemas de validação

## Mapeamento de Erros

### OAuth e CORS

```typescript
"Invalid origin" → "Domínio não autorizado. Verifique se está acessando pelo endereço correto"
"Origin not allowed" → "Domínio não permitido. Acesse pelo endereço oficial da aplicação"
"CORS error" → "Erro de origem cruzada. Verifique o domínio de acesso"
"Redirect URI mismatch" → "URL de redirecionamento não configurada. Entre em contato com o suporte"
```

### Better Auth Específicos

```typescript
"Invalid baseURL" → "URL base inválida. Verifique a configuração"
"Configuration error" → "Erro de configuração do sistema"
"Database connection failed" → "Falha na conexão com banco de dados"
```

### Rate Limiting

```typescript
"Rate limit exceeded" → "Limite de tentativas excedido. Aguarde antes de tentar novamente"
"Too many requests" → "Muitas requisições. Tente novamente em alguns minutos"
```

## Componente ErrorMessage

### Props

```typescript
interface ErrorMessageProps {
  error: string; // Mensagem de erro já traduzida
  onRetry?: () => void; // Função de retry opcional
  className?: string; // Classes CSS adicionais
}
```

### Uso

```tsx
<ErrorMessage
  error={translatedError}
  onRetry={() => {
    setError(null);
    form.setFocus("email");
  }}
  className="mt-2"
/>
```

## Função translateError

A função `translateError` em `src/lib/utils.ts` implementa:

1. **Busca exata** - O(1) com hash lookup
2. **Busca por similaridade** - O(n × (k + m)) otimizada
3. **Score mínimo** - 50% de similaridade para aceitar tradução
4. **Fallback** - Retorna mensagem original se não encontrar tradução

### Algoritmo de Similaridade

- Busca exata = score 1.0
- Substring completa = score 0.95
- Início da string = score 0.85
- Jaccard similarity para palavras = score variável

## Configuração de Produção

### Variáveis de Ambiente Importantes

```env
BETTER_AUTH_URL=https://www.meetai.com.br
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
GITHUB_CLIENT_ID=seu_github_client_id
GITHUB_CLIENT_SECRET=seu_github_client_secret
```

### URLs Autorizadas (OAuth)

- Google Console: `https://www.meetai.com.br/api/auth/callback/google`
- GitHub Settings: `https://www.meetai.com.br/api/auth/callback/github`

## Debugging

### Logs de Debug (Development)

```javascript
// Em src/lib/auth.ts
console.log("🔧 Better Auth baseURL:", baseURL);
console.log("🌍 BETTER_AUTH_URL env:", process.env.BETTER_AUTH_URL);
```

### Erros Comuns e Soluções

#### "Invalid origin" em desenvolvimento

**Solução:** Configure `BETTER_AUTH_URL=http://localhost:3000` em `.env.local`

#### "Provider configuration error"

**Solução:** Verifique se todas as variáveis OAuth estão configuradas

#### "Redirect URI mismatch"

**Solução:** Atualize as URLs autorizadas nos consoles do Google/GitHub

## Melhorias Futuras

1. **Telemetria de Erros** - Tracking de erros mais frequentes
2. **Retry Inteligente** - Backoff exponencial para erros de rede
3. **Cache de Traduções** - Otimização de performance
4. **Notificações Toast** - Feedback visual mais sutil
5. **Health Check** - Verificação automática de conectividade
