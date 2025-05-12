import { NextResponse } from 'next/server';

// fake data
// Adjust the import path if the file structure changes significantly in the app directory
import products from '../../utils/data/products';

export async function GET() {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(products, { status: 200 });
}