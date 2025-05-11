'use client';

import Link from "next/link";
import useSwr from "swr";

import ProductsCarousel from "./carousel";
import { IProduct } from "@/types"; // Assuming IProduct type is defined here based on project structure

const ProductsFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSwr<IProduct[]>("/api/products", fetcher); // Assuming data is an array of products

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <Link href="/products" className="btn btn--rounded btn--border">
            Show All
          </Link>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  );
};

export default ProductsFeatured;