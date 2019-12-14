import axios from 'axios'

import { API_BASE_URL, API_KEY } from '@settings'

interface SegmentProps {
  parameter?: string
  relationShip?: string
  resourceId?: string
  relationShipId?: string
}

export interface RequestOptionsProps {
  segment: SegmentProps
  queries?: object
}

export default async function request(
  resourceType: string,
  {
    segment: {
      parameter = '',
      relationShip = '',
      resourceId = '',
      relationShipId = '',
    },
    queries,
  }: RequestOptionsProps
): Promise<any> {
  const segments = [
    '3',
    ...(resourceType && [resourceType]),
    ...(resourceId && [resourceId]),
    ...(relationShip && [relationShip]),
    ...(relationShipId && [relationShipId]),
    ...(parameter && [parameter]),
  ]

  try {
    const createUrl = API_BASE_URL.clone()
      .segment(segments)
      .query({
        api_key: API_KEY,
        ...(queries && { ...queries }),
      })
      .toString()

    const { data } = await axios.get(createUrl)

    return data.results || data
  } catch (error) {
    console.error(error)
    if (error.response) {
      throw {
        code: error.response.data.status_code,
        message: error.response.data.status_message,
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error.message
    }
  }
}
