import * as React from 'react'
import { Route } from 'react-router-dom'

import Sidebar from 'containers/Sidebar'
import Trends from 'containers/Trends'
import Seen from 'containers/Seen'
import Playlist from 'containers/Playlist'

import { Gradient } from './Gradient'
import './index.scss'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Sidebar />
        <Gradient>
          <Route path='/seen' component={Seen} />
          <Route path='/trends' component={Trends} />
          <Route path='/playlist' component={Playlist} />
        </Gradient>
      </div>
    )
  }
}
