import { searchMovieSelector } from 'core/selectors'
import { flow } from 'lodash'
import { connect } from 'react-redux'

import * as add from 'images/add.svg'
import * as checked from 'images/checked.svg'
import * as infos from 'images/information.svg'
import * as React from 'react'

import Image from 'components/Image'
import Panel from 'components/Panel'
import Popper from 'components/Popper'
import Rate from 'components/Rate'
import Form from 'containers/Form'
import MovieInfos from 'containers/MovieInfos'
import Svg from 'react-inlinesvg'

import './style.scss'

import { API_IMAGE_LINK } from 'settings'

interface Iprops {
  inputValue: string
  movies: any[]
}

interface Istate {
}

class SearchResult extends React.Component<Iprops, Istate> {
  constructor (props: Iprops, state: Istate) {
    super(props)
    this.state = {

    }
  }
  render () {
    const { movies } = this.props

    return (
      <div className='Search-result'>
        {movies &&
          <ul>
            {movies.map((movie: any, index: number) => {
              if (!movie.title) {
                return
              }

              return (
                <li key={index} className='SearchResult-item'>
                  <Image
                    className='SearchResultItem-image'
                    src={API_IMAGE_LINK + movie.poster_path}
                  />
                  <div className='SearchResultItemContent-wrapper'>
                    <div className='SearchResultItem-content'>
                      <div>{movie.title}</div>
                      <div>{movie.release_date}</div>
                      <Rate
                        rate={movie.vote_average}
                      />
                    </div>
                    <div className='SearchResultItem-options'>
                      <Panel
                        targetComponent={
                          <div className='ItemMenu-options'>
                            <Svg className='Option-image' src={infos} />
                          </div>
                        }
                        panelComponent={
                          <MovieInfos movie={movie} />}
                      />
                      <Popper
                        popperPlacement='right'
                        targetComponent={
                          <div className='ItemMenu-options'>
                            <Svg className='Option-image' src={checked} />
                          </div>
                        }
                        popperComponent={<Form movieId={movie.id} />}
                      />
                      <Popper
                        popperPlacement='right'
                        targetComponent={
                          <div className='ItemMenu-options'>
                            <Svg className='Option-image' src={add} />
                          </div>
                        }
                        popperComponent={<p>test</p>}
                      />
                    </div>
                  </div>
                </li>
              )
            })
            }
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any, { inputValue }: Iprops) => {
  return {
    movies: searchMovieSelector(state, inputValue)
  }
}

export default flow(
  connect(mapStateToProps) as any
)(SearchResult)