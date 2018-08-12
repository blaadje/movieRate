import * as React from 'react'
import { connect } from 'react-redux'
import { flow } from 'lodash'

import List from 'components/List'

// import './index.scss'

class Seen extends React.Component<{}, {}> {
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

export default flow(
  connect()
)(Seen)
