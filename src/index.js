import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './assets/style/application.scss'

const render = () => {
  const Application = require('./containers/Application').default
  const BrowserRouter = require('react-router-dom').BrowserRouter

  ReactDOM.render((
    <AppContainer>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </AppContainer>), document.getElementById('root')
  )
}

render()
if (module.hot) module.hot.accept(render)
