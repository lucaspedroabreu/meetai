import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mapeamento de erros do servidor (inglês → português)
// Ordenados por especificidade (mais específicos primeiro)
const ERROR_TRANSLATIONS: Record<string, string> = {
  // OAuth e CORS errors - específicos de autenticação externa
  "Invalid origin":
    "Domínio não autorizado. Verifique se está acessando pelo endereço correto",
  "Origin not allowed":
    "Domínio não permitido. Acesse pelo endereço oficial da aplicação",
  "CORS error": "Erro de origem cruzada. Verifique o domínio de acesso",
  "Redirect URI mismatch":
    "URL de redirecionamento não configurada. Entre em contato com o suporte",
  "OAuth error": "Erro na autenticação externa. Tente novamente",
  "Provider error": "Erro no provedor de autenticação. Tente outro método",
  "Invalid redirect": "Redirecionamento inválido",
  "Callback error": "Erro no retorno da autenticação",
  "State mismatch":
    "Estado de autenticação inválido. Tente fazer login novamente",
  "Invalid state": "Estado de autenticação inválido",
  "Authorization failed": "Falha na autorização",
  "Provider configuration error": "Erro de configuração do provedor",
  "Invalid provider": "Provedor de autenticação inválido",
  "Provider not available": "Provedor de autenticação indisponível",

  // Better Auth específicos
  "Invalid baseURL": "URL base inválida. Verifique a configuração",
  "Configuration error": "Erro de configuração do sistema",
  "Database connection failed": "Falha na conexão com banco de dados",
  "Session initialization failed": "Falha ao inicializar sessão",
  "Plugin error": "Erro no plugin de autenticação",

  // Rate limiting e segurança
  "Rate limit exceeded":
    "Limite de tentativas excedido. Aguarde antes de tentar novamente",
  "Too many requests": "Muitas requisições. Tente novamente em alguns minutos",
  "Suspicious activity":
    "Atividade suspeita detectada. Conta temporariamente bloqueada",
  "IP blocked": "IP bloqueado por segurança",
  "Account suspended": "Conta suspensa. Entre em contato com o suporte",
  "Security check failed": "Falha na verificação de segurança",

  // Network e conectividade
  "Network timeout": "Tempo limite de rede. Verifique sua conexão",
  "Connection refused": "Conexão recusada",
  "DNS resolution failed": "Falha na resolução DNS",
  "SSL certificate error": "Erro no certificado SSL",
  "TLS handshake failed": "Falha na negociação TLS",

  // Auth errors - específicos primeiro
  "Invalid email or password": "Email ou senha inválidos",
  "Invalid credentials": "Credenciais inválidas",
  "User already exists": "Usuário já existe",
  "Email already exists": "Este email já está cadastrado",
  "User not found": "Usuário não encontrado",
  "Wrong password": "Senha incorreta",
  "Email not verified": "Email não verificado",
  "Account locked": "Conta bloqueada",
  "Too many attempts": "Muitas tentativas. Tente novamente mais tarde",
  "Session expired": "Sessão expirada",
  "Invalid token": "Token inválido",
  "Token expired": "Token expirado",
  "Account not found": "Conta não encontrada",
  "Password reset required": "Redefinição de senha necessária",
  "Email required": "Email é obrigatório",
  "Password required": "Senha é obrigatória",
  "Name required": "Nome é obrigatório",
  "Weak password": "Senha muito fraca. Use uma senha mais forte",
  "Password too short": "Senha muito curta. Use pelo menos 6 caracteres",
  "Invalid email format": "Formato de email inválido",

  // Verification errors
  "Verification code expired": "Código de verificação expirado",
  "Invalid verification code": "Código de verificação inválido",
  "Verification failed": "Falha na verificação",
  "Code already used": "Código já foi utilizado",
  "Max verification attempts": "Máximo de tentativas de verificação atingido",

  // Generic errors
  "Internal server error": "Erro interno do servidor",
  "Network error": "Erro de conexão",
  "Request timeout": "Tempo limite da requisição",
  "Service unavailable": "Serviço indisponível",
  "Bad request": "Requisição inválida",
  Unauthorized: "Não autorizado",
  Forbidden: "Acesso negado",
  "Not found": "Não encontrado",
  "Method not allowed": "Método não permitido",
  Conflict: "Conflito de dados",
  "Validation failed": "Falha na validação",
  "Missing required fields": "Campos obrigatórios não preenchidos",
  "Invalid format": "Formato inválido",
  "Data too long": "Dados muito longos",
  "Database error": "Erro no banco de dados",
  "Connection failed": "Falha na conexão",
};

