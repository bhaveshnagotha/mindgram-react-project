import React, { ReactElement, useState } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { StyledLink } from '../../containers/App/App.styles'

interface IExpandableLinkListItem {
  name: string
  link?: string | number
  hasTooltip?: boolean
  tooltipTitle?: string
  tooltipContent?: ReactElement
}

const popover = ({ tooltipContent, tooltipTitle }) => {
  return (
    <Popover id="expandable-link-popover">
      {tooltipTitle && <Popover.Title as="h4">{tooltipTitle}</Popover.Title>}
      <Popover.Content>
        {tooltipContent ? tooltipContent : null}
      </Popover.Content>
    </Popover>
  )
}

const StyledText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${baseColors.GREY_DARKER};
`

const ExpandableLinkList = ({
  items = [],
  linkPrefix,
  limit = 5,
  separator = ', ',
}: {
  items?: IExpandableLinkListItem[]
  linkPrefix?: string
  limit?: number
  separator?: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const newList = isExpanded ? items : items?.slice?.(0, limit)
  return (
    <div className="d-flex flex-wrap">
      {newList?.map?.((item, i) => {
        const encodedLink = encodeURIComponent(item?.link || '')
        if (item.hasTooltip && item.tooltipContent) {
          return (
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="auto"
              flip={true}
              overlay={popover({
                tooltipContent: item?.tooltipContent,
                tooltipTitle: item?.tooltipTitle,
              })}
              key={i}
            >
              <StyledLink
                key={i}
                to={`${linkPrefix}/${encodedLink}`}
                onClick={(e) => e.stopPropagation()}
              >
                {item.name}
                {items?.length - 1 !== i && (
                  <span className="mr-1">{separator}</span>
                )}
              </StyledLink>
            </OverlayTrigger>
          )
        } else if (item.link) {
          return (
            <StyledLink
              key={i}
              to={`${linkPrefix}/${encodedLink}`}
              onClick={(e) => e.stopPropagation()}
            >
              {item.name}
              {items?.length - 1 !== i && (
                <span className="mr-1">{separator}</span>
              )}
            </StyledLink>
          )
        } else {
          return (
            <StyledText key={i}>
              {item.name}
              {items?.length - 1 !== i && (
                <span className="mr-1">{separator}</span>
              )}
            </StyledText>
          )
        }
      })}
      {items.length > limit && (
        <span
          className="ml-2"
          style={{ cursor: 'pointer', color: baseColors.BLUE_FIVE }}
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded((prev) => !prev)
          }}
        >
          {isExpanded ? '...see less' : '...see more'}
        </span>
      )}
    </div>
  )
}

export default ExpandableLinkList
