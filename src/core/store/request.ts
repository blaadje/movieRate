import axios from 'axios'

import { API_BASE_URL, API_KEY } from 'settings'

interface SegmentProps {
  parameter?: string
  relationShip?: string
  id?: string
}

export interface RequestOptionsProps {
  segment?: SegmentProps
  query?: object
}

export default async function request(
  url: string,
  { segment = {}, query }: RequestOptionsProps
): Promise<any> {
  const { parameter = '', relationShip = '', id = '' } = segment
  const segments = ['3', url, relationShip || id, parameter]

  const createUrl = API_BASE_URL.clone()
    .segment(segments)
    .query({
      api_key: API_KEY,
      ...(query && { ...query }),
    })
    .toString()

  try {
    const { data } = await axios.get(createUrl)

    return data.results || data
  } catch (error) {
    console.error(error)
  }
}
