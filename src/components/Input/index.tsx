import rem from 'polished/lib/helpers/rem'
import React from 'react'
import styled from 'styled-components'

import CheckBox from './components/CheckBox'
import Number from './components/Number'
import Radio from './components/Radio'
import TextField from './components/TextField'

interface Iprops extends React.InputHTMLAttributes<any> {
  type: 'text' | 'radio' | 'checkbox' | 'number'
  value: any
  label?: string
  className?: string
  error?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${rem('18px')};
  width: ${rem('250px')};
`

const Error = styled.div`
  color: ${({ theme }) => theme.colors.red};
`

const Input: React.FunctionComponent<Iprops> = ({
  type = 'text',
  error,
  className,
  ...rest
}: Iprops) => {
  const components = {
    text: TextField,
    radio: Radio,
    checkbox: CheckBox,
    number: Number,
  }
  const Component = components[type]

  return (
    <Wrapper className={className}>
      <Component type={type} {...rest} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

export default Input
