import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import Button from '@components/Button'
import { setFilterAction } from '@core/store/actions'
import { activeFilter } from '@core/store/selectors'

interface FilterBy {
  label: string
  value: number
}

interface FilterButtonProps {
  onClick?: () => void
  filterBy: FilterBy
  filterId: number
}

interface ButtonProps {
  active: boolean
}

const StyledButton: any = styled(Button)`
  color: ${({ theme }) => theme.colors.greyLight};
  ${({ active }: ButtonProps) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.white};
      border-bottom: 1px solid ${({ theme }) => theme.colors.highlight};
    `}
`

const FilterButton: React.FunctionComponent<any> = ({
  children,
  ...rest
}: any) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

const mapStateToProps = (
  state: any,
  { filterId, filterBy }: FilterButtonProps
) => {
  return {
    active: activeFilter(state, filterId).value === filterBy.value,
  }
}

const mapDispatchToProps = (
  dispatch: any,
  { filterId, filterBy, onClick }: FilterButtonProps
) => ({
  onClick: () => {
    onClick && onClick()
    dispatch(setFilterAction(filterBy, filterId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton)
