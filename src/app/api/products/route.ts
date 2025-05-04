import { NextResponse } from "next/server";

// fake data
// Assuming utils is at the root level and accessible via @/
import products from "@/utils/data/products";

// Helper function to simulate delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  // fake loading time
  await delay(800);

  return NextResponse.json(products, { status: 200 });
}