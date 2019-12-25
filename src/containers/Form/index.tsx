import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from '@components/Button'
import Divider from '@components/Divider'
import Icon from '@components/Icon'
import Rate from '@components/Rate'
import Textarea from '@components/Textarea'

interface Iprops {
  dispatch: (Object: any) => void
  movie: any
}

const Wrapper = styled.form`
  width: ${rem('300px')};
`

const Title = styled.h3`
  margin-top: ${({ theme }: any) => theme.spacing.S};
  margin-bottom: 0;
`

const StyledTextarea = styled(Textarea)`
  width: 100%;
  margin: ${({ theme }: any) => theme.spacing.S} 0;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const Form: React.FunctionComponent<Iprops> = ({ movie }) => {
  return (
    <Wrapper>
      <Rate readonly={false} rate={movie.rate} />
      <Divider />
      <>
        <Title>Description</Title>
        <StyledTextarea
          value={movie.description}
          placeholder="Put what you think about the movie here..."
        />

        <StyledButton>
          <Icon glyph="checked" />
        </StyledButton>
      </>
    </Wrapper>
  )
}

export default connect()(Form)
