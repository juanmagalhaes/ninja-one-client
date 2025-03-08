export function toCamelCase<T>(data: unknown): T {
  if (Array.isArray(data)) {
    return data.map((item) => toCamelCase(item)) as unknown as T;
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        return { ...acc, [camelKey]: toCamelCase(value) };
      },
      {} as Record<string, unknown>,
    ) as T;
  }

  return data as T;
}

export function toSnakeCase<T>(data: T): Record<string, unknown> | T {
  if (Array.isArray(data)) {
    return data.map((item) => toSnakeCase(item)) as unknown as T;
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        const snakeKey = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
        return { ...acc, [snakeKey]: toSnakeCase(value) };
      },
      {} as Record<string, unknown>,
    );
  }

  return data;
}
