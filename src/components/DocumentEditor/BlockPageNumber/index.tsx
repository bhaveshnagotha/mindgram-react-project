import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 40px;
  text-align: center;
`

interface IProps {
  children: any
}
const BlockPageNumber = ({ children = null }: IProps) => {
  return <Container>{children}</Container>
}

export default BlockPageNumber
