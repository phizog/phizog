/* eslint-env jest */
import { constants } from '../constants'
import { Profiler } from './index'
import { join } from 'path'

describe('Profiler', () => {
  let instance: Profiler

  it('Check instance is type of Profiler', () => {
    instance = new Profiler(
      {
        user_type: 'guest'
      },
      join(__dirname, '..', '..', '..', 'tmp')
    )
    expect(instance).toBeInstanceOf(Profiler)
  })

  it(`create guest profile with token`, () => {
    instance = new Profiler(
      {
        user_type: 'guest',
        token: 'blah blah blah'
      },
      join(__dirname, '..', '..', '..', 'tmp')
    )
    expect(instance.save()).toBe(true)
  })

  it(`create authorized profile`, () => {
    instance = new Profiler(
      {
        user_type: 'authorized',
        token: 'blah blah blah',
        gistId: 'asd2342fsdvd3s7',
        lastSyncDate: new Date()
      },
      join(__dirname, '..', '..', '..', 'tmp')
    )
    expect(instance.save()).toBe(true)
  })

  it(`load profile`, () => {
    instance = new Profiler(
      {
        user_type: 'authorized',
        token: 'asdfasdfa'
      },
      join(__dirname, '..', '..', '..', 'tmp')
    )
    expect(instance.load()).toBe(true)
  })
})
