import { NextResponse } from 'next/server';

// fake data
import products from '../../../../../utils/data/products'; // Adjusted path based on assumed app/api/products/[pid]/route.ts location

export async function GET(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);
  return NextResponse.json(product, { status: 200 });
}