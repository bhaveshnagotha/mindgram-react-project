import { shallow } from 'enzyme'
import React from 'react'

import Loading from '.'

describe('<Loading />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper).toMatchSnapshot()
  })
})
