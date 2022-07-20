import { number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import Tabs from '.'

const TabOptions = ['Company', 'About']

function TabsStory() {
  const [activeTab, setActiveTab] = useState('Company')

  function onTabChange(value) {
    setActiveTab(value)
  }

  return (
    <div
      style={{
        backgroundColor: '#efefef',
        padding: '8px',
      }}
    >
      <Tabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        options={TabOptions}
        id="tabs"
        tabWidth={number('Tab Width', 300)}
      />
    </div>
  )
}

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Tabs', () => <TabsStory />)
