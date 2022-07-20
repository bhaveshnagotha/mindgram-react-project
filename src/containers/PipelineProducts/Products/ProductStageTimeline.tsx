import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'

interface ProductStageTimeline {
  value: number
  title: string
  className?: string
  biomarkers?: string[]
  lines?: string[]
}

const StyledProductStageTimeline = styled.div<{ length: number; init: number }>`
  height: 100%;
  width: ${(props: any) =>
    props.init + ((100 - props.init) * props.length) / 6 + '%'};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  // justify-content: space-between;
  color: ${baseColors.WHITE};
  font-weight: 600;
  font-size: 12px;
  border-radius: 4px;
  padding: 0 1.5rem;
  background-color: ${(props: any) =>
    props.length === 6 ? baseColors.GREEN_FIVE : baseColors.BLUE_FIVE};
`
const ProductStageTimelineWrapper = styled.div`
  width: 100%;
  height: 32px;
`
const LineWrapper = styled.div<{ length: number; init: number }>`
  font-weight: 600;
  color: #b981f7;
  text-align: right;
  width: ${(props: any) =>
    props.init + ((100 - props.init) * props.length) / 6 + '%'};
`

const ProductStageTimeline: React.FC<ProductStageTimeline> = (props) => {
  const { value, title, className, lines } = props
  return (
    <ProductStageTimelineWrapper className={className}>
      <StyledProductStageTimeline init={22} length={value || 0}>
        {/* <div style={{ display: 'flex', columnGap: '0.25rem' }}>
          {biomarkers?.map((marker, i) => (
            <TooltipWrapper>
              <Tag
                data-title="Biomarker"
                fontWeight={600}
                color={baseColors.GREY_BLUE}
                bgColor="#D6F09B"
                width="fit-content"
                style={{ height: 'fit-content', justifySelf: 'start' }}
                key={i}
              >
                {marker}
              </Tag>
            </TooltipWrapper>
          ))}
        </div> */}
        {!isNaN(value) && value >= 0 ? title : 'N/A'}
      </StyledProductStageTimeline>
      {lines?.map((line, i) => (
        <LineWrapper key={i} init={22} length={value || 0}>
          {line}
        </LineWrapper>
      ))}
    </ProductStageTimelineWrapper>
  )
}

export default ProductStageTimeline
