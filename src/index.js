import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import store from 'core/store'

import './assets/style/application.scss'

const render = () => {
  const Application = require('containers/Application').default
  const BrowserRouter = require('react-router-dom').BrowserRouter

  ReactDOM.render((
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Application />
        </BrowserRouter>
      </AppContainer>
    </Provider>), document.getElementById('root')
  )
}

render()
if (module.hot) module.hot.accept(render)
