import React from 'react'
import {
  Container,
  Left,
  LeftTop,
  LeftBottom,
  LeftBottomInner,
  LeftTopInner,
  Right,
  RightTop,
  RightBottom,
} from './ClinicalTrialsDashboard.style'
import MarketMovingNews from './MarketMovingNews'
import UpcomingEvents from './UpcomingEvents'
import LatestDeals from './LatestDeals'
import RegulatoryAndClinicalTrialActivity from './RegulatoryAndClinicalTrialActivity'
import QuickAccess from './QuickAccess'

const ClinicalTrialsDashboard = () => {
  return (
    <Container>
      <Left>
        <LeftTop>
          <LeftTopInner>
            <RegulatoryAndClinicalTrialActivity />
          </LeftTopInner>
        </LeftTop>
        <LeftBottom>
          <LeftBottomInner>
            <QuickAccess />
          </LeftBottomInner>
          <LeftBottomInner>
            <LatestDeals />
          </LeftBottomInner>
        </LeftBottom>
      </Left>
      <Right>
        <RightTop>
          <MarketMovingNews />
        </RightTop>
        <RightBottom>
          <UpcomingEvents />
        </RightBottom>
      </Right>
    </Container>
  )
}

export default ClinicalTrialsDashboard
