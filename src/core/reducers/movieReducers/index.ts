export default function getMovies (state = {}, action: any) {
  switch (action.type) {
    case 'MOVIES_FETCH':
      return {
        ...state, result: action.result
      }
    default:
      return state
  }
}