/* eslint-env jest */
import { Profiler, guestProfile } from './index'
import { TProfile } from './interfaces'
import { join } from 'path'
import { existsSync } from 'fs'

describe('Profiler', () => {
  let instance: Profiler
  let profilePath = join(__dirname, '..', '..', '..', 'tmp')
  let profile: TProfile = {
    user_type: 'guest',
    token: 'blah blah blah',
    skipLogin: true
  }
  let authorizedProfile: TProfile = {
    user_type: 'authorized',
    token: 'blah blah blah',
    gistId: 'asd2342fsdvd3s7',
    lastSyncDate: new Date(),
    skipLogin: true
  }

  it('Check instance is type of Profiler', () => {
    instance = new Profiler(
      guestProfile,
      profilePath
    )
    expect(instance).toBeInstanceOf(Profiler)
  })

  it(`create guest profile with token`, () => {
    instance = new Profiler(
      profile,
      profilePath
    )

    profile.token = 'test'
    instance.save(profile)
    expect(instance.data.token).toBe('test')
  })

  it(`create authorized profile`, () => {
    instance = new Profiler(
      profile,
      profilePath
    )

    instance.save({ ...profile, ...authorizedProfile})

    expect(instance.data.user_type).toBe('authorized')
  })

  it(`load profile`, () => {
    instance = new Profiler(
      guestProfile,
      profilePath
    )
    expect(instance.load()).toBe(true)
  })

  it(`create new profile while the profile path doesn't exist`, () => {
    instance = new Profiler(
      guestProfile,
      profilePath
    )
    instance.load()
    expect(existsSync(profilePath)).toBe(true)
  })
})
