// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function for async operations
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

// Wrapper function for synchronous operations
export function tryCatchSync<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    const data = fn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

// Basic assertion function - Use when you want to fail fast
export function assert(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

// Common type assertion functions - Use when you want to fail fast
export function assertDefined<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message || "Value must be defined");
  }
}

export function assertIsString(
  value: unknown,
  message?: string
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(message || `Expected string, got ${typeof value}`);
  }
}

export function assertIsNumber(
  value: unknown,
  message?: string
): asserts value is number {
  if (typeof value !== "number") {
    throw new Error(message || `Expected number, got ${typeof value}`);
  }
}

export function assertIsObject(
  value: unknown,
  message?: string
): asserts value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    throw new Error(message || `Expected object, got ${typeof value}`);
  }
}

// Type guard functions - Use for conditional logic instead of try/catch with assertions
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}
