export const BLOG_TAXONOMY = {
  "Trending Topic": {
    subcategories: [
      "Artificial Intelligence",
      "Cyber Security",
      "Cloud",
      "Software",
      "Mobile",
      "Technology",
    ],
  },
  FinTeq: {
    subcategories: [
      "Banking Tech",
      "Wealth Tech",
      "SoftTech",
      "PayTech",
      "InsurTech",
      "Finteq",
    ],
  },
  CXTeq: {
    subcategories: [
      "CX Automation",
      "Customer Journey",
      "Customer Data Platforms",
    ],
  },
  HRTeq: {
    subcategories: [
      "Recruitment & Staff Augmentation",
      "Payroll management",
      "Learning & Development",
      "HRMS",
      "HCM",
    ],
  },
  MarTeq: {
    subcategories: [
      "Automation",
      "Strategy",
      "Analytics",
      "ABM",
    ],
  },
  "Demand Gen": {
    subcategories: [],
  },
} as const;

export type BlogCategory = keyof typeof BLOG_TAXONOMY;

const norm = (v: unknown) => (typeof v === "string" ? v.trim().toLowerCase() : "");

export function normalizeCategory(input: unknown): BlogCategory | null {
  const want = norm(input);
  if (!want) return null;

  const entries = Object.keys(BLOG_TAXONOMY) as BlogCategory[];
  for (const cat of entries) {
    if (norm(cat) === want) return cat;
  }

  return null;
}

export function isAllowedSubcategory(category: BlogCategory, subcategory: unknown): boolean {
  const s = norm(subcategory);
  if (!s) return false;
  return BLOG_TAXONOMY[category].subcategories.some((x) => norm(x) === s);
}

export function sanitizePostTaxonomy(doc: any): { category: BlogCategory; subcategories: string[] } | null {
  const rawCategory = typeof doc?.category === "string" ? doc.category.trim() : "";

  let category = normalizeCategory(rawCategory);
  let embeddedSubcategory: string | null = null;

  if (!category && rawCategory) {
    const parts: string[] = rawCategory
      .split(/\s*-\s*/)
      .map((x: string) => x.trim())
      .filter((x: string) => Boolean(x));

    if (parts.length >= 2) {
      category = normalizeCategory(parts[0]);
      embeddedSubcategory = parts.slice(1).join(" - ");
    }
  }

  if (!category) return null;

  const rawSubs: unknown[] = [];
  if (embeddedSubcategory) rawSubs.push(embeddedSubcategory);
  if (typeof doc?.subcategory === "string") rawSubs.push(doc.subcategory);
  if (Array.isArray(doc?.subcategories)) rawSubs.push(...doc.subcategories);

  const cleaned = rawSubs
    .filter((x) => typeof x === "string")
    .map((x) => x.trim())
    .filter(Boolean);

  if (cleaned.length === 0) return { category, subcategories: [] };

  const unique: string[] = [];
  for (const s of cleaned) {
    if (isAllowedSubcategory(category, s) && !unique.some((u) => norm(u) === norm(s))) {
      unique.push(s);
    } else if (!isAllowedSubcategory(category, s)) {
      return null;
    }
  }

  return { category, subcategories: unique };
}
