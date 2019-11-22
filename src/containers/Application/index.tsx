import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

// import ErrorManager from '@containers/ErrorManager'
import Sidebar from '@containers/Sidebar'
import store from '@core/store'
import Discover from '@views/Discover/Discover'
import Playlist from '@views/Playlist'
import Seen from '@views/Seen'
import Trending from '@views/Trending'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4 {
    padding: 0;
    margin: 0
  }

  body {
    font-family: ${({ theme }: any) => theme.fontFamily};
    height: 100vh;
    width: 100%;
    font-weight: 700;
    margin: 0;
    padding: 0;
    background: rgb(49, 87, 108);
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
  padding: ${({ theme }) => theme.spacing.XXL};
  overflow: auto;
  display: inline-block;
  vertical-align: top;
  background: linear-gradient(
    to left,
    rgba(20, 37, 49, 1) 0%,
    rgba(20, 37, 49, 0.95) 5%,
    rgba(20, 37, 49, 0.9) 15%,
    rgba(20, 37, 49, 0.85) 35%,
    rgba(20, 37, 49, 0.98) 87%
  );
`
const AppWrapper = styled.div`
  display: flex;
`

const App: React.FunctionComponent = () => (
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
      </AppWrapper>
    </Provider>
  </ThemeProvider>
)

export default App
