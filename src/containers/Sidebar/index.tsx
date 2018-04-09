import * as React from 'react'
import { NavLink } from 'react-router-dom'

import Svg from 'react-inlinesvg'

import * as stars from 'images/Stars.svg'
import * as clock from 'images/clock.svg'
import * as playlist from 'images/playlist.svg'
import * as seen from 'images/seen.svg'

import './index.scss'

export default class Sidebar extends React.Component {
  render () {
    return (
      <div className='Sidebar-wrapper'>
        <header>
          <strong>Movie Rate</strong>
          <img src={stars} />
        </header>
        <nav>
          <ul>
            <li>
              <NavLink to='/trends' activeClassName='isActive'>
                <Svg className='navIcon' src={clock} />
                <span>Trends</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/seen' activeClassName='isActive'>
                <Svg className='navIcon' src={seen} />
                <span>Movie seen</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/playlist' activeClassName='isActive'>
                <Svg className='navIcon' src={playlist} />
                <span>Playlist</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
