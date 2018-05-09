import { put, call, takeLatest, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'
import axios from 'axios'
import { Movie } from 'core/model';
import { Action } from 'redux';

const API_KEY: string = '9a216746b14d5069ec45091058ad259b'

export default function* movieSaga (): Iterator<ForkEffect[]> {
  function getDatas (): Promise<Array<Movie>> {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`).then((response) => {
        return response.data.results
      }).catch(function (error) {
        return error
      })
  }

  function* callGetDatas(): Iterator<CallEffect | PutEffect<Action>> {
    try {
      const result = yield call(getDatas)
      yield put({ type: 'MOVIES_SET', result })
    } 
    
    catch (error) {
      console.error(error)
    }
  }

  yield [
    takeLatest('MOVIES_FETCH', callGetDatas)
  ]
}