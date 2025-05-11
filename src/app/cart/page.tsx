import ShoppingCart from "@/components/shopping-cart";

export const metadata = {
  title: 'Shopping Cart',
  description: 'Review your shopping cart items before checkout.',
};

const CartPage = () => {
  return (
    <>
      <ShoppingCart />
    </>
  );
};

export default CartPage;