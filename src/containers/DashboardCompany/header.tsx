import { History } from 'history'
import React from 'react'
import styled from 'styled-components'
import { IMatch } from '.'
import TabularViewIcon from '../../components/SvgIcons/TabularViewIcon'
import TreeViewIcon from '../../components/SvgIcons/TreeViewIcon'
import Switch from '../../components/Switch'
import { baseColors } from '../../constants/colors'

interface IPill {
  backgroundColor: string
  color?: string
  cursor?: 'pointer'
  flex?: number
  maxWidth?: number
}

export const Pill = styled.span<IPill>`
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => props.backgroundColor};
  padding: 5px 15px;
  border-radius: 15px;
  color: ${(props) => props.color || baseColors.GREY_DARKER};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.maxWidth ? `max-width:${props.maxWidth}px` : '')};
  margin-left: 10px;
  height: 25px;
  text-transform: uppercase;
  cursor: ${(props) => (props.cursor ? props.cursor : 'unset')};
  user-select: none;
  ${(props) => (props.flex ? `flex: ${props.flex}` : '')};
`

export default function Header({
  history,
  match,
  onSwitchView,
  isTreeViewActive,
}: {
  history: History
  isTreeViewActive: boolean
  match: IMatch
  onSwitchView: (d: any) => void
}) {
  return (
    <div className="d-flex w-100 justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {/* <BackIcon
          height={20}
          color={baseColors.GREY_DARK}
          onClick={() => history.goBack()}
        />
        <Text color={baseColors.GREY_DARKER} fontSize="20px" fontWeight={700}>
          {match.params.companyName}
        </Text>
        <Pill
          backgroundColor={baseColors.BLUE_SIX}
          color={baseColors.GREY_DARKER}
        >
          Teva
        </Pill>
        <Pill backgroundColor={baseColors.BLUE_SEVEN} color={baseColors.WHITE}>
          Company
        </Pill> */}
      </div>
      <Switch
        hasActiveBg={true}
        isActive={isTreeViewActive}
        handleSwitch={(d) => onSwitchView(d)}
        switchText="view"
        switchIcons={{
          iconLeft: (
            <TabularViewIcon
              height={16}
              color={
                !isTreeViewActive ? baseColors.WHITE : baseColors.GREY_DARK
              }
            />
          ),
          iconRight: (
            <TreeViewIcon
              height={16}
              color={isTreeViewActive ? baseColors.WHITE : baseColors.GREY_DARK}
            />
          ),
        }}
      />
    </div>
  )
}
