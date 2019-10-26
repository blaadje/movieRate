export const MOVIES_INITIAL = [
  {
    id: 29387,
    adult: false,
    backdrop_path: 'foo',
    genre_ids: [1, 2, 3],
    original_language: 'bar',
    original_title: 'baz',
    overview: 'lorem',
    popularity: 5,
    poster_path: 'foobar',
    release_date: 'test',
    title: 'test2',
    video: false,
    categoryId: '0',
    vote_average: 1,
    vote_count: 2
  },
  {
    id: 2343,
    adult: true,
    backdrop_path: 'path',
    genre_ids: [1, 2, 3],
    original_language: 'eng',
    original_title: 'superman',
    overview: 'great movie',
    popularity: 1,
    poster_path: 'soeidj',
    release_date: 'teste',
    title: 'superman',
    video: false,
    categoryId: '0',
    vote_average: 1,
    vote_count: 2
  }
]

export const CATEGORIES_INITIAL = [
  {
    id: '0',
    type: 'movie',
    page: 1
  },
  {
    id: '1',
    type: 'tv',
    page: 1
  }
]
