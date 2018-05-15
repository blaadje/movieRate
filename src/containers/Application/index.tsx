import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Sidebar from 'containers/Sidebar'
import Trends from 'containers/Trends'
import Seen from 'containers/Seen'
import Playlist from 'containers/Playlist'
import ErrorManager from 'containers/ErrorManager'

import { Gradient } from './Gradient'
import './index.scss'

interface iProps {
  error?: any
}

interface iState {
  error: any
}

class App extends React.Component<iProps, iState> {
  constructor (props: iProps) {
    super(props)
    this.state = {
      error: null
    }
  }
  componentWillReceiveProps ({error}: any) {
    this.setState(error)
  }

  render () {
    const { error } = this.state

    return (
      <React.Fragment>
        {error &&
          <ErrorManager
            error={error}
            onClick={() => this.setState({ error: null })}
          />
        }
        <Sidebar />
        <Gradient>
          <Switch>
            <Route path='/' exact={!window.location.pathname.includes('index.html')} component={Trends} />
            <Route path='/seen' component={Seen} />
            <Route path='/playlist' component={Playlist} />
          </Switch>
        </Gradient>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    error: state.application
  }
}

export default flow(
  connect(mapStateToProps)
)(App)
