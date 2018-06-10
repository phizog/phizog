import { phizogLogger } from './index'

describe('phizogLogger', () => {
  it('should be defined', () => {
    expect(phizogLogger).not.toBe(undefined)
  })
  it('should have log method', () => {
    expect(typeof phizogLogger.log).toBe('function')
  })
  it('should have error method', () => {
    expect(typeof phizogLogger.error).toBe('function')
  })
})
