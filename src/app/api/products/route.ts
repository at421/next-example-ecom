import { NextResponse } from 'next/server';
// Assuming utils is at the project root, relative path from app/api/route.ts
import products from "../../../utils/data/products";

// Function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  // Simulate fake loading time
  await delay(800);

  // Return the data
  return NextResponse.json(products, { status: 200 });
}