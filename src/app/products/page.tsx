import Breadcrumb from "@/components/breadcrumb";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";

export const metadata = {
  title: 'Products Page',
  description: 'Discover our wide range of products.',
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