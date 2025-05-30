// MeetAI Service Worker
// Versão 0.1.0-alpha - Atualização de Segurança
//
// IMPORTANTE: Esta versão inclui melhorias de segurança para prevenir
// o cache de dados sensíveis de autenticação, incluindo:
// - JWTs e tokens de acesso
// - Cookies de sessão
// - Informações pessoais identificáveis (PII)
// - Respostas de endpoints de autenticação
//
// As estratégias de cache agora verificam:
// - Métodos HTTP não-idempotentes
// - Headers de autorização
// - Credenciais incluídas
// - Endpoints sensíveis (/auth/, /login/, /token/, etc.)
// - Headers Cache-Control restritivos
//
// CORREÇÃO: Adicionada verificação de método GET antes de cachear
// para prevenir erros com requisições POST, PUT, DELETE, etc.

const CACHE_NAME = "meetai-v0.1.0-alpha";
const STATIC_CACHE = "meetai-static-v0.1.0-alpha";
const DYNAMIC_CACHE = "meetai-dynamic-v0.1.0-alpha";

// Arquivos essenciais para cache inicial
const STATIC_ASSETS = [
  "/",
  "/sign-in",
  "/sign-up",
  "/offline",
  "/manifest.json",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Cache First - para assets estáticos
  cacheFirst: [
    /\.(js|css|woff2?|png|jpg|jpeg|svg|gif|ico)$/,
    /\/icon-\d+\.(png|svg)$/,
  ],

  // Network First - para dados dinâmicos (excluindo endpoints sensíveis de auth)
  networkFirst: [/\/api\//],

  // Stale While Revalidate - para páginas
  staleWhileRevalidate: [/\//, /\/sign-/, /\/dashboard/],
};

// Endpoints sensíveis que nunca devem ser cacheados
const SENSITIVE_ENDPOINTS = [
  /\/auth\//, // endpoints de autenticação
  /\/login/, // endpoints de login
  /\/logout/, // endpoints de logout
  /\/token/, // endpoints de token
  /\/session/, // endpoints de sessão
  /\/user\/profile/, // perfil do usuário (pode conter PII)
];

// Verificar se uma requisição contém dados sensíveis
function isSensitiveRequest(request, url) {
  // Verificar se é um endpoint sensível
  if (SENSITIVE_ENDPOINTS.some((pattern) => pattern.test(url))) {
    return true;
  }

  // Verificar se a requisição contém credenciais
  if (request.credentials === "include") {
    return true;
  }

  // Verificar headers de autorização
  const authHeader = request.headers.get("authorization");
  if (
    authHeader &&
    (authHeader.toLowerCase().includes("bearer") ||
      authHeader.toLowerCase().includes("token"))
  ) {
    return true;
  }

  // Verificar métodos não-idempotentes
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method.toUpperCase())) {
    return true;
  }

  return false;
}

// Verificar se uma resposta contém dados sensíveis
function isSensitiveResponse(response, request) {
  // Verificar headers que indicam dados sensíveis
  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    return true;
  }

  // Verificar headers de autenticação na resposta
  const authHeader =
    response.headers.get("authorization") ||
    response.headers.get("www-authenticate");
  if (authHeader) {
    return true;
  }

  // Para requisições de autenticação específicas, assumir que JSON é sensível
  if (
    request &&
    SENSITIVE_ENDPOINTS.some((pattern) => pattern.test(request.url))
  ) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return true;
    }
  }

  // Verificar headers de cache control que impedem cache
  const cacheControl = response.headers.get("cache-control");
  if (
    cacheControl &&
    (cacheControl.includes("no-store") || cacheControl.includes("private"))
  ) {
    return true;
  }

  return false;
}

// Verificar se uma requisição pode ser cacheada
function canCacheRequest(request, response) {
  // Apenas requisições GET podem ser cacheadas
  if (request.method !== "GET") {
    console.log(
      `🚫 Cache bloqueado: Método ${request.method} não suportado para ${request.url}`
    );
    return false;
  }

  // Verificar se a resposta foi bem-sucedida
  if (!response || response.status !== 200) {
    console.log(
      `🚫 Cache bloqueado: Status ${response?.status || "indefinido"} para ${
        request.url
      }`
    );
    return false;
  }

  // Verificar se não contém dados sensíveis
  if (isSensitiveResponse(response, request)) {
    console.log(
      `🔒 Cache bloqueado: Dados sensíveis detectados para ${request.url}`
    );
    return false;
  }

  console.log(`✅ Cache permitido: ${request.method} ${request.url}`);
  return true;
}

// Instalar Service Worker
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Instalando...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("📦 Service Worker: Fazendo cache dos assets estáticos");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("✅ Service Worker: Instalação concluída");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Service Worker: Erro na instalação:", error);
      })
  );
});

// Ativar Service Worker
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker: Ativando...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Remover caches antigos
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log(
                "🗑️  Service Worker: Removendo cache antigo:",
                cacheName
              );
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker: Ativação concluída");
        return self.clients.claim();
      })
  );
});

// Interceptar requisições
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições não-HTTP
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Determinar estratégia de cache
  const strategy = getStrategy(url, request);

  event.respondWith(handleRequest(request, strategy));
});

// Determinar estratégia baseada na URL
function getStrategy(url, request) {
  // Verificar se é uma requisição sensível
  if (isSensitiveRequest(request, url)) {
    return "noCache"; // Nova estratégia para dados sensíveis
  }

  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some((pattern) => pattern.test(url))) {
      return strategy;
    }
  }
  return "networkFirst"; // padrão
}

// Lidar com requisições baseado na estratégia
async function handleRequest(request, strategy) {
  try {
    switch (strategy) {
      case "cacheFirst":
        return await cacheFirst(request);
      case "networkFirst":
        return await networkFirst(request);
      case "staleWhileRevalidate":
        return await staleWhileRevalidate(request);
      case "noCache":
        return await noCache(request);
      default:
        return await fetch(request);
    }
  } catch (error) {
    console.error("❌ Service Worker: Erro ao processar requisição:", error);
    return await getOfflinePage(request);
  }
}

// No Cache Strategy - para dados sensíveis
async function noCache(request) {
  // Sempre buscar da rede, nunca cachear
  return await fetch(request);
}

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  if (canCacheRequest(request, response)) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (canCacheRequest(request, response)) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (canCacheRequest(request, response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || (await fetchPromise);
}

// Página offline de fallback
async function getOfflinePage(request) {
  // Para navegação, retornar página offline
  if (request.mode === "navigate") {
    const offlinePage = await caches.match("/offline");
    if (offlinePage) {
      return offlinePage;
    }
  }

  // Para outros recursos, tentar buscar no cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Resposta de fallback básica
  return new Response("Offline - Recurso não disponível", {
    status: 503,
    statusText: "Service Unavailable",
    headers: { "Content-Type": "text/plain" },
  });
}

// Limpar caches periodicamente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => {
        event.ports[0].postMessage({ success: true });
      });
  }
});

console.log("🎯 MeetAI Service Worker carregado successfully!");
