import {
  tryCatchSync,
  assertIsString,
  isString,
  isDefined,
} from "./error-handling";

/**
 * Utilitários para localStorage com tratamento de erro robusto
 *
 * Demonstra o uso correto de:
 * - tryCatchSync para operações síncronas que podem falhar
 * - assertions para validação de entrada (falha rápida)
 * - type guards para lógica condicional
 */

export interface StorageOperationResult<T> {
  data: T | null;
  error: Error | null;
  success: boolean;
}

/**
 * Salva dados no localStorage com serialização segura
 * Usa assertion para validar entrada (queremos falha rápida se key inválida)
 */
export function setLocalStorage<T>(
  key: string,
  value: T
): StorageOperationResult<T> {
  // Assertion: queremos falha rápida se key não for string válida
  assertIsString(key, "Storage key deve ser uma string");

  const { data, error } = tryCatchSync(() => {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return value;
  });

  return {
    data,
    error,
    success: !error,
  };
}

/**
 * Recupera dados do localStorage com parsing seguro
 * Usa type guards para validação condicional (não queremos falha rápida)
 */
export function getLocalStorage<T>(key: string): StorageOperationResult<T> {
  // Assertion: queremos falha rápida se key não for string válida
  assertIsString(key, "Storage key deve ser uma string");

  const { data, error } = tryCatchSync(() => {
    const item = localStorage.getItem(key);

    // Type guard: validação condicional - null é um caso válido
    if (!isString(item)) {
      return null;
    }

    return JSON.parse(item) as T;
  });

  return {
    data,
    error,
    success: !error,
  };
}

/**
 * Remove item do localStorage
 */
export function removeLocalStorage(key: string): StorageOperationResult<void> {
  // Assertion: queremos falha rápida se key não for string válida
  assertIsString(key, "Storage key deve ser uma string");

  const { data, error } = tryCatchSync(() => {
    localStorage.removeItem(key);
  });

  return {
    data,
    error,
    success: !error,
  };
}

/**
 * Verifica se localStorage está disponível
 * Usa apenas type guards - não queremos falha rápida
 */
export function isLocalStorageAvailable(): boolean {
  const { data } = tryCatchSync(() => {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  });

  return data === true;
}

/**
 * Utilitário para cache de dados com TTL (Time To Live)
 * Exemplo de uso combinado de todos os patterns
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export function setCacheItem<T>(
  key: string,
  value: T,
  ttlMinutes: number = 60
): StorageOperationResult<CacheItem<T>> {
  // Assertions para validação de entrada
  assertIsString(key, "Cache key deve ser uma string");

  const cacheItem: CacheItem<T> = {
    data: value,
    timestamp: Date.now(),
    ttl: ttlMinutes * 60 * 1000, // converter para ms
  };

  return setLocalStorage(`cache_${key}`, cacheItem);
}

export function getCacheItem<T>(key: string): StorageOperationResult<T> {
  // Assertion para validação de entrada
  assertIsString(key, "Cache key deve ser uma string");

  const { data: cacheItem, error } = getLocalStorage<CacheItem<T>>(
    `cache_${key}`
  );

  if (error) {
    return { data: null, error, success: false };
  }

  // Type guard para verificar se temos dados válidos
  if (!isDefined(cacheItem) || !isDefined(cacheItem.data)) {
    return {
      data: null,
      error: new Error("Cache item not found"),
      success: false,
    };
  }

  // Verificar se o cache expirou
  const now = Date.now();
  const isExpired = now - cacheItem.timestamp > cacheItem.ttl;

  if (isExpired) {
    // Remover cache expirado
    removeLocalStorage(`cache_${key}`);
    return {
      data: null,
      error: new Error("Cache expired"),
      success: false,
    };
  }

  return {
    data: cacheItem.data,
    error: null,
    success: true,
  };
}
