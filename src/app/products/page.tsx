import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";

export const metadata = {
  title: 'Products',
  description: 'Browse our collection of products',
};

const Products = () => (
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

export default Products;