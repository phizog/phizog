import * as React from 'react'
import { shallow } from 'enzyme'
import { Row } from './Row'

describe('<Row', () => {
  it('should render a row element', () => {
    expect(shallow(<Row />).hasClass('row')).toBe(true)
  })
  it('should support custom classname', () => {
    const component = <Row className='custom' />
    expect(shallow(component).hasClass('custom')).toBe(true)
    expect(shallow(component).hasClass('row')).toBe(true)
  })
  it('should support custom styles', () => {
    expect(
      shallow(<Row style={{ color: 'red' }} />).get(0).props.style.color
    ).toEqual('red')
  })
  it('should render passed children', () => {
    expect(
      shallow(
        <Row>
          <p>Some text</p>
        </Row>
      )
        .find('p')
        .text()
    ).toEqual('Some text')
  })
  it('should support any custom props', () => {
    expect(shallow(<Row someProp={1} />).prop('someProp')).toEqual(1)
  })
})
