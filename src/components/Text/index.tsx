import styled from 'styled-components'
import { prop } from 'ramda'

import theme, { fontSizes, fontWeights, colors } from '../../theme'

interface IProps {
  color?: colors
  fontSize?: fontSizes
  fontWeight?: fontWeights
}

const Text = styled.span<IProps>`
  color: ${(props) => prop('color', props)};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: ${(props) => prop('fontSize', props)};
  font-weight: ${(props) => prop('fontWeight', props)};
`

Text.defaultProps = {
  color: colors.GREY_DARK,
  fontSize: fontSizes.S,
  fontWeight: fontWeights.NORMAL,
}

export default Text
