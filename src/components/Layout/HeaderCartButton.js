import { useContext } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = ({ onClick }) => {
  const ctx = useContext(CartContext)

  const amountOfCartItems = ctx.items.reduce((amount, item) => {
    return amount + item.amount
  }, 0)

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{amountOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
