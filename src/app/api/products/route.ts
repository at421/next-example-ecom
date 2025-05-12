import { NextResponse } from 'next/server';

// fake data
// Assuming utils is at the root level, sibling to app
import products from '@/utils/data/products';

export async function GET() {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(products, { status: 200 });
}