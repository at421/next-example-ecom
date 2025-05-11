import { NextRequest, NextResponse } from "next/server";

// fake data
import products from "@/utils/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);

  return NextResponse.json(product);
}