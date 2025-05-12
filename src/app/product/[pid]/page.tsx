import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
import ProductInfoTabs from "@/components/product-single/ProductInfoTabs"; // New Client Component
// Removed: import type { ProductType } from "@/types"; // Assuming the type definition is moved here
import { server } from "@/utils/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Added ProductType definition within this file as requested
interface ProductType {
  id: string | number; // Added property as requested
  thumb: string; // Added property as requested
  name: string;
  price: number; // Added property as requested
  count: number; // Added property as requested
  description: string; // Added property as requested
  images: string[]; // Assuming images is an array of strings based on usage
  // Add other properties that might be used by Content or ProductInfoTabs
  // For example: details: string; etc.
}

interface ProductPageProps {
  params: {
    pid: string;
  };
}

async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) {
      // Handle non-2xx responses, e.g., 404
      if (res.status === 404) {
        return null; // Product not found
      }
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.pid);

  if (!product) {
    // Fallback metadata or indicate not found
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.name,
    description: product.description,
    // Add other metadata like Open Graph, etc.
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images && product.images.length > 0 ? [{ url: product.images[0] }] : [],
    },
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  if (!product) {
    notFound(); // Use Next.js notFound helper for 404
  }

  return (
    <>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          {/* Client Component for interactive info tabs */}
          <ProductInfoTabs product={product} />

        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;