import { messageSerializer } from './util'

describe.only('messageSerialized', () => {
  it('should return serialized object from arguments', () => {
    expect(messageSerializer(200)).toEqual({ status: 200, data: undefined })
    expect(messageSerializer(200, [1, 2, 3])).toEqual({
      status: 200,
      data: [1, 2, 3]
    })
    expect(messageSerializer(200, { name: 'name' })).toEqual({
      status: 200,
      data: { name: 'name' }
    })
  })
})
