export interface BlogPost {
  _id: string;
  _type: 'blog';
  title: string;
  slug: string;
  excerpt?: string;
  content?: string; // JSON string from Lexical editor
  image?: string;
  published: boolean;
  _createdAt: string;
}

export interface CmsBlog {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  subcategory?: string;
  subcategories?: string[];
  author?: string;
  publishDate?: string;
  readTime?: string;
  published?: boolean;
}
