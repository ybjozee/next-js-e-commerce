import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartVisibility] = useState(false);

  const removeAllItemsFromCart = () => {
    setCart([]);
  };

  const showCart = () => {
    setCartVisibility(true);
  };

  const hideCart = () => {
    setCartVisibility(false);
  };

  const toggleCartVisibility = () => {
    setCartVisibility(oldVisibility => !oldVisibility);
  };

  const findOrderInCart = productId => cart.find(({ id }) => id === productId);

  const updateOrderQuantity = (productId, newQuantity) => {
    const predicate = ({ id }) => id === productId;

    setCart(oldCart => {
      const order = oldCart.find(predicate);
      order.quantity = newQuantity;
      const orderIndex = oldCart.findIndex(predicate);
      const newCart = [...oldCart];
      newCart[orderIndex] = order;
      return newCart;
    });
  };

  const addOrderToCart = order => {
    const orderInCart = findOrderInCart(order.id);
    if (!orderInCart) {
      setCart(oldCart => [...oldCart, order]);
    } else {
      const newOrderQuantity = orderInCart.quantity + order.quantity;
      updateOrderQuantity(order.id, newOrderQuantity);
    }
    showCart();
  };

  const removeOrderFromCart = productId => {
    setCart(oldCart => oldCart.filter(({ id }) => id !== productId));
    showCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addOrderToCart,
        findOrderInCart,
        removeOrderFromCart,
        updateOrderQuantity,
        cartOpen,
        showCart,
        hideCart,
        toggleCartVisibility,
        removeAllItemsFromCart
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export default CartContextProvider;