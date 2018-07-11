/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { Home } from '.'

describe('<Home />', () => {
  let mock: any = jest.fn()

  it('should render correctly', () => {
    const component = shallow(<Home inProgress={true} toggle={mock} profile={mock} history={mock} location={mock} match={mock} staticContext={mock} />)

    expect(component).toMatchSnapshot()
  })
})
