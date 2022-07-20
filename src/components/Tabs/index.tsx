import React from 'react'
import { Tab, Tabs as BootstrapTabs } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'

interface ITabs {
  id: string
  activeTab: string
  onTabChange: SelectCallback
  options: string[]
  tabWidth?: number
}

export default function Tabs(props: ITabs) {
  const { activeTab, onTabChange, id, options, tabWidth } = props
  return (
    <StyledTabs tabWidth={tabWidth}>
      <BootstrapTabs activeKey={activeTab} onSelect={onTabChange} id={id}>
        {options.map((opt, key) => (
          <Tab key={key} eventKey={opt} title={opt} />
        ))}
      </BootstrapTabs>
    </StyledTabs>
  )
}

export const StyledTabs = styled.div<{ tabWidth?: number }>`
  width: 100%;
  z-index: 2;

  > nav {
    border-bottom: unset;
    overflow-y: hidden;
    display: flex;
    justify-content: flex-start;

    > a {
      padding: 0.8rem 1rem;
      text-align: center;
      flex: 1;
      border: none !important;
      border-bottom: 2px solid transparent !important;
      transition: all ease-in 200ms;
      color: ${baseColors.GREY_DARKER};
      border-radius: 10px 10px 0 0 !important;
      font-weight: 600;
      margin-bottom: 0px !important;
      background: rgba(255, 255, 255, 0.5);
      max-width: ${(props) =>
        props.tabWidth ? `${props.tabWidth}px` : '100%'};

      &:hover {
        margin-bottom: 0px !important;
        box-shadow: ${theme.boxShadow};
        transition: all ease-in 200ms;
        color: ${baseColors.BLUE_FIVE};
        background: #ffffff;
      }
    }
    > a.active {
      border-bottom: 2px solid ${baseColors.BLUE_FIVE} !important;
      box-shadow: ${theme.boxShadow};
      color: ${baseColors.BLUE_FIVE} !important;
      background: #ffffff;
    }
  }
`
