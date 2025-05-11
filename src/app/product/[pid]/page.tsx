import type { ProductType } from "@/types";
import { server } from "@/utils/server";
import ProductClientPage from "@/components/product-single/ProductClientPage";
import type { Metadata } from 'next';

type ProductPageProps = {
  params: {
    pid: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const res = await fetch(`${server}/api/product/${params.pid}`);
  const product: ProductType = await res.json();

  return {
    title: product.name,
    description: product.description,
    // Add other metadata fields as needed, e.g., openGraph
    // openGraph: {
    //   images: [product.images[0]],
    // },
  };
}

const getProduct = async (pid: string): Promise<ProductType> => {
  const res = await fetch(`${server}/api/product/${pid}`);
  // Add error handling if needed, e.g., check res.ok, throw notFound()
  const product = await res.json();
  return product;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.pid);

  if (!product) {
    // Handle case where product is not found, e.g., redirect or show 404
    // For now, assume product is always found based on original getServerSideProps
    return <div>Product not found</div>;
  }

  return (
    <ProductClientPage product={product} />
  );
};

export default ProductPage;