import axios from 'axios'

import { API_BASE_URL, API_KEY } from 'settings'

interface RequestOptions {
  category: string,
  query: object
}

export default function request (args: string, options: any): Promise<any>{
  const { category, query }: RequestOptions = options
  const url = API_BASE_URL
    .clone()
    .segment(category)
    .segment(args)
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
