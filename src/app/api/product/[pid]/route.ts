import { NextResponse } from 'next/server';
// Adjust the import path based on your project structure.
// Assuming 'utils' is a top-level directory or parallel to 'app'.
import products from '@/utils/data/products';

interface Params {
    pid: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    const { pid } = params;

    // Convert the string pid from the URL segment to a number for comparison
    // assuming product IDs are numbers. The original code's === might have
    // relied on loose equality or string IDs. Parsing is safer.
    const productId = parseInt(pid, 10);

    // Find the product with the matching ID
    const product = products.find((x) => x.id === productId);

    // Return the product (or undefined if not found).
    // The original code returned 200 status even if the product wasn't found,
    // as json() with undefined/null is a valid JSON response.
    // NextResponse.json defaults to status 200.
    return NextResponse.json(product);
}