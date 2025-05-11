import { notFound } from "next/navigation";
import { Metadata } from "next";

import ProductClientPage from "./ProductClientPage";

// types
import type { ProductType } from "@/types";

async function getProduct(pid: string): Promise<ProductType | null> {
  // Assuming your API route is correctly migrated to app/api/product/[pid]/route.ts
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${pid}`, {
    // Optional: Add revalidation or caching strategy
    // next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    // Handle errors, maybe return null or throw
    console.error(`Failed to fetch product ${pid}: ${res.status}`);
    return null;
  }

  const product = await res.json();
  return product;
}

export async function generateMetadata({ params }: { params: { pid: string } }): Promise<Metadata> {
  const product = await getProduct(params.pid);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    // Add other metadata like og:image, etc.
  };
}

const ProductPage = async ({ params }: { params: { pid: string } }) => {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Or render a specific not found component
  }

  return <ProductClientPage product={product} />;
};

export default ProductPage;