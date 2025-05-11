import { NextResponse } from 'next/server';

// fake data - assuming it's now located at "@/utils/data/products"
import products from '@/utils/data/products';

export async function GET() {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(products, { status: 200 });
}