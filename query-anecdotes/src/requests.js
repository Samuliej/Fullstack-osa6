import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log('Error in getting anecdotes', error);
  }
}

// Muutin backendin käyttämään async awaitia
// Joten joudun itse tarkistamaan uuden anekdootin pituuden
export const createAnecdote = async newAnecdote => {
  if (newAnecdote.content.length < 5)
    throw new Error('Anecdote must be at least 5 characters long')

  try {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
  } catch (error) {
    return error.response.status
  }
}


export const updateAnecdote = async updatedAnecdote => {
  try {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
  } catch (error) {
    console.log('Error in updating anecdote', error)
  }
}