export class CmsClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: { baseUrl: string; apiKey: string }) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const base = this.baseUrl.replace(/\/+$/, "");
    const ep = endpoint.replace(/^\/+/, "");
    const res = await fetch(`${base}/${ep}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        ...options.headers,
      },
    });

    if (!res.ok) throw new Error(`CMS API Error: ${res.statusText}`);
    return res.json();
  }

  async fetch(type: string, options: { limit?: number; offset?: number } = {}) {
    const params = new URLSearchParams({
      type,
      ...(options.limit !== undefined ? { limit: String(options.limit) } : {}),
      ...(options.offset !== undefined ? { offset: String(options.offset) } : {}),
    });
    const data = await this.fetchAPI(`query?${params.toString()}`);
    return data.result;
  }
}