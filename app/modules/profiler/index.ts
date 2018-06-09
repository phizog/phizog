import { constants } from '../constants'
import { readFileSync, writeFileSync } from 'fs'

type TProfile = {
  user_type: 'guest' | 'authorized'
  token?: string
  gistId?: string
  lastSyncDate?: Date
}

interface IProfiler {
  data: TProfile
  path: string
  load: () => boolean
  save: () => boolean
}

/**
 * Profiler class helps to create an instance of existing profile or
 * logged in user and expose it as an global object to the electron app
 *
 * @class Profiler
 */
export class Profiler implements IProfiler {
  /**
   * Creates an instance of Profiler.
   * @param {string} [path=constants.profilePath]
   * @param {object} [data=Profile]
   * @memberof Profiler
   */
  data: TProfile
  path: string
  constructor (
    data?: TProfile = { user_type: 'guest' },
    path?: string = constants.profilePath
  ) {
    this.data = data
    this.path = path
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
