'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Description from "@/components/product-single/description";
import Gallery from "@/components/product-single/gallery";
import Reviews from "@/components/product-single/reviews";
import ProductsFeatured from "@/components/products-featured";
// types
import type { ProductType } from "@/types";

const ProductPage = () => {
  const router = useRouter();
  const { pid } = router.params;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBlock, setShowBlock] = useState("description");

  useEffect(() => {
    if (pid) {
      setLoading(true);
      fetch(`/api/product/${pid}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch product:", error);
          setLoading(false);
          // Optionally handle error state or redirect to 404
        });
    }
  }, [pid]);

  if (loading) {
    // You might want a better loading indicator
    return <div>Loading...</div>;
  }

  if (!product) {
    // You might want a better error/not found message or redirect
    return <div>Product not found.</div>;
  }

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
                Reviews (2)
              </button>
            </div>

            {showBlock === "description" && <Description />}
            {showBlock === "reviews" && <Reviews product={product} />}
          </div>
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