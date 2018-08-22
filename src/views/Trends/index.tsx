import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Svg from 'react-inlinesvg'

import Popper from 'components/Popper'
import Search from 'containers/Search'

import List from 'components/List'
import { apiFetch } from 'core/sagas/apiCallSaga/actions'
import { memoize } from 'core/utils'
import * as vector from 'images/Vector.svg'
import './index.scss'
import FilterButton from 'containers/FilterButton'
import { SHOW_MOVIES, SHOW_TV } from 'core/sagas/resourcesSaga/constants'
import { filteredMovies } from 'core/selectors'

interface Iprops {
  dispatch: (Object: any) => Promise<any>
  movies: any
}

interface Istate {
  isLoading: boolean
  type: string
}

class Trends extends React.Component<Iprops, Istate> {
  constructor (props: Iprops, state: Istate) {
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
    })).then(() => this.setState({ isLoading: false })).catch(err => console.error(err))
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
                <span>{SHOW_MOVIES}</span>
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <div className='HeaderCategory-wrapper'>
                <FilterButton filter={SHOW_MOVIES}>
                  Popular movies
                </FilterButton>
                <FilterButton filter={SHOW_TV}>
                  Popular TV's
                </FilterButton>
              </div>
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
    movies: filteredMovies(state)
  }
}

export default flow(
  connect(mapStateToProps) as any
)(Trends)
