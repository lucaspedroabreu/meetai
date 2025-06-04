/**
 * Authentication Constants
 *
 * Constantes relacionadas à autenticação e autorização
 */

// Traduções de erro de autenticação (extraídas de utils.ts)
export const AUTH_ERROR_TRANSLATIONS: Record<string, string> = {
  // OAuth e CORS errors
  "Invalid origin":
    "Domínio não autorizado. Verifique se está acessando pelo endereço correto",
  "Origin not allowed":
    "Domínio não permitido. Acesse pelo endereço oficial da aplicação",
  "CORS error": "Erro de origem cruzada. Verifique o domínio de acesso",
  "Redirect URI mismatch":
    "URL de redirecionamento não configurada. Entre em contato com o suporte",
  "OAuth error": "Erro na autenticação externa. Tente novamente",
  "Provider error": "Erro no provedor de autenticação. Tente outro método",

  // Better Auth específicos
  "Invalid baseURL": "URL base inválida. Verifique a configuração",
  "Configuration error": "Erro de configuração do sistema",
  "Session initialization failed": "Falha ao inicializar sessão",

  // Rate limiting e segurança
  "Rate limit exceeded":
    "Limite de tentativas excedido. Aguarde antes de tentar novamente",
  "Too many requests": "Muitas requisições. Tente novamente em alguns minutos",
  "Account suspended": "Conta suspensa. Entre em contato com o suporte",

  // Auth errors específicos
  "Invalid email or password": "Email ou senha inválidos",
  "Invalid credentials": "Credenciais inválidas",
  "User already exists": "Usuário já existe",
  "Email already exists": "Este email já está cadastrado",
  "User not found": "Usuário não encontrado",
  "Wrong password": "Senha incorreta",
  "Email not verified": "Email não verificado",
  "Account locked": "Conta bloqueada",
  "Session expired": "Sessão expirada",
  "Invalid token": "Token inválido",
  "Token expired": "Token expirado",
  "Weak password": "Senha muito fraca. Use uma senha mais forte",
  "Password too short": "Senha muito curta. Use pelo menos 6 caracteres",
  "Invalid email format": "Formato de email inválido",

  // Verification errors
  "Verification code expired": "Código de verificação expirado",
  "Invalid verification code": "Código de verificação inválido",
  "Verification failed": "Falha na verificação",
};

// Mensagens de feedback para o usuário
export const AUTH_MESSAGES = {
  SIGN_IN_SUCCESS: "Login realizado com sucesso!",
  SIGN_UP_SUCCESS: "Conta criada com sucesso!",
  SIGN_OUT_SUCCESS: "Logout realizado com sucesso!",
  PASSWORD_RESET_SENT: "Link de redefinição enviado para seu email!",
  EMAIL_VERIFIED: "Email verificado com sucesso!",
  ACCOUNT_CREATED: "Sua conta foi criada com sucesso!",
  WELCOME_BACK: "Bem-vindo de volta!",
  PREPARING_ACCOUNT: "Preparando sua conta...",
  AUTHENTICATION_ERROR: "Erro na autenticação",
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet",
  UNEXPECTED_ERROR: "Erro inesperado. Tente novamente",
} as const;

// Configurações de validação
export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_SIGNUP_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
} as const;

// Textos para formulários de auth
export const AUTH_FORM_TEXTS = {
  SIGN_IN: {
    title: "Bem-vindo de volta",
    description: "Faça login na sua conta para continuar",
    submitButton: "Entrar",
    loadingButton: "Autenticando...",
    noAccountText: "Não tem uma conta?",
    createAccountLink: "Criar conta gratuita",
    forgotPasswordLink: "Esqueceu a senha?",
  },
  SIGN_UP: {
    title: "Criar sua conta",
    description: "Preencha os dados para começar sua jornada",
    submitButton: "Criar conta",
    loadingButton: "Criando conta...",
    hasAccountText: "Já tem uma conta?",
    signInLink: "Fazer login",
  },
  SUCCESS: {
    title: "Conta criada com sucesso!",
    description:
      "Sua conta foi criada e você já está logado. Agora vamos preparar tudo para você.",
    preparing: "Preparando sua conta...",
    continueButton: "Continuar",
  },
  SOCIAL_LOGIN: {
    dividerText: "Ou continue com",
    googleButton: "Google",
    githubButton: "GitHub",
  },
  FOOTER: {
    termsText: "Ao continuar, você concorda com nossos",
    termsLink: "Termos de Serviço",
    andText: "e",
    privacyLink: "Política de Privacidade",
  },
} as const;

// Labels de campos
export const AUTH_FIELD_LABELS = {
  name: "Nome completo",
  email: "Email",
  password: "Senha",
  confirmPassword: "Confirmar senha",
} as const;

// Placeholders de campos
export const AUTH_FIELD_PLACEHOLDERS = {
  name: "Seu nome",
  email: "seu@email.com",
  password: "••••••••",
  passwordSignUp: "Mínimo 8 caracteres",
  confirmPassword: "Digite a senha novamente",
} as const;
