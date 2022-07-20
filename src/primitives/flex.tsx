import styled from 'styled-components'
import {
  background,
  border,
  color,
  flexbox,
  layout,
  position,
  shadow,
  space,
} from 'styled-system'

type Props = any
export const Flex = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  
  ${color}
  ${layout}
  ${space}
  ${border}
  ${background}
  ${position}
  ${shadow}
  ${flexbox}
`
