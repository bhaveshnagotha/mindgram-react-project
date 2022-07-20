import React, { useEffect, useState } from 'react'
import { ModalComponent } from '../index'
import { Row } from 'react-bootstrap'
import { baseColors } from '../../constants/colors'
import CrossIcon from '../SvgIcons/CrossIcon'
import PdfViewer from '../PdfViewer'
import { HtmlDocViewer } from '../HtmlParser'
import {
  HeaderButtons,
  ZoomWrapper,
  CloseViewerButton,
  StyledMinusIcon,
  StyledPlusIcon,
} from './PublicationsModal.styles'
import ExternalLinkIcon from '../SvgIcons/ExternalLinkIcon'
import { Pill as OpenFilePill } from '../../containers/TrialNew/TrialNew.styles'

function PublicationsModal(props: {
  isOpen: boolean
  height?: any
  width?: any
  file: any
  onCloseActiveCatalyst: any
}) {
  const { file, height, width, onCloseActiveCatalyst, isOpen } = props
  const [scale, setScale] = useState(1.4)
  const [imageScale, setImageScale] = useState(100)

  let isImage = false
  useEffect(() => {
    setScale(1.4)
  }, [isOpen])
  const types = ['jpeg', 'jpg', 'png']
  const fileType = file?.file_type
  if (types.includes(fileType)) {
    // window.open(file?.file_url)
    isImage = true
  }
  const handleZoomClick = ({ e, factor }: { e: any; factor: number }) => {
    e.preventDefault()
    e.stopPropagation()
    setScale(scale + factor)
    setImageScale(imageScale + factor * 100)
  }
  return (
    <ModalComponent show={isOpen} width={width}>
      <Row style={{ margin: '0px 0px 50px 0px' }}>
        <HeaderButtons>
          <ZoomWrapper>
            <OpenFilePill
              style={{ marginRight: 15 }}
              onClick={() => {
                window.open(file?.file_url, 'target')
              }}
            >
              <ExternalLinkIcon color={baseColors.WHITE} height={15} />
            </OpenFilePill>
            <StyledPlusIcon
              height={30}
              color={baseColors.GREY_LIGHT}
              onClick={(e) => handleZoomClick({ e, factor: 0.05 })}
            />
            <StyledMinusIcon
              height={20}
              color={baseColors.GREY_LIGHT}
              onClick={(e) => handleZoomClick({ e, factor: -0.05 })}
            />
          </ZoomWrapper>
          {onCloseActiveCatalyst && (
            <CloseViewerButton onClick={onCloseActiveCatalyst}>
              <CrossIcon height={20} color={baseColors.GREY_DARKER} />
            </CloseViewerButton>
          )}
        </HeaderButtons>
      </Row>
      <div style={{ height, overflow: 'auto' }}>
        {isImage ? (
          <img
            src={file?.file_url}
            alt={'unable to display'}
            style={{ width: imageScale + '%' }}
          />
        ) : fileType?.indexOf('html') === -1 ? (
          <PdfViewer
            scale={scale}
            url={file?.file_url}
            trackPageChange={true}
          />
        ) : (
          <HtmlDocViewer url={file?.file_url} />
        )}
      </div>
    </ModalComponent>
  )
}

export default PublicationsModal

// {/*<Col md={8}>*/}
//        {/*  <ContainerHeaderTextWrapper>*/}
//        {/*    <p>{file?.file_header}</p>*/}
//        {/*    <span>{file?.file_header}</span>*/}
//        {/*  </ContainerHeaderTextWrapper>*/}
//        {/*</Col>*/}
