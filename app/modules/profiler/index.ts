import { constants } from '../constants'
import { readFileSync, writeFileSync } from 'fs'
import axios, { AxiosError } from 'axios'
import { messageSerializer } from '../util'

export interface IProfile {
  user_type: 'guest' | 'authorized'
  token: string
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
   * @param {object} [data=IProfile]
   * @param {string} [path=constants.profilePath]
   * @memberof Profiler
   */
  data: IProfile
  path: string
  constructor (data?: IProfile, path?: string) {
    this.data = data
      ? data
      : {
        user_type: 'guest',
        token: ''
      }
    this.path = path ? path : constants.profilePath

    // load profile from default path if no paramter passed to the class
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
  /**
   * Validate profile data object if token exist and it's length is more than 0
   *
   * @param {IProfile} [data=this.data]
   * @returns {data is IProfile}
   * @memberof Profiler
   */
  isValidate (data: IProfile = this.data): data is IProfile {
    return data.token.length > 0 ? true : false
  }
  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof Profiler
   */
  async authorizeRequest (): Promise<void> {
    try {
      const req = await axios.get(constants.oauth.url, {
        params: constants.oauth.parameters
      })
      return messageSerializer(req.status, req.data)
    } catch (error) {
      let err: AxiosError = error
      return messageSerializer(err.request.res.statusCode)
    }
  }
}