/**
 * Calcula score de similaridade entre duas strings de forma otimizada
 * Complexidade: O(n + m) onde n e m são números de palavras
 * @param key - String key do mapeamento
 * @param message - Mensagem de erro do servidor
 * @returns Score de 0 a 1 (1 = idênticas)
 */
function calculateSimilarityScore(key: string, message: string): number {
  const keyLower = key.toLowerCase();
  const messageLower = message.toLowerCase();

  // 1. Busca exata = score máximo
  if (keyLower === messageLower) return 1.0;

  // 2. Busca por substring completa = score muito alto
  if (messageLower.includes(keyLower)) return 0.95;
  if (keyLower.includes(messageLower)) return 0.9;

  // 3. Busca por início da string = score alto
  if (messageLower.startsWith(keyLower) || keyLower.startsWith(messageLower)) {
    return 0.85;
  }

  // 4. Análise de palavras usando Set (O(n + m) ao invés de O(n × m))
  const keyWords = new Set(keyLower.split(/\s+/).filter((w) => w.length > 2)); // Remove palavras muito pequenas
  const messageWords = new Set(
    messageLower.split(/\s+/).filter((w) => w.length > 2)
  );

  if (keyWords.size === 0 || messageWords.size === 0) return 0;

  // Conta interseção usando Set (O(min(n,m)))
  let commonWords = 0;
  const smallerSet =
    keyWords.size <= messageWords.size ? keyWords : messageWords;
  const largerSet = keyWords.size > messageWords.size ? keyWords : messageWords;

  for (const word of smallerSet) {
    if (largerSet.has(word)) {
      commonWords++;
    }
  }

  // Score baseado na proporção de palavras em comum (Jaccard similarity)
  const totalUniqueWords = keyWords.size + messageWords.size - commonWords;
  const jaccardScore = commonWords / totalUniqueWords;

  return jaccardScore;
}

/**
 * Encontra a melhor tradução usando score de similaridade
 * Complexidade: O(n × (k + m)) onde n=keys, k=chars, m=words
 * @param errorMessage - Mensagem de erro
 * @returns Melhor tradução encontrada ou null
 */
function findBestMatch(errorMessage: string): string | null {
  const message = errorMessage.toLowerCase().trim();

  let bestMatch = null;
  let bestScore = 0;
  const MIN_SCORE = 0.5; // Threshold mais rigoroso: pelo menos 50% de similaridade

  for (const [key, translation] of Object.entries(ERROR_TRANSLATIONS)) {
    const score = calculateSimilarityScore(key, message);

    if (score > bestScore && score >= MIN_SCORE) {
      bestMatch = translation;
      bestScore = score;
    }
  }

  return bestMatch;
}

/**
 * Traduz mensagens de erro do servidor do inglês para português
 * Complexidade total: O(n × (k + m)) - otimizada para ~25 keys
 * @param errorMessage - Mensagem de erro em inglês
 * @returns Mensagem traduzida ou a original se não houver tradução
 */
export function translateError(errorMessage: string): string {
  // Usa || para tratar string vazia como falsy
  if (!errorMessage || errorMessage.trim() === "") {
    return "Erro desconhecido";
  }

  const trimmedMessage = errorMessage.trim();

  // 1. Busca tradução exata primeiro O(1) - hash lookup
  const exactMatch =
    ERROR_TRANSLATIONS[trimmedMessage] ??
    ERROR_TRANSLATIONS[trimmedMessage.toLowerCase()];
  if (exactMatch) return exactMatch;
  // 2. Busca com score de similaridade O(n × (k + m))
  const bestMatch = findBestMatch(trimmedMessage);
  if (bestMatch) return bestMatch;

  // 3. Se não encontrar tradução, retorna a mensagem original
  return trimmedMessage;
}
