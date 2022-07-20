import React from 'react'

import { shallow } from 'enzyme'

import ErrorMessage from '.'

const defaultProps = {}

function shallowRender(newProps = {}) {
  const props = {
    ...defaultProps,
    ...newProps,
  }
  return shallow(<ErrorMessage {...props} />)
}

describe('<ErrorMessage />', () => {
  it('matches default snapshot', () => {
    const wrapper = shallowRender()
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const wrapper = shallowRender({
      message: 'Whoops!',
    })
    expect(wrapper).toMatchSnapshot()
  })
})
