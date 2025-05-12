'use client';

import { useState } from 'react';
import Description from '@/components/product-single/description';
import Reviews from '@/components/product-single/reviews';
import type { ProductType } from '@/types';

type ProductInfoProps = {
  product: ProductType;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [showBlock, setShowBlock] = useState("description");

  const reviewCount = product.reviews?.length || 0;

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

      {showBlock === "description" && <Description />}
      {showBlock === "reviews" && <Reviews product={product} show={true} />}
    </div>
  );
};

export default ProductInfo;