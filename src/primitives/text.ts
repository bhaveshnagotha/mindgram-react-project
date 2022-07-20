import styled from 'styled-components'
import { color, layout, space, typography } from 'styled-system'
import theme from '../theme'

export const Text = styled.p`
  font-family: ${theme.fonts.sourceSansPro};
  font-size: 18px;

  ${space}
  ${typography}
  ${color}
  ${layout}
`
