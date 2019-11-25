import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

import CheckBox from './components/CheckBox'
import Radio from './components/Radio'
import TextField from './components/TextField'

interface Iprops extends React.InputHTMLAttributes<any> {
  type: 'text' | 'radio' | 'checkbox'
  id: string
  value: string | number
  label?: string
  error?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${rem('18px')};
`

const Error = styled.div`
  color: ${({ theme }) => theme.colors.red};
`

const Input: React.FunctionComponent<Iprops> = ({
  type = 'text',
  value,
  id,
  error,
  label = '',
  ...rest
}: Iprops) => {
  const components = {
    text: TextField,
    radio: Radio,
    checkbox: CheckBox,
  }
  const Component = components[type]

  return (
    <Wrapper>
      <Component label={label} id={id} type={type} {...rest} value={value} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

export default Input
