import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsFeatured from "@/components/products-featured";
import ProductDetailsClient from "@/components/product-single/ProductDetailsClient";
import type { ProductType } from "@/types";
import { notFound } from "next/navigation";

// Define metadata for the page
export async function generateMetadata({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/product/${pid}`);

  if (!res.ok) {
      // Handle error or return default metadata if product not found for metadata
      return {
          title: 'Product Not Found',
      };
  }

  const product: ProductType = await res.json();

  return {
    title: product.name, // Use product name for the title
    description: product.description,
    // Add more metadata fields as needed (og:image, twitter:card, etc.)
  };
}


async function getProduct(pid: string): Promise<ProductType | null> {
  try {
    // Fetch data directly in the server component
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/product/${pid}`, {
      next: { revalidate: 3600 } // Revalidate data every hour
    });

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

const ProductPage = async ({ params }: { params: { pid: string } }) => {
  const { pid } = params;
  const product = await getProduct(pid);

  if (!product) {
    // If product is not found, render the not-found page
    notFound();
  }

  return (
    <>
      <Breadcrumb />

      <ProductDetailsClient product={product} />

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;