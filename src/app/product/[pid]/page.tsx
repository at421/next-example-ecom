import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsFeatured from "@/components/products-featured";
import ProductSingleClient from "@/components/product-single/ProductSingleClient";
// types
import type { ProductType } from "@/types";

import { server } from "@/utils/server";

type Props = {
  params: { pid: string };
};

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) {
      // Handle HTTP errors, e.g., 404
      if (res.status === 404) {
         return null; // Indicate not found
      }
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Fetching product failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.pid);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    // Add other metadata like og:image, twitter:card, etc.
  };
}

const ProductPage = async ({ params }: Props) => {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Use Next.js notFound function for 404
  }

  return (
    <>
      <Breadcrumb />

      <ProductSingleClient product={product} />

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;