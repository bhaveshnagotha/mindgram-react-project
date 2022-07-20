import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Dropdown, { IValue } from '.'
import { Box, Flex, Text } from '../../primitives'

const items: IValue[] = [
  {
    key: 'jim',
    label: 'Jim',
  },
  {
    key: 'dwight',
    label: 'Dwight',
  },
  {
    key: 'michael',
    label: 'Michael',
  },
]

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Dropdown', () => (
    <Dropdown
      values={items}
      onSelect={(item) => alert(item)}
      value={items[0].key}
    />
  ))
  .add('Dropdown on the left', () => (
    <Flex width="100%" justifyContent="space-evenly">
      <Text>Some example text</Text>
      <Box position="relative" top="12px">
        <Dropdown
          onSelect={(item) => alert(item)}
          value={items[0].key}
          values={items}
          left
        />
      </Box>
    </Flex>
  ))
