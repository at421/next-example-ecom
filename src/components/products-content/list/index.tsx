'use client';

import type { ProductTypeList } from "@/types";

import ProductItem from "../../product-item";
// ProductsLoading is likely handled by the parent Server Component now
// if it fetches data before rendering this component.
// If needed for client-side partial loading or suspense, keep it.
// Assuming parent handles initial loading, removing internal loading check.
// import ProductsLoading from "./loading";


interface ProductsContentProps {
  products: ProductTypeList[];
}

const ProductsContent: React.FC<ProductsContentProps> = ({ products }) => {

  // Data fetching is now assumed to be done by a parent Server Component
  // and passed down as the 'products' prop.
  // useSwr logic is removed.

  // Error handling for server fetching is also done by the parent.
  // This component just renders the provided data.

  // If products array is empty, maybe show a "No products found" message?
  // Original code didn't explicitly handle empty array vs loading=null.
  // Assuming an empty array means no products, not a loading state.
  if (!products || products.length === 0) {
      // Optionally render a message or null if no products
      return null; // Or <div>No products found.</div>;
  }


  return (
    <section className="products-list">
      {products.map((item: ProductTypeList) => (
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