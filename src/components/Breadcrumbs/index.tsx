import { History } from 'history'
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { baseColors } from '../../constants/colors'
import RightArrowIcon from '../SvgIcons/RightArrowIcon'
import Tag from '../Tag'

const sharedFlexStyles = css`
  display: flex;
  align-items: center;
`

const BreadcrumbWrapper = styled.nav`
  width: 100%;
  ${sharedFlexStyles}
`
const BreadcrumbItem = styled.li<{ isActive: boolean }>`
  ${sharedFlexStyles}
  list-style: none;
  transition: all 150ms ease-in;
  > span > svg > g > path,
  span > svg > g > polygon {
    fill: ${(props) =>
      props.isActive ? baseColors.GREY_DARKER : baseColors.GREY_DARK};
    transition: all 150ms ease-in;
  }
  &:hover {
    > span {
      text-decoration: ${(props) => (props.isActive ? '' : 'underline')};
      color: ${baseColors.GREY_DARKER};
      transition: all 150ms ease-in;
    }
    > span > svg > g > path,
    span > svg > g > polygon {
      fill: ${(props) =>
        props.isActive ? baseColors.GREY_DARKER : baseColors.GREY_DARKER};
      transition: all 150ms ease-in;
    }
  }
`
const BreadcrumbLink = styled.span<{ isActive: boolean }>`
  text-decoration: none;
  color: ${(props) =>
    props.isActive ? baseColors.GREY_DARKER : baseColors.GREY_DARKER};
  font-size: 17px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 150ms ease-in;
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
  cursor: ${(props) => (props.isActive ? '' : 'pointer')};

  &:hover {
    text-decoration: ${(props) => (props.isActive ? '' : 'underline')};
    color: ${baseColors.GREY_DARKER};
    transition: all 150ms ease-in;
  }
`
const TagWrapper = styled.span`
  ${sharedFlexStyles}
  margin-left: 10px;
`
const Divider = styled.span`
  ${sharedFlexStyles}
  margin: 0 15px;
`

export interface ITag {
  tagName: string
  tagBgColor: string
  tagTextColor: string
}

export const BREADCRUMB_ICON_TYPES = {
  HOME: 'HOME',
}
export interface IBreadcrumb {
  name: string
  url: string
  icon?: string
  tags?: ITag[]
}

interface IProps {
  data: IBreadcrumb[]
  history?: History
}

function Breadcrumbs(props: IProps) {
  const { data, history } = props
  const lastFourCrumbs = data && data.slice(Math.max(data.length - 4, 0))
  return (
    <BreadcrumbWrapper>
      {lastFourCrumbs?.map((item: IBreadcrumb, index: number) => {
        const isLastItem = index === lastFourCrumbs.length - 1
        return (
          <Fragment key={item?.url + index}>
            <BreadcrumbItem isActive={isLastItem}>
              <BreadcrumbLink
                isActive={isLastItem}
                onClick={() => {
                  if (!isLastItem && history) {
                    history.push(item.url)
                  }
                }}
              >
                {item?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {item?.tags &&
              item?.tags?.length > 0 &&
              item?.tags?.map((tag, i) => {
                return (
                  <TagWrapper key={i}>
                    <Tag
                      bgColor={tag.tagBgColor}
                      color={tag.tagTextColor}
                      fontWeight={600}
                    >
                      {tag.tagName && tag.tagName.toUpperCase()}
                    </Tag>
                  </TagWrapper>
                )
              })}
            {!isLastItem && (
              <Divider>
                <RightArrowIcon color={baseColors.GREY_DARKER} height={12} />
              </Divider>
            )}
          </Fragment>
        )
      })}
    </BreadcrumbWrapper>
  )
}

export default Breadcrumbs
