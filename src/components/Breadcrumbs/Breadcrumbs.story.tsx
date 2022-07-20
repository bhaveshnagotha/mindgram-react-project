import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Breadcrumbs, { BREADCRUMB_ICON_TYPES, IBreadcrumb } from '.'
import { baseColors } from '../../constants/colors'

export const breadcrumbData: IBreadcrumb[] = [
  {
    icon: BREADCRUMB_ICON_TYPES.HOME,
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    name: 'Teva Pharmaceuticals',
    tags: [
      {
        tagBgColor: baseColors.BLUE_SIX,
        tagName: 'Teva',
        tagTextColor: baseColors.GREY_DARKER,
      },
      {
        tagBgColor: baseColors.BLUE_SEVEN,
        tagName: 'COMPANY',
        tagTextColor: baseColors.WHITE,
      },
    ],
    url: '/dashboard/Teva Pharmaceuticals',
  },
  {
    name: 'COPAXONE',
    tags: [
      {
        tagBgColor: baseColors.CYAN_ONE,
        tagName: 'Drug',
        tagTextColor: baseColors.WHITE,
      },
    ],
    url: '/dashboard-drug/COPAXONE',
  },
]

storiesOf('Breadcrumbs', module)
  .addDecorator(withKnobs)
  .add('Breadcrumbs', () => <Breadcrumbs data={breadcrumbData} />)
