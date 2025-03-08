import { toCamelCase, toSnakeCase } from "./case-utils";

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const jsonData = (await response.json()) as unknown;
    return toCamelCase<T>(jsonData);
  }

  get<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: "GET" });
  }

  post<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSnakeCase(body)),
    });
  }

  put<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSnakeCase(body)),
    });
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: "DELETE" });
  }
}
