import * as React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import ErrorManager from 'containers/ErrorManager'
import Sidebar from 'containers/Sidebar'
import Playlist from 'views/Playlist'
import Seen from 'views/Seen'
import Trends from 'views/Trends'

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
            <Route path='/seen' component={Seen as any} />
            <Route path='/playlist' component={Playlist as any} />
          </Switch>
        </ContentWrapper>
      </div>
    </Provider>
  )
}

export default App
