import * as React from 'react'
import { authorizer } from '../../providers/auth'

@authorizer()
export default class Home extends React.Component<any> {
  render () {
    return (
      <div>
        <div data-tid='container'>
          <p>This is,</p>
          <h2>Phizog</h2>
        </div>
      </div>
    )
  }
}
