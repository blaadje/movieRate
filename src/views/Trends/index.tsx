import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Svg from 'react-inlinesvg'

import Search from 'containers/Search'
import Popper from 'components/Popper'

import * as vector from 'images/Vector.svg'
import './index.scss'
import { apiFetch } from 'core/sagas/apiCallSaga/actions'
import Loader from 'components/Loader'
import { memoize } from 'core/utils'
import { moviesSelector } from 'core/selectors'
import List from 'components/List';
import { resourceFilter } from 'core/sagas/resourcesSaga/actions';

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
  
  private memoizeFetchCategory = memoize((resourceType: string) => this.fetchCategory(resourceType))
  
  componentWillMount () {
    this.memoizeFetchCategory(this.state.type)
  }


  fetchCategory (resourceType: string): void {
    this.props.dispatch(apiFetch('discover', {
      segment: resourceType
    })).then(() => this.setState({ isLoading: false }))
  }

  onClickHandler (type: string): void {
    this.props.dispatch(resourceFilter(type))
    this.setState({ type })
    this.memoizeFetchCategory(type)
  }

  render (): React.ReactNode {
    const { movies } = this.props

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
                {/* <span>{type}</span> */}
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <ul className='HeaderCategory-wrapper'>
                <li
                  // className={`${type === 'movie' ? 'isSelected' : ''} HeaderCategory-item u-mgb--m`}
                  onClick={() => this.onClickHandler('movie')}
                >
                  Popular movies
                </li>
                <li
                  // className={`${type === 'tv' ? 'isSelected' : ''} HeaderCategory-item`}
                  onClick={() => this.onClickHandler('tv')}
                >
                  Now playing
                </li>
              </ul>
            }
          />
        </header>
        <List
          wrapperClass='Movie-wrapper'
          collection={movies}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: moviesSelector(state)
  }
}

export default flow(
  connect(mapStateToProps)
)(Trends)
