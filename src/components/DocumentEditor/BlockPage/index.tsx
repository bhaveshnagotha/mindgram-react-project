import React from 'react'
import styled from 'styled-components'

import { baseColors } from '../../../constants/colors'

const Container = styled.div`
  background: ${baseColors.WHITE};
  border-bottom: 3px solid #f1f1f1;
  cursor: text;
  margin-top: 20px;
  padding: 20px;
`

interface IProps {
  children: any
}
const BlockPage = ({ children = null }: IProps) => {
  return <Container>{children}</Container>
}

export default BlockPage
