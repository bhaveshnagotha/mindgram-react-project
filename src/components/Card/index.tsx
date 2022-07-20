import styled from 'styled-components'

import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../../containers/App/App.styles'

interface ICard {
  height?: string
  isFlex?: true
  alignItems?: string
  justifyContent?: string
  padding?: string
  backGroundColor?: string
  boxShadow?: string
  width?: string
}

const Card = styled.div<ICard>`
  ${scrollBarStyles}
  border-radius: 4px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : 'unset')};
  background-color: ${(props) =>
    props.backGroundColor ? props.backGroundColor : baseColors.WHITE};
  overflow-y: hidden;
  ${(props) => props.isFlex && `display: flex;`}
  ${(props) => props.isFlex && `align-items: ${props.alignItems || 'center'};`}
  ${(props) =>
    props.isFlex && `justify-content: ${props.justifyContent || 'center'};`}
  padding: ${(props) => props.padding || '0'};
`

export default Card
