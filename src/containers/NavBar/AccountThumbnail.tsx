import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { propOr } from 'ramda'

import Button, { buttonTypes } from '../../components/Button'
import { baseColors } from '../../constants/colors'
import SearchBar from '../SearchBar'
import { ContainerSearchBar } from '../TrialNew/Left/TrialDocumentsLeftPanel/TrialDocumentsLeftPanel.styles'
import { NAVBAR_HEIGHT } from '../App/App.styles'
import DownArrowIcon from '../../components/SvgIcons/DownArrowIcon'
import CubeIcon from '../../components/SvgIcons/CubeIcon'
import { LANDING_TYPE } from '../App/App'
import theme from '../../theme'
import { useAuth } from '../../hooks/useAuth'
import { Permissions } from '../../constants/permissions'

export const SHARED_RIGHT_MARGIN = 50

const Container = styled.div`
  height: ${NAVBAR_HEIGHT}px;
  position: relative;
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-gap: 10px;
`
const MenuWrapper = styled.div`
  grid-column: 2 / span 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
`
const SearchWrapper = styled.div`
  height: 38px;
`

const AccountThumbnailImage = styled.img`
  border-radius: 50%;
  cursor: pointer;
  height: 35px;
`

const AccountDropdown = styled(Dropdown)`
  > .dropdown-toggle {
    cursor: pointer;
    ::after {
      display: none;
    }
  }
  > .dropdown-menu {
    border: 0;
    background: ${baseColors.WHITE};
    padding: 0.7rem 1rem;
    box-shadow: ${theme.boxShadow};
    border-radius: 4px;

    > span {
      letter-spacing: 0.3px;
      font-size: 15px;
    }
  }
`

const StyledLandingDropdown = styled(Dropdown)`
  &.show .dropdown-toggle {
    svg.cube path {
      fill: ${baseColors.BLUE_FIVE} !important;
    }
  }
  > .dropdown-toggle {
    cursor: pointer;
    svg.cube path {
      fill: ${baseColors.GREY_ONE} !important;
    }
    ::after {
      display: none;
    }
  }
  > .dropdown-menu {
    width: 350px;
    padding: 1rem;
    border: 0;
    box-shadow: ${theme.boxShadow};
    border-radius: 4px;
    > .dropdown-item {
      white-space: normal;
      padding: 0.8rem;
      border-radius: 2px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &:hover {
        background: ${baseColors.GREY_LIGHTER};
      }
      &.active {
        background: rgba(110, 125, 239, 0.16);
      }
      h3 {
        color: ${baseColors.GREY_DARKER};
        font-weight: 600;
        font-size: 1rem;
        line-height: 23px;
        margin-bottom: 5px;
      }
      p {
        color: ${baseColors.GREY_ONE};
        font-size: 0.875rem;
        line-height: 18px;
        margin: 0;
      }
    }
  }
`

function LandingDropdown({ activeLandingType }: { activeLandingType: string }) {
  const history = useHistory()

  const handleSelect = (pageId) => {
    history.push(LANDING_TYPE?.[pageId]?.link)
  }

  return (
    <StyledLandingDropdown>
      <Dropdown.Toggle as="div" variant="success" id="landing-dropdown">
        <CubeIcon className="cube" height={25} />
        <DownArrowIcon height={23} color={baseColors.GREY_ONE} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(LANDING_TYPE).map((pageId) => (
          <Dropdown.Item
            active={activeLandingType === LANDING_TYPE?.[pageId]?.id}
            key={pageId}
            onSelect={() => handleSelect(pageId)}
          >
            <h3>{LANDING_TYPE?.[pageId]?.title}</h3>
            <p>{LANDING_TYPE?.[pageId]?.desc}</p>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </StyledLandingDropdown>
  )
}

function AccountThumbnail({
  onLogout,
  isHomeRoute,
  activeLandingType,
}: {
  onLogout: () => void
  isHomeRoute: boolean
  activeLandingType: string
}) {
  const [ref] = useState(React.createRef<HTMLDivElement>())
  const history = useHistory()
  const { user, isAuthenticated } = useAuth()

  const email: string = user
    ? propOr('A@test.com', 'email')(user)
    : 'A@test.com'
  const avatarChar = email.substring(0, 1)
  const imageUrl = `https://cdn.auth0.com/avatars/${avatarChar}.png`
  const userPermissions: string[] = propOr([], 'permissions')(user)
  return (
    <Fragment>
      <Container ref={ref}>
        <SearchWrapper>
          {!isHomeRoute && isAuthenticated && (
            <ContainerSearchBar>
              <SearchBar
                fontSize={14}
                history={history}
                isAuthenticated={isAuthenticated}
                activeLandingType={activeLandingType}
              />
            </ContainerSearchBar>
          )}
        </SearchWrapper>

        <MenuWrapper>
          &nbsp;
          {userPermissions.includes(Permissions.ReadPatentData) && (
            <LandingDropdown activeLandingType={activeLandingType} />
          )}
          {/*<Link to="/watchlist/notifications">*/}
          {/*  <NotificationIcon height={25} color={baseColors.GREY_ONE} />*/}
          {/*</Link>*/}
          <div style={{ gridColumn: '3 / span 1' }}>
            <AccountDropdown>
              <Dropdown.Toggle as="div" variant="success" id="account-dropdown">
                <AccountThumbnailImage src={imageUrl} />
                <DownArrowIcon height={23} color={baseColors.GREY_ONE} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <span>{email}</span>
                <div className="d-flex justify-content-end">
                  <Button type={buttonTypes.LINK} onClick={onLogout}>
                    Log out
                  </Button>
                </div>
                {userPermissions.includes(Permissions.WriteCmsData) && (
                  <div className="d-flex justify-content-end">
                    <Link to={'/admin/cms'}>CMS</Link>
                  </div>
                )}
              </Dropdown.Menu>
            </AccountDropdown>
          </div>
        </MenuWrapper>
      </Container>
    </Fragment>
  )
}

export default AccountThumbnail
