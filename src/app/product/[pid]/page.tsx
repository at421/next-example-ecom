import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { server } from "@/utils/server";
import type { ProductType } from "@/types";
import ProductClient from "@/components/product-single/ProductClient";

type ProductPageProps = {
  params: {
    pid: string;
  };
};

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // or trigger notFound() if status is 404
      if (res.status === 404) {
          return null; // Indicate not found
      }
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Fetching product failed:", error);
    return null; // Indicate failure
  }
}

export async function generateMetadata(
  { params }: ProductPageProps,
): Promise<Metadata> {
  const product = await getProduct(params.pid);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description?.substring(0, 160) || `Details for product ${product.name}`,
    // Add other metadata fields as needed
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160) || `Details for product ${product.name}`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}


export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Renders the not-found.js page
  }

  return (
    <ProductClient product={product} />
  );
}