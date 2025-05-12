import { NextResponse } from 'next/server';

// Assuming utils is at the project root based on the original path
import products from '../../../../utils/data/products';

export async function GET(
  _request: Request,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}