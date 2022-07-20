import React from 'react'
import styled from 'styled-components'

import getBlockPadding from '../helpers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ContainerContentHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-left: ${(props: { indentation: number }) =>
    getBlockPadding(props.indentation)};
  padding-right: 20px;
  padding-top: 10px;
`

const ContainerContentHeadingTitle = styled.div``

const ContainerContentHeadingPageNumber = styled.div``

function BlockContent({ children }: { children: any }) {
  return <Container>{children}</Container>
}

function BlockContentHeading({
  attributes,
  node,
  children,
}: {
  attributes: any
  node: any
  children: any
}) {
  const indentation = node.getIn(['data', 'indentation'])
  return (
    <ContainerContentHeading {...attributes} indentation={indentation}>
      {children}
    </ContainerContentHeading>
  )
}

function BlockContentHeadingTitle({ children }: { children: any }) {
  return <ContainerContentHeadingTitle>{children}</ContainerContentHeadingTitle>
}

function BlockContentHeadingPageNumber({ children }: { children: any }) {
  return (
    <ContainerContentHeadingPageNumber>
      {children}
    </ContainerContentHeadingPageNumber>
  )
}

export {
  BlockContentHeading,
  BlockContentHeadingTitle,
  BlockContentHeadingPageNumber,
}
export default BlockContent
