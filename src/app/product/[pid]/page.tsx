import Breadcrumb from "@/components/breadcrumb";
import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductInfo from "@/components/product-single/info";
import ProductsFeatured from "@/components/products-featured";
import type { ProductType } from "@/types";
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { pid: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product/${params.pid}`);

  if (!res.ok) {
     return {
        title: 'Product Not Found',
        description: 'This product does not exist.'
     };
  }

  const product: ProductType = await res.json();

  return {
    title: product.name || 'Product Details',
    description: product.description?.substring(0, 150) || 'Learn more about this product.',
  };
}

const ProductPage = async ({ params }: { params: { pid: string } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product/${params.pid}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    notFound();
  }

  const product: ProductType = await res.json();

  return (
    <>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          <ProductInfo product={product} />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
    </>
  );
};

export default ProductPage;