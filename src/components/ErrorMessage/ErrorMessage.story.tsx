import React from 'react'

import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import ErrorMessage from '.'

storiesOf('Error', module)
  .addDecorator(withKnobs)
  .add('ErrorMessage', () => (
    <ErrorMessage
      message="Something went wrong!"
      color={text('Color', 'red')}
    />
  ))
