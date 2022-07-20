import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Loading from '.'

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('Loading', () => (
    <Loading loadingText={text('Loading text', 'Loading')} />
  ))
