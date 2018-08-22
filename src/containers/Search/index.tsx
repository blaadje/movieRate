import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { apiFetch } from 'core/sagas/apiCallSaga/actions'

import './style.scss'

import Input from 'components/Input'
import List from 'components/List'
import { memoize } from 'core/utils'
import Icon from 'components/Icon'

interface Iprops {
  className: string
  dispatch: (Object: any) => Promise<any>
  inputClassName?: string
}

interface Istate {
  movies: any[]
  inputValue: string
}

class Search extends React.Component<Iprops, Istate> {
  constructor (props: Iprops, state: Istate) {
    super(props)
    this.state = {
      movies: [],
      inputValue: ''
    }
  }

  private memoizeFetchMovie = memoize((value: string) => this.fetchMovie(value))

  fetchMovie (value: string): void {
    if (!value || value.length < 3) {
      this.setState({ movies: [] })
      return
    }

    this.props.dispatch(apiFetch('search', {
      segment: 'movie',
      query: { query: value }
    }))
      .then((movies: any[]) => this.setState({ movies }))
      .catch(err => console.error(err))
  }

  onChangeInput (event: React.ChangeEvent<any>) {
    this.setState({ inputValue: event.target.value })
    this.memoizeFetchMovie(event.target.value)
  }

  render () {
    const { inputValue, movies } = this.state

    return (
      <div className={`Search-wrapper ${this.props.className || ''}`}>
        <div className='Search-input'>
          <Icon className='Search-icon' size='xl' glyph='search' />
          <Input
            className={this.props.inputClassName}
            value={inputValue}
            placeholder='Search movie'
            onChange={(event) => this.onChangeInput(event)}
            onReset={() => this.setState({ inputValue: '', movies: [] })}
          />
        </div>
        <List
          direction='column'
          wrapperClass='Search-result'
          collection={movies}
        />
      </div>
    )
  }
}

export default flow(
  connect() as any
)(Search)
