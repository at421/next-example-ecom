import Breadcrumb from "@/components/breadcrumb";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our range of products',
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