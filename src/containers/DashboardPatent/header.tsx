import { History } from 'history'
import React from 'react'
import styled from 'styled-components'
import { IMatch } from '.'
import BackIcon from '../../components/SvgIcons/BackIcon'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'

interface IText {
  color?: string
  fontWeight?: number
  fontSize?: string
}

const Text = styled.p<IText>`
  margin: 0 15px;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || 400};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: ${(props) => props.fontSize || '14px'};
`
interface IPill {
  backgroundColor: string
  color?: string
}

export const Pill = styled.span<IPill>`
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => props.backgroundColor};
  border: 2px solid ${(props) => props.backgroundColor};
  padding: 5px 15px;
  border-radius: 15px;
  color: ${(props) => props.color || baseColors.GREY_DARKER};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin-left: 10px;
  height: 25px;
`

export default function Header({
  history,
  match,
}: {
  history: History
  match: IMatch
}) {
  return (
    <div className="d-flex w-100 justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <BackIcon
          height={20}
          color={baseColors.GREY_DARK}
          onClick={() => history.goBack()}
        />
        <Text color={baseColors.GREY_DARKER} fontSize="20px" fontWeight={700}>
          {match.params.patentNumber}
        </Text>
        <Pill backgroundColor={baseColors.YELLOW_ONE} color={baseColors.WHITE}>
          PATENT
        </Pill>
      </div>
    </div>
  )
}
