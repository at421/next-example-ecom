import { NextResponse } from 'next/server';

// fake data
import products from '@/utils/data/products'; // Assuming utils is at the root and aliased

export async function GET(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);

  return NextResponse.json(product, { status: 200 });
}