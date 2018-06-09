import { constants } from '../constants'
import { readFileSync, writeFileSync } from 'fs'
import { Profile } from './interfaces'

/**
 * Profiler class helps to create an instance of existing profile or
 * logged in user and expose it as an global object to the electron app
 *
 * @class Profiler
 */
export class Profiler {
  /**
   * Creates an instance of Profiler.
   * @param {string} [path=constants.profilePath]
   * @param {object} [data=Profile]
   * @memberof Profiler
   */
  data: Profile
  path: string
  constructor (data?: Profile, path?: string) {
    this.data = data
      ? data
      : {
        user_type: 'guest',
        token: '',
        gistId: ''
      }
    this.path = path ? path : constants.profilePath
  }
  /**
   * Load profile
   *
   * @returns {void}
   * @memberof Profiler
   */
  load (): boolean {
    try {
      this.data = JSON.parse(readFileSync(this.path, 'utf8'))
      return true
    } catch (error) {
      switch (error.code) {
        case 'ENOENT':
          return this.save()
        default:
          throw error
      }
    }
  }
  /**
   * write profile on disc
   *
   * @returns {void}
   * @memberof Profiler
   */
  save (): boolean {
    try {
      writeFileSync(this.path, JSON.stringify(this.data))
      return true
    } catch (error) {
      throw error
    }
  }
  isValidate (data: Profile = this.data): data is Profile {
    return data.token.length > 0 ? true : false
  }
}
