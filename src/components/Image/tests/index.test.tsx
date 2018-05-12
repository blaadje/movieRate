import Image from '../'

import * as React from 'react'
const renderer = require('react-test-renderer')

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Image
        className='bar'
        src='foo'
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
