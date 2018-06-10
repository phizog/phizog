import { constants } from '../constants'
import { readFileSync, writeFileSync } from 'fs'
import { TProfile, IProfiler } from './interfaces'

/**
 * Profiler class helps to create an instance of existing profile or
 * logged in user and expose it as an global object to the electron app
 *
 * @class Profiler
 */
export class Profiler implements IProfiler {
  /**
   * Creates an instance of Profiler.
   * @param {object} [data=IProfile]
   * @param {string} [path=constants.profilePath]
   * @memberof Profiler
   */
  data: TProfile
  path: string
  constructor (data: TProfile, path: string) {
    this.data = data || { user_type: 'guest', token: '' }
    this.path = path || constants.profilePath
    if (arguments.length === 0) this.load()
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
  isValidate (data: IProfile = this.data): data is IProfile {
    return data.token.length > 0
  }
}
