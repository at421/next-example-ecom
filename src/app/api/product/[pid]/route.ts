import { NextResponse } from "next/server";

// fake data
import products from "../../../../../../utils/data/products"; // Adjust path based on app/api/products/[pid]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);
  return NextResponse.json(product);
}