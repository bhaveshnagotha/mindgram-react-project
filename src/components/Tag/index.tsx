import styled from 'styled-components'
import theme from '../../theme'

export interface ITag {
  bgColor?: string
  color?: string
  borderColor?: string
  height?: number
  width?: string
  fontSize?: number
  fontWeight?:
    | number
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'bold'
    | 'normal'
    | 'bolder'
    | 'lighter'
    | undefined
}

const Tag = styled.span<ITag>`
  background: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
  ${(props) =>
    props.borderColor ? `border: 2px solid ${props.borderColor}` : ''};
  ${(props) => (props.color ? `color: ${props.color}` : '')};
  ${(props) => (props.width ? `width: ${props.width}` : '')};
  font-family: ${theme.fonts.sourceSansPro};
  display: flex;
  justify-content: center;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  align-items: center;
  border-radius: 20px;
  // min-height: ${({ height }) => height || 25}px;
  height: auto;
  padding: 3px 15px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 12)}px;
  min-width: 60px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  // overflow: hidden;
  // white-space: nowrap;
  flex-wrap: wrap;
`

export default Tag
