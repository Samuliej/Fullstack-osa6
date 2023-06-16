import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

// Component created on pushing 6.4, refactored Anecdotes -> AnecdoteList on 6.7

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content} <br />
      has {anecdote.votes}
      <button onClick={() => handleClick(anecdote)}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === null) {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
  })

  console.log(anecdotes)

  return(
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(vote(anecdote.id))}
          />
        )
      }
    </div>
  )
}

export default AnecdoteList