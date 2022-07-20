import React from 'react'
import styled from 'styled-components'

import Button, { buttonTypes } from '../../components/Button'

const ContainerNavOption = styled.span`
  margin-left: 15px;
`

const StyledButton = styled(Button)`
  color: #30424b;
  font-size: 16px;

  &:hover {
    text-decoration: none;
  }
`

interface INavOption {
  externalLink: string
  internalLink: string
  label: string
}

function NavOptions({
  navOptions,
  history,
}: {
  navOptions: INavOption[]
  history: {
    push: (link: string) => void
  }
}) {
  return (
    <>
      {navOptions.map((option: INavOption) => {
        const { externalLink, internalLink, label } = option
        if (internalLink) {
          return (
            <ContainerNavOption key={label}>
              <StyledButton
                onClick={() => {
                  history.push(internalLink)
                }}
                type={buttonTypes.LINK}
              >
                {label}
              </StyledButton>
            </ContainerNavOption>
          )
        }

        if (externalLink) {
          return (
            <ContainerNavOption key={label}>
              <StyledButton
                href={externalLink}
                type={buttonTypes.LINK_EXTERNAL}
                onClick={() => undefined}
              >
                {label}
              </StyledButton>
            </ContainerNavOption>
          )
        }
        return null
      })}
    </>
  )
}

export default NavOptions
