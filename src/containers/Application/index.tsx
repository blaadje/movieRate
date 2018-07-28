import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import ErrorManager from 'containers/ErrorManager'
import Sidebar from 'containers/Sidebar'
import Trends from 'containers/Trends'
import Seen from 'containers/Seen'
import Playlist from 'containers/Playlist'

import store from 'core/store'

import { ContentWrapper } from 'containers/Application/ContentWrapper'
import './index.scss'

const App: React.SFC = () => {
  return (
    <Provider store={store}>
      <div className='Application-wrapper'>
        <ErrorManager />
        <Sidebar />
        <ContentWrapper>
          <Switch>
            <Route path='/' exact={!window.location.pathname.includes('index.html')} component={Trends} />
            <Route path='/seen' component={Seen} />
            <Route path='/playlist' component={Playlist} />
          </Switch>
        </ContentWrapper>
      </div>
    </Provider>
  )
}

export default App
