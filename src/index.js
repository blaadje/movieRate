import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

const render = () => {
  const Application = require('@containers/Application').default
  const HashRouter = require('react-router-dom').HashRouter

  ReactDOM.render(
    <AppContainer>
      <HashRouter>
        <Application />
      </HashRouter>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()
if (module.hot) module.hot.accept(render)
