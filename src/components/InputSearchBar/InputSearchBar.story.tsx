import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import InputSearchBar from '.'

storiesOf('InputSearchBar', module)
  .addDecorator(withKnobs)
  .add('InputSearchBar', () => (
    <InputSearchBar
      placeholder={text('Placeholder', 'Search')}
      id="inputSearchBarStory"
    />
  ))
