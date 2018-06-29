/* eslint-env jest */
import * as React from 'react'
import Home from './index'
import { shallow } from 'enzyme'
import { Profiler } from '../../modules/profiler'
import { join } from 'path'

describe('<Home />', () => {
  let profileProp: Profiler
  let profilePath = join(__dirname, '..', '..', '..', 'tmp')

  it('should render correctly', () => {
    profileProp = new Profiler(
      {
        user_type: 'guest',
        token: ''
      },
      profilePath
    )

    const component = shallow(<Home profile={profileProp} />)

    expect(component).toMatchSnapshot()
  })
})
