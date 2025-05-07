import Breadcrumb from '@/components/breadcrumb';
import Footer from '@/components/footer';
import ProductClient from '@/components/product-single/ProductClient'; // Import the new Client Component
import ProductsFeatured from '@/components/products-featured';
import type { ProductType } from '@/types';
import { server } from '@/utils/server'; // Use @/ alias

// Metadata function (Server Component only)
export async function generateMetadata({
  params,
}: {
  params: { pid: string };
}) {
  const { pid } = params;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product: ProductType = await res.json();

  return {
    title: product.name, // Example: Set title based on product name
    description: product.description, // Example: Set description
    // Add other metadata tags here (og:image, twitter:card, etc.)
  };
}

// Page component (Server Component by default)
const ProductPage = async ({ params }: { params: { pid: string } }) => {
  const { pid } = params;

  // Fetch data directly in the Server Component
  const res = await fetch(`${server}/api/product/${pid}`);
  const product: ProductType = await res.json();

  if (!product) {
    // Handle case where product is not found, maybe redirect to 404
    // notFound(); // You would need to import notFound from 'next/navigation'
    return <div>Product not found</div>; // Or render a 404 component/message
  }

  return (
    <>
      <Breadcrumb />

      {/* Render the Client Component, passing the fetched data */}
      <ProductClient product={product} />

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;