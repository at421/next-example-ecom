'use client';

import { useState } from "react";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Description from "@/components/product-single/description";
import Gallery from "@/components/product-single/gallery";
import Reviews from "@/components/product-single/reviews";
import ProductsFeatured from "@/components/products-featured";
// types
import type { ProductType } from "@/types";

type ProductClientPageProps = {
  product: ProductType;
};

const ProductClientPage = ({ product }: ProductClientPageProps) => {
  const [showBlock, setShowBlock] = useState("description");

  return (
    <>
      <Breadcrumb />

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
                Reviews (2) {/* Note: Hardcoded (2) might need dynamic update */}
              </button>
            </div>

            <Description show={showBlock === "description"} />
            <Reviews product={product} show={showBlock === "reviews"} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        {/* ProductsFeatured seems misplaced here, might belong in a layout or different section */}
        <ProductsFeatured />
      </div>
      {/* Footer seems misplaced here, typically belongs in the root layout */}
      <Footer />
    </>
  );
};

export default ProductClientPage;