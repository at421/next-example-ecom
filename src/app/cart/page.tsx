import ShoppingCart from "@/components/shopping-cart";

export const metadata = {
  title: 'Shopping Cart',
  description: 'View and manage your shopping cart items.',
};

const CartPage = () => {
  return (
    <ShoppingCart />
  );
};

export default CartPage;