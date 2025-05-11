import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
import ProductInfoTabs from "./components/ProductInfoTabs"; // New Client Component
// types
import type { ProductType } from "@/types";

import { server } from "@/utils/server";

type ProductPageProps = {
  params: {
    pid: string;
  };
};

// Metadata is exported directly from the page
export async function generateMetadata({ params }: ProductPageProps) {
  const { pid } = params;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product: ProductType = await res.json();

  return {
    title: product.name,
    description: product.description,
    // Add other metadata like Open Graph, etc.
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { pid } = params;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product: ProductType = await res.json();

  // Assuming product is found, handle not found case if necessary in a real app
  // if (!product) { notFound(); }

  return (
    <>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          {/* Client Component handles the interactive tabs */}
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

// --- app/product/[pid]/components/ProductInfoTabs.tsx ---
"use client";

import { useState } from "react";

import Description from "@/components/product-single/description";
import Reviews from "@/components/product-single/reviews";

import type { ProductType } from "@/types";

type ProductInfoTabsProps = {
  product: ProductType;
};

const ProductInfoTabs = ({ product }: ProductInfoTabsProps) => {
  const [showBlock, setShowBlock] = useState("description");

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
          Reviews (2)
        </button>
      </div>

      <Description show={showBlock === "description"} />
      <Reviews product={product} show={showBlock === "reviews"} />
    </div>
  );
};

export default ProductInfoTabs;