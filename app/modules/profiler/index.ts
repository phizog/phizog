import { constants } from '../constants'
import { existsSync, readFile, writeFile } from 'fs'

interface Profile {
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
  path: string
  data: Profile
  constructor (path: string = constants.profilePath, data: Profile) {
    this.path = path
    this.data = data

    if (!existsSync(this.path)) {
      this.create()
    } else {
      this.load()
    }
  }
  /**
   * Create profile file according profile template and passed parameters to
   * profiler instance.
   *
   * @memberof Profiler
   * @returns {void} return save function
   */
  create (): void {
    try {
      if (!this.data) {
        // load profile template
        readFile(constants.profileTemplatePath, 'utf8', (error, data) => {
          if (error) throw error

          // modify template
          let template = JSON.parse(data)
          template['user_type'] = 'guest'
          template['token'] = ''
          template['gistId'] = ''

          return this.save(template)
        })
      } else {
        return this.save(this.data)
      }
    } catch (error) {
      throw error
    }
  }
  /**
   * Load profile and set it to `data` parameter
   *
   * @returns {void}
   * @memberof Profiler
   */
  load (): void {
    // load profile file
    readFile(this.path, 'utf8', (error, data) => {
      if (error) throw error

      this.data = JSON.parse(data)
    })
  }
  /**
   * Save profile data on disc
   *
   * @param {object} data
   * @returns {void}
   * @memberof Profiler
   */
  save (data: Profile): void {
    try {
      writeFile(this.path, JSON.stringify(data), error => {
        if (error) throw error
        this.data = data
        return true
      })
    } catch (error) {
      throw error
    }
  }
}
