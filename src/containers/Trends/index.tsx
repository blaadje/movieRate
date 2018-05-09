import * as React from 'react'

import { flow }  from 'lodash'

import { connect } from 'react-redux'
import axios from 'axios'

import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'

import './index.scss'

interface iProps {
  dispatch: (Object: any) => void
}

interface iState {
  datas: any
}

class Trends extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      datas: []
    }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'MOVIES_FETCH' })
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=9a216746b14d5069ec45091058ad259b')
      .then((response) => {
        this.setState({ datas: response.data.results })
      })
      .catch(function (error) {
        console.log(error) // eslint-disable-line no-console
      })
  }

  render (): React.ReactNode {
    const { datas } = this.state
    const imageLink = 'https://image.tmdb.org/t/p/w500'
    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search inputClassName='Input-bold'/>
          <span className='Trends-header--Category'>Categorie</span>
        </header>
        <div className='Movie-wrapper'>
          {datas.map((item: any, key: number) => {
            return <MovieItem
              key={key}
              image={imageLink + item.poster_path}
              title={item.title}
              date={item.release_date}
              rate={30}
            />
          })}
        </div>
      </div>
    )
  }
}

export default flow(
  connect()
)(Trends)
