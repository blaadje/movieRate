import * as React from 'react'
import * as redux from 'redux'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators, Store } from 'redux'
import * as actionCreators from 'core/actions'
import { connect, Provider } from 'react-redux'

import Sidebar from 'containers/Sidebar'
import Trends from 'containers/Trends'
import Seen from 'containers/Seen'
import Playlist from 'containers/Playlist'

import store from 'core/store'

import { Gradient } from './Gradient'
import './index.scss'

interface AppProps {
  dispatch: redux.Dispatch
}

const mapStateToProps = (state: any): any => ({
  result: state.datas.result
})


function mapDispachToProps(dispatch: redux.Dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const App: React.SFC = () => {
  return (
    <>
      <Sidebar />
      <Gradient>
        <Switch>
          <Route path='/' exact={!window.location.pathname.includes('index.html')} component={Trends} />
          <Route path='/seen' component={Seen} />
          <Route path='/playlist' component={Playlist} />
        </Switch>
      </Gradient>
    </>
  )
}

connect(mapStateToProps, mapDispachToProps)(App)

const AppWrapper: React.SFC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper
