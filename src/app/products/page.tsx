import Breadcrumb from "@/components/breadcrumb";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'Browse our collection of products.',
};

const ProductsPage = () => {
  return (
    <>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter />
          <ProductsContent />
        </div>
      </section>
    </>
  );
};

export default ProductsPage;