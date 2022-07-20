import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Button from '.'
import { ButtonType } from './constants'

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Normal Button', () => (
    <Button onClick={() => alert('Hey')}>Submit</Button>
  ))
  .add('Link Button', () => (
    <Button onClick={() => alert('Hey')} type={ButtonType.LINK}>
      Submit
    </Button>
  ))
