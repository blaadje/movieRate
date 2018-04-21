import MovieItem from '../'

import * as React from 'react'
const renderer = require('react-test-renderer')

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MovieItem
        image='foo/bar'
        title='Pacific Rim'
        date='2018'
        rate={30}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
