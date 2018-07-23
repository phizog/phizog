/* eslint-env jest */
import * as React from 'react'
import { Login } from '.'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router'

describe('<Login />', () => {
  let mock: any = jest.fn()

  it('should render correctly', () => {
    const component = shallow(
      <MemoryRouter>
        <Login
          inProgress={true}
          toggle={mock}
          profile={mock}
          history={mock}
          location={mock}
          match={mock}
          staticContext={mock}
        />
      </MemoryRouter>
    )

    expect(component).toMatchSnapshot()
  })
})
