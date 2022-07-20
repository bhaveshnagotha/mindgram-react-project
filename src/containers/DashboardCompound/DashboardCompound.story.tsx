import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'

import { Card, Tree } from '../../components'
import { NODE_COLOR_MAPPING, NODE_TYPES } from './treeHelper'

const buildTreeData: any = {
  children: [
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  name: 'IPR2017-00195',
                  nodeType: NODE_TYPES.trials,
                },
              ],
              name: 'PTAB Trials',
              nodeType: NODE_TYPES.trials,
            },
          ],
          name: '700458',
          nodeType: NODE_TYPES.patent,
        },
      ],
      name: 'Patents',
      nodeType: NODE_TYPES.patent,
    },
    {
      children: [
        {
          name: 'Teva Pharmaceuticals',
          nodeType: NODE_TYPES.company,
        },
      ],
      name: 'Parent Company',
      nodeType: NODE_TYPES.companies,
    },
  ],
  name: 'COPAXONE',
  nodeType: NODE_TYPES.root,
}
export default function DashboardCompoundTree() {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <Card padding="0 20px" backGroundColor="transparent">
      <Tree
        width={1200}
        height={700}
        data={buildTreeData}
        nodeColorMapping={NODE_COLOR_MAPPING}
        onDetailsClick={(d) => {
          setIsShowing(true)
        }}
        onNodeTextClick={(d) => {
          setIsShowing(true)
        }}
        onClose={(d) => {
          setIsShowing(false)
        }}
        hasZoomBtns={true}
        isZoomAbleOnScroll={true}
        isDetailsCardShowing={isShowing}
      />
    </Card>
  )
}

storiesOf('Tree', module)
  .addDecorator(withKnobs)
  .add('Dashboard Compound Tree', () => <DashboardCompoundTree />)
