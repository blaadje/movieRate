import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

import { uuid } from '@core/utils'

interface Iprops extends React.InputHTMLAttributes<any> {
  label?: string
}

const Wrapper = styled.div`
  .input:checked + .label .icon {
    background: white;
    border: 0;
  }
`
const Input = styled.input`
  display: none;
`

const Icon = styled.span`
  display: inline-block;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.grey};
  height: ${rem('22px')};
  width: ${rem('22px')};
  margin-right: ${({ theme }) => theme.spacing.S};
`

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Radio: React.FunctionComponent<Iprops> = ({
  id = `checkbox-${uuid()}`,
  label = 'label',
  ...rest
}: Iprops) => {
  return (
    <Wrapper>
      <Input className="input" id={id} {...rest} />
      <Label className="label" htmlFor={id}>
        <Icon className="icon" />
        <span>{label}</span>
      </Label>
    </Wrapper>
  )
}

export default Radio
