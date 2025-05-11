import { NextResponse } from 'next/server';
import products from '@/utils/data/products';

export async function GET(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}