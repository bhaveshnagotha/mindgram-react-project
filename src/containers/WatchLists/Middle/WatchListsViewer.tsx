import React from 'react'
import { HtmlDocViewer } from '../../../components/HtmlParser'
import {
  ContainerBody,
  ContainerContent,
  ContainerContentBody,
} from './WatchListsViewer.styles'
import PdfViewer from '../../../components/PdfViewer'

const WatchListsViewer = ({
  activeWatchLists,
  isWindowView = false,
  height,
  width,
}: {
  activeWatchLists: any
  isWindowView?: boolean
  height?: number
  width?: number
}) => {
  return (
    <ContainerBody isWindowView={isWindowView} height={height} width={width}>
      <ContainerContent isWindowView={isWindowView}>
        <ContainerContentBody>
          {activeWatchLists?.source_file_type === 'html' ? (
            <HtmlDocViewer url={activeWatchLists?.source_link} />
          ) : (
            <PdfViewer
              url={activeWatchLists?.source_link}
              trackPageChange={true}
            />
          )}
        </ContainerContentBody>
      </ContainerContent>
    </ContainerBody>
  )
}

export default WatchListsViewer
