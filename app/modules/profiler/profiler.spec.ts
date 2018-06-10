/* eslint-env jest */
import { Profiler } from './index'
import { join } from 'path'
import { existsSync } from 'fs'

describe('Profiler', () => {
  let instance: Profiler
  let profilePath = join(__dirname, '..', '..', '..', 'tmp')

  it('Check instance is type of Profiler', () => {
    instance = new Profiler(
      {
        user_type: 'guest',
        token: ''
      },
      profilePath
    )
    expect(instance).toBeInstanceOf(Profiler)
  })

  it(`create guest profile with token`, () => {
    instance = new Profiler(
      {
        user_type: 'guest',
        token: 'blah blah blah'
      },
      profilePath
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
      profilePath
    )
    expect(instance.save()).toBe(true)
  })

  it(`load profile`, () => {
    instance = new Profiler(
      {
        user_type: 'authorized',
        token: 'blah'
      },
      profilePath
    )
    expect(instance.load()).toBe(true)
  })

  it(`create new profile while the profile path doesn't exist`, () => {
    instance = new Profiler(
      {
        user_type: 'guest',
        token: ''
      },
      profilePath
    )
    instance.load()
    expect(existsSync(profilePath)).toBe(true)
  })
})
