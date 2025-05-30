// MeetAI Service Worker
// Versão 1.0.0

const CACHE_NAME = "meetai-v1.0.0";
const STATIC_CACHE = "meetai-static-v1.0.0";
const DYNAMIC_CACHE = "meetai-dynamic-v1.0.0";

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

  // Network First - para dados dinâmicos
  networkFirst: [/\/api\//, /\/auth\//],

  // Stale While Revalidate - para páginas
  staleWhileRevalidate: [/\//, /\/sign-/, /\/dashboard/],
};

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
  const strategy = getStrategy(request.url);

  event.respondWith(handleRequest(request, strategy));
});

// Determinar estratégia baseada na URL
function getStrategy(url) {
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
      default:
        return await fetch(request);
    }
  } catch (error) {
    console.error("❌ Service Worker: Erro ao processar requisição:", error);
    return await getOfflinePage(request);
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  if (response.status === 200) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
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
      if (response.status === 200) {
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
