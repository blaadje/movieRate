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
  insertResourceByType,
  RESOURCE_CREATE,
  RESOURCE_ERROR,
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
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
          item: result,
          meta,
        })
      }

      if (relationShip) {
        for (let index = 0; index < result.length - 1; index++) {
          const item = result[index]

          yield put({
            type: insertResourceByType(relationShip),
            relationShip: resourceType,
            resourceId,
            item,
          })
        }
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
        type: insertResourceByType(resourceType),
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
      yield call(localRequest, resourceType, resource, {
        method: 'POST',
      })

      yield put({
        type: insertResourceByType(resourceType),
        item: resource,
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

  yield all([
    takeLatest(RESOURCE_FETCHING, handleFetchResource),
    takeLatest(RESOURCE_FETCHING_MORE, handleFetchMoreResource),
    takeLatest(RESOURCE_CREATE, handleCreateResource),
  ])
}
