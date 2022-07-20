import styled from 'styled-components'
import {
  background,
  border,
  color,
  layout,
  position,
  shadow,
  space,
} from 'styled-system'

type Props = any
export const Box = styled.div<Props>`
  box-sizing: border-box;
  ${color}
  ${layout}
  ${space}
  ${border}
  ${background}
  ${position}
  ${shadow}
`
