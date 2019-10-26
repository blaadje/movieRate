import { connect } from 'react-redux'
import { resourceFilter } from 'core/store/actions'
import Button from 'components/Button'
import { activeFilter } from 'core/store/selectors'

interface Iprops {
  onClick?: () => void
  filter: number
}

const mapStateToProps = (state: any, { filter }: any) => {
  return {
    active: activeFilter(state, 0).value.key === filter.key,
  }
}

const mapDispatchToProps = (dispatch: any, { filter, onClick }: Iprops) => ({
  onClick: () => {
    onClick && onClick()
    dispatch(resourceFilter(filter))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
