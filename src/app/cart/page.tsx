import ShoppingCart from "@/components/shopping-cart";

export const metadata = {
  title: 'Cart',
  description: 'View and manage your shopping cart',
};

const CartPage = () => {
  return (
    <>
      <ShoppingCart />
    </>
  );
};

export default CartPage;