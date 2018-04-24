import * as React from 'react'

import List from 'containers/List'

// import './index.scss'

export default class Seen extends React.Component {
  render () {
    const collection = [
      {
        title: 'ma playlist'
      },
      {
        title: 'ma playlist2'
      }
    ]
    return (
      <div className='Document-wrapper'>
        <List collection={collection} />
      </div>
    )
  }
}
