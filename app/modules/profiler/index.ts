import { constants } from '../constants'
import { readFileSync, writeFileSync } from 'fs'
import { TProfile, IProfiler } from './interfaces'
import axios, { AxiosError } from 'axios'
import { messageSerializer } from '../util'
import { Github } from '../github'

/**
 * Profiler class helps to create an instance of existing profile or
 * logged in user and expose it as an global object to the electron app
 *
 * @class Profiler
 */
export class Profiler implements IProfiler {
  /**
   * Creates an instance of Profiler.
   * @param {object} [data=TProfile]
   * @param {string} [path=constants.profilePath]
   * @memberof Profiler
   */
  path: string
  github: Github
  private _data: TProfile
  constructor (data?: TProfile, path?: string) {
    this.github = new Github()
    this.data = data || { user_type: 'guest', token: '' }
    this.path = path || constants.profilePath
    if (arguments.length === 0) this.load()
  }
  public get data (): TProfile {
    return this._data
  }
  public set data (newData: TProfile) {
    this._data = newData
    this.github.setToken(this.data.token)
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
  isValid (data: TProfile = this.data): data is TProfile {
    return data.token.length > 0
  }
  /**
   * Return Github oauth login page
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
  /**
   * validate the profile token by calling github module method.
   *
   * @returns {Promise<boolean>}
   * @memberof Profiler
   */
  async pingtoken (): Promise<boolean> {
    try {
      const req = await this.github.ping()
      return req.status === 200
    } catch (error) {
      return false
    }
  }
}
