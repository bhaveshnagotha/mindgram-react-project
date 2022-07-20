import React, { Fragment } from 'react'
import ReactList from 'react-list'
import { Page } from 'react-pdf'
import styled from 'styled-components'

const StyledPage = styled(Page)`
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  > canvas {
    margin: auto;
    user-select: auto;
    transform: ${(props) => `translate(0px, ${props.scale * 5}%) !important`};
  }
  > .react-pdf__Page__textContent {
    position: absolute;
    top: unset !important;
    left: unset !important;
    transform: unset !important;
    transform: ${(props) => `translate(0px, ${props.scale * 5}%) !important`};
  }
`

export default function PageViewer({
  noOfPages,
  scale,
  currentPage,
  url,
}: {
  noOfPages: number | null
  scale: number
  currentPage: number | null
  url: string
}) {
  const noOfPagesToPreload = 2
  const getDocPages = () => {
    const pagesToBeRendered =
      currentPage && noOfPages
        ? Math.min(currentPage + noOfPagesToPreload, noOfPages)
        : 1
    return (
      pagesToBeRendered && (
        <ReactList
          itemRenderer={(index, key) => {
            return (
              <StyledPage
                pageNumber={index + 1}
                key={`page_${key}`}
                scale={scale}
                loading={<span></span>}
              />
            )
          }}
          length={Array.from(Array(pagesToBeRendered).keys()).length}
          type="uniform"
        />
      )
    )
  }

  if (noOfPages) {
    return <Fragment>{getDocPages()}</Fragment>
  }

  return null
}
