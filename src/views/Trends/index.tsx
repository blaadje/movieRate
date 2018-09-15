import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Popper from 'components/Popper'
import Search from 'containers/Search'

import List from 'components/List'
import { apiFetch } from 'core/sagas/apiCallSaga/actions'
import './index.scss'
import FilterButton from 'containers/FilterButton'
import { SHOW_MOVIES } from 'core/sagas/resourcesSaga/constants'
import { filteredMovies } from 'core/selectors'
import Icon from 'components/Icon'

interface Iprops {
  dispatch: (Object: any) => Promise<any>
  movies: any
}

interface Istate {
  isLoading: boolean
}

class Trends extends React.Component<Iprops, Istate> {
  constructor (props: Iprops, state: Istate) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentWillMount () {
    this.fetchCategory('movie')
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
                <Icon className='u-mgl--s' glyph='vector' />
              </div>
            }
            popperComponent={
              <div className='HeaderCategory-wrapper'>
                <FilterButton filter='movie'>
                  Popular movies
                </FilterButton>
                <FilterButton filter='tv' onClick={() => this.fetchCategory('tv')}>
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
