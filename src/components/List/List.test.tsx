import React, { ReactElement } from 'react'

import { shallow } from 'enzyme'

import List from '.'

const mockItems = ['Kev', 'Andy', 'Creed']

const defaultProps = {
  items: mockItems,
  renderItem: (item: ReactElement) => <div>{item}</div>,
}

function shallowRender(newProps = {}) {
  const props = {
    ...defaultProps,
    ...newProps,
  }

  return shallow(<List {...props} />)
}

describe('<List />', () => {
  it('matches snapshot', () => {
    const wrapper = shallowRender()
    expect(wrapper).toMatchSnapshot()
  })
})
