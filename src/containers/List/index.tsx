import * as React from 'react'
// import './index.scss'

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
      <ul>
        {collection.map((item, index) => {
          return <li key={index}>{item.title}</li>
        })}
      </ul>
    )
  }
}
