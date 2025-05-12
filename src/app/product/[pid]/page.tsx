import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsFeatured from "@/components/products-featured";
import ProductSectionWithTabs from "./ProductSectionWithTabs";
import { server } from "@/utils/server";
import type { ProductType } from "@/types";
import { notFound } from "next/navigation";

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) {
      // Handle cases where product is not found (e.g., 404)
      if (res.status === 404) {
        return null;
      }
      // For other errors, throw to be caught by Next.js error handling
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    // Rethrow or return null depending on desired error handling
    throw error;
  }
}

export async function generateMetadata({ params }: { params: { pid: string } }) {
  const product = await getProduct(params.pid);

  if (!product) {
    // If product not found, metadata should reflect this or trigger notFound
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description?.substring(0, 160) + '...', // Basic example
    // Add other metadata like Open Graph, etc.
  };
}

export default async function ProductPage({ params }: { params: { pid: string } }) {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Renders the not-found.tsx file
  }

  return (
    <>
      <Breadcrumb />
      <ProductSectionWithTabs product={product} />
      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
}