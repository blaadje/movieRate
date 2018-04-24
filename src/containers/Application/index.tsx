import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Sidebar from 'containers/Sidebar'
import Trends from 'containers/Trends'
import Seen from 'containers/Seen'
import Playlist from 'containers/Playlist'

import { Gradient } from './Gradient'
import './index.scss'

export default class Application extends React.Component {
  render () {
    return (
      <div>
        <Sidebar />
        <Gradient>
          <Switch>
            <Route path='/' exact={!window.location.pathname.includes('index.html')} component={Trends} />
            <Route path='/seen' component={Seen} />
            <Route path='/playlist' component={Playlist} />
          </Switch>
        </Gradient>
      </div>
    )
  }
}
