import { NextResponse } from "next/server";

// Tipos para as fotos do Unsplash
interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  width: number;
  height: number;
  likes: number;
  description?: string;
  alt_description?: string;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
}

interface ProcessedPhoto {
  id: string;
  thumb: string;
  small: string;
  regular: string;
  alt: string;
  qualityScore: number;
  credits: {
    name: string;
    username: string;
    link: string;
  };
}

interface FallbackAvatar {
  id: string;
  thumb: string;
  small: string;
  alt: string;
  style: string;
}

// Coleções temáticas expandidas e verificadas
const AVATAR_COLLECTIONS = {
  robots: [
    "2489501", // Robots collection (verified)
    "9248817", // Artificial Intelligence (verified)
    "827743", // Technology
    "3816141", // Futuristic
    "1138961", // Science Fiction
  ],
  digital: [
    "4786275", // Digital Art
    "1319040", // 3D Art
    "2203387", // Abstract Tech
  ],
  character: [
    "1631817", // Characters & Avatars
    "894", // People (for more humanoid avatars)
  ],
};

// Palavras-chave para busca quando coleções falham
const SEARCH_KEYWORDS = [
  "robot avatar",
  "ai assistant",
  "digital character",
  "android robot",
  "cyberpunk character",
  "futuristic avatar",
  "artificial intelligence",
  "chatbot avatar",
  "virtual assistant",
  "sci-fi robot",
];

// Avatares de fallback expandidos e de alta qualidade
const PREMIUM_FALLBACK_AVATARS: FallbackAvatar[] = [
  {
    id: "premium-1",
    thumb:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop&q=80",
    alt: "Friendly Robot Assistant",
    style: "realistic",
  },
  {
    id: "premium-2",
    thumb:
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&h=400&fit=crop&q=80",
    alt: "Modern AI Robot",
    style: "sleek",
  },
  {
    id: "premium-3",
    thumb:
      "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=400&h=400&fit=crop&q=80",
    alt: "Futuristic Android",
    style: "futuristic",
  },
  {
    id: "premium-4",
    thumb:
      "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=400&h=400&fit=crop&q=80",
    alt: "Humanoid Assistant",
    style: "humanoid",
  },
  {
    id: "premium-5",
    thumb:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=400&fit=crop&q=80",
    alt: "Tech-Enhanced Avatar",
    style: "tech",
  },
  {
    id: "premium-6",
    thumb:
      "https://images.unsplash.com/photo-1563207153-f403bf289096?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=400&fit=crop&q=80",
    alt: "Friendly AI Character",
    style: "friendly",
  },
  {
    id: "premium-7",
    thumb:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    alt: "Digital Assistant",
    style: "digital",
  },
  {
    id: "premium-8",
    thumb:
      "https://images.unsplash.com/photo-1527430253228-e93688616381?w=200&h=200&fit=crop&q=80",
    small:
      "https://images.unsplash.com/photo-1527430253228-e93688616381?w=400&h=400&fit=crop&q=80",
    alt: "Cyber Assistant",
    style: "cyber",
  },
];

// Função melhorada para avaliar qualidade de avatares
function evaluateAvatarQuality(photo: UnsplashPhoto): number {
  let score = 0;

  // Aspect ratio adequado para avatares (mais próximo de quadrado é melhor)
  const aspectRatio = photo.width / photo.height;
  if (aspectRatio >= 0.7 && aspectRatio <= 1.4) score += 30;
  else if (aspectRatio >= 0.5 && aspectRatio <= 2.0) score += 15;

  // Popularidade (likes)
  if (photo.likes >= 100) score += 25;
  else if (photo.likes >= 50) score += 15;
  else if (photo.likes >= 20) score += 10;
  else if (photo.likes >= 5) score += 5;

  // Qualidade da descrição
  const description = (
    photo.description ||
    photo.alt_description ||
    ""
  ).toLowerCase();
  const avatarKeywords = [
    "robot",
    "ai",
    "artificial",
    "android",
    "cyborg",
    "assistant",
    "avatar",
    "character",
    "face",
    "head",
  ];
  const keywordMatches = avatarKeywords.filter((keyword) =>
    description.includes(keyword)
  ).length;
  score += keywordMatches * 8;

  // Evitar imagens muito escuras ou com texto sobreposto
  if (description.includes("dark") || description.includes("black"))
    score -= 10;
  if (description.includes("text") || description.includes("word")) score -= 15;

  // Preferir imagens com foco no "personagem"
  if (
    description.includes("portrait") ||
    description.includes("face") ||
    description.includes("head")
  )
    score += 20;

  // Resolução mínima
  if (photo.width >= 400 && photo.height >= 400) score += 15;

  return score;
}

