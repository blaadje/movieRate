import axios from 'axios'

import { Movie } from 'core/model'
import { API_BASE, API_KEY } from 'settings'

export default function request (args: string, options: any): Promise<Movie> {
  return axios.get(`${API_BASE}/${args}?api_key=${API_KEY}`).then((response) => {
    return response.data.results || response.data
  }).catch((error) => {
    throw error
  })
}
