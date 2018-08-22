import * as React from 'react'

import Svg from 'react-inlinesvg'

import * as clock from 'images/clock.svg'
import * as playlist from 'images/playlist.svg'
import * as seen from 'images/seen.svg'
import * as stars from 'images/Stars.svg'

import './index.scss'
import Link from 'components/Link'

export default class Sidebar extends React.Component {
  render () {
    return (
      <div className='Sidebar-wrapper'>
        <header className='Sidebar-header'>
          <strong>Movie Rate</strong>
          <img src={stars} />
        </header>
        <nav className='Sidebar-nav'>
          <ul>
            <li>
              <Link exact={!window.location.pathname.includes('index.html')} to='/'>
                <Svg className='navIcon' src={clock} />
                <span>Trends</span>
              </Link>
            </li>
            <li>
              <Link to='/seen'>
                <Svg className='navIcon' src={seen} />
                <span>Movie seen</span>
              </Link>
            </li>
            <li>
              <Link to='/playlist'>
                <Svg className='navIcon' src={playlist} />
                <span>Playlist</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
