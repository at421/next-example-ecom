import { NextResponse } from 'next/server';

// fake data
import products from '../../utils/data/products';

// Simulate delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  // fake loading time
  await sleep(800);

  return NextResponse.json(products, { status: 200 });
}