import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Icon from '.'

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('Icon', () => <Icon type="search" />)
