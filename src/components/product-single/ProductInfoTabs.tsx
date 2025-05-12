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

  return (
    <>
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
          Reviews ({product?.reviews?.length || 0})
        </button>
      </div>

      <Description show={showBlock === "description"} />
      <Reviews product={product} show={showBlock === "reviews"} />
    </>
  );
};

export default ProductInfoTabs;