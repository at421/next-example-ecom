import { NextResponse } from "next/server";

// fake data
// Assuming utils is at the root level, relative path from app/api/products/route.ts
import products from "../../../utils/data/products";

export async function GET(request: Request) {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(products, { status: 200 });
}