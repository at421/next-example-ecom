import Breadcrumb from "@/components/breadcrumb";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";

const Page = () => {
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

export default Page;