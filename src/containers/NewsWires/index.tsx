import React from 'react'
import styled from 'styled-components'

import Card from '../../components/Card'
import LinkExternal from '../../components/LinkExternal'
import Text from '../../components/Text'
import { fontSizes, fontWeights, colors } from '../../theme'

const TEST_ITEMS = [
  {
    date: 'Sat, 18 Apr 2020 13:05:00 GMT',
    headline:
      'NW Bio To Discuss Projected Schedule For Data Lock, Unblinding and Top Line Data From Its Phase 3 Clinical Trial At Annual Shareholder Meeting',
    source: 'PRN',
    url:
      'https://newswires.s3.amazonaws.com/PRN/202004181305PR_NEWS_USPR_____SF82971.xml?AWSAccessKeyId=AKIA3EMKATIEWUGXKQPL&Signature=3H5RgyoHbnnVr0Eyfhq9iZkf1OA%3D&Expires=1587723523',
  },
  {
    date: 'Fri, 17 Apr 2020 09:00:00 GMT',
    headline:
      'Debiotech Working on COVID-19 Microneedle Vaccine Delivery, to Enhance Efficiency and Reduce Dose',
    source: 'PRN',
    url:
      'https://newswires.s3.amazonaws.com/PRN/202004170900PR_NEWS_USPR_____LN82191.xml?AWSAccessKeyId=AKIA3EMKATIEWUGXKQPL&Signature=kKSyLbFKPK%2BXlzqWFlFUrU9zb1s%3D&Expires=1587723523',
  },
]

const Container = styled.div`
  padding: 10px;
`

const Title = styled(Text)`
  margin-top: 10px;
  padding-left: 10px;
`

const StyledCard = styled(Card)`
  margin: 10px 0px;
  padding: 10px;
`

function NewsWires({ items = TEST_ITEMS }) {
  return (
    <Container>
      <Title
        fontWeight={fontWeights.BOLDER}
        fontSize={fontSizes.L}
        color={colors.GREY_DARKER}
      >
        News provided by PR Newswire
      </Title>
      {items.map(({ headline, date, url }) => (
        <StyledCard>
          <LinkExternal href={url}>
            <h5>{headline}</h5>
          </LinkExternal>
          <h6>{date}</h6>
        </StyledCard>
      ))}
    </Container>
  )
}

export default NewsWires
