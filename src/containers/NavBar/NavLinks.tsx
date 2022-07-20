import React, { Fragment } from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { NavLink, useHistory } from 'react-router-dom'
import HomeIcon from '../../components/SvgIcons/HomeIcon'
import { LANDING_TYPE } from '../App/App'

const NavLinksWrapper = styled.div`
  background: ${baseColors.TABLE_BORDER};
  padding: 0 3%;
  width: 100%;
  display: flex;
  align-items: center;
`
const StyledLinks = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${baseColors.GREY_ONE};
  margin-right: 1rem;
  position: relative;
  ::after {
    content: '';
    display: block;
    width: 0%;
    height: 2px;
    background: ${baseColors.BLUE_FIVE};
    -webkit-transition: width 0.3s;
    transition: width 0.3s;
    position: absolute;
    bottom: -3px;
    left: 0;
  }
  &.active {
    color: ${baseColors.BLUE_FIVE};
    ::after {
      width: 100%;
    }
  }
  &:hover {
    color: ${baseColors.BLUE_FIVE};
    text-decoration: none;
    ::after {
      width: 100%;
    }
  }
`
const HomeButton = styled.div`
  margin-right: 1rem;
  padding: 2px;
  cursor: pointer;
`

const NavLinks = ({ activeLandingType }) => {
  const { push, location } = useHistory()

  const homeLink =
    activeLandingType === LANDING_TYPE.CLINICAL_TRIALS.id
      ? LANDING_TYPE.CLINICAL_TRIALS.link
      : LANDING_TYPE.PATENTS.link

  return (
    <NavLinksWrapper>
      <HomeButton onClick={() => push(homeLink)}>
        <HomeIcon
          color={
            location.pathname === LANDING_TYPE.CLINICAL_TRIALS.link ||
            location.pathname === LANDING_TYPE.PATENTS.link
              ? baseColors.BLUE_FIVE
              : baseColors.GREY_ONE
          }
          height={18}
        />
      </HomeButton>
      {activeLandingType === LANDING_TYPE.CLINICAL_TRIALS.id ? (
        <Fragment>
          <StyledLinks exact={false} to="/clinical-trials/pipeline-products">
            Pipeline products
          </StyledLinks>
          <StyledLinks exact={false} to="/clinical-trials/therapeutic-areas">
            Disease Areas
          </StyledLinks>
          <StyledLinks exact={false} to="/clinical-trials/trial-catalysts">
            Catalysts
          </StyledLinks>
          <StyledLinks exact={false} to="/clinical-trials/mergers">
            Mergers
          </StyledLinks>
          <StyledLinks exact={true} to="/clinical-trials/events">
            Events
          </StyledLinks>
        </Fragment>
      ) : null}
    </NavLinksWrapper>
  )
}

export default NavLinks