// Função para aleatorizar array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Função para selecionar itens aleatórios de um array
function getRandomItems<T>(array: T[], count: number): T[] {
  if (array.length <= count) return array;
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

async function fetchFromCollection(
  accessKey: string,
  collectionId: string,
  count: number,
  page: number = 1
): Promise<UnsplashPhoto[]> {
  const response = await fetch(
    `https://api.unsplash.com/collections/${collectionId}/photos?per_page=${Math.min(
      count * 6,
      30
    )}&page=${page}`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Collection ${collectionId}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function searchByKeyword(
  accessKey: string,
  keyword: string,
  count: number,
  page: number = 1
): Promise<UnsplashPhoto[]> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      keyword
    )}&per_page=${count * 3}&orientation=squarish&page=${page}`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Criar interface para foto com score
interface ScoredPhoto extends UnsplashPhoto {
  qualityScore: number;
}

function processPhotos(
  photos: UnsplashPhoto[],
  count: number
): ProcessedPhoto[] {
  // Avaliar e ordenar por qualidade
  const scored = photos
    .filter((photo: UnsplashPhoto) => photo.urls && photo.urls.raw && photo.id)
    .map((photo: UnsplashPhoto) => ({
      ...photo,
      qualityScore: evaluateAvatarQuality(photo),
    }))
    .sort((a: ScoredPhoto, b: ScoredPhoto) => b.qualityScore - a.qualityScore)
    .slice(0, count);

  return scored.map((photo: ScoredPhoto) => ({
    id: photo.id,
    thumb: `${photo.urls.raw}&w=200&h=200&fit=crop&auto=faces&q=80`,
    small: `${photo.urls.raw}&w=400&h=400&fit=crop&auto=faces&q=80`,
    regular: `${photo.urls.raw}&w=600&h=600&fit=crop&auto=faces&q=85`,
    alt: photo.alt_description || photo.description || "AI Avatar",
    qualityScore: photo.qualityScore,
    credits: {
      name: photo.user.name,
      username: photo.user.username,
      link: photo.user.links.html,
    },
  }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = Math.min(parseInt(searchParams.get("count") || "6"), 20);
  const refresh = searchParams.get("refresh") === "true";

  console.log(`🤖 Fetching ${count} avatars (refresh: ${refresh})`);

  // Se não está refreshing, retorna fallbacks aleatórios
  if (!refresh) {
    const randomFallbacks = shuffleArray(PREMIUM_FALLBACK_AVATARS);
    const result = randomFallbacks.slice(0, count);
    console.log(`📸 Returning ${result.length} randomized fallback avatars`);
    return NextResponse.json(result);
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.warn(
      "⚠️ Unsplash access key not configured, using randomized fallback images"
    );
    const randomFallbacks = shuffleArray(PREMIUM_FALLBACK_AVATARS);
    return NextResponse.json(randomFallbacks.slice(0, count));
  }

  const allPhotos: UnsplashPhoto[] = [];
  const usedSources: string[] = [];

  try {
    // 1. Aleatorizar e tentar coleções por categoria
    const allCollections = Object.values(AVATAR_COLLECTIONS).flat();
    const randomizedCollections = shuffleArray(allCollections);

    for (const collectionId of randomizedCollections.slice(0, 6)) {
      try {
        // Usar página aleatória para variar resultados
        const randomPage = Math.floor(Math.random() * 3) + 1;
        console.log(
          `🔍 Trying collection: ${collectionId} (page: ${randomPage})`
        );

        const photos = await fetchFromCollection(
          accessKey,
          collectionId,
          count,
          randomPage
        );

        // Aleatorizar fotos da coleção
        const randomizedPhotos = shuffleArray(photos);
        allPhotos.push(...randomizedPhotos);
        usedSources.push(`collection-${collectionId}-p${randomPage}`);

        if (allPhotos.length >= count * 4) break; // Enough variety
      } catch (error) {
        console.warn(
          `⚠️ Collection ${collectionId} failed:`,
          (error as Error).message
        );
      }
    }

    // 2. Se ainda não temos fotos suficientes, buscar por keywords aleatórias
    if (allPhotos.length < count * 2) {
      console.log("🔍 Searching by randomized keywords...");

      const randomKeywords = getRandomItems(SEARCH_KEYWORDS, 4);

      for (const keyword of randomKeywords) {
        try {
          const randomPage = Math.floor(Math.random() * 3) + 1;
          const photos = await searchByKeyword(
            accessKey,
            keyword,
            count,
            randomPage
          );

          // Aleatorizar resultados da busca
          const randomizedPhotos = shuffleArray(photos);
          allPhotos.push(...randomizedPhotos);
          usedSources.push(`search-${keyword}-p${randomPage}`);

          if (allPhotos.length >= count * 3) break;
        } catch (error) {
          console.warn(
            `⚠️ Search for "${keyword}" failed:`,
            (error as Error).message
          );
        }
      }
    }

    // 3. Processar e filtrar fotos
    if (allPhotos.length > 0) {
      // Remover duplicatas por ID
      const uniquePhotos = allPhotos.filter(
        (photo, index, arr) => arr.findIndex((p) => p.id === photo.id) === index
      );

      // Aleatorizar fotos únicas antes do processamento
      const randomizedUniquePhotos = shuffleArray(uniquePhotos);

      const processedPhotos = processPhotos(randomizedUniquePhotos, count * 2);

      console.log(
        `✅ Found ${
          processedPhotos.length
        } quality avatars from sources: ${usedSources.join(", ")}`
      );

      // Se temos fotos suficientes, retornar aleatorizadas
      if (processedPhotos.length >= count) {
        const finalSelection = shuffleArray(processedPhotos).slice(0, count);
        return NextResponse.json(finalSelection);
      }

      // Caso contrário, completar com fallbacks aleatórios
      const needed = count - processedPhotos.length;
      const randomFallbacks = shuffleArray(PREMIUM_FALLBACK_AVATARS).slice(
        0,
        needed
      );

      console.log(
        `⚠️ Only ${processedPhotos.length} new avatars found, adding ${randomFallbacks.length} random fallbacks`
      );

      // Aleatorizar a combinação final
      const combined = shuffleArray([...processedPhotos, ...randomFallbacks]);
      return NextResponse.json(combined);
    }
  } catch (error) {
    console.error("❌ Error fetching avatars:", error);
  }

  // Fallback final aleatório
  console.log("🔄 Using randomized fallback avatars");
  const randomFallbacks = shuffleArray(PREMIUM_FALLBACK_AVATARS);
  return NextResponse.json(randomFallbacks.slice(0, count));
}
