import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = ({ id, onAddToCart }) => {
  const [formIsValid, setFormIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    if (
      enteredAmount.length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setFormIsValid(false)
      return
    }

    onAddToCart(enteredAmountNumber)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: `amount_${id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
      {!formIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm
