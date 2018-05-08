export function moviesFetch (result: any) {
  return {
    type: 'MOVIES_FETCH',
    result: result.data
  }
}