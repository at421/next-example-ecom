import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
import ProductInfoTabs from "@/components/product-single/info-tabs"; // New Client Component
// types
import type { ProductType } from "@/types";

import { server } from "@/utils/server"; // Assuming utils/server is correct path

type ProductPageProps = {
  params: {
    pid: string;
  };
};

async function getProduct(pid: string): Promise<ProductType> {
  const res = await fetch(`${server}/api/product/${pid}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.pid);

  return {
    title: product.name,
    description: product.description,
    // Add other metadata fields here if needed (e.g., og:image, twitter:card)
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  return (
    <>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          {/* Client Component handles tabs state and rendering Description/Reviews */}
          <ProductInfoTabs product={product} />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;

// --- components/product-single/info-tabs/index.tsx ---
'use client';

import { useState } from "react";

import Description from "@/components/product-single/description";
import Reviews from "@/components/product-single/reviews";
import type { ProductType } from "@/types";

type ProductInfoTabsProps = {
  product: ProductType;
};

const ProductInfoTabs = ({ product }: ProductInfoTabsProps) => {
  const [showBlock, setShowBlock] = useState("description");

  // Note: The original code had a hardcoded "(2)" for reviews.
  // You might want to fetch the actual review count if available in product data,
  // or fetch it separately in this client component if needed.
  const reviewCount = 2; // Placeholder

  return (
    <div className="product-single__info">
      <div className="product-single__info-btns">
        <button
          type="button"
          onClick={() => setShowBlock("description")}
          className={`btn btn--rounded ${showBlock === "description" ? "btn--active" : ""}`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setShowBlock("reviews")}
          className={`btn btn--rounded ${showBlock === "reviews" ? "btn--active" : ""}`}
        >
          Reviews ({reviewCount})
        </button>
      </div>

      <Description show={showBlock === "description"} />
      <Reviews product={product} show={showBlock === "reviews"} />
    </div>
  );
};

export default ProductInfoTabs;