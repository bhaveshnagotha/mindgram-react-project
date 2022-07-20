import React from 'react'

import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { BarChart } from '../../../components'
import Card from '../../../components/Card'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'

const mockData = [
  {
    '1600': 60,
    category: '1245',
  },
  {
    '1600': 40,
    category: '5478',
  },
  {
    '1600': 68,
    category: '9584',
  },
  {
    '1600': 55,
    category: '1248',
  },
  {
    '1600': 33,
    category: '1600',
  },
  {
    '1600': 75,
    category: '7894',
  },
  {
    '1600': 85,
    category: '1600',
  },
  {
    '1600': 55,
    category: '1600',
  },
  {
    '1600': 33,
    category: '7845',
  },
  {
    '1600': 75,
    category: '1800',
  },
  {
    '1600': 95,
    category: '9562',
  },
  {
    '1600': 55,
    category: '1600',
  },
  {
    '1600': 33,
    category: '1359',
  },
  {
    '1600': 75,
    category: '1144',
  },
  {
    '1600': 35,
    category: '1600',
  },
]

const dataKeys = [{ keyName: '1600', color: baseColors.BLUE_FIVE }]

storiesOf('BarChart', module)
  .addDecorator(withKnobs)
  .add('Single Attribute', () => (
    <Card height={text('Card Height', '400px')} boxShadow={theme.boxShadow}>
      <BarChart
        cartesianGridStyle={{
          horizontal: boolean('Horizontal Grid Line', true),
          stroke: text('Grid Color', baseColors.GREY_DARK),
          strokeDasharray: '10 10',
          vertical: boolean('Vertical Grid Line', false),
        }}
        dataKeys={dataKeys}
        groupKey="category"
        data={mockData}
        labelColor={baseColors.GREY_DARK}
        width={950}
        height={number('Graph Height', 380)}
        showLegend={false}
        showTooltip={boolean('Show tooltip', false)}
        title="BarChart Comparing Single Attribute"
        titleStyle={{
          color: baseColors.GREY_DARKER,
          fontFamily: theme.fonts.sourceSansPro,
          fontSize: '18px',
          fontWeight: 700,
          padding: '25px 0px',
        }}
        labelSuffix={text('Label suffix', '%')}
      />
    </Card>
  ))
