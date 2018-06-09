import { constants } from '../constants'
import { readFileSync, writeFileSync } from 'fs'

interface IProfile {
  user_type: 'guest' | 'authorized'
  token?: string
  gistId?: string
  lastSyncDate?: Date
}

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
  data: IProfile
  path: string
  constructor (data?: IProfile, path?: string) {
    this.data = data
      ? data
      : {
        user_type: 'guest'
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
}
