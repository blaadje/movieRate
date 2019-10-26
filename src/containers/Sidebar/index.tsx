import * as React from 'react'

import './index.scss'
import Link from 'components/Link'
import Icon from 'components/Icon'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="Sidebar-wrapper">
        <header className="Sidebar-header">
          <strong>Movie Rate</strong>
          <Icon glyph="stars" />
        </header>
        <nav className="Sidebar-nav">
          <ul>
            <li>
              <Link
                exact={!window.location.pathname.includes('index.html')}
                to="/"
              >
                <Icon className="navIcon" glyph="clock" />
                <span>Trends</span>
              </Link>
            </li>
            <li>
              <Link to="/seen">
                <Icon className="navIcon" glyph="seen" />
                <span>Movie seen</span>
              </Link>
            </li>
            <li>
              <Link to="/playlist">
                <Icon className="navIcon" glyph="playlist" />
                <span>Playlist</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
