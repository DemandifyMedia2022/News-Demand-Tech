export type CmsDocument = Record<string, unknown>;

export type CmsQueryResult<T = CmsDocument> = {
  result: T[];
};

export type CmsBlog = {
  _id?: string;
  _type?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  readTime?: string;
  publishDate?: string;
  category?: string;
  subcategory?: string;
  subcategories?: string[];
  tags?: string[];
  faq?: { question: string; answer: string }[];
  published?: boolean;
};
