import { Action } from 'redux'
import {
  all,
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'

import {
  allowedTypes,
  insertResourcesByType,
  insertResourceByType,
  MOVIE,
  RESOURCE_CREATE,
  RESOURCE_ERROR,
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
  RESOURCES_LOAD_FROM_DB,
  TV,
} from '../../constants'
import { apiRequest, localRequest } from '../../request/'
import { callList, createCache, getPreviousCallId, isCached } from './utils'

interface OptionsProp {
  parameter?: string
  queries?: object
}

export interface ApiFetchProps {
  type: string
  fetchMore: boolean
  resourceType: allowedTypes
  resourceId?: string
  relationShip?: allowedTypes
  relationShipId?: string
  ignoreCall: boolean
  createResource: boolean
  resourceValues?: any
  id?: string
  options?: OptionsProp
  meta: object
}

export default function* applicationSaga(): Iterator<any> {
  function* makeCall(
    params: ApiFetchProps
  ): Iterator<CallEffect | PutEffect<Action>> {
    const {
      resourceType,
      resourceId,
      resourceValues,
      createResource,
      relationShip,
      relationShipId,
      options = {},
      meta,
    } = params
    const { parameter, queries } = options

    try {
      const result: any = yield call(apiRequest, resourceType, {
        method: 'GET',
        segment: { parameter, relationShip, resourceId, relationShipId },
        queries,
      }) || []

      if (createResource) {
        yield put({
          type: insertResourceByType(resourceType),
          relationShip,
          resourceValues,
          result,
          meta,
        })
      }

      if (relationShip) {
        yield put({
          type: insertResourcesByType(relationShip),
          relationShip: resourceType,
          resourceId,
          result,
        })
      }
    } catch (error) {
      yield put({
        type: RESOURCE_ERROR,
        error: true,
        payload: error,
        meta,
      })
    }
  }

  function* handleFetchMoreResource(params: ApiFetchProps) {
    const { page } = callList[getPreviousCallId(params)]

    yield makeCall({
      ...params,
      options: {
        ...params.options,
        queries: { ...(params.options && params.options.queries), page },
      },
    })
  }

  function* handleFetchResource(params: ApiFetchProps) {
    const {
      resourceType,
      resourceValues,
      relationShip,
      meta,
      ignoreCall,
    } = params
    const avoidMakeCall = isCached(params) || ignoreCall
    const resourceValueToUpdate = resourceValues !== undefined

    if (resourceValueToUpdate && avoidMakeCall) {
      return yield put({
        type: insertResourcesByType(resourceType),
        relationShip,
        resourceValues,
        meta,
      })
    }

    if (avoidMakeCall) {
      return
    }

    yield makeCall(params)

    createCache(params)
  }

  function* handleCreateResource(params: any) {
    const { ignoreCall, resourceType, resource, meta } = params
    if (isCached(params) || ignoreCall) {
      return
    }

    try {
      yield call(
        localRequest,
        resourceType,
        {
          method: 'POST',
        },
        resource
      )

      yield put({
        type: insertResourceByType(resourceType),
        result: resource,
        meta,
      })
    } catch (error) {
      yield put({
        type: RESOURCE_ERROR,
        error: true,
        payload: error,
        meta,
      })
    }
  }

  function* handleLoadResourcesFromDb({ meta }: any) {
    function* getMovies() {
      const result = yield call(localRequest, MOVIE, {
        method: 'GET',
      })

      yield put({
        type: insertResourcesByType(MOVIE),
        result,
        meta,
      })
    }
    function* getTvs() {
      const result = yield call(localRequest, TV, {
        method: 'GET',
      })

      yield put({
        type: insertResourcesByType(TV),
        result,
        meta,
      })
    }
    yield all([getMovies(), getTvs()])
  }

  yield all([
    takeLatest(RESOURCES_LOAD_FROM_DB, handleLoadResourcesFromDb),
    takeLatest(RESOURCE_FETCHING, handleFetchResource),
    takeLatest(RESOURCE_FETCHING_MORE, handleFetchMoreResource),
    takeLatest(RESOURCE_CREATE, handleCreateResource),
  ])
}
