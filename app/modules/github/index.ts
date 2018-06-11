import axios, { AxiosInstance, AxiosError } from 'axios'
import { messageSerializer } from '../util'
import { constants } from '../constants'

export class Github {
  /**
   * Creates an instance of Github.
   * @param {string} token
   * @memberof Github
   */
  private token: string
  private axios: AxiosInstance
  private apiPath: string
  constructor () {
    this.apiPath = constants.api.basePath
    this.axios = axios.create({
      baseURL: this.apiPath
    })
  }
  setToken (token: string): void {
    this.token = token
    this.axios.interceptors.request.use(config => {
      config.headers['Authorization'] = `token ${this.token}`

      return config
    })
  }
}
