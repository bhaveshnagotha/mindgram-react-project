import React, { ReactElement } from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import List from '.'
import { baseColors } from '../../constants/colors'

const Container = styled.div`
  background: ${baseColors.GREY};
  height: 300px;
  overflow-y: scroll;
`

const ContainerRow = styled.div`
  border-bottom: 1px solid ${baseColors.GREY_DARK};
  height: 20px;
  padding: 10px;
`

const mockItems = Array.from(Array(1000).keys())
const renderItem = (item: ReactElement, index: number) => (
  <ContainerRow>{item}</ContainerRow>
)

storiesOf('List', module)
  .addDecorator(withKnobs)
  .add('List', () => (
    <Container>
      <List items={mockItems} renderItem={renderItem} />
    </Container>
  ))
