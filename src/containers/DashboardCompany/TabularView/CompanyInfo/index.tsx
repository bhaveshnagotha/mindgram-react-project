import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../../../constants/colors'
import theme from '../../../../theme'

interface IText {
  color?: string
  fontWeight?: number
  fontSize?: string
}

const Text = styled.p<IText>`
  margin: 0 15px;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || 400};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: ${(props) => props.fontSize || '14px'};
`

export default function CompanyInfo({
  isDataLoading,
  companyInfoData,
}: {
  isDataLoading?: boolean
  companyInfoData: any
}) {
  return (
    <div className="h-100 d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-center align-items-center flex-column p-4">
        <Text color={baseColors.GREY_DARKER} fontSize="70px" fontWeight={700}>
          {companyInfoData.noOfActiveProceedings}
        </Text>
        <Text color={baseColors.GREY_DARK} fontSize="15px" fontWeight={600}>
          No. of Active IPR Proceedings
        </Text>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column p-4">
        <Text color={baseColors.GREY_DARKER} fontSize="70px" fontWeight={700}>
          {companyInfoData.patentsInDispute}
        </Text>
        <Text color={baseColors.GREY_DARK} fontSize="15px" fontWeight={600}>
          No. of Patents in Dispute
        </Text>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column p-4">
        <Text color={baseColors.GREY_DARKER} fontSize="70px" fontWeight={700}>
          {companyInfoData.drugsFacingPatentsChallenges}
        </Text>
        <Text color={baseColors.GREY_DARK} fontSize="15px" fontWeight={600}>
          Drug Products Facing Patents Challenges
        </Text>
      </div>
    </div>
  )
}
