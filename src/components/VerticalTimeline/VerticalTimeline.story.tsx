import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { number, text } from '@storybook/addon-knobs'
import VerticalTimeline from '.'
import Card from '../Card'

export const timelineData = [
  {
    text: 'Step text 1',
    title: 'Lorem ipsum',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 2',
    title: 'Lorem ipsum dolor',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 3',
    title: 'Lorem ipsum',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 4',
    title: 'Lorem ipsum dolor sit amet consectetur as asassaf',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 5',
    title: 'Lorem ipsum',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 6',
    title: 'Lorem',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 7',
    title: 'Lorem',
    type: '',
    id: -1,
    url: '',
  },
  {
    text: 'Step text 8',
    title: 'Lorem Ipsum',
    type: '',
    id: -1,
    url: '',
  },
]

storiesOf('VerticalTimeline', module)
  .addDecorator(withKnobs)
  .add('VerticalTimeline', () => (
    <Card style={{ padding: '30px 20px' }}>
      <VerticalTimeline
        data={timelineData}
        activeIndex={number('Active Step', 3)}
        title={text('Title', 'Vertoca; Timeline Header')}
        onStepClick={(id, url, type) => {
          return
        }}
        markerSize={25}
      />
    </Card>
  ))
