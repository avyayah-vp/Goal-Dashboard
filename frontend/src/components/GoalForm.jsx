import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          {/* <label htmlFor='text'>Goal</label> */}
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your goals go here..."
          />
        </div>
        <div className='form-group'>
        <button type="submit" className="button">
              Add Goal
              <div class="button__horizontal"></div>
              <div class="button__vertical"></div>
            </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
