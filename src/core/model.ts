export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: Array<number>
  id?: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  vide: boolean
  vote_average: number
  vote_count: number
};

export type IState = Movie[];