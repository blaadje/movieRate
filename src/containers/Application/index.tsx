import FontFaceObserver from 'fontfaceobserver'
import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import Sidebar from '@containers/Sidebar'
import store from '@core/store'
import loadable from '@loadable/component'

import theme from './theme'

// import ErrorManager from '@containers/ErrorManager'

const Trending = loadable(() => import('@views/Trending'))
const Discover = loadable(() => import('@views/Discover'))
const Seen = loadable(() => import('@views/Seen'))
const Playlist = loadable(() => import('@views/Playlist'))

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4 {
    padding: 0;
    margin: 0
  }

  .fonts-loaded {
    body {
      display: block;
    }
  }

  body {
    font-family: ${({ theme }: any) => theme.fontFamily};
    display: none;
    height: 100vh;
    width: 100%;
    margin: 0;
    line-height: 99%;
    overflow: hidden;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    color: ${({ theme }: any) => theme.colors.white};
  }

  -webkit-scrollbar {
    width: ${rem('7px')};
    height: ${rem('7px')};
    border: none;
  }

  -webkit-scrollbar-thumb {
    border-radius: ${rem('10px')};
    background: ${({ theme }) => rgba(theme.colors.highlight, 0.07)};
    border: none;
  }
`

const GradientWrapper = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow()};
  height: 100vh;
  width: 100%;
  overflow: auto;
  display: inline-block;
  vertical-align: top;
  ${({ theme }) => theme.colors.gradient};
`

const AppWrapper = styled.div`
  z-index: 1;
  display: flex;
`

const PanelPortal = styled.div`
  z-index: 100;
`

const PopperPortal = styled.div`
  z-index: 100;
`

const App: React.FunctionComponent = () => {
  const LoadFont = async () => {
    try {
      const font = new FontFaceObserver('Catamaran')
      await font.load()

      document.documentElement.className += ' fonts-loaded'
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    LoadFont()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        {/* <ErrorManager /> */}
        <AppWrapper>
          <Sidebar />
          <GradientWrapper>
            <Route path="/seen" component={Seen as any} />
            <Route path="/discover" component={Discover as any} />
            <Route path="/playlist" component={Playlist as any} />
            <Route path="/" exact={true} component={Trending} />
          </GradientWrapper>
          <PopperPortal id="popper" />
          <PanelPortal id="panel" />
        </AppWrapper>
      </Provider>
    </ThemeProvider>
  )
}

export default App
