import {
  CatalystItemHeader,
  CatalystItemTitle,
  CatalystItemWrapper,
} from '../../TrialCatalysts/Left/TrialCatalystsLeft.styles'
import React, { Fragment } from 'react'
import { Card, Loading } from '../../../components'
import { NoDataErrorMsgSmall, scrollBarStyles } from '../../App/App.styles'
import { headerHeight } from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'

const tableHeaderHeight = 70

const PublicationsHeader = styled.div`
  display: flex;
  flex-flow: row;
  height: ${tableHeaderHeight}px;
  align-items: center;
  padding: 10px 20px 0;
  > div > div {
    position: relative;
  }
`

const PublicationsTitle = styled.p<{ textAlign?: string }>`
  margin: 0;
  font-weight: bold;
  color: ${baseColors.GREY_DARKER};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: 18px;
  line-height: 20px;
  flex-grow: 1;
  flex-basis: 50%;
  text-align: ${(props) => props.textAlign || ''};
`
const BodyWrapper = styled.div`
  height: calc(95% - ${headerHeight}px);
  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBarStyles};
`

const Item = ({ file, onFileClick, activeItem, lastItem }) => {
  return (
    <CatalystItemWrapper
      onClick={() => onFileClick(file)}
      isActive={activeItem}
      isLastItem={lastItem}
    >
      <CatalystItemHeader>{file?.file_header}</CatalystItemHeader>

      <CatalystItemTitle isActive={activeItem}>
        {file?.file_name}
      </CatalystItemTitle>
    </CatalystItemWrapper>
  )
}

const PresentationsPublications = ({ files, isLoading, onFileClick }) => {
  return (
    <Card
      style={{ height: 500 }}
      boxShadow={`0 6px 18px 0 ${baseColors.GREY_LIGHT}`}
    >
      <Fragment>
        <PublicationsHeader>
          <PublicationsTitle>Presentations / Publications</PublicationsTitle>
        </PublicationsHeader>
        <BodyWrapper>
          {false ? (
            <LoadingWrapper>
              <Loading size={30} />
            </LoadingWrapper>
          ) : files?.length === 0 ? (
            <NoDataErrorMsgSmall>
              We couldn't find any relevant catalysts at this time.
            </NoDataErrorMsgSmall>
          ) : (
            files?.map((d, index) => (
              <Fragment key={index}>
                <Item
                  lastItem={index === files?.length - 1}
                  activeItem={false}
                  file={d}
                  onFileClick={(file) => {
                    onFileClick(file)
                  }}
                />
              </Fragment>
            ))
          )}
        </BodyWrapper>
      </Fragment>
    </Card>
  )
}

export default PresentationsPublications
