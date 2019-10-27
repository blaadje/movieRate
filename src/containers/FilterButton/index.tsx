import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import Button from '@components/Button'
import { resourceFilter } from '@core/store/actions'
import { activeFilter } from '@core/store/selectors'

interface FilterButtonProps {
  onClick?: () => void
  filter: number
}

interface ButtonProps {
  active: boolean
}

const mapStateToProps = (state: any, { filter }: any) => {
  return {
    active: activeFilter(state, 0).value.field === filter.field,
  }
}

const mapDispatchToProps = (
  dispatch: any,
  { filter, onClick }: FilterButtonProps
) => ({
  onClick: () => {
    onClick && onClick()
    dispatch(resourceFilter(filter))
  },
})

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton)
