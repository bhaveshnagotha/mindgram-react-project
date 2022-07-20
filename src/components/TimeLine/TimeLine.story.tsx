import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { number, text } from '@storybook/addon-knobs'
import TimeLine from '.'
import Card from '../Card'

export const timeLineData = [
  {
    stepText: 'Step text 1',
    stepTitle: 'Lorem ipsum',
  },
  {
    stepText: 'Step text 2',
    stepTitle: 'Lorem ipsum dolor',
  },
  {
    stepText: 'Step text 3',
    stepTitle: 'Lorem ipsum',
  },
  {
    stepText: 'Step text 4',
    stepTitle: 'Lorem ipsum dolor sit amet consectetur as asassaf',
  },
  {
    stepText: 'Step text 5',
    stepTitle: 'Lorem ipsum',
  },
  {
    stepText: 'Step text 6',
    stepTitle: 'Lorem',
  },
  {
    stepText: 'Step text 7',
    stepTitle: 'Lorem',
  },
  {
    stepText: '',
    stepTitle: 'Lorem Ipsum',
  },
]

storiesOf('TimeLine', module)
  .addDecorator(withKnobs)
  .add('TimeLine', () => (
    <Card style={{ padding: '30px 20px' }}>
      <TimeLine
        data={timeLineData}
        activeIndex={number('Active Step', 3)}
        title={text('Title', 'Timeline Header')}
      />
    </Card>
  ))
