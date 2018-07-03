/* eslint-env jest */
import * as React from 'react'
import { Login } from './index'
import { shallow } from 'enzyme'

describe('<Login />', () => {
  it('should render correctly', () => {
    const component = shallow(<Login />)

    expect(component).toMatchSnapshot()
  })
})
