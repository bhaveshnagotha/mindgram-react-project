import React from 'react'

import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Tag } from '..'
import { baseColors } from '../../constants/colors'

function TagWrapper() {
  return (
    <Tag
      bgColor={text('Tag Background color', baseColors.YELLOW_ONE)}
      borderColor={text('Tag Border color', baseColors.YELLOW_ONE)}
      color={text('Tag Font color', baseColors.WHITE)}
      width="60px"
    >
      Test Tag
    </Tag>
  )
}

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('Tag', () => <TagWrapper />)
