'use client';

import { useState } from "react";
import Description from "./description";
import Reviews from "./reviews";
import type { ProductType } from "@/types";

interface ProductInfoTabsProps {
    product: ProductType;
}

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
          Reviews (2) {/* Note: Review count is hardcoded */}
        </button>
      </div>

      <Description show={showBlock === "description"} />
      <Reviews product={product} show={showBlock === "reviews"} />
    </div>
  );
};

export default ProductInfoTabs;