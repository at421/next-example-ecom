import { NextResponse } from 'next/server';
import products from '../../../../utils/data/products'; // Adjust path based on your project structure

export async function GET() {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(products, { status: 200 });
}