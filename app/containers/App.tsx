import * as React from 'react'
import { Auth } from '../Provider/Auth'
import { IProfiler } from '../modules/profiler/interfaces'

export default class App extends React.Component {
  render () {
    return (
      <Auth>{(profile: IProfiler) => <p>{profile.data.user_type}</p>}</Auth>
    )
  }
}
