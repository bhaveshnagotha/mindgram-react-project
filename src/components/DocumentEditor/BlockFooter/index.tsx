import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 100px;
`

interface IProps {
  children: any
}
const BlockFooter = ({ children = null }: IProps) => {
  return (
    <Container>
      <hr />
      {children}
    </Container>
  )
}

export default BlockFooter
