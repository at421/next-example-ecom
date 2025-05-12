import ShoppingCart from "@/components/shopping-cart";

export const metadata = {
  title: 'Shopping Cart', // Or a more dynamic title if needed
  description: 'View and manage items in your shopping cart.',
};

const CartPage = () => {
  return (
    <>
      <ShoppingCart />
    </>
  );
};

export default CartPage;