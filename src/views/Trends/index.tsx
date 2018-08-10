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
import { memoize } from 'core/utils'

interface iProps {
  dispatch: (Object: any) => Promise<any>,
  movies: any
}

interface iState {
  isLoading: boolean,
  type: string
}

class Trends extends React.Component<iProps, iState> {
  constructor(props: iProps, state: iState) {
    super(props)
    this.state = {
      isLoading: true,
      type: 'movie'
    }
  }
  
  private memoizeFetchCategory = memoize((resourceType: any, category: any) => this.fetchCategory(resourceType, category))
  
  componentWillMount () {
    this.memoizeFetchCategory(this.state.type, 'discover')
  }


  fetchCategory (resourceType: string, category: string): any {
    this.props.dispatch(apiFetch(resourceType, {
      category
    }))
  }

  render (): React.ReactNode {
    const { isLoading, type } = this.state

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
                <span>{type}</span>
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <ul className='HeaderCategory-wrapper'>
                <li
                  className={`${type === 'movie' ? 'isSelected' : ''} HeaderCategory-item u-mgb--m`}
                  onClick={() => {
                    const type = 'movie'
                    this.setState({ type })
                    this.memoizeFetchCategory(type, 'discover')}
                  }
                >
                  Popular movies
                </li>
                <li
                  className={`${type === 'tv' ? 'isSelected' : ''} HeaderCategory-item`}
                  onClick={() => {
                    const type = 'tv'
                    this.setState({ type })
                    this.memoizeFetchCategory(type, 'discover')}
                  }
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
