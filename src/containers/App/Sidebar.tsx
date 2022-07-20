import { Menu, MenuItem, ProSidebar, SidebarContent } from 'react-pro-sidebar'
import React, { useState } from 'react'
import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from './App.styles'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import './styles.scss'

const CustomMenuItem = styled(MenuItem)<{}>`
  margin-top: 50px;
`

const LinkText = styled.span({
  color: 'black',
  marginLeft: 0,
  fontSize: '14px',
})

const Icon = styled.img({
  width: 30,
  height: 'auto',
})

const StyledLink = styled(Link)({
  textOverflow: 'clip',
})

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div
      onMouseEnter={(e) => {
        setCollapsed(false)
      }}
      onMouseLeave={(e) => {
        setCollapsed(true)
      }}
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        position: 'absolute',
        height: '100%',
        zIndex: 99999,
      }}
    >
      <ProSidebar
        width={'auto'}
        collapsed={collapsed}
        collapsedWidth={SIDEBAR_WIDTH}
      >
        <SidebarContent>
          <Menu>
            <CustomMenuItem icon={<Icon src={'/icons/diseaseareas.png'} />}>
              <StyledLink to="/clinical-trials/therapeutic-areas">
                <LinkText>Disease Areas</LinkText>
              </StyledLink>
            </CustomMenuItem>
            <CustomMenuItem icon={<Icon src={'/icons/news.png'} />}>
              <StyledLink to="/clinical-trials/trial-catalysts">
                <LinkText>News</LinkText>
              </StyledLink>
            </CustomMenuItem>
            <CustomMenuItem icon={<Icon src={'/icons/deals.png'} />}>
              <StyledLink to="/clinical-trials/deals-dashboard">
                <LinkText>Deals</LinkText>
              </StyledLink>
            </CustomMenuItem>
            <CustomMenuItem icon={<Icon src={'/icons/milestones.png'} />}>
              <StyledLink to="/clinical-trials/events">
                <LinkText>Milestones</LinkText>
              </StyledLink>
            </CustomMenuItem>
            <CustomMenuItem icon={<Icon src={'/icons/watchlist.png'} />}>
              <StyledLink to="/watchlist/notifications">
                <LinkText>Watchlist</LinkText>
              </StyledLink>
            </CustomMenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  )
}

export default Sidebar
