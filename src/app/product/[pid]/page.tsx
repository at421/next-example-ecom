import type { Metadata } from "next";

import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
import ProductDetailsClient from "./ProductDetailsClient";
// types
import type { ProductType } from "@/types";

import { server } from "@/utils/server";

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
      throw new Error("Failed to fetch product data");
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.pid);

  return {
    title: product ? product.name : "Product Not Found",
    description: product ? product.description : "Details about the product",
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  if (!product) {
    // Handle case where product is not found, perhaps redirect to a 404 page
    return <div>Product not found</div>; // Or use Next.js notFound() helper
  }

  return (
    <>
      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>
          {/* Client component handles description/reviews section */}
          <ProductDetailsClient product={product} />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      {/* Breadcrumb and Footer are assumed to be handled by the root layout */}
    </>
  );
};

export default ProductPage;