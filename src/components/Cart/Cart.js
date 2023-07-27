import { useContext } from 'react'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import classes from './Cart.module.css'

const Cart = ({ onHideCart }) => {
  const ctx = useContext(CartContext)

  const removeCartItemHandler = (id) => {}
  const addCartItemHandler = (item) => {}

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`
  const hasItems = ctx.items.length > 0
  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  return (
    <Modal onClickBackdrop={onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
