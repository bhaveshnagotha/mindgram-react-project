import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Text from '.'
import { colors, fontSizes, fontWeights } from '../../theme'

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('With default props', () => <Text>Some text</Text>)
  .add('With custom props', () => (
    <Text
      color={colors.BLUE2}
      fontSize={fontSizes.M}
      fontWeight={fontWeights.BOLDER}
    >
      Some text
    </Text>
  ))
