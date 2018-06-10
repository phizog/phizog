import * as React from 'react'
import { shallow } from 'enzyme'
import { Col } from './Col'

describe('<Col', () => {
  it('should render different viewport sizes', () => {
    expect(
      shallow(<Col xs={12} sm={6} md={4} lg={3} />).hasClass(
        'col-xs-12 col-sm-6 col-md-4 col-lg-3'
      )
    ).toBe(true)
  })
  it('should support custom classname', () => {
    expect(shallow(<Col className='custom' />).hasClass('custom')).toBe(true)
  })
  it('should support custom styles', () => {
    expect(
      shallow(<Col style={{ color: 'red' }} />).get(0).props.style.color
    ).toEqual('red')
  })
  it('should render passed children', () => {
    expect(
      shallow(
        <Col>
          <p>Some text</p>
        </Col>
      )
        .find('p')
        .text()
    ).toEqual('Some text')
  })
  it('should support any custom props', () => {
    expect(shallow(<Col someProp={1} />).prop('someProp')).toEqual(1)
  })
})
