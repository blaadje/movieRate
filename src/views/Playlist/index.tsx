import * as React from 'react'
import { connect } from 'react-redux'
import { flow } from 'lodash'
// import './index.scss'

class Playlist extends React.Component {
  render () {
    return (
      <div>test1</div>
    )
  }
}

export default flow(
  connect()
)(Playlist)
