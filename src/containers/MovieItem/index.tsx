import * as React from 'react'
import Svg from 'react-inlinesvg'

import * as checked from 'images/checked.svg'
import * as add from 'images/add.svg'
import * as infos from 'images/information.svg'

import Rate from 'components/Rate'
import Image from 'components/Image'
import Popper from 'components/Popper'
import Form from 'containers/Form'
import List from 'containers/List'

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
    const collection = [
      {
        title: 'ma playlist'
      },
      {
        title: 'ma playlist2'
      }
    ]

    return (
      <Image
        className='Item-wrapper'
        src={this.props.image}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <div className='Item-filter'>
          <div className='Item-description'>
            <span className='Item-description--title u-mgb--xs'>{this.props.title}</span>
            <span className='Item-description--date u-mgb--xs'>{`(${this.props.date})`}</span>
            <Rate
              rate={this.props.rate}
            />
          </div>
        </div>
        {isHovered &&
          <div className='ItemMenu-wrapper'>
            <div className='ItemMenu'>
              <Popper
                popperPlacement='right'
                targetComponent={
                  <div className='ItemMenu-options'>
                    <Svg className='Option-image' src={checked} />
                  </div>
                }
                popperComponent={ <Form /> }
              />
              <Popper
                popperPlacement='right'
                targetComponent={
                  <div className='ItemMenu-options'>
                    <Svg className='Option-image' src={add} />
                  </div>
                }
                popperComponent={ <List collection={collection}/> }
              />
              <Popper
                popperPlacement='right'
                targetComponent={
                  <div className='ItemMenu-options'>
                    <Svg className='Option-image' src={infos} />
                  </div>
                }
                popperComponent={ <p>test</p> }
              />
            </div>
          </div>
        }
      </Image >
    )
  }
}
