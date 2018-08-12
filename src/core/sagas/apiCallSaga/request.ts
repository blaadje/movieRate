import axios from 'axios'

import { API_BASE_URL, API_KEY } from 'settings'

interface RequestOptions {
  segment: string,
  query: object
}

export default function request (args: string, options: RequestOptions): Promise<any> {
  const { segment, query }: RequestOptions = options
  const url = API_BASE_URL
    .clone()
    .segment(args)
    .segment(segment)
    .query({
      ...{ api_key: API_KEY },
      ...query
    })
    .toString()

  return axios.get(url).then((response) => {
    return response.data.results || response.data
  }).catch((error) => {
    throw error
  })
}
