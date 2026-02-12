import { NextResponse } from "next/server";
import { sanitizePostTaxonomy } from "@/lib/blog-taxonomy";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const baseUrl = process.env.CMS_BASE_URL;
  const apiKey = process.env.CMS_API_KEY;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "CMS_BASE_URL is not configured" },
      { status: 500 }
    );
  }

  const cmsUrl = new URL(`${baseUrl.replace(/\/+$/, "")}/query`);
  cmsUrl.searchParams.set("type", "blog");
  cmsUrl.searchParams.set("limit", "200");
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
  const match = result.find((doc: any) => doc?.slug === slug || doc?._id === slug);

  if (!match) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!sanitizePostTaxonomy(match)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ result: match });
}
