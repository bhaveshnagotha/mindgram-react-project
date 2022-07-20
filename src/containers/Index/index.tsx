import React from 'react'
import styled from 'styled-components'

import Image from '../../components/Image'
import { baseColors } from '../../constants/colors'
import constructionSVG from './construction.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${baseColors.GREY_DARK};
  font-size: 30px;
  height: 100%;
`

function Index(props) {
  return (
    <Container>
      <Image src={constructionSVG} height="300px" width="300px" />
      <span>Coming soon ...</span>
    </Container>
  )
}

export default Index
