import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from '@components/Button'
import Divider from '@components/Divider'
import Icon from '@components/Icon'
import Rate from '@components/Rate'
import Textarea from '@components/Textarea'
import { resourceCreateAction, resourceEditAction } from '@core/store/actions'
import { allowedTypes, MOVIE } from '@core/store/constants'
import { MovieItem } from '@core/store/orm/resourcesModels/Movie'

interface Iprops {
  resourceEdit: (resourceType: allowedTypes, resource: any) => void
  resourceCreate: (resourceType: allowedTypes, resource: any) => void
  movie: MovieItem
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

const Form: React.FunctionComponent<Iprops> = ({
  movie,
  resourceEdit,
  resourceCreate,
}) => {
  const [comment, setComment] = React.useState('')
  const [rate, setRate] = React.useState(0)
  const submit = (event: any) => {
    event.preventDefault()
    const updatedMovie = { ...movie }
    const resourceNotInDb = !movie.personal_vote
    updatedMovie.personal_vote = rate
    updatedMovie.comment = comment

    if (resourceNotInDb) {
      return resourceCreate(MOVIE, updatedMovie)
    }

    resourceEdit(MOVIE, updatedMovie)
  }

  return (
    <Wrapper onSubmit={submit}>
      <Rate
        readonly={false}
        rate={movie.personal_vote || rate}
        onClick={(value: any) => setRate(value)}
      />
      <Divider />
      <>
        <Title>Description</Title>
        <StyledTextarea
          value={movie.comment || comment}
          onChange={({ target }: any) => setComment(target.value)}
          placeholder="Put what you think about the movie here..."
        />

        <StyledButton>
          <Icon glyph="checked" />
        </StyledButton>
      </>
    </Wrapper>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    resourceEdit: (resourceType: allowedTypes, resource: any) => {
      dispatch(resourceEditAction(resourceType, resource))
    },
    resourceCreate: (resourceType: allowedTypes, resource: any) => {
      dispatch(resourceCreateAction(resourceType, resource))
    },
  }
}

export default connect(null, mapDispatchToProps)(Form)
