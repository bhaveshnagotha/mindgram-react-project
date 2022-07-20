import React, { useState } from 'react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Checkbox from '.'

function CheckboxWrapper() {
  const [checked, setChecked] = useState(true)
  return (
    <Checkbox
      checked={checked}
      label={text('label', 'Checkbox')}
      isInverted={boolean('isInverted', false)}
      onChange={() => setChecked(!checked)}
    />
  )
}
storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => <CheckboxWrapper />)
