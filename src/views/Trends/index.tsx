import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Popper from 'components/Popper'
import Search from 'containers/Search'

import List from 'components/List'
import { resourceFetch } from 'core/store/actions'
import './index.scss'
import FilterButton from 'containers/FilterButton'
import { activeFilter, discoverMovies } from 'core/store/selectors'
import Icon from 'components/Icon'
import {
  DISCOVER_TVS,
  DISCOVER_MOVIES,
  DISCOVER,
  filterProps,
} from 'core/store/constants'

interface Iprops {
  dispatch: (Object: any) => Promise<any>
  activeFilter: filterProps
  movies: any
}

interface Istate {
  isLoading: boolean
}

class Trends extends React.Component<Iprops, Istate> {
  constructor(props: Iprops, state: Istate) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.props.dispatch(
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: this.props.activeFilter.field,
      })
    )

    this.setState({ isLoading: false })
  }

  async componentDidUpdate({ activeFilter }: any) {
    if (activeFilter === this.props.activeFilter) {
      return
    }

    await this.props.dispatch(
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: this.props.activeFilter.field,
      })
    )

    this.setState({ isLoading: false })
  }

  render(): React.ReactNode {
    const { movies, activeFilter } = this.props

    return (
      <div className="Trends-wrapper">
        <header className="Trends-header">
          <Search className="TrendsHeader-search" inputClassName="Input-bold" />
          <Popper
            popperPlacement="bottom"
            wrapperClass="TrendsHeader-Category"
            targetComponent={
              <div>
                <span>{activeFilter.field}</span>
                <Icon className="u-mgl--s" glyph="vector" />
              </div>
            }
            popperComponent={
              <div className="HeaderCategory-wrapper">
                <FilterButton filter={DISCOVER_MOVIES}>
                  Popular movies
                </FilterButton>
                <FilterButton filter={DISCOVER_TVS}>Popular TV's</FilterButton>
              </div>
            }
          />
        </header>
        <List wrapperClass="Movie-wrapper" collection={movies} />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: discoverMovies(state),
    activeFilter: activeFilter(state, 0).value,
  }
}

export default flow(connect(mapStateToProps) as any)(Trends)
