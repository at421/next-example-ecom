import { Metadata } from 'next';
import Breadcrumb from "@/components/breadcrumb";
import ProductsFeatured from "@/components/products-featured";
import ProductClient from "@/components/product-single/ProductClient";
import type { ProductType } from "@/types";

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${pid}`, {
      next: { revalidate: 3600 } // Revalidate data every hour
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // For 404s, consider using notFound() from next/navigation
      console.error(`Failed to fetch product ${pid}: ${res.status}`);
      return null;
    }

    const product = await res.json();
    return product as ProductType;
  } catch (error) {
    console.error(`Error fetching product ${pid}:`, error);
    return null;
  }
}

type Props = {
  params: { pid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.pid);

  return {
    title: product ? product.name : 'Product Not Found',
    description: product ? product.description : 'Details for the product',
    // Add other metadata like Open Graph, etc.
  };
}


export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.pid);

  if (!product) {
    // Handle case where product is not found, e.g., return a 404 component
    // For simplicity, we might throw an error or return null,
    // but a dedicated not-found page is better.
    // For now, let's render a basic message or use next/navigation's notFound()
     // notFound(); // Uncomment and import notFound if you have app/product/[pid]/not-found.tsx
     return <div>Product not found</div>; // Basic fallback
  }

  return (
    <>
      <Breadcrumb />

      {/* The main product section is rendered here */}
      <section className="product-single">
        <div className="container">
           {/* ProductClient handles the interactive parts */}
          <ProductClient product={product} />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      {/* Footer is likely handled by a global layout */}
      {/* <Footer /> */}
    </>
  );
}