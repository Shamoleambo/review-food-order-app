import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
}
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount }
  } else if (action.type === 'REMOVE') {
    let updatedItems = state.items
    const itemToBeRemovedIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const itemToBeRemoved = state.items[itemToBeRemovedIndex]

    const updatedTotalAmount =
      state.totalAmount.toFixed(2) - itemToBeRemoved.price

    if (itemToBeRemoved.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      updatedItems[itemToBeRemovedIndex] = {
        ...itemToBeRemoved,
        amount: itemToBeRemoved.amount - 1
      }
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount }
  }
  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD', item })
  }

  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
