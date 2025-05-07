import ShoppingCart from "@/components/shopping-cart";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View and manage your shopping cart.',
}

const CartPage = () => {
  return (
    <ShoppingCart />
  );
};

export default CartPage;