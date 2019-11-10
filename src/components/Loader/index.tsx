import * as React from 'react'
import styled from 'styled-components'

const StyledLoader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader: React.FunctionComponent = () => {
  return <StyledLoader />
}

export default Loader
