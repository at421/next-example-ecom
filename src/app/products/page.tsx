import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";

export const metadata = {
  title: 'Products',
  description: 'View all our amazing products',
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