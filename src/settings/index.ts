import URI from 'urijs'

export const API_BASE_URL: uri.URI = new URI('https://api.themoviedb.org')
export const API_KEY: string = '9a216746b14d5069ec45091058ad259b'
export const API_IMAGE_LINK: uri.URI = new URI(
  'https://image.tmdb.org/t/p/w200'
)
export const API_POSTER_LINK: uri.URI = new URI(
  'https://image.tmdb.org/t/p/w1400_and_h450_face'
)
