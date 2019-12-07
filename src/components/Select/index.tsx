import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

interface OptionProps {
  value: string | number | null
  label?: string
}

interface Iprops extends React.SelectHTMLAttributes<any> {
  value?: string | number
  label?: string
  options: OptionProps[]
}

const Wrapper = styled.select`
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.M};
  appearance: none;
  font-size: ${rem('18px')};
  width: ${rem('250px')};
`

const Select: React.FunctionComponent<Iprops> = ({
  options,
  value,
  label = 'Select',
  ...rest
}: Iprops) => {
  return (
    <Wrapper {...rest}>
      {!value && <option>{label}</option>}
      {options.map((option: OptionProps) => {
        const value = option.value
        const label = option.label || option.value || option

        return (
          <option key={value} value={value}>
            {label}
          </option>
        )
      })}
    </Wrapper>
  )
}

export default Select
