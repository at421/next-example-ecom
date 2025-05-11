import Breadcrumb from "@/components/breadcrumb";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import Footer from "@/components/footer";

export const metadata = {
  title: 'Products',
  description: 'View our collection of products',
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
      <Footer />
    </>
  );
};

export default ProductsPage;