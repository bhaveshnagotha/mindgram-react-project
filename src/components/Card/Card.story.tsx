import React from 'react'

import { storiesOf } from '@storybook/react'

import Card from '.'

storiesOf('Card', module).add('Card', () => (
  <Card>
    <p style={{ padding: '20px' }}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero at qui
      nulla? Magnam libero vero odio similique alias quibusdam voluptatum dolore
      sit eveniet! Impedit et cum quaerat saepe, consequuntur doloremque.
    </p>
  </Card>
))
