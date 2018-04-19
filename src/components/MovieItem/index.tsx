import * as React from 'react'
import Svg from 'react-inlinesvg'

import * as checked from 'images/checked.svg'
import * as add from 'images/add.svg'

import BasePopper from 'components/Popper'

import './style.scss'

interface iProps {
  image: string,
  title: string,
  date: string,
  rate: number
}

interface iState {
  isHovered: Boolean
}

export default class MovieItem extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      isHovered: false
    }
  }
  render () {
    const { isHovered } = this.state
    const background: Object = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }

    return (
      <div
        className='Item-wrapper'
        style={{ background: `url(${this.props.image})`, ...background }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <div className='Item-filter'>
          <div
            className='Item-description'
          >
            <span className='Item-description--title'>{this.props.title}</span>
            <span className='Item-description--date'>{`(${this.props.date})`}</span>
            <span className='Item-description--rate'>{this.props.rate}</span>
          </div>
        </div>
        {/* {isHovered && */}
          <div className='Item-menu--wrapper'>
            <div className='Item-menu'>
              <div className='Item-menu--options Option-rate'>
                <BasePopper
                  popperPlacement='right'
                  targetComponent={
                    <Svg className='Option-image' src={checked} />
                  }
                  popperComponent={
                    <div>test2</div>
                  }
                />
              </div>
              <div className='Item-menu--options Option-playlist'>
                <Svg className='Option-image' src={add} />
              </div>
            </div>
          </div>
        }
      </div >
    )
  }
}
