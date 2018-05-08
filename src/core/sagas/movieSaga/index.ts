import { put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios'


export default function* movieSaga () {
  function getDatas() {
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=9a216746b14d5069ec45091058ad259b')
    .then((response) => {
      return response.data.results
    })
    .catch(function (error) {
      console.log(error) // eslint-disable-line no-console
    })
  }
  
  function* callGetDatas() {
    const result = yield call(getDatas)
    if (result.status === 200) {
      console.log(result)
      yield put({ type: 'MOVIES_FETCH', status: 'success', result })
    } else {
      console.error(result)
    }
  }
  
  yield [
    takeLatest('MOVIES_FETCH', callGetDatas)
  ]
}