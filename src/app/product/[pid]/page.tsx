import type { ProductType } from "@/types";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsFeatured from "@/components/products-featured";
import ProductClientPage from "./ProductClientPage";

type ProductPageProps = {
  params: {
    pid: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/${params.pid}`);
  const product: ProductType = await res.json();

  return {
    title: product.name,
    description: product.description,
  };
}

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/${pid}`);
    if (!res.ok) {
      // Handle non-200 responses, perhaps throw an error or return null
      console.error(`Failed to fetch product ${pid}: ${res.status}`);
      return null;
    }
    const product: ProductType = await res.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product ${pid}:`, error);
    return null;
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  if (!product) {
    // Optionally handle the case where the product is not found
    // For example, redirect to a 404 page or return a specific UI
    // import { notFound } from 'next/navigation';
    // notFound();
    return <div>Product not found</div>; // Simple placeholder
  }

  return (
    <>
      <Breadcrumb product={product} /> {/* Assuming Breadcrumb can take product prop */}
      <ProductClientPage product={product} />
      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;