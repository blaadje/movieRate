import axios from 'axios'

import { Movie } from 'core/model'
import { API_BASE, API_KEY } from 'settings'

export default function request(args: string): any {
  return axios.get(`${API_BASE}/${args}/?api_key=${API_KEY}`).then((response) => {
    return response.data.results
  }).catch((error) => {
    return error
  })
}