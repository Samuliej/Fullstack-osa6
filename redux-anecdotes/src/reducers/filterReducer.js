const filterReducer = (state = null, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'FILTER_BY':
      return action.payload
    default: return state
  }
}

export const filterChange = filter => {
  return {
    type: 'FILTER_BY',
    payload: filter
  }
}

export default filterReducer