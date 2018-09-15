import axios from 'axios'

import { API_BASE_URL, API_KEY } from 'settings'

interface QueryProps {
  query: string
}

export interface RequestOptionsProps {
  segment?: string,
  query?: QueryProps,
  url: string
}

export default function request (url: string, options: RequestOptionsProps): Promise<any> {
  const { segment, query }: RequestOptionsProps = options
  const makeUrl = API_BASE_URL
    .clone()
    .segment(url)
    .segment(segment as string)
    .query({
      ...{ api_key: API_KEY },
      ...(query && { ...query })
    })
    .toString()

  return axios.get(makeUrl).then((response) => {
    return response.data.results || response.data
  }).catch((error) => {
    throw error
  })
}
