import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { boolean } from '@storybook/addon-knobs'
import Tree from '.'
import { deeplyNestedMockData, mockData, NODE_COLOR_MAPPING } from './mockData'

storiesOf('Tree', module)
  .addDecorator(withKnobs)
  .add('Tree', () => (
    <Tree
      data={mockData}
      nodeColorMapping={NODE_COLOR_MAPPING}
      width={1000}
      height={500}
      onDetailsClick={(d) => alert('clicked on details')}
      onClose={(d) => {
        alert('Hey')
      }}
      onNodeTextClick={(d) => {
        alert('Hey')
      }}
      hasZoomBtns={boolean('Show Zoom Buttons', true)}
      isZoomAbleOnScroll={boolean('Zoom On Scroll', true)}
    />
  ))

storiesOf('Tree', module)
  .addDecorator(withKnobs)
  .add('Tree with deeply nested data', () => (
    <Tree
      data={deeplyNestedMockData}
      nodeColorMapping={NODE_COLOR_MAPPING}
      width={1000}
      height={600}
      onDetailsClick={(d) => {
        alert('Hey')
      }}
      onNodeTextClick={(d) => {
        alert('Hey')
      }}
      onClose={(d) => {
        alert('Hey')
      }}
      hasZoomBtns={boolean('Show Zoom Buttons', true)}
      isZoomAbleOnScroll={boolean('Zoom On Scroll', true)}
    />
  ))
