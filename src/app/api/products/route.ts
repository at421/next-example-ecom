import { NextResponse } from 'next/server';
import products from "@/utils/data/products";

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 800));
  return NextResponse.json(products, { status: 200 });
}