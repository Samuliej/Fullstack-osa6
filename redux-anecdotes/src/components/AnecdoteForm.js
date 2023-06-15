import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

// Component created on pushing 6.4, refactored NewAnecdote -> AnecdoteForm on 6.7

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    // Get the value of the input field
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm