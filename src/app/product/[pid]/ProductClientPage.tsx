'use client';

import { useState } from "react";

import Content from "@/components/product-single/content";
import Description from "@/components/product-single/description";
import Gallery from "@/components/product-single/gallery";
import Reviews from "@/components/product-single/reviews";
// types
import type { ProductType } from "@/types";

type ProductClientPageProps = {
  product: ProductType;
};

const ProductClientPage = ({ product }: ProductClientPageProps) => {
  const [showBlock, setShowBlock] = useState("description");

  return (
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

          <Description show={showBlock === "description"} />
          <Reviews product={product} show={showBlock === "reviews"} />
        </div>
      </div>
    </section>
  );
};

export default ProductClientPage;