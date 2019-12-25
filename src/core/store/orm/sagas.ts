import { Action } from 'redux'
import {
  all,
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'

import { uuid } from '@core/utils'

import {
  allowedTypes,
  createResourceByType,
  RESOURCE_ERROR,
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
} from '../constants'
import request from '../request'

interface OptionsProp {
  parameter?: string
  queries?: object
}

interface ApiFetchProps {
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

interface CallListProps {
  [id: string]: {
    page: number
    params: object
    id: string
  }
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
      const result = yield call(request, resourceType, {
        segment: { parameter, relationShip, resourceId, relationShipId },
        queries,
      })

      if (createResource) {
        yield put({
          type: createResourceByType(resourceType),
          relationShip,
          resourceValues,
          result,
          meta,
        })
      }

      if (relationShip) {
        yield put({
          type: createResourceByType(relationShip),
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

  const requestCallParams: object[] = []

  const compareObjects = (firstObject: object, secondObject: object) =>
    JSON.stringify(firstObject) === JSON.stringify(secondObject)

  const isCached = (params: ApiFetchProps): any =>
    requestCallParams.some((item: any) => compareObjects(item, params))

  const createCache = (params: ApiFetchProps) => requestCallParams.push(params)

  const callList: CallListProps = {}

  function* handleFetchMoreResource(params: ApiFetchProps) {
    const getPreviousCallId = (): string => {
      const [previousCallId]: any = Object.entries(
        callList
      ).find(([key, value]) => compareObjects(value.params, params)) || [false]

      if (!previousCallId) {
        const id = uuid()
        const initialPage = 2

        callList[id] = {
          page: initialPage,
          params,
          id,
        }

        return id
      }

      callList[previousCallId].page = callList[previousCallId].page + 1

      return previousCallId
    }

    const { page } = callList[getPreviousCallId()]

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
        type: createResourceByType(resourceType),
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

  yield all([
    takeLatest(RESOURCE_FETCHING, handleFetchResource),
    takeLatest(RESOURCE_FETCHING_MORE, handleFetchMoreResource),
  ])
}
