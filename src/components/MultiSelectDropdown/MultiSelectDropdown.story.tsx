import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import MultiSelectDropdown from '.'

const data = [
  { key: 'Fierce Pharma', label: 'Fierce Pharma', tag: 'tag' },
  { key: 'GlaxoSmithKline', label: 'GlaxoSmithKline', tag: 'tag' },
  { key: 'Gladstone', label: 'Gladstone', tag: 'tag' },
  { key: 'GeneOne', label: 'GeneOne', tag: 'tag' },
]

function Wrapper() {
  return (
    <MultiSelectDropdown
      label={text('label', 'MultiSelectDropdown')}
      values={data}
      onSelect={(item) => alert(item)}
      isDisabled={boolean('isDisabled', false)}
      onClear={() => alert('All cleared!')}
      id="multiSelectDropdownStory"
    />
  )
}

storiesOf('MultiSelectDropdown', module)
  .addDecorator(withKnobs)
  .add('MultiSelectDropdown', () => <Wrapper />)
