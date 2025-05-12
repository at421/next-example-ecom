import { NextResponse } from "next/server";

// fake data
import products from "@/utils/data/products";

export async function GET(
  context: { params: { pid: string } }
) {
  const { pid } = context.params;

  const product = products.find((x) => x.id === pid);
  return NextResponse.json(product, { status: 200 });
}