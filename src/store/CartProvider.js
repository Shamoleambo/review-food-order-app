import CartContext from './cart-context'

const CartProvider = (props) => {
  const addItem = (item) => {}
  const removeItem = (id) => {}

  const cartContext = {
    items: [],
    amount: 0,
    addItem,
    removeItem
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
