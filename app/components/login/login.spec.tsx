/* eslint-env jest */
import * as React from 'react'
import { Login } from '.'
import { shallow } from 'enzyme'

describe('<Login />', () => {
  let mock: any = jest.fn()

  it('should render correctly', () => {
    const component = shallow(<Login inProgress={true} toggle={mock} profile={mock} history={mock} location={mock} match={mock} staticContext={mock} />)

    expect(component).toMatchSnapshot()
  })
})
