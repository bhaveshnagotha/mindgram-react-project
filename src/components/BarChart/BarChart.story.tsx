import React from 'react'

import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import BarChart, { IDataKey } from '.'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import Card from '../Card'

const data = [
  {
    'Denied Trials Avg': 60,
    IPR101: 164,
    'Instituted Trials Avg': 85,
    category: 'Civil Case',
  },
  {
    'Denied Trials Avg': 50,
    IPR101: 44,
    'Instituted Trials Avg': 85,
    category: 'Exhibit',
  },
  {
    'Denied Trials Avg': 50,
    IPR101: 8,
    'Instituted Trials Avg': 60,
    category: 'Federal Case',
  },
  {
    'Denied Trials Avg': 100,
    IPR101: 9,
    'Instituted Trials Avg': 100,
    category: 'General Ref.',
  },
  {
    'Denied Trials Avg': 70,
    IPR101: 9,
    'Instituted Trials Avg': 70,
    category: 'General "See" Ref.',
  },
  {
    'Denied Trials Avg': 60,
    IPR101: 25,
    'Instituted Trials Avg': 90,
    category: 'Inline Statute',
  },
  {
    'Denied Trials Avg': 50,
    IPR101: 1,
    'Instituted Trials Avg': 50,
    category: 'IPR Case',
  },
  {
    'Denied Trials Avg': 60,
    IPR101: 0,
    'Instituted Trials Avg': 50,
    category: 'MPEP',
  },
  {
    'Denied Trials Avg': 50,
    IPR101: 17,
    'Instituted Trials Avg': 50,
    category: 'Statute',
  },
]

const dataKeys: IDataKey[] = [
  { color: '#8884d8', keyName: 'IPR101' },
  {
    color: '#82ca9d',
    keyName: 'Instituted Trials Avg',
  },
  {
    color: '#df7599',
    keyName: 'Denied Trials Avg',
  },
]

storiesOf('BarChart', module)
  .addDecorator(withKnobs)
  .add('Multiple Attribute', () => (
    <Card>
      <BarChart
        cartesianGridStyle={{
          horizontal: boolean('Horizontal Grid Line', true),
          stroke: text('Grid Color', baseColors.GREY_DARK),
          strokeDasharray: '10 10',
          vertical: boolean('Vertical Grid Line', false),
        }}
        data={data}
        dataKeys={dataKeys}
        groupKey="category"
        width={1150}
        title={text('Title', 'BarChart Comparing Multiple Attribute')}
        showLegend={boolean('Show legend', true)}
        legendLayout={{
          align: 'right',
          layout: 'horizontal',
          legendFontSize: '12px',
          legendFontWeight: 700,
          verticalAlign: 'top',
        }}
        labelColor={text('Label Color', baseColors.GREY_DARK)}
        labelPrefix={text('Label prefix', '')}
        labelSuffix={text('Label suffix', '%')}
        showTooltip={boolean('Show tooltip', false)}
        titleStyle={{
          color: text('Title Color', baseColors.GREY_DARKER),
          fontFamily: theme.fonts.sourceSansPro,
          fontSize: '18px',
          fontWeight: 700,
          padding: '25px 20px',
          textAlign: 'left',
          width: '93%',
        }}
      />
    </Card>
  ))
