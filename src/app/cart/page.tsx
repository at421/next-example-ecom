import ShoppingCart from "@/components/shopping-cart";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage items in your shopping cart.',
};

const CartPage = () => {
  return (
    <ShoppingCart />
  );
};

export default CartPage;