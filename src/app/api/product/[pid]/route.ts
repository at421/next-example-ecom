import { NextResponse } from 'next/server';
// fake data - assuming the path relative to the project root remains the same
import products from '../../../utils/data/products';

export async function GET(request: Request, { params }: { params: { pid: string } }) {
  const { pid } = params;

  const product = products.find((x) => x.id === pid);

  if (product) {
    return NextResponse.json(product, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}