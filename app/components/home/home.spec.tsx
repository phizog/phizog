/* eslint-env jest */
import * as React from 'react'
import { Home } from './index'
import { shallow } from 'enzyme'

describe('<Home />', () => {
  it('should render correctly', () => {
    const component = shallow(<Home />)

    expect(component).toMatchSnapshot()
  })
})
