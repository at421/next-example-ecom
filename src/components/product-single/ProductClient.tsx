'use client';

import { useState } from "react";

import Content from "@/components/product-single/content";
import Description from "@/components/product-single/description";
import Gallery from "@/components/product-single/gallery";
import Reviews from "@/components/product-single/reviews";
import ProductsFeatured from "@/components/products-featured";
// types
import type { ProductType } from "@/types";

type ProductPageType = {
  product: ProductType;
};

const ProductClient = ({ product }: ProductPageType) => {
  const [showBlock, setShowBlock] = useState("description");

  if (!product) {
      // This component expects a product, handle null case if not already done by parent
      return null; // Or render an error state
  }

  return (
    <>
      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

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

            {/* Render Description and Reviews conditionally based on state */}
            {showBlock === "description" && <Description show={true} />}
            {showBlock === "reviews" && <Reviews product={product} show={true} />}
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
    </>
  );
};

export default ProductClient;