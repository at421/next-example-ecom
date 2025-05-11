import { NextResponse } from "next/server";

// fake data
// Assuming utils is a sibling directory to app
import products from "@/utils/data/products";

export async function GET(
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x: any) => x.id === pid);
  return NextResponse.json(product, { status: 200 });
}