import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Sidebar from 'containers/Sidebar'
import Trends from 'containers/Trends'
import Seen from 'containers/Seen'
import Playlist from 'containers/Playlist'

import store from 'core/store'

import { Gradient } from './Gradient'
import './index.scss'

const App: React.SFC = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Sidebar />
        <Gradient>
          <Switch>
            <Route path='/' exact={!window.location.pathname.includes('index.html')} component={Trends} />
            <Route path='/seen' component={Seen} />
            <Route path='/playlist' component={Playlist} />
          </Switch>
        </Gradient>
      </React.Fragment>
    </Provider>
  )
}

export default App
