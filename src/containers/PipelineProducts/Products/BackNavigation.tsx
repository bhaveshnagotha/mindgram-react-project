import {
  IStockInfo,
  StockInfoDisplay,
} from '../../ClinicalTrialsDashboard/MarketMovingNews'
import {
  Header,
  StyledBackNavigation,
  TagsContainer,
} from './ProductDetails.styles'
import BackIcon from '../../../components/SvgIcons/BackIcon'
import { baseColors } from '../../../constants/colors'
import { Tag } from '../../../components'
import React from 'react'

export const BackNavigation = ({
  title,
  onClick,
  style,
  className,
  tag,
  tags,
  subtitle,
  stockInfo,
  priceDataType,
}: {
  title?: string
  onClick: any
  className?: string
  style?: any
  tag?: any
  tags?: any
  subtitle?: any
  stockInfo?: IStockInfo[]
  priceDataType?: string
}) => {
  return (
    <StyledBackNavigation className={className} style={style}>
      <div style={{ marginRight: 15 }}>
        <BackIcon onClick={onClick} height={18} color={baseColors.GREY_ONE} />
      </div>
      {title && (
        <Header>
          <p>{title}</p>
          {/*<StyledSubtitleContainer style={{marginLeft: subtitle ? 10 : 0, whiteSpace: 'nowrap', overflow: 'auto'}}>*/}
          <span style={{ marginLeft: subtitle ? 10 : 0, overflow: 'auto' }}>
            {subtitle && subtitle}
          </span>
          {/*</StyledSubtitleContainer>*/}
          <TagsContainer>
            {tag && (
              <Tag
                fontWeight={600}
                className="ml-2"
                color={baseColors.GREY_BLUE}
                bgColor={baseColors.BLUE_SIX}
              >
                {tag}
              </Tag>
            )}
            {tags?.map((tagItem, index) => (
              <Tag
                key={index}
                fontWeight={600}
                className="ml-2"
                color={baseColors.GREY_BLUE}
                bgColor={baseColors.BLUE_SIX}
              >
                {tagItem}
              </Tag>
            ))}
          </TagsContainer>
          {stockInfo && priceDataType && (
            <StockInfoDisplay
              priceDataType={priceDataType}
              premarketPriceData={stockInfo[0]}
              currentPriceData={stockInfo[1]}
              afterhoursPriceData={stockInfo[2]}
            />
          )}
        </Header>
      )}
    </StyledBackNavigation>
  )
}
