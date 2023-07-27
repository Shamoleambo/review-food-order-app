import { useState, useContext, useEffect } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = ({ onClick }) => {
  const [btnIsHighlited, setBtnIsHighlighted] = useState(false)
  const ctx = useContext(CartContext)

  const { items } = ctx

  const amountOfCartItems = ctx.items.reduce((amount, item) => {
    return amount + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlited ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) return

    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [items])

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{amountOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
