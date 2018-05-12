export default function setMovies (state = {}, action: any) {
  switch (action.type) {
    case 'MOVIES_SET':
      return {
        ...state, result: action.result
      }
    default:
      return state
  }
}
