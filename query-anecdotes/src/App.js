import AnecdoteForm from './components/AnecdoteForm'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { useNotificationDispatch, useNotificationState } from './NotificationContext'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'

const App = () => {
  const notification = useNotificationState()
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `You voted for '${updatedAnecdote.content}'`
      })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      refetchOnWindowFocus: false,
      retry: 1
    }
  )

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
      <div>
        <h3>Anecdote app</h3>
        <Notification message={notification} />
        <AnecdoteForm />
        {anecdotes.map(anecdote => (
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />
        ))}
      </div>
  )
}

export default App
