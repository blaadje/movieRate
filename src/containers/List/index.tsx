import * as React from 'react'

import Search from 'containers/Search'

import './style.scss'

interface collectionDatas {
  [title: string]: string
}

interface iProps {
  collection: Array<collectionDatas>
}

interface iState {
}

export default class List extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {

    }
  }
  render () {
    const { collection } = this.props

    return (
      <div className='List-wrapper'>
        <Search />
        <hr/>
        <ul>
          {collection.map((item, index) => {
            return <li className='List-item' key={index}>{item.title}</li>
          })}
        </ul>
      </div>
    )
  }
}
