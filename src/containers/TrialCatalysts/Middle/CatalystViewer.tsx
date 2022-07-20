import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Tag } from '../../../components'
import { HtmlDocViewer } from '../../../components/HtmlParser'
import CrossIcon from '../../../components/SvgIcons/CrossIcon'
import { baseColors } from '../../../constants/colors'
import { StyledLink } from '../../App/App.styles'
import {
  CloseViewerButton,
  ContainerBody,
  ContainerContent,
  ContainerContentBody,
  ContainerHeader,
  ContainerHeaderTextWrapper,
} from './CatalystViewer.styles'
import PdfViewer from '../../../components/PdfViewer'

const CatalystViewer = ({
  activeCatalyst,
  fdaLabelURL,
  isWindowView = false,
  onCloseActiveCatalyst,
  height,
  width,
}: {
  fdaLabelURL: string
  activeCatalyst: any
  isWindowView?: boolean
  onCloseActiveCatalyst?: (e: React.MouseEvent<HTMLElement>) => void
  height?: number
  width?: number
}) => {
  if (!fdaLabelURL) {
    return (
      <ContainerBody isWindowView={isWindowView} height={height} width={width}>
        <ContainerHeader>
          <Row className="w-100" style={{ position: 'relative' }}>
            <Col md={3}>
              <ContainerHeaderTextWrapper>
                <p>Products</p>
                <div style={{ overflow: 'auto', maxHeight: 80 }}>
                  {activeCatalyst?.products_dict?.map((prod, i) => {
                    return (
                      <StyledLink
                        key={i}
                        to={`/clinical-trials/pipeline-products/${prod?.norm_cui}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {prod?.norm_cui_name}
                        {activeCatalyst?.products_dict?.length - 1 !== i && (
                          <span className="mr-1">{' | '}</span>
                        )}
                      </StyledLink>
                    )
                  })}
                </div>
              </ContainerHeaderTextWrapper>
            </Col>
            <Col md={4}>
              <ContainerHeaderTextWrapper>
                <p>Company</p>
                <div
                  className="d-flex"
                  style={{ overflow: 'auto', maxHeight: 80 }}
                >
                  <StyledLink
                    to={`/clinical-trials/company-dashboard/${activeCatalyst?.company?.[0]?.company_type}${activeCatalyst?.company?.[0]?.company_id}`}
                  >
                    {activeCatalyst?.company?.[0]?.company_name}
                  </StyledLink>
                  <Tag
                    bgColor={baseColors.BLUE_SIX}
                    color={baseColors.GREY_BLUE}
                    fontWeight={600}
                    className="ml-2"
                  >
                    {activeCatalyst?.company?.[0]?.company_ticker}
                  </Tag>
                </div>
              </ContainerHeaderTextWrapper>
            </Col>
            <Col md={5}>
              <ContainerHeaderTextWrapper style={{ paddingRight: 15 }}>
                <p>Conditions</p>
                <div style={{ overflow: 'auto', maxHeight: 80 }}>
                  {activeCatalyst?.conditions_dict?.map((cond, i) => {
                    return (
                      <StyledLink
                        key={i}
                        to={`/clinical-trials/conditions-overview/${cond?.condition_id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {cond?.condition}
                        {activeCatalyst?.conditions_dict?.length - 1 !== i && (
                          <span className="mr-1">{' | '}</span>
                        )}
                      </StyledLink>
                    )
                  })}
                </div>
              </ContainerHeaderTextWrapper>
            </Col>
            {onCloseActiveCatalyst && (
              <CloseViewerButton onClick={onCloseActiveCatalyst}>
                <CrossIcon height={20} color={baseColors.GREY_DARKER} />
              </CloseViewerButton>
            )}
          </Row>
        </ContainerHeader>
        <ContainerContent isWindowView={isWindowView}>
          <ContainerContentBody id={'catalyst-viewer-content-body'}>
            {activeCatalyst?.url ? (
              <HtmlDocViewer
                url={activeCatalyst?.url ?? activeCatalyst?.file_url}
              />
            ) : (
              <PdfViewer
                url={activeCatalyst?.file_url}
                trackPageChange={true}
              />
            )}
          </ContainerContentBody>
        </ContainerContent>
      </ContainerBody>
    )
  } else {
    return (
      <ContainerBody isWindowView={isWindowView} height={height} width={width}>
        <ContainerHeader>
          <Row className="w-100" style={{ position: 'relative' }}>
            <Col md={11}></Col>
            <Col md={1}>
              {onCloseActiveCatalyst && (
                <CloseViewerButton onClick={onCloseActiveCatalyst}>
                  <CrossIcon height={20} color={baseColors.GREY_DARKER} />
                </CloseViewerButton>
              )}
            </Col>
          </Row>
        </ContainerHeader>
        <ContainerContent isWindowView={isWindowView}>
          <ContainerContentBody>
            {fdaLabelURL ? <HtmlDocViewer url={fdaLabelURL} /> : null}
          </ContainerContentBody>
        </ContainerContent>
      </ContainerBody>
    )
  }
}

export default CatalystViewer
