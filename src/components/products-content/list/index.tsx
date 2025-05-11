'use client';

import useSwr from "swr";

import type { ProductTypeList } from "@/types";

import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr<ProductTypeList[]>("/api/products", fetcher);

  if (error) return <div>Failed to load products</div>; // Adjusted error message
  if (!data) return <ProductsLoading />; // Render loading state while data is fetching

  return (
    <section className="products-list">
      {data.map((item) => (
        <ProductItem
          id={item.id}
          name={item.name}
          price={item.price}
          color={item.color}
          currentPrice={item.currentPrice}
          key={item.id}
          images={item.images}
        />
      ))}
    </section>
  );
};

export default ProductsContent;