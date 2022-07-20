import { History } from 'history'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Loading, SlidingPane, Tree } from '../../../components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'
import { IMatch } from '../../Dashboard'
import Header, { Pill } from '../header'
import { NODE_COLOR_MAPPING, NODE_TYPES } from './treeHelper'

export const SLIDEPANE_DATA_KEYS = Object.freeze({
  noOfActiveIpr: 'No. of Active IPR Proceedings',
  noOfDrugsFacingChallanges: 'Drug Products Facing Patent Challenges',
  noOfPatents: 'No. of Patents in Dispute',
  noOfTerminatedIpr: 'No. of Terminated IPR Proceedings',
})

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  margin-top: 20px;
`
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
export const ContainerTitle = styled.p`
  margin-bottom: 0;
  font-weight: 700;
  font-size: 18px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
`

interface ITextWrapperProps {
  flex?: number
  fontSize?: string
  fontColor?: string
  fontWeight?: number
}

export const TextWrapper = styled.div<ITextWrapperProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: baseline;
`

export const TextTitle = styled.p<ITextWrapperProps>`
  flex: ${(props) => (props.flex ? props.flex : 1)};
  color: ${(props) =>
    props.fontColor ? props.fontColor : baseColors.GREY_ONE};
  font-family: ${theme.fonts.sourceSansPro};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 600)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '13px')};
  margin-bottom: 0;
`
export const TextSubTitle = styled.p<ITextWrapperProps>`
  flex: ${(props) => (props.flex ? props.flex : 3)};
  color: ${(props) =>
    props.fontColor ? props.fontColor : baseColors.GREY_DARKER};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 600)};
  margin-bottom: 0;
  > a {
    text-decoration: underline;
    color: inherit;
  }
`

function TreeView({
  match,
  history,
  isDataLoading,
  onSwitchView,
  isTreeViewActive,
  treeData,
  treeContainerHeight,
}: {
  match: IMatch
  history: History
  onSwitchView: (d: any) => void
  isDataLoading: boolean
  isTreeViewActive: boolean
  treeData: any
  treeContainerHeight: number
}) {
  const [isShowing, setIsShowing] = useState(false)

  const handleNodeClick = (node) => {
    if (node) {
      if (
        node.nodeType === NODE_TYPES.activeTrial ||
        node.nodeType === NODE_TYPES.terminatedTrial
      ) {
        history.push(`/patents/trials/${node.name}`)
      } else if (node.nodeType === NODE_TYPES.drug) {
        history.push(`/patents/dashboard-drug/${node.name}`)
      } else if (node.nodeType === NODE_TYPES.patent) {
        history.push(`/patents/dashboard-patent/${node.name}`)
      }
    }
  }

  return (
    <div className="mt-4 h-100">
      <Card padding="20px" backGroundColor="transparent">
        <Header
          history={history}
          match={match}
          onSwitchView={(d) => onSwitchView(d)}
          isTreeViewActive={isTreeViewActive}
        />
      </Card>
      {isDataLoading ? (
        <Loading size={50} />
      ) : (
        <Card className="h-100" padding="0 20px" backGroundColor="transparent">
          <Tree
            width={1200}
            height={treeContainerHeight}
            data={treeData}
            nodeColorMapping={NODE_COLOR_MAPPING}
            handleNodeClick={handleNodeClick}
            onDetailsClick={(d) => {
              setIsShowing(true)
            }}
            onClose={(d) => {
              setIsShowing(false)
            }}
            hasZoomBtns={true}
            isZoomAbleOnScroll={true}
            isDetailsCardShowing={isShowing}
          />
          <SlidingPane
            backgroundColor={baseColors.WHITE}
            isShowing={isShowing}
            onClose={() => {
              setIsShowing(false)
            }}
            hasTags={true}
            tagsData={['COMPANY']}
            tagBorderColor={baseColors.BLUE_SEVEN}
            tagColor={baseColors.WHITE}
            tagBgColor={baseColors.BLUE_SEVEN}
          >
            <ContainerWrapper>
              <Container>
                <ContainerTitle>
                  {treeData.name}{' '}
                  {treeData?.tickers?.map((ticker, index) => (
                    <Pill
                      key={index}
                      backgroundColor={baseColors.BLUE_SIX}
                      color={baseColors.GREY_DARKER}
                    >
                      {ticker}
                    </Pill>
                  ))}
                </ContainerTitle>
              </Container>
              {treeData &&
                treeData.slidePanData &&
                Object.keys(treeData.slidePanData).map((key, index) => {
                  return (
                    <Container key={index}>
                      <TextWrapper>
                        <TextTitle flex={4}>
                          {SLIDEPANE_DATA_KEYS[key]}
                        </TextTitle>
                        <TextSubTitle
                          flex={2}
                          fontSize="14px"
                          fontColor={baseColors.GREY_DARKER}
                          fontWeight={600}
                        >
                          {treeData.slidePanData[key]}
                        </TextSubTitle>
                      </TextWrapper>
                    </Container>
                  )
                })}
            </ContainerWrapper>
          </SlidingPane>
        </Card>
      )}
    </div>
  )
}

export default TreeView
