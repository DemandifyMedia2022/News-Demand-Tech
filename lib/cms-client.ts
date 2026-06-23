import { BlogPost } from './types';

export const CMS_FIELDS = {
  ID: '_id',
  TYPE: '_type',
  CREATED_AT: '_createdAt',
  UPDATED_AT: '_updatedAt',
  REV: '_rev',
  DATASET: '_dataset',
  PROJECT_ID: '_projectId',
} as const;

export class CmsClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: { baseUrl?: string; apiKey?: string } = {}) {
    this.baseUrl = config.baseUrl || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';
    this.apiKey = config.apiKey || process.env.CMS_API_KEY || '';
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api/cms/${endpoint}`;
    const res = await fetch(url, {
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
    const params = new URLSearchParams();
    params.set('type', type);
    if (options.limit) params.set('limit', options.limit.toString());

    const data = await this.fetchAPI(`query?${params.toString()}`, { next: { revalidate: 60 } });
    return data.result;
  }
}

export const cms = new CmsClient();