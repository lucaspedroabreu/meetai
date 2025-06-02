# Configuração de Variáveis de Ambiente

Para o deploy da aplicação MeetAI, você precisa configurar as seguintes variáveis de ambiente:

## Configuração do Banco de Dados

```
DATABASE_URL="postgresql://username:password@localhost:5432/meetai"
```

## Configuração de Autenticação

```
BETTER_AUTH_URL="https://yourdomain.com"
```

## Google OAuth

```
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"
```

## GitHub OAuth

```
GITHUB_CLIENT_ID="your_github_client_id_here"
GITHUB_CLIENT_SECRET="your_github_client_secret_here"
```

## Ambiente

```
NODE_ENV="production"
```

## Como configurar

1. Crie um arquivo `.env.local` na raiz do projeto
2. Copie as variáveis acima e substitua pelos valores reais
3. Para desenvolvimento, use `NODE_ENV="development"` e `BETTER_AUTH_URL="http://localhost:3000"`

## Deploy

Para deploy em produção:

1. Configure todas as variáveis no seu provedor de hospedagem (Vercel, Railway, etc.)
2. Execute as migrações do banco: `npm run db:migrate`
3. Faça o build da aplicação: `npm run build`
4. Inicie a aplicação: `npm start`
