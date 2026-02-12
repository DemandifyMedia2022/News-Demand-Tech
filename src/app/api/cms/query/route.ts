import { NextResponse } from "next/server";
import { normalizeCategory, sanitizePostTaxonomy } from "@/lib/blog-taxonomy";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "blog";
  const limit = url.searchParams.get("limit") || "10";
  const offset = url.searchParams.get("offset") || "0";
  const category = url.searchParams.get("category");
  const subcategory = url.searchParams.get("subcategory");
  const published = url.searchParams.get("published");
  const debug = url.searchParams.get("debug");

  const baseUrl = process.env.CMS_BASE_URL;
  const apiKey = process.env.CMS_API_KEY;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "CMS_BASE_URL is not configured" },
      { status: 500 }
    );
  }

  const cmsUrl = new URL(`${baseUrl.replace(/\/+$/, "")}/query`);
  cmsUrl.searchParams.set("type", type);
  cmsUrl.searchParams.set("limit", "500");
  cmsUrl.searchParams.set("offset", "0");

  const res = await fetch(cmsUrl.toString(), {
    method: "GET",
    headers: {
      ...(apiKey ? { "x-api-key": apiKey } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "CMS upstream error", status: res.status, body: text },
      { status: 502 }
    );
  }

  const data = await res.json();
  const result = Array.isArray(data?.result) ? data.result : [];

  const stats = {
    upstreamTotal: result.length,
    kept: 0,
    invalidTaxonomy: 0,
    categoryMismatch: 0,
    subcategoryMismatch: 0,
    publishedMismatch: 0,
  };

  const rejectedSamples: Array<{
    _id?: unknown;
    slug?: unknown;
    title?: unknown;
    published?: unknown;
    category?: unknown;
    subcategory?: unknown;
    subcategories?: unknown;
  }> = [];

  const norm = (v: unknown) => (typeof v === "string" ? v.trim().toLowerCase() : "");
  const wantCategory = category ? normalizeCategory(category) : null;
  const wantSubcategory = norm(subcategory);
  const wantPublished = norm(published);

  const filtered = result.filter((doc: any) => {
    const cleaned = sanitizePostTaxonomy(doc);
    if (!cleaned) {
      stats.invalidTaxonomy += 1;

      if (rejectedSamples.length < 10) {
        rejectedSamples.push({
          _id: doc?._id,
          slug: doc?.slug,
          title: doc?.title,
          published: doc?.published,
          category: doc?.category,
          subcategory: doc?.subcategory,
          subcategories: doc?.subcategories,
        });
      }

      return false;
    }

    if (wantCategory && cleaned.category !== wantCategory) {
      stats.categoryMismatch += 1;
      return false;
    }

    if (wantSubcategory) {
      const multi = cleaned.subcategories.map(norm).filter(Boolean);
      if (!multi.includes(wantSubcategory)) {
        stats.subcategoryMismatch += 1;
        return false;
      }
    }

    if (wantPublished) {
      const pub = doc?.published;
      const pubNorm = typeof pub === "boolean" ? (pub ? "true" : "false") : norm(pub);
      if (pubNorm !== wantPublished) {
        stats.publishedMismatch += 1;
        return false;
      }
    }

    stats.kept += 1;
    return true;
  });

  const off = Number.parseInt(offset, 10);
  const lim = Number.parseInt(limit, 10);
  const safeOff = Number.isFinite(off) && off >= 0 ? off : 0;
  const safeLim = Number.isFinite(lim) && lim > 0 ? lim : 10;

  const sliced = filtered.slice(safeOff, safeOff + safeLim);

  if (debug && norm(debug) !== "false" && norm(debug) !== "0") {
    return NextResponse.json({
      result: sliced,
      total: filtered.length,
      debug: {
        ...stats,
        rejectedSamples,
        wantCategory,
        wantSubcategory: wantSubcategory || null,
        wantPublished: wantPublished || null,
      },
    });
  }

  return NextResponse.json({ result: sliced, total: filtered.length });
}
