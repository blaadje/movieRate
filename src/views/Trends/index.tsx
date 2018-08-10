import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Svg from 'react-inlinesvg'

// import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'
import Popper from 'components/Popper'

import * as vector from 'images/Vector.svg'
import './index.scss'
import { apiFetch } from 'core/sagas/apiCallSaga/actions'
import Loader from 'components/Loader'

interface iProps {
  dispatch: (Object: any) => Promise<any>,
  movies: any
}

interface iState {
  isLoading: boolean,
  category: string
}

class Trends extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      isLoading: true,
      category: 'discover'
    }
  }

  componentWillMount () {
    this.fetchCategory('movie', this.state.category)
  }

  componentWillReceiveProps (props: iProps): any {
    return props
  }

  fetchCategory (resourceType: string, category: string): void {
    this.setState({ category })
    this.props.dispatch(apiFetch(resourceType, {
      category
    }))
  }

  render (): React.ReactNode {
    const { isLoading, category } = this.state
    // const movies = this.props.movies[category]

    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search
            className='TrendsHeader-search'
            inputClassName='Input-bold'
          />
          <Popper
            popperPlacement='bottom'
            wrapperClass='TrendsHeader-Category'
            targetComponent={
              <div>
                <span>{category}</span>
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <ul className='HeaderCategory-wrapper'>
                <li
                  className={`${category === 'discover' ? 'isSelected' : ''} HeaderCategory-item u-mgb--m`}
                  onClick={() => this.fetchCategory('movie', 'discover')}
                >
                  Popular movies
                </li>
                <li
                  className={`${category === 'movie' ? 'isSelected' : ''} HeaderCategory-item`}
                  onClick={() => this.fetchCategory('tv', 'discover')}
                >
                  Now playing
                </li>
              </ul>
            }
          />
        </header>
        {isLoading &&
          <Loader />
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: state.movies
  }
}

export default flow(
  connect(mapStateToProps)
)(Trends)
