import { connect } from 'react-redux'
import { resourceFilter } from 'core/sagas/resourcesSaga/actions'
import Button from 'components/Button'
import { activeFilterSelector } from 'core/selectors'

interface Iprops {
  filter: string
}

const mapStateToProps = (state: any, { filter }: any) => ({
  active: activeFilterSelector(state, filter)
})

const mapDispatchToProps = (dispatch: any, ownProps: Iprops) => ({
  onClick: () => dispatch(resourceFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
