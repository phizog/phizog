import * as React from 'react'
import { Row } from '../Grid/Row/Row'
import { Col } from '../Grid/Col/Col'

export default class Terms extends React.Component<any> {
  render () {
    return (
      <div className='window__terms'>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <p>Terms & Privacy</p>
          </Col>
        </Row>
      </div>
    )
  }
}
