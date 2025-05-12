import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
import ProductInfoTabs from "@/components/product-single/ProductInfoTabs"; // New Client Component

// types
import type { ProductType } from "@/types";
import { server } from "@/utils/server"; // Assuming utils is at the root

type ProductPageProps = {
  params: {
    pid: string;
  };
};

// Fetch data directly in the Server Component
async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) {
      // Handle HTTP errors
      console.error(`Error fetching product ${pid}: ${res.status}`);
      return null;
    }
    const product: ProductType = await res.json();
    return product;
  } catch (error) {
    console.error(`Failed to fetch product ${pid}:`, error);
    return null;
  }
}

// Metadata is exported directly from the Server Component page
export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.pid);

  return {
    title: product?.name || "Product",
    description: product?.description || "Product details",
    // Add other metadata like og:image, etc.
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  if (!product) {
    // Handle case where product is not found (e.g., return notFound())
    // For simplicity, returning null or an empty div here
    return null; // Or redirect, or show 404
  }

  return (
    <>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images.map(img => img.url)} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            {/* Render the new Client Component for tabs */}
            <ProductInfoTabs product={product} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      {/* Assuming Footer is a Server Component or can be rendered on server */}
      <Footer />
    </>
  );
};

export default ProductPage;